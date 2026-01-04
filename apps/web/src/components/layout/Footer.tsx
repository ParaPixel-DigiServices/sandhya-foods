"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { useState } from "react"
import ProductBrochureModal from "./ProductBrochureModal"

export default function RoyalFooter() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)

  return (
    <>
      <footer className="relative bg-[#7A1A14] text-white overflow-hidden">
        
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(212,175,55,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(212,175,55,0.3),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Logo & Description */}
            <div className="sm:col-span-2 lg:col-span-1 flex items-center justify-center sm:justify-start">
              <Link href="/" className="block w-full max-w-[280px] sm:max-w-full">
                <Image 
                  src="/sandhyalogo.png" 
                  alt="Sandhya Foods Logo"
                  width={400}
                  height={200}
                  className="w-full h-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-royal text-lg sm:text-xl mb-4 text-[#D4AF37] tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-royal text-lg sm:text-xl mb-4 text-[#D4AF37] tracking-wide">
                Categories
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <button 
                    onClick={() => setIsBrochureOpen(true)}
                    className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200 text-left"
                  >
                    Our Products
                  </button>
                </li>
                <li>
                  <Link href="/shop" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h3 className="font-royal text-lg sm:text-xl mb-4 text-[#D4AF37] tracking-wide">
                Important Links
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy-policy" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200">
                    Returns & Refund
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200">
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="font-royal text-lg sm:text-xl mb-4 text-[#D4AF37] tracking-wide">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <a href="tel:+918005511786" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200">
                    +91 80055 11786
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <a href="mailto:info@sandhyafoods.com" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors duration-200 break-all">
                    info@sandhyafoods.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <address className="text-sm text-white/80 not-italic leading-relaxed">
                    Plot No.18, Baldev Nagar, Mata Ka Than Road,<br />
                    Magra Punjala, Jodhpur, Rajasthan,<br />
                    India - 342001
                  </address>
                </li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="my-8 sm:my-10 lg:my-12 h-[1px] bg-white/20 relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4AF37] rotate-45" />
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Sandhya Foods. All rights reserved.
            </p>
            <p className="text-center sm:text-right">
              Crafted with ❤️ By ParaPixel DigiServices.
            </p>
          </div>

        </div>
      </footer>

      {/* Product Brochure Modal */}
      <ProductBrochureModal 
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </>
  )
}