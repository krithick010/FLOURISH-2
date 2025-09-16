"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import { Send, Bot, User, RefreshCw, Heart, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
  isError?: boolean
}

const initialMessages: Message[] = [
  {
    id: 1,
    content:
      "Hello! I'm Cookie 🍪, your friendly AI mental health companion at Sri Krishna College of Technology. I'm here to provide support, instant coping strategies, and connect you with the right resources. Whether you're feeling stressed, anxious, or just need someone to talk to, I'm here 24/7. How can I support you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

// Quick action buttons for common mental health needs
const quickActions = [
  {
    icon: <Heart className="w-4 h-4" />,
    text: "I'm feeling overwhelmed",
    message: "I'm feeling really overwhelmed with everything right now. Can you help me with some coping strategies?"
  },
  {
    icon: <MessageCircle className="w-4 h-4" />,
    text: "Need someone to talk to",
    message: "I need someone to talk to about what I'm going through. I'm not sure where to start."
  },
  {
    icon: <Phone className="w-4 h-4" />,
    text: "Connect with counselor",
    message: "I think I need to speak with a professional counselor. Can you help me connect with SKCT counseling services?"
  }
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessageToAI = async (messageContent: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling AI API:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again, or feel free to reach out to SKCT counseling services directly for immediate support. Your mental health is important, and help is always available.";
    }
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue;
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const aiResponse = await sendMessageToAI(content);
      
      const botResponse: Message = {
        id: Date.now() + 1,
        content: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      const errorResponse: Message = {
        id: Date.now() + 1,
        content: "I apologize, but I'm experiencing technical difficulties. Please contact SKCT counseling services directly for immediate support. Your wellbeing is my priority.",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSendMessage()
  }

  const handleQuickAction = async (action: typeof quickActions[0]) => {
    await handleSendMessage(action.message)
  }

  const handleNewConversation = () => {
    setMessages(initialMessages)
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-stone-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">🍪</span>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-stone-800">Cookie</h1>
                <p className="text-stone-600">Your AI mental health companion • Powered by Gemini AI</p>
              </div>
            </div>
            <Button
              onClick={handleNewConversation}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <RefreshCw className="w-4 h-4" />
              New Conversation
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-stone-50 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🍪</span>
                  </div>
                )}

                <div
                  className={`max-w-2xl p-4 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-teal-600 text-white ml-12"
                      : "bg-white border border-stone-200 text-stone-800 mr-12"
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.sender === "user" ? "text-teal-100" : "text-stone-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {message.sender === "user" && (
                  <div className="w-10 h-10 bg-stone-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-stone-600" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🍪</span>
                </div>
                <div className="bg-white border border-stone-200 p-4 rounded-2xl mr-12">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-stone-500">Cookie is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Buttons - Show only when no messages except initial */}
            {messages.length === 1 && !isTyping && (
              <div className="space-y-4">
                <p className="text-center text-stone-600 font-medium">Quick ways I can help:</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-2 bg-white hover:bg-teal-50 border-teal-200 text-teal-700 hover:text-teal-800"
                    >
                      {action.icon}
                      {action.text}
                    </Button>
                  ))}
                </div>
                <div className="text-center">
                  <Link href="/counselors" className="text-teal-600 hover:text-teal-700 text-sm underline">
                    Or browse SKCT counselors directly
                  </Link>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-stone-200 p-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleFormSubmit} className="flex gap-4">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Share what's on your mind... I'm here to listen and help."
                className="flex-1 rounded-xl border-stone-300 py-3 px-4 text-base"
                disabled={isTyping}
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>

            {/* Disclaimer and Emergency Contacts */}
            <div className="space-y-2">
              <p className="text-xs text-stone-500 text-center">
                Cookie provides AI-powered mental health support. For urgent concerns, please contact professional services immediately.
              </p>
              <div className="flex justify-center gap-4 text-xs">
                <span className="text-red-600 font-medium">Emergency: 112</span>
                <span className="text-teal-600 font-medium">SKCT Counseling: Available 24/7</span>
                <span className="text-blue-600 font-medium">Crisis Line: 022 2754 6669</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
