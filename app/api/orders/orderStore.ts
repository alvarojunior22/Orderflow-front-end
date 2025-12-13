import { Order } from "@/app/Dashboard/interfaces/interface-Order";
import { mockOrders } from "@/data/dataOrder";

let orders: Order[] = mockOrders;

export const getOrders = (): Order[] => {
  return orders;
};

export const addOrder = (order: Order) => {
  orders = [order, ...orders];
};

export const updateOrderStatus = (id: string, status: Order["status"]) => {
  orders = orders.map((o) =>
    o.id === id ? { ...o, status, updatedAt: new Date() } : o
  );
};
