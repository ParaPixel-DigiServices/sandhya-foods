"use client"
import { useCart } from "@/store/cart"

export default function RoyalCartDrawer({ open,onClose }:{ open:boolean,onClose:()=>void }) {
  const { items, remove, change } = useCart()

  const total = items.reduce((s,i)=>s+i.price*i.qty,0)

  return (
    <>
      {open && <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40"/>}

      <div className={`
        fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50
        transform transition-transform duration-500
        ${open?"translate-x-0":"translate-x-full"}
      `}>

        <div className="p-6 border-b border-gold flex items-center justify-between">
          <h2 className="font-royal text-xl">My Cart</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {items.length===0 && <div className="text-center opacity-60">Your cart is empty</div>}

          {items.map(i=>(
            <div key={i.id} className="flex gap-4 items-center">

              <img src={i.image} className="w-16 h-16 object-contain"/>

              <div className="flex-1">
                <div className="font-royal">{i.name}</div>
                <div className="text-sm opacity-70">₹ {i.price}</div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={()=>change(i.id,i.qty-1)}>-</button>
                <span>{i.qty}</span>
                <button onClick={()=>change(i.id,i.qty+1)}>+</button>
              </div>

              <button onClick={()=>remove(i.id)}>✕</button>
            </div>
          ))}

        </div>

        <div className="p-6 border-t border-gold space-y-4">
          <div className="flex justify-between text-lg">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

          <a
            href="/checkout"
            className="
              block text-center py-4 rounded-full
              bg-[radial-gradient(circle_at_top,#FFE39B,#D4AF37)]
              uppercase tracking-widest text-xs font-semibold
            "
          >
            Enter Checkout
          </a>
        </div>
      </div>
    </>
  )
}
