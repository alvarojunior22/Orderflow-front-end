import { OrderStatus } from "@/app/Dashboard/interfaces/interface-Order";
import { ApiOrderStatus } from "@/app/api/types/api-order";

/**
 * Estados permitidos a enviar al backend
 * según el estado actual de la UI
 */
export const UI_TO_API_STATUS: Record<OrderStatus, ApiOrderStatus[]> = {
  awaiting: ["confirmed"],
  processing: ["preparing", "in_transit"],
  ready: ["delivered"],
  completed: [],
  cancelled: [],
};
