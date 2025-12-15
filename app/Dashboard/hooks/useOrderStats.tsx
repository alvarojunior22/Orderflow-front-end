"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/authFetch";
import { useAuth } from "@/app/context/authcontext";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface ApiOrderStatsData {
  total_orders: number;
  pending: number;
  confirmed: number;
  preparing: number;
  in_transit: number;
  delivered: number;
  cancelled: number;
  total_revenue: number;
}

interface ApiOrderStatsResponse {
  success: boolean;
  data: ApiOrderStatsData;
}

export interface OrderStats {
  totalOrders: number;
  pending: number;
  confirmed: number;
  preparing: number;
  inTransit: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number;
}

interface UseOrderStatsResult {
  stats: OrderStats | null;
  loading: boolean;
  error: string | null;
}

export function useOrderStats(): UseOrderStatsResult {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { storeId } = useAuth();

  useEffect(() => {
    let isActive = true;

    const fetchStats = async () => {
      if (!storeId) {
        if (isActive) {
          setStats(null);
          setLoading(false);
          setError(null);
        }
        return;
      }

      try {
        setLoading(true);

        const res = await authFetch(
          `${API_URL}/api/orders/stats?store_id=${storeId}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          const errorBody = await res.text();
          throw new Error(errorBody || "Failed to fetch order stats");
        }

        const json: ApiOrderStatsResponse = await res.json();
        const data = json.data;

        if (!isActive) return;

        setStats({
          totalOrders: data.total_orders,
          pending: data.pending,
          confirmed: data.confirmed,
          preparing: data.preparing,
          inTransit: data.in_transit,
          delivered: data.delivered,
          cancelled: data.cancelled,
          totalRevenue: data.total_revenue,
        });

        setError(null);
      } catch (err) {
        console.error("Failed to fetch order stats:", err);
        if (isActive) {
          setError("Failed to fetch metrics");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void fetchStats();

    return () => {
      isActive = false;
    };
  }, [storeId]);

  return { stats, loading, error };
}
