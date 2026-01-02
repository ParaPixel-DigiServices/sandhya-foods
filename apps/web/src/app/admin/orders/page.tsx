"use client"
export const dynamic = 'force-static'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminOrders(){
  const [orders,setOrders] = useState<any[]>([])
  const [view,setView] = useState<any>(null)
  const [note,setNote] = useState("")

  async function load(){
    const { data: orders } = await supabase
      .from("orders_v2")
      .select("*")
      .order("created_at",{ascending:false})

    if(!orders) return setOrders([])

    const ids = orders.map(o=>o.id)

    const { data: payments } = await supabase
      .from("payments_v2")
      .select("order_id,utr")
      .in("order_id",ids)

    const merged = orders.map(o=>({
      ...o,
      utr: payments?.find(p=>p.order_id===o.id)?.utr
    }))

    setOrders(merged)
  }

  useEffect(()=>{ load() },[])

  async function updateStatus(id:string,status:string){
    await supabase.from("orders_v2").update({ status }).eq("id",id)
    load()
  }

  async function saveNote(){
    await supabase.from("orders_v2").update({ admin_note:note }).eq("id",view.id)
    setView(null)
    setNote("")
    load()
  }

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-royal text-[#7a1a14]">Royal Order Vault</h1>

      <div className="grid gap-5">
        {orders.map(o=>(
          <div key={o.id}
            className="bg-white rounded-3xl p-6 shadow-xl border border-gold/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div className="space-y-1 text-sm">
              <div className="font-semibold">{o.customer_name}</div>
              <div className="text-xs opacity-60">#{o.id.slice(0,8)}</div>
              <div className="font-semibold">₹ {o.total}</div>
              <div className="uppercase tracking-widest text-xs text-[#7a1a14]">{o.status}</div>
              {o.utr && <div className="text-xs">UTR: {o.utr}</div>}
            </div>

            <div className="flex flex-wrap gap-3">
              {o.status==="unverified" && (
                <>
                  <button onClick={()=>updateStatus(o.id,"verified")}
                    className="px-6 py-2 rounded-full bg-green-700 text-white">Verify</button>
                  <button onClick={()=>updateStatus(o.id,"rejected")}
                    className="px-6 py-2 rounded-full bg-red-700 text-white">Reject</button>
                </>
              )}
              {o.status==="verified" && (
                <button onClick={()=>updateStatus(o.id,"shipped")}
                  className="px-6 py-2 rounded-full bg-blue-700 text-white">Mark Shipped</button>
              )}
              {o.status==="shipped" && (
                <button onClick={()=>updateStatus(o.id,"delivered")}
                  className="px-6 py-2 rounded-full bg-purple-700 text-white">Mark Delivered</button>
              )}
              <button onClick={async ()=>{
                const { data: items } = await supabase
                  .from("order_items_v2")
                  .select("name,qty,price")
                  .eq("order_id",o.id)
                setView({ ...o, items })
              }}
                className="px-6 py-2 rounded-full border border-gold/40">
                View Invoice
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Royal Invoice Modal */}
      {view && (
        <div className="fixed inset-0 bg-black/70 grid place-items-center p-4 z-50">
          <div className="bg-white rounded-[3rem] p-8 w-full max-w-md space-y-5">

            <h2 className="font-royal text-2xl text-[#7a1a14]">Royal Invoice</h2>

            <div className="text-sm space-y-1">
              <div><b>Customer:</b> {view.customer_name}</div>
              <div><b>Phone:</b> {view.phone}</div>
              <div><b>Total:</b> ₹ {view.total}</div>
              <div><b>Status:</b> {view.status}</div>
              <div><b>UTR:</b> {view.utr || "—"}</div>
            </div>

            <div className="border-t pt-3 text-xs space-y-1">
              {view.items?.map((i:any,idx:number)=>(
                <div key={idx} className="flex justify-between">
                  <span>{i.name}</span>
                  <span>{i.qty} × ₹{i.price}</span>
                </div>
              ))}
            </div>

            <textarea
              placeholder="Royal admin note..."
              value={note}
              onChange={e=>setNote(e.target.value)}
              className="w-full border rounded-xl p-3 h-24"
            />

            <div className="flex gap-3">
              <button onClick={saveNote}
                className="flex-1 py-2 rounded-full bg-[#7a1a14] text-white">
                Save Note
              </button>
              <button onClick={()=>{setView(null); setNote("")}}
                className="flex-1 py-2 rounded-full border">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
