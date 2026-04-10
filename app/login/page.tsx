"use client"

import { supabase } from "@/lib/supabase"

export default function Login() {

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard"
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="card text-center w-[350px]">

        <h1 className="text-3xl text-green-400 mb-3">
          💰 Budget Planner
        </h1>

        <p className="text-gray-400 mb-6">
          Track your expenses smartly
        </p>

        <button onClick={handleLogin} className="btn w-full">
          Continue with Google
        </button>

      </div>

    </div>
  )
}