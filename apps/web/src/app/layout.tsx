import type { Metadata } from "next"
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
  title: "Sandhya Foods - Authentic Rajasthani Papad from Jodhpur",
  description: "A trusted family-run papad brand from Jodhpur, dedicated to crafting authentic papad with time-honored recipes and unwavering quality for Indian homes.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sandhya Foods - Authentic Rajasthani Papad",
    description: "Crafting authentic Rajasthani papad with time-honored recipes since 1989",
    url: "https://sandhyafoods.com",
    siteName: "Sandhya Foods",
    images: [
      {
        url: "/sandhyalogo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandhya Foods - Authentic Rajasthani Papad",
    description: "Crafting authentic Rajasthani papad with time-honored recipes since 1989",
    images: ["/sandhyalogo.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${royal.variable} ${body.variable} antialiased h-full`}>
        <Providers>
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  )
}