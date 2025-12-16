import { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { ApiOrder } from "@/app/api/types/api-order";

export function adaptApiOrder(apiOrder: ApiOrder): Order {
  return {
    id: apiOrder.id,
    customer: apiOrder.customer_name ?? "Telegram User",
    channel: "telegram",
    amount: apiOrder.total,
    status: apiOrder.status,
    createdAt: new Date(apiOrder.created_at),
    updatedAt: new Date(apiOrder.updated_at ?? apiOrder.created_at),
  };
}
