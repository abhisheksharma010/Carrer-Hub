"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CalendarDays,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Filter,
  Search,
  Eye,
  MessageSquare,
  Calendar,
} from "lucide-react"

const applications = [
  {
    id: 1,
    company: "Google",
    position: "Senior Software Engineer",
    location: "Mountain View, CA",
    salary: "$150k - $200k",
    appliedDate: "2024-01-15",
    status: "Interview Scheduled",
    stage: "Technical Round",
    progress: 60,
    logo: "/placeholder.svg?height=40&width=40",
    nextStep: "Technical Interview on Jan 25",
    notes: "Hiring manager mentioned focus on system design",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Product Manager",
    location: "Seattle, WA",
    salary: "$130k - $170k",
    appliedDate: "2024-01-10",
    status: "Under Review",
    stage: "HR Screening",
    progress: 30,
    logo: "/placeholder.svg?height=40&width=40",
    nextStep: "Waiting for HR response",
    notes: "Application submitted through referral",
  },
  {
    id: 3,
    company: "Meta",
    position: "Frontend Developer",
    location: "Menlo Park, CA",
    salary: "$140k - $180k",
    appliedDate: "2024-01-08",
    status: "Rejected",
    stage: "Final Interview",
    progress: 90,
    logo: "/placeholder.svg?height=40&width=40",
    nextStep: "Application closed",
    notes: "Strong technical performance, cultural fit concerns",
  },
  {
    id: 4,
    company: "Apple",
    position: "iOS Developer",
    location: "Cupertino, CA",
    salary: "$145k - $185k",
    appliedDate: "2024-01-20",
    status: "Applied",
    stage: "Application Submitted",
    progress: 10,
    logo: "/placeholder.svg?height=40&width=40",
    nextStep: "Waiting for initial review",
    notes: "Applied directly through careers page",
  },
]

const stats = {
  total: 24,
  pending: 8,
  interviews: 5,
  offers: 2,
  rejected: 9,
}

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("list")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Applied":
        return "bg-gray-100 text-gray-800"
      case "Offer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase().includes(statusFilter.toLowerCase())
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">Track your job application progress and status</p>
        </div>
        <Button>
          <CalendarDays className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviews}</div>
            <p className="text-xs text-muted-foreground">Scheduled/Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offers}</div>
            <p className="text-xs text-muted-foreground">Received offers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21%</div>
            <p className="text-xs text-muted-foreground">Interview conversion</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[200px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="list" className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={application.logo || "/placeholder.svg"}
                      alt={`${application.company} logo`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{application.position}</CardTitle>
                      <CardDescription className="text-base font-medium text-foreground">
                        {application.company}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {application.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {application.salary}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    Applied {application.appliedDate}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {application.stage}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span>{application.progress}%</span>
                  </div>
                  <Progress value={application.progress} className="h-2" />
                </div>

                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Next Step:</span> {application.nextStep}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Notes:</span> {application.notes}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Add Note
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      Set Reminder
                    </Button>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="kanban">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Applied", "Under Review", "Interview", "Offer/Rejected"].map((stage) => (
              <Card key={stage}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{stage}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {applications
                    .filter((app) => {
                      if (stage === "Applied") return app.status === "Applied"
                      if (stage === "Under Review") return app.status === "Under Review"
                      if (stage === "Interview") return app.status === "Interview Scheduled"
                      if (stage === "Offer/Rejected") return app.status === "Rejected" || app.status === "Offer"
                      return false
                    })
                    .map((app) => (
                      <Card key={app.id} className="p-3 cursor-pointer hover:shadow-sm">
                        <div className="space-y-2">
                          <div className="font-medium text-sm">{app.position}</div>
                          <div className="text-xs text-muted-foreground">{app.company}</div>
                          <Badge size="sm" className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <CardDescription>Your application journey over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {applications
                  .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
                  .map((app, index) => (
                    <div key={app.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">
                              {app.position} at {app.company}
                            </p>
                            <p className="text-xs text-muted-foreground">Applied on {app.appliedDate}</p>
                          </div>
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        </div>
                        <div className="mt-2">
                          <Progress value={app.progress} className="h-1" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
