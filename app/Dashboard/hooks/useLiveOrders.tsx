"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { ApiOrdersResponse } from "@/app/api/types/api-order";
import { adaptApiOrder } from "../adapters/order.adapter";
import { useAuth } from "@/app/context/authcontext";
import { authFetch } from "@/lib/authFetch";
import { toast } from "@/components/ui/use-toast";
import { syncNotificationsFromOrders } from "@/app/api/notifications/notificationsStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export function useLiveOrders(pollingMs = 5000) {
  const { storeId } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNewOrders, setHasNewOrders] = useState(false);

  const knownIds = useRef<Set<string>>(new Set());
  const initialized = useRef(false);
  const statusById = useRef<Map<string, Order["status"]>>(new Map());

  const fetchOrders = useCallback(async () => {
    if (!storeId) {
      setLoading(false);
      return;
    }

    try {
      const res = await authFetch(
        `${API_URL}/api/orders/store/${storeId}?limit=50&offset=0`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(errorBody);
      }

      const json: ApiOrdersResponse = await res.json();
      const normalized = json.data.map(adaptApiOrder);

      let hasNew = false;

      for (const order of normalized) {
        const isKnown = knownIds.current.has(order.id);
        const prevStatus = statusById.current.get(order.id);

        if (initialized.current) {
          if (!isKnown) {
            hasNew = true;
            toast({
              title: "New order",
              description: `Order ${order.id} · ${order.status}`,
            });
          } else if (prevStatus && prevStatus !== order.status) {
            toast({
              title: "Order status updated",
              description: `Order ${order.id}: ${prevStatus} → ${order.status}`,
            });
          }
        }

        knownIds.current.add(order.id);
        statusById.current.set(order.id, order.status);
      }

      if (!initialized.current) {
        initialized.current = true;
      } else {
        syncNotificationsFromOrders(normalized);
      }

      if (hasNew) {
        setHasNewOrders(true);
        window.setTimeout(() => setHasNewOrders(false), 3000);
      }

      setOrders(normalized);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    knownIds.current = new Set();
    statusById.current = new Map();
    initialized.current = false;
    setHasNewOrders(false);

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
