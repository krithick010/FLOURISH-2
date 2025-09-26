"use client"

import { useEffect, useState } from 'react'
import { AuthProvider } from './AuthProvider'

interface ClientAuthWrapperProps {
  children: React.ReactNode
}

export default function ClientAuthWrapper({ children }: ClientAuthWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}