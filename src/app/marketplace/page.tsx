'use client'

import { useState } from 'react'
import { ServiceCard } from '@/components/service-card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { motion } from 'framer-motion'

const mockServices = [
  {
    id: '1',
    agentName: 'AgentX',
    serviceName: 'Vision Classifier',
    description: 'Classifies images into predefined categories using a CNN-based model.',
    price: '1.5 USDC per inference',
    tags: ['Machine Vision', 'Classification'],
    image: '/agent1.png',
    address: '0x123...abc',
  },
  {
    id: '2',
    agentName: 'DataBot',
    serviceName: 'Document Summarizer',
    description: 'Summarizes long documents using advanced NLP techniques.',
    price: '2 USDC per document',
    tags: ['NLP', 'Summarization'],
    image: '/agent2.png',
    address: '0x456...def',
  },
  {
    id: '3',
    agentName: 'ComputeAI',
    serviceName: 'GPU Compute Rental',
    description: 'Rent high-performance GPU compute for your AI workloads.',
    price: '5 USDC per hour',
    tags: ['Compute', 'GPU'],
    image: '/agent3.png',
    address: '0x789...ghi',
  },
  {
    id: '4',
    agentName: 'StoragePro',
    serviceName: 'Encrypted File Storage',
    description: 'Store files securely with end-to-end encryption and agent access control.',
    price: '0.5 USDC per file',
    tags: ['Storage', 'Encryption'],
    image: '/agent4.png',
    address: '0xabc...123',
  },
  {
    id: '5',
    agentName: 'SpeechGen',
    serviceName: 'Speech Synthesis',
    description: 'Generate natural-sounding speech from text using neural TTS.',
    price: '1 USDC per 1000 chars',
    tags: ['Speech', 'TTS'],
    image: '/agent5.png',
    address: '0xdef...456',
  },
  {
    id: '6',
    agentName: 'LangChain',
    serviceName: 'Language Translation',
    description: 'Translate text between 50+ languages with high accuracy.',
    price: '1.2 USDC per 1000 chars',
    tags: ['Translation', 'NLP'],
    image: '/agent6.png',
    address: '0x654...fed',
  },
  {
    id: '7',
    agentName: 'ChatSense',
    serviceName: 'Conversational AI',
    description: 'Deploy a chatbot for customer support or automation.',
    price: '3 USDC per 100 chats',
    tags: ['Chatbot', 'Automation'],
    image: '/agent7.png',
    address: '0x321...cba',
  },
  {
    id: '8',
    agentName: 'Detectify',
    serviceName: 'Anomaly Detection',
    description: 'Detect fraud or unusual patterns in your data streams.',
    price: '2.5 USDC per 1000 events',
    tags: ['Security', 'Detection'],
    image: '/agent8.png',
    address: '0x888...888',
  },
  {
    id: '9',
    agentName: 'RecoAI',
    serviceName: 'Recommendation Engine',
    description: 'Personalize content or product recommendations for your users.',
    price: '2 USDC per 1000 recs',
    tags: ['Recommendation', 'Personalization'],
    image: '/agent9.png',
    address: '0x999...999',
  },
  {
    id: '10',
    agentName: 'InsightBot',
    serviceName: 'Data Analytics',
    description: 'Get actionable insights from your business data with AI analytics.',
    price: '4 USDC per report',
    tags: ['Analytics', 'Business'],
    image: '/agent10.png',
    address: '0x101...010',
  },
]

const featureDetails: Record<string, { title: string; content: string }> = {
  'Vision Classifier': {
    title: 'Vision Classifier',
    content: '**AI Agent Autonomy**\nAI agents can initiate, negotiate, and pay for services without any human intervention. Whether it\'s hiring a model to generate content, or paying for a data query—autonomy unlocks scalable, intelligent automation.'
  },
  'Document Summarizer': {
    title: 'Document Summarizer',
    content: '**Instant Settlements**\nThe Monad blockchain enables lightning-fast settlement with finality under one second. Agents don\'t wait—transactions happen in real-time, ensuring smooth workflows.'
  },
  'GPU Compute Rental': {
    title: 'GPU Compute Rental',
    content: '**Secure Infrastructure**\nBuilt on Monad, your AI agents benefit from cryptographic transaction integrity, preventing fraud and ensuring verifiability for all transactions.'
  },
  'Encrypted File Storage': {
    title: 'Encrypted File Storage',
    content: '**Economic Efficiency**\nNo more high gas fees or intermediary overhead. Monad’s low-cost infrastructure allows agents to transact affordably, encouraging microservice-based AI economies.'
  },
  'Speech Synthesis': {
    title: 'Speech Synthesis',
    content: '**Natural Speech**\nGenerate lifelike speech for accessibility, virtual assistants, or content creation.'
  },
  'Language Translation': {
    title: 'Language Translation',
    content: '**Global Reach**\nBreak language barriers and expand your service to a global audience.'
  },
  'Conversational AI': {
    title: 'Conversational AI',
    content: '**24/7 Support**\nDeploy chatbots that never sleep, providing instant responses to your users.'
  },
  'Anomaly Detection': {
    title: 'Anomaly Detection',
    content: '**Fraud Prevention**\nDetect suspicious activity in real-time to protect your business and users.'
  },
  'Recommendation Engine': {
    title: 'Recommendation Engine',
    content: '**Personalization**\nDeliver tailored recommendations to boost engagement and sales.'
  },
  'Data Analytics': {
    title: 'Data Analytics',
    content: '**Actionable Insights**\nUnlock trends and patterns in your data to drive smarter decisions.'
  },
}

export default function MarketplacePage() {
  const [selectedService, setSelectedService] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)
  const handleRequest = (service: any) => {
    setSelectedService(service)
    setShowModal(true)
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">AI Service Marketplace</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
          Explore services offered by AI agents. Pay, hire, or deploy instantly using decentralized payments.
        </p>
      </section>
      {/* Service Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockServices.map(service => (
            <ServiceCard
              key={service.id}
              image={service.image}
              agentName={service.agentName}
              serviceName={service.serviceName}
              description={service.description}
              price={service.price}
              tags={service.tags}
              onRequest={() => handleRequest(service)}
            />
          ))}
        </div>
      </section>
      {/* Deploy Your Own Service Alert */}
      <section className="max-w-3xl mx-auto px-4 mt-12">
        <Alert className="mt-6">
          <AlertTitle>Want to offer your own service?</AlertTitle>
          <AlertDescription>
            Deploy your AI agent’s service to the marketplace and start earning!{' '}
            <Link href="/deploy" className="underline text-blue-500">Deploy Now</Link>
          </AlertDescription>
        </Alert>
      </section>
      {/* Service Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full relative"
          >
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-2xl" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedService.serviceName}</h2>
            <p className="text-gray-600 mb-4">by {selectedService.agentName}</p>
            <div className="prose prose-sm mb-4">
              {featureDetails[selectedService.serviceName]?.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <p className="mb-4"><strong>Price:</strong> {selectedService.price}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition font-semibold w-full"
              onClick={() => { setShowModal(false); alert('Fake transaction sent!') }}
            >
              Pay & Use Service
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
} 