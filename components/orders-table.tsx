"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLiveOrders } from "@/app/Dashboard/hooks/useLiveOrders"
import type { Order as LiveOrder, OrderStatus } from "@/app/Dashboard/interfaces/interface-Order"
import { OrderStatusActions } from "@/components/order-status-actions"

interface CustomerInfo {
  name: string;
  avatar: string;
}

interface TableOrder {
  id: string;
  customer: CustomerInfo;
  createdAt: string;
  total: number;
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  awaiting: { label: "Awaiting", color: "text-amber-600 bg-amber-50" },
  processing: { label: "Processing", color: "text-blue-600 bg-blue-50" },
  ready: { label: "Ready", color: "text-green-600 bg-green-50" },
  completed: { label: "Completed", color: "text-slate-600 bg-slate-100" },
  cancelled: { label: "Cancelled", color: "text-red-600 bg-red-50" },
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2)
}

function mapLiveOrderToTableOrder(order: LiveOrder): TableOrder {
  return {
    id: order.id,
    customer: {
      name: order.customer,
      avatar: "/professional-user.jpg",
    },
    createdAt: order.createdAt.toLocaleString(),
    total: order.amount,
    status: order.status,
  };
}

export function OrdersTable() {
  const { orders: liveOrders, loading, error } = useLiveOrders()
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [orders, setOrders] = useState<TableOrder[]>([])

  const liveOrdersById = useMemo<Map<string, LiveOrder>>(() => {
    const map = new Map<string, LiveOrder>()
    liveOrders.forEach((order) => {
      map.set(order.id, order)
    })
    return map
  }, [liveOrders])

  useEffect(() => {
    const mapped: TableOrder[] = liveOrders.map(mapLiveOrderToTableOrder)
    setOrders(mapped)
  }, [liveOrders])

  if (loading) {
    return <p className="text-slate-500">Loading orders...</p>
  }

  if (error) {
    return <p className="text-red-500 text-sm">Error loading orders</p>
  }

  if (orders.length === 0) {
    return <p className="text-slate-500">No orders found</p>
  }

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
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
              <TableHead className="font-semibold text-slate-700">Order ID</TableHead>
              <TableHead className="font-semibold text-slate-700">Customer</TableHead>
              <TableHead className="font-semibold text-slate-700">Created at</TableHead>
              <TableHead className="font-semibold text-slate-700">Total</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const liveOrder = liveOrdersById.get(order.id)

              return (
                <TableRow
                  key={order.id}
                  className={cn("hover:bg-slate-50 transition-colors")}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => toggleSelectOrder(order.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm font-medium text-slate-900">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
                          {getInitials(order.customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-900">{order.customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{order.createdAt}</TableCell>
                  <TableCell className="text-sm font-semibold text-slate-900">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
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
                      {liveOrder && <OrderStatusActions order={liveOrder} />}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
