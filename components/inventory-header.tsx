"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Upload, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createProduct } from "@/app/Dashboard/services/product.services"
import { useAuth } from "@/app/context/authcontext"

interface InventoryHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onProductCreated: () => void
}

interface CreateProductFormState {
  name: string
  price: string
  stock: string
  unit: string
  category: string
  barcode: string
  description: string
}

export function InventoryHeader({ searchQuery, onSearchChange, onProductCreated }: InventoryHeaderProps) {
  const { storeId } = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<CreateProductFormState>({
    name: "",
    price: "",
    stock: "",
    unit: "",
    category: "",
    barcode: "",
    description: "",
  })

  const handleInputChange = (field: keyof CreateProductFormState, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      stock: "",
      unit: "",
      category: "",
      barcode: "",
      description: "",
    })
    setError(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!storeId) {
      setError("Store is not selected. Please log in again.")
      return
    }

    if (!form.name.trim()) {
      setError("Product name is required.")
      return
    }

    const priceValue = Number.parseFloat(form.price || "0")
    const stockValue = Number.parseInt(form.stock || "0", 10)

    try {
      setSubmitting(true)
      setError(null)

      await createProduct({
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: Number.isNaN(priceValue) ? 0 : priceValue,
        stock: Number.isNaN(stockValue) ? 0 : stockValue,
        unit: form.unit.trim() || "Unit",
        category: form.category.trim() || "Uncategorized",
        storeId,
        image_url: null,
        barcode: form.barcode.trim() || null,
        active: true,
      })

      resetForm()
      setIsDialogOpen(false)
      onProductCreated()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create product"
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

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
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) {
                resetForm()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add product</DialogTitle>
                <DialogDescription>Create a new product in your catalog.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Name</Label>
                  <Input
                    id="product-name"
                    value={form.name}
                    onChange={(event) => handleInputChange("name", event.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Price</Label>
                    <Input
                      id="product-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(event) => handleInputChange("price", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-stock">Stock</Label>
                    <Input
                      id="product-stock"
                      type="number"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={(event) => handleInputChange("stock", event.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-unit">Unit</Label>
                    <Input
                      id="product-unit"
                      value={form.unit}
                      onChange={(event) => handleInputChange("unit", event.target.value)}
                      placeholder="Unit, Kg, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Input
                      id="product-category"
                      value={form.category}
                      onChange={(event) => handleInputChange("category", event.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-barcode">Barcode/SKU</Label>
                  <Input
                    id="product-barcode"
                    value={form.barcode}
                    onChange={(event) => handleInputChange("barcode", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea
                    id="product-description"
                    rows={3}
                    value={form.description}
                    onChange={(event) => handleInputChange("description", event.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={submitting}
                  >
                    {submitting ? "Saving..." : "Create product"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search by Name, SKU, or Barcode..."
            className="pl-11 h-11 bg-white border-slate-300 text-base"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
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
