"use client"

import { MessageCircle } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"

export default function WhatsAppOrb() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=918005511786"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-30 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulsing Ring Animation */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75" />
      
      {/* Main Orb */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)]">
        
        {/* WhatsApp Icon */}
        <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
      
      {/* Tooltip on Hover */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          Chat with us!
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900" />
        </div>
      </div>
    </a>
  )
}