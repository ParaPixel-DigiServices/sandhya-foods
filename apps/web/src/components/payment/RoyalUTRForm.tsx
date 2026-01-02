"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RoyalUTRForm({ order }: { order: any }) {
  const router = useRouter();
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!utr) return alert("Enter UTR");

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Login required");

    await supabase.from("payments_v2").insert({
      order_id: order.id,
      user_id: user.id,
      utr,
      status: "submitted",
    });

    await supabase
      .from("orders_v2")
      .update({ status: "unverified" })
      .eq("id", order.id);

    router.push("/success/[orderId]".replace("[orderId]", order.id));
  };

  return (
    <div>
      <input
        placeholder="Enter UTR Number"
        value={utr}
        onChange={(e) => setUtr(e.target.value)}
        className="w-full border border-amber-300 rounded-full px-6 py-3 mb-4"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="w-full py-4 rounded-full bg-[#7B1113] text-white tracking-widest text-xs uppercase"
      >
        {loading ? "Submitting..." : "Submit Payment Proof"}
      </button>
    </div>
  );
}
