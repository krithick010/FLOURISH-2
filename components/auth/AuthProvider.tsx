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

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  loading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Track if component is mounted on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only run on client after mount
    if (!isMounted) return

    try {
      // Check if user is logged in (from localStorage)
      const savedUser = localStorage.getItem('skct-user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error('Error reading localStorage:', error)
      localStorage.removeItem('skct-user')
    }
    setLoading(false)
  }, [isMounted])

  useEffect(() => {
    // Only run redirect logic on client after mount and load
    if (!isMounted || loading) return

    const isAuthPage = pathname.startsWith('/auth/')
    const isPublicPage = pathname === '/' || pathname.startsWith('/wellness-hub') || pathname.startsWith('/counselors') || pathname.startsWith('/forum')
    
    if (!user && !isAuthPage && !isPublicPage) {
      // Not logged in and trying to access protected route
      router.push('/auth/login')
    } else if (user && isAuthPage) {
      // Already logged in but on auth page, redirect to dashboard
      router.push(`/dashboard/${user.role}`)
    }
  }, [user, loading, pathname, router, isMounted])

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    if (!isMounted) return false
    
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
      try {
        localStorage.setItem('skct-user', JSON.stringify(userData))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
      setLoading(false)
      return true
    }
    
    setLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    if (isMounted) {
      try {
        localStorage.removeItem('skct-user')
      } catch (error) {
        console.error('Error removing from localStorage:', error)
      }
    }
    router.push('/auth/login')
  }

  // Don't render children until mounted on client
  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  // Since we now provide default values in createContext, this should be safe
  const context = useContext(AuthContext)
  return context
}

// Safe auth hook that works during SSR
export function useSafeAuth() {
  return useAuth()
}