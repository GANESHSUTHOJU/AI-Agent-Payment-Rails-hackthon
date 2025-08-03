'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Zap, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Play,
  Settings,
  Plus,
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  BarChart3,
  DollarSign,
  Target,
  Users,
  Workflow,
  Automation
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductivityDashboard } from '@/components/productivity-dashboard'
import Link from 'next/link'

const automationCategories = [
  {
    icon: Mail,
    title: "Email Automation",
    description: "Automate email sorting, responses, and campaign management",
    features: ["Smart Email Classification", "Auto-Response Templates", "Campaign Automation"],
    timeSavings: "8-12 hours/week",
    costSavings: "$500-800/month"
  },
  {
    icon: FileText,
    title: "Document Processing",
    description: "Intelligent document processing and data extraction",
    features: ["OCR Processing", "Form Filling", "Data Extraction"],
    timeSavings: "6-10 hours/week",
    costSavings: "$400-600/month"
  },
  {
    icon: Calendar,
    title: "Calendar Management",
    description: "Automated scheduling and calendar optimization",
    features: ["Smart Scheduling", "Meeting Optimization", "Calendar Sync"],
    timeSavings: "4-6 hours/week",
    costSavings: "$300-500/month"
  },
  {
    icon: MessageSquare,
    title: "Customer Service",
    description: "AI-powered customer support and ticket management",
    features: ["Auto-Response", "Ticket Routing", "Sentiment Analysis"],
    timeSavings: "10-15 hours/week",
    costSavings: "$600-900/month"
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    description: "Automated reporting and data insights generation",
    features: ["Report Generation", "Data Visualization", "Trend Analysis"],
    timeSavings: "5-8 hours/week",
    costSavings: "$400-700/month"
  },
  {
    icon: Users,
    title: "Project Management",
    description: "Automated project tracking and team coordination",
    features: ["Task Assignment", "Progress Tracking", "Resource Allocation"],
    timeSavings: "6-9 hours/week",
    costSavings: "$500-750/month"
  }
]

const workflowTemplates = [
  {
    name: "Customer Onboarding",
    description: "Complete automated customer onboarding process",
    steps: ["Welcome Email", "Document Processing", "Account Setup", "Training Schedule"],
    duration: "20 minutes",
    cost: "$15.50",
    successRate: "94.5%"
  },
  {
    name: "Invoice Processing",
    description: "Automated invoice processing and payment tracking",
    steps: ["Document Upload", "Data Extraction", "Validation", "Payment Processing"],
    duration: "10 minutes",
    cost: "$8.75",
    successRate: "97.2%"
  },
  {
    name: "Social Media Management",
    description: "Automated social media content creation and posting",
    steps: ["Content Generation", "Image Creation", "Scheduling", "Analytics"],
    duration: "30 minutes",
    cost: "$22.00",
    successRate: "91.8%"
  }
]

export default function ProductivityPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
                <Automation className="w-4 h-4 mr-2" />
                Productivity & Automation
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                AI-Powered
                <span className="text-blue-600 dark:text-blue-400"> Productivity</span>
                <br />
                Automation Platform
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Transform your workflow with autonomous AI agents that handle repetitive tasks, 
                process documents, manage communications, and optimize your business processes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Play className="w-5 h-5 mr-2" />
                  Start Automating
                </Button>
                <Button size="lg" variant="outline">
                  <Settings className="w-5 h-5 mr-2" />
                  View Dashboard
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose AI Automation?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Leverage the power of autonomous AI agents to streamline your operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Time Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Save 20-40 hours per week by automating repetitive tasks and workflows
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>Cost Reduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Reduce operational costs by 30-50% through intelligent automation
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Scalability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Scale your operations without proportional increases in human resources
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Automation Categories */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Automation Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose from specialized AI agents for different business functions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <category.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {category.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 font-medium">{category.timeSavings}</span>
                          <span className="text-blue-600 font-medium">{category.costSavings}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Templates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pre-Built Workflow Templates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Ready-to-use automation workflows for common business processes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflowTemplates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Workflow className="w-5 h-5 mr-2 text-blue-600" />
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Steps:</h4>
                        <ol className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {template.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-center">
                              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">
                                {stepIndex + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm">
                          <div className="text-gray-600 dark:text-gray-300">Duration: {template.duration}</div>
                          <div className="text-gray-600 dark:text-gray-300">Cost: {template.cost}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{template.successRate}</div>
                          <div className="text-xs text-gray-500">Success Rate</div>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Deploy Workflow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using AI automation to streamline their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <ArrowRight className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 