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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Star, TrendingUp, Users, Crown, Flame, Calendar, Briefcase } from "lucide-react"

export default function LeaderboardPage() {
  const topUsers = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 4850,
      level: "Expert",
      badges: 12,
      applications: 45,
      interviews: 8,
      streak: 15,
      change: "+2",
    },
    {
      rank: 2,
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 4720,
      level: "Expert",
      badges: 10,
      applications: 38,
      interviews: 6,
      streak: 12,
      change: "0",
    },
    {
      rank: 3,
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 4650,
      level: "Advanced",
      badges: 9,
      applications: 42,
      interviews: 7,
      streak: 8,
      change: "+1",
    },
    {
      rank: 4,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 4580,
      level: "Advanced",
      badges: 8,
      applications: 35,
      interviews: 5,
      streak: 10,
      change: "-1",
    },
    {
      rank: 5,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 4420,
      level: "Advanced",
      badges: 7,
      applications: 32,
      interviews: 4,
      streak: 6,
      change: "+3",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "First Interview",
      description: "Scheduled your first interview",
      icon: Calendar,
      rarity: "Common",
      earned: true,
      progress: 100,
    },
    {
      id: 2,
      title: "Application Master",
      description: "Applied to 50+ jobs",
      icon: Briefcase,
      rarity: "Rare",
      earned: true,
      progress: 100,
    },
    {
      id: 3,
      title: "Interview Pro",
      description: "Completed 10 mock interviews",
      icon: Star,
      rarity: "Epic",
      earned: false,
      progress: 70,
    },
    {
      id: 4,
      title: "Community Helper",
      description: "Helped 25 community members",
      icon: Users,
      rarity: "Legendary",
      earned: false,
      progress: 45,
    },
  ]

  const currentUser = {
    rank: 23,
    name: "Alex Johnson",
    points: 2847,
    level: "Intermediate",
    badges: 7,
    nextLevelPoints: 3000,
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
                <BreadcrumbPage>Leaderboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Leaderboard & Achievements</h1>
            <p className="text-muted-foreground">Compete with the community and unlock achievements</p>
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Current User Stats */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-white">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt={currentUser.name} />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1">
                    <Crown className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{currentUser.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      Rank #{currentUser.rank}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {currentUser.level}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentUser.points.toLocaleString()}</div>
                <p className="text-blue-100">Career Points</p>
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>Next Level:</span>
                    <span>{currentUser.nextLevelPoints - currentUser.points} points</span>
                  </div>
                  <Progress
                    value={(currentUser.points / currentUser.nextLevelPoints) * 100}
                    className="mt-1 h-2 bg-white/20"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="rankings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="rankings" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">Active this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#{currentUser.rank}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+5</span> from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentUser.badges}</div>
                  <p className="text-xs text-muted-foreground">2 new this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Top 3 Podium */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>This month's leaderboard champions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-center gap-4 mb-6">
                  {/* 2nd Place */}
                  <div className="text-center">
                    <div className="relative mb-2">
                      <Avatar className="h-16 w-16 border-2 border-gray-400">
                        <AvatarImage src={topUsers[1].avatar || "/placeholder.svg"} alt={topUsers[1].name} />
                        <AvatarFallback>{topUsers[1].name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 bg-gray-400 rounded-full p-1">
                        <Medal className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-t-lg p-4 h-20 flex flex-col justify-end">
                      <p className="font-semibold text-sm">{topUsers[1].name}</p>
                      <p className="text-xs text-muted-foreground">{topUsers[1].points} pts</p>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center">
                    <div className="relative mb-2">
                      <Avatar className="h-20 w-20 border-2 border-yellow-400">
                        <AvatarImage src={topUsers[0].avatar || "/placeholder.svg"} alt={topUsers[0].name} />
                        <AvatarFallback>{topUsers[0].name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                        <Crown className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="bg-yellow-100 rounded-t-lg p-4 h-24 flex flex-col justify-end">
                      <p className="font-bold">{topUsers[0].name}</p>
                      <p className="text-sm text-muted-foreground">{topUsers[0].points} pts</p>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center">
                    <div className="relative mb-2">
                      <Avatar className="h-16 w-16 border-2 border-amber-600">
                        <AvatarImage src={topUsers[2].avatar || "/placeholder.svg"} alt={topUsers[2].name} />
                        <AvatarFallback>{topUsers[2].name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 bg-amber-600 rounded-full p-1">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-amber-100 rounded-t-lg p-4 h-16 flex flex-col justify-end">
                      <p className="font-semibold text-sm">{topUsers[2].name}</p>
                      <p className="text-xs text-muted-foreground">{topUsers[2].points} pts</p>
                    </div>
                  </div>
                </div>

                {/* Full Rankings */}
                <div className="space-y-2">
                  {topUsers.map((user, index) => (
                    <div
                      key={user.rank}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                          {user.rank}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {user.level}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Flame className="h-3 w-3" />
                              {user.streak} day streak
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{user.points.toLocaleString()}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{user.applications} apps</span>
                          <span>•</span>
                          <span>{user.interviews} interviews</span>
                          <div
                            className={`flex items-center gap-1 ${
                              user.change.startsWith("+")
                                ? "text-green-600"
                                : user.change.startsWith("-")
                                  ? "text-red-600"
                                  : "text-muted-foreground"
                            }`}
                          >
                            <TrendingUp className="h-3 w-3" />
                            {user.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`${achievement.earned ? "bg-green-50 border-green-200" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          achievement.earned ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <achievement.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <Badge
                            variant={
                              achievement.rarity === "Common"
                                ? "secondary"
                                : achievement.rarity === "Rare"
                                  ? "default"
                                  : achievement.rarity === "Epic"
                                    ? "destructive"
                                    : "outline"
                            }
                            className="text-xs"
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {!achievement.earned && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-2" />
                          </div>
                        )}
                        {achievement.earned && (
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <Trophy className="h-4 w-4" />
                            Unlocked!
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Job Applications
                  </CardTitle>
                  <CardDescription>Most applications submitted</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Chen" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Sarah Chen</span>
                      </div>
                      <span className="font-bold">67</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Mike Johnson" />
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Mike Johnson</span>
                      </div>
                      <span className="font-bold">54</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alex Rodriguez" />
                          <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Alex Rodriguez</span>
                      </div>
                      <span className="font-bold">48</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Mock Interviews
                  </CardTitle>
                  <CardDescription>Highest interview scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Emma Wilson" />
                          <AvatarFallback>EW</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Emma Wilson</span>
                      </div>
                      <span className="font-bold">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="David Kim" />
                          <AvatarFallback>DK</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">David Kim</span>
                      </div>
                      <span className="font-bold">91%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Chen" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Sarah Chen</span>
                      </div>
                      <span className="font-bold">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community Helper
                  </CardTitle>
                  <CardDescription>Most helpful community members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alex Rodriguez" />
                          <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Alex Rodriguez</span>
                      </div>
                      <span className="font-bold">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Chen" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Sarah Chen</span>
                      </div>
                      <span className="font-bold">134</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Mike Johnson" />
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Mike Johnson</span>
                      </div>
                      <span className="font-bold">98</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
