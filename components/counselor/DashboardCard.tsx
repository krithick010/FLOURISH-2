"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'

interface DashboardCardProps {
  title: string
  description?: string
  value?: string | number
  icon?: React.ReactNode
  action?: {
    label: string
    onClick?: () => void
    variant?: "default" | "secondary" | "outline"
  }
  variant?: "default" | "blue" | "emerald" | "amber" | "rose" | "teal"
  className?: string
  children?: React.ReactNode
}

const variantStyles = {
  default: "border-stone-200 bg-white",
  blue: "border-blue-200 bg-blue-50",
  emerald: "border-emerald-200 bg-emerald-50", 
  amber: "border-amber-200 bg-amber-50",
  rose: "border-rose-200 bg-rose-50",
  teal: "border-teal-200 bg-teal-50"
}

const textStyles = {
  default: "text-stone-800",
  blue: "text-blue-800",
  emerald: "text-emerald-800",
  amber: "text-amber-800", 
  rose: "text-rose-800",
  teal: "text-teal-800"
}

const iconStyles = {
  default: "text-stone-600",
  blue: "text-blue-600",
  emerald: "text-emerald-600",
  amber: "text-amber-600",
  rose: "text-rose-600", 
  teal: "text-teal-600"
}

export function DashboardCard({
  title,
  description,
  value,
  icon,
  action,
  variant = "default",
  className,
  children
}: DashboardCardProps) {
  return (
    <Card className={cn(
      "hover:shadow-lg transition-shadow",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className={iconStyles[variant]}>{icon}</span>}
            <span className={cn("text-base", textStyles[variant])}>{title}</span>
          </div>
          {value && (
            <span className={cn("text-2xl font-bold", textStyles[variant])}>
              {value}
            </span>
          )}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      {(children || action) && (
        <CardContent className="pt-0">
          {children}
          {action && (
            <Button
              variant={action.variant || "default"}
              onClick={action.onClick}
              className="w-full"
            >
              {action.label}
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}