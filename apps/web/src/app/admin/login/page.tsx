"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    // 1. Sign in with Supabase Auth
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError || !data.user) {
      setError("Invalid email or password.")
      setLoading(false)
      return
    }

    // 2. Check that this user has role = 'admin' in profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single()

    if (profileError || profile?.role !== "admin") {
      await supabase.auth.signOut()
      setError("Access denied. You are not an admin.")
      setLoading(false)
      return
    }

    // 3. All good — redirect to admin dashboard (hard navigation to avoid layout state conflict)
    window.location.href = "/admin"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7a1a14]/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#d4af37]/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md px-6">
        {/* Card */}
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          {/* Gold top border accent */}
          <div className="absolute top-0 inset-x-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

          {/* Logo / Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#7a1a14] to-[#b22222] mb-5 shadow-[0_0_30px_rgba(122,26,20,0.6)]">
              <svg className="w-7 h-7 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-serif tracking-widest text-white mb-1">Admin Portal</h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37]/70">Sandhya Foods</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-[#d4af37]/60 mb-2">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@sandhyafoods.com"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/8 transition text-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-[#d4af37]/60 mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/8 transition text-sm"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-900/30 border border-red-500/30 text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#7a1a14] via-[#b22222] to-[#7a1a14] text-white text-xs tracking-[0.35em] uppercase font-medium shadow-[0_0_20px_rgba(122,26,20,0.4)] hover:shadow-[0_0_30px_rgba(122,26,20,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Enter Admin Panel"}
            </button>
          </form>

          {/* Bottom accent */}
          <div className="absolute bottom-0 inset-x-0 h-px rounded-b-3xl bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}
