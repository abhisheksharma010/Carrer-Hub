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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Calendar,
  User,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Code,
  Users,
  Lightbulb,
  Building2,
  Star,
  TrendingUp,
} from "lucide-react"

export default function CompanyQuestionsPage() {
  const companyName = "TechCorp"

  const questionsByYear = {
    "2024": [
      {
        id: 1,
        question: "Implement a function to debounce API calls in React",
        type: "Technical",
        difficulty: "Medium",
        askedBy: "Sarah Chen",
        position: "Senior Frontend Developer",
        date: "2024-01-15",
        upvotes: 23,
        downvotes: 2,
        answers: 8,
        tags: ["React", "JavaScript", "API"],
      },
      {
        id: 2,
        question: "Tell me about a time you had to work with a difficult team member",
        type: "Behavioral",
        difficulty: "Easy",
        askedBy: "Mike Johnson",
        position: "Engineering Manager",
        date: "2024-01-10",
        upvotes: 15,
        downvotes: 1,
        answers: 12,
        tags: ["Teamwork", "Communication"],
      },
      {
        id: 3,
        question: "Design a system to handle 1 million concurrent users",
        type: "System Design",
        difficulty: "Hard",
        askedBy: "Alex Rodriguez",
        position: "Staff Engineer",
        date: "2024-01-08",
        upvotes: 45,
        downvotes: 3,
        answers: 6,
        tags: ["System Design", "Scalability", "Architecture"],
      },
    ],
    "2023": [
      {
        id: 4,
        question: "How would you optimize a slow-loading React component?",
        type: "Technical",
        difficulty: "Medium",
        askedBy: "Emma Wilson",
        position: "Senior Developer",
        date: "2023-12-20",
        upvotes: 31,
        downvotes: 2,
        answers: 15,
        tags: ["React", "Performance", "Optimization"],
      },
      {
        id: 5,
        question: "Describe your approach to code reviews",
        type: "Behavioral",
        difficulty: "Easy",
        askedBy: "David Kim",
        position: "Tech Lead",
        date: "2023-12-15",
        upvotes: 18,
        downvotes: 0,
        answers: 9,
        tags: ["Code Review", "Best Practices"],
      },
    ],
    "2022": [
      {
        id: 6,
        question: "Implement a LRU cache with O(1) operations",
        type: "Technical",
        difficulty: "Hard",
        askedBy: "Lisa Park",
        position: "Principal Engineer",
        date: "2022-11-30",
        upvotes: 67,
        downvotes: 4,
        answers: 22,
        tags: ["Data Structures", "Algorithms", "Cache"],
      },
    ],
  }

  const stats = {
    totalQuestions: 156,
    thisYear: 45,
    avgDifficulty: "Medium",
    mostAskedType: "Technical",
    topTags: ["React", "JavaScript", "System Design", "Algorithms", "Behavioral"],
  }

  const interviewers = [
    {
      name: "Sarah Chen",
      title: "Senior Engineering Manager",
      avatar: "/placeholder.svg?height=32&width=32",
      questionsAsked: 23,
      avgRating: 4.8,
    },
    {
      name: "Mike Johnson",
      title: "Staff Engineer",
      avatar: "/placeholder.svg?height=32&width=32",
      questionsAsked: 18,
      avgRating: 4.6,
    },
    {
      name: "Alex Rodriguez",
      title: "Principal Engineer",
      avatar: "/placeholder.svg?height=32&width=32",
      questionsAsked: 15,
      avgRating: 4.9,
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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/companies">Companies</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/companies/techcorp">{companyName}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Interview Questions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{companyName} Interview Questions</h1>
            <p className="text-muted-foreground">Previous year questions and interview experiences</p>
          </div>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Share Your Experience
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuestions}</div>
              <p className="text-xs text-muted-foreground">Across all years</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Year</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisYear}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12</span> from last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Difficulty</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgDifficulty}</div>
              <p className="text-xs text-muted-foreground">Most common level</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Asked</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.mostAskedType}</div>
              <p className="text-xs text-muted-foreground">Question type</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviewers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviewers.length}</div>
              <p className="text-xs text-muted-foreground">Active interviewers</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search questions..." className="pl-10" />
                </div>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Question Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="system-design">System Design</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="2024" className="space-y-4">
          <TabsList>
            <TabsTrigger value="2024">2024</TabsTrigger>
            <TabsTrigger value="2023">2023</TabsTrigger>
            <TabsTrigger value="2022">2022</TabsTrigger>
            <TabsTrigger value="interviewers">Interviewers</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {Object.entries(questionsByYear).map(([year, questions]) => (
            <TabsContent key={year} value={year} className="space-y-4">
              <div className="space-y-4">
                {questions.map((question) => (
                  <Card key={question.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold text-lg">{question.question}</h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  question.type === "Technical"
                                    ? "default"
                                    : question.type === "Behavioral"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {question.type}
                              </Badge>
                              <Badge
                                variant={
                                  question.difficulty === "Easy"
                                    ? "secondary"
                                    : question.difficulty === "Medium"
                                      ? "default"
                                      : "destructive"
                                }
                              >
                                {question.difficulty}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(question.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Asked by {question.askedBy} ({question.position})
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <ThumbsUp className="mr-1 h-3 w-3" />
                              {question.upvotes}
                            </Button>
                            <Button size="sm" variant="outline">
                              <ThumbsDown className="mr-1 h-3 w-3" />
                              {question.downvotes}
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              {question.answers}
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {question.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}

          <TabsContent value="interviewers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meet the Interviewers</CardTitle>
                <CardDescription>Learn about the people who conduct interviews at {companyName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {interviewers.map((interviewer) => (
                    <Card key={interviewer.name}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={interviewer.avatar || "/placeholder.svg"} alt={interviewer.name} />
                            <AvatarFallback>{interviewer.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="font-medium">{interviewer.name}</h3>
                            <p className="text-sm text-muted-foreground">{interviewer.title}</p>
                            <div className="flex items-center gap-2 text-xs">
                              <span>{interviewer.questionsAsked} questions</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {interviewer.avgRating}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full mt-3" size="sm" variant="outline">
                          <MessageSquare className="mr-2 h-3 w-3" />
                          Ask for Referral
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Interview Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-sm">Technical Rounds</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Focus on React patterns, performance optimization, and system design fundamentals.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-sm">Behavioral Questions</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Prepare STAR method examples focusing on teamwork and problem-solving.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-sm">System Design</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Emphasize scalability, reliability, and trade-offs in your solutions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Topics</CardTitle>
                  <CardDescription>Most frequently asked about</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.topTags.map((tag, index) => (
                      <div key={tag} className="flex items-center justify-between">
                        <span className="font-medium">{tag}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${100 - index * 15}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{Math.max(85 - index * 15, 25)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Interview Process Overview</CardTitle>
                <CardDescription>Typical interview stages at {companyName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Phone Screen</h4>
                    <p className="text-sm text-muted-foreground">30 min behavioral + basic technical</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                      <Code className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium">Technical Round</h4>
                    <p className="text-sm text-muted-foreground">60 min coding + system design</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium">Team Interview</h4>
                    <p className="text-sm text-muted-foreground">45 min cultural fit + collaboration</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto">
                      <Building2 className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="font-medium">Final Round</h4>
                    <p className="text-sm text-muted-foreground">30 min with hiring manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
