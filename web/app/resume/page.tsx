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
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Upload,
  Download,
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Sparkles,
  RefreshCw,
} from "lucide-react"

export default function ResumePage() {
  const suggestions = [
    {
      type: "improvement",
      title: "Add quantifiable achievements",
      description: "Include specific numbers and metrics in your experience section",
      impact: "High",
      section: "Experience",
    },
    {
      type: "keyword",
      title: "Include 'React' keyword",
      description: "This keyword appears in 85% of relevant job postings",
      impact: "Medium",
      section: "Skills",
    },
    {
      type: "format",
      title: "Optimize section order",
      description: "Move your skills section higher for better ATS scanning",
      impact: "Medium",
      section: "Structure",
    },
    {
      type: "content",
      title: "Strengthen action verbs",
      description: "Replace weak verbs with more impactful alternatives",
      impact: "Low",
      section: "Language",
    },
  ]

  const keywordAnalysis = [
    { keyword: "JavaScript", frequency: 12, relevance: 95 },
    { keyword: "React", frequency: 8, relevance: 88 },
    { keyword: "Node.js", frequency: 6, relevance: 82 },
    { keyword: "TypeScript", frequency: 4, relevance: 76 },
    { keyword: "AWS", frequency: 3, relevance: 71 },
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
                <BreadcrumbPage>Resume Lab</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Resume Lab & JD Optimizer</h1>
            <p className="text-muted-foreground">AI-powered resume optimization and job description analysis</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button>
              <Sparkles className="mr-2 h-4 w-4" />
              AI Optimize
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Resume Upload & Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Upload</CardTitle>
                <CardDescription>Upload your resume or paste the content below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <div className="mt-4">
                    <Button variant="outline">Choose File</Button>
                    <p className="mt-2 text-sm text-muted-foreground">Or drag and drop your resume here</p>
                    <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX files up to 10MB</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume-content">Or paste your resume content</Label>
                  <Textarea
                    id="resume-content"
                    placeholder="Paste your resume content here..."
                    className="min-h-[300px]"
                    defaultValue="ALEX JOHNSON
Senior Frontend Developer

EXPERIENCE
Frontend Developer at TechCorp (2022-Present)
• Developed responsive web applications using React and TypeScript
• Collaborated with design team to implement user interfaces
• Improved application performance by 30%

Junior Developer at StartupXYZ (2020-2022)
• Built web applications using JavaScript and React
• Worked on various client projects
• Participated in code reviews

SKILLS
JavaScript, React, TypeScript, HTML, CSS, Node.js, Git

EDUCATION
Bachelor of Computer Science
University of Technology (2016-2020)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  AI Suggestions
                </CardTitle>
                <CardDescription>Personalized recommendations to improve your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div
                      className={`p-1 rounded-full ${
                        suggestion.impact === "High"
                          ? "bg-red-100 text-red-600"
                          : suggestion.impact === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {suggestion.type === "improvement" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : suggestion.type === "keyword" ? (
                        <Target className="h-4 w-4" />
                      ) : suggestion.type === "format" ? (
                        <FileText className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <Badge
                          variant={
                            suggestion.impact === "High"
                              ? "destructive"
                              : suggestion.impact === "Medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {suggestion.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.section}
                        </Badge>
                        <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Analysis & Metrics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Score</CardTitle>
                <CardDescription>Overall optimization score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">78</div>
                  <p className="text-sm text-muted-foreground">out of 100</p>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>ATS Compatibility</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Keyword Match</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Content Quality</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Format & Structure</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keyword Analysis</CardTitle>
                <CardDescription>Top keywords from job descriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {keywordAnalysis.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.keyword}</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.frequency}x
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.relevance}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{item.relevance}%</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Analyze Job Description
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common resume improvements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Fix Grammar & Spelling
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Optimize for ATS
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Enhance Action Verbs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Check Consistency
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>Download your optimized resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download DOCX
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
