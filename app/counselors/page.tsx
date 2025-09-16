"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import { Sparkles, Mail, Phone, MapPin } from "lucide-react"

const counselors = [
  {
    id: 1,
    name: "Dr. Anya Sharma",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Stress Management", "Relationships"],
    experience: "Over 10 years of experience",
    approach:
      "Dr. Sharma uses a cognitive-behavioral approach to help students navigate academic and personal challenges.",
    email: "anya.sharma@wellness.edu",
    phone: "+1 (555) 123-4567",
    location: "Wellness Center, Room 101",
    avatar: "/professional-woman-therapist.png",
  },
  {
    id: 2,
    name: "Michael Chen, LPC",
    title: "Licensed Professional Counselor",
    specialties: ["Depression", "Grief", "Life Transitions"],
    experience: "Compassionate and person-centered",
    approach:
      "Michael provides a compassionate and person-centered space for students to explore their feelings and develop coping mechanisms.",
    email: "michael.chen@wellness.edu",
    phone: "+1 (555) 234-5678",
    location: "Wellness Center, Room 102",
    avatar: "/professional-asian-male-therapist.jpg",
  },
]

export default function CounselorsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-3">Find Your Perfect Match</h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Connect with professionals who understand your journey and can provide the support you need.
            </p>
          </div>

          {/* AI Recommendations Section */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-teal-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-stone-800 mb-2">Get Personalized Recommendations</h3>
                <p className="text-stone-600 mb-4 leading-relaxed">
                  Tell us what you're looking for, and we'll suggest counselors who might be a good fit. This is
                  completely confidential and optional.
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-stone-700 mb-2">What brings you here today?</label>
                  <textarea
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., I'm looking for someone who specializes in anxiety related to exams, or I want to talk to someone about feeling lonely on campus..."
                    className="w-full p-4 border border-stone-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-stone-700 placeholder-stone-400"
                    rows={3}
                  />
                </div>

                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                  Find My Matches
                </button>
              </div>
            </div>
          </div>

          {/* Counselors Grid */}
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-semibold text-stone-800 mb-6">Our Counselors</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {counselors.map((counselor) => (
                <div
                  key={counselor.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={counselor.avatar || "/placeholder.svg"}
                      alt={counselor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-stone-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-stone-800 mb-1">{counselor.name}</h3>
                      <p className="text-stone-600 text-sm mb-2">{counselor.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {counselor.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-200"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{counselor.approach}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Mail className="w-4 h-4" />
                      {counselor.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Phone className="w-4 h-4" />
                      {counselor.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <MapPin className="w-4 h-4" />
                      {counselor.location}
                    </div>
                  </div>

                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                    Schedule a Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
