'use client'

import { AgentDashboard } from '@/components/agent-dashboard'
import { TestnetFaucet } from '@/components/testnet-faucet'
import { WalletTest } from '@/components/wallet-test'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins, Wallet, Bot } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/faucet">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-blue-600" />
                    <CardTitle>Testnet Faucet</CardTitle>
                  </div>
                  <CardDescription>
                    Get test tokens for development and testing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Coins className="w-4 h-4 mr-2" />
                    Request Tokens
                  </Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/productivity">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-green-600" />
                    <CardTitle>Productivity Tools</CardTitle>
                  </div>
                  <CardDescription>
                    AI automation and workflow management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Bot className="w-4 h-4 mr-2" />
                    View Tools
                  </Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/marketplace">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-purple-600" />
                    <CardTitle>Agent Marketplace</CardTitle>
                  </div>
                  <CardDescription>
                    Discover and hire AI agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Wallet className="w-4 h-4 mr-2" />
                    Browse Agents
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>

        {/* Wallet Test */}
        <div className="mb-8">
          <WalletTest />
        </div>

        {/* Main Dashboard */}
        <AgentDashboard />
      </div>
    </div>
  )
} 