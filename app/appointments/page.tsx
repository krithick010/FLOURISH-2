"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import { Filter, MapPin, Clock, Calendar, Video, User } from "lucide-react"

const counselors = [
  {
    id: 1,
    name: "Dr. Anya Sharma",
    specialties: ["Anxiety", "Stress Management", "Relationships"],
    description:
      "With over 10 years of experience, Dr. Sharma uses a cognitive-behavioral approach to help students navigate academic and personal challenges.",
    location: "Wellness Center, Room 101",
    sessionTypes: ["In-Person", "Virtual"],
    nextAvailable: [
      { day: "Monday", time: "09:00" },
      { day: "Tuesday", time: "09:00" },
      { day: "Wednesday", time: "10:00" },
    ],
    avatar: "/professional-woman-therapist.png",
  },
  {
    id: 2,
    name: "Michael Chen, LPC",
    specialties: ["Depression", "Grief", "Life Transitions"],
    description:
      "Michael provides a compassionate and person-centered space for students to explore their feelings and develop coping mechanisms.",
    location: "Wellness Center, Room 102",
    sessionTypes: ["In-Person", "Virtual"],
    nextAvailable: [
      { day: "Monday", time: "10:00" },
      { day: "Tuesday", time: "09:00" },
      { day: "Wednesday", time: "09:00" },
    ],
    avatar: "/professional-asian-male-therapist.jpg",
  },
  {
    id: 3,
    name: "Dr. Imani Adebayo",
    specialties: ["Trauma", "Cultural Identity", "Anxiety"],
    description:
      "Dr. Adebayo specializes in culturally-sensitive therapy and trauma-informed care, creating a safe environment for healing.",
    location: "Wellness Center, Room 103",
    sessionTypes: ["In-Person", "Virtual"],
    nextAvailable: [
      { day: "Monday", time: "13:00" },
      { day: "Tuesday", time: "09:00" },
      { day: "Wednesday", time: "09:00" },
    ],
    avatar: "/placeholder.svg?key=imani",
  },
  {
    id: 4,
    name: "David Lee, LCSW",
    specialties: ["Stress Management", "ADHD", "Academic Success"],
    description:
      "David focuses on practical strategies to help students with executive functioning, time management, and reducing academic stress.",
    location: "Wellness Center, Room 104",
    sessionTypes: ["In-Person", "Virtual"],
    nextAvailable: [
      { day: "Monday", time: "09:00" },
      { day: "Tuesday", time: "10:00" },
      { day: "Wednesday", time: "09:00" },
    ],
    avatar: "/placeholder.svg?key=david",
  },
]

export default function AppointmentsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All Specializations")

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-3">Book Your Session</h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Schedule a session with our mental health professionals. Choose what works best for you.
            </p>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-stone-600" />
                <span className="font-medium text-stone-700">Filter by specialty:</span>
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-stone-700"
              >
                <option>All Specializations</option>
                <option>Anxiety</option>
                <option>Depression</option>
                <option>Stress Management</option>
                <option>Relationships</option>
                <option>Trauma</option>
                <option>ADHD</option>
              </select>
            </div>
          </div>

          {/* Counselors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {counselors.map((counselor) => (
              <div
                key={counselor.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={counselor.avatar || "/placeholder.svg"}
                      alt={counselor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-stone-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-stone-800 mb-1">{counselor.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
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

                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{counselor.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <MapPin className="w-4 h-4" />
                      {counselor.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <Video className="w-4 h-4" />
                      </div>
                      {counselor.sessionTypes.join(", ")}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-stone-600" />
                      <span className="text-sm font-medium text-stone-700">Next Available:</span>
                    </div>
                    <div className="flex gap-2">
                      {counselor.nextAvailable.map((slot, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-center"
                        >
                          <div className="font-medium text-stone-800">{slot.day}</div>
                          <div className="text-stone-600">{slot.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
