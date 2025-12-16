"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useLiveOrders } from "@/app/Dashboard/hooks/useLiveOrders";
import type { Order as LiveOrder } from "@/app/Dashboard/interfaces/interface-Order";
import { OrderStatusActions } from "@/components/order-status-actions";

/* -------------------- Types -------------------- */

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "in_transit"
  | "delivered"
  | "cancelled";

interface TableOrder {
  id: string;
  customer: string;
  createdAt: string;
  total: number;
  status: OrderStatus;
}

/* -------------------- Status Config -------------------- */

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  pending: {
    label: "Pending",
    color: "text-yellow-700 bg-yellow-100",
  },
  confirmed: {
    label: "Confirmed",
    color: "text-blue-700 bg-blue-100",
  },
  preparing: {
    label: "Preparing",
    color: "text-orange-700 bg-orange-100",
  },
  in_transit: {
    label: "In transit",
    color: "text-purple-700 bg-purple-100",
  },
  delivered: {
    label: "Delivered",
    color: "text-green-700 bg-green-100",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700 bg-red-100",
  },
};

/* -------------------- Helpers -------------------- */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function mapLiveOrder(order: LiveOrder): TableOrder {
  return {
    id: order.id,
    customer: order.customer,
    createdAt: new Date(order.createdAt).toLocaleString(),
    total: order.amount,
    status: order.status as OrderStatus,
  };
}

/* -------------------- Component -------------------- */

export function OrdersTable() {
  const { orders: liveOrders, loading, error } = useLiveOrders();
  const [orders, setOrders] = useState<TableOrder[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const liveOrdersById = useMemo(() => {
    const map = new Map<string, LiveOrder>();
    liveOrders.forEach((o) => map.set(o.id, o));
    return map;
  }, [liveOrders]);

  useEffect(() => {
    setOrders(liveOrders.map(mapLiveOrder));
  }, [liveOrders]);

  if (loading) return <p className="text-slate-500">Loading orders...</p>;
  if (error) return <p className="text-red-500">Failed to load orders</p>;
  if (orders.length === 0)
    return <p className="text-slate-500">No orders found</p>;

  const toggleSelectOrder = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === orders.length ? [] : orders.map((o) => o.id)
    );
  };

  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div className="space-y-4">
      {selectedOrders.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center">
          <span className="text-sm font-medium text-blue-900">
            {selectedOrders.length} order(s) selected
          </span>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline">
              Print
            </Button>
            <Button size="sm" className="bg-blue-600 text-white">
              Mark as delivered
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedOrders.length === orders.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => {
              const liveOrder = liveOrdersById.get(order.id);
              const status =
                statusConfig[order.status] ??
                ({
                  label: "Unknown",
                  color: "text-slate-600 bg-slate-100",
                } as const);

              return (
                <TableRow key={order.id} className="hover:bg-slate-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => toggleSelectOrder(order.id)}
                    />
                  </TableCell>

                  <TableCell className="font-mono text-xs">
                    {order.id}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {getInitials(order.customer)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {order.customer}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-slate-600">
                    {order.createdAt}
                  </TableCell>

                  <TableCell className="font-semibold">
                    ${order.total.toFixed(2)}
                  </TableCell>

                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(v) =>
                        handleStatusChange(order.id, v as OrderStatus)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "w-[130px] h-8 text-xs font-medium border-0",
                          status.color
                        )}
                      >
                        <SelectValue placeholder={status.label} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusConfig).map(([k, v]) => (
                          <SelectItem key={k} value={k}>
                            {v.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="text-center">
                    {liveOrder && <OrderStatusActions order={liveOrder} />}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
