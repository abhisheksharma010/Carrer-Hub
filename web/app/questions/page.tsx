"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, ThumbsUp, Clock, Plus, Search, Filter, Star, TrendingUp } from "lucide-react"

interface Question {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
    reputation: number
  }
  tags: string[]
  votes: number
  answers: number
  views: number
  timeAgo: string
  isAnswered: boolean
  isFeatured: boolean
}

const questions: Question[] = [
  {
    id: "1",
    title: "How to negotiate salary for a remote position?",
    content:
      "I've been offered a remote software developer position, but I'm not sure how to approach salary negotiation when I can't meet in person. What strategies work best for remote negotiations?",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Software Developer",
      reputation: 1250,
    },
    tags: ["salary-negotiation", "remote-work", "career-advice"],
    votes: 23,
    answers: 8,
    views: 156,
    timeAgo: "2 hours ago",
    isAnswered: true,
    isFeatured: false,
  },
  {
    id: "2",
    title: "Should I mention gaps in employment during interviews?",
    content:
      "I have a 6-month gap in my employment history due to personal reasons. Should I bring this up proactively during interviews, or wait for them to ask?",
    author: {
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Marketing Manager",
      reputation: 890,
    },
    tags: ["interview-tips", "employment-gap", "career-advice"],
    votes: 45,
    answers: 12,
    views: 234,
    timeAgo: "4 hours ago",
    isAnswered: true,
    isFeatured: true,
  },
  {
    id: "3",
    title: "How to transition from frontend to full-stack development?",
    content:
      "I've been working as a frontend developer for 3 years and want to become a full-stack developer. What's the best learning path and how should I showcase backend skills to employers?",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Frontend Developer",
      reputation: 567,
    },
    tags: ["career-transition", "full-stack", "skill-development"],
    votes: 18,
    answers: 5,
    views: 89,
    timeAgo: "6 hours ago",
    isAnswered: false,
    isFeatured: false,
  },
  {
    id: "4",
    title: "Best practices for following up after job interviews?",
    content:
      "I had three interviews last week and haven't heard back. What's the appropriate timeline and method for following up without seeming pushy?",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "UX Designer",
      reputation: 1100,
    },
    tags: ["interview-follow-up", "job-search", "communication"],
    votes: 31,
    answers: 9,
    views: 178,
    timeAgo: "8 hours ago",
    isAnswered: true,
    isFeatured: false,
  },
]

export default function QuestionsPage() {
  const [showAskQuestion, setShowAskQuestion] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const QuestionCard = ({ question }: { question: Question }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              {question.isFeatured && (
                <Badge variant="default" className="bg-yellow-500">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              {question.isAnswered && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Answered
                </Badge>
              )}
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{question.timeAgo}</span>
              </Badge>
            </div>
            <CardTitle className="text-lg hover:text-primary cursor-pointer">{question.title}</CardTitle>
            <CardDescription className="line-clamp-2">{question.content}</CardDescription>
            <div className="flex flex-wrap gap-1">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
              <AvatarFallback>
                {question.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{question.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {question.author.role} • {question.author.reputation} rep
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{question.votes}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>{question.answers}</span>
            </span>
            <span>{question.views} views</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  )

  const AskQuestionForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ask a Question</CardTitle>
        <CardDescription>Get help from the community</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question-title">Question Title</Label>
          <Input id="question-title" placeholder="Be specific and imagine you're asking a question to another person" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="question-content">Question Details</Label>
          <Textarea
            id="question-content"
            placeholder="Provide all the details someone would need to answer your question..."
            className="min-h-[120px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="question-tags">Tags</Label>
          <Input id="question-tags" placeholder="Add up to 5 tags (e.g., career-advice, interview-tips)" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="question-category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="career-advice">Career Advice</SelectItem>
              <SelectItem value="job-search">Job Search</SelectItem>
              <SelectItem value="interview-tips">Interview Tips</SelectItem>
              <SelectItem value="salary-negotiation">Salary Negotiation</SelectItem>
              <SelectItem value="skill-development">Skill Development</SelectItem>
              <SelectItem value="workplace-issues">Workplace Issues</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button className="flex-1">Post Question</Button>
          <Button variant="outline" onClick={() => setShowAskQuestion(false)}>
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
          <h2 className="text-3xl font-bold tracking-tight">Ask a Question</h2>
          <p className="text-muted-foreground">Get help from the community on your career questions</p>
        </div>
        <Button onClick={() => setShowAskQuestion(!showAskQuestion)}>
          <Plus className="h-4 w-4 mr-2" />
          Ask Question
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
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

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="my-questions">My Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {showAskQuestion && <AskQuestionForm />}
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trending Questions</h3>
            <p className="text-muted-foreground">Most popular questions this week</p>
          </div>
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4">
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unanswered Questions</h3>
            <p className="text-muted-foreground">Help others by answering these questions</p>
          </div>
        </TabsContent>

        <TabsContent value="my-questions" className="space-y-4">
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Questions</h3>
            <p className="text-muted-foreground">Questions you've asked</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
