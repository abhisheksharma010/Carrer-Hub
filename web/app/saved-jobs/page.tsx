"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, DollarSign, Clock, Search, Bookmark, Heart, Share, ExternalLink, Trash2 } from "lucide-react"

const savedJobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Stripe",
    location: "San Francisco, CA",
    salary: "$160k - $220k",
    type: "Full-time",
    remote: true,
    savedDate: "2024-01-20",
    logo: "/placeholder.svg?height=48&width=48",
    description:
      "Join our payments team to build the future of online commerce. Work with cutting-edge technology and solve complex problems at scale.",
    tags: ["React", "Node.js", "TypeScript", "GraphQL"],
    urgent: true,
    matchScore: 95,
  },
  {
    id: 2,
    title: "Product Manager - AI/ML",
    company: "OpenAI",
    location: "San Francisco, CA",
    salary: "$180k - $250k",
    type: "Full-time",
    remote: false,
    savedDate: "2024-01-18",
    logo: "/placeholder.svg?height=48&width=48",
    description:
      "Lead product strategy for AI-powered tools and help shape the future of artificial intelligence applications.",
    tags: ["AI/ML", "Product Strategy", "Python", "Data Analysis"],
    urgent: false,
    matchScore: 88,
  },
  {
    id: 3,
    title: "Senior iOS Developer",
    company: "Airbnb",
    location: "Remote",
    salary: "$140k - $190k",
    type: "Full-time",
    remote: true,
    savedDate: "2024-01-15",
    logo: "/placeholder.svg?height=48&width=48",
    description:
      "Build beautiful, intuitive mobile experiences for millions of travelers worldwide using Swift and SwiftUI.",
    tags: ["Swift", "SwiftUI", "iOS", "Mobile"],
    urgent: false,
    matchScore: 82,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "GitHub",
    location: "Remote",
    salary: "$130k - $170k",
    type: "Full-time",
    remote: true,
    savedDate: "2024-01-12",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Help maintain and scale the infrastructure that powers millions of developers worldwide.",
    tags: ["AWS", "Kubernetes", "Docker", "CI/CD"],
    urgent: true,
    matchScore: 90,
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Figma",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    type: "Full-time",
    remote: false,
    savedDate: "2024-01-10",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Design intuitive interfaces that empower designers and developers to create amazing products.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    urgent: false,
    matchScore: 75,
  },
]

const categories = [
  { name: "All Jobs", count: savedJobs.length },
  { name: "Remote", count: savedJobs.filter((job) => job.remote).length },
  { name: "Urgent", count: savedJobs.filter((job) => job.urgent).length },
  { name: "High Match", count: savedJobs.filter((job) => job.matchScore >= 85).length },
]

export default function SavedJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activeCategory, setActiveCategory] = useState("All Jobs")

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-blue-100 text-blue-800"
    if (score >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  const filteredJobs = savedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "remote" && job.remote) ||
      (locationFilter === "onsite" && !job.remote)

    const matchesType = typeFilter === "all" || job.type.toLowerCase() === typeFilter.toLowerCase()

    const matchesCategory =
      activeCategory === "All Jobs" ||
      (activeCategory === "Remote" && job.remote) ||
      (activeCategory === "Urgent" && job.urgent) ||
      (activeCategory === "High Match" && job.matchScore >= 85)

    return matchesSearch && matchesLocation && matchesType && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Jobs</h1>
          <p className="text-muted-foreground">Your bookmarked opportunities and dream positions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Find Similar Jobs
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeCategory === category.name
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search saved jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="remote">Remote Only</SelectItem>
            <SelectItem value="onsite">On-site Only</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={job.logo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg line-clamp-1">{job.title}</CardTitle>
                    <CardDescription className="font-medium">{job.company}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {job.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge className={getMatchScoreColor(job.matchScore)}>{job.matchScore}% Match</Badge>
                <span className="text-xs text-muted-foreground">Saved {job.savedDate}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{job.location}</span>
                  {job.remote && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Remote
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{job.type}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

              <div className="flex flex-wrap gap-1">
                {job.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {job.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{job.tags.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm">Apply Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved jobs found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search for different terms</p>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Browse Jobs
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
