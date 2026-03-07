import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { amount, orderId } = await req.json()

    if (!amount || !orderId) {
      return NextResponse.json(
        { error: "amount and orderId are required" },
        { status: 400 }
      )
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert rupees to paise
      currency: "INR",
      receipt: orderId,
      notes: {
        supabase_order_id: orderId,
      },
    })

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    })
  } catch (err: any) {
    console.error("Razorpay create-order error:", err)
    return NextResponse.json(
      { error: err.message || "Failed to create Razorpay order" },
      { status: 500 }
    )
  }
}
