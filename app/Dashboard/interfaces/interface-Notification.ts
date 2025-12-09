export interface Order {
  id: string;
  customer: string;
  channel: "whatsapp" | "telegram";
  amount: string;
  status: "processing" | "awaiting" | "ready";
  timeAgo: string;
  isNew: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  orderId: string;
  status: Order["status"];
}

