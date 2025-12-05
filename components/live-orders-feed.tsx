"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send } from "lucide-react"
import { useState, useEffect } from "react"

const orders = [
  {
    id: "ORD-2847",
    customer: "Sarah Mitchell",
    channel: "whatsapp",
    amount: "$127.50",
    status: "processing",
    timeAgo: "2 min ago",
    isNew: true,
  },
  {
    id: "ORD-2846",
    customer: "Marcus Chen",
    channel: "telegram",
    amount: "$89.99",
    status: "awaiting",
    timeAgo: "5 min ago",
    isNew: false,
  },
  {
    id: "ORD-2845",
    customer: "Emily Rodriguez",
    channel: "whatsapp",
    amount: "$234.00",
    status: "ready",
    timeAgo: "8 min ago",
    isNew: false,
  },
  {
    id: "ORD-2844",
    customer: "David Kim",
    channel: "telegram",
    amount: "$156.75",
    status: "processing",
    timeAgo: "12 min ago",
    isNew: false,
  },
  {
    id: "ORD-2843",
    customer: "Lisa Anderson",
    channel: "whatsapp",
    amount: "$92.50",
    status: "ready",
    timeAgo: "18 min ago",
    isNew: false,
  },
]

const statusConfig = {
  processing: { label: "Processing", color: "bg-blue-100 text-blue-700 border-blue-200" },
  awaiting: { label: "Awaiting Confirmation", color: "bg-amber-100 text-amber-700 border-amber-200" },
  ready: { label: "Ready for Pickup", color: "bg-green-100 text-green-700 border-green-200" },
}

export function LiveOrdersFeed() {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-slate-200">
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Live Orders Feed</CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
            <span className={`w-2 h-2 rounded-full bg-green-500 mr-2 ${pulse ? "animate-pulse" : ""}`} />
            Updating live...
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">Order ID</th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">Customer</th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">Channel</th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">Amount</th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`hover:bg-slate-50 transition-colors ${order.isNew && pulse ? "bg-blue-50/50" : ""}`}
                >
                  <td className="px-6 py-4">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">{order.id}</button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-900">{order.customer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {order.channel === "whatsapp" ? (
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Send className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                      <span className="text-sm text-slate-600 capitalize">{order.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={statusConfig[order.status as keyof typeof statusConfig].color}>
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{order.timeAgo}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
