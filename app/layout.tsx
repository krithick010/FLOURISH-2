import type React from "react"
import { Inter, Nunito } from "next/font/google"
import "./globals.css"

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
      <body className="font-sans bg-stone-50 text-stone-800 antialiased">{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
