"use client"

import { usePathname } from "next/navigation"
import RoyalNavbar from "@/components/layout/Navbar"
import RoyalCartOrb from "@/components/cart/RoyalCartOrb"
import RoyalFooter from "@/components/layout/Footer"
import WhatsAppOrb from "@/components/layout/WhatsappOrb"

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isAdmin = path.startsWith("/admin")
  
  return (
    <div className="h-full">
      {!isAdmin && <RoyalNavbar />}
      {!isAdmin && <RoyalCartOrb />}
      {!isAdmin && <WhatsAppOrb />}
      {children}
      {!isAdmin && <RoyalFooter />}
    </div>
  )
}