"use client"

import { useCart } from "@/store/cart"
import Link from "next/link"

export default function Cart() {
  const { items, remove, change } = useCart()

  if (!items.length) return (
    <div className="p-10 text-center text-gray-500">
      <div className="text-4xl mb-4">🛒</div>
      <p>Your cart is empty</p>
      <Link href="/shop" className="mt-4 inline-block text-[#7A1A14] underline text-sm">Browse Products</Link>
    </div>
  )

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      {items.map(i => (
        <div key={i.id} className="flex items-center gap-4 border border-gold/30 rounded-2xl p-4 bg-white shadow-sm">
          {i.image && <img src={i.image} alt={i.name} className="w-16 h-16 object-cover rounded-xl" />}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{i.name}</div>
            <div className="text-[#7A1A14] font-bold">₹{i.price}</div>
            <div className="flex items-center gap-2 mt-1">
              <button onClick={() => i.qty > 1 ? change(i.id, i.qty - 1) : remove(i.id)}
                className="w-6 h-6 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100">−</button>
              <span className="text-sm">{i.qty}</span>
              <button onClick={() => change(i.id, i.qty + 1)}
                className="w-6 h-6 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100">+</button>
            </div>
          </div>
          <button onClick={() => remove(i.id)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
        </div>
      ))}

      <div className="bg-white rounded-2xl border border-gold/30 p-4 shadow-sm">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-[#7A1A14]">₹{total}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="block text-center bg-[#7A1A14] text-white p-4 rounded-xl tracking-widest uppercase text-xs shadow-xl hover:opacity-90 transition"
      >
        Proceed to Checkout
      </Link>
    </div>
  )
}

