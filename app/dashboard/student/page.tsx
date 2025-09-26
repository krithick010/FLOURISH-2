"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle, Heart, Calendar, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { StudentNavbar } from "@/components/student/Navbar"
import { useAuth } from "@/components/auth/AuthProvider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function StudentDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    } else if (!loading && user && user.role !== 'student') {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'student') {
    return null
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <StudentNavbar />
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Welcome back to SKCT Wellness!</h1>
            <p className="text-stone-600">Your personal wellness dashboard at Sri Krishna College of Technology</p>
          </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-teal-200 bg-teal-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-600 font-medium">Forum Posts</p>
                  <p className="text-2xl font-bold text-teal-800">12</p>
                </div>
                <MessageCircle className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-600 font-medium">Wellness Score</p>
                  <p className="text-2xl font-bold text-emerald-800">78%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600 font-medium">Sessions</p>
                  <p className="text-2xl font-bold text-amber-800">3</p>
                </div>
                <Calendar className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-200 bg-rose-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-rose-600 font-medium">Resources Read</p>
                  <p className="text-2xl font-bold text-rose-800">24</p>
                </div>
                <BookOpen className="w-8 h-8 text-rose-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-600" />
                Take Wellness Assessment
              </CardTitle>
              <CardDescription>Check in with your mental health and get personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/wellness-tests">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Assessment</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-teal-600" />
                Join SKCT Community
              </CardTitle>
              <CardDescription>Connect with fellow students and share your experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/forum">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Visit Forum</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                Book Counseling
              </CardTitle>
              <CardDescription>Schedule a session with our professional counselors on campus</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/appointments">
                <Button className="w-full bg-amber-600 hover:bg-amber-700">Book Session</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  )
}
