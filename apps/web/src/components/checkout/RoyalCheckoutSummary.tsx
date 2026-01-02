"use client"
import { useCart } from "@/store/cart"

export default function RoyalCheckoutSummary() {
  const items = useCart(s=>s.items)

  const subtotal = items.reduce((s,i)=>s+i.price*i.qty,0)
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="
      bg-white/80 backdrop-blur-xl
      rounded-[2.6rem]
      p-6 sm:p-10
      shadow-[0_40px_120px_rgba(0,0,0,0.25)]
      space-y-6
    ">

      <h2 className="font-royal text-2xl">Order Summary</h2>

      <div className="space-y-4">
        {items.map(i=>(
          <div key={i.id} className="flex justify-between text-sm">
            <span>{i.name} × {i.qty}</span>
            <span>₹ {i.price*i.qty}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gold/30 pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹ {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping===0?"Free":"₹ "+shipping}</span>
        </div>
      </div>

      <div className="flex justify-between text-lg font-semibold border-t border-gold pt-4">
        <span>Total</span>
        <span>₹ {total}</span>
      </div>

    </div>
  )
}
