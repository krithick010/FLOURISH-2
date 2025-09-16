"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, Users, Calendar, MessageCircle, Sparkles, Bot, TestTube, Menu, X, LogIn } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Wellness Tests", href: "/wellness-tests", icon: TestTube },
  { name: "Cookie", href: "/chatbot", icon: Bot },
  { name: "Wellness Hub", href: "/wellness-hub", icon: Heart },
  { name: "Find a Counselor", href: "/counselors", icon: Users },
  { name: "Book Appointment", href: "/appointments", icon: Calendar },
  { name: "Community Forum", href: "/forum", icon: MessageCircle },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-semibold text-stone-800">SKCT Wellness</h1>
            <p className="text-xs text-stone-600">Sri Krishna College of Technology</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-teal-50 text-teal-700 shadow-sm"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-800"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-sage-50 border border-sage-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-stone-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-stone-600">Guest</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-800">Welcome!</p>
              <p className="text-xs text-stone-500">Browsing as guest</p>
            </div>
          </div>
          <Link href="/auth/login">
            <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 text-xs">
              <LogIn className="w-3 h-3 mr-2" />
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white/90 backdrop-blur-sm"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white/80 backdrop-blur-sm border-r border-stone-200 min-h-screen relative">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-sm border-r border-stone-200 z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  )
}
