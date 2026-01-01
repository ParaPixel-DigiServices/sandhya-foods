"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function Shop() {
  const { data } = useQuery({
    queryKey:["products"],
    queryFn: async()=>{
      const { data } = await supabase.from("products").select("*,product_images(url,is_primary)");
      return data;
    }
  });

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {data?.map(p=>(
        <a key={p.id} href={`/product/${p.slug}`} className="border p-2 block">
          <img src={p.product_images?.find(i=>i.is_primary)?.url || ""} />
          <div>{p.name}</div>
          <div>₹{p.price}</div>
        </a>
      ))}
    </div>
  );
}
