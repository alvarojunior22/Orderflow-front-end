import { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { Notification } from "@/app/Dashboard/interfaces/interface-Notifications";

const lastKnownOrderState = new Map<
  string,
  { status: string; updatedAt: number }
>();


function generateNotifications(orders: Order[]): Notification[] {
  
    const notifications: Notification[] = [];

    for (const order of orders) {
      const prev = lastKnownOrderState.get(order.id);

      // New order
      if (!prev) {
        notifications.push(createNotification(order, "new_order"));
      }

      // Status change
      if (prev && prev.status !== order.status) {
        notifications.push(createNotification(order, "status_change"));
      }

      lastKnownOrderState.set(order.id, {
        status: order.status,
        updatedAt: order.updatedAt.getTime(),
      });
    }

    return notifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);
  }



function createNotification(
  order: Order,
  type: Notification["eventType"]
): Notification {
  const isNew = type === "new_order";

  return {
    id: `${type}-${order.id}-${order.updatedAt.getTime()}`,
    order,
    eventType: type,
    unread: true,
    timestamp: order.updatedAt,
    time: formatTimeAgo(order.updatedAt),
    title: isNew ? "New order received" : "Order status updated",
    message: isNew
      ? `Order ${order.id} has been created`
      : `Order ${order.id} moved to ${order.status.toUpperCase()}`,
  };
}

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 60) return `${minutes} min ago`;
  return `${Math.floor(minutes / 60)} hrs ago`;
}


let storeNotifications: Notification[] = [];

export const syncNotificationsFromOrders = (orders: Order[]) => {
  storeNotifications = generateNotifications(orders);
};

export const getStoreNotifications = (): Notification[] => {
  return storeNotifications.slice();
};

export const updateStoreNotification = (id: string, unread: boolean) => {
  storeNotifications = storeNotifications.map((n) =>
    n.id === id ? { ...n, unread } : n
  );
};

export const markAllStoreNotificationsRead = () => {
  storeNotifications = storeNotifications.map((n) => ({
    ...n,
    unread: false,
  }));
};
