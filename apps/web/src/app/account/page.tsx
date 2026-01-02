"use client";
export const dynamic = 'force-static'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const uid = data.user.id;

      const { data: profileRow } = await supabase
        .from("profiles")
        .select("id,full_name,email,phone,created_at,role")
        .eq("id", uid)
        .single();

      setProfile(profileRow);

      const { data: orders } = await supabase.rpc("get_my_orders", { uid });
      setOrders(orders || []);
    });
  }, []);

  if (!profile) return null;
  const isAdmin = profile.role === "admin";

  const statusStyle = (s: string) =>
    ({
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      unverified: "bg-amber-100 text-amber-800 border-amber-300",
      verified: "bg-green-100 text-green-800 border-green-300",
      shipped: "bg-blue-100 text-blue-800 border-blue-300",
      delivered: "bg-emerald-100 text-emerald-800 border-emerald-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    }[s] || "bg-gray-100 text-gray-700 border-gray-300");

  return (
    <section className="min-h-screen bg-[#F6EEDC] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Profile Crest */}
        <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl flex flex-col sm:flex-row gap-10 items-center">
          <div className="w-32 h-32 rounded-full border-4 border-gold bg-[#FFF4D6] text-3xl font-royal text-royal flex items-center justify-center">
            {profile.full_name?.charAt(0) || "?"}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <b>Name</b>
              <br />
              {profile.full_name}
            </div>
            <div>
              <b>Email</b>
              <br />
              {profile.email}
            </div>
            <div>
              <b>Phone</b>
              <br />
              {profile.phone}
            </div>
            <div>
              <b>Member Since</b>
              <br />
              {profile.created_at?.slice(0, 10)}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            {isAdmin && (
              <a href="/admin" className="royal-btn bg-[#7A1A14] text-white">
                Admin Dashboard
              </a>
            )}
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                location.href = "/";
              }}
              className="royal-btn"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl">
          <h2 className="font-royal text-3xl text-royal mb-8">My Orders</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((o) => (
              <div
                key={o.id}
                className="border border-gold/40 rounded-3xl p-6 bg-[#FFF9ED] text-sm space-y-3"
              >
                <div className="flex justify-between text-xs uppercase tracking-widest text-gold">
                  <span>Order #{o.id.slice(0, 6)}</span>
                  <span>{o.created_at.slice(0, 10)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Status</span>
                  <span
                    className={`px-3 py-1 rounded-full border text-xs ${statusStyle(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </div>

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹ {o.total}</span>
                </div>

                <div className="border-t border-gold/30 pt-2 text-xs space-y-1">
                  {o.items?.map((i: any, idx: number) => (
                    <div key={idx} className="flex justify-between">
                      <span>{i.name}</span>
                      <span>
                        {i.qty} × ₹{i.price}
                      </span>
                    </div>
                  ))}
                </div>

                {o.admin_note && (
                  <div className="bg-[#F6EEDC] border border-gold/40 rounded-xl p-3 text-xs">
                    {o.admin_note}
                  </div>
                )}

                {o.status === "pending" && (
                  <a
                    href={`/payment/${o.id}`}
                    className="royal-btn block text-center"
                  >
                    Complete Payment
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
