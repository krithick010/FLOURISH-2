"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"

const ghq9Questions = [
  "Been able to concentrate on whatever you're doing",
  "Lost much sleep over worry",
  "Felt that you were playing a useful part in things",
  "Felt capable of making decisions about things",
  "Felt constantly under strain",
  "Felt you couldn't overcome your difficulties",
  "Been able to enjoy your normal day-to-day activities",
  "Been able to face up to problems",
  "Been feeling unhappy or depressed",
]

const responseOptions = [
  { value: "0", label: "Better than usual" },
  { value: "1", label: "Same as usual" },
  { value: "2", label: "Less than usual" },
  { value: "3", label: "Much less than usual" },
]

const negativeQuestions = [1, 4, 5, 8] // Questions where higher scores indicate worse wellbeing

export default function GHQ9Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<string[]>(new Array(9).fill(""))
  const [showResults, setShowResults] = useState(false)

  const handleResponseChange = (value: string) => {
    const newResponses = [...responses]
    newResponses[currentQuestion] = value
    setResponses(newResponses)
  }

  const handleNext = () => {
    if (currentQuestion < ghq9Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    return responses.reduce((sum, response, index) => {
      const score = Number.parseInt(response || "0")
      // For negative questions, reverse the scoring
      if (negativeQuestions.includes(index)) {
        return sum + score
      } else {
        return sum + (3 - score) // Reverse scoring for positive questions
      }
    }, 0)
  }

  const getScoreInterpretation = (score: number) => {
    if (score <= 9)
      return { level: "Good", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" }
    if (score <= 15)
      return { level: "Mild Distress", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" }
    if (score <= 21)
      return { level: "Moderate Distress", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" }
    return { level: "Severe Distress", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
  }

  const progress = ((currentQuestion + 1) / ghq9Questions.length) * 100

  if (showResults) {
    const score = calculateScore()
    const interpretation = getScoreInterpretation(score)

    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-stone-800 mb-3">GHQ-9 Assessment Complete</h1>
              <p className="text-stone-600">Thank you for taking the time to complete this assessment</p>
            </div>

            <Card className={`${interpretation.bg} ${interpretation.border} border-2 mb-8`}>
              <CardHeader>
                <CardTitle className={`text-2xl ${interpretation.color}`}>Your Score: {score}/27</CardTitle>
                <CardDescription className={interpretation.color}>
                  {interpretation.level} Psychological Wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-stone-700">
                    Based on your responses, your GHQ-9 score indicates {interpretation.level.toLowerCase()} levels of
                    psychological distress.
                  </p>

                  {score > 15 && (
                    <div className="bg-white rounded-xl p-4 border border-stone-200">
                      <h4 className="font-semibold text-stone-800 mb-2">Recommended Next Steps:</h4>
                      <ul className="list-disc list-inside space-y-1 text-stone-600">
                        <li>Consider speaking with a SKCT counselor</li>
                        <li>Explore stress management techniques</li>
                        <li>Connect with campus support services</li>
                        <li>Practice regular self-care activities</li>
                      </ul>
                    </div>
                  )}

                  <div className="bg-white rounded-xl p-4 border border-stone-200">
                    <h4 className="font-semibold text-stone-800 mb-2">SKCT Wellness Resources:</h4>
                    <ul className="list-disc list-inside space-y-1 text-stone-600">
                      <li>Student Counseling Center</li>
                      <li>Stress Management Workshops</li>
                      <li>Mindfulness and Meditation Sessions</li>
                      <li>Peer Support Networks</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Link href="/appointments">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Book Counseling Session</Button>
              </Link>
              <Link href="/wellness-tests">
                <Button variant="outline">Take Another Assessment</Button>
              </Link>
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/wellness-tests">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-bold text-stone-800">GHQ-9 Assessment</h1>
                  <p className="text-stone-600">
                    Question {currentQuestion + 1} of {ghq9Questions.length}
                  </p>
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Over the past few weeks, have you:</CardTitle>
              <CardDescription className="text-lg font-medium text-stone-800">
                {ghq9Questions[currentQuestion]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={responses[currentQuestion]} onValueChange={handleResponseChange} className="space-y-4">
                {responseOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer text-base">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!responses[currentQuestion]}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {currentQuestion === ghq9Questions.length - 1 ? "Complete Assessment" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
