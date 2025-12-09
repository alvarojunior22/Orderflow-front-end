"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useNotifications } from "@/app/Dashboard/hooks/useNotifications"
import { Notification } from "@/app/Dashboard/interfaces/interface-Notification"

const statusConfig = {
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  awaiting: {
    label: "Awaiting Confirmation",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  ready: {
    label: "Ready for Pickup",
    color: "bg-green-100 text-green-700 border-green-200",
  },
}

interface LiveOrdersFeedProps {
  initialNotifications: Notification[]
}

export function LiveOrdersFeed({ initialNotifications }: LiveOrdersFeedProps) {
  const [pulse, setPulse] = useState(true)
  const { notifications } = useNotifications({ initialNotifications })

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const orders = notifications.map((n) => ({
    id: n.orderId,
    customer: n.message.split(" — ")[0],
    channel: "whatsapp" as const,
    amount: n.message.split(" — ")[1] || "$0.00",
    status: n.status,
    timeAgo: n.time,
    isNew: n.unread,
  }))

  return (
    <Card className="border-slate-200">
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Live Orders Feed
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 border-green-200"
          >
            <span
              className={`w-2 h-2 rounded-full bg-green-500 mr-2 ${
                pulse ? "animate-pulse" : ""
              }`}
            />
            Updating live...
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">
                  Channel
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 px-6 py-3">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      order.isNew && pulse ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        {order.id}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-900">
                        {order.customer}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm text-slate-600 capitalize">
                          {order.channel}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-900">
                        {order.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ].color
                        }
                      >
                        {
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ].label
                        }
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">
                        {order.timeAgo}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}