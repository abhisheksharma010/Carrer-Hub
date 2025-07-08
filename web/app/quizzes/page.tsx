"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Brain,
  Clock,
  Trophy,
  Target,
  CheckCircle,
  Play,
  RotateCcw,
  Star,
  Medal,
  Crown,
  Award,
  Filter,
  Bell,
} from "lucide-react"

const quizCategories = [
  {
    id: "technical",
    name: "Technical Skills",
    description: "Test your programming and technical knowledge",
    icon: Brain,
    quizzes: [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        difficulty: "Beginner",
        questions: 20,
        duration: "15 min",
        attempts: 3,
        bestScore: 85,
        category: "Programming",
        contestId: "js-contest-2024",
      },
      {
        id: 2,
        title: "React Advanced Concepts",
        difficulty: "Advanced",
        questions: 25,
        duration: "20 min",
        attempts: 1,
        bestScore: 72,
        category: "Frontend",
        contestId: "react-masters-2024",
      },
      {
        id: 3,
        title: "System Design Basics",
        difficulty: "Intermediate",
        questions: 15,
        duration: "25 min",
        attempts: 0,
        bestScore: null,
        category: "Architecture",
        contestId: "system-design-challenge",
      },
    ],
  },
  {
    id: "aptitude",
    name: "Aptitude Tests",
    description: "Logical reasoning and problem-solving skills",
    icon: Target,
    quizzes: [
      {
        id: 4,
        title: "Logical Reasoning",
        difficulty: "Intermediate",
        questions: 30,
        duration: "45 min",
        attempts: 2,
        bestScore: 78,
        category: "Logic",
        contestId: "logic-masters-2024",
      },
      {
        id: 5,
        title: "Numerical Ability",
        difficulty: "Beginner",
        questions: 25,
        duration: "30 min",
        attempts: 1,
        bestScore: 92,
        category: "Math",
        contestId: "math-challenge-2024",
      },
    ],
  },
]

const contests = [
  {
    id: "js-contest-2024",
    name: "JavaScript Masters 2024",
    description: "Annual JavaScript programming contest",
    startDate: "2024-01-15",
    endDate: "2024-01-30",
    participants: 1250,
    prize: "$5000",
    status: "active",
    category: "Programming",
  },
  {
    id: "react-masters-2024",
    name: "React Masters Challenge",
    description: "Advanced React development contest",
    startDate: "2024-01-20",
    endDate: "2024-02-05",
    participants: 890,
    prize: "$3000",
    status: "upcoming",
    category: "Frontend",
  },
  {
    id: "system-design-challenge",
    name: "System Design Challenge",
    description: "Design scalable systems contest",
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    participants: 567,
    prize: "$4000",
    status: "active",
    category: "Architecture",
  },
]

const leaderboard = [
  {
    rank: 1,
    user: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Senior Developer",
      company: "Google",
    },
    score: 2847,
    quizzesTaken: 45,
    averageScore: 94,
    badges: ["🏆", "🥇", "⭐"],
  },
  {
    rank: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Full Stack Engineer",
      company: "Meta",
    },
    score: 2756,
    quizzesTaken: 42,
    averageScore: 91,
    badges: ["🥈", "⭐", "🔥"],
  },
  {
    rank: 3,
    user: {
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Software Architect",
      company: "Amazon",
    },
    score: 2689,
    quizzesTaken: 38,
    averageScore: 89,
    badges: ["🥉", "⭐"],
  },
  {
    rank: 4,
    user: {
      name: "Emily Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Frontend Developer",
      company: "Netflix",
    },
    score: 2634,
    quizzesTaken: 41,
    averageScore: 87,
    badges: ["⭐", "🔥"],
  },
  {
    rank: 5,
    user: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Backend Engineer",
      company: "Spotify",
    },
    score: 2578,
    quizzesTaken: 39,
    averageScore: 86,
    badges: ["⭐"],
  },
]

const sampleQuiz = {
  id: 1,
  title: "JavaScript Fundamentals",
  currentQuestion: 1,
  totalQuestions: 5,
  timeRemaining: 600,
  questions: [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var myVariable;", "variable myVariable;", "v myVariable;", "declare myVariable;"],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of an array?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: 1,
    },
  ],
}

export default function QuizzesPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [quizStarted, setQuizStarted] = useState(false)
  const [leaderboardFilter, setLeaderboardFilter] = useState("overall")
  const [contestFilter, setContestFilter] = useState("all")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getContestStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "ended":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  if (selectedQuiz && quizStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{selectedQuiz.title}</h1>
            <p className="text-muted-foreground">
              Question {sampleQuiz.currentQuestion} of {sampleQuiz.totalQuestions}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(sampleQuiz.timeRemaining)}</span>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setQuizStarted(false)
                setSelectedQuiz(null)
              }}
            >
              Exit Quiz
            </Button>
          </div>
        </div>

        <Progress value={(sampleQuiz.currentQuestion / sampleQuiz.totalQuestions) * 100} className="h-2" />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{sampleQuiz.questions[0].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
              {sampleQuiz.questions[0].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button disabled={!currentAnswer}>Next Question</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skill Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge and compete with others</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </Button>
          <Button>
            <Target className="h-4 w-4 mr-2" />
            Custom Quiz
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Taken</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">JavaScript Fundamentals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#23</div>
            <p className="text-xs text-muted-foreground">Top 5% globally</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Quizzes</TabsTrigger>
          <TabsTrigger value="contests">Contests</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="history">Quiz History</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {quizCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <category.icon className="h-6 w-6" />
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.quizzes.map((quiz) => (
                    <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="space-y-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">{quiz.title}</CardTitle>
                          <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{quiz.category}</Badge>
                          {quiz.contestId && (
                            <Badge variant="secondary" className="text-xs">
                              Contest
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center justify-between">
                            <span>Questions:</span>
                            <span>{quiz.questions}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Duration:</span>
                            <span>{quiz.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Attempts:</span>
                            <span>{quiz.attempts}</span>
                          </div>
                          {quiz.bestScore && (
                            <div className="flex items-center justify-between">
                              <span>Best Score:</span>
                              <span className="font-medium">{quiz.bestScore}%</span>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setSelectedQuiz(quiz)
                              setQuizStarted(true)
                            }}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            {quiz.attempts > 0 ? "Retake" : "Start Quiz"}
                          </Button>
                          {quiz.attempts > 0 && (
                            <Button size="sm" variant="outline">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="contests" className="space-y-6">
          <div className="flex items-center space-x-4">
            <Select value={contestFilter} onValueChange={setContestFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contests</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {contests.map((contest) => (
              <Card key={contest.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{contest.name}</CardTitle>
                      <CardDescription>{contest.description}</CardDescription>
                      <Badge className={getContestStatusColor(contest.status)}>{contest.status.toUpperCase()}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{contest.prize}</div>
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium">{new Date(contest.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-medium">{new Date(contest.endDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Participants</p>
                      <p className="font-medium">{contest.participants.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{contest.category}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {contest.status === "active" ? (
                      <Button className="flex-1">
                        <Trophy className="h-4 w-4 mr-2" />
                        Join Contest
                      </Button>
                    ) : contest.status === "upcoming" ? (
                      <Button variant="outline" className="flex-1">
                        <Bell className="h-4 w-4 mr-2" />
                        Notify Me
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1">
                        View Results
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="flex items-center space-x-4">
            <Select value={leaderboardFilter} onValueChange={setLeaderboardFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter leaderboard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall Ranking</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="aptitude">Aptitude</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Search users..." className="max-w-sm" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Global Leaderboard</span>
              </CardTitle>
              <CardDescription>Top performers across all quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                      entry.rank <= 3
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-center w-12 h-12">{getRankIcon(entry.rank)}</div>

                    <Avatar className="h-12 w-12">
                      <AvatarImage src={entry.user.avatar || "/placeholder.svg"} alt={entry.user.name} />
                      <AvatarFallback>
                        {entry.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{entry.user.name}</h3>
                        <div className="flex space-x-1">
                          {entry.badges.map((badge, index) => (
                            <span key={index} className="text-sm">
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {entry.user.title} at {entry.user.company}
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-2xl font-bold">{entry.score.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.quizzesTaken} quizzes • {entry.averageScore}% avg
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">Load More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quiz Attempts</CardTitle>
              <CardDescription>Your quiz performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    quiz: "JavaScript Fundamentals",
                    score: 85,
                    date: "2024-01-20",
                    status: "Passed",
                    contest: "JS Contest 2024",
                  },
                  {
                    quiz: "React Advanced Concepts",
                    score: 72,
                    date: "2024-01-18",
                    status: "Passed",
                    contest: "React Masters",
                  },
                  { quiz: "Logical Reasoning", score: 78, date: "2024-01-15", status: "Passed", contest: null },
                  {
                    quiz: "Numerical Ability",
                    score: 92,
                    date: "2024-01-12",
                    status: "Passed",
                    contest: "Math Challenge",
                  },
                ].map((attempt, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                      <h4 className="font-medium">{attempt.quiz}</h4>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground">{attempt.date}</p>
                        {attempt.contest && (
                          <Badge variant="outline" className="text-xs">
                            {attempt.contest}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">{attempt.score}%</div>
                        <Badge variant={attempt.status === "Passed" ? "default" : "destructive"}>
                          {attempt.status}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "First Quiz",
                description: "Complete your first quiz",
                earned: true,
                icon: Play,
                rarity: "common",
              },
              {
                title: "Perfect Score",
                description: "Score 100% on any quiz",
                earned: true,
                icon: Trophy,
                rarity: "rare",
              },
              {
                title: "Speed Demon",
                description: "Complete a quiz in under 5 minutes",
                earned: false,
                icon: Clock,
                rarity: "epic",
              },
              {
                title: "Knowledge Seeker",
                description: "Take 10 different quizzes",
                earned: true,
                icon: Brain,
                rarity: "common",
              },
              {
                title: "Contest Winner",
                description: "Win first place in any contest",
                earned: false,
                icon: Crown,
                rarity: "legendary",
              },
              {
                title: "High Achiever",
                description: "Maintain 80%+ average score",
                earned: true,
                icon: Star,
                rarity: "rare",
              },
            ].map((achievement, index) => (
              <Card
                key={index}
                className={`${achievement.earned ? "bg-muted/50" : "opacity-60"} hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-4 text-center space-y-3">
                  <div
                    className={`p-3 rounded-full mx-auto w-fit ${
                      achievement.rarity === "legendary"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : achievement.rarity === "epic"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : achievement.rarity === "rare"
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-gray-400 to-gray-600"
                    }`}
                  >
                    <achievement.icon className={`h-6 w-6 text-white`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {achievement.rarity}
                    </Badge>
                  </div>
                  {achievement.earned && (
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Earned
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
