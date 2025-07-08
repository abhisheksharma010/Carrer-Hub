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
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Heart,
  MessageCircle,
  Search,
  Plus,
  Pin,
  Clock,
  Eye,
  ThumbsUp,
  Filter,
} from "lucide-react"

export default function CommunityPage() {
  const forumTopics = [
    {
      id: 1,
      title: "How to negotiate salary for remote positions?",
      author: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      category: "Career Advice",
      replies: 23,
      views: 156,
      likes: 45,
      lastActivity: "2 hours ago",
      isPinned: true,
      tags: ["salary", "remote", "negotiation"],
    },
    {
      id: 2,
      title: "Best resources for learning React in 2024",
      author: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      category: "Frontend Dev",
      replies: 18,
      views: 234,
      likes: 67,
      lastActivity: "4 hours ago",
      isPinned: false,
      tags: ["react", "learning", "frontend"],
    },
    {
      id: 3,
      title: "Interview experience at FAANG companies",
      author: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      category: "Interview Prep",
      replies: 34,
      views: 445,
      likes: 89,
      lastActivity: "6 hours ago",
      isPinned: false,
      tags: ["faang", "interview", "experience"],
    },
    {
      id: 4,
      title: "Transitioning from bootcamp to first job",
      author: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      category: "Career Change",
      replies: 12,
      views: 178,
      likes: 32,
      lastActivity: "1 day ago",
      isPinned: false,
      tags: ["bootcamp", "career-change", "junior"],
    },
  ]

  const channels = [
    { name: "General", members: 1247, active: true },
    { name: "Frontend Dev", members: 856, active: false },
    { name: "Backend Dev", members: 743, active: false },
    { name: "Career Advice", members: 1089, active: false },
    { name: "Interview Prep", members: 934, active: false },
    { name: "Freelancing", members: 567, active: false },
    { name: "Remote Work", members: 892, active: false },
  ]

  const recentMessages = [
    {
      id: 1,
      user: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Just landed my first remote job! Thanks for all the advice everyone 🎉",
      timestamp: "2 min ago",
      channel: "Career Advice",
    },
    {
      id: 2,
      user: "Lisa Park",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Anyone know good resources for system design interviews?",
      timestamp: "5 min ago",
      channel: "Interview Prep",
    },
    {
      id: 3,
      user: "David Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Working on a React project, happy to share my experience",
      timestamp: "12 min ago",
      channel: "Frontend Dev",
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
                <BreadcrumbPage>Community</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Community Hub</h1>
            <p className="text-muted-foreground">Connect, learn, and grow with fellow job seekers</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>

        {/* Community Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">+8</span> today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Stories</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Helpful Answers</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-purple-600">+15</span> today
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="forum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="chat">Group Chat</TabsTrigger>
            <TabsTrigger value="messages">Direct Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="forum" className="space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search discussions..." className="pl-10" />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Forum Topics */}
            <div className="space-y-4">
              {forumTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={topic.avatar || "/placeholder.svg"} alt={topic.author} />
                        <AvatarFallback>{topic.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {topic.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                              <h3 className="font-semibold hover:text-blue-600 cursor-pointer">{topic.title}</h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>by {topic.author}</span>
                              <span>•</span>
                              <Badge variant="secondary" className="text-xs">
                                {topic.category}
                              </Badge>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {topic.lastActivity}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {topic.replies}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {topic.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              {topic.likes}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {topic.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-4">
              {/* Channel List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Channels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {channels.map((channel) => (
                    <div
                      key={channel.name}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-muted ${
                        channel.active ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium"># {channel.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{channel.members}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg"># General</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      1,247 members
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-96 space-y-4 overflow-y-auto">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.user} />
                          <AvatarFallback>{message.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{message.user}</span>
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button>Send</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Direct Messages</CardTitle>
                <CardDescription>Private conversations with community members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah Chen" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sarah Chen</p>
                        <p className="text-sm text-muted-foreground">Thanks for the interview tips!</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">2h ago</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Mike Johnson" />
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Mike Johnson</p>
                        <p className="text-sm text-muted-foreground">Let's connect on the React project</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">1d ago</div>
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
