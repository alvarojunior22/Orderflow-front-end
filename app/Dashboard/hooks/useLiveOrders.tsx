"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { ApiOrdersResponse } from "@/app/Dashboard/types/api-order";
import { adaptApiOrder } from "../adapters/order.adapter";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface UseLiveOrdersOptions {
  pollingMs?: number;
}

export function useLiveOrders({ pollingMs = 5000 }: UseLiveOrdersOptions = {}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNewOrders, setHasNewOrders] = useState(false);

  const knownIds = useRef<Set<string>>(new Set());

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders?limit=50&offset=0`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`API error ${res.status}`);
      }

      const json: ApiOrdersResponse = await res.json();
      const normalized = json.data.map(adaptApiOrder);

      const hasNew = normalized.some((o) => !knownIds.current.has(o.id));

      normalized.forEach((o) => knownIds.current.add(o.id));

      if (hasNew) {
        setHasNewOrders(true);
      }

      setOrders(normalized);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, pollingMs);
    return () => clearInterval(interval);
  }, [fetchOrders, pollingMs]);

  return {
    orders,
    loading,
    error,
    hasNewOrders,
  };
}
