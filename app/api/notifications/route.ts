import { NextResponse } from "next/server";
import { getStoreNotifications } from "./notificationsStore";

export async function GET() {
  try {
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
