"use client"
import RoyalUTRForm from "./RoyalUTRForm"

export default function RoyalPaymentShrine({ order }: { order: any }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2.8rem] shadow-[0_40px_120px_rgba(0,0,0,0.35)] p-10 max-w-xl w-full text-center border border-[#7A1A14]">

        <h1 className="font-royal text-3xl mb-2">Payment</h1>
        <p className="text-sm opacity-70 mb-8">Complete your payment to confirm your order</p>
        <div className="text-sm mb-6 space-y-1">
          <div>Account Number: <b>921030006294495</b></div>
          <div>Account Name: <b>Sandhya Papad Product</b></div>
          <div>IFSC Code: <b>UTIB0004394</b></div>
          <div>Bank: <b>Axis Bank</b></div>
          <div>Amount: <b>₹ {order.total}</b></div>
          <div>Order ID: <b>{order.id}</b></div>
        </div>

        <RoyalUTRForm order={order} />
      </div>
    </section>
  )
}
