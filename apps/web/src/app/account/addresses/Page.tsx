"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Addresses() {
  const [form,setForm]=useState<any>({});
  const { data, refetch } = useQuery({
    queryKey:["addresses"],
    queryFn: async()=>{
      const { data } = await supabase.from("addresses").select("*");
      return data;
    }
  });

  const add = useMutation({
    mutationFn: async()=>{
      await supabase.from("addresses").insert(form);
    },
    onSuccess:()=>{ setForm({}); refetch(); }
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <input className="w-full border p-3 mb-2" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input className="w-full border p-3 mb-2" placeholder="Phone" onChange={e=>setForm({...form,phone:e.target.value})}/>
      <input className="w-full border p-3 mb-2" placeholder="Address Line 1" onChange={e=>setForm({...form,address_line1:e.target.value})}/>
      <input className="w-full border p-3 mb-2" placeholder="City" onChange={e=>setForm({...form,city:e.target.value})}/>
      <input className="w-full border p-3 mb-2" placeholder="State" onChange={e=>setForm({...form,state:e.target.value})}/>
      <input className="w-full border p-3 mb-2" placeholder="Pincode" onChange={e=>setForm({...form,pincode:e.target.value})}/>
      <button onClick={()=>add.mutate()} className="w-full p-3 bg-black text-white">Add Address</button>

      <div className="mt-6">
        {data?.map(a=>(
          <div key={a.id} className="border p-3 mb-2">
            <div>{a.address_line1}</div>
            <div>{a.city}, {a.state} - {a.pincode}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
