"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [statusDist, setStatusDist] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("orders_v2")
      .select("total,created_at")
      .then(({ data }) => {
        if (!data) return;
        setOrders(data.length);
        setRevenue(data.reduce((s, o) => s + Number(o.total), 0));

        const map: any = {};
        data.forEach((o) => {
          const d = o.created_at.slice(0, 10);
          map[d] = (map[d] || 0) + Number(o.total);
        });
        setTimeline(
          Object.entries(map).map(([date, total]) => ({ date, total }))
        );
      });

    supabase
      .from("profiles")
      .select("id")
      .then(({ data }) => setCustomers(data?.length || 0));

    supabase
      .from("orders_v2")
      .select("status")
      .then(({ data }) => {
        if (!data) return;
        const map: any = {};
        data.forEach((o) => (map[o.status] = (map[o.status] || 0) + 1));
        setStatusDist(
          Object.entries(map).map(([name, value]) => ({ name, value }))
        );
      });

    supabase
      .from("order_items_v2")
      .select("name,qty")
      .then(({ data }) => {
        if (!data) return;
        const map: any = {};
        data.forEach((i) => (map[i.name] = (map[i.name] || 0) + i.qty));
        setTopProducts(
          Object.entries(map).map(([name, qty]) => ({ name, qty }))
        );
      });
  }, []);

  const COLORS = ["#7A1A14", "#D4AF37", "#0F4D3A", "#C9A76B", "#2A1E1A"];

  return (
    <div className="royal-hall space-y-8 md:space-y-14 w-full max-w-full">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {[
          { label: "Royal Revenue", value: `₹ ${revenue}` },
          { label: "Total Orders", value: orders },
          { label: "Subjects", value: customers },
          { label: "Crown Product", value: topProducts[0]?.name || "—" },
        ].map((k, i) => (
          <div key={i} className="royal-stat">
            <div className="royal-stat-label">{k.label}</div>
            <div className="royal-stat-value">{k.value}</div>
            <div className="royal-stat-glow" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 md:gap-12 w-full">
        <div className="palace-panel w-full min-w-0">
          <div className="palace-panel-title">Royal Revenue Flow</div>
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area dataKey="total" stroke="#7A1A14" fill="#D4AF37" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="palace-panel w-full min-w-0">
          <div className="palace-panel-title">Order Pipeline</div>
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusDist}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#7A1A14" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="palace-panel w-full min-w-0">
          <div className="palace-panel-title">Status Distribution</div>
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusDist} dataKey="value" outerRadius={95}>
                  {statusDist.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="palace-panel w-full min-w-0">
          <div className="palace-panel-title">Crown Products</div>
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qty" fill="#D4AF37" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}