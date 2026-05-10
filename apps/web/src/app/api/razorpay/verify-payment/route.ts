import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"
import {
  sendOrderConfirmationToCustomer,
  sendNewOrderAlertToAdmin,
} from "@/lib/whatsapp"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      supabase_order_id,
    } = await req.json()

    // Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      )
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    )

    // Update the order in Supabase
    const { error: orderError } = await supabaseAdmin
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id,
        razorpay_order_id,
      })
      .eq("id", supabase_order_id)

    if (orderError) {
      console.error("Supabase order update error:", orderError)
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      )
    }

    // Fetch full order details needed for WhatsApp messages
    const [{ data: order }, { data: orderItems }] = await Promise.all([
      supabaseAdmin
        .from("orders")
        .select("user_id, total, phone, customer_name, address, city, state, pincode, created_at")
        .eq("id", supabase_order_id)
        .single(),
      supabaseAdmin
        .from("order_items")
        .select("name, qty, price")
        .eq("order_id", supabase_order_id),
    ])

    if (order) {
      // Insert payment record
      await supabaseAdmin.from("payments").insert({
        order_id: supabase_order_id,
        user_id: order.user_id,
        razorpay_payment_id,
        status: "verified",
      })

      // ── Build shared message data ──────────────────────────────────────────

      // Items summary: "2x Masala Papad, 1x Mango Pickle (500g)"
      const itemsSummary =
        orderItems && orderItems.length > 0
          ? orderItems
              .map((item: { name: string; qty: number; price: number }) => `${item.qty}x ${item.name}`)
              .join(", ")
          : "Items not available"

      // Full delivery address on one line
      const deliveryAddress = [
        order.address,
        order.city,
        order.state,
        order.pincode,
      ]
        .filter(Boolean)
        .join(", ")

      // Format date/time in IST
      const placedAt = new Date(order.created_at).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) + " IST"

      // Short order ID (first segment of the UUID is enough for display)
      const shortOrderId = supabase_order_id.split("-")[0].toUpperCase()

      // ── Send WhatsApp to Customer ──────────────────────────────────────────
      if (order.phone) {
        sendOrderConfirmationToCustomer({
          phone: order.phone,
          customerName: order.customer_name || "Customer",
          orderId: supabase_order_id, // full UUID used in the URL button
          itemsSummary,
          deliveryAddress,
        }).catch((err) => console.error("[WhatsApp] Customer message error:", err))
      }

      // ── Send WhatsApp to Admin ─────────────────────────────────────────────
      sendNewOrderAlertToAdmin({
        orderId: shortOrderId,
        total: order.total,
        itemsSummary,
        customerLabel: `${order.customer_name || "Unknown"} — ${order.phone || "No phone"}`,
        deliveryAddress,
        placedAt,
      }).catch((err) => console.error("[WhatsApp] Admin message error:", err))
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Razorpay verify-payment error:", err)
    return NextResponse.json(
      { error: err.message || "Payment verification failed" },
      { status: 500 }
    )
  }
}
