"use client";

import { Order } from "@/app/Dashboard/interfaces/interface-Order";

export function useOrderMetrics(orders: Order[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedToday = orders.filter(
    (o) =>
      o.status === "completed" &&
      new Date(o.updatedAt).setHours(0, 0, 0, 0) === today.getTime()
  );

  const revenueToday = completedToday.reduce((sum, o) => sum + o.amount, 0);

  const activeOrders = orders.filter((o) =>
    ["awaiting", "pending", "processing"].includes(o.status)
  );

  const newOrdersToday = orders.filter((o) => new Date(o.createdAt) >= today);

  const alertOrders = orders.filter((o) =>
    ["cancelled", "failed"].includes(o.status)
  );

  return {
    revenueToday,
    activeOrdersCount: activeOrders.length,
    newOrdersCount: newOrdersToday.length,
    alertOrdersCount: alertOrders.length,
  };
}
