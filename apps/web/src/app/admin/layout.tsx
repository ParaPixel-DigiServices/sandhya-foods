export const dynamic = 'force-static'
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import '../globals.css'

const links = [
  { href:"/admin", label:"Dashboard" },
  { href:"/admin/products", label:"Products" },
  { href:"/admin/orders", label:"Orders" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const [open,setOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-[#0b0b0b] text-white">

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-14 bg-[#F6EEDC] flex items-center justify-between px-5 z-50 border-b border-gold">
        <span className="tracking-[0.35em] uppercase text-[#7a1a14] text-xs">Admin</span>
        <button onClick={()=>setOpen(true)} className="text-[#7a1a14] text-2xl">☰</button>
      </div>

      {/* Overlay */}
      {open && (
        <div onClick={()=>setOpen(false)} className="fixed inset-0 bg-black/60 z-40 lg:hidden"/>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 z-50 h-full w-64 bg-black/95 backdrop-blur-xl border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <span className="tracking-[0.35em] uppercase text-[#d4af37]">Admin</span>
          <button onClick={()=>setOpen(false)} className="lg:hidden text-[#7a1a14] text-xl">✕</button>
        </div>

        <nav className="p-4 space-y-2">
          {links.map(l=>(
            <Link key={l.href} href={l.href}
              onClick={()=>setOpen(false)}
              className={`block px-5 py-3 rounded-xl transition
                ${path===l.href ? "bg-[#7a1a14]" : "hover:bg-white/10"}
              `}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-[#f6eedc] text-black p-6 lg:p-10 pt-20 lg:pt-10">
        {children}
      </main>

    </div>
  )
}
