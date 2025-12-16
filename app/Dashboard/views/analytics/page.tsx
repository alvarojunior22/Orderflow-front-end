import { DashboardLayout } from "../../layout/Dasboard.layout"
import { AnalyticsHeader } from "@/components/analytics-header"
import { LowTurnoverTable } from "@/components/low-turnover-table"
import { RevenueOrdersChart } from "@/components/revenue-orders-chart"
import { SalesByChannelChart } from "@/components/sales-by-channel-chart"
import { TopProductsChart } from "@/components/top-products-chart"

export default function AnalyticsPage() {
  return (
    <DashboardLayout currentPage="Analytics">
      <div className="space-y-6">
        <AnalyticsHeader />

        {/* Main Chart - Full Width */}
        <RevenueOrdersChart />

        {/* Split Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopProductsChart />
          <SalesByChannelChart />
        </div>

        {/* Low Turnover Alerts */}
        <LowTurnoverTable />
      </div>
    </DashboardLayout>
  )
}
