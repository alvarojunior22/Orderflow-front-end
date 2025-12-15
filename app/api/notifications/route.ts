import { adaptApiOrder } from "@/app/Dashboard/adapters/order.adapter";
import { ApiOrdersResponse } from "@/app/api/types/api-order";
import { NextResponse } from "next/server";
import {
  getStoreNotifications,
  syncNotificationsFromOrders,
} from "./notificationsStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/orders?limit=5&offset=0`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders for notifications");
    }

    const json: ApiOrdersResponse = await res.json();

    const orders = json.data.map(adaptApiOrder);

    syncNotificationsFromOrders(orders);

    const notifications = getStoreNotifications();

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return NextResponse.json(
      { message: "Error interno del servidor al obtener notificaciones" },
      { status: 500 }
    );
  }
}
