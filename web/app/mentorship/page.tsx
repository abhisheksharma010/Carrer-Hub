"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, Star, MessageCircle, Calendar, Clock, Search, Filter, Plus, Video, Users } from "lucide-react"

interface Mentor {
  id: string
  name: string
  avatar: string
  role: string
  company: string
  experience: number
  rating: number
  reviewCount: number
  expertise: string[]
  bio: string
  hourlyRate: number
  responseTime: string
  languages: string[]
  availability: "available" | "busy" | "unavailable"
  isVerified: boolean
  totalSessions: number
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "Senior Software Engineer",
    company: "Google",
    experience: 8,
    rating: 4.9,
    reviewCount: 127,
    expertise: ["Software Engineering", "Career Growth", "Technical Interviews", "Leadership"],
    bio: "I've been in tech for 8+ years, working at companies like Google and Microsoft. I love helping others navigate their career journey and break into top tech companies.",
    hourlyRate: 75,
    responseTime: "< 2 hours",
    languages: ["English", "Spanish"],
    availability: "available",
    isVerified: true,
    totalSessions: 340,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "Product Manager",
    company: "Meta",
    experience: 6,
    rating: 4.8,
    reviewCount: 89,
    expertise: ["Product Management", "Strategy", "User Research", "Analytics"],
    bio: "Product Manager at Meta with experience in consumer products. I help aspiring PMs understand the role and develop the right skills.",
    hourlyRate: 85,
    responseTime: "< 4 hours",
    languages: ["English", "Mandarin"],
    availability: "available",
    isVerified: true,
    totalSessions: 215,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "UX Design Director",
    company: "Airbnb",
    experience: 10,
    rating: 5.0,
    reviewCount: 156,
    expertise: ["UX Design", "Design Leadership", "Portfolio Review", "Career Transition"],
    bio: "Design leader with 10+ years experience. I've helped 200+ designers level up their careers and build amazing portfolios.",
    hourlyRate: 95,
    responseTime: "< 1 hour",
    languages: ["English"],
    availability: "busy",
    isVerified: true,
    totalSessions: 450,
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "Data Science Manager",
    company: "Netflix",
    experience: 7,
    rating: 4.7,
    reviewCount: 73,
    expertise: ["Data Science", "Machine Learning", "Analytics", "Team Management"],
    bio: "Data Science Manager at Netflix. I help data professionals advance their careers and master technical skills.",
    hourlyRate: 80,
    responseTime: "< 3 hours",
    languages: ["English", "Korean"],
    availability: "available",
    isVerified: true,
    totalSessions: 180,
  },
]

export default function MentorshipPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showBecomeMentor, setShowBecomeMentor] = useState(false)

  const getAvailabilityColor = (availability: string) => {
    const colors = {
      available: "bg-green-100 text-green-800",
      busy: "bg-yellow-100 text-yellow-800",
      unavailable: "bg-red-100 text-red-800",
    }
    return colors[availability as keyof typeof colors]
  }

  const MentorCard = ({ mentor }: { mentor: Mentor }) => (
    <Card className="mb-6 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
            <AvatarFallback>
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">{mentor.name}</h3>
                  {mentor.isVerified && (
                    <Badge variant="secondary" className="h-5 w-5 p-0 rounded-full">
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {mentor.role} at {mentor.company}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mentor.experience} years experience • {mentor.totalSessions} sessions completed
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{mentor.rating}</span>
                  <span className="text-xs text-muted-foreground">({mentor.reviewCount})</span>
                </div>
                <Badge className={getAvailabilityColor(mentor.availability)}>{mentor.availability}</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>
            <div className="flex flex-wrap gap-1">
              {mentor.expertise.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {mentor.expertise.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{mentor.expertise.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Responds in {mentor.responseTime}</span>
            </span>
            <span>${mentor.hourlyRate}/hour</span>
            <span>Languages: {mentor.languages.join(", ")}</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Book Session
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const BecomeMentorForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Become a Mentor</CardTitle>
        <CardDescription>Share your expertise and help others grow their careers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mentor-name">Full Name</Label>
            <Input id="mentor-name" placeholder="Your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mentor-role">Current Role</Label>
            <Input id="mentor-role" placeholder="e.g., Senior Software Engineer" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mentor-company">Company</Label>
            <Input id="mentor-company" placeholder="Current company" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mentor-experience">Years of Experience</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mentor-expertise">Areas of Expertise</Label>
          <Input id="mentor-expertise" placeholder="e.g., Software Engineering, Career Growth, Technical Interviews" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mentor-bio">Bio</Label>
          <Textarea
            id="mentor-bio"
            placeholder="Tell potential mentees about your background and how you can help them..."
            className="min-h-[100px]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mentor-rate">Hourly Rate ($)</Label>
            <Input id="mentor-rate" type="number" placeholder="50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mentor-languages">Languages</Label>
            <Input id="mentor-languages" placeholder="English, Spanish, etc." />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button className="flex-1">Submit Application</Button>
          <Button variant="outline" onClick={() => setShowBecomeMentor(false)}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mentorship</h2>
          <p className="text-muted-foreground">Connect with experienced professionals to accelerate your career</p>
        </div>
        <Button onClick={() => setShowBecomeMentor(!showBecomeMentor)}>
          <Plus className="h-4 w-4 mr-2" />
          Become a Mentor
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search mentors by expertise, company, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="find-mentor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="find-mentor">Find a Mentor</TabsTrigger>
          <TabsTrigger value="my-mentors">My Mentors</TabsTrigger>
          <TabsTrigger value="my-mentees">My Mentees</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentor" className="space-y-4">
          {showBecomeMentor && <BecomeMentorForm />}
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </TabsContent>

        <TabsContent value="my-mentors" className="space-y-4">
          <div className="text-center py-8">
            <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Mentors</h3>
            <p className="text-muted-foreground">Mentors you're working with</p>
          </div>
        </TabsContent>

        <TabsContent value="my-mentees" className="space-y-4">
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Mentees</h3>
            <p className="text-muted-foreground">People you're mentoring</p>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="text-center py-8">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Sessions</h3>
            <p className="text-muted-foreground">Upcoming and past mentorship sessions</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
