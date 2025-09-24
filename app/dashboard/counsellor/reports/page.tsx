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
import { 
  Search, 
  MoreVertical, 
  Download, 
  Eye, 
  CheckCircle, 
  FileText,
  AlertCircle,
  Clock
} from "lucide-react"

// Mock reports data
const reports = [
  {
    id: "RPT-001",
    studentId: "anon-12345",
    title: "Weekly Progress Assessment",
    type: "Progress Report",
    status: "Completed",
    submittedDate: "2025-09-20",
    dueDate: "2025-09-22",
    priority: "Normal"
  },
  {
    id: "RPT-002", 
    studentId: "anon-67890",
    title: "Crisis Intervention Summary",
    type: "Incident Report", 
    status: "Under Review",
    submittedDate: "2025-09-22",
    dueDate: "2025-09-24",
    priority: "High"
  },
  {
    id: "RPT-003",
    studentId: "anon-45123", 
    title: "Therapy Session Notes",
    type: "Session Report",
    status: "Pending Approval",
    submittedDate: "2025-09-23",
    dueDate: "2025-09-25",
    priority: "Normal"
  },
  {
    id: "RPT-004",
    studentId: "anon-78901",
    title: "Mental Health Evaluation",
    type: "Assessment Report",
    status: "Draft",
    submittedDate: null,
    dueDate: "2025-09-26",
    priority: "Normal"
  },
  {
    id: "RPT-005",
    studentId: "anon-34567",
    title: "Follow-up Recommendations", 
    type: "Follow-up Report",
    status: "Overdue",
    submittedDate: null,
    dueDate: "2025-09-20",
    priority: "High"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge variant="default" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Completed</Badge>
    case "Under Review":
      return <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Under Review</Badge>
    case "Pending Approval":
      return <Badge variant="default" className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>
    case "Draft":
      return <Badge variant="secondary">Draft</Badge>
    case "Overdue":
      return <Badge variant="destructive">Overdue</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "High":
      return <Badge variant="destructive">High</Badge>
    case "Normal":
      return <Badge variant="default" className="bg-stone-100 text-stone-700 hover:bg-stone-100">Normal</Badge>
    case "Low":
      return <Badge variant="secondary">Low</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

export default function ReportsPage() {
  return (
    <CounselorLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Wellness Reports & Documentation</h1>
            <p className="text-stone-600">Manage student wellness assessments and progress reports</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Reports"
            value="45"
            icon={<FileText className="w-6 h-6" />}
            variant="blue"
          />
          <DashboardCard
            title="Pending Approval"
            value="8"
            icon={<Clock className="w-6 h-6" />}
            variant="amber"
          />
          <DashboardCard
            title="Overdue"
            value="3"
            icon={<AlertCircle className="w-6 h-6" />}
            variant="rose"
          />
          <DashboardCard
            title="Completed This Week"
            value="12"
            icon={<CheckCircle className="w-6 h-6" />}
            variant="emerald"
          />
        </div>

        {/* Reports Table */}
        <DashboardCard title="Reports Overview">
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                <Input
                  placeholder="Search reports..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter by Status</Button>
              <Button variant="outline">Filter by Type</Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-stone-50">
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.studentId}</TableCell>
                      <TableCell className="max-w-xs truncate">{report.title}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                      <TableCell className="text-stone-600">
                        {new Date(report.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit Report
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Create Assessment Report"
            description="Generate comprehensive student assessment"
            action={{
              label: "Create Report",
              variant: "default"
            }}
          />
          
          <DashboardCard
            title="Session Documentation"
            description="Document individual or group session notes"
            action={{
              label: "Add Notes",
              variant: "default"
            }}
          />

          <DashboardCard
            title="Export Analytics"
            description="Generate wellness analytics and trends report"
            action={{
              label: "Export Data",
              variant: "outline"
            }}
          />
        </div>
      </div>
    </CounselorLayout>
  )
}