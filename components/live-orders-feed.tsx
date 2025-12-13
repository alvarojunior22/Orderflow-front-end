"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send } from "lucide-react";
import { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { useLiveOrders } from "@/app/Dashboard/hooks/useLiveOrders";

interface Props {
  initialOrders?: Order[];
}

const statusStyles: Record<Order["status"], string> = {
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  awaiting: "bg-amber-100 text-amber-700 border-amber-200",
  ready: "bg-green-100 text-green-700 border-green-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export function LiveOrdersFeed() {
  const { orders } = useLiveOrders();
  const [pulse, setPulse] = useState(true);

  // efecto visual de "live"
  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-slate-500 text-center">
          No orders received yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200">
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Live Orders Feed
          </CardTitle>

          <Badge variant="secondary" className="bg-green-100 text-green-700">
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                  Channel
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-blue-600">
                    {order.id}
                  </td>

                  <td className="px-6 py-4 text-slate-900">{order.customer}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          order.channel === "telegram"
                            ? "bg-blue-100"
                            : "bg-green-100"
                        }`}
                      >
                        {order.channel === "telegram" ? (
                          <Send className="w-4 h-4 text-blue-600" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <span className="capitalize text-sm text-slate-600">
                        {order.channel}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-900">
                    ${order.amount.toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={statusStyles[order.status]}
                    >
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
