"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Checkout() {
  const [address,setAddress]=useState<string>();

  const { data:addresses } = useQuery({
    queryKey:["addresses"],
    queryFn: async()=> (await supabase.from("addresses").select("*")).data
  });

  const { data:cart } = useQuery({
    queryKey:["cart"],
    queryFn: async()=> (await supabase.from("cart_items").select("*,products(price)")).data
  });

  const place = useMutation({
    mutationFn: async()=>{
      const total = cart?.reduce((s,i)=>s+i.qty*i.products.price,0) || 0;
      const addr = addresses?.find(a=>a.id===address);
      const { data:order } = await supabase.from("orders").insert({
        address_snapshot: addr,
        total_amount: total,
        payment_status: "pending",
        order_status: "placed",
        payment_method: "razorpay"
      }).select().single();

      await supabase.from("payments").insert({ order_id: order.id, amount: total, status:"pending", method:"razorpay" });
    }
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <select className="w-full border p-3 mb-4" onChange={e=>setAddress(e.target.value)}>
        <option>Select Address</option>
        {addresses?.map(a=><option key={a.id} value={a.id}>{a.address_line1}</option>)}
      </select>

      <button onClick={()=>place.mutate()} className="w-full p-3 bg-black text-white">Place Order</button>
    </div>
  );
}
