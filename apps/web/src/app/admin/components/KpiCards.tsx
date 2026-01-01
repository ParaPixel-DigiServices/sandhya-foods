"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function KpiCards() {
  const { data } = useQuery({
    queryKey: ["kpis"],
    queryFn: async () => {
      const { data: orders } = await supabase.from("orders").select("total_amount,payment_status");
      const paid = orders?.filter(o => o.payment_status === "paid") || [];
      return {
        revenue: paid.reduce((s, o) => s + Number(o.total_amount), 0),
        pending: orders?.filter(o => o.payment_status === "pending").length || 0
      };
    }
  });

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-6 bg-white">{data.revenue}</div>
      <div className="p-6 bg-white">{data.pending}</div>
    </div>
  );
}
