"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function Product({ params }:{params:{slug:string}}) {
  const { data } = useQuery({
    queryKey:["product",params.slug],
    queryFn: async()=>{
      const { data } = await supabase.from("products").select("*,product_images(url)").eq("slug",params.slug).single();
      return data;
    }
  });

  const add = useMutation({
    mutationFn: async()=>{
      await supabase.from("cart_items").insert({ product_id:data.id, qty:1 });
    }
  });

  if(!data) return null;

  return (
    <div className="p-4">
      <img src={data.product_images[0]?.url}/>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <button onClick={()=>add.mutate()} className="bg-black text-white p-3 mt-4">Add to Cart</button>
    </div>
  );
}
