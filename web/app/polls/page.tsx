"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Vote, TrendingUp, Clock, Users, Plus, MessageSquare } from "lucide-react"

interface Poll {
  id: string
  title: string
  description: string
  author: {
    name: string
    avatar: string
    role: string
  }
  options: {
    id: string
    text: string
    votes: number
  }[]
  totalVotes: number
  timeLeft: string
  category: string
  hasVoted: boolean
  userVote?: string
}

const polls: Poll[] = [
  {
    id: "1",
    title: "What's the most important factor when choosing a job?",
    description: "Help us understand what matters most to job seekers in 2024",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Career Advisor",
    },
    options: [
      { id: "a", text: "Salary and Benefits", votes: 156 },
      { id: "b", text: "Work-Life Balance", votes: 203 },
      { id: "c", text: "Career Growth", votes: 89 },
      { id: "d", text: "Company Culture", votes: 134 },
    ],
    totalVotes: 582,
    timeLeft: "2 days left",
    category: "Career",
    hasVoted: false,
  },
  {
    id: "2",
    title: "Which remote work setup do you prefer?",
    description: "Understanding remote work preferences in the current job market",
    author: {
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "HR Manager",
    },
    options: [
      { id: "a", text: "Fully Remote", votes: 245 },
      { id: "b", text: "Hybrid (2-3 days office)", votes: 189 },
      { id: "c", text: "Mostly Office", votes: 67 },
      { id: "d", text: "Flexible Schedule", votes: 123 },
    ],
    totalVotes: 624,
    timeLeft: "5 days left",
    category: "Remote Work",
    hasVoted: true,
    userVote: "a",
  },
  {
    id: "3",
    title: "What's your biggest challenge in job searching?",
    description: "Let's identify common pain points in the job search process",
    author: {
      name: "Emily Watson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Recruiter",
    },
    options: [
      { id: "a", text: "Finding relevant opportunities", votes: 178 },
      { id: "b", text: "Getting interview callbacks", votes: 234 },
      { id: "c", text: "Salary negotiations", votes: 98 },
      { id: "d", text: "Interview preparation", votes: 145 },
    ],
    totalVotes: 655,
    timeLeft: "1 week left",
    category: "Job Search",
    hasVoted: false,
  },
]

export default function PollsPage() {
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null)
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [showCreatePoll, setShowCreatePoll] = useState(false)

  const handleVote = (pollId: string, optionId: string) => {
    // Handle voting logic here
    console.log(`Voted for option ${optionId} in poll ${pollId}`)
  }

  const PollCard = ({ poll }: { poll: Poll }) => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{poll.category}</Badge>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{poll.timeLeft}</span>
              </Badge>
            </div>
            <CardTitle className="text-lg">{poll.title}</CardTitle>
            <CardDescription>{poll.description}</CardDescription>
          </div>
        </div>
        <div className="flex items-center space-x-3 pt-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={poll.author.avatar || "/placeholder.svg"} alt={poll.author.name} />
            <AvatarFallback>
              {poll.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{poll.author.name}</p>
            <p className="text-xs text-muted-foreground">{poll.author.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {poll.options.map((option) => {
            const percentage = (option.votes / poll.totalVotes) * 100
            const isSelected = poll.userVote === option.id
            const isVoting = selectedPoll === poll.id && selectedOption === option.id

            return (
              <div key={option.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {!poll.hasVoted ? (
                      <Button
                        variant={isVoting ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedPoll(poll.id)
                          setSelectedOption(option.id)
                        }}
                      >
                        {option.text}
                      </Button>
                    ) : (
                      <span className={`text-sm ${isSelected ? "font-semibold text-primary" : ""}`}>
                        {option.text}
                        {isSelected && " ✓"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {option.votes} votes ({percentage.toFixed(1)}%)
                  </span>
                </div>
                {poll.hasVoted && <Progress value={percentage} className="h-2" />}
              </div>
            )
          })}
        </div>

        {selectedPoll === poll.id && !poll.hasVoted && (
          <div className="mt-4 pt-4 border-t">
            <Button onClick={() => handleVote(poll.id, selectedOption)} disabled={!selectedOption} className="w-full">
              Cast Vote
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{poll.totalVotes} votes</span>
            </span>
            <span className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>24 comments</span>
            </span>
          </div>
          <Button variant="ghost" size="sm">
            View Discussion
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const CreatePollForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Create New Poll</CardTitle>
        <CardDescription>Engage the community with your question</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="poll-title">Poll Title</Label>
          <Input id="poll-title" placeholder="What would you like to ask?" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="poll-description">Description</Label>
          <Textarea id="poll-description" placeholder="Provide more context for your poll..." />
        </div>
        <div className="space-y-2">
          <Label>Poll Options</Label>
          <Input placeholder="Option 1" />
          <Input placeholder="Option 2" />
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button className="flex-1">Create Poll</Button>
          <Button variant="outline" onClick={() => setShowCreatePoll(false)}>
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
          <h2 className="text-3xl font-bold tracking-tight">Community Polls</h2>
          <p className="text-muted-foreground">Share your opinions and see what the community thinks</p>
        </div>
        <Button onClick={() => setShowCreatePoll(!showCreatePoll)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Poll
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Polls</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="my-polls">My Polls</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {showCreatePoll && <CreatePollForm />}
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trending Polls</h3>
            <p className="text-muted-foreground">Most popular polls this week</p>
          </div>
        </TabsContent>

        <TabsContent value="my-polls" className="space-y-4">
          <div className="text-center py-8">
            <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Polls</h3>
            <p className="text-muted-foreground">Polls you've created</p>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Completed Polls</h3>
            <p className="text-muted-foreground">View results from finished polls</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
