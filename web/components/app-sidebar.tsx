"use client"

import type * as React from "react"
import {
  Briefcase,
  Building2,
  MessageSquare,
  Mic,
  FileText,
  Trophy,
  Home,
  Zap,
  Users,
  Brain,
  BarChart3,
  Calendar,
  HelpCircle,
  Vote,
  Newspaper,
  UserCheck,
  History,
  FolderOpen,
  Target,
  GraduationCap,
  TrendingUp,
  Bookmark,
  Send,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const data = {
  user: {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    plan: "Pro",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: Briefcase,
      badge: "12 new",
    },
    {
      title: "Applications",
      url: "/applications",
      icon: Send,
      badge: "5",
    },
    {
      title: "Saved Jobs",
      url: "/saved-jobs",
      icon: Bookmark,
    },
    {
      title: "Companies",
      url: "/companies",
      icon: Building2,
    },
  ],
  navCareer: [
    {
      title: "AI Career Planner",
      url: "/career-planner",
      icon: Brain,
    },
    {
      title: "Portfolio Builder",
      url: "/portfolio",
      icon: FolderOpen,
    },
    {
      title: "Resume History",
      url: "/resume-history",
      icon: History,
    },
    {
      title: "Career Stats",
      url: "/career-stats",
      icon: BarChart3,
    },
    {
      title: "Mock Interviews",
      url: "/interviews",
      icon: Mic,
    },
  ],
  navLearning: [
    {
      title: "Courses & Certifications",
      url: "/courses",
      icon: GraduationCap,
    },
    {
      title: "Quizzes",
      url: "/quizzes",
      icon: Target,
    },
    {
      title: "Learning Tracker",
      url: "/learning-tracker",
      icon: TrendingUp,
    },
    {
      title: "Mentorship",
      url: "/mentorship",
      icon: UserCheck,
    },
  ],
  navCommunity: [
    {
      title: "Community Feed",
      url: "/community",
      icon: MessageSquare,
      badge: "3",
    },
    {
      title: "Articles",
      url: "/articles",
      icon: Newspaper,
    },
    {
      title: "Ask a Question",
      url: "/questions",
      icon: HelpCircle,
    },
    {
      title: "Polls",
      url: "/polls",
      icon: Vote,
    },
    {
      title: "Events",
      url: "/events",
      icon: Calendar,
    },
  ],
  navTools: [
    {
      title: "Resume Builder",
      url: "/resume",
      icon: FileText,
    },
    {
      title: "Referrals",
      url: "/referrals",
      icon: Users,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: Trophy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CareerHub Pro</span>
                  <span className="truncate text-xs">Your Career Companion</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Job Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Career Development</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navCareer.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Learning & Growth</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navLearning.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Community</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navCommunity.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/profile">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={data.user.avatar || "/placeholder.svg"} alt={data.user.name} />
                  <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{data.user.name}</span>
                  <span className="truncate text-xs">{data.user.email}</span>
                </div>
                <Badge variant="outline">{data.user.plan}</Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
