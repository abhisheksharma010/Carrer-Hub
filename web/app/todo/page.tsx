"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  CalendarIcon,
  Clock,
  Search,
  CheckCircle,
  MoreHorizontal,
  Target,
  TrendingUp,
  BarChart3,
  Timer,
  Zap,
  ListTodo,
  AlertCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { format } from "date-fns"

interface Task {
  id: string
  title: string
  description?: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "todo" | "in-progress" | "completed"
  dueDate?: Date
  estimatedTime?: number
  actualTime?: number
  tags: string[]
  subtasks?: Task[]
  createdAt: Date
  completedAt?: Date
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete React Advanced Course",
    description: "Finish the advanced React patterns and hooks course on Udemy",
    category: "Learning",
    priority: "high",
    status: "in-progress",
    dueDate: new Date("2024-02-15"),
    estimatedTime: 20,
    actualTime: 12,
    tags: ["react", "javascript", "course"],
    createdAt: new Date("2024-01-10"),
    subtasks: [
      {
        id: "1-1",
        title: "Watch Context API lessons",
        category: "Learning",
        priority: "medium",
        status: "completed",
        estimatedTime: 3,
        actualTime: 2.5,
        tags: ["react"],
        createdAt: new Date("2024-01-10"),
        completedAt: new Date("2024-01-12"),
      },
      {
        id: "1-2",
        title: "Complete custom hooks project",
        category: "Learning",
        priority: "medium",
        status: "in-progress",
        estimatedTime: 5,
        actualTime: 3,
        tags: ["react", "hooks"],
        createdAt: new Date("2024-01-10"),
      },
      {
        id: "1-3",
        title: "Build final project",
        category: "Learning",
        priority: "high",
        status: "todo",
        estimatedTime: 8,
        actualTime: 0,
        tags: ["react", "project"],
        createdAt: new Date("2024-01-10"),
      },
    ],
  },
  {
    id: "2",
    title: "Prepare for AWS Certification",
    description: "Study for AWS Solutions Architect Associate exam",
    category: "Career",
    priority: "urgent",
    status: "todo",
    dueDate: new Date("2024-03-01"),
    estimatedTime: 40,
    actualTime: 0,
    tags: ["aws", "certification", "cloud"],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    title: "Update Portfolio Website",
    description: "Add new projects and improve design",
    category: "Personal",
    priority: "medium",
    status: "completed",
    dueDate: new Date("2024-01-20"),
    estimatedTime: 8,
    actualTime: 10,
    tags: ["portfolio", "design", "projects"],
    createdAt: new Date("2024-01-05"),
    completedAt: new Date("2024-01-18"),
  },
  {
    id: "4",
    title: "Learn System Design",
    description: "Study distributed systems and scalability patterns",
    category: "Learning",
    priority: "high",
    status: "todo",
    dueDate: new Date("2024-04-01"),
    estimatedTime: 30,
    actualTime: 0,
    tags: ["system-design", "architecture", "scalability"],
    createdAt: new Date("2024-01-20"),
  },
]

const categories = ["All", "Learning", "Career", "Personal", "Work", "Health"]
const priorities = ["All", "low", "medium", "high", "urgent"]
const statuses = ["All", "todo", "in-progress", "completed"]

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("tasks")
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set())

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = selectedCategory === "All" || task.category === selectedCategory
    const matchesPriority = selectedPriority === "All" || task.priority === selectedPriority
    const matchesStatus = selectedStatus === "All" || task.status === selectedStatus
    const matchesSearch = searchQuery === "" || task.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesPriority && matchesStatus && matchesSearch
  })

  // Calculate statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length
  const overdueTasks = tasks.filter((t) => t.dueDate && t.dueDate < new Date() && t.status !== "completed").length

  const totalEstimatedTime = tasks.reduce((sum, task) => sum + (task.estimatedTime || 0), 0)
  const totalActualTime = tasks.reduce((sum, task) => sum + (task.actualTime || 0), 0)
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "todo":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              completedAt: newStatus === "completed" ? new Date() : undefined,
            }
          : task,
      ),
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Smart Todo Manager
          </h1>
          <p className="text-blue-700 text-lg">Organize your tasks with time tracking and progress analytics</p>
        </div>
        <Button onClick={() => setShowNewTaskForm(true)} className="bg-blue-500 hover:bg-blue-600 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Total Tasks</CardTitle>
            <ListTodo className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTasks}</div>
            <div className="mt-2">
              <Progress value={completionRate} className="h-2 bg-blue-400" />
            </div>
            <p className="text-xs text-blue-200 mt-1">{completionRate.toFixed(0)}% completion rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">Completed</CardTitle>
            <CheckCircle className="h-5 w-5 text-emerald-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedTasks}</div>
            <p className="text-xs text-emerald-200">{inProgressTasks} in progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-100">Time Tracked</CardTitle>
            <Timer className="h-5 w-5 text-amber-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalActualTime}h</div>
            <p className="text-xs text-amber-200">of {totalEstimatedTime}h estimated</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-100">Overdue</CardTitle>
            <AlertCircle className="h-5 w-5 text-red-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overdueTasks}</div>
            <p className="text-xs text-red-200">tasks need attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/70 backdrop-blur-sm border border-blue-200 shadow-lg">
          <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Calendar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          {/* New Task Form */}
          {showNewTaskForm && (
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-blue-800">Create New Task</CardTitle>
                <CardDescription className="text-blue-600">Add a new task to your todo list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Task Title</label>
                    <Input placeholder="e.g., Complete project documentation" className="border-blue-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Category</label>
                    <Select>
                      <SelectTrigger className="border-blue-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="learning">Learning</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Priority</label>
                    <Select>
                      <SelectTrigger className="border-blue-200">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Estimated Time (hours)</label>
                    <Input type="number" placeholder="8" className="border-blue-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Due Date</label>
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">Tags</label>
                    <Input placeholder="react, javascript, course (comma separated)" className="border-blue-200" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-800">Description</label>
                  <Textarea placeholder="Describe your task in detail..." className="border-blue-200" />
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-blue-500 hover:bg-blue-600">Create Task</Button>
                  <Button variant="outline" onClick={() => setShowNewTaskForm(false)} className="border-blue-200">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-blue-600" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 border-blue-200"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-32 border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-32 border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32 border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={(checked) => updateTaskStatus(task.id, checked ? "completed" : "todo")}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3
                            className={`text-lg font-semibold ${
                              task.status === "completed" ? "line-through text-gray-500" : "text-blue-900"
                            }`}
                          >
                            {task.title}
                          </h3>
                          {task.subtasks && task.subtasks.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleTaskExpansion(task.id)}
                              className="p-1 h-6 w-6"
                            >
                              {expandedTasks.has(task.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                        {task.description && <p className="text-sm text-blue-700">{task.description}</p>}
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            {task.category}
                          </Badge>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          {task.dueDate && (
                            <Badge variant="outline" className="border-blue-300 text-blue-700">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {format(task.dueDate, "MMM dd")}
                            </Badge>
                          )}
                        </div>
                        {task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {task.estimatedTime && (
                        <div className="text-right text-sm">
                          <div className="text-blue-600 font-medium">
                            {task.actualTime || 0}h / {task.estimatedTime}h
                          </div>
                          <Progress
                            value={((task.actualTime || 0) / task.estimatedTime) * 100}
                            className="w-16 h-2 mt-1"
                          />
                        </div>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Subtasks */}
                  {task.subtasks && expandedTasks.has(task.id) && (
                    <div className="ml-6 pl-4 border-l-2 border-blue-200 space-y-3">
                      {task.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={subtask.status === "completed"}
                              onCheckedChange={(checked) =>
                                updateTaskStatus(subtask.id, checked ? "completed" : "todo")
                              }
                            />
                            <div>
                              <p
                                className={`text-sm font-medium ${
                                  subtask.status === "completed" ? "line-through text-gray-500" : "text-blue-900"
                                }`}
                              >
                                {subtask.title}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={getStatusColor(subtask.status)} variant="outline">
                                  {subtask.status}
                                </Badge>
                                {subtask.estimatedTime && (
                                  <span className="text-xs text-blue-600">
                                    {subtask.actualTime || 0}h / {subtask.estimatedTime}h
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Productivity Analytics */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Productivity Analytics
                </CardTitle>
                <CardDescription className="text-blue-600">Your task completion patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">Completion Rate</span>
                    <span className="text-sm text-blue-600">{completionRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={completionRate} className="h-3" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">Time Accuracy</span>
                    <span className="text-sm text-blue-600">
                      {totalEstimatedTime > 0 ? ((totalActualTime / totalEstimatedTime) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <Progress
                    value={totalEstimatedTime > 0 ? (totalActualTime / totalEstimatedTime) * 100 : 0}
                    className="h-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{totalActualTime}</div>
                    <div className="text-sm text-blue-500">Hours Logged</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-600">{completedTasks}</div>
                    <div className="text-sm text-emerald-500">Tasks Done</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Target className="h-5 w-5 mr-2" />
                  Category Breakdown
                </CardTitle>
                <CardDescription className="text-blue-600">Tasks by category and priority</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Learning", "Career", "Personal", "Work"].map((category) => {
                    const categoryTasks = tasks.filter((t) => t.category === category)
                    const categoryCompleted = categoryTasks.filter((t) => t.status === "completed").length
                    const categoryProgress =
                      categoryTasks.length > 0 ? (categoryCompleted / categoryTasks.length) * 100 : 0

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-blue-800">{category}</span>
                          <span className="text-blue-600">
                            {categoryCompleted}/{categoryTasks.length} completed
                          </span>
                        </div>
                        <Progress value={categoryProgress} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time Tracking Insights */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Clock className="h-5 w-5 mr-2" />
                Time Tracking Insights
              </CardTitle>
              <CardDescription className="text-blue-600">
                Analysis of your time estimation and actual time spent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Timer className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Average Task Time</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {completedTasks > 0 ? (totalActualTime / completedTasks).toFixed(1) : 0}h
                  </div>
                  <p className="text-sm text-blue-700">per completed task</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium text-emerald-800">Estimation Accuracy</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {totalEstimatedTime > 0
                      ? Math.abs(100 - (totalActualTime / totalEstimatedTime) * 100).toFixed(0)
                      : 0}
                    %
                  </div>
                  <p className="text-sm text-emerald-700">accuracy rate</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-amber-600" />
                    <span className="font-medium text-amber-800">Productivity Score</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-600 mb-1">
                    {Math.min(
                      100,
                      Math.round(completionRate + (totalActualTime / Math.max(totalEstimatedTime, 1)) * 20),
                    )}
                  </div>
                  <p className="text-sm text-amber-700">out of 100</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Task Calendar
              </CardTitle>
              <CardDescription className="text-blue-600">View your tasks by due date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border border-blue-200"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-blue-800">
                    {selectedDate ? `Tasks for ${format(selectedDate, "MMMM dd, yyyy")}` : "Select a date"}
                  </h3>
                  {selectedDate && (
                    <div className="space-y-3">
                      {tasks
                        .filter(
                          (task) =>
                            task.dueDate && format(task.dueDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"),
                        )
                        .map((task) => (
                          <div key={task.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-blue-900">{task.title}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                                </div>
                              </div>
                              {task.estimatedTime && (
                                <div className="text-sm text-blue-600">{task.estimatedTime}h estimated</div>
                              )}
                            </div>
                          </div>
                        ))}
                      {tasks.filter(
                        (task) =>
                          task.dueDate && format(task.dueDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"),
                      ).length === 0 && <p className="text-sm text-blue-600">No tasks scheduled for this date</p>}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
