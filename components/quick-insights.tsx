"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi } from "lucide-react"
import { useAuth } from "@/app/context/authcontext"
import { listProducts } from "@/app/Dashboard/services/product.services"
import { adaptApiProduct } from "@/app/Dashboard/adapters/product.adapter"

type TopItem = {
  name: string
  quantity: number
  image: string
}

export function QuickInsights() {
  const { storeId } = useAuth()
  const [items, setItems] = useState<TopItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isActive = true

    const load = async () => {
      if (!storeId) {
        if (isActive) {
          setItems([])
          setLoading(false)
        }
        return
      }

      try {
        setLoading(true)
        const res = await listProducts({ storeId, limit: 50, offset: 0 })
        if (!isActive) return

        const products = res.data.map(adaptApiProduct)
        const top = products
          .slice()
          .sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0))
          .slice(0, 5)
          .map<TopItem>((p) => ({
            name: p.name,
            quantity: p.stock,
            image: p.image,
          }))

        setItems(top)
      } catch (err) {
        console.error("Failed to load top items:", err)
        if (isActive) {
          setItems([])
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      isActive = false
    }
  }, [storeId])

  const topItems = useMemo(() => items, [items])

  return (
    <div className="space-y-4">
      {/* Top Selling Items */}
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-lg font-semibold text-slate-900">Top Selling Items Today</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {loading && (
              <p className="text-sm text-slate-500">Loading...</p>
            )}
            {!loading && topItems.length === 0 && (
              <p className="text-sm text-slate-500">No products</p>
            )}
            {topItems.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                  <p className="text-xs text-slate-500">Stock: {item.quantity}</p>
                </div>
                <div className="text-lg font-bold text-slate-900">#{index + 1}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-lg font-semibold text-slate-900">System Status</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-slate-700">AI Agent</span>
              </div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-slate-700">Database Sync</span>
              </div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500">All systems operational</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
