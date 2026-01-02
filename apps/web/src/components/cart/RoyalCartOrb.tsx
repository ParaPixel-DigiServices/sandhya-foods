"use client"
import { useCart } from "@/store/cart"
import { useState } from "react"
import RoyalCartDrawer from "./RoyalCartDrawer"

export default function RoyalCartOrb() {
  const items = useCart(s=>s.items)
  const [open,setOpen] = useState(false)

  return (
    <>
      <button
        onClick={()=>setOpen(true)}
        className="
        fixed z-50 bottom-6 right-6
        w-16 h-16 rounded-full
        bg-[#7A1A14]
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        flex items-center justify-center
        text-white text-2xl
        "
      >
        🛒
        {items.length>0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#7A1A14] text-white rounded-full text-xs flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      <RoyalCartDrawer open={open} onClose={()=>setOpen(false)}/>
    </>
  )
}
