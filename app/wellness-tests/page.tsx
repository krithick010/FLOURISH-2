import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Heart, ArrowRight, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function WellnessTestsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-3">SKCT Wellness Assessments</h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Take these confidential assessments to better understand your mental health and get personalized
              recommendations from Sri Krishna College of Technology wellness services.
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Your Privacy Matters</h3>
                <p className="text-stone-600 leading-relaxed">
                  These assessments are completely confidential and designed to help you understand your wellbeing.
                  Results are for your personal insight and can be shared with SKCT counselors if you choose.
                </p>
              </div>
            </div>
          </div>

          {/* Assessment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PHQ-9 Assessment */}
            <Card className="hover:shadow-lg transition-shadow border-stone-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-serif">PHQ-9 Depression Screening</CardTitle>
                    <CardDescription className="text-stone-600">Patient Health Questionnaire - 9 items</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-stone-600 leading-relaxed">
                  A widely-used screening tool that helps identify symptoms of depression. This 9-question assessment
                  takes about 5 minutes and provides insights into your mood and emotional wellbeing.
                </p>

                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />5 minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />9 questions
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/wellness-tests/phq9">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3">
                      Take PHQ-9 Assessment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* GHQ-9 Assessment */}
            <Card className="hover:shadow-lg transition-shadow border-stone-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-serif">GHQ-9 General Health</CardTitle>
                    <CardDescription className="text-stone-600">General Health Questionnaire - 9 items</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-stone-600 leading-relaxed">
                  A comprehensive screening tool for general psychological wellbeing and mental health. This assessment
                  helps identify overall stress levels and psychological distress.
                </p>

                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />5 minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />9 questions
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/wellness-tests/ghq9">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl py-3">
                      Take GHQ-9 Assessment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-8">
            <h3 className="text-xl font-serif font-semibold text-stone-800 mb-4">
              What happens after I complete an assessment?
            </h3>
            <div className="space-y-4 text-stone-600">
              <p>
                After completing an assessment, you'll receive personalized insights and recommendations based on your
                responses. These may include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Self-care strategies and coping techniques</li>
                <li>Campus resources available at SKCT</li>
                <li>Recommendations for professional support if needed</li>
                <li>Follow-up assessment suggestions</li>
              </ul>
              <p className="pt-4 text-sm text-stone-500">
                Remember: These assessments are screening tools, not diagnostic instruments. For professional evaluation
                and treatment, please contact SKCT counseling services.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
