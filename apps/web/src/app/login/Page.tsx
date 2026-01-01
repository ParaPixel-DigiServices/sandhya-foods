"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-6">
        <input className="w-full border p-3 mb-3" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input className="w-full border p-3 mb-3" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={()=>supabase.auth.signInWithPassword({email,password})} className="w-full p-3 bg-black text-white">Login</button>
      </div>
    </div>
  );
}
