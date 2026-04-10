"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

import IncomeForm from "./income-form"
import AddExpense from "./add-expense"
import ExpenseTable from "./expense-table"
import ExpenseChart from "./expense-chart"
import MonthlyTrend from "./monthly-trend"
import AIInsights from "./ai-insights"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<any[]>([])

  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.auth.getUser()

      // ✅ FIX: Proper auth check
      if (error || !data?.user) {
        console.log("User not logged in")
        router.push("/login")
        return
      }

      const currentUser = data.user
      setUser(currentUser)

      // ✅ FETCH INCOME
      const { data: incomeData } = await supabase
        .from("income")
        .select("*")
        .eq("user_id", currentUser.id)
        .single()

      if (incomeData) setIncome(incomeData.monthly_income)

      // ✅ FETCH EXPENSES
      const { data: expenseData } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false })

      if (expenseData) setExpenses(expenseData)

      setLoading(false)
    }

    getData()
  }, [router])

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = income - totalExpense

  // ⏳ LOADING SCREEN
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  // ❌ If no user, don't render
  if (!user) return null

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">💰 Budget Dashboard</h1>
        <p className="text-gray-400">Welcome, {user.email}</p>
      </div>

      {/* INCOME */}
      <IncomeForm
        user={user}
        existingIncome={income}
        onSave={(data: any) => setIncome(data.monthly_income)}
      />

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <p>Income</p>
          <h2 className="text-green-400">₹ {income}</h2>
        </div>

        <div className="card">
          <p>Expenses</p>
          <h2 className="text-red-400">₹ {totalExpense}</h2>
        </div>

        <div className="card">
          <p>Remaining</p>
          <h2 className="text-blue-400">₹ {remaining}</h2>
        </div>
      </div>

      {/* AI INSIGHTS */}
      <AIInsights income={income} expenses={expenses} />

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-4">
        <ExpenseChart expenses={expenses} />
        <MonthlyTrend expenses={expenses} />
      </div>

      {/* ADD EXPENSE */}
      <AddExpense
        user={user}
        onAdd={(newExpense: any) =>
          setExpenses([newExpense, ...expenses])
        }
      />

      {/* TABLE */}
      <ExpenseTable expenses={expenses} />

    </div>
  )
}