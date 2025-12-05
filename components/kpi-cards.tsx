import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, ShoppingCart, MessageSquare, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

const kpis = [
  {
    title: "Today's Sales Revenue",
    value: "$1,240.50",
    trend: "+12%",
    trendDirection: "up",
    comparison: "from yesterday",
    icon: DollarSign,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    title: "Active Orders",
    value: "18",
    trend: "+5",
    trendDirection: "up",
    comparison: "pending",
    icon: ShoppingCart,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "AI Conversations Today",
    value: "145",
    trend: "+23%",
    trendDirection: "up",
    comparison: "active chats",
    icon: MessageSquare,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    title: "Low Stock Alerts",
    value: "5",
    trend: "-2",
    trendDirection: "down",
    comparison: "items critical",
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-2">{kpi.title}</p>
                <p className="text-3xl font-bold text-slate-900 mb-2">{kpi.value}</p>
                <div className="flex items-center gap-1.5 text-sm">
                  {kpi.trendDirection === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  )}
                  <span className="font-medium text-green-600">{kpi.trend}</span>
                  <span className="text-slate-500">{kpi.comparison}</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${kpi.iconBg} flex items-center justify-center shrink-0`}>
                <kpi.icon className={`w-6 h-6 ${kpi.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
