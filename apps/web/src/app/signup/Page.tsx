"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");

  const register=async()=>{
    const { data } = await supabase.auth.signUp({email,password});
    if(data.user){
      await supabase.from("profiles").insert({id:data.user.id,full_name:name,phone});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-6">
        <input className="w-full border p-3 mb-3" placeholder="Full Name" onChange={e=>setName(e.target.value)}/>
        <input className="w-full border p-3 mb-3" placeholder="Phone" onChange={e=>setPhone(e.target.value)}/>
        <input className="w-full border p-3 mb-3" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input className="w-full border p-3 mb-3" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={register} className="w-full p-3 bg-black text-white">Create Account</button>
      </div>
    </div>
  );
}
