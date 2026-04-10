"use client"

import { supabase } from "@/lib/supabase"

export default function Sidebar() {

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
  <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

    {/* 🧭 SIDEBAR */}
    <Sidebar />

    {/* 📊 MAIN CONTENT */}
    <div className="flex-1 p-6">

      <h1 className="text-4xl font-bold text-green-400 mb-6">
        Dashboard
      </h1>

    </div>

  </div>
)
}