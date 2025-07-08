"use client"

import { useState } from "react"
import { CheckCircle, Circle, Play, Lock } from "lucide-react"

interface RoadmapNode {
  id: string
  title: string
  status: "completed" | "current" | "pending" | "locked"
  type: "milestone" | "skill" | "project" | "optional"
  description?: string
  children?: RoadmapNode[]
  position: { x: number; y: number }
  connections?: string[]
}

interface RoadmapTreeProps {
  nodes: RoadmapNode[]
  onNodeClick?: (node: RoadmapNode) => void
}

export function RoadmapTree({ nodes, onNodeClick }: RoadmapTreeProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const getNodeStyle = (status: string, type: string) => {
    const baseClasses =
      "roadmap-node px-4 py-3 rounded-xl font-medium text-sm min-w-[140px] text-center cursor-pointer border-2 shadow-lg"

    switch (status) {
      case "completed":
        return `${baseClasses} roadmap-completed`
      case "current":
        return `${baseClasses} roadmap-current`
      case "pending":
        return `${baseClasses} roadmap-pending`
      case "locked":
        return `${baseClasses} roadmap-optional opacity-50`
      default:
        return `${baseClasses} roadmap-optional`
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-white" />
      case "current":
        return <Play className="h-4 w-4 text-white" />
      case "locked":
        return <Lock className="h-4 w-4" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node.id)
    onNodeClick?.(node)
  }

  return (
    <div className="roadmap-container p-8 rounded-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #0ea5e9 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #38bdf8 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--roadmap-line))" />
          </marker>
        </defs>

        {/* Main path connections */}
        <path d="M 200 100 Q 400 150 600 100 T 1000 150" className="roadmap-line" markerEnd="url(#arrowhead)" />

        {/* Branch connections */}
        <path d="M 400 200 Q 500 250 600 200" className="roadmap-line-dotted" />

        <path d="M 600 300 Q 700 350 800 300" className="roadmap-line-dotted" />
      </svg>

      {/* Roadmap Nodes */}
      <div className="relative z-10 space-y-8">
        {/* Starting Point */}
        <div className="flex justify-center">
          <div className="roadmap-completed px-6 py-4 rounded-xl font-semibold text-lg shadow-xl">
            🚀 Start Your Journey
          </div>
        </div>

        {/* Main Learning Path */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Fundamentals Row */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center text-blue-800 mb-4">Fundamentals</h3>
            <div className={getNodeStyle("completed", "skill")} onClick={() => handleNodeClick(nodes[0])}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("completed")}
                <span>HTML & CSS</span>
              </div>
            </div>
            <div className={getNodeStyle("completed", "skill")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("completed")}
                <span>JavaScript</span>
              </div>
            </div>
            <div className={getNodeStyle("current", "skill")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("current")}
                <span>React.js</span>
              </div>
            </div>
          </div>

          {/* Tools & Workflow */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center text-blue-800 mb-4">Tools & Workflow</h3>
            <div className={getNodeStyle("completed", "skill")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("completed")}
                <span>Git & GitHub</span>
              </div>
            </div>
            <div className={getNodeStyle("pending", "skill")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("pending")}
                <span>Package Managers</span>
              </div>
            </div>
            <div className={getNodeStyle("pending", "skill")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("pending")}
                <span>Build Tools</span>
              </div>
            </div>
          </div>

          {/* Backend */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center text-blue-800 mb-4">Backend</h3>
            <div className={getNodeStyle("pending", "skill")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("pending")}
                <span>Node.js</span>
              </div>
            </div>
            <div className={getNodeStyle("locked", "skill")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("locked")}
                <span>Express.js</span>
              </div>
            </div>
            <div className={getNodeStyle("locked", "skill")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("locked")}
                <span>Databases</span>
              </div>
            </div>
          </div>

          {/* Advanced */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center text-blue-800 mb-4">Advanced</h3>
            <div className={getNodeStyle("locked", "project")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("locked")}
                <span>Testing</span>
              </div>
            </div>
            <div className={getNodeStyle("locked", "project")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("locked")}
                <span>Deployment</span>
              </div>
            </div>
            <div className={getNodeStyle("locked", "project")}>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon("locked")}
                <span>Full Stack Project</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Skills */}
        <div className="mt-12">
          <h3 className="text-lg font-bold text-center text-blue-800 mb-6">Optional Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["TypeScript", "GraphQL", "Docker", "AWS", "Mobile Development"].map((skill) => (
              <div key={skill} className={getNodeStyle("locked", "optional")}>
                <div className="flex items-center justify-center space-x-2">
                  {getStatusIcon("locked")}
                  <span>{skill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="text-sm font-medium text-blue-800 mb-2">Progress</div>
        <div className="flex items-center space-x-2">
          <div className="w-24 bg-blue-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
          </div>
          <span className="text-sm font-bold text-blue-600">45%</span>
        </div>
        <div className="text-xs text-blue-600 mt-1">5 of 11 completed</div>
      </div>
    </div>
  )
}
