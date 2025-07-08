"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Users, Star, Play, Award, Search, TrendingUp } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Complete React Developer Course",
    provider: "Tech Academy",
    instructor: "Sarah Johnson",
    duration: "40 hours",
    level: "Intermediate",
    rating: 4.8,
    students: 12500,
    price: "$89",
    category: "Frontend Development",
    image: "/placeholder.svg?height=200&width=300",
    progress: 65,
    enrolled: true,
    certificate: true,
    skills: ["React", "JavaScript", "Redux", "Hooks"],
  },
  {
    id: 2,
    title: "AWS Solutions Architect Professional",
    provider: "Cloud Masters",
    instructor: "Mike Chen",
    duration: "60 hours",
    level: "Advanced",
    rating: 4.9,
    students: 8900,
    price: "$199",
    category: "Cloud Computing",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
    enrolled: false,
    certificate: true,
    skills: ["AWS", "Cloud Architecture", "DevOps", "Security"],
  },
  {
    id: 3,
    title: "Data Science with Python",
    provider: "DataLearn",
    instructor: "Dr. Emily Rodriguez",
    duration: "50 hours",
    level: "Beginner",
    rating: 4.7,
    students: 15600,
    price: "$129",
    category: "Data Science",
    image: "/placeholder.svg?height=200&width=300",
    progress: 30,
    enrolled: true,
    certificate: true,
    skills: ["Python", "Pandas", "NumPy", "Machine Learning"],
  },
  {
    id: 4,
    title: "System Design Interview Prep",
    provider: "Interview Pro",
    instructor: "Alex Kumar",
    duration: "25 hours",
    level: "Advanced",
    rating: 4.9,
    students: 7800,
    price: "$149",
    category: "Interview Prep",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
    enrolled: false,
    certificate: false,
    skills: ["System Design", "Scalability", "Architecture", "Databases"],
  },
]

const certifications = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    validUntil: "2025-12-31",
    earned: "2023-06-15",
    credentialId: "AWS-CSA-2023-001",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Google Cloud Professional",
    provider: "Google Cloud",
    validUntil: "2024-08-20",
    earned: "2022-08-20",
    credentialId: "GCP-PRO-2022-045",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("browse")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesLevel = levelFilter === "all" || course.level === levelFilter
    return matchesSearch && matchesCategory && matchesLevel
  })

  const enrolledCourses = courses.filter((course) => course.enrolled)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses & Certifications</h1>
          <p className="text-muted-foreground">Advance your career with expert-led learning paths</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Learning Path
          </Button>
          <Button>
            <Award className="h-4 w-4 mr-2" />
            Get Certified
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Courses</TabsTrigger>
          <TabsTrigger value="enrolled">My Courses ({enrolledCourses.length})</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Interview Prep">Interview Prep</SelectItem>
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">{course.level}</Badge>
                </div>
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    {course.certificate && <Award className="h-5 w-5 text-yellow-500 flex-shrink-0" />}
                  </div>
                  <CardDescription>{course.provider}</CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{course.instructor}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{course.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-lg font-bold">{course.price}</span>
                    <Button size="sm">
                      {course.enrolled ? (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Continue
                        </>
                      ) : (
                        "Enroll Now"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-6">
          <div className="grid gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.provider}</p>
                        </div>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>
                        <Button>
                          <Play className="h-4 w-4 mr-2" />
                          Continue Learning
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                      <div className="space-y-1 text-sm">
                        <div>Earned: {cert.earned}</div>
                        <div>Valid until: {cert.validUntil}</div>
                        <div className="text-xs text-muted-foreground">ID: {cert.credentialId}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Certificate
                        </Button>
                        <Button size="sm" variant="outline">
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learning-paths" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Full Stack Developer Path</CardTitle>
                <CardDescription>Complete roadmap to become a full stack developer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>3/8 courses</span>
                  </div>
                  <Progress value={37.5} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Estimated: 6 months</div>
                  <Button size="sm">Continue Path</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cloud Solutions Architect</CardTitle>
                <CardDescription>Master cloud architecture and deployment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>0/6 courses</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Estimated: 4 months</div>
                  <Button size="sm">Start Path</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
