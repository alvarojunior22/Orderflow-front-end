import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi } from "lucide-react"

const topItems = [
  {
    name: "Premium Coffee Beans",
    quantity: 24,
    image: "/coffee-beans.jpg",
  },
  {
    name: "Organic Green Tea",
    quantity: 18,
    image: "/green-tea.jpg",
  },
  {
    name: "Artisan Chocolate Bar",
    quantity: 15,
    image: "/chocolate-bar.jpg",
  },
  {
    name: "Fresh Pastries",
    quantity: 12,
    image: "/assorted-pastries.png",
  },
  {
    name: "Specialty Smoothie Mix",
    quantity: 10,
    image: "/colorful-fruit-smoothie.png",
  },
]

export function QuickInsights() {
  return (
    <div className="space-y-4">
      {/* Top Selling Items */}
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-lg font-semibold text-slate-900">Top Selling Items Today</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {topItems.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                  <p className="text-xs text-slate-500">Sold: {item.quantity}</p>
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
