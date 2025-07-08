"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RoadmapTree } from "@/components/roadmap-tree"
import {
  BookOpen,
  Target,
  Trophy,
  Clock,
  Plus,
  CalendarIcon,
  TrendingUp,
  Flame,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  GitBranch,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Map,
} from "lucide-react"
import { format } from "date-fns"

const learningGoals = [
  {
    id: 1,
    title: "Master React Hooks",
    description: "Learn all React hooks including custom hooks",
    category: "Frontend Development",
    targetDate: "2024-02-15",
    progress: 75,
    status: "active",
    timeSpent: 24,
    targetHours: 40,
    skills: ["React", "JavaScript", "Hooks"],
    milestones: [
      { title: "Learn useState and useEffect", completed: true, timeSpent: 8 },
      { title: "Master useContext and useReducer", completed: true, timeSpent: 6 },
      { title: "Build custom hooks", completed: false, timeSpent: 4 },
      { title: "Complete project with hooks", completed: false, timeSpent: 0 },
    ],
  },
  {
    id: 2,
    title: "AWS Cloud Practitioner Certification",
    description: "Prepare for and pass AWS Cloud Practitioner exam",
    category: "Cloud Computing",
    targetDate: "2024-03-01",
    progress: 45,
    status: "active",
    timeSpent: 18,
    targetHours: 60,
    skills: ["AWS", "Cloud Computing", "DevOps"],
    milestones: [
      { title: "Complete AWS fundamentals course", completed: true, timeSpent: 12 },
      { title: "Practice with AWS console", completed: false, timeSpent: 6 },
      { title: "Take practice exams", completed: false, timeSpent: 0 },
      { title: "Schedule certification exam", completed: false, timeSpent: 0 },
    ],
  },
]

const roadmapNodes = [
  {
    id: "html-css",
    title: "HTML & CSS",
    status: "completed" as const,
    type: "skill" as const,
    position: { x: 100, y: 100 },
    description: "Master the fundamentals of web markup and styling",
  },
  {
    id: "javascript",
    title: "JavaScript",
    status: "completed" as const,
    type: "skill" as const,
    position: { x: 300, y: 100 },
    description: "Learn modern JavaScript ES6+ features",
  },
  {
    id: "react",
    title: "React.js",
    status: "current" as const,
    type: "skill" as const,
    position: { x: 500, y: 100 },
    description: "Build interactive user interfaces with React",
  },
]

const weeklyData = [
  { day: "Mon", hours: 2, sessions: 3 },
  { day: "Tue", hours: 3, sessions: 4 },
  { day: "Wed", hours: 0, sessions: 0 },
  { day: "Thu", hours: 4, sessions: 5 },
  { day: "Fri", hours: 2, sessions: 2 },
  { day: "Sat", hours: 5, sessions: 6 },
  { day: "Sun", hours: 1, sessions: 1 },
]

const monthlyProgress = [
  { month: "Jan", hours: 45, goals: 2 },
  { month: "Feb", hours: 52, goals: 3 },
  { month: "Mar", hours: 38, goals: 1 },
  { month: "Apr", hours: 61, goals: 4 },
  { month: "May", hours: 48, goals: 2 },
  { month: "Jun", hours: 55, goals: 3 },
]

const achievements = [
  {
    id: 1,
    title: "First Goal",
    description: "Created your first learning goal",
    icon: Target,
    earned: true,
    earnedDate: "2024-01-10",
    category: "milestone",
  },
  {
    id: 2,
    title: "Consistent Learner",
    description: "Studied for 7 days in a row",
    icon: Flame,
    earned: true,
    earnedDate: "2024-01-15",
    category: "consistency",
  },
  {
    id: 3,
    title: "Speed Learner",
    description: "Completed a goal ahead of schedule",
    icon: TrendingUp,
    earned: false,
    category: "performance",
  },
  {
    id: 4,
    title: "Knowledge Explorer",
    description: "Started learning paths in 3 different categories",
    icon: BookOpen,
    earned: true,
    earnedDate: "2024-01-20",
    category: "exploration",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "study",
    title: "Completed React Hooks lesson",
    description: "Learned about useCallback and useMemo",
    timestamp: "2 hours ago",
    duration: "45 minutes",
  },
  {
    id: 2,
    type: "milestone",
    title: "Milestone achieved",
    description: "Completed 'Learn useState and useEffect'",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    type: "goal",
    title: "New goal created",
    description: "AWS Cloud Practitioner Certification",
    timestamp: "2 days ago",
  },
  {
    id: 4,
    type: "achievement",
    title: "Achievement unlocked",
    description: "Consistent Learner badge earned",
    timestamp: "3 days ago",
  },
]

export default function LearningTrackerPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showNewGoalForm, setShowNewGoalForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
      case "paused":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalHoursThisWeek = weeklyData.reduce((sum, day) => sum + day.hours, 0)
  const weeklyGoal = 30
  const currentStreak = 7
  const totalAchievements = achievements.filter((a) => a.earned).length

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Learning Tracker
          </h1>
          <p className="text-blue-700 text-lg">Track your progress and achieve your learning goals</p>
        </div>
        <Button onClick={() => setShowNewGoalForm(true)} className="bg-blue-500 hover:bg-blue-600 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Hours This Week</CardTitle>
            <Clock className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalHoursThisWeek}</div>
            <div className="mt-2">
              <Progress value={(totalHoursThisWeek / weeklyGoal) * 100} className="h-2 bg-blue-400" />
            </div>
            <p className="text-xs text-blue-200 mt-1">
              {totalHoursThisWeek}/{weeklyGoal} hours goal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">Active Goals</CardTitle>
            <Target className="h-5 w-5 text-emerald-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{learningGoals.filter((g) => g.status === "active").length}</div>
            <p className="text-xs text-emerald-200">{learningGoals.length} total goals</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Current Streak</CardTitle>
            <Flame className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{currentStreak}</div>
            <p className="text-xs text-orange-200">days in a row</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Achievements</CardTitle>
            <Trophy className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAchievements}</div>
            <p className="text-xs text-purple-200">{achievements.length - totalAchievements} to unlock</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/70 backdrop-blur-sm border border-blue-200 shadow-lg">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Learning Roadmap
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Goals
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Weekly Progress Chart */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Weekly Progress
                </CardTitle>
                <CardDescription className="text-blue-600">Your learning hours and sessions this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((day) => (
                    <div key={day.day} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-blue-800">{day.day}</span>
                        <div className="flex items-center space-x-4 text-blue-600">
                          <span>{day.hours}h</span>
                          <span>{day.sessions} sessions</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <Progress value={(day.hours / 6) * 100} className="h-3" />
                        </div>
                        <div className="w-16">
                          <Progress value={(day.sessions / 6) * 100} className="h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-blue-600">Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {activity.type === "study" && <BookOpen className="h-4 w-4 text-blue-600" />}
                        {activity.type === "milestone" && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                        {activity.type === "goal" && <Target className="h-4 w-4 text-blue-600" />}
                        {activity.type === "achievement" && <Trophy className="h-4 w-4 text-amber-600" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-blue-900">{activity.title}</p>
                        <p className="text-xs text-blue-600">{activity.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-blue-500">
                          <span>{activity.timestamp}</span>
                          {activity.duration && (
                            <>
                              <span>•</span>
                              <span>{activity.duration}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Progress Chart */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <TrendingUp className="h-5 w-5 mr-2" />
                Monthly Progress Trend
              </CardTitle>
              <CardDescription className="text-blue-600">Your learning progress over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                {monthlyProgress.map((month) => (
                  <div key={month.month} className="text-center space-y-2">
                    <div className="text-sm font-medium text-blue-800">{month.month}</div>
                    <div className="space-y-1">
                      <div
                        className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t mx-auto shadow-sm"
                        style={{
                          height: `${(month.hours / 70) * 100}px`,
                          width: "24px",
                          minHeight: "20px",
                        }}
                      />
                      <div className="text-xs text-blue-600 font-medium">{month.hours}h</div>
                    </div>
                    <div className="text-xs text-blue-500">{month.goals} goals</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Map className="h-6 w-6 mr-2" />
                Interactive Learning Roadmap
              </CardTitle>
              <CardDescription className="text-blue-600">
                Visual representation of your learning journey with progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <RoadmapTree nodes={roadmapNodes} onNodeClick={(node) => console.log("Selected node:", node)} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {showNewGoalForm && (
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-blue-800">Create New Learning Goal</CardTitle>
                <CardDescription className="text-blue-600">
                  Set a new objective for your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Goal Title</label>
                    <Input placeholder="e.g., Learn Python for Data Science" className="border-blue-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Category</label>
                    <Select>
                      <SelectTrigger className="border-blue-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Target Hours</label>
                    <Input type="number" placeholder="40" className="border-blue-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Target Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-blue-200"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-800">Description</label>
                  <Textarea
                    placeholder="Describe your learning goal and what you want to achieve..."
                    className="border-blue-200"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-blue-500 hover:bg-blue-600">Create Goal</Button>
                  <Button variant="outline" onClick={() => setShowNewGoalForm(false)} className="border-blue-200">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6">
            {learningGoals.map((goal) => (
              <Card key={goal.id} className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-blue-900">{goal.title}</CardTitle>
                      <CardDescription className="text-blue-700">{goal.description}</CardDescription>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {goal.category}
                        </Badge>
                        <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {goal.status === "paused" ? (
                        <Button size="sm" variant="outline" className="border-blue-300 text-blue-600">
                          <Play className="h-4 w-4 mr-1" />
                          Resume
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="border-blue-300 text-blue-600">
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-600">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-800">Overall Progress</span>
                      <span className="font-bold text-blue-600">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-3" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{goal.timeSpent}</div>
                      <div className="text-sm text-blue-500">Hours Spent</div>
                    </div>
                    <div className="text-center p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                      <div className="text-2xl font-bold text-cyan-600">{goal.targetHours}</div>
                      <div className="text-sm text-cyan-500">Target Hours</div>
                    </div>
                    <div className="text-center p-4 bg-teal-50 rounded-xl border border-teal-200">
                      <div className="text-2xl font-bold text-teal-600">
                        {Math.ceil(
                          (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )}
                      </div>
                      <div className="text-sm text-teal-500">Days Left</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-blue-800">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {goal.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center text-blue-800">
                      <GitBranch className="h-4 w-4 mr-2" />
                      Milestone Progress Tree
                    </h4>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                      {goal.milestones.map((milestone, index) => (
                        <div key={index} className="relative">
                          {/* Connection line */}
                          {index < goal.milestones.length - 1 && (
                            <div className="absolute left-3 top-8 w-px h-8 bg-blue-300" />
                          )}

                          <div className="flex items-start space-x-3 py-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-blue-300 shadow-sm">
                              {milestone.completed ? (
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                              )}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-sm font-medium ${
                                    milestone.completed ? "line-through text-blue-500" : "text-blue-800"
                                  }`}
                                >
                                  {milestone.title}
                                </span>
                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                  {milestone.timeSpent}h spent
                                </span>
                              </div>
                              {milestone.timeSpent > 0 && (
                                <Progress
                                  value={milestone.completed ? 100 : (milestone.timeSpent / 8) * 100}
                                  className="h-1"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Flame className="h-5 w-5 mr-2" />
                  Learning Streak
                </CardTitle>
                <CardDescription className="text-blue-600">Your consistency over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-5xl font-bold text-orange-500">{currentStreak}</div>
                  <p className="text-sm text-blue-600">days in a row</p>
                  <div className="flex justify-center space-x-1">
                    {Array.from({ length: 14 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < currentStreak ? "bg-orange-500 shadow-sm" : "bg-blue-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-blue-500">Last 14 days</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <PieChart className="h-5 w-5 mr-2" />
                  Category Breakdown
                </CardTitle>
                <CardDescription className="text-blue-600">Time spent by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Frontend Development", hours: 24, color: "bg-blue-500" },
                    { category: "Cloud Computing", hours: 18, color: "bg-cyan-500" },
                    { category: "Data Science", hours: 12, color: "bg-teal-500" },
                    { category: "Design", hours: 8, color: "bg-emerald-500" },
                  ].map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-blue-800">{item.category}</span>
                        <span className="text-blue-600">{item.hours}h</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <Progress value={(item.hours / 62) * 100} className="flex-1 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Zap className="h-5 w-5 mr-2" />
                Performance Insights
              </CardTitle>
              <CardDescription className="text-blue-600">AI-powered analysis of your learning patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium text-emerald-800">Peak Performance</span>
                  </div>
                  <p className="text-sm text-emerald-700">
                    You learn best on <strong>Thursday evenings</strong> with 85% focus rate
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Optimal Duration</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your ideal session length is <strong>45 minutes</strong> for maximum retention
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-amber-600" />
                    <span className="font-medium text-amber-800">Recommendation</span>
                  </div>
                  <p className="text-sm text-amber-700">
                    Consider adding <strong>review sessions</strong> to improve retention by 30%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`transition-all duration-300 ${
                  achievement.earned
                    ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-xl"
                    : "bg-white/60 border-gray-200 shadow-md opacity-75"
                }`}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        achievement.earned ? "bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg" : "bg-gray-200"
                      }`}
                    >
                      <achievement.icon className={`h-8 w-8 ${achievement.earned ? "text-white" : "text-gray-400"}`} />
                    </div>
                  </div>
                  <CardTitle className={`text-lg ${achievement.earned ? "text-amber-800" : "text-gray-500"}`}>
                    {achievement.title}
                  </CardTitle>
                  <CardDescription className={achievement.earned ? "text-amber-700" : "text-gray-400"}>
                    {achievement.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {achievement.earned ? (
                    <div className="space-y-2">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-300">Earned</Badge>
                      {achievement.earnedDate && (
                        <p className="text-xs text-amber-600">
                          Earned on {format(new Date(achievement.earnedDate), "MMM dd, yyyy")}
                        </p>
                      )}
                    </div>
                  ) : (
                    <Badge variant="outline" className="border-gray-300 text-gray-500">
                      Locked
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievement Categories */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-800">Achievement Categories</CardTitle>
              <CardDescription className="text-blue-600">Track your progress across different areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { category: "Milestones", count: 1, total: 5, color: "bg-blue-500" },
                  { category: "Consistency", count: 1, total: 3, color: "bg-emerald-500" },
                  { category: "Performance", count: 0, total: 4, color: "bg-amber-500" },
                  { category: "Exploration", count: 1, total: 3, color: "bg-purple-500" },
                ].map((cat) => (
                  <div key={cat.category} className="text-center space-y-2">
                    <div className={`w-12 h-12 rounded-full ${cat.color} mx-auto flex items-center justify-center`}>
                      <span className="text-white font-bold">{cat.count}</span>
                    </div>
                    <div>
                      <p className="font-medium text-blue-800">{cat.category}</p>
                      <p className="text-sm text-blue-600">
                        {cat.count} of {cat.total}
                      </p>
                    </div>
                    <Progress value={(cat.count / cat.total) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
