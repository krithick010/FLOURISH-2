"use client"

import { CounselorLayout } from "@/components/counselor/Layout"
import { DashboardCard } from "@/components/counselor/DashboardCard"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { 
  Download, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Calendar,
  Filter
} from "lucide-react"

// Mock data for charts
const urgentCasesData = [
  { day: 'Mon', cases: 2 },
  { day: 'Tue', cases: 1 },
  { day: 'Wed', cases: 4 },
  { day: 'Thu', cases: 3 },
  { day: 'Fri', cases: 2 },
  { day: 'Sat', cases: 1 },
  { day: 'Sun', cases: 0 }
]

const studentStatusData = [
  { name: 'Active', value: 28, color: '#10b981' },
  { name: 'Under Review', value: 12, color: '#f59e0b' },
  { name: 'Inactive', value: 8, color: '#6b7280' },
  { name: 'Urgent', value: 2, color: '#ef4444' }
]

const sessionTypesData = [
  { month: 'Jan', individual: 45, group: 12, emergency: 3 },
  { month: 'Feb', individual: 52, group: 15, emergency: 5 },
  { month: 'Mar', individual: 48, group: 18, emergency: 2 },
  { month: 'Apr', individual: 61, group: 14, emergency: 4 },
  { month: 'May', individual: 55, group: 20, emergency: 6 },
  { month: 'Jun', individual: 58, group: 16, emergency: 3 }
]

const wellnessMetricsData = [
  { week: 'Week 1', anxiety: 3.2, depression: 2.8, stress: 4.1 },
  { week: 'Week 2', anxiety: 2.9, depression: 2.5, stress: 3.8 },
  { week: 'Week 3', anxiety: 2.6, depression: 2.2, stress: 3.5 },
  { week: 'Week 4', anxiety: 2.3, depression: 2.0, stress: 3.2 }
]

const COLORS = ['#10b981', '#f59e0b', '#6b7280', '#ef4444']

export default function AnalyticsPage() {
  return (
    <CounselorLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">SKCT Wellness Analytics</h1>
            <p className="text-stone-600">Track student wellness trends and intervention effectiveness</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Students"
            value="50"
            icon={<Users className="w-6 h-6" />}
            variant="blue"
          />
          <DashboardCard
            title="Sessions This Month"
            value="124"
            icon={<Calendar className="w-6 h-6" />}
            variant="emerald"
          />
          <DashboardCard
            title="Improvement Rate"
            value="78%"
            icon={<TrendingUp className="w-6 h-6" />}
            variant="teal"
          />
          <DashboardCard
            title="Critical Cases"
            value="2"
            icon={<AlertTriangle className="w-6 h-6" />}
            variant="rose"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Status Distribution */}
          <DashboardCard title="Student Status Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={studentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {studentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </DashboardCard>

          {/* Urgent Cases Trend */}
          <DashboardCard title="Urgent Cases - Last 7 Days">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={urgentCasesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cases" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </DashboardCard>

          {/* Session Types by Month */}
          <DashboardCard title="Session Types - Monthly Breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionTypesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="individual" fill="#3b82f6" name="Individual" />
                <Bar dataKey="group" fill="#10b981" name="Group" />
                <Bar dataKey="emergency" fill="#ef4444" name="Emergency" />
              </BarChart>
            </ResponsiveContainer>
          </DashboardCard>

          {/* Wellness Metrics Trend */}
          <DashboardCard title="Average Wellness Metrics (Monthly)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={wellnessMetricsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="anxiety" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Anxiety Level"
                />
                <Line 
                  type="monotone" 
                  dataKey="depression" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Depression Level"
                />
                <Line 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Stress Level"
                />
              </LineChart>
            </ResponsiveContainer>
          </DashboardCard>
        </div>

        {/* Insights Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Key Insights"
            description="78% of students show improvement after 4 sessions"
          >
            <div className="space-y-3 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Session completion rate: 92%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Average session duration: 45 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Peak session times: 2-4 PM</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Recommendations"
            description="Based on current trends and data"
          >
            <div className="space-y-3 text-sm text-stone-600">
              <div className="p-2 bg-blue-50 rounded">
                <span className="text-blue-800">Consider adding evening sessions</span>
              </div>
              <div className="p-2 bg-emerald-50 rounded">
                <span className="text-emerald-800">Group therapy showing positive results</span>
              </div>
              <div className="p-2 bg-amber-50 rounded">
                <span className="text-amber-800">Monitor stress levels during exam periods</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Monthly Summary"
            description="September 2025 Performance"
          >
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-600">Total Sessions:</span>
                <span className="font-medium">124</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">New Students:</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Success Rate:</span>
                <span className="font-medium text-emerald-600">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Avg. Rating:</span>
                <span className="font-medium">4.6/5</span>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </CounselorLayout>
  )
}