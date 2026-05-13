import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import {
  sendOrderConfirmationToCustomer,
  sendNewOrderAlertToAdmin,
} from "@/lib/whatsapp"

export const dynamic = "force-dynamic"

/**
 * TEMPORARY BYPASS: Marks an order as paid and fires WhatsApp messages
 * WITHOUT going through Razorpay. Use this for testing WhatsApp notifications.
 * 
 * Remove this route (or protect it) before going live.
 */
export async function POST(req: NextRequest) {
  try {
    const { supabase_order_id } = await req.json()

    if (!supabase_order_id) {
      return NextResponse.json({ error: "supabase_order_id is required" }, { status: 400 })
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    )

    // Mark order as paid
    const { error: orderError } = await supabaseAdmin
      .from("orders")
      .update({ status: "paid", razorpay_payment_id: "BYPASS_TEST", razorpay_order_id: "BYPASS_TEST" })
      .eq("id", supabase_order_id)

    if (orderError) {
      console.error("Order update error:", orderError)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    // Fetch full order + items for WhatsApp
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
        razorpay_payment_id: "BYPASS_TEST",
        status: "verified",
      })

      const itemsSummary =
        orderItems && orderItems.length > 0
          ? orderItems.map((item: any) => `${item.qty}x ${item.name}`).join(", ")
          : "Items not available"

      const deliveryAddress = [order.address, order.city, order.state, order.pincode]
        .filter(Boolean)
        .join(", ")

      const placedAt = new Date(order.created_at).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true,
      }) + " IST"

      const shortOrderId = supabase_order_id.split("-")[0].toUpperCase()

      // Send WhatsApp to Customer
      if (order.phone) {
        const customerResult = await sendOrderConfirmationToCustomer({
          phone: order.phone,
          customerName: order.customer_name || "Customer",
          orderId: supabase_order_id,
          itemsSummary,
          deliveryAddress,
        }).catch((err) => {
          console.error("[WhatsApp] Customer message error:", err)
          return { error: err.message }
        })
        console.log("[WhatsApp] Customer result:", customerResult)
      }

      // Send WhatsApp to Admin
      const adminResult = await sendNewOrderAlertToAdmin({
        orderId: shortOrderId,
        total: order.total,
        itemsSummary,
        customerLabel: `${order.customer_name || "Unknown"} — ${order.phone || "No phone"}`,
        deliveryAddress,
        placedAt,
      }).catch((err) => {
        console.error("[WhatsApp] Admin message error:", err)
        return { error: err.message }
      })
      console.log("[WhatsApp] Admin result:", adminResult)
    }

    return NextResponse.json({ success: true, message: "Order marked as paid & WhatsApp messages fired" })
  } catch (err: any) {
    console.error("Bypass payment error:", err)
    return NextResponse.json({ error: err.message || "Bypass failed" }, { status: 500 })
  }
}
