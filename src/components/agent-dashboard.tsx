'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Wallet, 
  TrendingUp, 
  Activity, 
  Plus, 
  Settings,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AIAgent, AgentType, AgentStatus, Payment, PaymentStatus } from '@/types'
import { formatCurrency, formatAddress } from '@/lib/utils'

// Mock data for demonstration
const mockAgents: AIAgent[] = [
  {
    id: '1',
    name: 'Research Agent Alpha',
    description: 'Specialized in scientific research and data analysis',
    type: AgentType.RESEARCH,
    capabilities: ['Data Analysis', 'Literature Review', 'Statistical Modeling'],
    walletAddress: '0x1234567890123456789012345678901234567890',
    reputation: 4.8,
    status: AgentStatus.ACTIVE,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    owner: '0xabcdef1234567890abcdef1234567890abcdef12',
    spendingLimit: 1000,
    balance: { usdc: 2500, dai: 1500, monad: 500 }
  },
  {
    id: '2',
    name: 'Compute Agent Beta',
    description: 'High-performance computing and simulation services',
    type: AgentType.COMPUTE,
    capabilities: ['GPU Computing', 'Simulation', 'Rendering'],
    walletAddress: '0x2345678901234567890123456789012345678901',
    reputation: 4.9,
    status: AgentStatus.ACTIVE,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-19'),
    owner: '0xabcdef1234567890abcdef1234567890abcdef12',
    spendingLimit: 2000,
    balance: { usdc: 5000, dai: 3000, monad: 1000 }
  }
]

const mockPayments: Payment[] = [
  {
    id: '1',
    fromAgentId: '1',
    toAgentId: '2',
    amount: 150,
    currency: 'usdc' as any,
    status: PaymentStatus.SETTLED,
    transactionHash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
    description: 'Compute resource rental for simulation',
    metadata: { serviceType: 'gpu_compute', duration: '2 hours' },
    createdAt: new Date('2024-01-20T10:30:00Z'),
    settledAt: new Date('2024-01-20T10:31:00Z'),
    fee: 1.5
  },
  {
    id: '2',
    fromAgentId: '2',
    toAgentId: '1',
    amount: 75,
    currency: 'usdc' as any,
    status: PaymentStatus.PROCESSING,
    description: 'Data analysis consultation',
    metadata: { serviceType: 'consultation', duration: '1 hour' },
    createdAt: new Date('2024-01-20T11:00:00Z'),
    fee: 0.75
  }
]

export function AgentDashboard() {
  const [agents, setAgents] = useState<AIAgent[]>(mockAgents)
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null)

  const totalBalance = agents.reduce((sum, agent) => {
    return sum + agent.balance.usdc + agent.balance.dai + agent.balance.monad
  }, 0)

  const totalSpent = payments
    .filter(p => p.status === PaymentStatus.SETTLED)
    .reduce((sum, payment) => sum + payment.amount, 0)

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case AgentStatus.ACTIVE:
        return 'status-active'
      case AgentStatus.PENDING:
        return 'status-pending'
      case AgentStatus.SUSPENDED:
        return 'status-error'
      default:
        return 'status-pending'
    }
  }

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.SETTLED:
        return 'text-green-600'
      case PaymentStatus.PROCESSING:
        return 'text-yellow-600'
      case PaymentStatus.FAILED:
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getPaymentStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.SETTLED:
        return <CheckCircle className="w-4 h-4" />
      case PaymentStatus.PROCESSING:
        return <Clock className="w-4 h-4" />
      case PaymentStatus.FAILED:
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Agent Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your autonomous AI agents and monitor their economic activities
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agents.length}</div>
              <p className="text-xs text-muted-foreground">
                {agents.filter(a => a.status === AgentStatus.ACTIVE).length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
              <p className="text-xs text-muted-foreground">
                Across all agent wallets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{payments.length}</div>
              <p className="text-xs text-muted-foreground">
                {payments.filter(p => p.status === PaymentStatus.SETTLED).length} settled
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Agents Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agents List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Your AI Agents</CardTitle>
                    <CardDescription>
                      Manage your autonomous AI agents and their capabilities
                    </CardDescription>
                  </div>
                  <Button size="sm" className="ai-gradient text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Agent
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="agent-card cursor-pointer"
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{agent.name}</h3>
                            <Badge className={getStatusColor(agent.status)}>
                              {agent.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {agent.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-500">
                              Balance: {formatCurrency(agent.balance.usdc + agent.balance.dai + agent.balance.monad)}
                            </span>
                            <span className="text-gray-500">
                              Reputation: {agent.reputation}/5
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Agent Details */}
          <div className="lg:col-span-1">
            {selectedAgent ? (
              <Card>
                <CardHeader>
                  <CardTitle>Agent Details</CardTitle>
                  <CardDescription>
                    {selectedAgent.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Wallet Address</h4>
                    <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {formatAddress(selectedAgent.walletAddress)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Balances</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>USDC:</span>
                        <span>{formatCurrency(selectedAgent.balance.usdc)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>DAI:</span>
                        <span>{formatCurrency(selectedAgent.balance.dai)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>MONAD:</span>
                        <span>{formatCurrency(selectedAgent.balance.monad)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Capabilities</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedAgent.capabilities.map((capability) => (
                        <Badge key={capability} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Spending Limit</h4>
                    <p className="text-sm">{formatCurrency(selectedAgent.spendingLimit)} / day</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Agent Details</CardTitle>
                  <CardDescription>
                    Select an agent to view details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Click on any agent in the list to see their detailed information, wallet balance, and capabilities.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Monitor payment activities between your AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${getPaymentStatusColor(payment.status)}`}>
                        {getPaymentStatusIcon(payment.status)}
                      </div>
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-gray-500">
                          {payment.fromAgentId} → {payment.toAgentId}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-gray-500">
                        {payment.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 