import { getNotifications } from "../api/ordenApi"
import { DashboardAlerts } from "../alert/dasboardAlerts"

export async function ServerDashboardAlerts() {
  const notifications = await getNotifications()
  return <DashboardAlerts initialNotifications={notifications} />
}