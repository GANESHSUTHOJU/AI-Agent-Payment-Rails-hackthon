'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Trash2, 
  Settings, 
  Play, 
  Save, 
  ArrowRight,
  Bot,
  Mail,
  FileText,
  Calendar,
  MessageSquare,
  BarChart3,
  Users,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  WorkflowTemplate, 
  WorkflowStep, 
  AutomationCategory,
  AIAgent,
  AgentType
} from '@/types'

interface WorkflowBuilderProps {
  onSave?: (workflow: WorkflowTemplate) => void
  onCancel?: () => void
}

const availableAgents: AIAgent[] = [
  {
    id: 'email-agent',
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
    balance: { usdc: 1200, dai: 800, monad: 200 }
  },
  {
    id: 'doc-agent',
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
    balance: { usdc: 2100, dai: 1500, monad: 400 }
  },
  {
    id: 'calendar-agent',
    name: 'Calendar Manager',
    description: 'Automated scheduling and calendar optimization',
    type: AgentType.CALENDAR_MANAGEMENT,
    capabilities: ['Smart Scheduling', 'Meeting Optimization', 'Calendar Sync'],
    walletAddress: '0x3456789012345678901234567890123456789012',
    reputation: 4.8,
    status: 'active' as any,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-18'),
    owner: '0xabcdef1234567890abcdef1234567890abcdef12',
    spendingLimit: 300,
    balance: { usdc: 800, dai: 500, monad: 150 }
  }
]

const agentIcons: Record<AgentType, any> = {
  [AgentType.EMAIL_AUTOMATION]: Mail,
  [AgentType.DOCUMENT_PROCESSING]: FileText,
  [AgentType.CALENDAR_MANAGEMENT]: Calendar,
  [AgentType.CUSTOMER_SERVICE]: MessageSquare,
  [AgentType.DATA_ANALYSIS]: BarChart3,
  [AgentType.PROJECT_MANAGEMENT]: Users,
  [AgentType.RESEARCH]: Bot,
  [AgentType.COMPUTE]: Bot,
  [AgentType.DATA]: Bot,
  [AgentType.TRADING]: Bot,
  [AgentType.CREATIVE]: Bot,
  [AgentType.API_PROVIDER]: Bot,
  [AgentType.STRATEGY]: Bot,
  [AgentType.RENDERING]: Bot,
  [AgentType.WORKFLOW_AUTOMATION]: Zap,
  [AgentType.TASK_MANAGEMENT]: Bot,
  [AgentType.REPORT_GENERATION]: Bot,
  [AgentType.SOCIAL_MEDIA]: Bot
}

export function WorkflowBuilder({ onSave, onCancel }: WorkflowBuilderProps) {
  const [workflowName, setWorkflowName] = useState('')
  const [workflowDescription, setWorkflowDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<AutomationCategory>(AutomationCategory.EMAIL_MANAGEMENT)
  const [steps, setSteps] = useState<WorkflowStep[]>([])
  const [isAddingStep, setIsAddingStep] = useState(false)

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: `step-${steps.length + 1}`,
      name: '',
      description: '',
      agentId: '',
      serviceId: '',
      order: steps.length + 1,
      isRequired: true,
      estimatedTime: 5,
      cost: 0
    }
    setSteps([...steps, newStep])
    setIsAddingStep(true)
  }

  const updateStep = (index: number, updates: Partial<WorkflowStep>) => {
    const updatedSteps = [...steps]
    updatedSteps[index] = { ...updatedSteps[index], ...updates }
    setSteps(updatedSteps)
  }

  const removeStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index)
    // Reorder steps
    updatedSteps.forEach((step, i) => {
      step.order = i + 1
    })
    setSteps(updatedSteps)
  }

  const saveWorkflow = () => {
    if (!workflowName || steps.length === 0) return

    const workflow: WorkflowTemplate = {
      id: `wf-${Date.now()}`,
      name: workflowName,
      description: workflowDescription,
      category: selectedCategory,
      steps: steps,
      estimatedDuration: steps.reduce((sum, step) => sum + step.estimatedTime, 0),
      costPerExecution: steps.reduce((sum, step) => sum + step.cost, 0),
      successRate: 95.0,
      tags: [selectedCategory, 'custom', 'automation']
    }

    onSave?.(workflow)
  }

  const getAgentIcon = (agentType: AgentType) => {
    const IconComponent = agentIcons[agentType] || Bot
    return <IconComponent className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflow Builder</h1>
          <p className="text-muted-foreground">Create custom automation workflows</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={saveWorkflow} disabled={!workflowName || steps.length === 0}>
            <Save className="w-4 h-4 mr-2" />
            Save Workflow
          </Button>
        </div>
      </div>

      {/* Workflow Details */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Details</CardTitle>
          <CardDescription>Define the basic information for your workflow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workflow-name">Workflow Name</Label>
              <Input
                id="workflow-name"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="Enter workflow name"
              />
            </div>
            <div>
              <Label htmlFor="workflow-category">Category</Label>
              <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as AutomationCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(AutomationCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="workflow-description">Description</Label>
            <Input
              id="workflow-description"
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              placeholder="Describe what this workflow does"
            />
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Steps</CardTitle>
          <CardDescription>Add steps to your automation workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Step {step.order}</Badge>
                    <h3 className="font-medium">{step.name || 'Unnamed Step'}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStep(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label>Step Name</Label>
                    <Input
                      value={step.name}
                      onChange={(e) => updateStep(index, { name: e.target.value })}
                      placeholder="Enter step name"
                    />
                  </div>
                  <div>
                    <Label>Agent</Label>
                    <Select value={step.agentId} onValueChange={(value) => updateStep(index, { agentId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAgents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id}>
                            <div className="flex items-center space-x-2">
                              {getAgentIcon(agent.type)}
                              <span>{agent.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Service</Label>
                    <Select value={step.serviceId} onValueChange={(value) => updateStep(index, { serviceId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email-service">Email Service</SelectItem>
                        <SelectItem value="doc-service">Document Service</SelectItem>
                        <SelectItem value="calendar-service">Calendar Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Description</Label>
                  <Input
                    value={step.description}
                    onChange={(e) => updateStep(index, { description: e.target.value })}
                    placeholder="Describe what this step does"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label>Estimated Time (minutes)</Label>
                    <Input
                      type="number"
                      value={step.estimatedTime}
                      onChange={(e) => updateStep(index, { estimatedTime: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Cost (USDC)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={step.cost}
                      onChange={(e) => updateStep(index, { cost: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`required-${step.id}`}
                      checked={step.isRequired}
                      onChange={(e) => updateStep(index, { isRequired: e.target.checked })}
                    />
                    <Label htmlFor={`required-${step.id}`}>Required Step</Label>
                  </div>
                </div>
              </motion.div>
            ))}

            <Button onClick={addStep} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Summary */}
      {steps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Workflow Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{steps.length}</div>
                <div className="text-sm text-muted-foreground">Total Steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {steps.reduce((sum, step) => sum + step.estimatedTime, 0)} min
                </div>
                <div className="text-sm text-muted-foreground">Estimated Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  ${steps.reduce((sum, step) => sum + step.cost, 0).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total Cost</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 