"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { InventoryProduct } from "@/app/Dashboard/interfaces/interface-Product"
import { useInventoryProducts } from "@/app/Dashboard/hooks/useInventoryProducts"

interface InventoryGridProps {
  searchQuery?: string
  reloadKey?: number
}

export function InventoryGrid({ searchQuery, reloadKey }: InventoryGridProps) {
  const { products: fetchedProducts, loading, error } = useInventoryProducts({
    searchQuery,
    reloadKey,
  })
  const [products, setProducts] = useState<InventoryProduct[]>([])
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(true)

  useEffect(() => {
    setProducts(fetchedProducts)
  }, [fetchedProducts])

  const duplicateProducts = products.filter((p) => p.isDuplicate)

  const handleNameChange = (id: string, value: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, name: value } : p)))
  }

  const handleUnitTypeChange = (id: string, value: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, unitType: value } : p)))
  }

  const handleStockChange = (id: string, value: string) => {
    const numValue = Number.parseInt(value) || 0
    setProducts(products.map((p) => (p.id === id ? { ...p, stock: numValue } : p)))
  }

  const handlePriceChange = (id: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setProducts(products.map((p) => (p.id === id ? { ...p, price: numValue } : p)))
  }

  const handleActiveToggle = (id: string, checked: boolean) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, active: checked } : p)))
  }

  const handleMergeDuplicates = () => {
    setShowDuplicateAlert(false)
    // Remove duplicate products
    setProducts(products.filter((p) => p.id !== "2"))
  }

  return (
    <div className="space-y-4">
      {loading && (
        <Alert className="bg-slate-50 border-slate-200">
          <AlertDescription>Loading products...</AlertDescription>
        </Alert>
      )}

      {error && !loading && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Duplicate Alert */}
      {showDuplicateAlert && duplicateProducts.length > 0 && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertDescription className="flex items-center justify-between ml-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-amber-900">
                Duplicate Detected: <span className="font-semibold">Premium Coffee Beans</span> appears 2 times with the
                same barcode
              </span>
            </div>
            <Button onClick={handleMergeDuplicates} size="sm" className="bg-amber-600 hover:bg-amber-700 ml-4">
              Merge Items
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Data Grid */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider min-w-[250px]">
                  Product Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider min-w-[150px]">
                  Barcode/EAN
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Unit Type
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`hover:bg-slate-50 transition-colors ${product.isDuplicate ? "bg-amber-50/30" : ""}`}
                >
                  {/* Image */}
                  <td className="px-4 py-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-slate-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </td>

                  {/* Product Name - Editable */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Input
                        value={product.name}
                        onChange={(e) => handleNameChange(product.id, e.target.value)}
                        className="h-9 border-slate-300 focus:border-blue-500"
                      />
                      {product.isDuplicate && <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
                    </div>
                  </td>

                  {/* Barcode - Monospace */}
                  <td className="px-4 py-3">
                    <code className="text-sm font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded">
                      {product.barcode}
                    </code>
                  </td>

                  {/* Category - Badge */}
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {product.category}
                    </Badge>
                  </td>

                  {/* Unit Type - Dropdown */}
                  <td className="px-4 py-3">
                    <Select value={product.unitType} onValueChange={(value) => handleUnitTypeChange(product.id, value)}>
                      <SelectTrigger className="h-9 w-[130px] border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Unit/Pcs">Unit/Pcs</SelectItem>
                        <SelectItem value="Bulk/Kg">Bulk/Kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>

                  {/* Stock Level - Number Input with Color Indicator */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleStockChange(product.id, e.target.value)}
                        className={`h-9 w-24 border-slate-300 ${product.stock < 5 ? "border-red-300 bg-red-50" : ""}`}
                      />
                      {product.stock < 5 && (
                        <Badge variant="destructive" className="text-xs">
                          Low
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Price - Currency Input */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-600">$</span>
                      <Input
                        type="number"
                        step="0.01"
                        value={product.price}
                        onChange={(e) => handlePriceChange(product.id, e.target.value)}
                        className="h-9 w-24 border-slate-300"
                      />
                    </div>
                  </td>

                  {/* Status - Toggle Switch */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={product.active}
                        onCheckedChange={(checked) => handleActiveToggle(product.id, checked)}
                      />
                      <span className={`text-xs font-medium ${product.active ? "text-green-700" : "text-slate-500"}`}>
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
