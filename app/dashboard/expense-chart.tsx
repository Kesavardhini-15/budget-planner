"use client"

import { PieChart, Pie, Cell, Tooltip } from "recharts"

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#a855f7"]

export default function ExpenseChart({ expenses }: any) {
  const grouped: any = {}

  expenses.forEach((e: any) => {
    grouped[e.category] = (grouped[e.category] || 0) + e.amount
  })

  const data = Object.keys(grouped).map((key) => ({
    name: key,
    value: grouped[key],
  }))

  return (
    <div className="card">
      <h3 className="mb-4 text-lg font-semibold">Expense Breakdown</h3>

      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label
        >
          {data.map((_: any, index: number) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  )
}