import { DashboardLayout } from "./layout/Dasboard.layout"
import { ServerOrdersFeed } from "./servers/serverOrder"
import { KPICards } from "@/components/kpi-cards"
import { QuickInsights } from "@/components/quick-insights"

export default function DashboardPage() {
  return (
    <DashboardLayout currentPage="Dashboard">
      <div className="space-y-6">
        <KPICards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ServerOrdersFeed />
          </div>
          <div className="lg:col-span-1">
            <QuickInsights />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}