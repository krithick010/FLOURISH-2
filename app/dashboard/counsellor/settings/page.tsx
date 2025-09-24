"use client"

import { CounselorLayout } from "@/components/counselor/Layout"
import { DashboardCard } from "@/components/counselor/DashboardCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Bell, 
  Shield, 
  Calendar, 
  Mail, 
  Phone,
  Save,
  Upload
} from "lucide-react"

export default function SettingsPage() {
  return (
    <CounselorLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">SKCT Wellness Settings</h1>
          <p className="text-stone-600">Manage your wellness portal preferences and counseling settings</p>
        </div>

        {/* Profile Settings */}
        <DashboardCard title="Profile Information" icon={<User className="w-5 h-5" />}>
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/professional-asian-male-therapist.jpg" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="mb-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-stone-600">JPG, GIF or PNG. Max size of 800KB</p>
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Rachel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Chen" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input id="title" defaultValue="Senior Counselor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue="SKCT Wellness Center" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="rachel.chen@skct.wellness" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+91 98765 43210" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Brief description about your expertise and approach..."
                className="h-24"
                defaultValue="Licensed counselor specializing in anxiety, depression, and stress management. 8+ years of experience in student wellness and mental health support."
              />
            </div>
          </div>
        </DashboardCard>

        {/* Notification Settings */}
        <DashboardCard title="Notification Preferences" icon={<Bell className="w-5 h-5" />}>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifs">Email Notifications</Label>
                  <p className="text-sm text-stone-600">Receive email updates for important events</p>
                </div>
                <Switch id="emailNotifs" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="urgentAlerts">Urgent Case Alerts</Label>
                  <p className="text-sm text-stone-600">Immediate notifications for urgent cases</p>
                </div>
                <Switch id="urgentAlerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sessionReminders">Session Reminders</Label>
                  <p className="text-sm text-stone-600">Reminders for upcoming sessions</p>
                </div>
                <Switch id="sessionReminders" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reportDeadlines">Report Deadlines</Label>
                  <p className="text-sm text-stone-600">Notifications for report due dates</p>
                </div>
                <Switch id="reportDeadlines" defaultChecked />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="reminderTime">Default Reminder Time</Label>
                <Select defaultValue="30min">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15 minutes before</SelectItem>
                    <SelectItem value="30min">30 minutes before</SelectItem>
                    <SelectItem value="1hour">1 hour before</SelectItem>
                    <SelectItem value="2hours">2 hours before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quietHours">Quiet Hours</Label>
                <Select defaultValue="9pm-7am">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No quiet hours</SelectItem>
                    <SelectItem value="9pm-7am">9 PM - 7 AM</SelectItem>
                    <SelectItem value="8pm-8am">8 PM - 8 AM</SelectItem>
                    <SelectItem value="10pm-6am">10 PM - 6 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Schedule Settings */}
        <DashboardCard title="Schedule Preferences" icon={<Calendar className="w-5 h-5" />}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="workingDays">Working Days</Label>
                <Select defaultValue="weekdays">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekdays">Monday - Friday</SelectItem>
                    <SelectItem value="alldays">Monday - Sunday</SelectItem>
                    <SelectItem value="custom">Custom Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionDuration">Default Session Duration</Label>
                <Select defaultValue="45min">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="45min">45 minutes</SelectItem>
                    <SelectItem value="60min">60 minutes</SelectItem>
                    <SelectItem value="90min">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Working Hours Start</Label>
                <Input id="startTime" type="time" defaultValue="09:00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Working Hours End</Label>
                <Input id="endTime" type="time" defaultValue="17:00" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoAccept">Auto-accept Appointments</Label>
                  <p className="text-sm text-stone-600">Automatically accept session requests during available hours</p>
                </div>
                <Switch id="autoAccept" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="bufferTime">Buffer Time Between Sessions</Label>
                  <p className="text-sm text-stone-600">Minimum break time between appointments</p>
                </div>
                <Select defaultValue="15min">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0min">No buffer</SelectItem>
                    <SelectItem value="15min">15 minutes</SelectItem>
                    <SelectItem value="30min">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Privacy & Security */}
        <DashboardCard title="Privacy & Security" icon={<Shield className="w-5 h-5" />}>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <p className="text-sm text-stone-600">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sessionLogs">Session Activity Logs</Label>
                  <p className="text-sm text-stone-600">Keep detailed logs of all counseling sessions</p>
                </div>
                <Switch id="sessionLogs" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataExport">Data Export Rights</Label>
                  <p className="text-sm text-stone-600">Export your data and reports</p>
                </div>
                <Button variant="outline" size="sm">Export Data</Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Save Changes */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel Changes</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </CounselorLayout>
  )
}