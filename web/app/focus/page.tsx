"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpotifyPlayer } from "@/components/spotify-player"
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Trophy,
  Flame,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  Filter,
  Star,
  Zap,
  Brain,
  Timer,
  Coffee,
  Lightbulb,
  Focus,
  CheckCircle,
} from "lucide-react"

interface PomodoroSession {
  id: string
  type: "focus" | "short-break" | "long-break"
  duration: number
  completedAt: Date
  task?: string
}

interface FocusStats {
  totalSessions: number
  totalFocusTime: number
  streak: number
  level: number
  xp: number
  badges: string[]
}

interface LeaderboardEntry {
  id: string
  name: string
  avatar: string
  focusTime: number
  sessions: number
  streak: number
  level: number
  badges: string[]
  isFriend: boolean
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    focusTime: 45.5,
    sessions: 28,
    streak: 12,
    level: 8,
    badges: ["🔥", "⚡", "🎯"],
    isFriend: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    focusTime: 42.2,
    sessions: 25,
    streak: 8,
    level: 7,
    badges: ["🏆", "💎", "🚀"],
    isFriend: true,
  },
  {
    id: "3",
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    focusTime: 38.7,
    sessions: 23,
    streak: 7,
    level: 6,
    badges: ["🔥", "🎯"],
    isFriend: false,
  },
  {
    id: "4",
    name: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    focusTime: 35.1,
    sessions: 21,
    streak: 5,
    level: 6,
    badges: ["⚡", "🎯"],
    isFriend: false,
  },
  {
    id: "5",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    focusTime: 32.8,
    sessions: 19,
    streak: 4,
    level: 5,
    badges: ["🔥"],
    isFriend: true,
  },
]

const achievements = [
  {
    id: "first-session",
    title: "First Focus",
    description: "Complete your first pomodoro session",
    icon: "🎯",
    earned: true,
    xp: 50,
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Maintain a 7-day focus streak",
    icon: "🔥",
    earned: true,
    xp: 200,
  },
  {
    id: "sessions-50",
    title: "Focus Master",
    description: "Complete 50 focus sessions",
    icon: "⚡",
    earned: false,
    xp: 500,
  },
  {
    id: "time-100",
    title: "Century Club",
    description: "Log 100 hours of focus time",
    icon: "💎",
    earned: false,
    xp: 1000,
  },
]

export default function FocusPage() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [sessionType, setSessionType] = useState<"focus" | "short-break" | "long-break">("focus")
  const [currentTask, setCurrentTask] = useState("")
  const [sessions, setSessions] = useState<PomodoroSession[]>([])
  const [activeTab, setActiveTab] = useState("timer")
  const [filterType, setFilterType] = useState("all")
  const [filterPeriod, setFilterPeriod] = useState("week")

  // Focus settings
  const [focusTime, setFocusTime] = useState(25)
  const [shortBreakTime, setShortBreakTime] = useState(5)
  const [longBreakTime, setLongBreakTime] = useState(15)
  const [autoStartBreaks, setAutoStartBreaks] = useState(true)

  // Stats
  const focusStats: FocusStats = {
    totalSessions: 23,
    totalFocusTime: 38.7,
    streak: 7,
    level: 6,
    xp: 2340,
    badges: ["🔥", "🎯", "⚡"],
  }

  const getSessionDuration = (type: "focus" | "short-break" | "long-break") => {
    switch (type) {
      case "focus":
        return focusTime * 60
      case "short-break":
        return shortBreakTime * 60
      case "long-break":
        return longBreakTime * 60
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = () => {
    setIsActive(true)
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(getSessionDuration(sessionType))
  }

  const completeSession = () => {
    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      type: sessionType,
      duration: getSessionDuration(sessionType),
      completedAt: new Date(),
      task: currentTask || undefined,
    }
    setSessions([...sessions, newSession])

    // Auto-switch to break or next focus session
    if (sessionType === "focus") {
      const nextType = sessions.filter((s) => s.type === "focus").length % 4 === 3 ? "long-break" : "short-break"
      setSessionType(nextType)
      setTimeLeft(getSessionDuration(nextType))
      if (autoStartBreaks) {
        setIsActive(true)
      }
    } else {
      setSessionType("focus")
      setTimeLeft(getSessionDuration("focus"))
      setIsActive(false)
    }
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      completeSession()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case "focus":
        return "bg-blue-500"
      case "short-break":
        return "bg-emerald-500"
      case "long-break":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case "focus":
        return <Focus className="h-4 w-4" />
      case "short-break":
        return <Coffee className="h-4 w-4" />
      case "long-break":
        return <Coffee className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredLeaderboard = mockLeaderboard.filter((entry) => {
    if (filterType === "friends") return entry.isFriend
    if (filterType === "level") return entry.level >= 5
    return true
  })

  const progress = ((getSessionDuration(sessionType) - timeLeft) / getSessionDuration(sessionType)) * 100

  return (
    <div className="flex-1 space-y-6 p-6 focus-gradient min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Focus Flow</h1>
          <p className="text-blue-100 text-lg">Boost your productivity with the Pomodoro Technique</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="glass-effect rounded-xl px-4 py-2 text-white">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-300" />
              <span className="font-bold">Level {focusStats.level}</span>
            </div>
          </div>
          <div className="glass-effect rounded-xl px-4 py-2 text-white">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-orange-300" />
              <span className="font-bold">{focusStats.streak} day streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass-effect border-white/20 text-white shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Today's Focus</CardTitle>
            <Timer className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2h</div>
            <p className="text-xs text-blue-200">8 sessions completed</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 text-white shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Total Sessions</CardTitle>
            <Target className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{focusStats.totalSessions}</div>
            <p className="text-xs text-blue-200">{focusStats.totalFocusTime}h total focus time</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 text-white shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Current Streak</CardTitle>
            <Flame className="h-5 w-5 text-orange-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{focusStats.streak}</div>
            <p className="text-xs text-blue-200">days in a row</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 text-white shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">XP Points</CardTitle>
            <Star className="h-5 w-5 text-yellow-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{focusStats.xp}</div>
            <div className="mt-2">
              <Progress value={((focusStats.xp % 500) / 500) * 100} className="h-2 bg-blue-400" />
            </div>
            <p className="text-xs text-blue-200 mt-1">{500 - (focusStats.xp % 500)} XP to next level</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glass-effect border-white/20 shadow-lg">
          <TabsTrigger
            value="timer"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-blue-100"
          >
            Timer
          </TabsTrigger>
          <TabsTrigger
            value="music"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-blue-100"
          >
            Focus Music
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-blue-100"
          >
            Leaderboard
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-blue-100"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-blue-100"
          >
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timer" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pomodoro Timer */}
            <Card className="glass-effect border-white/20 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">
                  {sessionType === "focus"
                    ? "Focus Time"
                    : sessionType === "short-break"
                      ? "Short Break"
                      : "Long Break"}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {sessionType === "focus" ? "Time to concentrate and get things done" : "Take a well-deserved break"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Timer Display */}
                <div className="text-center space-y-4">
                  <div className="relative w-64 h-64 mx-auto">
                    <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="white"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                        className="transition-all duration-1000 ease-in-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-white font-mono">{formatTime(timeLeft)}</div>
                        <div className="text-blue-100 text-sm mt-2">{Math.round(progress)}% complete</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Task */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-100">Current Task (Optional)</label>
                  <Input
                    placeholder="What are you working on?"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                  />
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  {!isActive ? (
                    <Button
                      onClick={startTimer}
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl px-8 py-4 text-lg font-semibold"
                    >
                      <Play className="h-6 w-6 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl px-8 py-4 text-lg font-semibold"
                    >
                      <Pause className="h-6 w-6 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button
                    onClick={resetTimer}
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 shadow-xl px-8 py-4 text-lg font-semibold"
                  >
                    <RotateCcw className="h-6 w-6 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Session Type Selector */}
                <div className="flex justify-center space-x-2">
                  {(["focus", "short-break", "long-break"] as const).map((type) => (
                    <Button
                      key={type}
                      onClick={() => {
                        setSessionType(type)
                        setTimeLeft(getSessionDuration(type))
                        setIsActive(false)
                      }}
                      variant={sessionType === type ? "default" : "outline"}
                      className={`${
                        sessionType === type ? "bg-white text-blue-600" : "border-white/30 text-white hover:bg-white/10"
                      } shadow-lg`}
                    >
                      {getSessionTypeIcon(type)}
                      <span className="ml-2 capitalize">{type.replace("-", " ")}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Session History & Settings */}
            <div className="space-y-6">
              {/* Today's Sessions */}
              <Card className="glass-effect border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Today's Sessions
                  </CardTitle>
                  <CardDescription className="text-blue-100">Your focus sessions today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sessions.slice(-5).map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getSessionTypeColor(session.type)}`} />
                          <div>
                            <p className="text-white text-sm font-medium capitalize">
                              {session.type.replace("-", " ")}
                            </p>
                            {session.task && <p className="text-blue-200 text-xs">{session.task}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm">{Math.round(session.duration / 60)}m</p>
                          <p className="text-blue-200 text-xs">
                            {session.completedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {sessions.length === 0 && (
                      <p className="text-blue-200 text-center py-4">No sessions completed today</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Settings */}
              <Card className="glass-effect border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Timer Settings
                  </CardTitle>
                  <CardDescription className="text-blue-100">Customize your focus sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-100">Focus</label>
                      <Input
                        type="number"
                        value={focusTime}
                        onChange={(e) => setFocusTime(Number(e.target.value))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-100">Short Break</label>
                      <Input
                        type="number"
                        value={shortBreakTime}
                        onChange={(e) => setShortBreakTime(Number(e.target.value))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-100">Long Break</label>
                      <Input
                        type="number"
                        value={longBreakTime}
                        onChange={(e) => setLongBreakTime(Number(e.target.value))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="music" className="space-y-6">
          <SpotifyPlayer className="max-w-4xl mx-auto" />
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          {/* Filters */}
          <Card className="glass-effect border-white/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-blue-200" />
                    <span className="text-white font-medium">Filter:</span>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="level">Level 5+</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">{filteredLeaderboard.length} users</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="glass-effect border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-yellow-300" />
                Focus Leaderboard
              </CardTitle>
              <CardDescription className="text-blue-100">
                Top performers this{" "}
                {filterPeriod === "today"
                  ? "day"
                  : filterPeriod === "week"
                    ? "week"
                    : filterPeriod === "month"
                      ? "month"
                      : "all time"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      entry.name === "You"
                        ? "bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30"
                        : "bg-white/10"
                    } transition-all hover:bg-white/15`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                              ? "bg-gray-400"
                              : index === 2
                                ? "bg-amber-600"
                                : "bg-blue-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <img
                        src={entry.avatar || "/placeholder.svg"}
                        alt={entry.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-white">{entry.name}</p>
                          {entry.isFriend && (
                            <Badge variant="outline" className="text-xs border-blue-300 text-blue-200">
                              Friend
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-blue-200">
                          <span>{entry.sessions} sessions</span>
                          <span>{entry.streak} day streak</span>
                          <span>Level {entry.level}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{entry.focusTime}h</div>
                      <div className="flex items-center space-x-1 mt-1">
                        {entry.badges.map((badge, i) => (
                          <span key={i} className="text-lg">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Weekly Progress */}
            <Card className="glass-effect border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Weekly Progress
                </CardTitle>
                <CardDescription className="text-blue-100">Your focus time over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                    const hours = [2.5, 3.2, 0, 4.1, 2.8, 5.2, 1.5][index]
                    return (
                      <div key={day} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-white">{day}</span>
                          <span className="text-blue-200">{hours}h</span>
                        </div>
                        <div className="flex space-x-1">
                          <Progress value={(hours / 6) * 100} className="flex-1 h-3" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Focus Insights */}
            <Card className="glass-effect border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Focus Insights
                </CardTitle>
                <CardDescription className="text-blue-100">AI-powered productivity analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="h-5 w-5 text-yellow-300" />
                    <span className="font-medium text-white">Peak Performance</span>
                  </div>
                  <p className="text-sm text-blue-200">
                    You're most productive between <strong>2-4 PM</strong> with 92% focus rate
                  </p>
                </div>

                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-emerald-300" />
                    <span className="font-medium text-white">Improvement</span>
                  </div>
                  <p className="text-sm text-blue-200">
                    Your focus time increased by <strong>23%</strong> this week compared to last week
                  </p>
                </div>

                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-blue-300" />
                    <span className="font-medium text-white">Recommendation</span>
                  </div>
                  <p className="text-sm text-blue-200">
                    Try <strong>30-minute</strong> focus sessions for complex tasks to maximize deep work
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Stats */}
          <Card className="glass-effect border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Detailed Statistics
              </CardTitle>
              <CardDescription className="text-blue-100">Comprehensive view of your focus patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bol text-white mb-2">89%</div>
                  <div className="text-sm text-blue-200">Session Completion Rate</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-2">26m</div>
                  <div className="text-sm text-blue-200">Average Session Length</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-2">4.2</div>
                  <div className="text-sm text-blue-200">Sessions per Day</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-2">92%</div>
                  <div className="text-sm text-blue-200">Focus Accuracy</div>
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
                    ? "glass-effect border-yellow-300/50 shadow-2xl"
                    : "bg-white/5 border-white/10 shadow-lg opacity-75"
                }`}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                        achievement.earned ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg" : "bg-white/10"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                  </div>
                  <CardTitle className={`text-lg ${achievement.earned ? "text-white" : "text-blue-200"}`}>
                    {achievement.title}
                  </CardTitle>
                  <CardDescription className={achievement.earned ? "text-blue-100" : "text-blue-300"}>
                    {achievement.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {achievement.earned ? (
                    <div className="space-y-2">
                      <Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30">Earned</Badge>
                      <div className="text-sm text-blue-200">+{achievement.xp} XP</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Badge variant="outline" className="border-white/30 text-blue-200">
                        Locked
                      </Badge>
                      <div className="text-sm text-blue-300">{achievement.xp} XP reward</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress to Next Achievement */}
          <Card className="glass-effect border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-300" />
                Next Achievement
              </CardTitle>
              <CardDescription className="text-blue-100">You're close to unlocking a new achievement!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <p className="font-medium text-white">Focus Master</p>
                      <p className="text-sm text-blue-200">Complete 50 focus sessions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">23/50</p>
                    <p className="text-xs text-blue-200">sessions</p>
                  </div>
                </div>
                <Progress value={(23 / 50) * 100} className="h-3" />
                <p className="text-sm text-blue-200 text-center">
                  27 more sessions to unlock this achievement and earn 500 XP!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
