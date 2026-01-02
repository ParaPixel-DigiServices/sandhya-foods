"use client"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import RoyalPaymentShrine from "@/components/payment/RoyalPaymentShrine"

export default function PaymentPage() {
  const params = useParams()

  if (!params?.orderId) return null

  const orderId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : params.orderId

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders_v2")
        .select("*")
        .eq("id", orderId)
        .single()

      if (error) throw error
      return data
    }
  })

  if (isLoading || !order) return null

  return <RoyalPaymentShrine order={order} />
}
