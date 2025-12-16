import { Order } from "@/app/Dashboard/interfaces/interface-Order";

export interface DashboardMetrics {
  revenueToday: number;
  activeOrders: number;
  pendingOrders: number;
  completedToday: number;
  cancelledToday: number;
}


function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );

}



export function calculateDashboardMetrics(
  orders: Order[],
  now: Date = new Date()
): DashboardMetrics {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  let revenueToday = 0;
  let activeOrders = 0;
  let pendingOrders = 0;
  let completedToday = 0;
  let cancelledToday = 0;

  for (const order of orders) {
    const updatedAt =
      order.updatedAt instanceof Date
        ? order.updatedAt
        : new Date(order.updatedAt);

    if (
      order.status === "pending" ||
      order.status === "confirmed" ||
      order.status === "preparing" ||
      order.status === "in_transit"
    ) {
      activeOrders++;
    }

    if (order.status === "pending") {
      pendingOrders++;
    }

    if (order.status === "delivered" && isSameDay(updatedAt, today)) {
      completedToday++;
      revenueToday += order.amount;
    }

    if (order.status === "cancelled" && isSameDay(updatedAt, today)) {
      cancelledToday++;
    }
  }

  return {
    revenueToday,
    activeOrders,
    pendingOrders,
    completedToday,
    cancelledToday,
  };
}

