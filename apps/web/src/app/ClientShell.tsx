"use client"
export const dynamic = 'force-static'
import { usePathname } from "next/navigation"
import RoyalNavbar from "@/components/layout/Navbar"
import RoyalCartOrb from "@/components/cart/RoyalCartOrb"

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isAdmin = path.startsWith("/admin")

  return (
    <>
      {!isAdmin && <RoyalNavbar />}
      {!isAdmin && <RoyalCartOrb />}
      {children}
    </>
  )
}
