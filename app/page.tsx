import Sidebar from "@/components/sidebar"
import { MessageCircle, Heart, Users, Bot, ArrowRight, TestTube, Calendar } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8">
        <div className="relative bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-6 lg:p-8 mb-8 overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-800 mb-4 text-balance">
              Welcome to SKCT Wellness Hub
            </h1>
            <p className="text-base lg:text-lg text-stone-600 mb-6 leading-relaxed">
              Your personal space for mental wellbeing and growth at Sri Krishna College of Technology. We're here to
              support you on your journey, one step at a time.
            </p>
            <Link
              href="/wellness-tests"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Take a Wellness Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
            <div className="w-full h-full bg-gradient-to-l from-teal-200 to-transparent rounded-2xl"></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl lg:text-2xl font-serif font-semibold text-stone-800 mb-6">
            How can we support you today?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Link href="/wellness-tests" className="group">
              <div className="bg-white rounded-xl p-4 lg:p-6 border border-stone-200 hover:border-teal-300 hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                  <TestTube className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Wellness Tests</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  Take PHQ-9 and GHQ-9 assessments to understand your mental health.
                </p>
                <div className="flex items-center text-teal-600 text-sm font-medium">
                  Take Assessment
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link href="/chatbot" className="group">
              <div className="bg-white rounded-xl p-4 lg:p-6 border border-stone-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <Bot className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">AI Assistant</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  Get personalized support and guidance available 24/7.
                </p>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  Start Chatting
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link href="/wellness-hub" className="group">
              <div className="bg-white rounded-xl p-4 lg:p-6 border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <Heart className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Wellness Hub</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  Explore curated resources to support your mental wellbeing.
                </p>
                <div className="flex items-center text-amber-600 text-sm font-medium">
                  Explore Resources
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link href="/counselors" className="group">
              <div className="bg-white rounded-xl p-4 lg:p-6 border border-stone-200 hover:border-rose-300 hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
                  <Users className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">SKCT Counselors</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  Connect with certified counselors available on campus.
                </p>
                <div className="flex items-center text-rose-600 text-sm font-medium">
                  Find Counselor
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link href="/appointments" className="group">
              <div className="bg-white rounded-xl p-4 lg:p-6 border border-stone-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Book Session</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  Schedule appointments with SKCT wellness professionals.
                </p>
                <div className="flex items-center text-purple-600 text-sm font-medium">
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link href="/forum" className="group">
              <div className="bg-white rounded-xl p-4 lg:p-6 border border-stone-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <MessageCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Community Forum</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  Connect with fellow SKCT students in a safe space.
                </p>
                <div className="flex items-center text-indigo-600 text-sm font-medium">
                  Join Community
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 lg:p-8">
          <h3 className="text-xl font-serif font-semibold text-stone-800 mb-4">About SKCT Wellness Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-600">
            <div>
              <h4 className="font-semibold text-stone-800 mb-2">On-Campus Support</h4>
              <p className="text-sm leading-relaxed">
                All counseling services are available right here at Sri Krishna College of Technology campus. Our
                professional counselors understand the unique challenges faced by SKCT students.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-stone-800 mb-2">Confidential & Safe</h4>
              <p className="text-sm leading-relaxed">
                Your privacy is our priority. All interactions, assessments, and counseling sessions are completely
                confidential and conducted in a safe, supportive environment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
