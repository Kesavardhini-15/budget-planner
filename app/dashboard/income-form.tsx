"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function IncomeForm({ user, existingIncome, onSave }: any) {
  const [income, setIncome] = useState(existingIncome || "")
  const [editing, setEditing] = useState(!existingIncome)

  const handleSave = async () => {
    if (!income) {
      alert("Enter income")
      return
    }

    const { data, error } = await supabase
      .from("income")
      .upsert(
        {
          user_id: user.id,
          monthly_income: Number(income),
        },
        {
          onConflict: "user_id",
        }
      )
      .select()

    if (error) {
      alert(error.message)
      return
    }

    onSave(data[0])
    setEditing(false)
  }

  return (
    <div className="card">

      <h3 className="text-lg font-semibold mb-3">Monthly Income</h3>

      {!editing ? (
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-green-400">
            ₹ {existingIncome}
          </p>

          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="flex-1"
            placeholder="Enter income"
          />

          <button
            onClick={handleSave}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}

    </div>
  )
}