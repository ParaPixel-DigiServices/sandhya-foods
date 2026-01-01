import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  if (data?.role !== "admin") redirect("/");

  return <div>{children}</div>;
}
