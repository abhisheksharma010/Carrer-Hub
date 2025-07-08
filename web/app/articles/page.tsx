"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Eye, Heart, Bookmark, Share, Search, TrendingUp, Star, Plus } from "lucide-react"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
    verified: boolean
  }
  category: string
  tags: string[]
  readTime: number
  publishedAt: string
  views: number
  likes: number
  bookmarks: number
  isFeatured: boolean
  coverImage: string
}

const articles: Article[] = [
  {
    id: "1",
    title: "The Complete Guide to Remote Job Interviews in 2024",
    excerpt:
      "Master the art of remote interviewing with these proven strategies and technical tips that will help you stand out from other candidates.",
    content: "Remote interviews have become the new standard...",
    author: {
      name: "Sarah Mitchell",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior Career Coach",
      verified: true,
    },
    category: "Interview Tips",
    tags: ["remote-work", "interviews", "career-advice"],
    readTime: 8,
    publishedAt: "2 days ago",
    views: 2340,
    likes: 156,
    bookmarks: 89,
    isFeatured: true,
    coverImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "How to Build a Portfolio That Gets You Hired",
    excerpt:
      "Learn what hiring managers actually look for in portfolios and how to showcase your work effectively across different industries.",
    content: "Your portfolio is often the first impression...",
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "UX Design Lead",
      verified: true,
    },
    category: "Portfolio",
    tags: ["portfolio", "design", "career-development"],
    readTime: 12,
    publishedAt: "1 week ago",
    views: 1890,
    likes: 203,
    bookmarks: 145,
    isFeatured: false,
    coverImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "Salary Negotiation: Scripts That Actually Work",
    excerpt:
      "Real-world examples and proven scripts for negotiating your salary, whether you're starting a new job or asking for a raise.",
    content: "Salary negotiation doesn't have to be intimidating...",
    author: {
      name: "Jennifer Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "HR Director",
      verified: true,
    },
    category: "Salary",
    tags: ["salary-negotiation", "career-growth", "communication"],
    readTime: 10,
    publishedAt: "3 days ago",
    views: 3120,
    likes: 287,
    bookmarks: 198,
    isFeatured: true,
    coverImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    title: "The Future of Work: Skills You Need for 2025",
    excerpt:
      "Industry experts share insights on emerging skills and how to prepare for the changing job market in the next few years.",
    content: "The job market is evolving rapidly...",
    author: {
      name: "Dr. Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Future of Work Researcher",
      verified: true,
    },
    category: "Future Trends",
    tags: ["future-of-work", "skills", "technology"],
    readTime: 15,
    publishedAt: "5 days ago",
    views: 1567,
    likes: 134,
    bookmarks: 76,
    isFeatured: false,
    coverImage: "/placeholder.svg?height=200&width=400",
  },
]

export default function ArticlesPage() {
  const ArticleCard = ({ article }: { article: Article }) => (
    <Card className="mb-6 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={article.coverImage || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{article.category}</Badge>
              {article.isFeatured && (
                <Badge variant="default" className="bg-yellow-500">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{article.readTime} min read</span>
              </Badge>
            </div>
            <CardTitle className="text-xl hover:text-primary">{article.title}</CardTitle>
            <CardDescription className="text-base">{article.excerpt}</CardDescription>
            <div className="flex flex-wrap gap-1">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
              <AvatarFallback>
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium">{article.author.name}</p>
                {article.author.verified && (
                  <Badge variant="secondary" className="h-4 w-4 p-0">
                    ✓
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {article.author.role} • {article.publishedAt}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{article.views.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{article.likes}</span>
            </span>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Article Zone</h2>
          <p className="text-muted-foreground">In-depth guides and insights from career experts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Write Article
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="featured" className="space-y-4">
        <TabsList>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-4">
          {articles
            .filter((article) => article.isFeatured)
            .map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trending Articles</h3>
            <p className="text-muted-foreground">Most popular articles this week</p>
          </div>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-4">
          <div className="text-center py-8">
            <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Bookmarked Articles</h3>
            <p className="text-muted-foreground">Articles you've saved for later</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
