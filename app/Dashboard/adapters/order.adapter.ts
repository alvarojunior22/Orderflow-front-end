import { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { ApiOrder, ApiOrderStatus } from "@/app/api/types/api-order";

export function adaptApiOrder(apiOrder: ApiOrder): Order {
  return {
    id: apiOrder.id,
    customer: apiOrder.customer_name ?? "Telegram User",
    channel: "telegram",
    amount: apiOrder.total,
    status: mapApiStatus(apiOrder.status),
    createdAt: new Date(apiOrder.created_at),
    updatedAt: new Date(apiOrder.updated_at ?? apiOrder.created_at),
  };
}

function mapApiStatus(status: ApiOrderStatus): Order["status"] {
  switch (status) {
    case "pending":
      return "awaiting";

    case "confirmed":
    case "preparing":
      return "processing";

    case "in_transit":
      return "ready";

    case "delivered":
      return "completed";

    case "cancelled":
      return "cancelled";
  }
}
