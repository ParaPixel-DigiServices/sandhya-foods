"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function StockManager() {
  const { data, refetch } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const { data } = await supabase.from("inventory").select("*,products(name)");
      return data;
    }
  });

  const update = useMutation({
    mutationFn: async (i: any) => {
      await supabase.from("inventory").update({ stock: i.stock }).eq("product_id", i.product_id);
    },
    onSuccess: () => refetch()
  });

  if (!data) return null;

  return (
    <div className="bg-white mt-6">
      {data.map(i => (
        <div key={i.product_id} className="flex justify-between p-4 border-b">
          <span>{i.products.name}</span>
          <input defaultValue={i.stock} onBlur={e => update.mutate({ ...i, stock: Number(e.target.value) })}/>
        </div>
      ))}
    </div>
  );
}
