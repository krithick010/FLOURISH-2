"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { ArrowLeft, Tag, Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const availableTags = [
  "Stress", "Social", "Academic", "Exams", "Anxiety", "Loneliness", 
  "Resources", "First Year", "Hostel Life", "Career", "Relationships",
  "Study Tips", "Mental Health", "Time Management", "Peer Pressure"
]

const tagColors = {
  Stress: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  Social: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
  Academic: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
  Exams: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  Anxiety: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
  Loneliness: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
  Resources: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  "First Year": "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  "Hostel Life": "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100",
  Career: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
  Relationships: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
  "Study Tips": "bg-lime-50 text-lime-700 border-lime-200 hover:bg-lime-100",
  "Mental Health": "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  "Time Management": "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  "Peer Pressure": "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
}

export default function NewThreadPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag].slice(0, 5) // Max 5 tags
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Generate a mock thread ID
      const threadId = Math.floor(Math.random() * 1000) + 100
      
      // In a real app, you'd send this data to your backend
      const newThread = {
        id: threadId,
        title: title.trim(),
        body: body.trim(),
        tags: selectedTags,
        author: isAnonymous ? `Anonymous_${Math.floor(Math.random() * 1000)}` : "Current User",
        timestamp: new Date(),
        upvotes: 1,
        downvotes: 0,
        comments: []
      }

      console.log("New thread created:", newThread)
      
      // Redirect to the thread view page
      router.push(`/forum/thread/${threadId}`)
    }, 1500)
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/forum"
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Start New Conversation</h1>
              <p className="text-stone-600">Share your thoughts and connect with the SKCT community</p>
            </div>
          </div>

          {/* Guidelines Notice */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Community Guidelines</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Be respectful and supportive of fellow SKCT students</li>
                  <li>• No personal attacks, discrimination, or harmful content</li>
                  <li>• Protect privacy - avoid sharing personal information</li>
                  <li>• Posts are moderated by SKCT counsellors and volunteers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What would you like to discuss? (e.g., 'Feeling overwhelmed with coursework at SKCT')"
                  className="text-lg py-3"
                  maxLength={200}
                  required
                />
                <p className="text-xs text-stone-500 mt-1">{title.length}/200 characters</p>
              </div>

              {/* Body */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Share more details about your situation. What's been on your mind? What kind of support or advice are you looking for?"
                  className="min-h-32 resize-y"
                  maxLength={2000}
                  required
                />
                <p className="text-xs text-stone-500 mt-1">{body.length}/2000 characters</p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Tags <span className="text-stone-500">(optional, max 5)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? "bg-teal-100 text-teal-800 border-teal-300 shadow-sm"
                          : tagColors[tag as keyof typeof tagColors] || "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      <Tag className="w-3 h-3 inline mr-1" />
                      {tag}
                    </button>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-stone-600 mb-2">Selected tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-teal-100 text-teal-800 rounded-full border border-teal-300"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className="ml-2 text-teal-600 hover:text-teal-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Anonymous Option */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded border-stone-300 focus:ring-teal-500"
                  />
                  <span className="text-sm font-medium text-stone-700">
                    Post anonymously (recommended)
                  </span>
                </label>
                <p className="text-xs text-stone-500 mt-1 ml-7">
                  Your identity will be hidden. You'll appear as "Anonymous_XXX" to protect your privacy.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link href="/forum">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!title.trim() || !body.trim() || isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Post Conversation
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
