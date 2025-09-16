"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Flame, 
  Target,
  CheckCircle,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Zap,
  BookOpen,
  Users,
  BarChart3
} from "lucide-react"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Mock meditation data for the current month
const meditationData = {
  currentStreak: 7,
  longestStreak: 21,
  totalSessions: 45,
  totalMinutes: 560,
  completedDays: [1, 2, 4, 5, 7, 8, 9, 12, 14, 15, 16, 18, 19, 22, 24, 25, 26, 28, 29] // Days completed this month
}

const achievements = [
  { 
    id: 1, 
    title: "First Week", 
    description: "Complete 7 days of meditation", 
    icon: Flame, 
    unlocked: true,
    color: "bg-orange-100 text-orange-700"
  },
  { 
    id: 2, 
    title: "Consistency Champion", 
    description: "Meditate for 14 consecutive days", 
    icon: Target, 
    unlocked: true,
    color: "bg-emerald-100 text-emerald-700"
  },
  { 
    id: 3, 
    title: "Month Warrior", 
    description: "Complete 30 days of meditation", 
    icon: Award, 
    unlocked: false,
    color: "bg-stone-100 text-stone-400"
  },
  { 
    id: 4, 
    title: "Time Master", 
    description: "Accumulate 10 hours of meditation", 
    icon: Clock, 
    unlocked: true,
    color: "bg-blue-100 text-blue-700"
  }
]

const weeklyGoals = [
  { day: "Mon", completed: true, minutes: 10 },
  { day: "Tue", completed: true, minutes: 15 },
  { day: "Wed", completed: false, minutes: 0 },
  { day: "Thu", completed: true, minutes: 12 },
  { day: "Fri", completed: true, minutes: 8 },
  { day: "Sat", completed: true, minutes: 20 },
  { day: "Sun", completed: true, minutes: 18 }
]

export default function MeditationTrackerPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedView, setSelectedView] = useState<'calendar' | 'stats' | 'achievements'>('calendar')

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCompleted = meditationData.completedDays.includes(day)
      const isToday = day === new Date().getDate() && 
                     currentMonth === new Date().getMonth() && 
                     currentYear === new Date().getFullYear()
      
      days.push(
        <div
          key={day}
          className={`h-12 w-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer ${
            isCompleted 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md hover:shadow-lg' 
              : isToday
              ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
              : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
          }`}
        >
          {day}
          {isCompleted && (
            <CheckCircle className="w-3 h-3 absolute translate-x-3 -translate-y-3" />
          )}
        </div>
      )
    }

    return days
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white py-6 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <Link href="/wellness-hub">
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                <h1 className="text-2xl font-serif font-bold">Meditation Tracker</h1>
              </div>
            </div>
            <p className="text-emerald-100">
              Track your daily meditation practice and build lasting wellness habits at SKCT
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-800">{meditationData.currentStreak}</p>
                  <p className="text-stone-600 text-sm">Day Streak</p>
                </div>
              </div>
              <p className="text-orange-600 text-xs font-medium">Keep it going! 🔥</p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-800">{meditationData.totalSessions}</p>
                  <p className="text-stone-600 text-sm">Total Sessions</p>
                </div>
              </div>
              <p className="text-emerald-600 text-xs font-medium">Excellent progress!</p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-800">{Math.floor(meditationData.totalMinutes / 60)}h {meditationData.totalMinutes % 60}m</p>
                  <p className="text-stone-600 text-sm">Time Meditated</p>
                </div>
              </div>
              <p className="text-blue-600 text-xs font-medium">That's dedication!</p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-800">{meditationData.longestStreak}</p>
                  <p className="text-stone-600 text-sm">Longest Streak</p>
                </div>
              </div>
              <p className="text-purple-600 text-xs font-medium">Personal best! 🏆</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setSelectedView('calendar')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedView === 'calendar' 
                  ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Calendar View
            </button>
            <button 
              onClick={() => setSelectedView('stats')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedView === 'stats' 
                  ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Statistics
            </button>
            <button 
              onClick={() => setSelectedView('achievements')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedView === 'achievements' 
                  ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Award className="w-4 h-4" />
              Achievements
            </button>
          </div>

          {/* Calendar View */}
          {selectedView === 'calendar' && (
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-stone-800">
                    {MONTHS[currentMonth]} {currentYear}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-stone-600" />
                    </button>
                    <button 
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-stone-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {DAYS.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-stone-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-4">
                  {renderCalendar()}
                </div>

                <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded"></div>
                      <span className="text-emerald-700">Meditation completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-100 border-2 border-amber-300 rounded"></div>
                      <span className="text-amber-700">Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-stone-50 rounded"></div>
                      <span className="text-stone-600">Missed day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics View */}
          {selectedView === 'stats' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-stone-200 p-6">
                <h3 className="text-lg font-semibold text-stone-800 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  This Week's Progress
                </h3>
                <div className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          goal.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-500'
                        }`}>
                          {goal.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>
                        <span className="font-medium text-stone-700">{goal.day}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-stone-600">{goal.minutes} min</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-emerald-700 text-sm">
                    <strong>Weekly total:</strong> {weeklyGoals.reduce((sum, goal) => sum + goal.minutes, 0)} minutes
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6">
                <h3 className="text-lg font-semibold text-stone-800 mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Monthly Insights
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-stone-600">Completion Rate</span>
                      <span className="text-sm font-medium text-stone-800">
                        {Math.round((meditationData.completedDays.length / new Date().getDate()) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                        style={{ width: `${(meditationData.completedDays.length / new Date().getDate()) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-stone-600">Average Session</span>
                      <span className="text-sm font-medium text-stone-800">
                        {Math.round(meditationData.totalMinutes / meditationData.totalSessions)} min
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-stone-600">Best Day</span>
                      <span className="text-sm font-medium text-stone-800">Monday</span>
                    </div>
                    <p className="text-xs text-stone-500">You meditate most consistently on Mondays</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-stone-600">Preferred Time</span>
                      <span className="text-sm font-medium text-stone-800">Morning</span>
                    </div>
                    <p className="text-xs text-stone-500">70% of your sessions are before 10 AM</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements View */}
          {selectedView === 'achievements' && (
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <h3 className="text-xl font-semibold text-stone-800 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-600" />
                Your Meditation Achievements
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                      achievement.unlocked 
                        ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50' 
                        : 'border-stone-200 bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${achievement.color}`}>
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${achievement.unlocked ? 'text-stone-800' : 'text-stone-500'}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${achievement.unlocked ? 'text-stone-600' : 'text-stone-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    
                    {achievement.unlocked && (
                      <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Unlocked!</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Next Milestone
                </h4>
                <p className="text-amber-700 text-sm leading-relaxed">
                  You're only 9 days away from unlocking the "Month Warrior" achievement! 
                  Keep up your daily practice to earn this prestigious badge.
                </p>
                <div className="mt-3 w-full bg-amber-200 rounded-full h-2">
                  <div className="bg-amber-600 h-2 rounded-full w-2/3"></div>
                </div>
                <p className="text-xs text-amber-600 mt-1">21/30 days completed</p>
              </div>
            </div>
          )}

          {/* Motivational Footer */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-8">
              <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">You're Building Something Beautiful</h3>
              <p className="text-emerald-700 leading-relaxed max-w-2xl mx-auto">
                Every day you practice meditation, you're investing in your mental wellness and academic success at SKCT. 
                Small consistent actions lead to big transformations. Keep going! 🌱
              </p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <Link href="/wellness-hub/ai-meditation" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Start Today's Session
                </Link>
                <Link href="/wellness-hub" className="px-6 py-3 bg-white hover:bg-stone-50 text-emerald-700 border border-emerald-200 rounded-xl font-medium transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Explore Wellness Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
