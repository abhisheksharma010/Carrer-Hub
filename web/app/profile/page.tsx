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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  MessageSquare,
  UserPlus,
  UserMinus,
  Star,
  Eye,
  TrendingUp,
  Building2,
  Clock,
} from "lucide-react"

export default function ProfilePage() {
  const connections = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Product Manager at TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 12,
      connected: true,
      company: "TechCorp",
    },
    {
      id: 2,
      name: "Mike Johnson",
      title: "Frontend Developer at InnovateLabs",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 8,
      connected: true,
      company: "InnovateLabs",
    },
    {
      id: 3,
      name: "Emma Wilson",
      title: "UX Designer at StartupXYZ",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 5,
      connected: false,
      company: "StartupXYZ",
    },
    {
      id: 4,
      name: "David Kim",
      title: "Engineering Manager at CloudTech",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 15,
      connected: false,
      company: "CloudTech",
    },
  ]

  const activities = [
    {
      id: 1,
      type: "application",
      title: "Applied to Senior Frontend Developer at TechCorp",
      timestamp: "2 hours ago",
      icon: Briefcase,
    },
    {
      id: 2,
      type: "connection",
      title: "Connected with Sarah Chen",
      timestamp: "1 day ago",
      icon: UserPlus,
    },
    {
      id: 3,
      type: "interview",
      title: "Completed mock interview - Technical Round",
      timestamp: "2 days ago",
      icon: Star,
    },
    {
      id: 4,
      type: "post",
      title: "Posted in Frontend Developers community",
      timestamp: "3 days ago",
      icon: MessageSquare,
    },
  ]

  const skills = [
    { name: "JavaScript", level: 95, endorsements: 23 },
    { name: "React", level: 92, endorsements: 18 },
    { name: "TypeScript", level: 88, endorsements: 15 },
    { name: "Node.js", level: 85, endorsements: 12 },
    { name: "CSS/SCSS", level: 90, endorsements: 20 },
    { name: "Git", level: 87, endorsements: 16 },
  ]

  const experience = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp",
      duration: "2022 - Present",
      description: "Leading frontend development for enterprise applications using React and TypeScript.",
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      duration: "2020 - 2022",
      description: "Built responsive web applications and collaborated with design team on user experience.",
    },
    {
      title: "Junior Developer",
      company: "WebSolutions",
      duration: "2019 - 2020",
      description: "Developed websites and web applications using modern JavaScript frameworks.",
    },
  ]

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University of Technology",
      year: "2015 - 2019",
      gpa: "3.8/4.0",
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
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Alex Johnson" />
                  <AvatarFallback className="text-2xl">AJ</AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button size="sm">Edit Profile</Button>
                  <Button size="sm" variant="outline">
                    Share Profile
                  </Button>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">Alex Johnson</h1>
                  <p className="text-xl text-muted-foreground">Senior Frontend Developer</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      TechCorp
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      247 connections
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Passionate frontend developer with 5+ years of experience building modern web applications.
                  Specialized in React, TypeScript, and user experience design. Always eager to learn new technologies
                  and contribute to innovative projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React Expert</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">UI/UX</Badge>
                  <Badge variant="secondary">Team Lead</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    alex@example.com
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="mr-2 h-4 w-4" />
                    +1 (555) 123-4567
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connections</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">+5</span> new this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skill Endorsements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">104</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-purple-600">+8</span> this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Career Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">Rank #23 globally</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Current Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">Senior Frontend Developer</h3>
                      <p className="text-sm text-muted-foreground">TechCorp • 2022 - Present</p>
                    </div>
                    <p className="text-sm">
                      Leading frontend development for enterprise applications using React and TypeScript. Mentoring
                      junior developers and collaborating with cross-functional teams.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        React
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        TypeScript
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Team Leadership
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">Bachelor of Computer Science</h3>
                      <p className="text-sm text-muted-foreground">University of Technology • 2015 - 2019</p>
                    </div>
                    <p className="text-sm">GPA: 3.8/4.0</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        Computer Science
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Software Engineering
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Skills Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Top Skills</CardTitle>
                <CardDescription>Your most endorsed skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {skills.slice(0, 4).map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.endorsements} endorsements</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Your professional journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Briefcase className="h-4 w-4 text-primary" />
                      </div>
                      {index < experience.length - 1 && <div className="w-px h-16 bg-border mt-2" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} • {exp.duration}
                        </p>
                      </div>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Academic background</CardDescription>
              </CardHeader>
              <CardContent>
                {education.map((edu, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.school} • {edu.year}
                      </p>
                      <p className="text-sm">GPA: {edu.gpa}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Endorsements</CardTitle>
                <CardDescription>Your technical and professional skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{skill.endorsements} endorsements</span>
                          <Button size="sm" variant="outline">
                            <Award className="mr-1 h-3 w-3" />
                            Endorse
                          </Button>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-3" />
                      <div className="text-xs text-muted-foreground text-right">{skill.level}% proficiency</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Your Network</h2>
                <p className="text-sm text-muted-foreground">247 connections • 12 mutual connections</p>
              </div>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Find Connections
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {connections.map((connection) => (
                <Card key={connection.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                        <AvatarFallback>{connection.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">{connection.name}</h3>
                        <p className="text-sm text-muted-foreground">{connection.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {connection.mutualConnections} mutual connections
                        </p>
                        <div className="flex gap-2 mt-2">
                          {connection.connected ? (
                            <>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="mr-1 h-3 w-3" />
                                Message
                              </Button>
                              <Button size="sm" variant="outline">
                                <UserMinus className="h-3 w-3" />
                              </Button>
                            </>
                          ) : (
                            <Button size="sm">
                              <UserPlus className="mr-1 h-3 w-3" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {activity.timestamp}
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
    </SidebarInset>
  )
}
