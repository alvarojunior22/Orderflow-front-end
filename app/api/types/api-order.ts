export type ApiOrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface ApiOrder {
  id: string;
  customer_name: string | null;
  total: number;
  status: ApiOrderStatus;
  created_at: string;
  updated_at: string | null;
}

export interface ApiOrdersResponse {
  success: boolean;
  data: ApiOrder[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}
