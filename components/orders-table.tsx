"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Trash2, Globe, Smartphone, ShoppingBag, ChevronDown, ChevronRight, MapPin, Phone } from "lucide-react"
import { cn } from "@/lib/utils"




interface Order {
  id: string
  customer: {
    name: string
    avatar: string
    address: string
    phone: string
  }
  channel: "web" | "mobile" | "pos"
  items: { name: string; quantity: number; price: number }[]
  itemsSummary: string
  total: number
  status: "pending" | "processing" | "ready" | "completed",
  date: string
}

export const mockOrders: Order[] = [
  {
    id: "ORD-2847",
    date: '2025/12/11',
    customer: {
      name: "Sarah Johnson",
      avatar: "/professional-user.jpg",
      address: "456 Market Street, San Francisco, CA 94103",
      phone: "+1 (555) 234-5678",
    },
    channel: "web",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 14.99 },
      { name: "Coca Cola", quantity: 1, price: 2.99 },
      { name: "Garlic Bread", quantity: 1, price: 5.99 },
    ],
    itemsSummary: "2x Margherita Pizza, 1x Coca Cola...",
    total: 38.96,
    status: "processing",
  },
  {
    id: "ORD-2846",
    date: '2025/12/22',
    customer: {
      name: "Michael Chen",
      avatar: "/professional-user.jpg",
      address: "789 Pine Avenue, Los Angeles, CA 90001",
      phone: "+1 (555) 876-5432",
    },
    channel: "mobile",
    items: [
      { name: "Iced Latte", quantity: 2, price: 5.49 },
      { name: "Blueberry Muffin", quantity: 3, price: 3.99 },
    ],
    itemsSummary: "2x Iced Latte, 3x Blueberry Muffin",
    total: 22.95,
    status: "ready",
  },
  {
    id: "ORD-2845",
    date: '2025/04/10',
    customer: {
      name: "Emily Rodriguez",
      avatar: "/professional-user.jpg",
      address: "321 Oak Boulevard, Austin, TX 73301",
      phone: "+1 (555) 345-7890",
    },
    channel: "pos",
    items: [
      { name: "Caesar Salad", quantity: 1, price: 12.99 },
      { name: "Grilled Chicken", quantity: 1, price: 18.99 },
      { name: "Sparkling Water", quantity: 2, price: 3.49 },
    ],
    itemsSummary: "1x Caesar Salad, 1x Grilled Chicken...",
    total: 38.96,
    status: "pending",
  },
  {
    id: "ORD-2844",
    date: '2025/11/24',
    customer: {
      name: "David Kim",
      avatar: "/professional-user.jpg",
      address: "567 Elm Street, Seattle, WA 98101",
      phone: "+1 (555) 456-1234",
    },
    channel: "web",
    items: [
      { name: "Cappuccino", quantity: 1, price: 4.99 },
      { name: "Croissant", quantity: 2, price: 3.49 },
    ],
    itemsSummary: "1x Cappuccino, 2x Croissant",
    total: 11.97,
    status: "completed",
  },
  {
    id: "ORD-2843",
    date: '2025/12/12',
    customer: {
      name: "Jessica Martinez",
      avatar: "/professional-user.jpg",
      address: "890 Maple Drive, Boston, MA 02101",
      phone: "+1 (555) 789-0123",
    },
    channel: "mobile",
    items: [
      { name: "Green Tea", quantity: 3, price: 3.99 },
      { name: "Almond Cookie", quantity: 5, price: 2.49 },
    ],
    itemsSummary: "3x Green Tea, 5x Almond Cookie",
    total: 24.42,
    status: "processing",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "text-amber-600 bg-amber-50" },
  processing: { label: "Processing", color: "text-blue-600 bg-blue-50" },
  ready: { label: "Ready", color: "text-green-600 bg-green-50" },
  completed: { label: "Completed", color: "text-slate-600 bg-slate-100" },
}

const channelIcons = {
  web: Globe,
  mobile: Smartphone,
  pos: ShoppingBag,
}

export function OrdersTable() {
  const [expandedRow, setExpandedRow] = useState<string | null>("ORD-2847")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [orders, setOrders] = useState<Order[]>(mockOrders)

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }
  
  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map((order) => order.id))
    }
  }


  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      {selectedOrders.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-sm font-medium text-blue-900">
            {selectedOrders.length} order{selectedOrders.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" className="bg-white">
              Print Selected Invoices
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Mark as Ready
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-12">
                <Checkbox checked={selectedOrders.length === orders.length} onCheckedChange={toggleSelectAll} />
              </TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead className="font-semibold text-slate-700">Order ID</TableHead>
              <TableHead className="font-semibold text-slate-700">Customer</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Channel</TableHead>
              <TableHead className="font-semibold text-slate-700">Items Summary</TableHead>
              <TableHead className="font-semibold text-slate-700">Total</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const isExpanded = expandedRow === order.id
              const ChannelIcon = channelIcons[order.channel]

              return (
                <React.Fragment key={order.id}>
                  <TableRow
                   
                    className={cn("hover:bg-slate-50 transition-colors", isExpanded && "bg-blue-50/30")}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => toggleSelectOrder(order.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6"
                        onClick={() => setExpandedRow(isExpanded ? null : order.id)}
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-slate-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono text-sm font-medium text-slate-900">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={order.customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
                            {order.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-slate-900">{order.customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <ChannelIcon className="w-4 h-4 text-slate-600" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{order.itemsSummary}</TableCell>
                    <TableCell className="text-sm font-semibold text-slate-900">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as Order["status"])}
                      >
                        <SelectTrigger
                          className={cn("w-[130px] h-8 text-xs font-medium border-0", statusConfig[order.status].color)}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusConfig).map(([value, { label }]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Row Details */}
                  {isExpanded && (
                    <TableRow className="bg-blue-50/30">
                      <TableCell colSpan={9} className="p-0">
                        <div className="px-6 py-4 border-t border-blue-100">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Customer Details */}
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-slate-900">Customer Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                                  <span className="text-slate-700">{order.customer.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                                  <span className="text-slate-700">{order.customer.phone}</span>
                                </div>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-slate-900">Order Items</h4>
                              <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between text-sm bg-white rounded-lg px-3 py-2 border border-slate-200"
                                  >
                                    <span className="text-slate-700">
                                      <span className="font-medium text-slate-900">{item.quantity}x</span> {item.name}
                                    </span>
                                    <span className="font-medium text-slate-900">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex items-center justify-between text-sm font-semibold pt-2 border-t border-slate-200">
                                  <span className="text-slate-900">Total</span>
                                  <span className="text-slate-900">${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
