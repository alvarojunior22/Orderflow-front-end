"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

const statusFilters = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "ready", label: "Ready" },
  { value: "completed", label: "Completed" },
]

export function OrdersHeader() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Order Management</h1>
        <p className="text-sm text-slate-600 mt-1">View and manage all incoming orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white">
            <Filter className="w-4 h-4 mr-2 text-slate-500" />
            <SelectValue />
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
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd, y")}
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
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Export CSV Button */}
        <Button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  )
}
