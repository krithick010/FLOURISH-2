"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { ArrowLeft, Headphones, Play, Clock, User, Heart, Target, Pause, Sparkles, Volume2, VolumeX, RotateCcw } from "lucide-react"

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
  
  // Personalized meditation states
  const [showPersonalizedForm, setShowPersonalizedForm] = useState(false)
  const [mood, setMood] = useState("")
  const [meditationType, setMeditationType] = useState("")
  const [duration, setDuration] = useState("10")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMeditation, setGeneratedMeditation] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const moods = [
    "Stressed and anxious", "Overwhelmed with studies", "Unable to focus", 
    "Feeling sad or down", "Excited but restless", "Tired and exhausted",
    "Angry or frustrated", "Peaceful and content", "Nervous about exams",
    "Lonely or isolated", "Confident and motivated", "Confused and uncertain"
  ]

  const meditationTypes = [
    "Breathing and relaxation", "Body scan meditation", "Mindfulness meditation",
    "Visualization meditation", "Loving-kindness meditation", "Focus and concentration",
    "Sleep preparation", "Stress relief", "Confidence building",
    "Gratitude meditation", "Energy and motivation", "Exam anxiety relief"
  ]

  const handlePlay = (id: number) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
      // In a real app, you'd start the audio here
    }
  }

  const generatePersonalizedMeditation = async () => {
    if (!mood || !meditationType) {
      alert("Please select both your mood and meditation type")
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/meditation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, meditationType, duration })
      })
      
      const data = await response.json()
      if (data.script) {
        setGeneratedMeditation(data)
        setShowPersonalizedForm(false)
      }
    } catch (error) {
      console.error('Error generating meditation:', error)
      alert('Failed to generate meditation. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const playPersonalizedMeditation = () => {
    if (!generatedMeditation?.script) return

    // Stop any existing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(generatedMeditation.script)
    speechSynthRef.current = utterance

    // Configure speech synthesis
    utterance.rate = playbackSpeed
    utterance.volume = isMuted ? 0 : volume
    utterance.pitch = 0.9
    utterance.lang = 'en-US'

    // Try to use a calm, soothing voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Female') || voice.name.includes('Samantha') || 
      voice.name.includes('Karen') || voice.name.includes('Moira')
    )
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    // Estimate total duration (rough calculation: ~150 words per minute)
    const wordCount = generatedMeditation.script.split(' ').length
    const estimatedDuration = (wordCount / (150 * playbackSpeed)) * 60 // in seconds
    setTotalDuration(estimatedDuration)

    // Handle speech events
    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
      startProgressTracking()
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentPosition(0)
      stopProgressTracking()
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      setIsPlaying(false)
      setIsPaused(false)
      stopProgressTracking()
    }

    window.speechSynthesis.speak(utterance)
  }

  const pausePersonalizedMeditation = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause()
      setIsPaused(true)
      stopProgressTracking()
    }
  }

  const resumePersonalizedMeditation = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      startProgressTracking()
    }
  }

  const stopPersonalizedMeditation = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentPosition(0)
    stopProgressTracking()
  }

  const startProgressTracking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        setCurrentPosition(prev => {
          const newPosition = prev + 1
          return newPosition <= totalDuration ? newPosition : totalDuration
        })
      }
    }, 1000)
  }

  const stopProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (speechSynthRef.current) {
      speechSynthRef.current.volume = isMuted ? volume : 0
    }
  }

  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed)
    if (isPlaying) {
      // Restart with new speed
      const wasPlaying = !isPaused
      stopPersonalizedMeditation()
      setTimeout(() => {
        if (wasPlaying) playPersonalizedMeditation()
      }, 100)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
      stopProgressTracking()
    }
  }, [])

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
          {/* Personalized Meditation Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 rounded-3xl border border-purple-200 p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                  <h2 className="text-3xl font-serif font-bold text-stone-800">Cookie AI Meditation</h2>
                </div>
                <p className="text-stone-600 text-lg">
                  Get a personalized meditation created just for you based on your current mood and needs
                </p>
              </div>

              {!generatedMeditation ? (
                <div className="max-w-2xl mx-auto">
                  <button
                    onClick={() => setShowPersonalizedForm(!showPersonalizedForm)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
                  >
                    <Sparkles className="w-6 h-6" />
                    Create My Personal Meditation
                  </button>

                  {showPersonalizedForm && (
                    <div className="mt-8 space-y-6">
                      <div>
                        <label className="block text-stone-700 font-medium mb-3">How are you feeling right now?</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {moods.map((moodOption) => (
                            <button
                              key={moodOption}
                              onClick={() => setMood(moodOption)}
                              className={`p-3 rounded-xl text-left transition-all duration-200 ${
                                mood === moodOption
                                  ? 'bg-purple-100 border-2 border-purple-500 text-purple-700'
                                  : 'bg-white border border-stone-300 hover:bg-stone-50 text-stone-700'
                              }`}
                            >
                              {moodOption}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-medium mb-3">What kind of meditation would help?</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {meditationTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => setMeditationType(type)}
                              className={`p-3 rounded-xl text-left transition-all duration-200 ${
                                meditationType === type
                                  ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-700'
                                  : 'bg-white border border-stone-300 hover:bg-stone-50 text-stone-700'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-medium mb-3">Duration</label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="5">5 minutes</option>
                          <option value="10">10 minutes</option>
                          <option value="15">15 minutes</option>
                          <option value="20">20 minutes</option>
                        </select>
                      </div>

                      <button
                        onClick={generatePersonalizedMeditation}
                        disabled={isGenerating || !mood || !meditationType}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-stone-400 disabled:to-stone-400 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-3"
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Creating Your Meditation...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Generate My Meditation
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-lg">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold text-stone-800 mb-2">
                        Your Personal Meditation is Ready!
                      </h3>
                      <p className="text-stone-600">
                        {generatedMeditation.duration}-minute {generatedMeditation.meditationType} for when you're feeling {generatedMeditation.mood}
                      </p>
                    </div>

                    {/* Audio Controls */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        {!isPlaying ? (
                          <button
                            onClick={playPersonalizedMeditation}
                            className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                          >
                            <Play className="w-8 h-8 ml-1" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-3">
                            {isPaused ? (
                              <button
                                onClick={resumePersonalizedMeditation}
                                className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all duration-200"
                              >
                                <Play className="w-6 h-6 ml-1" />
                              </button>
                            ) : (
                              <button
                                onClick={pausePersonalizedMeditation}
                                className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all duration-200"
                              >
                                <Pause className="w-6 h-6" />
                              </button>
                            )}
                            <button
                              onClick={stopPersonalizedMeditation}
                              className="w-12 h-12 bg-stone-500 hover:bg-stone-600 text-white rounded-full flex items-center justify-center transition-all duration-200"
                            >
                              <RotateCcw className="w-6 h-6" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {totalDuration > 0 && (
                        <div className="mb-4">
                          <div className="w-full bg-stone-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(currentPosition / totalDuration) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm text-stone-600 mt-2">
                            <span>{formatTime(currentPosition)}</span>
                            <span>{formatTime(totalDuration)}</span>
                          </div>
                        </div>
                      )}

                      {/* Audio Controls */}
                      <div className="flex items-center justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={toggleMute}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-20"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-stone-600">Speed:</span>
                          <select
                            value={playbackSpeed}
                            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                            className="px-2 py-1 border border-stone-300 rounded text-sm"
                          >
                            <option value={0.5}>0.5x</option>
                            <option value={0.75}>0.75x</option>
                            <option value={1}>1x</option>
                            <option value={1.25}>1.25x</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setGeneratedMeditation(null)
                          setShowPersonalizedForm(false)
                          stopPersonalizedMeditation()
                        }}
                        className="px-6 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
                      >
                        Create New Meditation
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

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
