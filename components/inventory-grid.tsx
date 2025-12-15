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
import { useEffect, useState } from "react";
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

  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(true);

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  const duplicateProducts = products.filter((p) => p.isDuplicate);

  const handleNameChange = (id: string, value: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, name: value } : p)));
  };

  const handleUnitTypeChange = (id: string, value: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, unitType: value } : p))
    );
  };

  const handleStockChange = (id: string, value: string) => {
    const numValue = Number.parseInt(value) || 0;
    setProducts(
      products.map((p) => (p.id === id ? { ...p, stock: numValue } : p))
    );
  };

  const handlePriceChange = (id: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0;
    setProducts(
      products.map((p) => (p.id === id ? { ...p, price: numValue } : p))
    );
  };

  const handleActiveToggle = (id: string, checked: boolean) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, active: checked } : p))
    );
  };

  const handleMergeDuplicates = () => {
    setShowDuplicateAlert(false);
    setProducts(products.filter((p) => !p.isDuplicate));
  };

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

      {showDuplicateAlert && duplicateProducts.length > 0 && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertDescription className="flex items-center justify-between ml-2">
            <span className="text-sm font-medium text-amber-900">
              Duplicate products detected
            </span>
            <Button
              onClick={handleMergeDuplicates}
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 ml-4"
            >
              Merge Items
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Barcode
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Unit
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Input
                        value={product.name}
                        onChange={(e) =>
                          handleNameChange(product.id, e.target.value)
                        }
                        className="h-9"
                      />
                      {product.isDuplicate && (
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                      {product.barcode}
                    </code>
                  </td>

                  <td className="px-4 py-3">
                    <Badge variant="secondary">{product.category}</Badge>
                  </td>

                  <td className="px-4 py-3">
                    <Select
                      value={product.unitType}
                      onValueChange={(v) => handleUnitTypeChange(product.id, v)}
                    >
                      <SelectTrigger className="h-9 w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Unit/Pcs">Unit</SelectItem>
                        <SelectItem value="Bulk/Kg">Kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>

                  <td className="px-4 py-3">
                    <Input
                      type="number"
                      value={product.stock}
                      onChange={(e) =>
                        handleStockChange(product.id, e.target.value)
                      }
                      className="h-9 w-24"
                    />
                  </td>

                  <td className="px-4 py-3">
                    <Input
                      type="number"
                      step="0.01"
                      value={product.price}
                      onChange={(e) =>
                        handlePriceChange(product.id, e.target.value)
                      }
                      className="h-9 w-24"
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={product.active}
                        onCheckedChange={(v) =>
                          handleActiveToggle(product.id, v)
                        }
                      />
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
    </div>
  );
}
