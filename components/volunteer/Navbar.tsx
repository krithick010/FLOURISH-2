"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, User, LogOut, Settings, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/auth/AuthProvider'

export function VolunteerNavbar() {
  const { user, logout } = useAuth()
  
  return (
    <nav className="bg-white border-b border-stone-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-stone-800">SKCT Wellness</h1>
            <p className="text-xs text-stone-500">Volunteer Portal</p>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {/* Direct Logout Button - for testing */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500"></Badge>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-sm">
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'VL'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-stone-800">
                    {user?.name || 'Volunteer'}
                  </p>
                  <p className="text-xs text-stone-500 capitalize">{user?.role || 'volunteer'}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}