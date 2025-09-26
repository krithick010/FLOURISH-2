"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/AuthProvider"
import { Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    } else if (!loading && user) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-stone-50 to-emerald-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-stone-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-800">SKCT Wellness</h1>
            <p className="text-stone-600">Sri Krishna College of Technology</p>
          </div>
        </div>
        
        <p className="text-lg text-stone-600 mb-8">
          Welcome to your wellness community
        </p>
        
        <Link 
          href="/auth/login"
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}