import { DashboardLayout } from "../../layout/Dasboard.layout"
import { OrdersHeader } from "@/components/orders-header"
import { OrdersTable } from "@/components/orders-table"

export default function OrdersPage() {
  return (
    <DashboardLayout currentPage="Live Orders">
      <div className="space-y-6">
        <OrdersHeader />
        <OrdersTable />
      </div>
    </DashboardLayout>
  )
}
