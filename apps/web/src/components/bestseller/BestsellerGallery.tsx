"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import BestsellerCard from "./BestsellerCard";

export default function BestsellerGallery() {
  const { data } = useQuery({
    queryKey: ["bestsellers"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("id,name,slug,price,product_images(url,is_primary)")
        .eq("is_bestseller", true);
      return data;
    },
  });

  if (!data) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <div className="flex justify-between items-end mb-10">
        <h2 className="font-royal text-3xl text-royal">Royal Bestsellers</h2>
        <a href="/shop" className="text-gold text-sm">
          View All
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {data.map((p) => (
          <BestsellerCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
