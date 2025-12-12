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

// Tipado del filtro
interface StatusFilter {
  status: string;
  dateRange: DateRange | undefined;
}

// Tipado del componente (prop)
interface OrdersHeaderProps {
  onFilter: (filter: StatusFilter) => void;
}

const statusFilters = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "ready", label: "Ready" },
  { value: "completed", label: "Completed" },
];

export function OrdersHeader({ onFilter }: OrdersHeaderProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>({
    status: "all",
    dateRange: undefined,
  });

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Cambiar estado seleccionado
  const handleStatusChange = (value: string) => {
    const updated: StatusFilter = {
      ...statusFilter,
      status: value,
    };

    setStatusFilter(updated);
    onFilter(updated);
  };

  // Cambiar rango de fechas
  const handleDateChange = (range: DateRange | undefined) => {
    const updated: StatusFilter = {
      ...statusFilter,
      dateRange: range,
    };

    setDateRange(range);
    setStatusFilter(updated);
    onFilter(updated);
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
        <Select value={statusFilter.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px] bg-white">
            <Filter className="w-4 h-4 mr-2 text-slate-500" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-60 justify-start bg-white">
              <Calendar className="w-4 h-4 mr-2 text-slate-500" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Date Range</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              selected={dateRange}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Export CSV */}
        <Button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
