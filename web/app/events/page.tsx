"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Plus,
  Bell,
  Share,
  Filter,
  Star,
  Heart,
  MessageCircle,
} from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  fullDescription: string
  type: "webinar" | "job-fair" | "ama" | "workshop" | "networking"
  date: string
  time: string
  duration: string
  location: string
  isVirtual: boolean
  host: {
    name: string
    avatar: string
    role: string
    company: string
    bio: string
    rating: number
  }
  attendees: number
  maxAttendees: number
  price: number
  tags: string[]
  isRegistered: boolean
  isFeatured: boolean
  coverImage: string
  agenda: Array<{
    time: string
    title: string
    speaker?: string
  }>
  speakers: Array<{
    name: string
    role: string
    company: string
    avatar: string
  }>
  rating: number
  reviews: number
  likes: number
  comments: number
}

const events: Event[] = [
  {
    id: "1",
    title: "Tech Career AMA with Google Engineers",
    description:
      "Join senior engineers from Google for an interactive Q&A session about career growth, technical interviews, and working at big tech companies.",
    fullDescription:
      "This exclusive AMA session brings together three senior engineers from Google's core teams to share their insights on building a successful tech career. We'll cover everything from breaking into big tech, navigating technical interviews, to advancing your career within large organizations. This is a rare opportunity to get direct advice from industry veterans who have successfully climbed the corporate ladder at one of the world's most prestigious tech companies.\n\nWhat you'll learn:\n• Strategies for landing interviews at top tech companies\n• How to excel in technical and behavioral interviews\n• Career progression paths within Google\n• Building technical leadership skills\n• Balancing work-life in high-pressure environments\n• Networking effectively within the tech industry",
    type: "ama",
    date: "2024-01-15",
    time: "2:00 PM EST",
    duration: "90 minutes",
    location: "Virtual Event",
    isVirtual: true,
    host: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior Software Engineer",
      company: "Google",
      bio: "Sarah is a Senior Software Engineer at Google with 8+ years of experience in distributed systems and machine learning. She leads a team of 12 engineers and has been instrumental in scaling Google's search infrastructure.",
      rating: 4.9,
    },
    attendees: 234,
    maxAttendees: 500,
    price: 0,
    tags: ["tech", "career-growth", "google", "interviews"],
    isRegistered: false,
    isFeatured: true,
    coverImage: "/placeholder.svg?height=300&width=600",
    agenda: [
      { time: "2:00 PM", title: "Welcome & Introductions" },
      { time: "2:15 PM", title: "Career Journey Stories", speaker: "Sarah Chen" },
      { time: "2:45 PM", title: "Technical Interview Deep Dive", speaker: "Mike Johnson" },
      { time: "3:15 PM", title: "Open Q&A Session" },
      { time: "3:30 PM", title: "Closing & Networking" },
    ],
    speakers: [
      { name: "Sarah Chen", role: "Senior SWE", company: "Google", avatar: "/placeholder.svg?height=40&width=40" },
      {
        name: "Mike Johnson",
        role: "Staff Engineer",
        company: "Google",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Lisa Wang",
        role: "Engineering Manager",
        company: "Google",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    rating: 4.8,
    reviews: 156,
    likes: 342,
    comments: 89,
  },
  {
    id: "2",
    title: "Virtual Job Fair: Remote Opportunities 2024",
    description:
      "Connect with 50+ companies offering remote positions across various industries. Network with recruiters and hiring managers.",
    fullDescription:
      "The largest virtual job fair of 2024 featuring over 50 companies actively hiring for remote positions. This comprehensive event spans multiple industries including technology, finance, healthcare, marketing, and more. Each company will have dedicated virtual booths where you can interact directly with hiring managers, submit applications, and even participate in on-the-spot interviews.\n\nEvent Highlights:\n• 50+ companies with active remote job openings\n• Live chat with recruiters and hiring managers\n• Virtual company presentations every hour\n• Resume review sessions with career experts\n• Networking lounges by industry\n• On-the-spot interview opportunities\n• Career coaching sessions\n• Salary negotiation workshops",
    type: "job-fair",
    date: "2024-01-20",
    time: "10:00 AM EST",
    duration: "6 hours",
    location: "Virtual Event",
    isVirtual: true,
    host: {
      name: "CareerHub Team",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Event Organizer",
      company: "CareerHub",
      bio: "CareerHub's expert event team has organized over 200 successful job fairs, connecting thousands of job seekers with their dream companies.",
      rating: 4.7,
    },
    attendees: 1250,
    maxAttendees: 2000,
    price: 0,
    tags: ["job-fair", "remote-work", "networking", "hiring"],
    isRegistered: true,
    isFeatured: true,
    coverImage: "/placeholder.svg?height=300&width=600",
    agenda: [
      { time: "10:00 AM", title: "Opening Ceremony & Welcome" },
      { time: "10:30 AM", title: "Company Showcase Presentations" },
      { time: "12:00 PM", title: "Networking Lunch Break" },
      { time: "1:00 PM", title: "Resume Review Sessions" },
      { time: "2:30 PM", title: "Industry Panel Discussions" },
      { time: "4:00 PM", title: "Closing & Final Networking" },
    ],
    speakers: [],
    rating: 4.6,
    reviews: 89,
    likes: 567,
    comments: 123,
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const getEventTypeColor = (type: string) => {
    const colors = {
      webinar: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "job-fair": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      ama: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      workshop: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      networking: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const EventCard = ({ event }: { event: Event }) => (
    <Card
      className="mb-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => setSelectedEvent(event)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={event.coverImage || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={getEventTypeColor(event.type)}>{event.type.replace("-", " ").toUpperCase()}</Badge>
          {event.isFeatured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">⭐ Featured</Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          {event.isVirtual ? (
            <Badge variant="secondary" className="flex items-center space-x-1 bg-black/70 text-white">
              <Video className="h-3 w-3" />
              <span>Virtual</span>
            </Badge>
          ) : (
            <Badge variant="secondary" className="flex items-center space-x-1 bg-black/70 text-white">
              <MapPin className="h-3 w-3" />
              <span>In-Person</span>
            </Badge>
          )}
        </div>
        {event.price > 0 && (
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-green-600 text-white text-lg px-3 py-1">${event.price}</Badge>
          </div>
        )}
      </div>

      <CardHeader className="space-y-4">
        <div>
          <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{event.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{event.description}</CardDescription>
        </div>

        <div className="flex flex-wrap gap-1">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {event.time} ({event.duration})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {event.attendees}/{event.maxAttendees} attending
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={event.host.avatar || "/placeholder.svg"} alt={event.host.name} />
              <AvatarFallback>
                {event.host.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{event.host.name}</p>
              <p className="text-xs text-muted-foreground">
                {event.host.role} at {event.host.company}
              </p>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{event.host.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{event.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{event.comments}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            {event.isRegistered ? (
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Registered
              </Button>
            ) : (
              <Button>{event.price > 0 ? `Buy Ticket - $${event.price}` : "Register Free"}</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (selectedEvent) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedEvent(null)}>
            ← Back to Events
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={selectedEvent.coverImage || "/placeholder.svg"}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{selectedEvent.title}</h1>
                  <div className="flex items-center space-x-2">
                    <Badge className={getEventTypeColor(selectedEvent.type)}>
                      {selectedEvent.type.replace("-", " ").toUpperCase()}
                    </Badge>
                    {selectedEvent.isFeatured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">⭐ Featured</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedEvent.rating}</span>
                    <span className="text-sm text-muted-foreground">({selectedEvent.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{selectedEvent.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{selectedEvent.comments}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground mb-4">{selectedEvent.description}</p>
                <div className="whitespace-pre-line">{selectedEvent.fullDescription}</div>
              </div>
            </div>

            {selectedEvent.agenda.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Event Agenda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedEvent.agenda.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/50">
                        <div className="text-sm font-medium text-primary min-w-[80px]">{item.time}</div>
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          {item.speaker && <p className="text-sm text-muted-foreground">Speaker: {item.speaker}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedEvent.speakers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Speakers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedEvent.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={speaker.avatar || "/placeholder.svg"} alt={speaker.name} />
                          <AvatarFallback>
                            {speaker.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{speaker.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {speaker.role} at {speaker.company}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.attendees} registered / {selectedEvent.maxAttendees} max
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  {selectedEvent.price > 0 ? (
                    <div className="text-center mb-4">
                      <p className="text-2xl font-bold">${selectedEvent.price}</p>
                      <p className="text-sm text-muted-foreground">per ticket</p>
                    </div>
                  ) : (
                    <div className="text-center mb-4">
                      <p className="text-2xl font-bold text-green-600">Free</p>
                      <p className="text-sm text-muted-foreground">No cost to attend</p>
                    </div>
                  )}

                  {selectedEvent.isRegistered ? (
                    <Button className="w-full" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      You're Registered
                    </Button>
                  ) : (
                    <Button className="w-full">
                      {selectedEvent.price > 0 ? `Buy Ticket - $${selectedEvent.price}` : "Register Free"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Host</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedEvent.host.avatar || "/placeholder.svg"} alt={selectedEvent.host.name} />
                    <AvatarFallback>
                      {selectedEvent.host.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{selectedEvent.host.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {selectedEvent.host.role} at {selectedEvent.host.company}
                    </p>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{selectedEvent.host.rating}</span>
                    </div>
                    <p className="text-sm">{selectedEvent.host.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>
          <p className="text-muted-foreground">Discover webinars, job fairs, and networking opportunities</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Input placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="webinar">Webinars</SelectItem>
            <SelectItem value="job-fair">Job Fairs</SelectItem>
            <SelectItem value="ama">AMAs</SelectItem>
            <SelectItem value="workshop">Workshops</SelectItem>
            <SelectItem value="networking">Networking</SelectItem>
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="virtual">Virtual</SelectItem>
            <SelectItem value="in-person">In-Person</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="registered">My Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="hosting">Hosting</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </TabsContent>

        <TabsContent value="registered" className="space-y-6">
          {events
            .filter((event) => event.isRegistered)
            .map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Past Events</h3>
            <p className="text-muted-foreground">Events you've attended will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="hosting" className="space-y-6">
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Events Hosted</h3>
            <p className="text-muted-foreground mb-4">Start hosting your own events to build your community</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Event
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
