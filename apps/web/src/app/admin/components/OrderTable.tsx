"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function OrdersTable() {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      return data;
    }
  });

  if (!data) return null;

  return (
    <div className="bg-white mt-6">
      {data.map(o => (
        <div key={o.id} className="flex justify-between p-4 border-b">
          <span>{o.id}</span>
          <span>{o.order_status}</span>
          <span>{o.total_amount}</span>
        </div>
      ))}
    </div>
  );
}
