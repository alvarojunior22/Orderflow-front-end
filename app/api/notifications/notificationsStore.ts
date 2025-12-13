


import { Order, Notification } from "@/app/Dashboard/interfaces/interface-Notification";
import { mockOrders } from "../../../data/dataOrder";



function generateNotifications(orders: Order[]): Notification[] {
  
  const sortedOrders = [...orders].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  
  const recentOrders = sortedOrders.slice(0, 5);

  return recentOrders.map((order, index) => {
    
    let title: string;
    let message: string;
    let eventType: Notification["eventType"];
    let unread: boolean;

    if (index === 0) {
      
      title = "🚨 Nuevo Evento Importante";
      message = `La orden ${
        order.id
      } ha sido actualizada a ${order.status.toUpperCase()}.`;
      eventType = "status_change";
      unread = true;
    } else if (order.status === "awaiting") {
      title = "🟠 Pendiente de Procesar";
      message = `Nueva orden ${order.id} esperando el primer paso.`;
      eventType = "new_order";
      unread = true; 
    } else {
      title = `✅ Estatus: ${order.status.toUpperCase()}`;
      message = `La orden ${order.id} se actualizó.`;
      eventType = "status_change";
      unread = index < 3; 
    }

    
    const diffMs = Date.now() - order.updatedAt.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const timeAgo =
      minutes < 60
        ? `${minutes} min ago`
        : `${Math.floor(minutes / 60)} hrs ago`;

    return {
      id: `n${order.id}`,
      orderId: order.id,
      title: title,
      message: message,
      time: timeAgo,
      timestamp: order.updatedAt,
      unread: unread,
      eventType: eventType,
    };
  });
}


let storeNotifications: Notification[] =
  generateNotifications(mockOrders);


export const getStoreNotifications = (): Notification[] => {
  return storeNotifications.slice();
};


export const updateStoreNotification = (id: string, unread: boolean) => {
  storeNotifications = storeNotifications.map((n) =>
    n.id === id ? { ...n, unread: unread } : n
  );
};


export const markAllStoreNotificationsRead = () => {
  storeNotifications = storeNotifications.map((n) => ({ ...n, unread: false }));
};
