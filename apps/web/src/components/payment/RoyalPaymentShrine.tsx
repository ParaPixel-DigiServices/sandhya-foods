"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RoyalPaymentShrine({ order }: { order: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const retryPayment = async () => {
    setLoading(true)

    try {
      // Create a new Razorpay order for this existing Supabase order
      const rpRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: order.total, orderId: order.id }),
      })

      const rpData = await rpRes.json()
      if (!rpRes.ok) { setLoading(false); return alert(rpData.error || "Payment init failed") }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: rpData.amount,
        currency: rpData.currency,
        name: "Sandhya Foods",
        description: "Order Payment",
        order_id: rpData.razorpayOrderId,
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              supabase_order_id: order.id,
            }),
          })

          if (verifyRes.ok) {
            router.push(`/success/${order.id}`)
          } else {
            alert("Payment verification failed. Please contact support.")
            setLoading(false)
          }
        },
        prefill: {
          name: order.customer_name,
          contact: order.phone,
        },
        theme: {
          color: "#7B1113",
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error("Retry payment error:", err)
      alert("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  // If the order is already paid, show a success message
  if (order.status === "paid") {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.8rem] shadow-[0_40px_120px_rgba(0,0,0,0.35)] p-10 max-w-xl w-full text-center border border-[#7A1A14]">
          <h1 className="font-royal text-3xl mb-2">Payment Complete</h1>
          <p className="text-sm opacity-70 mb-6">
            Your payment for this order has been received and verified.
          </p>
          <div className="text-sm space-y-1 mb-6">
            <div>Amount: <b>₹ {order.total}</b></div>
            <div>Order ID: <b>{order.id}</b></div>
          </div>
          <a
            href="/"
            className="inline-block py-4 px-8 rounded-full bg-[radial-gradient(circle_at_top,#FFE39B,#D4AF37)] uppercase tracking-widest text-xs font-semibold"
          >
            Continue Shopping
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2.8rem] shadow-[0_40px_120px_rgba(0,0,0,0.35)] p-10 max-w-xl w-full text-center border border-[#7A1A14]">

        <h1 className="font-royal text-3xl mb-2">Complete Payment</h1>
        <p className="text-sm opacity-70 mb-8">
          Complete your payment to confirm your order
        </p>

        <div className="text-sm space-y-1 mb-8">
          <div>Amount: <b>₹ {order.total}</b></div>
          <div>Order ID: <b>{order.id}</b></div>
        </div>

        <button
          onClick={retryPayment}
          disabled={loading}
          className="w-full py-4 rounded-full bg-[#7B1113] text-white tracking-widest text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </section>
  )
}
