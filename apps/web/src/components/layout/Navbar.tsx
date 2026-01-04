"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { Instagram, Youtube, Facebook, Mail, Phone, Menu, X } from "lucide-react";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";

export default function RoyalNavbar() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed z-50 top-3 left-1/2 -translate-x-1/2 w-[96%] max-w-6xl">

      {/* Crest Bar */}
      <div className="
        relative flex items-center justify-between
        px-5 sm:px-12 py-4 sm:py-5
        rounded-[2.4rem] sm:rounded-[3.5rem]
        bg-[radial-gradient(circle_at_top,#8B1C1C,#4A0B0B)]
        shadow-[0_25px_80px_rgba(0,0,0,0.6)]
        before:absolute before:inset-[-2px]
        before:rounded-[2.6rem] sm:before:rounded-[3.7rem]
        before:border before:border-gold before:pointer-events-none
      ">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/sandhyalogo.png" className="h-10 sm:h-11" />
          <span className="font-royal text-xl sm:text-2xl tracking-widest bg-gradient-to-b from-[#FFD77C] to-[#C8A64A] bg-clip-text text-transparent">
            SANDHYA FOODS
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-10 text-[11px] uppercase tracking-[0.4em] text-[#FFEBC7]">

          <Link href="/about" className="hover:text-gold">About Us</Link>
          <Link href="/shop" className="hover:text-gold">Shop</Link>

          <div className="hidden lg:flex items-center gap-4 text-gold">
            <a href="https://instagram.com/sandhya.foodss" target="_blank"><Instagram size={18}/></a>
            <a href="https://x.com/SandhyaFoods" target="_blank"><FaXTwitter size={16}/></a>
            <a href="https://www.youtube.com/@sandhyafoodss" target="_blank"><Youtube size={18}/></a>
            <a href="https://www.facebook.com/profile.php?id=61580278672015" target="_blank"><Facebook size={18}/></a>
            <a href="https://api.whatsapp.com/send?phone=918005511786" target="_blank"><FaWhatsapp size={18}/></a>
            <a href="mailto:teamsandhyafoods@gmail.com"><Mail size={18}/></a>
            <a href="tel:+918005511786"><Phone size={18}/></a>
          </div>

          {!user && (
            <Link href="/auth"
              className="relative px-8 py-3 rounded-full bg-[radial-gradient(circle_at_top,#FFE39B,#D4AF37)]
              text-[#5C3A00] tracking-[0.35em] text-[10px] shadow-xl hover:scale-105 transition
              before:absolute before:inset-[-4px] before:rounded-full before:border before:border-gold">
              Login / Signup
            </Link>
          )}

          {user && (
            <Link href="/account">
              <img src={user.user_metadata?.avatar_url || "/avatar.png"}
                className="h-10 w-10 rounded-full border-2 border-gold"/>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={()=>setOpen(!open)} className="sm:hidden text-[#FFEBC7]">
          {open ? <X size={30}/> : <Menu size={30}/>}
        </button>

      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="mt-4 sm:hidden bg-[#6D1A1A]/95 backdrop-blur-xl border border-gold rounded-3xl p-6 space-y-5 text-[#FFEBC7]">
          <Link href="/about" onClick={()=>setOpen(false)} className="block">About Us</Link>
          <Link href="/shop" onClick={()=>setOpen(false)} className="block">Shop</Link>
          {!user && <Link href="/auth" onClick={()=>setOpen(false)}>Login / Signup</Link>}
          {user && <Link href="/account" onClick={()=>setOpen(false)}>My Account</Link>}

          <div className="flex gap-4 pt-4 text-gold">
            <a href="https://instagram.com/sandhya.foodss" target="_blank"><Instagram size={18}/></a>
            <a href="https://x.com/SandhyaFoods" target="_blank"><FaXTwitter size={16}/></a>
            <a href="https://www.youtube.com/@sandhyafoodss" target="_blank"><Youtube size={18}/></a>
            <a href="https://www.facebook.com/profile.php?id=61580278672015" target="_blank"><Facebook size={18}/></a>
            <a href="https://api.whatsapp.com/send?phone=918005511786" target="_blank"><FaWhatsapp size={18}/></a>
            <a href="mailto:teamsandhyafoods@gmail.com"><Mail size={18}/></a>
            <a href="tel:+918005511786"><Phone size={18}/></a>
          </div>
        </div>
      )}
    </nav>
  );
}
