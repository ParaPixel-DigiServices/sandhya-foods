"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import "../globals.css"

const links = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "🫙" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  // Login page gets no sidebar — just render children
  if (path === "/admin/login") {
    return <>{children}</>
  }

  async function handleLogout() {
    setLoggingOut(true)
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0b0b0b]">
      {/* MOBILE TOP BAR */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 bg-black/90 backdrop-blur border-b border-white/10 flex items-center justify-between px-4 lg:hidden">
        <span className="tracking-[0.35em] uppercase text-[#d4af37] text-xs font-medium">Admin</span>
        <button onClick={() => setOpen(true)} className="text-[#d4af37] text-2xl leading-none">☰</button>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static top-0 left-0 z-50 h-full w-64 flex flex-col
        bg-black/95 backdrop-blur-xl border-r border-white/10
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Brand */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[#d4af37] tracking-[0.35em] uppercase text-sm font-medium">Admin</div>
            <div className="text-white/30 text-[10px] tracking-widest uppercase mt-0.5">Sandhya Foods</div>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-[#d4af37] text-xl">✕</button>
        </div>

        {/* Nav links */}
        <nav className="p-4 space-y-1 flex-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm
                ${path === l.href
                  ? "bg-[#7a1a14] text-[#d4af37] shadow-[0_0_20px_rgba(122,26,20,0.4)]"
                  : "text-white/60 hover:text-white hover:bg-white/8"
                }
              `}
            >
              <span className="text-base">{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200 disabled:opacity-40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/>
            </svg>
            {loggingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 bg-[#f6eedc] text-black overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-10 pt-20 lg:pt-10">
        <div className="max-w-full">
          {children}
        </div>
      </main>
    </div>
  )
}