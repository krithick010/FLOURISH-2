import type React from "react"
import { Inter, Nunito } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/AuthProvider"
import ClientOnly from "@/components/ClientOnly"
import ErrorBoundary from "@/components/ErrorBoundary"

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
          <ClientOnly fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p>Loading...</p>
              </div>
            </div>
          }>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ClientOnly>
        </ErrorBoundary>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
