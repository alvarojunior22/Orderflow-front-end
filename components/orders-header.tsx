"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

/* -------------------- Types -------------------- */

export interface StatusFilter {
  status: string;
  dateRange: DateRange | undefined;
}

interface OrdersHeaderProps {
  onFilter?: (filter: StatusFilter) => void;
}

/* -------------------- Config -------------------- */

const statusFilters = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "in_transit", label: "In transit" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

/* -------------------- Component -------------------- */

export function OrdersHeader({ onFilter }: OrdersHeaderProps) {
  const [filter, setFilter] = useState<StatusFilter>({
    status: "all",
    dateRange: undefined,
  });

  const handleStatusChange = (value: string) => {
    const updated: StatusFilter = {
      ...filter,
      status: value,
    };

    setFilter(updated);
    onFilter?.(updated); // ✅ protegido
  };

  const handleDateChange = (range: DateRange | undefined) => {
    const updated: StatusFilter = {
      ...filter,
      dateRange: range,
    };

    setFilter(updated);
    onFilter?.(updated); // ✅ protegido
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Order Management
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          View and manage all incoming orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <Select value={filter.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[200px] bg-white">
            <Filter className="w-4 h-4 mr-2 text-slate-500" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-64 justify-start bg-white text-left font-normal"
            >
              <Calendar className="w-4 h-4 mr-2 text-slate-500" />
              {filter.dateRange?.from ? (
                filter.dateRange.to ? (
                  <>
                    {format(filter.dateRange.from, "LLL dd")} –{" "}
                    {format(filter.dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(filter.dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Date range</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              selected={filter.dateRange}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Export */}
        <Button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
