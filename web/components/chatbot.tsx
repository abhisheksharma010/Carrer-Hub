"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Target,
  FileText,
  DollarSign,
  TrendingUp,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

const quickActions = [
  { icon: FileText, label: "Resume Tips", query: "How can I improve my resume?" },
  { icon: Target, label: "Interview Prep", query: "Help me prepare for technical interviews" },
  { icon: DollarSign, label: "Salary Negotiation", query: "How do I negotiate my salary?" },
  { icon: TrendingUp, label: "Career Growth", query: "What skills should I learn for career advancement?" },
]

const botResponses: { [key: string]: { content: string; suggestions?: string[] } } = {
  resume: {
    content: `Here are key tips to improve your resume:

**📝 Structure & Format**
• Use a clean, ATS-friendly format
• Keep it to 1-2 pages maximum
• Use consistent formatting and fonts
• Include clear section headers

**🎯 Content Optimization**
• Start with a compelling summary/objective
• Use action verbs and quantify achievements
• Tailor keywords to match job descriptions
• Include relevant technical skills

**💼 Experience Section**
• Focus on accomplishments, not just duties
• Use the STAR method (Situation, Task, Action, Result)
• Include metrics and numbers when possible
• Show progression and growth

**🔧 Technical Skills**
• List relevant programming languages
• Include frameworks and tools
• Mention certifications
• Keep skills current and accurate

Would you like me to elaborate on any of these areas?`,
    suggestions: [
      "ATS optimization tips",
      "How to quantify achievements",
      "Technical skills section",
      "Resume templates",
    ],
  },
  interview: {
    content: `Here's your comprehensive interview preparation guide:

**🎯 Technical Interview Prep**
• Practice coding problems on LeetCode/HackerRank
• Review data structures and algorithms
• Prepare system design scenarios
• Practice explaining your thought process

**💬 Behavioral Questions**
• Prepare STAR method examples
• Research the company culture
• Practice common questions (strengths, weaknesses, etc.)
• Prepare thoughtful questions to ask

**🏢 Company Research**
• Study the company's mission and values
• Understand their products/services
• Research recent news and developments
• Know your interviewers' backgrounds

**📋 Day-of Tips**
• Arrive 10-15 minutes early
• Bring multiple copies of your resume
• Dress appropriately for company culture
• Follow up with a thank-you email

**🔧 Technical Setup (for remote)**
• Test your camera and microphone
• Ensure stable internet connection
• Have a backup plan ready
• Use a professional background

Need help with specific interview types or questions?`,
    suggestions: [
      "System design questions",
      "Behavioral interview examples",
      "Salary discussion",
      "Follow-up strategies",
    ],
  },
  salary: {
    content: `Master salary negotiation with these strategies:

**📊 Research & Preparation**
• Use Glassdoor, PayScale, levels.fyi for market data
• Consider location, experience, and company size
• Factor in total compensation (benefits, equity, etc.)
• Know your minimum acceptable offer

**💼 Negotiation Tactics**
• Wait for the offer before discussing salary
• Express enthusiasm first, then negotiate
• Use market data to support your request
• Be prepared to justify your value

**🎯 What to Negotiate**
• Base salary
• Signing bonus
• Stock options/equity
• Vacation time
• Professional development budget
• Remote work flexibility

**📝 Communication Tips**
• Be professional and collaborative
• Use "we" language ("How can we make this work?")
• Give them time to consider your request
• Get everything in writing

**⚠️ Common Mistakes to Avoid**
• Don't negotiate before receiving an offer
• Don't make ultimatums
• Don't focus only on salary
• Don't accept immediately - take time to review

Ready to practice your negotiation conversation?`,
    suggestions: ["Salary research tools", "Counter-offer strategies", "Benefits negotiation", "Remote work requests"],
  },
  skills: {
    content: `Here are the most in-demand skills for career advancement:

**💻 Technical Skills (2024)**
• **AI/ML**: Python, TensorFlow, PyTorch
• **Cloud**: AWS, Azure, Google Cloud
• **DevOps**: Docker, Kubernetes, CI/CD
• **Data**: SQL, Python, Tableau, Power BI
• **Frontend**: React, Vue.js, TypeScript
• **Backend**: Node.js, Python, Go, Rust

**🧠 Soft Skills**
• Leadership and team management
• Communication and presentation
• Problem-solving and critical thinking
• Adaptability and learning agility
• Emotional intelligence
• Project management

**📈 Emerging Technologies**
• Artificial Intelligence & Machine Learning
• Blockchain and Web3
• Cybersecurity
• Internet of Things (IoT)
• Augmented/Virtual Reality
• Quantum Computing

**🎯 Industry-Specific Skills**
• **FinTech**: Regulatory compliance, risk management
• **HealthTech**: HIPAA compliance, medical devices
• **EdTech**: Learning management systems
• **E-commerce**: Digital marketing, analytics

**📚 Learning Path Recommendations**
1. Identify your target role
2. Analyze job descriptions for required skills
3. Create a learning schedule
4. Build projects to demonstrate skills
5. Get certified in relevant technologies

Which area would you like to focus on first?`,
    suggestions: ["AI/ML learning path", "Cloud certifications", "Leadership development", "Project portfolio ideas"],
  },
  default: {
    content: `Hello! I'm your AI career assistant. I'm here to help you with:

**🎯 Career Guidance**
• Resume optimization and review
• Interview preparation strategies
• Salary negotiation tactics
• Career transition planning

**📈 Skill Development**
• Technology trends and recommendations
• Learning path suggestions
• Certification guidance
• Portfolio building tips

**💼 Job Search Strategy**
• Job market insights
• Networking strategies
• Application optimization
• Company research tips

**🚀 Professional Growth**
• Leadership development
• Personal branding
• Industry insights
• Goal setting and planning

How can I help you advance your career today?`,
    suggestions: ["Improve my resume", "Prepare for interviews", "Learn new skills", "Negotiate salary"],
  },
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const getBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase()

    if (message.includes("resume") || message.includes("cv")) {
      return botResponses.resume
    } else if (message.includes("interview") || message.includes("preparation")) {
      return botResponses.interview
    } else if (message.includes("salary") || message.includes("negotiate") || message.includes("pay")) {
      return botResponses.salary
    } else if (message.includes("skill") || message.includes("learn") || message.includes("technology")) {
      return botResponses.skills
    } else {
      return botResponses.default
    }
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(message)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "bot",
        timestamp: new Date(),
        suggestions: response.suggestions,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (query: string) => {
    handleSendMessage(query)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col bg-gradient-to-b from-background to-muted/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-white/20 rounded-full">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Career Assistant</CardTitle>
            <p className="text-sm text-blue-100">AI-powered career guidance</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {messages.length === 0 ? (
          <div className="flex-1 p-4 space-y-4">
            <div className="text-center space-y-2">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full w-fit mx-auto">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold">Welcome to Career Assistant!</h3>
              <p className="text-sm text-muted-foreground">
                I'm here to help you advance your career. Choose a topic below or ask me anything!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="h-auto p-3 flex flex-col items-center space-y-1 hover:bg-muted/50"
                  onClick={() => handleQuickAction(action.query)}
                >
                  <action.icon className="h-4 w-4" />
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-muted"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-blue-600" />}
                      {message.sender === "user" && <User className="h-4 w-4 mt-0.5" />}
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {message.suggestions && (
                  <div className="flex flex-wrap gap-1 ml-6">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your career..."
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI assistant for career guidance. Always verify important decisions.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
