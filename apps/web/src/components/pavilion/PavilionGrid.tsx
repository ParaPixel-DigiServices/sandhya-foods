"use client"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import PavilionCard from "./PavilionCard"

export default function PavilionGrid() {
  const { data } = useQuery({
    queryKey:["categories"],
    queryFn: async()=>{
      const { data } = await supabase.from("categories").select("*").eq("active",true)
      return data
    }
  })

  if(!data) return null

  return (
    <section className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-2 md:grid-cols-4 gap-8">
      {data.map(c=>(
        <PavilionCard key={c.id} title={c.name} image={c.image} href={`/shop?cat=${c.slug}`} />
      ))}
    </section>
  )
}
