import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// This edge function is kept for backward compatibility.
// Primary payment verification now happens via the Next.js API route
// at /api/razorpay/verify-payment using Razorpay signature verification.

serve(async (req) => {
  const { order_id, razorpay_payment_id, status } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: order } = await supabase.from("orders_v2").select("*").eq("id", order_id).single();

  if (!order) return new Response("Order not found", { status: 404 });

  await supabase.from("orders_v2").update({
    status,
    razorpay_payment_id: razorpay_payment_id || null,
  }).eq("id", order_id);

  if (status === "paid") {
    const { data: items } = await supabase.from("order_items_v2").select("*").eq("order_id", order_id);

    if (items) {
      for (const i of items) {
        await supabase.rpc("deduct_stock", { pid: i.product_id, q: i.qty });
      }
    }
  }

  return new Response("ok");
});
