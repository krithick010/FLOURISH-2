"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Brain, CheckCircle } from "lucide-react"
import Link from "next/link"

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself",
]

const responseOptions = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
]

export default function PHQ9Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<string[]>(new Array(9).fill(""))
  const [showResults, setShowResults] = useState(false)

  const handleResponseChange = (value: string) => {
    const newResponses = [...responses]
    newResponses[currentQuestion] = value
    setResponses(newResponses)
  }

  const handleNext = () => {
    if (currentQuestion < phq9Questions.length - 1) {
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
    return responses.reduce((sum, response) => sum + Number.parseInt(response || "0"), 0)
  }

  const getScoreInterpretation = (score: number) => {
    if (score <= 4)
      return { level: "Minimal", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" }
    if (score <= 9) return { level: "Mild", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" }
    if (score <= 14)
      return { level: "Moderate", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" }
    if (score <= 19)
      return { level: "Moderately Severe", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
    return { level: "Severe", color: "text-red-700", bg: "bg-red-50", border: "border-red-300" }
  }

  const progress = ((currentQuestion + 1) / phq9Questions.length) * 100

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
              <h1 className="text-3xl font-serif font-bold text-stone-800 mb-3">PHQ-9 Assessment Complete</h1>
              <p className="text-stone-600">Thank you for taking the time to complete this assessment</p>
            </div>

            <Card className={`${interpretation.bg} ${interpretation.border} border-2 mb-8`}>
              <CardHeader>
                <CardTitle className={`text-2xl ${interpretation.color}`}>Your Score: {score}/27</CardTitle>
                <CardDescription className={interpretation.color}>
                  {interpretation.level} Depression Symptoms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-stone-700">
                    Based on your responses, your PHQ-9 score indicates {interpretation.level.toLowerCase()} symptoms of
                    depression.
                  </p>

                  {score > 9 && (
                    <div className="bg-white rounded-xl p-4 border border-stone-200">
                      <h4 className="font-semibold text-stone-800 mb-2">Recommended Next Steps:</h4>
                      <ul className="list-disc list-inside space-y-1 text-stone-600">
                        <li>Consider speaking with a SKCT counselor</li>
                        <li>Explore campus wellness resources</li>
                        <li>Practice self-care strategies</li>
                        <li>Stay connected with supportive friends and family</li>
                      </ul>
                    </div>
                  )}

                  <div className="bg-white rounded-xl p-4 border border-stone-200">
                    <h4 className="font-semibold text-stone-800 mb-2">SKCT Resources Available:</h4>
                    <ul className="list-disc list-inside space-y-1 text-stone-600">
                      <li>Campus Counseling Services</li>
                      <li>Peer Support Groups</li>
                      <li>Wellness Workshops</li>
                      <li>24/7 Crisis Support Hotline</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Link href="/appointments">
                <Button className="bg-teal-600 hover:bg-teal-700">Book Counseling Session</Button>
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
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-bold text-stone-800">PHQ-9 Assessment</h1>
                  <p className="text-stone-600">
                    Question {currentQuestion + 1} of {phq9Questions.length}
                  </p>
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Over the last 2 weeks, how often have you been bothered by:</CardTitle>
              <CardDescription className="text-lg font-medium text-stone-800">
                {phq9Questions[currentQuestion]}
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestion === phq9Questions.length - 1 ? "Complete Assessment" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
