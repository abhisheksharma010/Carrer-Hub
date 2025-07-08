import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Send,
  Building2,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  MessageSquare,
  UserPlus,
} from "lucide-react"

export default function ReferralsPage() {
  const companies = [
    {
      id: 1,
      name: "TechCorp",
      logo: "/placeholder.svg?height=40&width=40",
      employees: [
        {
          id: 1,
          name: "Sarah Chen",
          title: "Senior Engineering Manager",
          avatar: "/placeholder.svg?height=32&width=32",
          department: "Engineering",
          yearsAtCompany: 3,
          responseRate: 85,
          canRefer: true,
        },
        {
          id: 2,
          name: "Mike Johnson",
          title: "Staff Engineer",
          avatar: "/placeholder.svg?height=32&width=32",
          department: "Engineering",
          yearsAtCompany: 2,
          responseRate: 92,
          canRefer: true,
        },
        {
          id: 3,
          name: "Alex Rodriguez",
          title: "Principal Engineer",
          avatar: "/placeholder.svg?height=32&width=32",
          department: "Engineering",
          yearsAtCompany: 4,
          responseRate: 78,
          canRefer: false,
        },
      ],
    },
    {
      id: 2,
      name: "InnovateLabs",
      logo: "/placeholder.svg?height=40&width=40",
      employees: [
        {
          id: 4,
          name: "Emma Wilson",
          title: "Senior Product Manager",
          avatar: "/placeholder.svg?height=32&width=32",
          department: "Product",
          yearsAtCompany: 2,
          responseRate: 88,
          canRefer: true,
        },
        {
          id: 5,
          name: "David Kim",
          title: "Engineering Director",
          avatar: "/placeholder.svg?height=32&width=32",
          department: "Engineering",
          yearsAtCompany: 5,
          responseRate: 95,
          canRefer: true,
        },
      ],
    },
  ]

  const referralRequests = [
    {
      id: 1,
      company: "TechCorp",
      employee: "Sarah Chen",
      position: "Senior Frontend Developer",
      status: "pending",
      sentDate: "2024-01-15",
      message: "Hi Sarah, I'm interested in the Senior Frontend Developer position...",
    },
    {
      id: 2,
      company: "InnovateLabs",
      employee: "David Kim",
      position: "Full Stack Engineer",
      status: "accepted",
      sentDate: "2024-01-10",
      message: "Hello David, I'd love to discuss the Full Stack Engineer role...",
      response: "I'd be happy to refer you! Let's schedule a quick call to discuss your background.",
    },
    {
      id: 3,
      company: "CloudTech",
      employee: "Lisa Park",
      position: "React Developer",
      status: "declined",
      sentDate: "2024-01-08",
      message: "Hi Lisa, I'm very interested in the React Developer position...",
      response: "Thanks for reaching out. Unfortunately, I'm not able to provide referrals at this time.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100"
      case "accepted":
        return "text-green-600 bg-green-100"
      case "declined":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return AlertCircle
      case "accepted":
        return CheckCircle
      case "declined":
        return XCircle
      default:
        return Clock
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Referrals</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Referral Network</h1>
            <p className="text-muted-foreground">Connect with employees and request referrals</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Find Connections
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">58%</span> success rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Average response rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="find" className="space-y-4">
          <TabsList>
            <TabsTrigger value="find">Find Referrers</TabsTrigger>
            <TabsTrigger value="compose">Send Request</TabsTrigger>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="find" className="space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search companies or employees..." className="pl-10" />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Company Employees */}
            <div className="space-y-6">
              {companies.map((company) => (
                <Card key={company.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                        <AvatarFallback>{company.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          {company.name}
                        </CardTitle>
                        <CardDescription>{company.employees.length} employees available</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {company.employees.map((employee) => (
                        <Card key={employee.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                                <AvatarFallback>{employee.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <h3 className="font-medium">{employee.name}</h3>
                                <p className="text-sm text-muted-foreground">{employee.title}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Badge variant="outline" className="text-xs">
                                    {employee.department}
                                  </Badge>
                                  <span>{employee.yearsAtCompany}y at company</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {employee.responseRate}% response rate
                                </div>
                                <Button size="sm" className="w-full mt-2" disabled={!employee.canRefer}>
                                  <Mail className="mr-1 h-3 w-3" />
                                  {employee.canRefer ? "Request Referral" : "Not Available"}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compose" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Referral Request
                </CardTitle>
                <CardDescription>Craft a personalized message to request a referral</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="techcorp">TechCorp</SelectItem>
                        <SelectItem value="innovatelabs">InnovateLabs</SelectItem>
                        <SelectItem value="cloudtech">CloudTech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee">Employee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Sarah Chen - Senior Engineering Manager</SelectItem>
                        <SelectItem value="mike">Mike Johnson - Staff Engineer</SelectItem>
                        <SelectItem value="alex">Alex Rodriguez - Principal Engineer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position of Interest</Label>
                  <Input id="position" placeholder="e.g., Senior Frontend Developer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Referral request for [Position]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Hi [Name],

I hope this message finds you well. I'm reaching out because I'm very interested in the [Position] role at [Company] and would greatly appreciate your insights about the company culture and the opportunity.

I have [X years] of experience in [relevant skills/technologies] and believe I would be a great fit for this role. I'd love to learn more about your experience at [Company] and would be grateful if you could provide a referral.

I've attached my resume for your review. Would you be available for a brief call to discuss this opportunity?

Thank you for your time and consideration.

Best regards,
[Your Name]"
                    className="min-h-[200px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Send Request
                  </Button>
                  <Button variant="outline">Save Draft</Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Use these templates to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Professional Introduction</div>
                      <div className="text-sm text-muted-foreground">Formal approach with background</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Mutual Connection</div>
                      <div className="text-sm text-muted-foreground">Reference shared connections</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Alumni Network</div>
                      <div className="text-sm text-muted-foreground">Leverage school connections</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Industry Interest</div>
                      <div className="text-sm text-muted-foreground">Express passion for the field</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="space-y-4">
              {referralRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status)
                return (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-1 rounded-full ${getStatusColor(request.status)}`}>
                              <StatusIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {request.position} at {request.company}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Sent to {request.employee} on {new Date(request.sentDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <h4 className="text-sm font-medium">Your Message:</h4>
                              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg mt-1">
                                {request.message}
                              </p>
                            </div>
                            {request.response && (
                              <div>
                                <h4 className="text-sm font-medium">Response:</h4>
                                <p className="text-sm text-muted-foreground bg-green-50 p-3 rounded-lg mt-1">
                                  {request.response}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getStatusColor(request.status)}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                          {request.status === "accepted" && (
                            <Button size="sm">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              Follow Up
                            </Button>
                          )}
                          {request.status === "pending" && (
                            <Button size="sm" variant="outline">
                              <Send className="mr-1 h-3 w-3" />
                              Send Reminder
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
