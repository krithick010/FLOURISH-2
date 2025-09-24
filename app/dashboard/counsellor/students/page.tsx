"use client"

import { CounselorLayout } from "@/components/counselor/Layout"
import { DashboardCard } from "@/components/counselor/DashboardCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, AlertTriangle, CheckCircle, Users } from "lucide-react"

// Mock student data
const students = [
  {
    id: "anon-12345",
    status: "Active",
    lastActive: "2 hours ago",
    sessions: 5,
    riskLevel: "Low"
  },
  {
    id: "anon-67890", 
    status: "Under Review",
    lastActive: "1 day ago",
    sessions: 12,
    riskLevel: "Medium"
  },
  {
    id: "anon-45123",
    status: "Urgent",
    lastActive: "30 minutes ago", 
    sessions: 8,
    riskLevel: "High"
  },
  {
    id: "anon-78901",
    status: "Active",
    lastActive: "3 hours ago",
    sessions: 3,
    riskLevel: "Low"
  },
  {
    id: "anon-34567",
    status: "Inactive",
    lastActive: "1 week ago",
    sessions: 15,
    riskLevel: "Low"
  },
  {
    id: "anon-89012",
    status: "Under Review",
    lastActive: "6 hours ago",
    sessions: 7,
    riskLevel: "Medium"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge variant="default" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active</Badge>
    case "Under Review":
      return <Badge variant="default" className="bg-amber-100 text-amber-700 hover:bg-amber-100">Under Review</Badge>
    case "Urgent":
      return <Badge variant="destructive">Urgent</Badge>
    case "Inactive":
      return <Badge variant="secondary">Inactive</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case "Low":
      return <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Low</Badge>
    case "Medium":
      return <Badge variant="default" className="bg-amber-100 text-amber-700 hover:bg-amber-100">Medium</Badge>
    case "High":
      return <Badge variant="destructive">High</Badge>
    default:
      return <Badge variant="outline">{risk}</Badge>
  }
}

export default function StudentsPage() {
  return (
    <CounselorLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Student Wellness Management</h1>
            <p className="text-stone-600">Monitor and support student mental health & wellbeing</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Users className="w-4 h-4 mr-2" />
            Add New Student
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Students"
            value="42"
            variant="blue"
          />
          <DashboardCard
            title="Active Cases"
            value="28"
            variant="emerald"
          />
          <DashboardCard
            title="Under Review"
            value="12"
            variant="amber"
          />
          <DashboardCard
            title="Urgent Cases"
            value="2"
            variant="rose"
          />
        </div>

        {/* Students Table */}
        <DashboardCard title="Student Directory">
          <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Anonymous ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Sessions</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id} className="hover:bg-stone-50">
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>{getRiskBadge(student.riskLevel)}</TableCell>
                      <TableCell>{student.sessions}</TableCell>
                      <TableCell className="text-stone-600">{student.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                              Mark as Resolved
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AlertTriangle className="w-4 h-4 mr-2 text-amber-600" />
                              Mark as Urgent
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Send Message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DashboardCard>
      </div>
    </CounselorLayout>
  )
}