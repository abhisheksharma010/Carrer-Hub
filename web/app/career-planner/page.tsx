"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoadmapTree } from "@/components/roadmap-tree"
import {
  Target,
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  BookOpen,
  Award,
  Briefcase,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  BarChart3,
  Map,
  Zap,
  Brain,
  Rocket,
  Trophy,
  GitBranch,
} from "lucide-react"

const careerRoadmapNodes = [
  {
    id: "current",
    title: "Junior Developer",
    status: "completed" as const,
    type: "milestone" as const,
    position: { x: 100, y: 100 },
    description: "Your current position with 1-2 years experience",
  },
  {
    id: "mid-level",
    title: "Mid-Level Developer",
    status: "current" as const,
    type: "milestone" as const,
    position: { x: 300, y: 100 },
    description: "3-5 years experience, leading small projects",
  },
  {
    id: "senior",
    title: "Senior Developer",
    status: "pending" as const,
    type: "milestone" as const,
    position: { x: 500, y: 100 },
    description: "5-8 years experience, technical leadership",
  },
  {
    id: "lead",
    title: "Tech Lead",
    status: "locked" as const,
    type: "milestone" as const,
    position: { x: 700, y: 100 },
    description: "8+ years experience, team leadership",
  },
]

const skillGaps = [
  {
    skill: "React Advanced Patterns",
    currentLevel: 3,
    targetLevel: 5,
    importance: "High",
    marketDemand: 92,
    salaryImpact: "+15%",
    timeToLearn: "3 months",
    resources: [
      { title: "Advanced React Course", type: "course", provider: "Udemy", rating: 4.8 },
      { title: "React Patterns Documentation", type: "docs", provider: "React", rating: 4.9 },
      { title: "Advanced React Hooks", type: "tutorial", provider: "YouTube", rating: 4.7 },
    ],
  },
  {
    skill: "System Design",
    currentLevel: 2,
    targetLevel: 4,
    importance: "Critical",
    marketDemand: 88,
    salaryImpact: "+25%",
    timeToLearn: "6 months",
    resources: [
      { title: "System Design Interview", type: "book", provider: "Amazon", rating: 4.6 },
      { title: "Designing Data-Intensive Applications", type: "book", provider: "O'Reilly", rating: 4.8 },
      { title: "System Design Primer", type: "github", provider: "GitHub", rating: 4.9 },
    ],
  },
  {
    skill: "AWS Cloud Services",
    currentLevel: 1,
    targetLevel: 4,
    importance: "High",
    marketDemand: 95,
    salaryImpact: "+20%",
    timeToLearn: "4 months",
    resources: [
      { title: "AWS Solutions Architect", type: "certification", provider: "AWS", rating: 4.7 },
      { title: "AWS Cloud Practitioner", type: "course", provider: "A Cloud Guru", rating: 4.8 },
      { title: "AWS Documentation", type: "docs", provider: "AWS", rating: 4.5 },
    ],
  },
  {
    skill: "TypeScript",
    currentLevel: 2,
    targetLevel: 4,
    importance: "Medium",
    marketDemand: 78,
    salaryImpact: "+10%",
    timeToLearn: "2 months",
    resources: [
      { title: "TypeScript Handbook", type: "docs", provider: "TypeScript", rating: 4.9 },
      { title: "Understanding TypeScript", type: "course", provider: "Udemy", rating: 4.6 },
      { title: "TypeScript Deep Dive", type: "book", provider: "GitBook", rating: 4.7 },
    ],
  },
]

const marketInsights = {
  averageSalary: {
    current: 75000,
    target: 120000,
    growth: "+60%",
  },
  jobGrowth: "+22%",
  topLocations: [
    { city: "San Francisco", avgSalary: 145000, jobs: 2400 },
    { city: "New York", avgSalary: 125000, jobs: 1800 },
    { city: "Seattle", avgSalary: 135000, jobs: 1600 },
    { city: "Austin", avgSalary: 110000, jobs: 1200 },
    { city: "Boston", avgSalary: 115000, jobs: 1000 },
  ],
  inDemandSkills: [
    { skill: "React", demand: 95, growth: "+18%" },
    { skill: "Node.js", demand: 88, growth: "+15%" },
    { skill: "AWS", demand: 92, growth: "+25%" },
    { skill: "Python", demand: 90, growth: "+20%" },
    { skill: "Docker", demand: 85, growth: "+22%" },
  ],
}

const aiRecommendations = [
  {
    id: 1,
    type: "skill",
    title: "Focus on System Design",
    description: "Based on your target role, system design is critical for senior positions",
    priority: "High",
    impact: "Career Advancement",
    timeframe: "Next 3 months",
    relevanceScore: 95,
  },
  {
    id: 2,
    type: "certification",
    title: "AWS Solutions Architect",
    description: "Cloud skills are in high demand and offer significant salary increases",
    priority: "High",
    impact: "Salary Increase",
    timeframe: "Next 6 months",
    relevanceScore: 88,
  },
  {
    id: 3,
    type: "project",
    title: "Build a Microservices Project",
    description: "Hands-on experience with distributed systems will strengthen your profile",
    priority: "Medium",
    impact: "Portfolio Enhancement",
    timeframe: "Next 4 months",
    relevanceScore: 82,
  },
  {
    id: 4,
    type: "networking",
    title: "Join Tech Communities",
    description: "Networking can accelerate career growth and open new opportunities",
    priority: "Medium",
    impact: "Career Opportunities",
    timeframe: "Ongoing",
    relevanceScore: 75,
  },
]

const progressMetrics = {
  overallProgress: 65,
  skillsCompleted: 8,
  totalSkills: 15,
  certificationsEarned: 2,
  projectsCompleted: 5,
  monthsToGoal: 18,
}

export default function CareerPlannerPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedRole, setSelectedRole] = useState("senior-developer")

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            AI Career Planner
          </h1>
          <p className="text-blue-700 text-lg">Plan your career path with AI-powered insights and recommendations</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-48 border-blue-200">
              <SelectValue placeholder="Select target role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="senior-developer">Senior Developer</SelectItem>
              <SelectItem value="tech-lead">Tech Lead</SelectItem>
              <SelectItem value="engineering-manager">Engineering Manager</SelectItem>
              <SelectItem value="principal-engineer">Principal Engineer</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-500 hover:bg-blue-600 shadow-lg">
            <Brain className="h-4 w-4 mr-2" />
            Update Plan
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Career Progress</CardTitle>
            <Target className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progressMetrics.overallProgress}%</div>
            <div className="mt-2">
              <Progress value={progressMetrics.overallProgress} className="h-2 bg-blue-400" />
            </div>
            <p className="text-xs text-blue-200 mt-1">{progressMetrics.monthsToGoal} months to goal</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">Skills Mastered</CardTitle>
            <Award className="h-5 w-5 text-emerald-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progressMetrics.skillsCompleted}</div>
            <p className="text-xs text-emerald-200">of {progressMetrics.totalSkills} target skills</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Salary Potential</CardTitle>
            <DollarSign className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${marketInsights.averageSalary.target.toLocaleString()}</div>
            <p className="text-xs text-purple-200">{marketInsights.averageSalary.growth} increase potential</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Market Demand</CardTitle>
            <TrendingUp className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{marketInsights.jobGrowth}</div>
            <p className="text-xs text-orange-200">job growth rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/70 backdrop-blur-sm border border-blue-200 shadow-lg">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Career Roadmap
          </TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Skill Gaps
          </TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Market Insights
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            AI Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Progress Analytics */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Progress Analytics
                </CardTitle>
                <CardDescription className="text-blue-600">Your career development metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">Technical Skills</span>
                    <span className="text-sm text-blue-600">8/12 completed</span>
                  </div>
                  <Progress value={67} className="h-3" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">Leadership Skills</span>
                    <span className="text-sm text-blue-600">3/8 completed</span>
                  </div>
                  <Progress value={38} className="h-3" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">Certifications</span>
                    <span className="text-sm text-blue-600">2/5 earned</span>
                  </div>
                  <Progress value={40} className="h-3" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">Portfolio Projects</span>
                    <span className="text-sm text-blue-600">5/8 completed</span>
                  </div>
                  <Progress value={63} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Rocket className="h-5 w-5 mr-2" />
                  Next Steps
                </CardTitle>
                <CardDescription className="text-blue-600">Recommended actions for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Complete System Design Course",
                      description: "Focus on distributed systems and scalability",
                      priority: "High",
                      timeframe: "2 weeks",
                      progress: 60,
                    },
                    {
                      title: "Build Microservices Project",
                      description: "Demonstrate practical system design skills",
                      priority: "High",
                      timeframe: "1 month",
                      progress: 20,
                    },
                    {
                      title: "AWS Solutions Architect Prep",
                      description: "Study for certification exam",
                      priority: "Medium",
                      timeframe: "6 weeks",
                      progress: 0,
                    },
                    {
                      title: "Join Tech Leadership Community",
                      description: "Network with senior engineers",
                      priority: "Medium",
                      timeframe: "Ongoing",
                      progress: 0,
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-900">{step.title}</h4>
                          <p className="text-sm text-blue-700 mt-1">{step.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getPriorityColor(step.priority)} text-white text-xs`}>
                            {step.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-blue-600 mb-2">
                        <span>{step.timeframe}</span>
                        <span>{step.progress}% complete</span>
                      </div>
                      <Progress value={step.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Timeline */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Clock className="h-5 w-5 mr-2" />
                Career Timeline
              </CardTitle>
              <CardDescription className="text-blue-600">Your projected career progression</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-blue-300" />

                <div className="space-y-8">
                  {[
                    {
                      date: "Now",
                      title: "Junior Developer",
                      description: "Current position with 2 years experience",
                      status: "current",
                      salary: "$75,000",
                    },
                    {
                      date: "6 months",
                      title: "Mid-Level Developer",
                      description: "Promoted with expanded responsibilities",
                      status: "planned",
                      salary: "$90,000",
                    },
                    {
                      date: "18 months",
                      title: "Senior Developer",
                      description: "Technical leadership and mentoring role",
                      status: "target",
                      salary: "$120,000",
                    },
                    {
                      date: "3 years",
                      title: "Tech Lead",
                      description: "Leading development team and architecture decisions",
                      status: "future",
                      salary: "$150,000",
                    },
                  ].map((milestone, index) => (
                    <div key={index} className="relative flex items-start space-x-4">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          milestone.status === "current"
                            ? "bg-blue-500 border-blue-500"
                            : milestone.status === "planned"
                              ? "bg-emerald-500 border-emerald-500"
                              : milestone.status === "target"
                                ? "bg-amber-500 border-amber-500"
                                : "bg-gray-300 border-gray-300"
                        } shadow-sm`}
                      />
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-blue-900">{milestone.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                              {milestone.date}
                            </Badge>
                            <Badge className="bg-emerald-100 text-emerald-800 text-xs">{milestone.salary}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-blue-700">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Map className="h-6 w-6 mr-2" />
                Interactive Career Roadmap
              </CardTitle>
              <CardDescription className="text-blue-600">
                Visual representation of your career progression with skill requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <RoadmapTree
                nodes={careerRoadmapNodes}
                onNodeClick={(node) => console.log("Selected career milestone:", node)}
              />
            </CardContent>
          </Card>

          {/* Detailed Career Path */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <GitBranch className="h-5 w-5 mr-2" />
                Detailed Career Path Tree
              </CardTitle>
              <CardDescription className="text-blue-600">
                Comprehensive breakdown of skills and milestones for each career level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                {[
                  {
                    level: "Junior Developer (Current)",
                    status: "completed",
                    skills: ["HTML/CSS", "JavaScript", "React Basics", "Git", "REST APIs"],
                    responsibilities: ["Feature development", "Bug fixes", "Code reviews"],
                    timeframe: "0-2 years",
                  },
                  {
                    level: "Mid-Level Developer (Next 6 months)",
                    status: "current",
                    skills: ["Advanced React", "Node.js", "Database Design", "Testing", "CI/CD"],
                    responsibilities: ["Feature ownership", "Technical decisions", "Junior mentoring"],
                    timeframe: "2-4 years",
                  },
                  {
                    level: "Senior Developer (Target)",
                    status: "pending",
                    skills: ["System Design", "Architecture", "Performance Optimization", "Security", "Cloud Services"],
                    responsibilities: ["Technical leadership", "Architecture decisions", "Cross-team collaboration"],
                    timeframe: "4-7 years",
                  },
                  {
                    level: "Tech Lead (Future)",
                    status: "locked",
                    skills: ["Team Leadership", "Project Management", "Strategic Planning", "Stakeholder Management"],
                    responsibilities: ["Team management", "Technical strategy", "Resource planning"],
                    timeframe: "7+ years",
                  },
                ].map((level, index) => (
                  <div key={index} className="relative mb-8 last:mb-0">
                    {/* Connection line */}
                    {index < 3 && <div className="absolute left-6 top-16 w-px h-16 bg-blue-300" />}

                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-blue-300 shadow-sm">
                        {level.status === "completed" && <CheckCircle className="h-6 w-6 text-emerald-600" />}
                        {level.status === "current" && <Target className="h-6 w-6 text-blue-600" />}
                        {level.status === "pending" && <Clock className="h-6 w-6 text-amber-600" />}
                        {level.status === "locked" && <Trophy className="h-6 w-6 text-gray-400" />}
                      </div>

                      <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-blue-900">{level.level}</h3>
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            {level.timeframe}
                          </Badge>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h4 className="font-medium text-blue-800 mb-2">Required Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {level.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className={`text-xs ${
                                    level.status === "completed"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : level.status === "current"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-blue-800 mb-2">Key Responsibilities</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              {level.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-center">
                                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500" />
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-6">
            {skillGaps.map((skill, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-blue-900">{skill.skill}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getImportanceColor(skill.importance)}>{skill.importance}</Badge>
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {skill.timeToLearn}
                        </Badge>
                        <Badge className="bg-emerald-100 text-emerald-800">{skill.salaryImpact}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{skill.marketDemand}%</div>
                      <div className="text-sm text-blue-500">Market Demand</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Skill Level Progress */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-800">Skill Level Progress</span>
                      <span className="text-sm text-blue-600">
                        Level {skill.currentLevel} → {skill.targetLevel}
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={(skill.currentLevel / 5) * 100} className="h-4" />
                      <div
                        className="absolute top-0 h-4 bg-blue-200 rounded-full opacity-50"
                        style={{ width: `${(skill.targetLevel / 5) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-blue-600">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                      <span>Master</span>
                    </div>
                  </div>

                  {/* Learning Resources */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center text-blue-800">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Recommended Learning Resources
                    </h4>
                    <div className="grid gap-3 md:grid-cols-3">
                      {skill.resources.map((resource, i) => (
                        <div
                          key={i}
                          className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-sm text-blue-900 line-clamp-2">{resource.title}</h5>
                            <div className="flex items-center space-x-1 ml-2">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-blue-600">{resource.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                              {resource.type}
                            </Badge>
                            <span className="text-xs text-blue-500">{resource.provider}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-purple-800">AI Insight</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Based on current market trends, mastering {skill.skill} could increase your salary by{" "}
                      <strong>{skill.salaryImpact}</strong> and make you eligible for{" "}
                      <strong>{Math.floor(skill.marketDemand * 0.8)}%</strong> more job opportunities. The optimal
                      learning path would be to start with the highest-rated course and supplement with hands-on
                      projects.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Salary Insights */}
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Salary Insights
                </CardTitle>
                <CardDescription className="text-blue-600">Market salary data for your target role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-emerald-600">
                    ${marketInsights.averageSalary.target.toLocaleString()}
                  </div>
                  <p className="text-sm text-blue-600">Average Senior Developer Salary</p>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    {marketInsights.averageSalary.growth} from current
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Current Salary</span>
                    <span className="font-bold text-blue-600">
                      ${marketInsights.averageSalary.current.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm font-medium text-emerald-800">Target Salary</span>
                    <span className="font-bold text-emerald-600">
                      ${marketInsights.averageSalary.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-800">Potential Increase</span>
                    <span className="font-bold text-purple-600">
                      ${(marketInsights.averageSalary.target - marketInsights.averageSalary.current).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Locations */}
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <MapPin className="h-5 w-5 mr-2" />
                  Top Locations
                </CardTitle>
                <CardDescription className="text-blue-600">Best cities for senior developers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights.topLocations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-blue-900">{location.city}</p>
                          <p className="text-sm text-blue-600">{location.jobs} open positions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">${location.avgSalary.toLocaleString()}</p>
                        <p className="text-xs text-blue-500">avg salary</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* In-Demand Skills */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <TrendingUp className="h-5 w-5 mr-2" />
                In-Demand Skills
              </CardTitle>
              <CardDescription className="text-blue-600">Most sought-after skills in the market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                {marketInsights.inDemandSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="text-center space-y-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
                  >
                    <div className="text-2xl font-bold text-blue-600">{skill.demand}%</div>
                    <div className="space-y-1">
                      <p className="font-medium text-blue-900">{skill.skill}</p>
                      <Badge className="bg-emerald-100 text-emerald-800 text-xs">{skill.growth}</Badge>
                    </div>
                    <Progress value={skill.demand} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Trends */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <BarChart3 className="h-5 w-5 mr-2" />
                Market Trends
              </CardTitle>
              <CardDescription className="text-blue-600">Industry insights and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium text-emerald-800">Job Growth</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">+22%</div>
                  <p className="text-sm text-emerald-700">
                    Software development jobs are expected to grow 22% by 2030, much faster than average
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Remote Work</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">68%</div>
                  <p className="text-sm text-blue-700">
                    Of senior developer positions now offer remote or hybrid work options
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-800">AI Impact</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">+35%</div>
                  <p className="text-sm text-purple-700">
                    Demand for AI-aware developers has increased 35% in the past year
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6">
            {aiRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        <CardTitle className="text-blue-900">{recommendation.title}</CardTitle>
                      </div>
                      <CardDescription className="text-blue-700">{recommendation.description}</CardDescription>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getPriorityColor(recommendation.priority)} text-white`}>
                          {recommendation.priority} Priority
                        </Badge>
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {recommendation.timeframe}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800">{recommendation.impact}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{recommendation.relevanceScore}%</div>
                      <div className="text-sm text-blue-500">Relevance</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {recommendation.type === "skill" && <BookOpen className="h-5 w-5 text-blue-600" />}
                        {recommendation.type === "certification" && <Award className="h-5 w-5 text-blue-600" />}
                        {recommendation.type === "project" && <Briefcase className="h-5 w-5 text-blue-600" />}
                        {recommendation.type === "networking" && <Users className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-800 capitalize">
                          {recommendation.type} Recommendation
                        </p>
                        <p className="text-xs text-blue-600">AI-powered suggestion based on your profile</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                        Start Now
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-600">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insights Summary */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Brain className="h-6 w-6 mr-2" />
                AI Career Analysis Summary
              </CardTitle>
              <CardDescription className="text-purple-700">
                Comprehensive analysis of your career trajectory and optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-white/70 rounded-xl border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-2">Strengths</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Strong foundation in React and JavaScript</li>
                    <li>• Consistent learning pattern and growth mindset</li>
                    <li>• Good understanding of modern development practices</li>
                    <li>• Active in code reviews and collaboration</li>
                  </ul>
                </div>
                <div className="p-4 bg-white/70 rounded-xl border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-2">Growth Areas</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• System design and architecture skills</li>
                    <li>• Cloud platform expertise (AWS/Azure)</li>
                    <li>• Leadership and mentoring experience</li>
                    <li>• Cross-functional collaboration skills</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-white/70 rounded-xl border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">Recommended Focus for Next 6 Months</h4>
                <p className="text-sm text-purple-700">
                  Based on market analysis and your career goals, prioritize <strong>system design</strong> and{" "}
                  <strong>cloud technologies</strong>. These skills have the highest ROI for senior developer roles,
                  with potential salary increases of 20-25%. Consider building 2-3 portfolio projects that demonstrate
                  scalable architecture and cloud deployment.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
