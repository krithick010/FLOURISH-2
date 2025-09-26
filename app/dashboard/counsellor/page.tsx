"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { CounselorLayout } from "@/components/counselor/Layout"
import { DashboardCard } from "@/components/counselor/DashboardCard"
import { useAuth } from "@/components/auth/AuthProvider"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Calendar, Users, FileText, TrendingUp, AlertCircle, MessageSquare, Clock } from "lucide-react"

export default function CounsellorDashboard() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    } else if (!loading && user && user.role !== 'counsellor') {
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

  if (!user || user.role !== 'counsellor') {
    return null
  }

  return (
    <CounselorLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Dashboard Overview</h1>
          <p className="text-stone-600">Welcome back, Dr. Rachel. Here's your daily summary.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Today's Sessions"
            value="6"
            icon={<Calendar className="w-6 h-6" />}
            variant="blue"
          />
          
          <DashboardCard
            title="Active Students"
            value="42"
            icon={<Users className="w-6 h-6" />}
            variant="emerald"
          />
          
          <DashboardCard
            title="Pending Reports"
            value="8"
            icon={<FileText className="w-6 h-6" />}
            variant="amber"
          />
          
          <DashboardCard
            title="Urgent Cases"
            value="2"
            icon={<AlertCircle className="w-6 h-6" />}
            variant="rose"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Manage Schedule"
            description="View and manage your counseling appointments"
            icon={<Calendar className="w-5 h-5" />}
            action={{
              label: "View Schedule",
              onClick: () => router.push("/dashboard/counsellor/schedule")
            }}
          />

          <DashboardCard
            title="Student Records"
            description="Access student wellness records and progress"
            icon={<Users className="w-5 h-5" />}
            action={{
              label: "View Students",
              onClick: () => router.push("/dashboard/counsellor/students")
            }}
          />

          <DashboardCard
            title="Analytics"
            description="View campus wellness trends and insights"
            icon={<TrendingUp className="w-5 h-5" />}
            action={{
              label: "View Analytics",
              onClick: () => router.push("/dashboard/counsellor/analytics")
            }}
          />

          <DashboardCard
            title="Messages"
            description="Respond to student messages and queries"
            icon={<MessageSquare className="w-5 h-5" />}
            action={{
              label: "Open Messages",
              onClick: () => router.push("/dashboard/counsellor/messages")
            }}
          />

          <DashboardCard
            title="Reports"
            description="Review and approve wellness reports"
            icon={<FileText className="w-5 h-5" />}
            action={{
              label: "View Reports",
              onClick: () => router.push("/dashboard/counsellor/reports")
            }}
          />

          <DashboardCard
            title="Next Session"
            description="Session with anon-12345 at 2:00 PM"
            icon={<Clock className="w-5 h-5" />}
            variant="teal"
          />
        </div>

        {/* Recent Activity */}
        <DashboardCard
          title="Recent Activity"
          description="Latest updates and notifications"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-stone-700">New message from anon-67890</span>
              </div>
              <span className="text-xs text-stone-500">5 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-stone-700">Session completed with anon-45123</span>
              </div>
              <span className="text-xs text-stone-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-stone-700">Report submitted for anon-78901</span>
              </div>
              <span className="text-xs text-stone-500">4 hours ago</span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </CounselorLayout>
  )
}
