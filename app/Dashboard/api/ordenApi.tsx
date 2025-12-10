import { Notification } from "../interfaces/interface-Notification"

const ordersData = [
  {
    id: "ORD-2847",
    customer: "Sarah Mitchell",
    amount: "$127.50",
    status: "processing" as const,
    timeAgo: "2 min ago",
    isNew: true,
  },
  {
    id: "ORD-2846",
    customer: "Marcus Chen",
    amount: "$89.99",
    status: "awaiting" as const,
    timeAgo: "5 min ago",
    isNew: false,
  },
  {
    id: "ORD-2845",
    customer: "Emily Rodriguez",
    amount: "$234.00",
    status: "ready" as const,
    timeAgo: "8 min ago",
    isNew: false,
  },
  {
    id: "ORD-2844",
    customer: "David Kim",
    amount: "$156.75",
    status: "processing" as const,
    timeAgo: "12 min ago",
    isNew: true,
  },
  {
    id: "ORD-2843",
    customer: "Lisa Anderson",
    amount: "$92.50",
    status: "ready" as const,
    timeAgo: "18 min ago",
    isNew: true,
  },
]

function mapOrderToNotification(order: (typeof ordersData)[0]): Notification {
  const statusMessages = {
    processing: `New order ${order.id}`,
    awaiting: `Order awaiting confirmation`,
    ready: `Order ready for pickup`,
  }

  return {
    id: order.id,
    title: statusMessages[order.status],
    message: `${order.customer} — ${order.amount}`,
    time: order.timeAgo,
    unread: order.isNew,
    orderId: order.id,
    status: order.status,
  }
}

export async function getNotifications(): Promise<Notification[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return ordersData.map(mapOrderToNotification)
}