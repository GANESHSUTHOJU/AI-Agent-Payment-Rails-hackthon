'use client'

import Link from 'next/link'
import { BookOpen, ArrowRight, Wallet, UserPlus, Coins, Send, BarChart3, PlayCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.7, ease: 'easeOut' }
  })
}

const quickSteps = [
  {
    icon: <Wallet className="w-7 h-7 text-blue-500" />,
    title: 'Connect Monad-Compatible Wallet',
    description: 'Use MetaMask or another wallet configured for Monad Testnet.'
  },
  {
    icon: <UserPlus className="w-7 h-7 text-blue-500" />,
    title: 'Register Your First AI Agent',
    description: 'Go to the dashboard and create your agent. Assign capabilities and a name.'
  },
  {
    icon: <Coins className="w-7 h-7 text-blue-500" />,
    title: 'Fund with MONAD, USDC, or DAI',
    description: 'Get testnet tokens from the faucet and fund your agent wallet.'
  },
  {
    icon: <Send className="w-7 h-7 text-blue-500" />,
    title: 'Send Test Payments',
    description: 'Try sending a payment to another agent for a sample service.'
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-blue-500" />,
    title: 'View Agent Details & Transactions',
    description: 'Monitor your agent’s activity and balances in the dashboard.'
  }
]

export default function GetStartedPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero / Welcome Section */}
      <motion.section
        className="w-full py-16 bg-gradient-to-r from-blue-100 to-blue-50 border-b"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        custom={0}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let’s Get You Started</h1>
          <p className="mt-2 text-lg text-gray-700">
            Launch your first AI agent and start transacting autonomously in just a few steps.
          </p>
          {/* Optional: Intro Video */}
          <div className="flex justify-center mt-8">
            <div className="rounded-xl overflow-hidden shadow-lg border bg-white max-w-xl w-full">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Intro Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Steps Section */}
      <motion.section
        className="w-full py-12 bg-white border-b"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        custom={1}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {quickSteps.map((step, i) => (
              <motion.div
                key={step.title}
                className="bg-white rounded-2xl shadow p-6 border flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              >
                <div className="mb-3">{step.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition font-semibold text-lg">
              Go to Dashboard &rarr;
            </Link>
            <Link href="/faucet" className="inline-block bg-white border border-blue-600 text-blue-600 px-8 py-3 rounded-lg shadow hover:bg-blue-50 transition font-semibold text-lg">
              Testnet Faucet
            </Link>
            <a href="https://docs.aiagentpayment.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-white border border-blue-600 text-blue-600 px-8 py-3 rounded-lg shadow hover:bg-blue-50 transition font-semibold text-lg">
              Documentation
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  )
} 