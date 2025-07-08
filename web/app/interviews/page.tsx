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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mic,
  Code,
  Users,
  FileText,
  Play,
  Clock,
  Target,
  TrendingUp,
  Star,
  Calendar,
  BarChart3,
  Award,
} from "lucide-react"

export default function InterviewsPage() {
  const interviewTypes = [
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "Practice common behavioral questions and STAR method responses",
      icon: Users,
      duration: "30-45 min",
      difficulty: "Beginner",
      questions: 25,
      color: "bg-blue-500",
    },
    {
      id: "technical",
      title: "Technical Interview",
      description: "Code challenges, algorithms, and system design questions",
      icon: Code,
      duration: "45-60 min",
      difficulty: "Intermediate",
      questions: 40,
      color: "bg-green-500",
    },
    {
      id: "case-study",
      title: "Case Study",
      description: "Business case analysis and problem-solving scenarios",
      icon: FileText,
      duration: "60-90 min",
      difficulty: "Advanced",
      questions: 15,
      color: "bg-purple-500",
    },
    {
      id: "whiteboard",
      title: "Whiteboard Session",
      description: "Visual problem solving and system architecture design",
      icon: Target,
      duration: "45-75 min",
      difficulty: "Advanced",
      questions: 20,
      color: "bg-orange-500",
    },
  ]

  const recentSessions = [
    {
      id: 1,
      type: "Behavioral",
      date: "2024-01-15",
      score: 85,
      duration: "32 min",
      questions: 8,
      accuracy: 87,
      confidence: 82,
    },
    {
      id: 2,
      type: "Technical",
      date: "2024-01-12",
      score: 78,
      duration: "48 min",
      questions: 5,
      accuracy: 80,
      confidence: 75,
    },
    {
      id: 3,
      type: "Case Study",
      date: "2024-01-10",
      score: 92,
      duration: "65 min",
      questions: 3,
      accuracy: 95,
      confidence: 88,
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
                <BreadcrumbPage>Mock Interviews</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mock Interview Suite</h1>
            <p className="text-muted-foreground">Practice and improve your interview skills</p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Real Interview
          </Button>
        </div>

        {/* Performance Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Mic className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> improvement
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confidence Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">Steady</span> progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-purple-600">2</span> new this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Interview Types */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Choose Interview Type</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {interviewTypes.map((type) => (
                <Card key={type.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${type.color} text-white`}>
                        <type.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {type.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{type.questions} questions</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {type.duration}
                      </div>
                    </div>
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Start Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Sessions & Progress */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Your latest practice sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{session.type}</span>
                        <Badge variant="secondary" className="text-xs">
                          {session.score}%
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {session.date} • {session.duration}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Sessions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Progress</CardTitle>
                <CardDescription>Track your improvement over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Communication</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Technical Skills</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Problem Solving</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence</span>
                    <span>73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Jump into a practice session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Mic className="mr-2 h-4 w-4" />
                  Random Question
                </Button>
                <Button className="w-full" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  5-Minute Drill
                </Button>
                <Button className="w-full" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Weak Areas Focus
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
