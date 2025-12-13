// interface-Order.ts
export interface Order {
  id: string;
  customer: string;
  channel: "whatsapp" | "telegram";
  amount: number;
  status: "processing" | "awaiting" | "ready" | "completed" | "cancelled";

 
  createdAt: Date; 
  updatedAt: Date; 
}


export interface Notification {
  id: string;
  orderId: string;
  title: string;
  message: string;
  
  
  timestamp: Date; 
  time: string;       
  
  unread: boolean;
  
  error?:string
 
  eventType: "new_order" | "status_change" | "payment_issue" | "cancellation";
}