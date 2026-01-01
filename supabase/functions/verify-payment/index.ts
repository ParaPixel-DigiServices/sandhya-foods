import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {
  const { order_id, status, proof_url } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: order } = await supabase.from("orders").select("*").eq("id", order_id).single();

  if (!order) return new Response("Order not found", { status: 404 });

  await supabase.from("payments").update({ status, proof_url }).eq("order_id", order_id);

  if (status === "verified") {
    const { data: items } = await supabase.from("order_items").select("*").eq("order_id", order_id);

    for (const i of items) {
      await supabase.rpc("deduct_stock", { pid: i.product_snapshot.id, q: i.qty });
    }

    await supabase.from("orders").update({ payment_status: "paid" }).eq("id", order_id);
  }

  return new Response("ok");
});
