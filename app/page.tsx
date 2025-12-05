import { DashboardLayout } from "@/components/dashboard-layout"
import { KPICards } from "@/components/kpi-cards"
import { LiveOrdersFeed } from "@/components/live-orders-feed"
import { QuickInsights } from "@/components/quick-insights"

export default function DashboardPage() {
  return (
    <DashboardLayout>
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
  )
}
