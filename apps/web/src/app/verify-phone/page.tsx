"use client"
export const dynamic = 'force-static'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function VerifyPhonePage() {
  const [phone,setPhone] = useState("")
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if(!data.user) return router.push("/auth")

      const { data: profile } = await supabase
        .from("profiles")
        .select("phone_verified")
        .eq("id", data.user.id)
        .single()

      if(profile?.phone_verified) router.push("/")
    })
  }, [])

  async function submit() {
    const { data:{user} } = await supabase.auth.getUser()
    if(!user) return

    await supabase.from("profiles").update({
      phone,
      phone_verified:true
    }).eq("id", user.id)

    router.push("/")
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F6EEDC]">
      <div className="bg-white rounded-[3rem] shadow-2xl p-12 max-w-sm w-full text-center">
        <h1 className="font-royal text-3xl mb-6">Verify Mobile</h1>
        <input className="royal-input mb-4" placeholder="Enter Mobile Number"
          value={phone} onChange={e=>setPhone(e.target.value)} />
        <button onClick={submit} className="royal-primary-btn">Continue</button>
      </div>
    </section>
  )
}
