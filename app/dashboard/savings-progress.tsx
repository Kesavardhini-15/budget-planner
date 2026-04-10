"use client"

export default function SavingsProgress({ income, expenses }: any) {

  const totalExpense = expenses.reduce(
    (sum: number, e: any) => sum + (e.amount || 0),
    0
  )

  const saved = (income?.monthly_income || 0) - totalExpense
  const target = income?.target_savings || 0

  const progress = target > 0
    ? Math.min((saved / target) * 100, 100)
    : 0

  return (
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg mb-6">

      <h2 className="text-xl font-semibold mb-4 text-green-400">
        🎯 Savings Progress
      </h2>

      {/* Numbers */}
      <div className="mb-4 text-gray-300">
        <p>Saved: ₹ {saved}</p>
        <p>Target: ₹ {target}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
        <div
          className="h-4 bg-green-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-2 text-sm text-gray-400">
        {progress.toFixed(1)}% completed
      </p>

    </div>
  )
}