"use client"

import { use } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import RoyalProductShrine from "@/components/product/RoyalProductShrine"
import RoyalProductInfo from "@/components/product/RoyalProductInfo"
import RoyalProductBackdrop from "@/components/product/RoyalProductBackdrop"

export default function ProductPage({ params }:{ params: Promise<{ slug:string }> }) {

  const { slug } = use(params)

  const { data: product } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => (
      await supabase
        .from("products")
        .select("*,product_images(url,is_primary)")
        .eq("slug", slug)
        .single()
    ).data
  })

  if (!product) return null

  return (
    <section className="relative overflow-hidden">
      <RoyalProductBackdrop />

      <div className="
        relative max-w-[92rem] mx-auto
        px-4 sm:px-6 lg:px-12
        pt-24 sm:pt-32 lg:pt-36
        pb-32 sm:pb-40
      ">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-6">
            <RoyalProductShrine product={product} />
          </div>
          <div className="lg:col-span-6">
            <RoyalProductInfo product={product} />
          </div>
        </div>

      </div>
    </section>
  )
}
