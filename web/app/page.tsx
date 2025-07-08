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
import { Progress } from "@/components/ui/progress"
import { Briefcase, Calendar, Eye, Star, Users, MessageSquare, FileText, MapPin, ArrowRight } from "lucide-react"

export default function Dashboard() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"

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
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Greeting Section */}
        <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">{greeting}, Alex! 👋</h1>
          <p className="mt-2 text-blue-100">You have 3 new job matches and 2 interview invitations waiting for you.</p>
          <div className="mt-4 flex gap-3">
            <Button variant="secondary" size="sm">
              View Matches
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              Schedule Interview
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">2</span> scheduled this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Career Points</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">Rank #23 this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Activity Feed */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest job search activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Applied to Senior Frontend Developer at TechCorp</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New message from Sarah at InnovateLabs</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Interview scheduled with DataFlow Inc</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                  <FileText className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Resume updated with AI suggestions</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <Star className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Earned "Interview Pro" badge</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Job Matches */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>One-click access to your tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Optimize Resume
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Practice Interview
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Briefcase className="mr-2 h-4 w-4" />
                Browse Jobs
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Join Community
              </Button>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium">New Job Matches</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">React Developer</p>
                      <p className="text-xs text-muted-foreground">TechStart Inc</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">Remote</span>
                        <Badge variant="secondary" className="text-xs">
                          95% match
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Full Stack Engineer</p>
                      <p className="text-xs text-muted-foreground">CloudTech</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">San Francisco</span>
                        <Badge variant="secondary" className="text-xs">
                          88% match
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your job search journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Interview Skills</span>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Network Growth</span>
                  <span className="text-sm text-muted-foreground">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
