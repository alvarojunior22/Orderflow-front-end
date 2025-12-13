"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { mockOrders } from "@/data/dataOrder";

interface UseLiveOrdersOptions {
  pollingMs?: number;
}

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export function useLiveOrders({ pollingMs = 5000 }: UseLiveOrdersOptions = {}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNewOrders, setHasNewOrders] = useState(false);

  const knownIds = useRef<Set<string>>(new Set());

  const normalize = (data: Order[]) =>
    data.map((o) => ({
      ...o,
      createdAt: new Date(o.createdAt),
      updatedAt: new Date(o.updatedAt),
    }));

  const loadMockOrders = () => {
    const normalized = normalize(mockOrders);
    normalized.forEach((o) => knownIds.current.add(o.id));
    setOrders(normalized);
    setLoading(false);
  };

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data: Order[] = await res.json();
      const normalized = normalize(data);

      const hasNew = normalized.some((o) => !knownIds.current.has(o.id));
      normalized.forEach((o) => knownIds.current.add(o.id));

      if (hasNew) setHasNewOrders(true);

      setOrders(normalized);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to sync orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (USE_MOCKS) {
      loadMockOrders();
      return;
    }

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
