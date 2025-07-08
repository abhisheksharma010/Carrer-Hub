import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, DollarSign, Clock, Building2, Bookmark, ExternalLink, Filter, Star, Users } from "lucide-react"

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      logo: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      type: "Full-time",
      remote: true,
      urgent: false,
      posted: "2 days ago",
      description: "We're looking for a senior frontend developer to join our growing team...",
      tags: ["React", "TypeScript", "Next.js", "Remote"],
      applicants: 45,
      match: 95,
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "InnovateLabs",
      logo: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
      salary: "$100k - $140k",
      type: "Full-time",
      remote: false,
      urgent: true,
      posted: "1 day ago",
      description: "Join our innovative team building the next generation of web applications...",
      tags: ["Node.js", "React", "PostgreSQL", "AWS"],
      applicants: 23,
      match: 88,
    },
    {
      id: 3,
      title: "React Developer",
      company: "StartupXYZ",
      logo: "/placeholder.svg?height=40&width=40",
      location: "Austin, TX",
      salary: "$90k - $120k",
      type: "Full-time",
      remote: true,
      urgent: false,
      posted: "3 days ago",
      description: "Looking for a passionate React developer to help build our product...",
      tags: ["React", "JavaScript", "Redux", "Remote"],
      applicants: 67,
      match: 82,
    },
    {
      id: 4,
      title: "Frontend Engineer",
      company: "CloudTech",
      logo: "/placeholder.svg?height=40&width=40",
      location: "Seattle, WA",
      salary: "$110k - $150k",
      type: "Full-time",
      remote: true,
      urgent: false,
      posted: "5 days ago",
      description: "We're seeking a frontend engineer to work on our cloud platform...",
      tags: ["Vue.js", "TypeScript", "Docker", "Remote"],
      applicants: 34,
      match: 76,
    },
  ]

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Jobs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Find Your Next Opportunity</CardTitle>
            <CardDescription>Search through thousands of job listings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Keywords</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="search" placeholder="Job title, skills, or company" className="pl-10" />
                </div>
              </div>
              <div className="w-48">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="location" placeholder="City, state, or remote" className="pl-10" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Salary Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50k">$0 - $50k</SelectItem>
                    <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                    <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                    <SelectItem value="150k+">$150k+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label>Experience Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead/Principal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label>Work Mode</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label>Date Posted</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="3d">Last 3 days</SelectItem>
                    <SelectItem value="7d">Last week</SelectItem>
                    <SelectItem value="30d">Last month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Clear All</Button>
                <Button>Search Jobs</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">1,247 jobs found</h2>
            <p className="text-sm text-muted-foreground">Sorted by relevance</p>
          </div>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by Relevance</SelectItem>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="salary">Sort by Salary</SelectItem>
              <SelectItem value="company">Sort by Company</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                      <AvatarFallback>{job.company[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        {job.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {job.match}% match
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                          {job.remote && (
                            <Badge variant="outline" className="ml-1 text-xs">
                              Remote
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.posted}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      <div className="flex items-center gap-2">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {job.applicants} applicants
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          4.5 company rating
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm">Apply Now</Button>
                    <Button size="sm" variant="outline">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline">Load More Jobs</Button>
        </div>
      </div>
    </SidebarInset>
  )
}
