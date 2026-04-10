"use client"

export default function ExpenseTable({ expenses }: any) {
  return (
    <div>
      <h3 className="mb-2">All Expenses</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp: any) => (
            <tr key={exp.id}>
              <td>{exp.category}</td>
              <td>₹{exp.amount}</td>
              <td>
                {new Date(exp.created_at).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}