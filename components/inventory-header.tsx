"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Upload, Search } from "lucide-react"

export function InventoryHeader() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Product Catalog</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your inventory and fix data inconsistencies</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="w-4 h-4" />
            Import from Excel
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search by Name, SKU, or Barcode..."
            className="pl-11 h-11 bg-white border-slate-300 text-base"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48 h-11 bg-white border-slate-300">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="beverages">Beverages</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="snacks">Snacks</SelectItem>
            <SelectItem value="fresh">Fresh Produce</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
