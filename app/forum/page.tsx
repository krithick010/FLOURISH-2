"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import {
  Plus,
  MessageCircle,
  Clock,
  Tag,
  Users,
  ChevronUp,
  ChevronDown,
  Flag,
  Edit,
  Trash2,
  Pin,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const forumThreads = [
  {
    id: 1,
    title: "Struggling to balance classes and social life at SKCT",
    author: "Anonymous_Lion",
    tags: ["Stress", "Social", "Academic"],
    replies: 12,
    upvotes: 24,
    downvotes: 2,
    lastPost: "5 hours ago",
    isPinned: false,
    preview:
      "I feel like I can never find the right balance between keeping up with my coursework and maintaining friendships. Anyone else from SKCT going through this?",
    hasCounsellorResponse: true,
    comments: [],
  },
  {
    id: 2,
    title: "Tips for dealing with exam anxiety? (SKCT specific resources)",
    author: "User_291",
    tags: ["Exams", "Anxiety", "Resources"],
    replies: 25,
    upvotes: 45,
    downvotes: 1,
    lastPost: "1 day ago",
    isPinned: true,
    preview:
      "Every time exam season comes around, I get so anxious that I can barely focus on studying. Does SKCT have any specific resources for this?",
    hasCounsellorResponse: true,
    comments: [],
  },
  {
    id: 3,
    title: "Feeling lonely and homesick - first year at SKCT",
    author: "Anonymous_Fox",
    tags: ["Loneliness", "First Year"],
    replies: 8,
    upvotes: 18,
    downvotes: 0,
    lastPost: "2 days ago",
    isPinned: false,
    preview:
      "This is my first year at Sri Krishna College of Technology and I'm really struggling with feeling isolated. Anyone else going through this?",
    hasCounsellorResponse: false,
    comments: [],
  },
  {
    id: 4,
    title: "Study group for Computer Science students?",
    author: "StudyBuddy22",
    tags: ["Academic", "Study Tips"],
    replies: 15,
    upvotes: 32,
    downvotes: 0,
    lastPost: "3 days ago",
    isPinned: false,
    preview:
      "Looking to form a study group for CS subjects. Anyone interested in meeting regularly at the library?",
    hasCounsellorResponse: false,
    comments: [],
  },
  {
    id: 5,
    title: "Managing time between studies and part-time work",
    author: "Anonymous_Eagle",
    tags: ["Time Management", "Stress"],
    replies: 7,
    upvotes: 19,
    downvotes: 1,
    lastPost: "4 days ago",
    isPinned: false,
    preview:
      "I'm working part-time to support my studies but finding it really hard to manage time. Any advice from fellow SKCT students?",
    hasCounsellorResponse: true,
    comments: [],
  },
]

const tagColors = {
  Stress: "bg-amber-50 text-amber-700 border-amber-200",
  Social: "bg-rose-50 text-rose-700 border-rose-200",
  Exams: "bg-blue-50 text-blue-700 border-blue-200",
  Anxiety: "bg-purple-50 text-purple-700 border-purple-200",
  Loneliness: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Resources: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Academic: "bg-teal-50 text-teal-700 border-teal-200",
  "First Year": "bg-orange-50 text-orange-700 border-orange-200",
  "Study Tips": "bg-lime-50 text-lime-700 border-lime-200",
  "Time Management": "bg-yellow-50 text-yellow-700 border-yellow-200",
}

export default function ForumPage() {
  const [userRole, setUserRole] = useState<"student" | "volunteer" | "counsellor">("student") // Mock user role

  const ThreadComponent = ({ thread }: { thread: any }) => (
    <div className="p-6 hover:bg-stone-50 transition-colors duration-150">
      <div className="flex gap-4">
        {/* Voting */}
        <div className="flex flex-col items-center gap-1 pt-1">
          <button className="p-1 hover:bg-teal-100 rounded transition-colors">
            <ChevronUp className="w-4 h-4 text-stone-500 hover:text-teal-600" />
          </button>
          <span className="text-sm font-medium text-stone-700">{thread.upvotes - thread.downvotes}</span>
          <button className="p-1 hover:bg-rose-100 rounded transition-colors">
            <ChevronDown className="w-4 h-4 text-stone-500 hover:text-rose-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {thread.isPinned && <Pin className="w-4 h-4 text-emerald-600" />}
                <Link href={`/forum/thread/${thread.id}`}>
                  <h3 className="text-lg font-medium text-stone-800 hover:text-teal-700 transition-colors cursor-pointer">
                    {thread.title}
                  </h3>
                </Link>
              </div>
              <p className="text-stone-600 text-sm mb-3 leading-relaxed">{thread.preview}</p>
              <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                <span>by {thread.author}</span>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {thread.replies} replies
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {thread.lastPost}
                </div>
                {thread.hasCounsellorResponse && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                    <Shield className="w-3 h-3" />
                    <span className="text-xs font-medium">Counsellor replied</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {thread.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${
                      tagColors[tag as keyof typeof tagColors] || "bg-stone-50 text-stone-700 border-stone-200"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Moderation Controls (for volunteers and counsellors) */}
              {(userRole === "volunteer" || userRole === "counsellor") && (
                <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs text-rose-600 hover:text-rose-700 bg-transparent"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <Pin className="w-3 h-3 mr-1" />
                    {thread.isPinned ? "Unpin" : "Pin"}
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <Shield className="w-3 h-3 mr-1" />
                    Moderate
                  </Button>
                </div>
              )}
            </div>

            {/* Report Button */}
            <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
              <Flag className="w-4 h-4 text-stone-400 hover:text-rose-500" />
            </button>
          </div>

          {/* Show "View Discussion" link instead of expandable comments */}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <Link 
              href={`/forum/thread/${thread.id}`}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
            >
              <MessageCircle className="w-4 h-4" />
              View discussion and comments →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-stone-800 mb-3">SKCT Community Forum</h1>
              <p className="text-lg text-stone-600 leading-relaxed">
                A safe and supportive space for Sri Krishna College of Technology students to share experiences and
                connect with peers.
              </p>
            </div>
            <Link href="/forum/new">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Start New Conversation
              </button>
            </Link>
          </div>

          {/* Community Guidelines */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Welcome to the SKCT Community</h3>
                <p className="text-stone-600 leading-relaxed">
                  This is your official Sri Krishna College of Technology wellness forum. All posts are anonymous by
                  default unless you choose otherwise. Please be kind and respectful. Our student volunteers and
                  counsellors moderate this space to ensure it remains safe for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Discussion Threads */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-stone-800">Recent Conversations</h2>
                {(userRole === "volunteer" || userRole === "counsellor") && (
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Shield className="w-4 h-4" />
                    Moderator View
                  </div>
                )}
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {forumThreads.map((thread) => (
                <ThreadComponent key={thread.id} thread={thread} />
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Popular Topics at SKCT</h3>
            <div className="flex flex-wrap gap-3">
              {Object.keys(tagColors).map((tag) => (
                <button
                  key={tag}
                  className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 hover:shadow-sm ${
                    tagColors[tag as keyof typeof tagColors]
                  }`}
                >
                  <Tag className="w-3 h-3 inline mr-2" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
