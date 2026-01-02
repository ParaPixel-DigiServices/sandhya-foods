"use client"
import { useState } from "react"
import { useCart } from "@/store/cart"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function RoyalCheckoutForm() {
  const router = useRouter()
  const { items, clear } = useCart()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  })

  const onChange = (k: string, v: string) =>
    setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    const total = items.reduce((s, i) => s + i.price * i.qty, 0)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert("Please login to continue")

    const { data: order, error } = await supabase
      .from("orders_v2")
      .insert({
        user_id: user.id,
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        total,
        status: "pending"
      })
      .select()
      .single()

    if (error || !order) return alert("Order failed")

    await supabase.from("order_items_v2").insert(
      items.map(i => ({
        order_id: order.id,
        user_id: user.id,
        product_id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty
      }))
    )

    clear()
    router.push(`/payment/${order.id}`)
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.6rem] p-6 sm:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
      <h2 className="font-royal text-2xl mb-8">Delivery Address</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input placeholder="Full Name" className="input" onChange={e => onChange("name", e.target.value)} />
        <input placeholder="Phone" className="input" onChange={e => onChange("phone", e.target.value)} />
        <input placeholder="City" className="input" onChange={e => onChange("city", e.target.value)} />
        <input placeholder="State" className="input" onChange={e => onChange("state", e.target.value)} />
        <input placeholder="Pincode" className="input sm:col-span-2" onChange={e => onChange("pincode", e.target.value)} />
        <textarea placeholder="Full Address" className="input sm:col-span-2 h-28" onChange={e => onChange("address", e.target.value)} />
      </div>

      <button
        onClick={submit}
        className="mt-10 w-full py-4 rounded-full bg-[radial-gradient(circle_at_top,#FFE39B,#D4AF37)] uppercase tracking-widest text-xs font-semibold"
      >
        Continue to Payment
      </button>
    </div>
  )
}
