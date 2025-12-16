"use client"

import { Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnalyticsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-slate-900">Business Insights</h1>

      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-slate-500" />
        <Select defaultValue="30">
          <SelectTrigger className="w-[180px] bg-white border-slate-200">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="90">Last 90 Days</SelectItem>
            <SelectItem value="365">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
