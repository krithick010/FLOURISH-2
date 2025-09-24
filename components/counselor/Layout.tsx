"use client"

import React from 'react'
import { CounselorSidebar } from '@/components/counselor/Sidebar'
import { CounselorNavbar } from '@/components/counselor/Navbar'

interface CounselorLayoutProps {
  children: React.ReactNode
}

export function CounselorLayout({ children }: CounselorLayoutProps) {
  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <CounselorSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <CounselorNavbar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}