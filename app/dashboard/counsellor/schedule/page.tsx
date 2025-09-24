"use client"

import { useState } from "react"
import { CounselorLayout } from "@/components/counselor/Layout"
import { DashboardCard } from "@/components/counselor/DashboardCard"
import { Button } from "@/components/ui/button"
import { CalendarPlus, Clock, User, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock events data
const events = [
  {
    id: 1,
    title: "Session with anon-12345",
    start: new Date(2025, 8, 24, 10, 0), // September 24, 2025, 10:00 AM
    end: new Date(2025, 8, 24, 11, 0),   // September 24, 2025, 11:00 AM
    type: "session",
    studentId: "anon-12345",
    status: "confirmed"
  },
  {
    id: 2,
    title: "Session with anon-67890", 
    start: new Date(2025, 8, 24, 14, 0), // September 24, 2025, 2:00 PM
    end: new Date(2025, 8, 24, 15, 0),   // September 24, 2025, 3:00 PM
    type: "session",
    studentId: "anon-67890", 
    status: "confirmed"
  },
  {
    id: 3,
    title: "Emergency Session - anon-45123",
    start: new Date(2025, 8, 24, 16, 30), // September 24, 2025, 4:30 PM
    end: new Date(2025, 8, 24, 17, 30),   // September 24, 2025, 5:30 PM
    type: "emergency",
    studentId: "anon-45123",
    status: "urgent"
  },
  {
    id: 4,
    title: "Session with anon-78901",
    start: new Date(2025, 8, 25, 9, 0),  // September 25, 2025, 9:00 AM
    end: new Date(2025, 8, 25, 10, 0),   // September 25, 2025, 10:00 AM
    type: "session",
    studentId: "anon-78901",
    status: "pending"
  },
  {
    id: 5,
    title: "Group Therapy Session",
    start: new Date(2025, 8, 26, 15, 0), // September 26, 2025, 3:00 PM
    end: new Date(2025, 8, 26, 16, 30),  // September 26, 2025, 4:30 PM
    type: "group",
    status: "confirmed"
  }
]

// Mock upcoming sessions
const upcomingSessions = [
  { 
    id: "anon-12345", 
    time: "10:00 AM", 
    date: "Today",
    status: "confirmed",
    type: "Individual Session"
  },
  { 
    id: "anon-67890", 
    time: "2:00 PM", 
    date: "Today",
    status: "confirmed", 
    type: "Follow-up Session"
  },
  { 
    id: "anon-45123", 
    time: "4:30 PM", 
    date: "Today",
    status: "urgent",
    type: "Emergency Session"
  },
  { 
    id: "anon-78901", 
    time: "9:00 AM", 
    date: "Tomorrow", 
    status: "pending",
    type: "Individual Session"
  }
]

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("today")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="default" className="bg-emerald-100 text-emerald-700">Confirmed</Badge>
      case "pending":
        return <Badge variant="default" className="bg-amber-100 text-amber-700">Pending</Badge>
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <CounselorLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Wellness Sessions Schedule</h1>
            <p className="text-stone-600">Manage counseling sessions and wellness appointments</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <CalendarPlus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard
            title="Today's Sessions"
            value="6"
            icon={<Clock className="w-6 h-6" />}
            variant="blue"
          />
          <DashboardCard
            title="This Week"
            value="28"
            icon={<Calendar className="w-6 h-6" />}
            variant="emerald"
          />
          <DashboardCard
            title="Pending"
            value="5"
            icon={<User className="w-6 h-6" />}
            variant="amber"
          />
          <DashboardCard
            title="Emergency"
            value="1"
            icon={<Clock className="w-6 h-6" />}
            variant="rose"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <DashboardCard title="Weekly Schedule">
              <div className="space-y-4">
                {/* Calendar Navigation */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">September 2025</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Today</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>

                {/* Simple Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 text-sm">
                  {/* Calendar Headers */}
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="font-medium text-center p-2 text-stone-600">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar Days */}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={day}
                      className={`p-2 text-center border rounded cursor-pointer hover:bg-stone-50 ${
                        day === 24 ? 'bg-blue-100 border-blue-300 font-semibold' : 'border-stone-200'
                      }`}
                    >
                      <div className="mb-1">{day}</div>
                      {(day === 24 || day === 25 || day === 26) && (
                        <div className="space-y-1">
                          {day === 24 && (
                            <>
                              <div className="w-full h-1 bg-blue-500 rounded text-xs"></div>
                              <div className="w-full h-1 bg-emerald-500 rounded"></div>
                              <div className="w-full h-1 bg-red-500 rounded"></div>
                            </>
                          )}
                          {day === 25 && (
                            <div className="w-full h-1 bg-blue-500 rounded"></div>
                          )}
                          {day === 26 && (
                            <div className="w-full h-1 bg-emerald-500 rounded"></div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Individual Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                    <span>Group Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Emergency Sessions</span>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Upcoming Sessions */}
          <div className="space-y-6">
            <DashboardCard title="Upcoming Sessions">
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-stone-800">{session.id}</span>
                      {getStatusBadge(session.status)}
                    </div>
                    <div className="text-sm text-stone-600 space-y-1">
                      <p>{session.type}</p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {session.time} • {session.date}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Join Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* Quick Actions */}
            <DashboardCard title="Quick Actions">
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <CalendarPlus className="w-4 h-4 mr-2" />
                  Schedule New Session
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Set Availability
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Manage Recurring
                </Button>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </CounselorLayout>
  )
}