import { ApiOrderStatus } from "@/app/api/types/api-order";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function updateOrderStatus(
  orderId: string,
  status: ApiOrderStatus
) {
  const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update order status");
  }

  return res.json();
}
