"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import "../globals.css"

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0b0b0b]">
      {/* MOBILE TOP BAR */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 bg-[#f6eedc] border-b border-gold flex items-center justify-between px-4 lg:hidden">
        <span className="tracking-[0.35em] uppercase text-[#7a1a14] text-xs">Admin</span>
        <button onClick={() => setOpen(true)} className="text-[#7a1a14] text-2xl leading-none">☰</button>
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
        fixed lg:static top-0 left-0 z-50 h-full w-64 bg-black/95 backdrop-blur-xl border-r border-white/10
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <span className="tracking-[0.35em] uppercase text-[#d4af37]">Admin</span>
          <button onClick={() => setOpen(false)} className="lg:hidden text-[#7a1a14] text-xl">✕</button>
        </div>
        <nav className="p-4 space-y-2">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-5 py-3 rounded-xl transition
                ${path === l.href ? "bg-[#7a1a14]" : "hover:bg-white/10"}
              `}
            >
              {l.label}
            </Link>
          ))}
        </nav>
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