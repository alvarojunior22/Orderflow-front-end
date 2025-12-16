import { NextResponse } from "next/server";
import {
  markAllStoreNotificationsRead,
  updateStoreNotification,
} from "../notificationsStore";

export async function PUT(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const [segment] = params.slug;

  try {
    // Mark all notifications as read
    if (segment === "mark-all-read") {
      markAllStoreNotificationsRead();

      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Update a single notification
    if (segment) {
      const body = await request.json().catch(() => null);
      const unread = body?.unread ?? false;

      updateStoreNotification(segment, unread);

      return NextResponse.json({ success: true, id: segment }, { status: 200 });
    }

    // Invalid route
    return NextResponse.json(
      { message: "Invalid notification route" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Notification update error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
