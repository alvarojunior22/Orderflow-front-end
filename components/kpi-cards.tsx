"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  ShoppingCart,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

import { useOrderMetrics } from "@/app/Dashboard/hooks/useMetricsOrder";
import { useLiveOrders } from "@/app/Dashboard/hooks/useLiveOrders";
import { useOrderStats } from "@/app/Dashboard/hooks/useOrderStats";

export function KPICards() {
  const { orders, loading, error } = useLiveOrders();
  const metrics = useOrderMetrics(orders);
  const {
    stats,
    loading: statsLoading,
    error: statsError,
  } = useOrderStats();

  if (loading || statsLoading) {
    return <p className="text-slate-500">Loading metrics...</p>;
  }

  if (error || statsError) {
    return <p className="text-red-500 text-sm">Error loading metrics</p>;
  }

  const revenue = stats ? stats.totalRevenue : metrics.revenueToday;
  const activeOrdersFromStats = stats
    ? stats.pending + stats.confirmed + stats.preparing + stats.inTransit
    : null;
  const activeOrders =
    activeOrdersFromStats !== null ? activeOrdersFromStats : metrics.activeOrdersCount;

  const kpis = [
    {
      title: "Today's Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Active Orders",
      value: activeOrders,
      icon: ShoppingCart,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "New Orders Today",
      value: metrics.newOrdersCount,
      icon: MessageSquare,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Alerts",
      value: metrics.alertOrdersCount,
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardContent className="p-6 flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500">{kpi.title}</p>
              <p className="text-3xl font-bold">{kpi.value}</p>
            </div>

            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${kpi.color}`}
            >
              <kpi.icon className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
