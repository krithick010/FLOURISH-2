"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, Users, Calendar, MessageCircle, Sparkles, TestTube, Menu, X, LogIn } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

// Custom Bot icon with animation
const BotIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <path className="animate-pulse" d="M12 2v6" />
    <path d="M8 14h.01M16 14h.01" />
    <path className="animate-pulse" d="M9 18h6" />
  </svg>
)

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Wellness Tests", href: "/wellness-tests", icon: TestTube },
  { name: "Wellness Hub", href: "/wellness-hub", icon: Heart },
  { name: "Talk to Our Chatbots", href: "/chatbots", icon: BotIcon },
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
            const isChatbots = item.name === "Talk to Our Chatbots"
            
            if (isChatbots) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700 shadow-sm border border-emerald-200"
                      : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-emerald-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative">
                    <item.icon className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                  </div>
                  <span>{item.name}</span>
                  {!isActive && <span className="ml-auto text-xs bg-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded-full">New</span>}
                </Link>
              )
            }
            
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
