"use client"

import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const lowTurnoverProducts = [
  {
    id: "1",
    name: "Artisan Bread Mix",
    category: "Baking",
    lastSold: "42 days ago",
    stock: 23,
    value: "$345.00",
  },
  {
    id: "2",
    name: "Specialty Tea Set",
    category: "Beverages",
    lastSold: "38 days ago",
    stock: 15,
    value: "$675.00",
  },
  {
    id: "3",
    name: "Imported Olive Oil",
    category: "Condiments",
    lastSold: "35 days ago",
    stock: 31,
    value: "$527.00",
  },
  {
    id: "4",
    name: "Gourmet Pasta Sauce",
    category: "Condiments",
    lastSold: "33 days ago",
    stock: 18,
    value: "$234.00",
  },
]

export function LowTurnoverTable() {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Low Turnover Alerts
            </CardTitle>
            <CardDescription className="text-slate-500">Products that haven't sold in the last 30 days</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 bg-transparent">
            View All Insights
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Product Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Category</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Last Sold</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Stock</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Inventory Value</th>
              </tr>
            </thead>
            <tbody>
              {lowTurnoverProducts.map((product) => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-slate-900 font-medium">{product.name}</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                      {product.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{product.lastSold}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{product.stock} units</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-900">{product.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
