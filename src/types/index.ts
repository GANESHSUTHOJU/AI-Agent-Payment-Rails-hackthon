// AI Agent Types
export interface AIAgent {
  id: string
  name: string
  description: string
  type: AgentType
  capabilities: string[]
  walletAddress: string
  reputation: number
  status: AgentStatus
  createdAt: Date
  updatedAt: Date
  owner: string // Human owner address
  spendingLimit: number // Daily spending limit in USD
  balance: {
    usdc: number
    dai: number
    monad: number
  }
  // New productivity-specific fields
  productivityMetrics?: ProductivityMetrics
  automationCapabilities?: AutomationCapability[]
  workflowTemplates?: WorkflowTemplate[]
}

export enum AgentType {
  RESEARCH = 'research',
  COMPUTE = 'compute',
  DATA = 'data',
  TRADING = 'trading',
  CREATIVE = 'creative',
  API_PROVIDER = 'api_provider',
  STRATEGY = 'strategy',
  RENDERING = 'rendering',
  // New productivity agent types
  WORKFLOW_AUTOMATION = 'workflow_automation',
  TASK_MANAGEMENT = 'task_management',
  EMAIL_AUTOMATION = 'email_automation',
  DOCUMENT_PROCESSING = 'document_processing',
  CALENDAR_MANAGEMENT = 'calendar_management',
  PROJECT_MANAGEMENT = 'project_management',
  CUSTOMER_SERVICE = 'customer_service',
  DATA_ENTRY = 'data_entry',
  REPORT_GENERATION = 'report_generation',
  SOCIAL_MEDIA = 'social_media'
}

export enum AgentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

// New productivity-specific interfaces
export interface ProductivityMetrics {
  tasksCompleted: number
  timeSaved: number // in hours
  efficiencyGain: number // percentage
  costSavings: number
  accuracyRate: number
  averageResponseTime: number // in milliseconds
  uptime: number // percentage
}

export interface AutomationCapability {
  id: string
  name: string
  description: string
  category: AutomationCategory
  complexity: 'low' | 'medium' | 'high'
  estimatedTimeSavings: number // in hours per week
  costPerTask: number
  supportedIntegrations: string[]
}

export enum AutomationCategory {
  EMAIL_MANAGEMENT = 'email_management',
  DOCUMENT_PROCESSING = 'document_processing',
  DATA_ANALYSIS = 'data_analysis',
  SCHEDULING = 'scheduling',
  COMMUNICATION = 'communication',
  REPORTING = 'reporting',
  SOCIAL_MEDIA = 'social_media',
  CUSTOMER_SERVICE = 'customer_service',
  PROJECT_MANAGEMENT = 'project_management',
  FINANCIAL_PROCESSING = 'financial_processing'
}

export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: AutomationCategory
  steps: WorkflowStep[]
  estimatedDuration: number // in minutes
  costPerExecution: number
  successRate: number
  tags: string[]
}

export interface WorkflowStep {
  id: string
  name: string
  description: string
  agentId: string
  serviceId: string
  order: number
  isRequired: boolean
  estimatedTime: number // in minutes
  cost: number
}

export interface Task {
  id: string
  name: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignedAgentId?: string
  workflowId?: string
  estimatedDuration: number
  actualDuration?: number
  cost: number
  createdAt: Date
  dueDate?: Date
  completedAt?: Date
  tags: string[]
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface AutomationRequest {
  id: string
  requesterId: string
  workflowTemplateId: string
  parameters: Record<string, any>
  budget: number
  priority: TaskPriority
  status: AutomationRequestStatus
  createdAt: Date
  estimatedCompletion?: Date
  actualCompletion?: Date
  cost: number
}

export enum AutomationRequestStatus {
  REQUESTED = 'requested',
  APPROVED = 'approved',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// Payment Types
export interface Payment {
  id: string
  fromAgentId: string
  toAgentId: string
  amount: number
  currency: PaymentCurrency
  status: PaymentStatus
  transactionHash?: string
  description: string
  metadata: Record<string, any>
  createdAt: Date
  settledAt?: Date
  fee: number
}

export enum PaymentCurrency {
  USDC = 'usdc',
  DAI = 'dai',
  MONAD = 'monad'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SETTLED = 'settled',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// Service Types
export interface Service {
  id: string
  agentId: string
  name: string
  description: string
  price: number
  currency: PaymentCurrency
  pricingModel: PricingModel
  capabilities: string[]
  availability: ServiceAvailability
  createdAt: Date
  updatedAt: Date
}

export enum PricingModel {
  FIXED = 'fixed',
  PER_CALL = 'per_call',
  PER_HOUR = 'per_hour',
  PERCENTAGE = 'percentage',
  SUBSCRIPTION = 'subscription'
}

export interface ServiceAvailability {
  isAvailable: boolean
  maxConcurrentRequests: number
  currentRequests: number
  responseTime: number // in milliseconds
}

// Quote and Order Types
export interface Quote {
  id: string
  serviceId: string
  fromAgentId: string
  amount: number
  currency: PaymentCurrency
  validUntil: Date
  terms: string
  createdAt: Date
}

export interface Order {
  id: string
  quoteId: string
  fromAgentId: string
  toAgentId: string
  serviceId: string
  amount: number
  currency: PaymentCurrency
  status: OrderStatus
  paymentId?: string
  createdAt: Date
  completedAt?: Date
}

export enum OrderStatus {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed'
}

// Blockchain Types
export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  gasUsed: string
  gasPrice: string
  blockNumber: number
  timestamp: Date
  status: 'success' | 'failed'
}

export interface Wallet {
  address: string
  balance: {
    usdc: number
    dai: number
    monad: number
  }
  transactions: Transaction[]
}

// Analytics Types
export interface AgentAnalytics {
  agentId: string
  totalRevenue: number
  totalSpent: number
  transactionCount: number
  averageTransactionValue: number
  topServices: Array<{
    serviceId: string
    revenue: number
    transactionCount: number
  }>
  monthlyStats: Array<{
    month: string
    revenue: number
    spent: number
    transactions: number
  }>
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
} 