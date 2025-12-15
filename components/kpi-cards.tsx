"use client";

import {
  DollarSign,
  ShoppingCart,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useOrderStats } from "@/app/Dashboard/hooks/useOrderStats";

/* -------------------- Helpers -------------------- */

const money = (value?: number) => `$${(value ?? 0).toFixed(2)}`;
const num = (value?: number) => (value ?? 0).toString();

/* -------------------- Component -------------------- */

export function KPICards() {
  const { stats, loading, error } = useOrderStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4 h-24 bg-slate-100 rounded-lg" />
          </Card>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-sm text-red-600">
          Failed to load KPIs
        </CardContent>
      </Card>
    );
  }

  const cards = [
    {
      title: "Revenue",
      value: money(stats.totalRevenue),
      icon: DollarSign,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Total Orders",
      value: num(stats.totalOrders),
      icon: ShoppingCart,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Pending",
      value: num(stats.pending),
      icon: Clock,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      title: "Confirmed",
      value: num(stats.confirmed),
      icon: CheckCircle,
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      title: "In Transit",
      value: num(stats.inTransit),
      icon: Truck,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Cancelled",
      value: num(stats.cancelled),
      icon: XCircle,
      color: "text-red-600 bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{card.title}</p>
              <p className="text-xl font-semibold text-slate-900">
                {card.value}
              </p>
            </div>
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}
            >
              <card.icon className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
