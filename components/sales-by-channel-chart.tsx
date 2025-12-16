"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { channel: "WhatsApp", value: 4780, color: "hsl(var(--chart-4))" },
  { channel: "Telegram", value: 3240, color: "hsl(var(--chart-2))" },
  { channel: "Physical", value: 2180, color: "hsl(var(--chart-5))" },
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={14}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function SalesByChannelChart() {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Sales by Channel</CardTitle>
        <CardDescription className="text-slate-500">Revenue distribution across channels</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            whatsapp: {
              label: "WhatsApp",
              color: "hsl(var(--chart-4))",
            },
            telegram: {
              label: "Telegram",
              color: "hsl(var(--chart-2))",
            },
            physical: {
              label: "Physical",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm text-slate-700">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
