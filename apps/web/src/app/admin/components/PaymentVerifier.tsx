"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function PaymentVerifier() {
  const { data, refetch } = useQuery({
    queryKey: ["pending-payments"],
    queryFn: async () => {
      const { data } = await supabase.from("payments").select("*,orders(*)").eq("status","pending");
      return data;
    }
  });

  const verify = useMutation({
    mutationFn: async (p: any) => {
      await fetch("/functions/v1/verify-payment", {
        method: "POST",
        body: JSON.stringify({ order_id: p.order_id, status: "verified", proof_url: p.proof_url })
      });
    },
    onSuccess: () => refetch()
  });

  if (!data) return null;

  return (
    <div className="bg-white mt-6">
      {data.map(p => (
        <div key={p.id} className="flex justify-between p-4 border-b">
          <span>{p.orders.id}</span>
          <button onClick={() => verify.mutate(p)}>Verify</button>
        </div>
      ))}
    </div>
  );
}
