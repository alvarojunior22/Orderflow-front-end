export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  customer: string;
  channel: "whatsapp" | "telegram";
  amount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
