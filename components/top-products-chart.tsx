"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { product: "Premium Coffee", volume: 245 },
  { product: "Green Tea", volume: 189 },
  { product: "Chocolate Bar", volume: 167 },
  { product: "Orange Juice", volume: 142 },
  { product: "Pasta Pack", volume: 128 },
]

export function TopProductsChart() {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Top Selling Products by Volume</CardTitle>
        <CardDescription className="text-slate-500">Most popular items in the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            volume: {
              label: "Units Sold",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="product"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="volume" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
