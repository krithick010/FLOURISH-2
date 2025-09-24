"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Settings,
  Calendar
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard/counsellor',
    icon: LayoutDashboard,
  },
  {
    name: 'Students',
    href: '/dashboard/counsellor/students',
    icon: Users,
  },
  {
    name: 'Messages',
    href: '/dashboard/counsellor/messages',
    icon: MessageSquare,
  },
  {
    name: 'Schedule',
    href: '/dashboard/counsellor/schedule',
    icon: Calendar,
  },
  {
    name: 'Reports',
    href: '/dashboard/counsellor/reports',
    icon: FileText,
  },
  {
    name: 'Analytics',
    href: '/dashboard/counsellor/analytics',
    icon: TrendingUp,
  },
  {
    name: 'Settings',
    href: '/dashboard/counsellor/settings',
    icon: Settings,
  },
]

export function CounselorSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-stone-200 h-full">
      <div className="p-6 border-b border-stone-200">
        <h2 className="text-xl font-serif font-bold text-stone-800">SKCT Wellness</h2>
        <p className="text-sm text-stone-600 mt-1">Counselor Portal</p>
      </div>
      
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}