// components/order-status-actions.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  updateOrderStatus,
  type UpdatableOrderStatus,
} from "@/app/Dashboard/services/order.services";
import { UI_TO_API_STATUS } from "@/components/ui/order-status.adapter";
import type { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { useAuth } from "@/app/context/authcontext";

interface Props {
  order: Order;
}

export function OrderStatusActions({ order }: Props) {
  const [loading, setLoading] = useState(false);
  const { storeId } = useAuth();

  const nextStatuses = UI_TO_API_STATUS[order.status] ?? [];

  if (nextStatuses.length === 0) return null;

  const handleUpdate = async (status: UpdatableOrderStatus) => {
    try {
      setLoading(true);
      await updateOrderStatus(storeId, order.id, status);
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {nextStatuses.map((status) => (
        <Button
          key={status}
          size="sm"
          variant="outline"
          disabled={loading}
          onClick={() => handleUpdate(status as UpdatableOrderStatus)}
        >
          {loading ? "Updating..." : status.replace("_", " ")}
        </Button>
      ))}
    </div>
  );
}
