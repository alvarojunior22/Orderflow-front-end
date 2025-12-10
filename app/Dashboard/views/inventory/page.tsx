import { DashboardLayout } from "../../layout/Dasboard.layout"
import { InventoryGrid } from "@/components/inventory-grid"
import { InventoryHeader } from "@/components/inventory-header"

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
