import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import ClientShell from "./ClientShell"
import Providers from "./providers"
import { Cinzel, Libre_Baskerville } from "next/font/google"

const royal = Cinzel({
  weight:["400","600","700","900"],
  subsets:["latin"],
  variable:"--font-royal"
})

const body = Libre_Baskerville({
  weight:["400","700"],
  subsets:["latin"],
  variable:"--font-body"
})

export const metadata: Metadata = {
  title: "Sandhya Papad",
  description: "Royal Indian Papad Store",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${royal.variable} ${body.variable} antialiased`}>
        <Providers>
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  )
}
