"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const chatbots = [
  {
    id: "cookie",
    name: "Cookie",
    role: "Supportive Friend",
    description: "Cookie is warm, empathetic, and supportive. She's here to listen and provide emotional support like a caring friend.",
    avatar: "/images/chatbots/cookie-avatar.svg",
    personality: "Warm & Nurturing",
    speciality: "Emotional Support",
    color: "from-amber-300 to-amber-500"
  },
  {
    id: "sage",
    name: "Sage",
    role: "Wellness Expert",
    description: "Sage offers evidence-based wellness advice and practical strategies to improve your mental health and wellbeing.",
    avatar: "/images/chatbots/sage-avatar.svg",
    personality: "Knowledgeable & Practical",
    speciality: "Wellness Strategies",
    color: "from-emerald-300 to-emerald-600"
  },
  {
    id: "nova",
    name: "Nova",
    role: "Motivational Coach",
    description: "Nova is energetic and motivating, helping you set goals and find inspiration when you're feeling stuck.",
    avatar: "/images/chatbots/nova-avatar.svg",
    personality: "Energetic & Inspiring",
    speciality: "Motivation & Goal Setting",
    color: "from-violet-300 to-purple-600"
  },
  {
    id: "zen",
    name: "Zen",
    role: "Mindfulness Guide",
    description: "Zen is calm and peaceful, guiding you through mindfulness exercises and helping you find inner peace.",
    avatar: "/images/chatbots/zen-avatar.svg",
    personality: "Calm & Contemplative",
    speciality: "Mindfulness & Meditation",
    color: "from-blue-300 to-sky-500"
  }
]

export default function ChatbotsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-semibold text-stone-800 mb-2">We Are Here To Talk</h1>
          <p className="text-stone-600 mb-8">
            Choose a chatbot to talk with based on what kind of support you're looking for today.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chatbots.map((bot) => (
              <Card key={bot.id} className="overflow-hidden border-stone-200 hover:shadow-md transition-shadow">
                <div className={`h-2 bg-gradient-to-r ${bot.color}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-100 relative">
                      <Image 
                        src={bot.avatar} 
                        alt={`${bot.name} avatar`} 
                        width={64} 
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif">{bot.name}</CardTitle>
                      <CardDescription className="text-sm">{bot.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 text-sm">{bot.description}</p>
                  <div className="mt-4 flex gap-2">
                    <div className="bg-stone-100 rounded-full px-3 py-1 text-xs text-stone-700">
                      {bot.personality}
                    </div>
                    <div className="bg-stone-100 rounded-full px-3 py-1 text-xs text-stone-700">
                      {bot.speciality}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/chatbots/${bot.id}`} className="w-full">
                    <Button className="w-full bg-stone-800 hover:bg-stone-700">
                      Talk to {bot.name}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}