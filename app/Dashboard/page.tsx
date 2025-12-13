
import { DashboardLayout } from "./layout/Dasboard.layout";
import { getNotifications } from "../api/notifications/orderApi";
import { KPICards } from "@/components/kpi-cards";
import { QuickInsights } from "@/components/quick-insights";
import { calculateDashboardMetrics } from "./domain/OrderMetrics";
import { mockOrders } from "@/data/dataOrder";
import { LiveOrdersFeed } from "@/components/live-orders-feed";

 
export default async function DashboardPage() {
  const initialNotifications = await getNotifications();

  return (
    <DashboardLayout initialNotifications={initialNotifications}>
      <div className="space-y-6">
        <KPICards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LiveOrdersFeed />
          </div>
          <div className="lg:col-span-1">
            <QuickInsights />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
