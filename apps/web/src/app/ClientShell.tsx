"use client"

import { usePathname } from "next/navigation"
import RoyalNavbar from "@/components/layout/Navbar"
import RoyalCartOrb from "@/components/cart/RoyalCartOrb"

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isAdmin = path.startsWith("/admin")
  
  return (
    <div className="h-full">
      {!isAdmin && <RoyalNavbar />}
      {!isAdmin && <RoyalCartOrb />}
      {children}
    </div>
  )
}