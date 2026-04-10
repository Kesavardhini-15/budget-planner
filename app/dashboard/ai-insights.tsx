"use client"

export default function AIInsights({ income, expenses }: any) {
  const total = expenses.reduce((sum: number, e: any) => sum + e.amount, 0)

  let message = ""

  if (total > income) {
    message = "⚠️ You are overspending!"
  } else if (total > income * 0.7) {
    message = "⚡ Spending is high, be careful."
  } else {
    message = "✅ Great! Your spending is under control."
  }

  return (
    <div className="card bg-gradient-to-r from-purple-500/20 to-blue-500/20">
      <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
      <p className="text-lg">{message}</p>
    </div>
  )
}