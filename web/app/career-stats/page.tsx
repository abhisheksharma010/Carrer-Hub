"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Eye, MousePointer, Phone, Users, Target, Award } from "lucide-react"

const profileViewsData = [
  { month: "Jan", views: 45 },
  { month: "Feb", views: 52 },
  { month: "Mar", views: 48 },
  { month: "Apr", views: 61 },
  { month: "May", views: 55 },
  { month: "Jun", views: 73 },
]

const applicationData = [
  { month: "Jan", applied: 12, callbacks: 3 },
  { month: "Feb", applied: 15, callbacks: 4 },
  { month: "Mar", applied: 18, callbacks: 5 },
  { month: "Apr", applied: 22, callbacks: 8 },
  { month: "May", applied: 19, callbacks: 6 },
  { month: "Jun", applied: 25, callbacks: 10 },
]

const skillData = [
  { name: "JavaScript", value: 85, color: "#8884d8" },
  { name: "React", value: 78, color: "#82ca9d" },
  { name: "Node.js", value: 72, color: "#ffc658" },
  { name: "Python", value: 65, color: "#ff7300" },
]

export default function CareerStatsPage() {
  const stats = [
    {
      title: "Profile Views",
      value: "334",
      change: "+12%",
      icon: Eye,
      description: "Last 30 days",
    },
    {
      title: "Application CTR",
      value: "24.5%",
      change: "+3.2%",
      icon: MousePointer,
      description: "Click-through rate",
    },
    {
      title: "Callback Ratio",
      value: "18.2%",
      change: "+5.1%",
      icon: Phone,
      description: "Interview requests",
    },
    {
      title: "Network Growth",
      value: "156",
      change: "+28",
      icon: Users,
      description: "New connections",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Career Statistics</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Last 6 months</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Profile Views Trend</CardTitle>
                <CardDescription>Your profile visibility over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    views: {
                      label: "Views",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={profileViewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Top Performer</p>
                    <p className="text-xs text-muted-foreground">Ranked #12 this month</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Target className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Goal Achieved</p>
                    <p className="text-xs text-muted-foreground">50+ applications sent</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Users className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Network Milestone</p>
                    <p className="text-xs text-muted-foreground">500+ connections</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Performance</CardTitle>
              <CardDescription>Applications sent vs callbacks received</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  applied: {
                    label: "Applied",
                    color: "hsl(var(--chart-1))",
                  },
                  callbacks: {
                    label: "Callbacks",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="applied" fill="var(--color-applied)" />
                    <Bar dataKey="callbacks" fill="var(--color-callbacks)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Proficiency</CardTitle>
                <CardDescription>Your current skill levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillData.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.value}%</span>
                    </div>
                    <Progress value={skill.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>Breakdown of your expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Proficiency",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {skillData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Goals</CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Job Applications</span>
                    <span className="text-sm text-muted-foreground">25/30</span>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Network Connections</span>
                    <span className="text-sm text-muted-foreground">18/20</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Skill Assessments</span>
                    <span className="text-sm text-muted-foreground">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career Milestones</CardTitle>
                <CardDescription>Long-term objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Land Senior Developer Role</p>
                    <p className="text-xs text-muted-foreground">Target: Q2 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Complete AWS Certification</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Build Portfolio Website</p>
                    <p className="text-xs text-muted-foreground">Planned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
