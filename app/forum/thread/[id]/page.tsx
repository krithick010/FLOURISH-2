"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { 
  ArrowLeft, 
  ChevronUp, 
  ChevronDown, 
  MessageCircle, 
  Clock, 
  Tag, 
  Flag, 
  Send,
  Shield,
  Pin,
  Edit,
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

// Mock data - in a real app, this would come from your backend
const mockThreads = {
  "123": {
    id: 123,
    title: "Struggling to balance classes and social life at SKCT",
    body: "I feel like I can never find the right balance between keeping up with my coursework and maintaining friendships. Anyone else from SKCT going through this? I'm in my second year and it's getting harder to manage everything. Sometimes I feel like I have to choose between studying and having a social life, which makes me feel isolated. Any advice on time management or just general support would be really appreciated.",
    author: "Anonymous_Lion",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    tags: ["Stress", "Social", "Academic"],
    upvotes: 24,
    downvotes: 2,
    isPinned: false,
    comments: [
      {
        id: 1,
        author: "SupportiveSenior",
        isCounsellor: false,
        isVolunteer: true,
        content: "I totally understand! My second year at SKCT was the hardest for this exact reason. What helped me was setting specific 'social hours' and 'study hours' during the week. Also, try studying with friends sometimes - it combines both! The library group study rooms are great for this.",
        upvotes: 8,
        downvotes: 0,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        replies: [
          {
            id: 2,
            author: "Anonymous_Lion",
            content: "Thank you so much for this advice! I'll definitely try the study group approach. Do you know how to book those group study rooms?",
            upvotes: 3,
            downvotes: 0,
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          }
        ]
      },
      {
        id: 3,
        author: "Dr. Priya Sharma",
        isCounsellor: true,
        isVolunteer: false,
        content: "This is a very common concern among SKCT students, and it's completely normal to feel this way. The transition between academic years can be challenging. I'd recommend scheduling a one-on-one session with our counseling team to discuss personalized strategies. You can book through the student portal or visit our office in Block A. Remember, asking for help is a sign of strength, not weakness.",
        upvotes: 15,
        downvotes: 0,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        replies: []
      },
      {
        id: 4,
        author: "Anonymous_Fox",
        content: "I'm going through the exact same thing! It's reassuring to know I'm not alone. Maybe we could form a study group?",
        upvotes: 5,
        downvotes: 0,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        replies: []
      }
    ]
  }
}

const tagColors = {
  Stress: "bg-amber-50 text-amber-700 border-amber-200",
  Social: "bg-rose-50 text-rose-700 border-rose-200",
  Academic: "bg-teal-50 text-teal-700 border-teal-200",
  Exams: "bg-blue-50 text-blue-700 border-blue-200",
  Anxiety: "bg-purple-50 text-purple-700 border-purple-200",
  Loneliness: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Resources: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "First Year": "bg-orange-50 text-orange-700 border-orange-200",
}

export default function ThreadViewPage() {
  const params = useParams()
  const router = useRouter()
  const threadId = params.id as string
  
  const [thread, setThread] = useState<any>(null)
  const [newComment, setNewComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [userRole, setUserRole] = useState<"student" | "volunteer" | "counsellor">("student")
  const [threadVote, setThreadVote] = useState<"up" | "down" | null>(null)
  const [commentVotes, setCommentVotes] = useState<{[key: number]: "up" | "down" | null}>({})

  useEffect(() => {
    // In a real app, fetch thread data from API
    const mockThread = mockThreads[threadId as keyof typeof mockThreads]
    if (mockThread) {
      setThread(mockThread)
    } else {
      // Generate a placeholder thread for new posts
      setThread({
        id: parseInt(threadId),
        title: "Your New Thread",
        body: "Thread content loading...",
        author: "Anonymous_User",
        timestamp: new Date(),
        tags: [],
        upvotes: 1,
        downvotes: 0,
        isPinned: false,
        comments: []
      })
    }
  }, [threadId])

  const handleVote = (type: "up" | "down", isThread: boolean = true, commentId?: number) => {
    if (isThread) {
      const newVote = threadVote === type ? null : type
      setThreadVote(newVote)
      
      if (thread) {
        setThread({
          ...thread,
          upvotes: thread.upvotes + (newVote === "up" ? 1 : newVote === null && threadVote === "up" ? -1 : 0),
          downvotes: thread.downvotes + (newVote === "down" ? 1 : newVote === null && threadVote === "down" ? -1 : 0)
        })
      }
    } else if (commentId) {
      const newVote = commentVotes[commentId] === type ? null : type
      setCommentVotes(prev => ({ ...prev, [commentId]: newVote }))
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !thread) return

    setIsSubmittingComment(true)

    // Simulate API call
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        author: userRole === "counsellor" ? "Dr. Sarah Wilson" : 
                userRole === "volunteer" ? "SKCT Volunteer" : 
                `Anonymous_${Math.floor(Math.random() * 1000)}`,
        isCounsellor: userRole === "counsellor",
        isVolunteer: userRole === "volunteer",
        content: newComment.trim(),
        upvotes: 1,
        downvotes: 0,
        timestamp: new Date(),
        replies: []
      }

      setThread({
        ...thread,
        comments: [...thread.comments, comment]
      })

      setNewComment("")
      setIsSubmittingComment(false)
    }, 1000)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  if (!thread) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-stone-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-stone-200 rounded w-1/2 mb-8"></div>
              <div className="h-32 bg-stone-200 rounded"></div>
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
              <h1 className="text-sm font-medium text-stone-500">SKCT Community Forum</h1>
              <p className="text-stone-700">Discussion Thread</p>
            </div>
          </div>

          {/* Main Thread */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex gap-6">
                {/* Voting */}
                <div className="flex flex-col items-center gap-2 pt-1">
                  <button 
                    onClick={() => handleVote("up")}
                    className={`p-2 rounded-lg transition-colors ${
                      threadVote === "up" 
                        ? "bg-teal-100 text-teal-600" 
                        : "hover:bg-teal-50 text-stone-500 hover:text-teal-600"
                    }`}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-semibold text-stone-700">
                    {thread.upvotes - thread.downvotes}
                  </span>
                  <button 
                    onClick={() => handleVote("down")}
                    className={`p-2 rounded-lg transition-colors ${
                      threadVote === "down" 
                        ? "bg-rose-100 text-rose-600" 
                        : "hover:bg-rose-50 text-stone-500 hover:text-rose-600"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      {thread.isPinned && (
                        <div className="flex items-center gap-2 mb-2">
                          <Pin className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-emerald-600">Pinned by moderator</span>
                        </div>
                      )}
                      <h1 className="text-2xl font-bold text-stone-800 mb-3 leading-tight">
                        {thread.title}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
                        <span>by {thread.author}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTimeAgo(thread.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {thread.comments.length} comments
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                      <Flag className="w-4 h-4 text-stone-400 hover:text-rose-500" />
                    </button>
                  </div>

                  {/* Tags */}
                  {thread.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {thread.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 text-sm font-medium rounded-full border ${
                            tagColors[tag as keyof typeof tagColors] || "bg-stone-50 text-stone-700 border-stone-200"
                          }`}
                        >
                          <Tag className="w-3 h-3 inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Thread Body */}
                  <div className="prose prose-stone max-w-none mb-6">
                    <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                      {thread.body}
                    </p>
                  </div>

                  {/* Moderation Controls */}
                  {(userRole === "volunteer" || userRole === "counsellor") && (
                    <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs text-rose-600">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Pin className="w-3 h-3 mr-1" />
                        {thread.isPinned ? "Unpin" : "Pin"}
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Moderate
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <h2 className="text-xl font-semibold text-stone-800">
                Comments ({thread.comments.length})
              </h2>
            </div>

            {/* Add Comment Form */}
            <div className="p-6 border-b border-stone-100 bg-stone-50">
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Add a comment
                  </label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts, advice, or support..."
                    className="min-h-24 resize-y"
                    disabled={isSubmittingComment}
                  />
                </div>
                
                {/* Role selector for demo purposes */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-stone-600">Post as:</label>
                    <select 
                      value={userRole} 
                      onChange={(e) => setUserRole(e.target.value as any)}
                      className="text-sm border border-stone-300 rounded px-2 py-1"
                    >
                      <option value="student">Student (Anonymous)</option>
                      <option value="volunteer">SKCT Volunteer</option>
                      <option value="counsellor">SKCT Counsellor</option>
                    </select>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={!newComment.trim() || isSubmittingComment}
                    className="bg-teal-600 hover:bg-teal-700 ml-auto"
                  >
                    {isSubmittingComment ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Post Comment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Comments List */}
            <div className="divide-y divide-stone-100">
              {thread.comments.map((comment: any) => (
                <div key={comment.id} className="p-6">
                  <div className="flex gap-4">
                    {/* Comment Voting */}
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={() => handleVote("up", false, comment.id)}
                        className={`p-1 rounded transition-colors ${
                          commentVotes[comment.id] === "up"
                            ? "bg-teal-100 text-teal-600"
                            : "hover:bg-teal-50 text-stone-400 hover:text-teal-600"
                        }`}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium text-stone-600">
                        {comment.upvotes - comment.downvotes}
                      </span>
                      <button 
                        onClick={() => handleVote("down", false, comment.id)}
                        className={`p-1 rounded transition-colors ${
                          commentVotes[comment.id] === "down"
                            ? "bg-rose-100 text-rose-600"
                            : "hover:bg-rose-50 text-stone-400 hover:text-rose-600"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-stone-700">{comment.author}</span>
                        
                        {/* Counsellor Badge */}
                        {comment.isCounsellor && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full border border-green-200">
                            <Shield className="w-3 h-3 inline mr-1" />
                            SKCT Counsellor
                          </span>
                        )}
                        
                        {/* Volunteer Badge */}
                        {comment.isVolunteer && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                            SKCT Volunteer
                          </span>
                        )}
                        
                        <span className="text-sm text-stone-500">{formatTimeAgo(comment.timestamp)}</span>
                      </div>
                      
                      <div className={`p-4 rounded-xl ${
                        comment.isCounsellor 
                          ? "bg-green-50 border border-green-200" 
                          : comment.isVolunteer
                          ? "bg-blue-50 border border-blue-200"
                          : "bg-stone-50"
                      }`}>
                        <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>

                      {/* Reply Button */}
                      <button className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium">
                        Reply
                      </button>

                      {/* Nested Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-stone-200 space-y-4">
                          {comment.replies.map((reply: any) => (
                            <div key={reply.id} className="bg-stone-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-stone-700">{reply.author}</span>
                                <span className="text-sm text-stone-500">{formatTimeAgo(reply.timestamp)}</span>
                              </div>
                              <p className="text-stone-700 text-sm leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {thread.comments.length === 0 && (
              <div className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-stone-500 mb-2">No comments yet</h3>
                <p className="text-stone-400">Be the first to share your thoughts and support!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
