// app/Dashboard/services/order.services.ts
import { ApiOrderStatus } from "@/app/api/types/api-order";
import { authFetch } from "@/lib/authFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export type UpdatableOrderStatus = Extract<
  ApiOrderStatus,
  "confirmed" | "cancelled"
>;

export async function updateOrderStatus(
  storeId: string | null,
  orderId: string,
  status: UpdatableOrderStatus
) {
  const baseUrl = new URL(`/api/orders/${orderId}/status`, API_URL);

  const tryRequest = async (url: string) => {
    const res = await authFetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      return { ok: true as const, json: await res.json(), body: "" };
    }

    return { ok: false as const, json: null, body: await res.text() };
  };

  const first = await tryRequest(baseUrl.toString());
  if (first.ok) return first.json;

  const needsStoreId = first.body.includes("store_id") ||
    first.body.toLowerCase().includes("store id is required");

  if (needsStoreId && storeId) {
    const withStore = new URL(baseUrl.toString());
    withStore.searchParams.set("store_id", storeId);
    const second = await tryRequest(withStore.toString());
    if (second.ok) return second.json;

    console.error("Update order status failed:", second.body);
    throw new Error(second.body || "Failed to update order status");
  }

  console.error("Update order status failed:", first.body);
  throw new Error(first.body || "Failed to update order status");
}
