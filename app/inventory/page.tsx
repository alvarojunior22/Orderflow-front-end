import { DashboardLayout } from "@/components/dashboard-layout"
import { InventoryHeader } from "@/components/inventory-header"
import { InventoryGrid } from "@/components/inventory-grid"

export default function InventoryPage() {
  return (
    <DashboardLayout currentPage="Inventory Catalog">
      <div className="space-y-6">
        <InventoryHeader />
        <InventoryGrid />
      </div>
    </DashboardLayout>
  )
}
