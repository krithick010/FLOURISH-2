"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import { Brain, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

const assessmentQuestions = [
  {
    id: 1,
    category: "PHQ-9 Depression Assessment",
    question: "Over the last 2 weeks, how often have you been bothered by this problem?",
    subQuestion: "Little interest or pleasure in doing things",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 2,
    category: "PHQ-9 Depression Assessment",
    question: "Over the last 2 weeks, how often have you been bothered by this problem?",
    subQuestion: "Feeling down, depressed, or hopeless",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 3,
    category: "PHQ-9 Depression Assessment",
    question: "Over the last 2 weeks, how often have you been bothered by this problem?",
    subQuestion: "Trouble falling or staying asleep, or sleeping too much",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswerSelect = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const currentQ = assessmentQuestions[currentQuestion]
  const isAnswered = answers[currentQ?.id] !== undefined
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100

  if (showResults) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-stone-800 mb-3">Assessment Complete</h1>
              <p className="text-lg text-stone-600 leading-relaxed">
                Thank you for taking the time to share with us. Here are your personalized results and recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 border border-stone-200">
                <h2 className="text-xl font-semibold text-stone-800 mb-4">Your Assessment Results</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                    <h3 className="font-medium text-teal-800 mb-2">Overall Wellbeing Score</h3>
                    <p className="text-sm text-teal-700">
                      Based on your responses, you may be experiencing some challenges with mood and daily activities.
                      This is completely normal, and there are many ways we can support you.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <h3 className="font-medium text-amber-800 mb-2">Areas of Focus</h3>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Sleep patterns and rest</li>
                      <li>• Daily motivation and energy</li>
                      <li>• Stress management techniques</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-stone-200">
                <h2 className="text-xl font-semibold text-stone-800 mb-4">Personalized Recommendations</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <h3 className="font-medium text-emerald-800 mb-2">Immediate Support</h3>
                    <p className="text-sm text-emerald-700 mb-2">
                      Consider speaking with one of our counselors who specializes in mood support.
                    </p>
                    <button className="text-emerald-700 font-medium text-sm hover:text-emerald-800 transition-colors">
                      Browse Counselors →
                    </button>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h3 className="font-medium text-blue-800 mb-2">Self-Care Resources</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Explore our wellness hub for articles on sleep hygiene and stress management.
                    </p>
                    <button className="text-blue-700 font-medium text-sm hover:text-blue-800 transition-colors">
                      Visit Wellness Hub →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setCurrentQuestion(0)
                  setAnswers({})
                  setShowResults(false)
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Take Assessment Again
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-3">Mental Health Assessment & AI Support</h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Take our confidential assessment to get personalized insights and coping strategies. Your responses help
              us understand how to best support you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Assessment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                {/* Progress Bar */}
                <div className="p-6 border-b border-stone-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-stone-700">
                      Question {currentQuestion + 1} of {assessmentQuestions.length}
                    </span>
                    <span className="text-sm text-stone-500">{Math.round(progress)}% complete</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-stone-800">{currentQ.category}</h2>
                        <p className="text-sm text-stone-600">{currentQ.question}</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-medium text-stone-800 mb-6">{currentQ.subQuestion}</h3>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-3 mb-8">
                    {currentQ.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswerSelect(currentQ.id, option.value)}
                        className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                          answers[currentQ.id] === option.value
                            ? "bg-teal-50 border-teal-300 text-teal-800"
                            : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              answers[currentQ.id] === option.value ? "border-teal-600 bg-teal-600" : "border-stone-300"
                            }`}
                          >
                            {answers[currentQ.id] === option.value && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <span className="font-medium">{option.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={!isAnswered}
                      className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                    >
                      {currentQuestion === assessmentQuestions.length - 1 ? "Complete" : "Next"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Preview */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100 sticky top-8">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">What You'll Get</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800 text-sm">Personalized Insights</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Understanding your current wellbeing and areas that might need attention.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800 text-sm">Coping Strategies</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Practical techniques and resources tailored to your specific needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800 text-sm">Professional Recommendations</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Suggestions for counselors and resources that align with your assessment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/60 rounded-xl">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    <strong>Your privacy matters:</strong> All responses are confidential and used only to provide you
                    with personalized support recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
