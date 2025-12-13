import { Order, OrderStatus } from "./interface-Order";

export type NotificationEvent =
  | "new_order"
  | "status_change"
  | "payment_issue"
  | "cancellation";

export interface Notification {
  id: string;
  eventType: NotificationEvent;

  order: Order; // ✅ LA ORDEN COMPLETA
  previousStatus?: OrderStatus; // opcional (solo en cambios)

  title: string;
  message: string;

  unread: boolean;
  timestamp: Date;
  time: string;
}
