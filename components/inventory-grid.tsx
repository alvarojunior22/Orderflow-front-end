"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";
import type { InventoryProduct } from "@/app/Dashboard/interfaces/interface-Product";
import { useInventoryProducts } from "@/app/Dashboard/hooks/useInventoryProducts";

interface InventoryGridProps {
  searchQuery?: string;
  reloadKey?: number;
}

export function InventoryGrid({ searchQuery, reloadKey }: InventoryGridProps) {
  const {
    products: fetchedProducts,
    loading,
    error,
  } = useInventoryProducts({
    searchQuery,
    reloadKey,
  });

  const [showDuplicateAlert, setShowDuplicateAlert] = useState(true);

  // 🔹 Productos normalizados (sin useEffect)
  const products = useMemo<InventoryProduct[]>(() => {
    return fetchedProducts.map((p) => ({
      ...p,
      name: p.name ?? "",
      barcode: p.barcode ?? "",
      category: p.category,
      unitType: p.unitType ?? "Unit/Pcs",
      stock: p.stock,
      price: p.price ?? 0,
      active: p.active ?? true,
      isDuplicate: p.isDuplicate ?? false,
    }));
  }, [fetchedProducts]);

  const duplicateProducts = products.filter((p) => p.isDuplicate);

  if (loading) {
    return (
      <Alert>
        <AlertDescription>Loading products...</AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (products.length === 0) {
    return (
      <Alert>
        <AlertDescription>No products found</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {/* Duplicates warning */}
      {showDuplicateAlert && duplicateProducts.length > 0 && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertDescription className="flex items-center justify-between ml-2">
            <span className="text-sm font-medium text-amber-900">
              Duplicate products detected
            </span>
            <Button
              size="sm"
              onClick={() => setShowDuplicateAlert(false)}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="px-4 py-3 text-left text-xs font-semibold">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold">
                Barcode
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold">
                Unit
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr
                key={product.id}
                className={product.isDuplicate ? "bg-amber-50/30" : ""}
              >
                {/* Name */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Input value={product.name} readOnly />
                    {product.isDuplicate && (
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                </td>

                {/* Barcode */}
                <td className="px-4 py-3 font-mono text-sm">
                  {product.barcode}
                </td>

                {/* Category */}
                <td className="px-4 py-3">
                  <Badge variant="secondary">{product.category}</Badge>
                </td>

                {/* Unit */}
                <td className="px-4 py-3">
                  <Select value={product.unitType} disabled>
                    <SelectTrigger className="w-[120px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unit/Pcs">Unit/Pcs</SelectItem>
                      <SelectItem value="Bulk/Kg">Bulk/Kg</SelectItem>
                    </SelectContent>
                  </Select>
                </td>

                {/* Stock */}
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={product.stock}
                    readOnly
                    className={
                      product.stock < 5 ? "border-red-300 bg-red-50" : ""
                    }
                  />
                </td>

                {/* Price */}
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={product.price}
                    readOnly
                    step="0.01"
                  />
                </td>

                {/* Active */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Switch checked={product.active} disabled />
                    <span className="text-xs">
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
  );
}
