export const dynamic = 'force-static'
"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AuthPage() {
  const [mode,setMode] = useState<"login"|"signup">("login")

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function submit() {
    if(mode==="signup") {
      const { data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone
          }
        }
      })
      if(data.user) window.location.href = "/verify-phone"
    } else {
      await supabase.auth.signInWithPassword({ email, password })
      window.location.href = "/"
    }
  }

  async function google() {
    await supabase.auth.signInWithOAuth({ provider:"google" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f2e8] via-white to-[#f1e5c8] px-6">

      <div className="relative w-full max-w-md">

        <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-[#d4af37] via-[#ffe39b] to-[#d4af37] blur-xl opacity-60"></div>

        <div className="relative bg-white rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.25)] p-12 text-center">

          <h1 className="text-3xl font-serif tracking-wider text-[#7a1a14] mb-1">
            {mode === "login" ? "Login" : "Create Account"}
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37] mb-10">
            Sandhya Papad Auth
          </p>

          {mode==="signup" && (
            <>
              <input
                placeholder="Full Name"
                className="w-full px-5 py-4 mb-4 rounded-xl border border-[#e6d7a9] bg-[#fffaf0] placeholder:text-[#bfa760]"
                onChange={e=>setName(e.target.value)}
              />

              <input
                placeholder="Mobile Number"
                className="w-full px-5 py-4 mb-4 rounded-xl border border-[#e6d7a9] bg-[#fffaf0] placeholder:text-[#bfa760]"
                onChange={e=>setPhone(e.target.value)}
              />
            </>
          )}

          <input
            placeholder="Email Address"
            className="w-full px-5 py-4 mb-4 rounded-xl border border-[#e6d7a9] bg-[#fffaf0] placeholder:text-[#bfa760]"
            onChange={e=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Secret Passphrase"
            className="w-full px-5 py-4 mb-8 rounded-xl border border-[#e6d7a9] bg-[#fffaf0] placeholder:text-[#bfa760]"
            onChange={e=>setPassword(e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full py-4 mb-6 rounded-full bg-gradient-to-r from-[#7a1a14] via-[#b22222] to-[#7a1a14] text-white uppercase tracking-[0.35em] text-xs shadow-lg hover:scale-105 transition"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#d4af37]/40"/>
            <span className="text-[10px] uppercase tracking-widest text-[#bfa760]">or</span>
            <div className="flex-1 h-px bg-[#d4af37]/40"/>
          </div>

          <button
            onClick={google}
            className="w-full py-4 mb-6 rounded-full border border-[#d4af37] text-[#7a1a14] uppercase tracking-[0.35em] text-xs hover:bg-[#fff3d0] transition"
          >
            Continue with Google
          </button>

          <button onClick={()=>setMode(mode==="login"?"signup":"login")} className="text-xs text-[#7a1a14] underline tracking-wide">
            {mode==="login" ? "Create Account" : "Already have an account?"}
          </button>

        </div>
      </div>
    </section>
  )
}
