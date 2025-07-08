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
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, DollarSign, Calendar, Star, Briefcase, Globe, Heart, ExternalLink } from "lucide-react"

export default function CompaniesPage() {
  const companies = [
    {
      id: 1,
      name: "TechCorp",
      logo: "/placeholder.svg?height=60&width=60",
      industry: "Technology",
      size: "1,000-5,000",
      founded: 2015,
      rating: 4.5,
      reviews: 234,
      openJobs: 12,
      description: "Leading technology company focused on innovative solutions for modern businesses.",
      mission: "To empower businesses through cutting-edge technology solutions.",
      values: ["Innovation", "Collaboration", "Excellence", "Integrity"],
      locations: ["San Francisco", "New York", "Austin"],
      benefits: ["Health Insurance", "401k", "Remote Work", "Unlimited PTO"],
      culture: "Fast-paced, collaborative environment with focus on work-life balance",
      revenue: "$100M - $500M",
      website: "https://techcorp.com",
      following: false,
    },
    {
      id: 2,
      name: "InnovateLabs",
      logo: "/placeholder.svg?height=60&width=60",
      industry: "Software",
      size: "500-1,000",
      founded: 2018,
      rating: 4.2,
      reviews: 156,
      openJobs: 8,
      description: "Innovative software company building the future of digital experiences.",
      mission: "Creating innovative solutions that transform how people work and live.",
      values: ["Creativity", "Quality", "Teamwork", "Growth"],
      locations: ["Seattle", "Portland", "Remote"],
      benefits: ["Equity", "Health Insurance", "Learning Budget", "Flexible Hours"],
      culture: "Creative and supportive environment encouraging experimentation",
      revenue: "$50M - $100M",
      website: "https://innovatelabs.com",
      following: true,
    },
    {
      id: 3,
      name: "CloudTech",
      logo: "/placeholder.svg?height=60&width=60",
      industry: "Cloud Services",
      size: "200-500",
      founded: 2020,
      rating: 4.7,
      reviews: 89,
      openJobs: 15,
      description: "Cloud infrastructure company helping businesses scale efficiently.",
      mission: "Simplifying cloud adoption for businesses of all sizes.",
      values: ["Reliability", "Security", "Scalability", "Customer Success"],
      locations: ["Denver", "Chicago", "Remote"],
      benefits: ["Stock Options", "Health Insurance", "Home Office Setup", "Conference Budget"],
      culture: "Results-driven culture with emphasis on continuous learning",
      revenue: "$10M - $50M",
      website: "https://cloudtech.com",
      following: false,
    },
  ]

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
                <BreadcrumbPage>Companies</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Company Directory</h1>
            <p className="text-muted-foreground">Discover companies and their culture</p>
          </div>
          <Button>
            <Heart className="mr-2 h-4 w-4" />
            Following (3)
          </Button>
        </div>

        <div className="space-y-6">
          {companies.map((company) => (
            <Card key={company.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                      <AvatarFallback className="text-lg">{company.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{company.name}</h2>
                        <Badge variant="secondary">{company.industry}</Badge>
                        {company.following && <Badge variant="default">Following</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground max-w-2xl">{company.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {company.size} employees
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Founded {company.founded}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {company.rating} ({company.reviews} reviews)
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {company.openJobs} open positions
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                      {company.following ? "Unfollow" : "Follow"}
                    </Button>
                    <Button size="sm">View Jobs</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Mission & Values */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Mission & Values</h3>
                    <p className="text-sm text-muted-foreground">{company.mission}</p>
                    <div className="flex flex-wrap gap-1">
                      {company.values.map((value) => (
                        <Badge key={value} variant="outline" className="text-xs">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Locations</h3>
                    <div className="space-y-2">
                      {company.locations.map((location) => (
                        <div key={location} className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3" />
                          {location}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Company Stats */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Company Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3" />
                        Revenue: {company.revenue}
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3" />
                        <a href={company.website} className="text-blue-600 hover:underline">
                          Visit Website
                        </a>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Culture & Benefits */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold">Culture & Team</h3>
                    <p className="text-sm text-muted-foreground">{company.culture}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold">Benefits & Perks</h3>
                    <div className="flex flex-wrap gap-1">
                      {company.benefits.map((benefit) => (
                        <Badge key={benefit} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Employee Satisfaction */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Employee Satisfaction</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Work-Life Balance</span>
                        <span>4.2/5</span>
                      </div>
                      <Progress value={84} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Career Growth</span>
                        <span>4.0/5</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Compensation</span>
                        <span>4.3/5</span>
                      </div>
                      <Progress value={86} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarInset>
  )
}
