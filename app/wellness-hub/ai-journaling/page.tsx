"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { 
  ArrowLeft, 
  PenTool, 
  Clock, 
  User, 
  Save, 
  Heart,
  Sparkles,
  Zap,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Calendar,
  Target,
  Lightbulb
} from "lucide-react"

const journalPrompts = [
  {
    id: 1,
    title: "Daily Reflection",
    description: "Process your day with AI-guided questions that adapt to your experiences.",
    category: "Daily Practice",
    duration: "5-10 min",
    difficulty: "Beginner",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    icon: BookOpen,
    questions: [
      "What moment from today made you feel most proud?",
      "What challenge did you face, and how did you handle it?",
      "What are you grateful for from today?",
      "How did you take care of your wellbeing today?"
    ],
    aiFeatures: [
      "Analyzes your mood patterns over time",
      "Suggests personalized reflection questions",
      "Tracks emotional trends and progress",
      "Provides gentle insights and encouragement"
    ]
  },
  {
    id: 2,
    title: "Exam Stress Processing",
    description: "Work through academic pressure with targeted prompts for SKCT students.",
    category: "Academic Wellness",
    duration: "8-12 min",
    difficulty: "Intermediate",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    icon: Target,
    questions: [
      "What specific aspects of this exam/assignment are causing you stress?",
      "What study strategies have been working well for you?",
      "How can you break down this challenge into smaller, manageable steps?",
      "What support do you need to feel more confident?"
    ],
    aiFeatures: [
      "Identifies stress patterns before exams",
      "Suggests personalized coping strategies",
      "Tracks academic confidence over time",
      "Recommends study break activities"
    ]
  },
  {
    id: 3,
    title: "Relationship & Social Wellness",
    description: "Explore your connections and social experiences at SKCT with AI insights.",
    category: "Social Wellness",
    duration: "7-15 min",
    difficulty: "Intermediate",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    icon: MessageCircle,
    questions: [
      "How did your interactions with friends/classmates make you feel today?",
      "What kind of social support do you need right now?",
      "How are you maintaining healthy boundaries in your relationships?",
      "What social activities bring you the most joy and energy?"
    ],
    aiFeatures: [
      "Tracks relationship satisfaction patterns",
      "Suggests communication strategies",
      "Identifies social wellness trends",
      "Recommends community involvement activities"
    ]
  }
]

export default function AIJournalingPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<string[]>([])
  const [currentResponse, setCurrentResponse] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showAIInsights, setShowAIInsights] = useState(false)

  const handleNextQuestion = () => {
    if (currentResponse.trim()) {
      const newResponses = [...responses, currentResponse]
      setResponses(newResponses)
      setCurrentResponse("")
      
      if (selectedPrompt) {
        const prompt = journalPrompts.find(p => p.id === selectedPrompt)
        if (prompt && currentQuestion < prompt.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
        } else {
          setIsComplete(true)
        }
      }
    }
  }

  const resetSession = () => {
    setSelectedPrompt(null)
    setCurrentQuestion(0)
    setResponses([])
    setCurrentResponse("")
    setIsComplete(false)
    setShowAIInsights(false)
  }

  if (selectedPrompt && !isComplete) {
    const prompt = journalPrompts.find(p => p.id === selectedPrompt)
    if (!prompt) return null

    const progress = ((currentQuestion + 1) / prompt.questions.length) * 100

    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-purple-50">
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={resetSession}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>
              <div>
                <Link href="/wellness-hub" className="text-sm text-purple-600 hover:text-purple-700">
                  Wellness Hub
                </Link>
                <span className="text-stone-400 mx-2">/</span>
                <Link href="/wellness-hub/ai-journaling" className="text-sm text-purple-600 hover:text-purple-700">
                  AI Journaling
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              {/* Header */}
              <div className={`p-6 ${prompt.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center">
                      <prompt.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-semibold">{prompt.title}</h2>
                      <p className="text-sm opacity-80">{prompt.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-medium">
                    <Sparkles className="w-3 h-3" />
                    Cookie AI
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Question {currentQuestion + 1} of {prompt.questions.length}</span>
                    <span>{Math.round(progress)}% complete</span>
                  </div>
                  <div className="w-full bg-white/40 rounded-full h-2">
                    <div 
                      className="bg-white/80 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-stone-800 mb-3">
                    {prompt.questions[currentQuestion]}
                  </h3>
                  <p className="text-stone-600 text-sm">
                    Take your time to reflect. Cookie AI will provide insights based on your response.
                  </p>
                </div>

                <div className="space-y-4">
                  <textarea
                    value={currentResponse}
                    onChange={(e) => setCurrentResponse(e.target.value)}
                    placeholder="Start writing your thoughts here..."
                    className="w-full h-40 p-4 border border-stone-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-stone-500">
                      {currentResponse.length} characters
                    </div>
                    <button 
                      onClick={handleNextQuestion}
                      disabled={!currentResponse.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-stone-300 disabled:to-stone-400 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                    >
                      {currentQuestion < prompt.questions.length - 1 ? 'Next Question' : 'Complete Session'}
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>

                {/* Previous responses */}
                {responses.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-stone-200">
                    <h4 className="font-semibold text-stone-800 mb-4">Your Previous Responses</h4>
                    <div className="space-y-3">
                      {responses.map((response, index) => (
                        <div key={index} className="p-3 bg-stone-50 rounded-lg">
                          <p className="text-sm font-medium text-stone-700 mb-1">
                            {prompt.questions[index]}
                          </p>
                          <p className="text-stone-600 text-sm">{response}</p>
                        </div>
                      ))}
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

  if (isComplete) {
    const prompt = journalPrompts.find(p => p.id === selectedPrompt)
    if (!prompt) return null

    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-purple-50">
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={resetSession}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>
              <div>
                <Link href="/wellness-hub" className="text-sm text-purple-600 hover:text-purple-700">
                  Wellness Hub
                </Link>
                <span className="text-stone-400 mx-2">/</span>
                <Link href="/wellness-hub/ai-journaling" className="text-sm text-purple-600 hover:text-purple-700">
                  AI Journaling
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              {/* Completion Header */}
              <div className="p-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-stone-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">
                    Session Complete! 🎉
                  </h2>
                  <p className="text-stone-600">
                    Great work on completing your {prompt.title} session. Here's what Cookie AI noticed.
                  </p>
                </div>
              </div>

              {/* AI Insights */}
              <div className="p-8">
                <div className="flex gap-4 mb-6">
                  <button 
                    onClick={() => setShowAIInsights(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${!showAIInsights ? 'bg-purple-100 text-purple-700' : 'text-stone-600 hover:bg-stone-100'}`}
                  >
                    Your Responses
                  </button>
                  <button 
                    onClick={() => setShowAIInsights(true)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${showAIInsights ? 'bg-purple-100 text-purple-700' : 'text-stone-600 hover:bg-stone-100'}`}
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Insights
                  </button>
                </div>

                {!showAIInsights ? (
                  <div className="space-y-4">
                    {responses.map((response, index) => (
                      <div key={index} className="p-4 bg-stone-50 rounded-xl">
                        <h4 className="font-semibold text-stone-800 mb-2">
                          {prompt.questions[index]}
                        </h4>
                        <p className="text-stone-700 leading-relaxed">{response}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                      <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Cookie AI's Observations
                      </h3>
                      <div className="space-y-3 text-purple-700">
                        <p>• You showed strong self-awareness in your responses, particularly when discussing challenges</p>
                        <p>• Your gratitude practice appears to be well-developed - this is excellent for mental wellbeing</p>
                        <p>• You mentioned time management as a recurring theme - consider exploring our focus meditation sessions</p>
                        <p>• Your resilience comes through clearly in how you describe handling difficulties</p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                      <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Personalized Recommendations
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                          <div>
                            <p className="text-emerald-800 font-medium">Try the "Focus Enhancement" meditation</p>
                            <p className="text-emerald-700 text-sm">Based on your time management concerns</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                          <div>
                            <p className="text-emerald-800 font-medium">Join the SKCT Wellness Community</p>
                            <p className="text-emerald-700 text-sm">Connect with peers who share similar experiences</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                          <div>
                            <p className="text-emerald-800 font-medium">Schedule weekly reflection sessions</p>
                            <p className="text-emerald-700 text-sm">Your responses show you benefit from regular self-check-ins</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                      <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Your Wellness Journey
                      </h3>
                      <p className="text-amber-700 text-sm leading-relaxed">
                        This is your 3rd journaling session this week! Your consistency is building strong self-awareness habits. 
                        Cookie AI has noticed you're becoming more specific in your reflections and showing improved emotional vocabulary.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button 
                    onClick={resetSession}
                    className="flex-1 bg-gradient-to-r from-stone-100 to-slate-100 hover:from-stone-200 hover:to-slate-200 text-stone-700 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                    Start New Session
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />
                    Save to Journal
                  </button>
                </div>
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
      <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-purple-50">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white py-6 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <Link href="/wellness-hub">
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <PenTool className="w-6 h-6" />
                  <Sparkles className="w-4 h-4" />
                </div>
                <h1 className="text-2xl font-serif font-bold">AI Journaling</h1>
              </div>
            </div>
            <p className="text-purple-100">
              Guided reflection with Cookie AI to enhance self-awareness and emotional wellbeing
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 mb-8">
              <h2 className="text-xl font-semibold text-purple-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Personalized Reflection with Cookie AI
              </h2>
              <p className="text-purple-700 leading-relaxed">
                Cookie AI guides you through thoughtful questions, analyzes your responses for patterns, 
                and provides insights to support your mental wellness journey at SKCT. Your entries are private and secure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journalPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPrompt(prompt.id)}
              >
                <div className={`p-6 ${prompt.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center">
                      <prompt.icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 bg-white/60 text-sm font-medium rounded-full">
                      {prompt.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 group-hover:scale-105 transition-transform">
                    {prompt.title}
                  </h3>
                  
                  <p className="text-sm opacity-90 leading-relaxed">
                    {prompt.description}
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {prompt.duration}
                    </div>
                    <span className="px-2 py-1 bg-stone-100 text-stone-600 rounded-full">
                      {prompt.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      AI Guided
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-stone-700">Sample Questions:</p>
                    <div className="text-xs text-stone-600">
                      {prompt.questions.slice(0, 2).map((question, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{question}</span>
                        </div>
                      ))}
                      {prompt.questions.length > 2 && (
                        <div className="flex items-center gap-2 text-purple-600 mt-1">
                          <span>+ {prompt.questions.length - 2} more questions</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-700 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-purple-200">
                    Start Journaling
                    <PenTool className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Your Journey Matters</h3>
              <p className="text-stone-600">
                Every reflection session helps Cookie AI understand you better and provide more personalized support. 
                Your mental wellness journey at SKCT is unique, and we're here to support you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
