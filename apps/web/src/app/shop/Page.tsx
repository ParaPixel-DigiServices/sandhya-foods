"use client"
export const dynamic = "force-static";

import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export default function RoyalExhibitionHall() {
  const [search,setSearch]=useState("")
  const [sort,setSort]=useState("new")

  const { data: products } = useQuery({
    queryKey:["shop",search,sort],
    queryFn: async()=>{
      let q = supabase.from("products").select("*,product_images(url,is_primary)").eq("active",true)
      if(search) q = q.ilike("name",`%${search}%`)
      if(sort==="low") q = q.order("price",{ascending:true})
      if(sort==="high") q = q.order("price",{ascending:false})
      return (await q).data
    }
  })

  return (
    <section className="relative overflow-hidden min-h-screen">

      {/* Royal Light Canopy */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(120,70,30,0.12))]" />

      <div className="relative max-w-[1600px] mx-auto px-6 py-28 space-y-24">

        {/* Royal Control Pavilion */}
        <div className="flex flex-col md:flex-row justify-center gap-6">

          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Search Products..."
            className="
              w-full md:w-96
              px-8 py-4 rounded-full
              bg-white
              border border-gold/40
              shadow-inner
              text-center tracking-wide
            "
          />

          <select
            value={sort}
            onChange={e=>setSort(e.target.value)}
            className="
              px-8 py-4 rounded-full
              bg-white
              border border-gold/40
              shadow-inner
              tracking-wide
            "
          >
            <option value="new">Newest First</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

        </div>

        {/* Palace Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-28">

          {products?.map(p=>(
            <a key={p.id} href={`/product/${p.slug}`} className="group relative">

              {/* Mandala Aura */}
              <div className="absolute -inset-20 bg-[radial-gradient(circle,rgba(212,175,55,0.35),transparent_70%)]
                              opacity-30 sm:opacity-0 sm:group-hover:opacity-100 blur-3xl transition" />

              {/* Rangoli Frame */}
              <div className="relative bg-[url('/border.png')] bg-contain bg-no-repeat bg-center p-10 sm:p-14">

                {/* Marble Altar */}
                <div className="bg-white rounded-[2.8rem] p-4 sm:p-5 shadow-[0_60px_160px_rgba(0,0,0,0.45)]">

                  {/* Gold Shrine */}
                  <div className="relative rounded-[1.6rem] p-[6px] bg-[linear-gradient(135deg,#EED27B,#D4AF37,#B08B2C)] shadow-inner">
                    <div className="bg-white rounded-[1.3rem] p-2">
                      <div className="aspect-[4/3] flex items-center justify-center">
                        <img
                          src={p.product_images?.find(i=>i.is_primary)?.url}
                          className="max-w-[90%] object-contain rounded-[1rem]
                                     drop-shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                                     transition group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gold Divider */}
                  <div className="relative mx-auto w-[70%] h-[1px] bg-gold my-4 sm:my-6">
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold rotate-45" />
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold rotate-45" />
                  </div>

                  {/* Placard */}
                  <div className="text-center">
                    <h3 className="font-royal text-[0.9rem] sm:text-xl tracking-wide text-royal mb-1 sm:mb-2">
                      {p.name}
                    </h3>
                    <div className="text-[0.75rem] sm:text-sm mb-4 sm:mb-6">₹ {p.price}</div>
                    <button className="px-8 sm:px-12 py-2 sm:py-3 rounded-full
                                       bg-[radial-gradient(circle_at_top,#FFE39B,#D4AF37)]
                                       text-[#5C3A00] text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-semibold
                                       shadow-md transition hover:scale-105">
                      Add To Cart
                    </button>
                  </div>

                </div>
              </div>
            </a>
          ))}

        </div>
      </div>
    </section>
  )
}
