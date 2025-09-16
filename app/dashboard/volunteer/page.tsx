import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, MessageCircle, Flag, Users, Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function VolunteerDashboard() {
  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Volunteer Moderator Dashboard</h1>
          <p className="text-stone-600">SKCT Community Forum - Student Moderator Panel</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Posts Moderated</p>
                  <p className="text-2xl font-bold text-purple-800">18</p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Reports Pending</p>
                  <p className="text-2xl font-bold text-orange-800">5</p>
                </div>
                <Flag className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 bg-teal-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-600 font-medium">Active Threads</p>
                  <p className="text-2xl font-bold text-teal-800">34</p>
                </div>
                <MessageCircle className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-600 font-medium">Community Members</p>
                  <p className="text-2xl font-bold text-emerald-800">287</p>
                </div>
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600" />
                Review Reports
              </CardTitle>
              <CardDescription>Review flagged posts and comments from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Review Queue</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-teal-600" />
                Moderate Forum
              </CardTitle>
              <CardDescription>Monitor and moderate SKCT community discussions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/forum">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Go to Forum</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Urgent Issues
              </CardTitle>
              <CardDescription>Handle urgent community issues requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">View Urgent</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
