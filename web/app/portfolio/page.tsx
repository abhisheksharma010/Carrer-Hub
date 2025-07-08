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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Github,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  Star,
  GitFork,
  Eye,
  Calendar,
  Code,
  Globe,
  Award,
  Download,
  Share,
} from "lucide-react"

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description:
        "A comprehensive admin dashboard for managing e-commerce operations with real-time analytics and inventory management.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/alexjohnson/ecommerce-dashboard",
      liveUrl: "https://ecommerce-dashboard-demo.vercel.app",
      featured: true,
      stars: 45,
      forks: 12,
      lastUpdated: "2024-01-15",
      status: "Completed",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Next.js", "Prisma", "tRPC", "Tailwind CSS", "Vercel"],
      githubUrl: "https://github.com/alexjohnson/task-manager",
      liveUrl: "https://task-manager-pro.vercel.app",
      featured: true,
      stars: 32,
      forks: 8,
      lastUpdated: "2024-01-10",
      status: "Completed",
    },
    {
      id: 3,
      title: "Weather Forecast Widget",
      description:
        "A responsive weather widget with location-based forecasts, interactive maps, and customizable themes.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Vue.js", "OpenWeather API", "Chart.js", "SCSS"],
      githubUrl: "https://github.com/alexjohnson/weather-widget",
      liveUrl: "https://weather-widget-demo.netlify.app",
      featured: false,
      stars: 18,
      forks: 5,
      lastUpdated: "2024-01-05",
      status: "Completed",
    },
    {
      id: 4,
      title: "AI Chat Interface",
      description:
        "Modern chat interface for AI assistants with streaming responses, conversation history, and customizable themes.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["React", "OpenAI API", "Socket.io", "Express", "MongoDB"],
      githubUrl: "https://github.com/alexjohnson/ai-chat",
      liveUrl: null,
      featured: false,
      stars: 67,
      forks: 23,
      lastUpdated: "2024-01-20",
      status: "In Progress",
    },
  ]

  const skills = [
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "React", level: 92, category: "Frontend" },
    { name: "TypeScript", level: 88, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 78, category: "Backend" },
    { name: "PostgreSQL", level: 82, category: "Database" },
    { name: "AWS", level: 75, category: "Cloud" },
    { name: "Docker", level: 70, category: "DevOps" },
  ]

  const achievements = [
    {
      title: "Open Source Contributor",
      description: "Contributed to 15+ open source projects",
      icon: Github,
      date: "2023",
    },
    {
      title: "Hackathon Winner",
      description: "1st place at TechCorp Hackathon 2023",
      icon: Award,
      date: "2023",
    },
    {
      title: "Top Developer",
      description: "Top 5% on GitHub based on contributions",
      icon: Star,
      date: "2023",
    },
  ]

  const githubStats = {
    totalRepos: 42,
    totalStars: 234,
    totalForks: 67,
    totalCommits: 1247,
    contributionsThisYear: 892,
    longestStreak: 45,
  }

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
                <BreadcrumbPage>Portfolio</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Portfolio Builder</h1>
            <p className="text-muted-foreground">Showcase your projects, skills, and achievements</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share Portfolio
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>

        {/* Portfolio Header */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Alex Johnson" />
                <AvatarFallback className="text-2xl">AJ</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Alex Johnson</h2>
                <p className="text-blue-100">Senior Frontend Developer</p>
                <p className="text-blue-100 max-w-2xl">
                  Passionate developer with 5+ years of experience building modern web applications. Specialized in
                  React, TypeScript, and creating exceptional user experiences.
                </p>
                <div className="flex gap-4 mt-4">
                  <Button variant="secondary" size="sm">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            {/* Featured Projects */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Featured Projects</h3>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Manage Featured
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {projects
                  .filter((p) => p.featured)
                  .map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <div className="aspect-video bg-muted">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{project.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                            </div>
                            <Badge variant={project.status === "Completed" ? "secondary" : "default"}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {project.stars}
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="h-3 w-3" />
                                {project.forks}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(project.lastUpdated).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Github className="h-4 w-4" />
                              </Button>
                              {project.liveUrl && (
                                <Button size="sm" variant="outline">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* All Projects */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">All Projects</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">{project.title}</h4>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Star className="h-3 w-3" />
                            {project.stars}
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Github className="h-3 w-3" />
                            </Button>
                            {project.liveUrl && (
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Technical Skills
                </CardTitle>
                <CardDescription>Your technical expertise and proficiency levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {["Frontend", "Backend", "Database", "Cloud", "DevOps"].map((category) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium">{category}</h4>
                      <div className="space-y-3">
                        {skills
                          .filter((skill) => skill.category === category)
                          .map((skill) => (
                            <div key={skill.name} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{skill.name}</span>
                                <span>{skill.level}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="github" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
                  <Github className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{githubStats.totalRepos}</div>
                  <p className="text-xs text-muted-foreground">Public repositories</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Stars</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{githubStats.totalStars}</div>
                  <p className="text-xs text-muted-foreground">Across all repositories</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contributions</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{githubStats.contributionsThisYear}</div>
                  <p className="text-xs text-muted-foreground">This year</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>GitHub Activity</CardTitle>
                <CardDescription>Your contribution history and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Commits</span>
                      <span>{githubStats.totalCommits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Forks</span>
                      <span>{githubStats.totalForks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Longest Streak</span>
                      <span>{githubStats.longestStreak} days</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Github className="mr-2 h-4 w-4" />
                      Sync GitHub Data
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View GitHub Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements & Recognition
                </CardTitle>
                <CardDescription>Your accomplishments and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {achievements.map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <achievement.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground">{achievement.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Achievement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customize" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Customization</CardTitle>
                <CardDescription>Customize your portfolio appearance and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="portfolio-title">Portfolio Title</Label>
                    <Input id="portfolio-title" defaultValue="Alex Johnson - Frontend Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio-bio">Bio</Label>
                    <Textarea
                      id="portfolio-bio"
                      defaultValue="Passionate developer with 5+ years of experience building modern web applications. Specialized in React, TypeScript, and creating exceptional user experiences."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio-theme">Theme</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Professional Blue</option>
                      <option>Modern Dark</option>
                      <option>Minimal Light</option>
                      <option>Creative Gradient</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Preview Portfolio</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
