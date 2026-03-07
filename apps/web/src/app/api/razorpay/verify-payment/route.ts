import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"

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
      .from("orders_v2")
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

    // Insert payment record
    const { data: order } = await supabaseAdmin
      .from("orders_v2")
      .select("user_id, total")
      .eq("id", supabase_order_id)
      .single()

    if (order) {
      await supabaseAdmin.from("payments_v2").insert({
        order_id: supabase_order_id,
        user_id: order.user_id,
        razorpay_payment_id,
        status: "verified",
      })
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
