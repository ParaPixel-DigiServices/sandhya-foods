"use client"
import { useCart } from "@/store/cart"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import RoyalCheckoutForm from "@/components/checkout/RoyalCheckoutForm"
import RoyalCheckoutSummary from "@/components/checkout/RoyalCheckoutSummary"
import RoyalCheckoutBackdrop from "@/components/checkout/RoyalCheckoutBackdrop"

export default function CheckoutPage() {
  const items = useCart(s=>s.items)
  const router = useRouter()
  const [ready,setReady] = useState(false)

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      if(!data.user) router.replace("/auth")
      else setReady(true)
    })
  },[])

  if(!ready) return null

  if(items.length===0){
    return <div className="min-h-screen flex items-center justify-center">Your cart is empty</div>
  }

  return (
    <section className="relative overflow-hidden">
      <RoyalCheckoutBackdrop />
      <div className="relative max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 lg:pt-36 pb-32 sm:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7"><RoyalCheckoutForm/></div>
          <div className="lg:col-span-5"><RoyalCheckoutSummary/></div>
        </div>
      </div>
    </section>
  )
}
