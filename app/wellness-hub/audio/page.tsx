"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { ArrowLeft, Headphones, Play, Clock, User, Heart, Target, Pause } from "lucide-react"

const audioContent = [
  {
    id: 1,
    title: "5-Minute Stress Relief Meditation",
    description: "A quick guided meditation perfect for between classes or study sessions at SKCT.",
    duration: "5:32",
    category: "Meditation",
    instructor: "Dr. Meera Patel",
    difficulty: "Beginner",
    image: "/mountain-landscape-peaceful.jpg",
    audioUrl: "/audio/stress-relief.mp3" // placeholder
  },
  {
    id: 2,
    title: "Focus and Concentration for Students",
    description: "Improve your ability to concentrate during lectures and study sessions with this guided practice.",
    duration: "8:15",
    category: "Focus",
    instructor: "SKCT Wellness Team",
    difficulty: "Intermediate",
    image: "/city-street-with-bridge.jpg",
    audioUrl: "/audio/focus.mp3" // placeholder
  },
  {
    id: 3,
    title: "Sleep Preparation for Better Rest",
    description: "Wind down after a long day of classes with this calming bedtime meditation.",
    duration: "12:20",
    category: "Sleep",
    instructor: "Prof. Ananya Singh",
    difficulty: "Beginner",
    image: "/professional-woman-therapist.png",
    audioUrl: "/audio/sleep.mp3" // placeholder
  }
]

export default function AudioPage() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(0)

  const handlePlay = (id: number) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
      // In a real app, you'd start the audio here
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white py-6 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <Link href="/wellness-hub">
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <Headphones className="w-6 h-6" />
                <h1 className="text-2xl font-serif font-bold">Audio Content</h1>
              </div>
            </div>
            <p className="text-emerald-100">
              Guided meditations, podcasts, and relaxing audio designed for SKCT students
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Featured Audio Sessions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audioContent.map((audio) => (
              <div
                key={audio.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={audio.image}
                    alt={audio.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button
                      onClick={() => handlePlay(audio.id)}
                      className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    >
                      {playingId === audio.id ? (
                        <Pause className="w-8 h-8 text-emerald-600" />
                      ) : (
                        <Play className="w-8 h-8 text-emerald-600 ml-1" />
                      )}
                    </button>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                    {audio.duration}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                      {audio.category}
                    </span>
                    <span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">
                      {audio.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-stone-800 mb-3 group-hover:text-emerald-700 transition-colors">
                    {audio.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {audio.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {audio.instructor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {audio.duration}
                    </div>
                  </div>

                  {/* Audio Progress Bar (Mock) */}
                  {playingId === audio.id && (
                    <div className="mb-4">
                      <div className="w-full bg-stone-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: '30%' }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-stone-500 mt-1">
                        <span>1:45</span>
                        <span>{audio.duration}</span>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => handlePlay(audio.id)}
                    className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-700 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-emerald-200"
                  >
                    {playingId === audio.id ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Play
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-12">
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
              <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Audio Content Coming Soon</h3>
              <p className="text-stone-600 mb-4">
                Our team is currently recording high-quality guided meditations and wellness content 
                specifically for SKCT students. Check back soon!
              </p>
              <p className="text-sm text-stone-500">
                For now, these are preview samples. Full audio content will be available in the next update.
              </p>
            </div>
          </div>

          {/* Audio Player Controls (Global - Mock) */}
          {playingId && (
            <div className="fixed bottom-6 left-6 right-6 bg-white border border-stone-200 rounded-2xl p-4 shadow-lg backdrop-blur-md z-50">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-800">
                      {audioContent.find(a => a.id === playingId)?.title}
                    </h4>
                    <p className="text-sm text-stone-500">
                      {audioContent.find(a => a.id === playingId)?.instructor}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setPlayingId(null)}
                      className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                      <Pause className="w-5 h-5 text-stone-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
