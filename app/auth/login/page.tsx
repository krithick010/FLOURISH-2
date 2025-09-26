"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/AuthProvider"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!role) {
      alert("Please select your role")
      return
    }
    
    const success = await login(email, password, role)
    if (success) {
      // AuthProvider will handle the redirect
    } else {
      alert("Invalid credentials. Use password: password123")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-stone-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* SKCT Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-stone-800">SKCT Wellness</h1>
              <p className="text-sm text-stone-600">Sri Krishna College of Technology</p>
            </div>
          </div>
          <p className="text-stone-600">Welcome back to your wellness community</p>
        </div>

        <Card className="border-stone-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-serif text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Access your SKCT wellness dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="rounded-xl border-stone-300">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="counsellor">Counsellor (Staff)</SelectItem>
                    <SelectItem value="volunteer">Volunteer (Student Moderator)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@skct.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-stone-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-stone-300"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 rounded-xl py-3 font-medium"
                disabled={!role}
              >
                Sign In to SKCT Wellness
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-stone-600">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-stone-500 hover:text-stone-700">
                Continue as guest
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
