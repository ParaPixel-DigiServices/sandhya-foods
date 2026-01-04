"use client"

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
    <section className="relative overflow-hidden min-h-screen w-full">

      {/* Royal Light Canopy */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(120,70,30,0.12))]" />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-12 sm:space-y-24">

        {/* Royal Control Pavilion */}
        <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 max-w-full">

          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Search Products..."
            className="
              w-full md:w-96
              px-6 sm:px-8 py-3 sm:py-4 rounded-full
              bg-white
              border border-gold/40
              shadow-inner
              text-center tracking-wide
              text-sm sm:text-base
            "
          />

          <select
            value={sort}
            onChange={e=>setSort(e.target.value)}
            className="
              w-full md:w-auto
              px-6 sm:px-8 py-3 sm:py-4 rounded-full
              bg-white
              border border-gold/40
              shadow-inner
              tracking-wide
              text-sm sm:text-base
            "
          >
            <option value="new">Newest First</option>
            <option value="low">Price : Low → High</option>
            <option value="high">Price : High → Low</option>
          </select>

        </div>

        {/* Palace Gallery - REDUCED COLUMNS for bigger cards */}
        {/* Was: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
        {/* Now: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 (no 4-column layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 md:gap-20 lg:gap-24 w-full">

          {products?.map(p=>(
            <div key={p.id} className="group relative w-full max-w-full min-w-0">

              {/* Mandala Aura */}
              <div className="absolute -inset-8 sm:-inset-20 bg-[radial-gradient(circle,rgba(212,175,55,0.35),transparent_70%)]
                              opacity-0 group-hover:opacity-100 blur-3xl transition duration-500 pointer-events-none" />

              {/* Outer Container */}
              <div className="relative w-full">
                
                {/* Border Image - Background layer */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <img 
                    src="/border.png" 
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Card Container - Exact 2:3 ratio matching border (1024:1536 = 150%) */}
                <div className="relative w-full z-10" style={{ paddingBottom: '150%' }}>
                  {/* Card positioned with exact padding: 10% horizontal, 12% vertical */}
                  <div className="absolute inset-0" style={{ padding: '12% 10%' }}>

                    {/* Marble Altar */}
                    <div className="w-full h-full bg-white 
                                    rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem]
                                    p-4 sm:p-5 md:p-6 lg:p-7
                                    shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:shadow-[0_60px_160px_rgba(0,0,0,0.45)] 
                                    flex flex-col overflow-hidden">

                      {/* Gold Shrine */}
                      <div className="flex-1 min-h-0 
                                      rounded-[1.1rem] sm:rounded-[1.5rem] md:rounded-[1.9rem] lg:rounded-[2.4rem]
                                      p-[4px] sm:p-[5px] md:p-[6px] lg:p-[7px]
                                      bg-[linear-gradient(135deg,#EED27B,#D4AF37,#B08B2C)] shadow-inner overflow-hidden">
                        <div className="w-full h-full bg-white 
                                        rounded-[0.9rem] sm:rounded-[1.2rem] md:rounded-[1.6rem] lg:rounded-[2rem]
                                        p-3 sm:p-4 md:p-5 lg:p-6
                                        flex flex-col overflow-hidden">
                          
                          {/* Image Container */}
                          <div className="flex-[2.5] min-h-0 flex items-center justify-center overflow-hidden">
                            <img
                              src={p.product_images?.find(i=>i.is_primary)?.url}
                              alt={p.name}
                              className="max-w-[80%] max-h-[90%] object-contain 
                                         rounded-[0.6rem] sm:rounded-[0.8rem] md:rounded-[1.1rem] lg:rounded-[1.4rem]
                                         drop-shadow-[0_15px_40px_rgba(0,0,0,0.45)] sm:drop-shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                                         transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          {/* Gold Divider */}
                          <div className="relative mx-auto w-[55%] h-[1px] bg-gold my-2 sm:my-2.5 md:my-3 flex-shrink-0">
                            <span className="absolute -left-1 sm:-left-1.5 md:-left-2 top-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gold rotate-45" />
                            <span className="absolute -right-1 sm:-right-1.5 md:-right-2 top-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gold rotate-45" />
                          </div>

                          {/* Placard */}
                          <div className="text-center flex-shrink-0 flex-[1.5] flex flex-col justify-center gap-1 sm:gap-1.5 md:gap-2 overflow-hidden">
                            
                            {/* Title - No truncation */}
                            <h3 className="font-royal 
                                           text-[0.65rem] sm:text-[0.75rem] md:text-[0.85rem] lg:text-[0.95rem] xl:text-[1.05rem]
                                           tracking-wide text-royal 
                                           leading-snug break-words px-1">
                              {p.name}
                            </h3>
                            
                            {/* Price */}
                            <div className="text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]
                                            font-semibold text-royal">
                              ₹ {p.price}
                            </div>
                            
                            {/* Button */}
                            <a 
                              href={`/product/${p.slug}`}
                              className="inline-block
                                         px-2 sm:px-3 md:px-4 lg:px-5
                                         py-1.5 sm:py-2 md:py-2.5
                                         rounded-full
                                         bg-[radial-gradient(circle_at_top,#FFE39B,#D4AF37)]
                                         text-[#5C3A00] 
                                         text-[0.4rem] sm:text-[0.45rem] md:text-[0.5rem] lg:text-[0.55rem]
                                         tracking-[0.15em] sm:tracking-[0.18em] md:tracking-[0.2em]
                                         uppercase font-semibold
                                         shadow-md transition-transform duration-300 hover:scale-105
                                         active:scale-95"
                            >
                              Add To Cart
                            </a>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Empty State */}
        {products?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-royal/60 tracking-widest uppercase text-sm">No products found</p>
          </div>
        )}

      </div>
    </section>
  )
}