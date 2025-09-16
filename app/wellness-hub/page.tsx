"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { 
  Heart, 
  Brain, 
  Users, 
  Sparkles, 
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  Headphones, 
  FileText, 
  PenTool,
  ArrowRight,
  Flame,
  Award,
  TrendingUp,
  MessageSquare,
  Phone,
  ChevronRight,
  Zap
} from "lucide-react"

export default function WellnessHubPage() {
  const [showMeditationModal, setShowMeditationModal] = useState(false)
  const [showJournalingModal, setShowJournalingModal] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)

  // Mock meditation streak data
  const meditationData = {
    currentStreak: 7,
    todayCompleted: false,
    weekProgress: [true, true, false, true, true, true, false], // Last 7 days
    totalMinutes: 560
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white py-8 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8" />
              <h1 className="text-3xl font-serif font-bold">SKCT Wellness Hub</h1>
            </div>
            <p className="text-xl text-amber-100 font-light leading-relaxed">
              Your space for balance and growth at Sri Krishna College of Technology
            </p>
            <p className="text-amber-200 mt-2">
              Discover resources, track your wellness journey, and connect with our supportive community.
            </p>
          </div>
        </div>

        {/* Sticky Sub-Navigation */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-stone-200 z-10">
          <div className="max-w-6xl mx-auto px-8 py-4">
            <nav className="flex items-center gap-8 text-sm">
              <Link href="#quick-actions" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                Quick Actions
              </Link>
              <Link href="#meditation-tracker" className="text-stone-600 hover:text-amber-600 transition-colors">
                Meditation Tracker
              </Link>
              <Link href="#ai-features" className="text-stone-600 hover:text-amber-600 transition-colors">
                AI Features
              </Link>
              <Link href="#resources" className="text-stone-600 hover:text-amber-600 transition-colors">
                Resources
              </Link>
              <Link href="#community" className="text-stone-600 hover:text-amber-600 transition-colors">
                Community
              </Link>
            </nav>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-8 space-y-12">
          {/* Quick Actions Section */}
          <section id="quick-actions">
            <h2 className="text-2xl font-serif font-semibold text-stone-800 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-600" />
              Quick Actions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button 
                onClick={() => setShowMeditationModal(true)}
                className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-stone-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  Start Meditation
                </h3>
                <p className="text-stone-600 text-sm">
                  Begin a guided session to reduce stress and improve focus
                </p>
              </button>

              <button 
                onClick={() => setShowJournalingModal(true)}
                className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <PenTool className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-stone-800 mb-2 group-hover:text-purple-600 transition-colors">
                  AI Journaling
                </h3>
                <p className="text-stone-600 text-sm">
                  Reflect on your day with AI-guided prompts and insights
                </p>
              </button>

              <Link href="/counselors" className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-stone-800 mb-2 group-hover:text-blue-600 transition-colors">
                  Talk to Counselor
                </h3>
                <p className="text-stone-600 text-sm">
                  Connect with professional counselors for personalized support
                </p>
              </Link>

              <Link href="/chatbot" className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-stone-800 mb-2 group-hover:text-orange-600 transition-colors">
                  Chat with Cookie
                </h3>
                <p className="text-stone-600 text-sm">
                  Get instant support and coping strategies from our AI assistant
                </p>
              </Link>
            </div>
          </section>

          {/* Meditation Streak Tracker */}
          <section id="meditation-tracker">
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-emerald-600" />
                    <h2 className="text-xl font-semibold text-stone-800">Meditation Streak Tracker</h2>
                  </div>
                  <Link 
                    href="/wellness-hub/meditation-tracker"
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
                  >
                    View Full Tracker
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Current Streak */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-stone-800 mb-1">{meditationData.currentStreak}</p>
                    <p className="text-stone-600 text-sm">Day Streak</p>
                    <p className="text-orange-600 text-xs font-medium mt-1">🔥 Keep it going!</p>
                  </div>

                  {/* Today's Status */}
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                      meditationData.todayCompleted 
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                        : 'bg-gradient-to-br from-stone-300 to-stone-400'
                    }`}>
                      {meditationData.todayCompleted ? (
                        <Target className="w-8 h-8 text-white" />
                      ) : (
                        <Clock className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <p className="text-lg font-semibold text-stone-800 mb-1">
                      {meditationData.todayCompleted ? "Completed!" : "Today's Goal"}
                    </p>
                    <p className="text-stone-600 text-sm">
                      {meditationData.todayCompleted ? "Well done! 🎉" : "10 min meditation"}
                    </p>
                    {!meditationData.todayCompleted && (
                      <button 
                        onClick={() => setShowMeditationModal(true)}
                        className="mt-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        Start Now
                      </button>
                    )}
                  </div>

                  {/* Weekly Progress */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg font-semibold text-stone-800 mb-2">This Week</p>
                    <div className="flex justify-center gap-1 mb-2">
                      {meditationData.weekProgress.map((completed, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                            completed ? 'bg-emerald-500' : 'bg-stone-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-stone-600 text-xs">
                      {meditationData.weekProgress.filter(Boolean).length}/7 days
                    </p>
                  </div>
                </div>

                {/* Motivational Message */}
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <p className="text-emerald-800 text-sm text-center">
                    <strong>Amazing progress!</strong> You've meditated for {Math.floor(meditationData.totalMinutes / 60)} hours and {meditationData.totalMinutes % 60} minutes total. 
                    Consistency is the key to building lasting wellness habits! 🌱
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* AI-Powered Features */}
          <section id="ai-features">
            <h2 className="text-2xl font-serif font-semibold text-stone-800 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              AI-Powered Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/wellness-hub/ai-meditation" className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      Powered by AI
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    AI Meditation Sessions
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Personalized guided meditations that adapt to your stress levels, schedule, and preferences. 
                    Cookie AI learns from your patterns to provide the most effective sessions.
                  </p>
                </div>
                <div className="px-6 py-4 border-t border-stone-100">
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>3 AI-powered programs available</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/wellness-hub/ai-journaling" className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                      <PenTool className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      Smart Insights
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-purple-600 transition-colors">
                    AI Journaling & Reflection
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Guided journaling with AI-powered prompts that help you process emotions, track patterns, 
                    and gain insights into your mental wellness journey.
                  </p>
                </div>
                <div className="px-6 py-4 border-t border-stone-100">
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>Personalized prompts & insights</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Meet Cookie, Your AI Wellness Companion</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Cookie AI is specifically designed for SKCT students, understanding the unique challenges of college life. 
                    From exam stress to social wellness, Cookie provides personalized support that grows with you throughout your academic journey.
                  </p>
                  <button 
                    onClick={() => setShowAIModal(true)}
                    className="mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Learn More About Cookie AI
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Wellness Resources */}
          <section id="resources">
            <h2 className="text-2xl font-serif font-semibold text-stone-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-teal-600" />
              Wellness Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/wellness-hub/articles" className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-teal-600 transition-colors">
                    Articles & Guides
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Evidence-based articles on mental health, stress management, and academic success for SKCT students.
                  </p>
                </div>
              </Link>

              <Link href="/wellness-hub/audio" className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    Audio Content
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Guided meditations, relaxation audio, and wellness podcasts designed for busy college students.
                  </p>
                </div>
              </Link>

              <Link href="/wellness-hub/guides" className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-amber-600 transition-colors">
                    Quick Techniques
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Practical wellness techniques you can use anywhere on campus - perfect for busy schedules.
                  </p>
                </div>
              </Link>
            </div>
          </section>

          {/* Community & Support */}
          <section id="community">
            <h2 className="text-2xl font-serif font-semibold text-stone-800 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Community & Support
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/forum" className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
                      Community Forum
                    </h3>
                    <p className="text-stone-600 text-sm">Connect with peers and counselors</p>
                  </div>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Share experiences, ask questions, and support fellow SKCT students in a safe, moderated environment.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    <span>• Anonymous posting</span>
                    <span>• Counselor responses</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>

              <Link href="/counselors" className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800 group-hover:text-emerald-600 transition-colors">
                      Professional Counselors
                    </h3>
                    <p className="text-stone-600 text-sm">Get personalized professional support</p>
                  </div>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Schedule appointments with licensed counselors who understand the unique challenges of SKCT students.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    <span>• Confidential sessions</span>
                    <span>• Flexible scheduling</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </div>
          </section>

          {/* Quick Stats Footer */}
          <section className="bg-gradient-to-r from-stone-100 to-slate-100 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-stone-800 mb-2">SKCT Wellness Impact</h3>
              <p className="text-stone-600">Supporting our students' mental health and academic success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-stone-800">1,200+</p>
                <p className="text-stone-600 text-sm">Students Supported</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-stone-800">5,400+</p>
                <p className="text-stone-600 text-sm">Meditation Sessions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-stone-800">800+</p>
                <p className="text-stone-600 text-sm">Forum Discussions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-stone-800">95%</p>
                <p className="text-stone-600 text-sm">Student Satisfaction</p>
              </div>
            </div>
          </section>
        </div>

        {/* Modals */}
        {showMeditationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-stone-800 mb-4">Start Your Meditation</h3>
              <p className="text-stone-600 mb-6">
                Choose from our AI-powered meditation sessions designed specifically for SKCT students.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/wellness-hub/ai-meditation"
                  className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium text-center transition-colors"
                >
                  Explore AI Meditation Sessions
                </Link>
                <button 
                  onClick={() => setShowMeditationModal(false)}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-xl font-medium transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        {showJournalingModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-stone-800 mb-4">AI-Guided Journaling</h3>
              <p className="text-stone-600 mb-6">
                Reflect on your day with personalized prompts and gain insights from Cookie AI.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/wellness-hub/ai-journaling"
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium text-center transition-colors"
                >
                  Start Journaling Session
                </Link>
                <button 
                  onClick={() => setShowJournalingModal(false)}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-xl font-medium transition-colors"
                >
                  Not Now
                </button>
              </div>
            </div>
          </div>
        )}

        {showAIModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">Meet Cookie AI 🍪</h3>
                <p className="text-stone-600">Your personal wellness companion at SKCT</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">Personalized Support</p>
                    <p className="text-stone-600 text-sm">Learns your patterns and preferences to provide tailored wellness guidance</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">SKCT-Specific</p>
                    <p className="text-stone-600 text-sm">Understands the unique challenges of college life and academic stress</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">Always Available</p>
                    <p className="text-stone-600 text-sm">Get instant support anytime, whether it's 2 AM before an exam or during a stressful day</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link 
                  href="/chatbot"
                  className="block w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-medium text-center transition-colors"
                >
                  Chat with Cookie Now
                </Link>
                <button 
                  onClick={() => setShowAIModal(false)}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-xl font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
