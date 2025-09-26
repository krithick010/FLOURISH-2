import type React from "react"
import { Inter, Nunito } from "next/font/google"
import "./globals.css"
import dynamic from 'next/dynamic'
import ErrorBoundary from "@/components/ErrorBoundary"

// Dynamically import the auth wrapper with no SSR
const ClientAuthWrapper = dynamic(() => import("@/components/auth/ClientAuthWrapper"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  )
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
      <body className="font-sans bg-stone-50 text-stone-800 antialiased">
        <ErrorBoundary>
          <ClientAuthWrapper>
            {children}
          </ClientAuthWrapper>
        </ErrorBoundary>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'SKCT Wellness Platform',
  description: 'Mental health and wellness platform for Sri Krishna College of Technology students',
  generator: 'Next.js'
};
