"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'counsellor' | 'volunteer'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('skct-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Redirect logic
    if (!loading) {
      const isAuthPage = pathname.startsWith('/auth/')
      const isPublicPage = pathname === '/' || pathname.startsWith('/wellness-hub') || pathname.startsWith('/counselors') || pathname.startsWith('/forum')
      
      if (!user && !isAuthPage && !isPublicPage) {
        // Not logged in and trying to access protected route
        router.push('/auth/login')
      } else if (user && isAuthPage) {
        // Already logged in but on auth page, redirect to dashboard
        router.push(`/dashboard/${user.role}`)
      }
    }
  }, [user, loading, pathname, router])

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setLoading(true)
    
    // Mock authentication - in real app, this would call your API
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    if (password === 'password123') { // Simple mock validation
      const userData: User = {
        id: '1',
        name: role === 'counsellor' ? 'Dr. Sarah Johnson' : role === 'student' ? 'John Doe' : 'Jane Smith',
        email: email,
        role: role as 'student' | 'counsellor' | 'volunteer'
      }
      
      setUser(userData)
      localStorage.setItem('skct-user', JSON.stringify(userData))
      setLoading(false)
      return true
    }
    
    setLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('skct-user')
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}