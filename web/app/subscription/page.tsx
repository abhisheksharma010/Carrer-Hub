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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Check, X, Crown, Zap, Download, CreditCard, Calendar, Receipt, Gift } from "lucide-react"

export default function SubscriptionPage() {
  const plans = [
    {
      name: "Free",
      price: 0,
      period: "forever",
      description: "Perfect for getting started with job searching",
      current: false,
      popular: false,
      features: [
        { name: "5 job applications per month", included: true },
        { name: "Basic resume templates", included: true },
        { name: "Community access", included: true },
        { name: "2 mock interviews per month", included: true },
        { name: "AI resume suggestions", included: false },
        { name: "Priority support", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Unlimited applications", included: false },
        { name: "Premium templates", included: false },
        { name: "1-on-1 career coaching", included: false },
      ],
    },
    {
      name: "Pro",
      price: 19,
      period: "month",
      description: "For serious job seekers who want to accelerate their search",
      current: true,
      popular: true,
      features: [
        { name: "Unlimited job applications", included: true },
        { name: "AI-powered resume optimization", included: true },
        { name: "Premium resume templates", included: true },
        { name: "Unlimited mock interviews", included: true },
        { name: "Advanced job matching", included: true },
        { name: "Priority support", included: true },
        { name: "Interview scheduling assistant", included: true },
        { name: "Salary negotiation tools", included: false },
        { name: "1-on-1 career coaching", included: false },
        { name: "Company insider insights", included: false },
      ],
    },
    {
      name: "Premium",
      price: 49,
      period: "month",
      description: "Complete career transformation with personal coaching",
      current: false,
      popular: false,
      features: [
        { name: "Everything in Pro", included: true },
        { name: "1-on-1 career coaching (2 sessions/month)", included: true },
        { name: "Salary negotiation coaching", included: true },
        { name: "Company insider insights", included: true },
        { name: "LinkedIn profile optimization", included: true },
        { name: "Interview guarantee program", included: true },
        { name: "Personal brand building", included: true },
        { name: "Executive resume writing", included: true },
        { name: "Network introduction service", included: true },
        { name: "Job offer evaluation", included: true },
      ],
    },
  ]

  const billingHistory = [
    {
      id: "inv_001",
      date: "2024-01-01",
      amount: 19.0,
      plan: "Pro Monthly",
      status: "Paid",
      downloadUrl: "#",
    },
    {
      id: "inv_002",
      date: "2023-12-01",
      amount: 19.0,
      plan: "Pro Monthly",
      status: "Paid",
      downloadUrl: "#",
    },
    {
      id: "inv_003",
      date: "2023-11-01",
      amount: 19.0,
      plan: "Pro Monthly",
      status: "Paid",
      downloadUrl: "#",
    },
  ]

  const currentUsage = {
    applications: { used: 23, limit: "unlimited" },
    mockInterviews: { used: 8, limit: "unlimited" },
    aiOptimizations: { used: 5, limit: "unlimited" },
    coachingSessions: { used: 0, limit: 2 },
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
                <BreadcrumbPage>Subscription</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Subscription & Billing</h1>
            <p className="text-muted-foreground">Manage your subscription and billing preferences</p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="annual-billing">Annual billing</Label>
            <Switch id="annual-billing" />
            <Badge variant="secondary" className="ml-2">
              Save 20%
            </Badge>
          </div>
        </div>

        {/* Current Plan Status */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Crown className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Pro Plan</h3>
                  <p className="text-blue-100">Your current subscription</p>
                  <p className="text-sm text-blue-100 mt-1">Next billing: January 15, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">$19</div>
                <p className="text-blue-100">per month</p>
                <Button variant="secondary" className="mt-2">
                  Manage Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Current Usage</CardTitle>
            <CardDescription>Your usage for this billing period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Job Applications</span>
                  <span>
                    {currentUsage.applications.used} / {currentUsage.applications.limit}
                  </span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground">Unlimited applications</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mock Interviews</span>
                  <span>
                    {currentUsage.mockInterviews.used} / {currentUsage.mockInterviews.limit}
                  </span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground">Unlimited interviews</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Optimizations</span>
                  <span>
                    {currentUsage.aiOptimizations.used} / {currentUsage.aiOptimizations.limit}
                  </span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground">Unlimited optimizations</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Coaching Sessions</span>
                  <span>
                    {currentUsage.coachingSessions.used} / {currentUsage.coachingSessions.limit}
                  </span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-muted-foreground">Upgrade to Premium</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Comparison */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Choose Your Plan</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""} ${plan.current ? "bg-blue-50 border-blue-200" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500">Most Popular</Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 right-4">
                    <Badge variant="secondary">Current Plan</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    {plan.name === "Free" && <Gift className="h-5 w-5" />}
                    {plan.name === "Pro" && <Zap className="h-5 w-5" />}
                    {plan.name === "Premium" && <Crown className="h-5 w-5" />}
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className={`text-sm ${!feature.included ? "text-muted-foreground" : ""}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full"
                    variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : plan.name === "Free" ? "Downgrade" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Billing History
            </CardTitle>
            <CardDescription>Download your past invoices and receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingHistory.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.plan}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(invoice.date).toLocaleDateString()}
                        <span>•</span>
                        <span>Invoice #{invoice.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                      <Badge variant="secondary" className="text-xs">
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Update
                </Button>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Add New Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
