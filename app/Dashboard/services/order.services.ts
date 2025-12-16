// app/Dashboard/services/order.services.ts
import { ApiOrderStatus } from "@/app/api/types/api-order";
import { authFetch } from "@/lib/authFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function updateOrderStatus(
  orderId: string,
  status: ApiOrderStatus
) {
  const res = await authFetch(`${API_URL}/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Update order status failed:", body);
    throw new Error(body || "Failed to update order status");
  }

  return res.json();
}
