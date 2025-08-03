'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  Settings,
  Plus,
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  BarChart3,
  Zap,
  DollarSign,
  Target,
  Users
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  AIAgent, 
  AgentType, 
  Task, 
  TaskStatus, 
  TaskPriority,
  WorkflowTemplate,
  AutomationRequest,
  ProductivityMetrics,
  AutomationCategory
} from '@/types'

// Mock data for productivity agents
const mockProductivityAgents: AIAgent[] = [
  {
    id: 'prod-1',
    name: 'Email Assistant Pro',
    description: 'Automated email management and response system',
    type: AgentType.EMAIL_AUTOMATION,
    capabilities: ['Email Sorting', 'Auto-Response', 'Calendar Integration'],
    walletAddress: '0x1234567890123456789012345678901234567890',
    reputation: 4.9,
    status: 'active' as any,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    owner: '0xabcdef1234567890abcdef1234567890abcdef12',
    spendingLimit: 500,
    balance: { usdc: 1200, dai: 800, monad: 200 },
    productivityMetrics: {
      tasksCompleted: 1247,
      timeSaved: 45.5,
      efficiencyGain: 78,
      costSavings: 2340,
      accuracyRate: 96.5,
      averageResponseTime: 1200,
      uptime: 99.8
    },
    automationCapabilities: [
      {
        id: 'cap-1',
        name: 'Email Classification',
        description: 'Automatically categorize and prioritize emails',
        category: AutomationCategory.EMAIL_MANAGEMENT,
        complexity: 'medium',
        estimatedTimeSavings: 8,
        costPerTask: 0.50,
        supportedIntegrations: ['Gmail', 'Outlook', 'Slack']
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Document Processor AI',
    description: 'Intelligent document processing and data extraction',
    type: AgentType.DOCUMENT_PROCESSING,
    capabilities: ['OCR Processing', 'Data Extraction', 'Form Filling'],
    walletAddress: '0x2345678901234567890123456789012345678901',
    reputation: 4.7,
    status: 'active' as any,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-19'),
    owner: '0xabcdef1234567890abcdef1234567890abcdef12',
    spendingLimit: 800,
    balance: { usdc: 2100, dai: 1500, monad: 400 },
    productivityMetrics: {
      tasksCompleted: 892,
      timeSaved: 32.1,
      efficiencyGain: 85,
      costSavings: 1890,
      accuracyRate: 94.2,
      averageResponseTime: 800,
      uptime: 99.5
    }
  }
]

const mockTasks: Task[] = [
  {
    id: 'task-1',
    name: 'Process Q4 Reports',
    description: 'Extract and analyze quarterly financial data',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    assignedAgentId: 'prod-2',
    estimatedDuration: 120,
    actualDuration: 45,
    cost: 25.50,
    createdAt: new Date('2024-01-20T09:00:00Z'),
    dueDate: new Date('2024-01-20T17:00:00Z'),
    tags: ['reports', 'finance', 'quarterly']
  },
  {
    id: 'task-2',
    name: 'Email Campaign Setup',
    description: 'Configure automated email sequences for new customers',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    assignedAgentId: 'prod-1',
    estimatedDuration: 60,
    actualDuration: 35,
    cost: 15.75,
    createdAt: new Date('2024-01-20T08:30:00Z'),
    completedAt: new Date('2024-01-20T09:05:00Z'),
    tags: ['email', 'marketing', 'automation']
  }
]

const mockWorkflows: WorkflowTemplate[] = [
  {
    id: 'wf-1',
    name: 'Customer Onboarding',
    description: 'Automated customer onboarding workflow',
    category: AutomationCategory.CUSTOMER_SERVICE,
    steps: [
      {
        id: 'step-1',
        name: 'Welcome Email',
        description: 'Send personalized welcome email',
        agentId: 'prod-1',
        serviceId: 'email-service',
        order: 1,
        isRequired: true,
        estimatedTime: 5,
        cost: 2.50
      },
      {
        id: 'step-2',
        name: 'Document Processing',
        description: 'Process customer documents',
        agentId: 'prod-2',
        serviceId: 'doc-service',
        order: 2,
        isRequired: true,
        estimatedTime: 15,
        cost: 8.75
      }
    ],
    estimatedDuration: 20,
    costPerExecution: 11.25,
    successRate: 94.5,
    tags: ['onboarding', 'customer', 'automation']
  }
]

export function ProductivityDashboard() {
  const [agents, setAgents] = useState<AIAgent[]>(mockProductivityAgents)
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>(mockWorkflows)
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null)

  const totalTimeSaved = agents.reduce((sum, agent) => {
    return sum + (agent.productivityMetrics?.timeSaved || 0)
  }, 0)

  const totalCostSavings = agents.reduce((sum, agent) => {
    return sum + (agent.productivityMetrics?.costSavings || 0)
  }, 0)

  const completedTasks = tasks.filter(t => t.status === TaskStatus.COMPLETED).length
  const activeTasks = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT: return 'bg-red-100 text-red-800'
      case TaskPriority.HIGH: return 'bg-orange-100 text-orange-800'
      case TaskPriority.MEDIUM: return 'bg-yellow-100 text-yellow-800'
      case TaskPriority.LOW: return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: return 'bg-green-100 text-green-800'
      case TaskStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800'
      case TaskStatus.PENDING: return 'bg-yellow-100 text-yellow-800'
      case TaskStatus.FAILED: return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Productivity Dashboard</h1>
          <p className="text-muted-foreground">Monitor automation workflows and productivity metrics</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTimeSaved.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCostSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total savings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTasks}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Agents</CardTitle>
            <CardDescription>Performance metrics for automation agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {agent.productivityMetrics?.efficiencyGain}% efficiency
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {agent.productivityMetrics?.tasksCompleted} tasks
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Latest automation tasks and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{task.name}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Workflow Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Templates</CardTitle>
          <CardDescription>Pre-built automation workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{workflow.name}</h3>
                  <Badge variant="secondary">{workflow.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{workflow.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>${workflow.costPerExecution}</span>
                  <span>{workflow.successRate}% success</span>
                </div>
                <Button size="sm" className="w-full mt-3">
                  <Play className="w-4 h-4 mr-2" />
                  Run Workflow
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 