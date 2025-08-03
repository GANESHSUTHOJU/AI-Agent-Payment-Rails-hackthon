'use client'

import { TestnetFaucet } from '@/components/testnet-faucet'

export default function FaucetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Monad Testnet Faucet
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get test tokens for development and testing on the Monad blockchain. 
            Connect your wallet and request tokens to start building.
          </p>
        </div>
        
        <TestnetFaucet />
      </div>
    </div>
  )
} 