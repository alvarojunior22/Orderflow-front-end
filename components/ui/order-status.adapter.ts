// components/ui/order-status.adapter.ts
import type { UpdatableOrderStatus } from "@/app/Dashboard/services/order.services";
import type { OrderStatus } from "@/app/Dashboard/interfaces/interface-Order";

export const UI_TO_API_STATUS: Record<OrderStatus, UpdatableOrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: [],
  preparing: [],
  in_transit: [],
  delivered: [],
  cancelled: [],
};
