"use client"

import { DashboardLayout } from "../../layout/Dasboard.layout"
import { InventoryGrid } from "@/components/inventory-grid"
import { InventoryHeader } from "@/components/inventory-header"
import { useState } from "react"
import { useAuth } from "@/app/context/authcontext"
import { log } from "console"

export default function InventoryPage() {
  const { user } = useAuth();

  console.log(user);
  

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [reloadKey, setReloadKey] = useState<number>(0)

  const handleProductCreated = () => {
    setReloadKey((previous) => previous + 1)
  }

  return (
    <DashboardLayout currentPage="Inventory Catalog">
      <div className="space-y-6">
        <InventoryHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onProductCreated={handleProductCreated}
        />
        <InventoryGrid searchQuery={searchQuery} reloadKey={reloadKey} />
      </div>
    </DashboardLayout>
  )
}
