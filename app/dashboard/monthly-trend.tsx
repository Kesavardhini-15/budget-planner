"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

export default function MonthlyTrend({ expenses }: any) {
  const grouped: any = {}

  expenses.forEach((e: any) => {
    const date = new Date(e.created_at).toLocaleDateString()

    grouped[date] = (grouped[date] || 0) + e.amount
  })

  const data = Object.keys(grouped).map((key) => ({
    date: key,
    amount: grouped[key],
  }))

  return (
    <div className="card">
      <h3 className="mb-4 text-lg font-semibold">Monthly Trend</h3>

      <LineChart width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#22c55e" />
      </LineChart>
    </div>
  )
}