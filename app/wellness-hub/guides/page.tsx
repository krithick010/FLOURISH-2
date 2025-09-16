"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  User, 
  Heart, 
  Target, 
  CheckCircle,
  Lightbulb,
  Zap,
  Shield
} from "lucide-react"

const quickGuides = [
  {
    id: 1,
    title: "5-4-3-2-1 Grounding Technique",
    description: "A quick anxiety relief method you can use anywhere on campus.",
    category: "Anxiety Relief",
    readTime: "2 min",
    difficulty: "Beginner",
    author: "SKCT Counseling Center",
    icon: Shield,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    steps: [
      "Name 5 things you can see around you",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste"
    ],
    whenToUse: "When feeling anxious, overwhelmed, or having a panic attack",
    tips: [
      "Take slow, deep breaths between each step",
      "Really focus on each sense - don't rush",
      "Use this technique anywhere: classroom, library, hostel"
    ]
  },
  {
    id: 2,
    title: "Box Breathing for Focus",
    description: "Improve concentration and calm your mind before exams or presentations.",
    category: "Focus & Concentration",
    readTime: "3 min",
    difficulty: "Beginner",
    author: "Dr. Meera Patel",
    icon: Zap,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    steps: [
      "Sit comfortably with your back straight",
      "Inhale slowly for 4 counts",
      "Hold your breath for 4 counts",
      "Exhale slowly for 4 counts",
      "Hold empty for 4 counts",
      "Repeat for 5-10 cycles"
    ],
    whenToUse: "Before exams, presentations, or when you need to focus",
    tips: [
      "Start with shorter counts if 4 feels too long",
      "Visualize drawing a box as you breathe",
      "Practice regularly to get the best results"
    ]
  },
  {
    id: 3,
    title: "The STOP Technique",
    description: "Interrupt negative thought patterns and regain control of your emotions.",
    category: "Emotional Regulation",
    readTime: "2 min",
    difficulty: "Beginner",
    author: "Student Wellness Team",
    icon: Lightbulb,
    color: "bg-amber-50 border-amber-200 text-amber-700",
    steps: [
      "S - STOP what you're doing",
      "T - TAKE a deep breath",
      "O - OBSERVE your thoughts and feelings",
      "P - PROCEED with intention and awareness"
    ],
    whenToUse: "When caught in negative thoughts or emotional reactions",
    tips: [
      "Practice this technique regularly to make it automatic",
      "Use it between classes to reset your mindset",
      "Combine with other grounding techniques for better results"
    ]
  }
]

export default function GuidesPage() {
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null)

  if (selectedGuide) {
    const guide = quickGuides.find(g => g.id === selectedGuide)
    if (!guide) return null

    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50">
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setSelectedGuide(null)}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>
              <div>
                <Link href="/wellness-hub" className="text-sm text-amber-600 hover:text-amber-700">
                  Wellness Hub
                </Link>
                <span className="text-stone-400 mx-2">/</span>
                <Link href="/wellness-hub/guides" className="text-sm text-amber-600 hover:text-amber-700">
                  Quick Guides
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className={`p-8 ${guide.color.replace('text-', 'text-').replace('border-', 'border-').split(' ')[0]}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                    <guide.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium">
                      {guide.category}
                    </span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-serif font-bold mb-4">
                  {guide.title}
                </h1>
                
                <p className="text-lg opacity-90 leading-relaxed mb-6">
                  {guide.description}
                </p>

                <div className="flex items-center gap-4 text-sm opacity-80">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {guide.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {guide.readTime}
                  </div>
                  <span className="px-2 py-1 bg-white/40 rounded-full">
                    {guide.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      Steps to Follow
                    </h3>
                    
                    <div className="space-y-3">
                      {guide.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                          <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-stone-700 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-800 mb-3">
                        When to Use This Technique
                      </h3>
                      <p className="text-stone-600 leading-relaxed bg-amber-50 p-4 rounded-lg border border-amber-200">
                        {guide.whenToUse}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-stone-800 mb-3">
                        Tips for Success
                      </h3>
                      <ul className="space-y-2">
                        {guide.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-stone-600 text-sm leading-relaxed">{tip}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
                  <h3 className="font-semibold text-teal-800 mb-2">Need Additional Support?</h3>
                  <p className="text-teal-700 text-sm">
                    These techniques are helpful tools, but if you're consistently struggling, 
                    please reach out to the SKCT Counseling Center for personalized support.
                  </p>
                  <Link href="/counselors" className="inline-block mt-3 text-teal-600 hover:text-teal-700 font-medium text-sm">
                    Connect with a Counselor →
                  </Link>
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
      <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50">
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white py-6 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <Link href="/wellness-hub">
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6" />
                <h1 className="text-2xl font-serif font-bold">Quick Guides</h1>
              </div>
            </div>
            <p className="text-amber-100">
              Practical techniques and exercises you can use immediately at SKCT
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-600" />
              Essential Techniques for SKCT Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickGuides.map((guide) => (
              <div
                key={guide.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedGuide(guide.id)}
              >
                <div className={`p-6 ${guide.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center">
                      <guide.icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 bg-white/60 text-sm font-medium rounded-full">
                      {guide.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 group-hover:scale-105 transition-transform">
                    {guide.title}
                  </h3>
                  
                  <p className="text-sm opacity-90 leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {guide.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-stone-700">Quick Preview:</p>
                    <div className="text-xs text-stone-600">
                      {guide.steps.slice(0, 2).map((step, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                          <span>{step}</span>
                        </div>
                      ))}
                      {guide.steps.length > 2 && (
                        <div className="flex items-center gap-2 text-amber-600">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                          <span>+ {guide.steps.length - 2} more steps</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-700 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-amber-200">
                    Learn Technique
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <Heart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-800 mb-2">More Techniques Coming Soon</h3>
              <p className="text-stone-600">
                Our counseling team is developing more quick techniques specifically for SKCT students. 
                These will include time management, study skills, and relationship wellness guides.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
