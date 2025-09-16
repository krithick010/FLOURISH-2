"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { 
  ArrowLeft, 
  Brain, 
  Clock, 
  User, 
  Play, 
  Pause,
  SkipForward,
  Volume2,
  Heart,
  Sparkles,
  Zap,
  Eye,
  Wind,
  Moon
} from "lucide-react"

const meditationPrograms = [
  {
    id: 1,
    title: "Exam Stress Relief",
    description: "AI-guided meditation specifically designed for SKCT students during exam periods.",
    duration: "10 min",
    difficulty: "Beginner",
    category: "Stress Relief",
    instructor: "Cookie AI",
    icon: Brain,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    features: [
      "Personalized breathing patterns based on your stress level",
      "Real-time guidance that adapts to your heart rate",
      "Study-break optimization recommendations",
      "Pre-exam confidence boosting affirmations"
    ],
    techniques: ["Deep breathing", "Progressive muscle relaxation", "Visualization"],
    aiFeatures: [
      "Detects your current stress level through voice analysis",
      "Adjusts meditation pace based on your breathing",
      "Provides personalized study break recommendations",
      "Tracks your progress and suggests optimal practice times"
    ]
  },
  {
    id: 2,
    title: "Focus Enhancement",
    description: "Boost your concentration for lectures, assignments, and project work.",
    duration: "8 min",
    difficulty: "Intermediate",
    category: "Focus",
    instructor: "Cookie AI",
    icon: Eye,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    features: [
      "Attention span training with AI feedback",
      "Personalized focus music generation",
      "Concentration level monitoring",
      "Study session optimization"
    ],
    techniques: ["Mindfulness", "Attention training", "Breath awareness"],
    aiFeatures: [
      "Generates focus music based on your preferences",
      "Monitors your attention span and provides feedback",
      "Suggests optimal study session lengths",
      "Adapts techniques based on your learning style"
    ]
  },
  {
    id: 3,
    title: "Sleep Preparation",
    description: "Wind down after late-night study sessions and prepare for restful sleep.",
    duration: "15 min",
    difficulty: "Beginner",
    category: "Sleep",
    instructor: "Cookie AI",
    icon: Moon,
    color: "bg-purple-50 border-purple-200 text-purple-700",
    features: [
      "Smart sleep timing recommendations",
      "Personalized bedtime routine creation",
      "Relaxation techniques for better sleep quality",
      "Integration with your class schedule"
    ],
    techniques: ["Body scan", "Progressive relaxation", "Sleep visualization"],
    aiFeatures: [
      "Analyzes your daily schedule to suggest optimal bedtime",
      "Creates personalized wind-down routines",
      "Monitors sleep quality through voice patterns",
      "Adjusts relaxation techniques based on your stress level"
    ]
  }
]

export default function AIMeditationPage() {
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showAIFeatures, setShowAIFeatures] = useState(false)

  if (selectedProgram) {
    const program = meditationPrograms.find(p => p.id === selectedProgram)
    if (!program) return null

    const totalDuration = parseInt(program.duration) * 60 // Convert to seconds
    const progress = (currentTime / totalDuration) * 100

    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-indigo-50">
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => {
                  setSelectedProgram(null)
                  setIsPlaying(false)
                  setCurrentTime(0)
                }}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>
              <div>
                <Link href="/wellness-hub" className="text-sm text-indigo-600 hover:text-indigo-700">
                  Wellness Hub
                </Link>
                <span className="text-stone-400 mx-2">/</span>
                <Link href="/wellness-hub/ai-meditation" className="text-sm text-indigo-600 hover:text-indigo-700">
                  AI Meditation
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              {/* Header */}
              <div className={`p-8 ${program.color.replace('text-', 'text-').replace('border-', 'border-').split(' ')[0]}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                    <program.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium">
                      {program.category}
                    </span>
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium">
                      <Sparkles className="w-3 h-3" />
                      Powered by AI
                    </div>
                  </div>
                </div>
                
                <h1 className="text-3xl font-serif font-bold mb-4">
                  {program.title}
                </h1>
                
                <p className="text-lg opacity-90 leading-relaxed mb-6">
                  {program.description}
                </p>

                <div className="flex items-center gap-4 text-sm opacity-80">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {program.instructor}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {program.duration}
                  </div>
                  <span className="px-2 py-1 bg-white/40 rounded-full">
                    {program.difficulty}
                  </span>
                </div>
              </div>

              {/* Player */}
              <div className="p-8 bg-gradient-to-r from-stone-50 to-slate-50">
                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-stone-800">Cookie AI is ready to guide you</h3>
                    <p className="text-stone-600 text-sm">Your personalized meditation experience</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-stone-600 mb-2">
                      <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button className="p-3 hover:bg-stone-100 rounded-full transition-colors">
                      <SkipForward className="w-5 h-5 text-stone-600 rotate-180" />
                    </button>
                    
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8 ml-1" />
                      )}
                    </button>
                    
                    <button className="p-3 hover:bg-stone-100 rounded-full transition-colors">
                      <SkipForward className="w-5 h-5 text-stone-600" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <Volume2 className="w-5 h-5 text-stone-600" />
                    <div className="w-24 bg-stone-200 rounded-full h-1">
                      <div className="bg-indigo-600 h-1 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Tabs */}
              <div className="p-8">
                <div className="flex gap-4 mb-6">
                  <button 
                    onClick={() => setShowAIFeatures(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${!showAIFeatures ? 'bg-indigo-100 text-indigo-700' : 'text-stone-600 hover:bg-stone-100'}`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setShowAIFeatures(true)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${showAIFeatures ? 'bg-indigo-100 text-indigo-700' : 'text-stone-600 hover:bg-stone-100'}`}
                  >
                    <Zap className="w-4 h-4" />
                    AI Features
                  </button>
                </div>

                {!showAIFeatures ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-800 mb-4">What You'll Experience</h3>
                      <ul className="space-y-3">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-stone-700">{feature}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-stone-800 mb-4">Techniques Used</h3>
                      <div className="space-y-3">
                        {program.techniques.map((technique, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                            <Wind className="w-5 h-5 text-indigo-600" />
                            <span className="text-indigo-700 font-medium">{technique}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                        <h4 className="font-semibold text-emerald-800 mb-2">Perfect for SKCT Students</h4>
                        <p className="text-emerald-700 text-sm">
                          Designed specifically for the challenges of college life, including exam stress, 
                          group projects, hostel life, and maintaining work-life balance.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      AI-Powered Personalization
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {program.aiFeatures.map((feature, index) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-stone-700 text-sm leading-relaxed">{feature}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                      <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        How Cookie AI Learns
                      </h4>
                      <p className="text-amber-700 text-sm leading-relaxed">
                        Cookie AI continuously learns from your meditation sessions, stress patterns, and feedback 
                        to provide increasingly personalized guidance. Your data is kept private and secure, 
                        used only to enhance your wellness journey at SKCT.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-indigo-50">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-6 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <Link href="/wellness-hub">
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  <Sparkles className="w-4 h-4" />
                </div>
                <h1 className="text-2xl font-serif font-bold">AI Meditation</h1>
              </div>
            </div>
            <p className="text-indigo-100">
              Personalized meditation experiences powered by Cookie AI for SKCT students
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200 mb-8">
              <h2 className="text-xl font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Powered by Cookie AI
              </h2>
              <p className="text-indigo-700 leading-relaxed">
                Experience meditation sessions that adapt to your stress level, schedule, and personal preferences. 
                Cookie AI learns from your patterns to provide the most effective guidance for your wellness journey at SKCT.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meditationPrograms.map((program) => (
              <div
                key={program.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProgram(program.id)}
              >
                <div className={`p-6 ${program.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center">
                      <program.icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 bg-white/60 text-sm font-medium rounded-full">
                      {program.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 group-hover:scale-105 transition-transform">
                    {program.title}
                  </h3>
                  
                  <p className="text-sm opacity-90 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {program.instructor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {program.duration}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      AI Powered
                    </div>
                    <span className="px-2 py-1 bg-stone-100 text-stone-600 rounded-full text-xs">
                      {program.difficulty}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-stone-700">AI Features:</p>
                    <div className="text-xs text-stone-600">
                      {program.aiFeatures.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Zap className="w-3 h-3 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {program.aiFeatures.length > 2 && (
                        <div className="flex items-center gap-2 text-indigo-600 mt-1">
                          <span>+ {program.aiFeatures.length - 2} more AI features</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-indigo-200">
                    Start Session
                    <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">More AI Programs Coming Soon</h3>
              <p className="text-stone-600">
                Cookie AI is learning and developing new personalized programs for SKCT students, 
                including group meditation sessions, exam preparation, and relationship wellness.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
