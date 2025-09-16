"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { ArrowLeft, BookOpen, Clock, User, Star, Heart, Target } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "Managing Academic Stress at SKCT",
    description: "Evidence-based strategies to handle coursework pressure and maintain balance during your studies at Sri Krishna College of Technology.",
    content: "Academic stress is a common experience for SKCT students, but it doesn't have to overwhelm you. This comprehensive guide covers practical techniques for managing workload, setting realistic goals, and maintaining your mental health throughout your academic journey...",
    author: "Dr. Priya Sharma",
    readTime: "8 min read",
    category: "Stress Management",
    publishDate: "2025-09-10",
    isNew: true,
    image: "/city-street-with-bridge.jpg"
  },
  {
    id: 2,
    title: "Building Resilience in College",
    description: "Learn how to bounce back from setbacks and develop emotional strength during your time at SKCT.",
    content: "Resilience is not about avoiding difficult situations, but rather developing the skills to navigate them effectively. For SKCT students, building resilience can mean the difference between thriving and merely surviving college life...",
    author: "SKCT Counseling Team",
    readTime: "6 min read",
    category: "Personal Growth",
    publishDate: "2025-09-08",
    isNew: false,
    image: "/mountain-landscape-peaceful.jpg"
  },
  {
    id: 3,
    title: "Study-Life Balance for Engineering Students",
    description: "Specific strategies for engineering students at SKCT to maintain balance between rigorous academics and personal wellbeing.",
    content: "Engineering programs at SKCT are demanding, but that doesn't mean you have to sacrifice your wellbeing. This article explores time management techniques, stress reduction methods, and self-care practices tailored specifically for engineering students...",
    author: "Prof. Rajesh Kumar",
    readTime: "10 min read",
    category: "Academic Balance",
    publishDate: "2025-09-05",
    isNew: false,
    image: "/professional-woman-therapist.png"
  }
]

export default function ArticlesPage() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle)
    if (!article) return null

    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-teal-50">
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>
              <div>
                <Link href="/wellness-hub" className="text-sm text-teal-600 hover:text-teal-700">
                  Wellness Hub
                </Link>
                <span className="text-stone-400 mx-2">/</span>
                <Link href="/wellness-hub/articles" className="text-sm text-teal-600 hover:text-teal-700">
                  Articles
                </Link>
              </div>
            </div>

            <article className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                </div>

                <h1 className="text-3xl font-serif font-bold text-stone-800 mb-4">
                  {article.title}
                </h1>

                <p className="text-lg text-stone-600 leading-relaxed mb-6">
                  {article.description}
                </p>

                <div className="prose prose-stone max-w-none">
                  <p className="leading-relaxed">{article.content}</p>
                  
                  <div className="mt-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
                    <h3 className="font-semibold text-teal-800 mb-2">Need More Support?</h3>
                    <p className="text-teal-700 text-sm">
                      If you're struggling with any of the topics discussed in this article, 
                      please don't hesitate to reach out to the SKCT Counseling Center. 
                      We're here to provide personalized support for your wellness journey.
                    </p>
                    <Link href="/counselors" className="inline-block mt-3 text-teal-600 hover:text-teal-700 font-medium text-sm">
                      Connect with a Counselor →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gradient-to-br from-stone-50 via-white to-teal-50">
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white py-6 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <Link href="/wellness-hub">
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                <h1 className="text-2xl font-serif font-bold">Wellness Articles</h1>
              </div>
            </div>
            <p className="text-teal-100">
              In-depth guides and insights for your mental health and wellbeing journey at SKCT
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-600" />
              Featured Articles for SKCT Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedArticle(article.id)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {article.isNew && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                      New
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-200">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-stone-800 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <Heart className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Coming Soon</h3>
              <p className="text-stone-600">
                More articles are being curated by our SKCT wellness team. 
                Check back soon for new content!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
