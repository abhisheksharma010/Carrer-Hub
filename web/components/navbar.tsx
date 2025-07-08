"use client"

import { useState } from "react"
import { Bell, Search, Settings, User, LogOut, CreditCard, HelpCircle, MessageSquare, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "application",
    title: "Application Update",
    message: "Your application to Google has been reviewed",
    time: "2 minutes ago",
    read: false,
    icon: Briefcase,
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    message: "Sarah Chen sent you a connection request",
    time: "1 hour ago",
    read: false,
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "system",
    title: "Profile Views",
    message: "Your profile was viewed 15 times this week",
    time: "3 hours ago",
    read: true,
    icon: User,
  },
]

export function Navbar() {
  const [notificationOpen, setNotificationOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />

      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search jobs, companies, or skills..." className="pl-8" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{unreadCount}</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Notifications</h4>
                <Button variant="ghost" size="sm">
                  Mark all read
                </Button>
              </div>
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer ${
                      !notification.read ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="p-1 bg-primary/10 rounded-full">
                      <notification.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t">
                <Button variant="ghost" className="w-full" size="sm">
                  View all notifications
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alex Johnson" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Alex Johnson</p>
                <p className="text-xs leading-none text-muted-foreground">alex@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/subscription">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Subscription</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
