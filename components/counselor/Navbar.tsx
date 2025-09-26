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
import { Bell, User, LogOut, Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/auth/AuthProvider'

export function CounselorNavbar() {
  const { user, logout } = useAuth()
  
  return (
    <div className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-stone-800">SKCT Wellness Portal</h1>
        <p className="text-sm text-stone-600">Student Mental Health & Wellness Management</p>
      </div>
      
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
          <Bell className="w-5 h-5" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
          >
            3
          </Badge>
        </Button>
        
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-stone-100 rounded-lg">
              <Avatar className="w-8 h-8 border-2 border-teal-200">
                <AvatarImage src="/professional-asian-male-therapist.jpg" />
                <AvatarFallback className="bg-teal-100 text-teal-700 font-medium">
                  {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'DR'}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-stone-800">
                  {user?.name || 'Dr. Counselor'}
                </p>
                <p className="text-xs text-stone-600 capitalize">
                  {user?.role || 'counsellor'}
                </p>
              </div>
              <div className="text-stone-400 ml-1">
                ▼
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" sideOffset={5}>
            <div className="p-2">
              <div className="text-sm font-medium text-stone-700">
                {user?.name || 'Dr. Counselor'}
              </div>
              <div className="text-xs text-stone-500">
                {user?.email || 'counselor@skctwellness.edu'}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 hover:bg-red-50 font-medium cursor-pointer" 
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}