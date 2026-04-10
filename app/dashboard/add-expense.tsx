"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AddExpense({ user }: any) {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("food")

  const handleAdd = async () => {
    if (!amount) {
      alert("Enter amount")
      return
    }

    const { error } = await supabase.from("expenses").insert({
      user_id: user.id,
      amount: Number(amount),
      category,
    })

    if (error) {
      alert(error.message)
      return
    }

    window.location.reload()
  }

  return (
    <div>
      <h3 className="mb-2">Add Expense</h3>

      <div className="flex gap-2">
        <input
          className="input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="shopping">Shopping</option>
          <option value="others">Others</option>
        </select>

        <button onClick={handleAdd} className="btn">
          Add
        </button>
      </div>
    </div>
  )
}