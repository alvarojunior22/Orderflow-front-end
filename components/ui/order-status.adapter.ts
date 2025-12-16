// components/ui/order-status.adapter.ts
import { ApiOrderStatus } from "@/app/api/types/api-order";
import type { OrderStatus } from "@/app/Dashboard/interfaces/interface-Order";

export const UI_TO_API_STATUS: Record<OrderStatus, ApiOrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["preparing"],
  preparing: ["in_transit"],
  in_transit: ["delivered"],
  delivered: [],
  cancelled: [],
};
