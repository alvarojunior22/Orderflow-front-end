"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send } from "lucide-react";
import { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { useLiveOrders } from "@/app/Dashboard/hooks/useLiveOrders";

const statusStyles: Record<Order["status"], string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  preparing: "bg-orange-100 text-orange-700 border-orange-200",
  in_transit: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export function LiveOrdersFeed() {
  const { orders, loading, error, hasNewOrders } = useLiveOrders();
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const i = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(i);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-slate-500">
          Loading live orders…
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-red-500">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-slate-500">
          No orders yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live Orders Feed</CardTitle>
          <Badge className="bg-green-100 text-green-700">
            <span
              className={`w-2 h-2 rounded-full bg-green-500 mr-2 ${
                pulse ? "animate-pulse" : ""
              }`}
            />
            {hasNewOrders ? "New orders" : "Live"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <table className="w-full">
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-blue-600 font-medium">
                  {order.id}
                </td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">
                  {order.channel === "telegram" ? (
                    <Send className="w-4 h-4 text-blue-600" />
                  ) : (
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  )}
                </td>
                <td className="px-6 py-4 font-semibold">
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
      </CardContent>
    </Card>
  );
}
