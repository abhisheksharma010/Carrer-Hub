"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, Edit, Copy, Trash2, Plus, Star, FileText, BarChart3, TrendingUp } from "lucide-react"

interface Resume {
  id: string
  name: string
  version: string
  createdAt: string
  lastModified: string
  status: "active" | "archived" | "draft"
  views: number
  downloads: number
  applications: number
  successRate: number
  template: string
  tags: string[]
  isStarred: boolean
  thumbnail: string
}

const resumes: Resume[] = [
  {
    id: "1",
    name: "Software Engineer Resume",
    version: "v3.2",
    createdAt: "2024-01-10",
    lastModified: "2024-01-15",
    status: "active",
    views: 234,
    downloads: 45,
    applications: 28,
    successRate: 18,
    template: "Modern Tech",
    tags: ["software-engineering", "react", "node.js"],
    isStarred: true,
    thumbnail: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "2",
    name: "Full Stack Developer Resume",
    version: "v2.1",
    createdAt: "2023-12-05",
    lastModified: "2023-12-20",
    status: "archived",
    views: 189,
    downloads: 32,
    applications: 22,
    successRate: 14,
    template: "Clean Professional",
    tags: ["full-stack", "javascript", "python"],
    isStarred: false,
    thumbnail: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "3",
    name: "Senior Developer Resume",
    version: "v1.0",
    createdAt: "2024-01-20",
    lastModified: "2024-01-20",
    status: "draft",
    views: 12,
    downloads: 2,
    applications: 0,
    successRate: 0,
    template: "Executive",
    tags: ["senior-level", "leadership", "architecture"],
    isStarred: false,
    thumbnail: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "4",
    name: "Frontend Specialist Resume",
    version: "v4.0",
    createdAt: "2023-11-15",
    lastModified: "2024-01-08",
    status: "active",
    views: 156,
    downloads: 28,
    applications: 15,
    successRate: 20,
    template: "Creative",
    tags: ["frontend", "react", "ui-ux"],
    isStarred: true,
    thumbnail: "/placeholder.svg?height=300&width=200",
  },
]

export default function ResumeHistoryPage() {
  const [selectedResume, setSelectedResume] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      archived: "bg-gray-100 text-gray-800",
      draft: "bg-yellow-100 text-yellow-800",
    }
    return colors[status as keyof typeof colors]
  }

  const ResumeCard = ({ resume }: { resume: Resume }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-20 bg-gray-100 rounded border overflow-hidden">
              <img
                src={resume.thumbnail || "/placeholder.svg"}
                alt={resume.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-lg">{resume.name}</CardTitle>
                {resume.isStarred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(resume.status)}>{resume.status.toUpperCase()}</Badge>
                <Badge variant="outline">{resume.version}</Badge>
                <Badge variant="outline">{resume.template}</Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {resume.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Created: {new Date(resume.createdAt).toLocaleDateString()}</p>
                <p>Modified: {new Date(resume.lastModified).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{resume.views}</div>
            <div className="text-xs text-muted-foreground">Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{resume.downloads}</div>
            <div className="text-xs text-muted-foreground">Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{resume.applications}</div>
            <div className="text-xs text-muted-foreground">Applications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{resume.successRate}%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">Last used: 3 days ago</div>
        </div>
      </CardContent>
    </Card>
  )

  const stats = [
    {
      title: "Total Resumes",
      value: "12",
      change: "+2 this month",
      icon: FileText,
    },
    {
      title: "Total Views",
      value: "1,234",
      change: "+15% from last month",
      icon: Eye,
    },
    {
      title: "Applications Sent",
      value: "89",
      change: "+23 this month",
      icon: TrendingUp,
    },
    {
      title: "Success Rate",
      value: "16.8%",
      change: "+2.3% improvement",
      icon: BarChart3,
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resume History</h2>
          <p className="text-muted-foreground">Manage and track all versions of your resumes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Resume
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resumes</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {resumes
            .filter((resume) => resume.status === "active")
            .map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          {resumes
            .filter((resume) => resume.status === "archived")
            .map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {resumes
            .filter((resume) => resume.status === "draft")
            .map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
