"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function Cart() {
  const { data, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await supabase
        .from("cart_items")
        .select("*,products(name,price)");
      return data;
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("cart_items").delete().eq("id", id);
    },
    onSuccess: () => refetch(),
  });

  if (!data?.length) return <div className="p-6">Cart is empty</div>;

  const total = data.reduce((s, i) => s + i.qty * i.products.price, 0);

  return (
    <div className="p-4 max-w-md mx-auto">
      {data.map((i) => (
        <div key={i.id} className="border p-3 mb-3">
          <div>{i.products.name}</div>
          <div>Qty: {i.qty}</div>
          <div>₹{i.products.price}</div>
          <button onClick={() => remove.mutate(i.id)} className="text-red-500">
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 font-bold">Total: ₹{total}</div>
      <a
        href="/checkout"
        className="block text-center mt-4 bg-[#7A1A14] text-gold p-3 rounded-xl tracking-widest uppercase text-xs shadow-xl hover:scale-105 transition"
      >
        Checkout
      </a>
    </div>
  );
}
