
import { getNotifications } from "../api/ordenApi"
import { LiveOrdersFeed } from "@/components/live-orders-feed"

export async function ServerOrdersFeed() {
  const notifications = await getNotifications()
  return <LiveOrdersFeed initialNotifications={notifications} />
}