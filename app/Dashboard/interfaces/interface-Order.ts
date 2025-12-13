export type OrderStatus =
  | "processing"
  | "awaiting"
  | "ready"
  | "completed"
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
