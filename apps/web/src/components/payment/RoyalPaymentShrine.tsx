"use client"
import Image from "next/image"
import RoyalUTRForm from "./RoyalUTRForm"

export default function RoyalPaymentShrine({ order }: { order: any }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2.8rem] shadow-[0_40px_120px_rgba(0,0,0,0.35)] p-10 max-w-xl w-full text-center border border-[#7A1A14]">

        <h1 className="font-royal text-3xl mb-2">Payment</h1>
        <p className="text-sm opacity-70 mb-8">
          Complete your payment to confirm your order
        </p>

        {/* ✅ QR CODE SECTION */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-56 h-56 mb-3">
            <Image
              src="/qr.png"
              alt="Payment QR Code"
              fill
              className="object-contain rounded-xl border"
              priority
            />
          </div>

          <div className="text-sm space-y-1">
            <div>
              Amount: <b>₹ {order.total}</b>
            </div>
            <div>
              Order ID: <b>{order.id}</b>
            </div>
          </div>
        </div>

        <RoyalUTRForm order={order} />
      </div>
    </section>
  )
}
