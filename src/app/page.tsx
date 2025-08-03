'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Zap, 
  Shield, 
  TrendingUp, 
  Globe, 
  ArrowRight,
  Play,
  CheckCircle,
  Coins
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Bot,
    title: "AI Agent Autonomy",
    description: "Enable AI agents to autonomously negotiate and pay for services without human intervention",
    details: "AI Agent Autonomy allows agents to independently discover, negotiate, and pay for services, unlocking new economic models for machine-to-machine commerce."
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description: "High-performance blockchain settlements with sub-second transaction finality",
    details: "Instant Settlements ensure that payments between agents are completed in real-time, reducing friction and enabling rapid service delivery."
  },
  {
    icon: Shield,
    title: "Secure Infrastructure",
    description: "Built on Monad blockchain with advanced cryptographic security",
    details: "Security is paramount. All transactions are protected by Monad's advanced cryptography and consensus mechanisms."
  },
  {
    icon: TrendingUp,
    title: "Economic Efficiency",
    description: "Eliminate payment friction and reduce transaction costs for AI services",
    details: "Economic Efficiency means lower fees and more value retained by agents, making microtransactions viable."
  },
  {
    icon: Globe,
    title: "Cross-Network",
    description: "Seamless value transfer across different AI agent networks and platforms",
    details: "Cross-Network support allows agents to transact across ecosystems, breaking down silos and enabling a global AI economy."
  }
]

const useCases = [
  {
    title: "Compute Resource Trading",
    description: "AI research agents hiring specialized compute agents for complex simulations",
    amount: "$50-500",
    frequency: "per task"
  },
  {
    title: "API Access Purchases",
    description: "Data-gathering agents buying premium API access from provider agents",
    amount: "$5-50",
    frequency: "per API call"
  },
  {
    title: "Strategy Licensing",
    description: "Trading agents paying fee splits to strategy-creation agents",
    amount: "2-10%",
    frequency: "of profits"
  },
  {
    title: "Asset Licensing",
    description: "Creative AI agents licensing digital assets from each other",
    amount: "$10-200",
    frequency: "per asset"
  }
]

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [modalFeature, setModalFeature] = useState(null as null | typeof features[0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 ai-gradient opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="secondary" className="mb-4">
                <Bot className="w-4 h-4 mr-2" />
                Autonomous AI Economy
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                AI Agent
                <span className="ai-gradient bg-clip-text text-transparent"> Payment Rails</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                The economic layer for the autonomous AI revolution. 
                <br />
                <span className="font-semibold">Decentralized payment infrastructure for AI agents to transact value securely.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/get-started" passHref legacyBehavior>
                  <Button asChild size="lg" className="ai-gradient text-white hover:opacity-90">
                    <span>
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 inline" />
                    </span>
                  </Button>
                </Link>
              </div>
              {/* Demo Modal */}
              {isVideoPlaying && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-900" onClick={() => setIsVideoPlaying(false)}>
                      ×
                    </button>
                    <h2 className="text-xl font-bold mb-4">AI Agent Payment Rails Demo</h2>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Demo Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why AI Agents Need Their Own Payment System
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Traditional payment systems weren't designed for machine-to-machine commerce. 
              Our platform enables seamless economic interactions between autonomous AI agents.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="h-full w-full text-left focus:outline-none"
                  onClick={() => setModalFeature(feature)}
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 ai-gradient rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </button>
              </motion.div>
            ))}
          </div>
          {/* Feature Modal */}
          {modalFeature && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-900" onClick={() => setModalFeature(null)}>
                  ×
                </button>
                <h2 className="text-xl font-bold mb-4">{modalFeature.title}</h2>
                <p className="mb-4">{modalFeature.details}</p>
                <Button onClick={() => setModalFeature(null)} className="ai-gradient text-white">Close</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Real-World AI Agent Transactions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how AI agents are already transacting value in the autonomous economy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="payment-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                      <Badge variant="outline" className="text-sm">
                        {useCase.amount} {useCase.frequency}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {useCase.description}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Transaction settled in <span className="font-semibold">0.8s</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build the Autonomous Economy?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the revolution in AI agent economics. 
              <br />
              No more human intermediaries. No more payment friction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" passHref legacyBehavior>
                <Button asChild size="lg" className="ai-gradient text-white hover:opacity-90">
                  <span>
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5 inline" />
                  </span>
                </Button>
              </Link>
              <Link href="/faucet" passHref legacyBehavior>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
                  <span>
                    <Coins className="mr-2 h-5 w-5" />
                    Get Test Tokens
                  </span>
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-slate-900" asChild>
                <a href="https://docs.aiagentpayment.com" target="_blank" rel="noopener noreferrer">
                  View Documentation
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 