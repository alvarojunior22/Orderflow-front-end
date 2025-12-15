import axios from "axios";
import { Notification } from "@/app/Dashboard/interfaces/interface-Notifications";

const APP_URL =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_APP_URL : "";

/**
 * Notifications live in Next.js, not in the external API
 */
export async function getNotifications(): Promise<Notification[]> {
  const response = await axios.get(`${APP_URL}/api/notifications`);
  return response.data;
}

export async function updateNotificationStatus(
  notificationId: string,
  unread: boolean
) {
  await axios.put(`/api/notifications/${notificationId}`, { unread });
}

export async function updateAllNotificationsRead() {
  await axios.put(`/api/notifications/mark-all-read`);
}
