"use client"

import { useState } from "react"
import { CounselorLayout } from "@/components/counselor/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Search, Phone, Video, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock chat data
const conversations = [
  {
    id: "anon-12345",
    lastMessage: "Thank you for the session today, it really helped.",
    timestamp: "2 min ago",
    unread: 0,
    status: "active"
  },
  {
    id: "anon-67890", 
    lastMessage: "I'm feeling anxious about my upcoming exams...",
    timestamp: "1 hour ago",
    unread: 3,
    status: "urgent"
  },
  {
    id: "anon-45123",
    lastMessage: "Could we schedule another appointment?",
    timestamp: "3 hours ago", 
    unread: 1,
    status: "active"
  },
  {
    id: "anon-78901",
    lastMessage: "The breathing exercises are working well.",
    timestamp: "1 day ago",
    unread: 0,
    status: "active"
  },
  {
    id: "anon-34567",
    lastMessage: "I'd like to discuss something personal.",
    timestamp: "2 days ago",
    unread: 2,
    status: "pending"
  }
]

const messages = [
  {
    id: 1,
    sender: "student",
    content: "Hi Dr. Rachel, I hope you're doing well. I wanted to follow up on our last session.",
    timestamp: "10:30 AM"
  },
  {
    id: 2, 
    sender: "counselor",
    content: "Hello! I'm glad to hear from you. How have you been feeling since our last conversation?",
    timestamp: "10:32 AM"
  },
  {
    id: 3,
    sender: "student", 
    content: "I've been practicing the mindfulness techniques you taught me, and they're really helping with my anxiety.",
    timestamp: "10:35 AM"
  },
  {
    id: 4,
    sender: "counselor",
    content: "That's wonderful to hear! I'm proud of your commitment to the exercises. Have you noticed any specific situations where they work best?",
    timestamp: "10:37 AM"
  },
  {
    id: 5,
    sender: "student",
    content: "Especially before presentations and exams. The breathing exercise helps me stay calm and focused.",
    timestamp: "10:40 AM"
  },
  {
    id: 6,
    sender: "counselor",
    content: "Excellent! You're building great coping skills. Would you like to schedule a follow-up session to discuss your progress further?",
    timestamp: "10:42 AM"
  }
]

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState("anon-12345")
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <CounselorLayout>
      <div className="max-w-7xl mx-auto h-[calc(100vh-140px)]">
        <div className="flex h-full bg-white rounded-lg border border-stone-200 overflow-hidden">
          {/* Chat List Sidebar */}
          <div className="w-80 border-r border-stone-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-stone-200">
              <h2 className="text-lg font-semibold text-stone-800 mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations List */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-2",
                      selectedChat === conv.id 
                        ? "bg-blue-50 border border-blue-200" 
                        : "hover:bg-stone-50"
                    )}
                  >
                    <Avatar>
                      <AvatarFallback className="bg-stone-200 text-stone-600">
                        {conv.id.slice(-2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-stone-800 text-sm">{conv.id}</h3>
                        <span className="text-xs text-stone-500">{conv.timestamp}</span>
                      </div>
                      <p className="text-sm text-stone-600 truncate">{conv.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge 
                          variant={conv.status === "urgent" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {conv.status}
                        </Badge>
                        {conv.unread > 0 && (
                          <Badge variant="default" className="bg-blue-600 text-xs">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-stone-200 text-stone-600">
                    {selectedChat.slice(-2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-stone-800">{selectedChat}</h3>
                  <p className="text-sm text-stone-600">Active 2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "counselor" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] p-3 rounded-2xl",
                        message.sender === "counselor"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-stone-100 text-stone-800 rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        message.sender === "counselor" ? "text-blue-100" : "text-stone-500"
                      )}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CounselorLayout>
  )
}