'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Coins, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  ExternalLink
} from 'lucide-react'
import { web3Service } from '@/lib/web3-provider'

interface FaucetRequest {
  address: string
  amount: string
  token: 'MONAD' | 'USDC' | 'DAI'
  status: 'pending' | 'success' | 'failed'
  txHash?: string
  timestamp: Date
}

export function TestnetFaucet() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requests, setRequests] = useState<FaucetRequest[]>([])

  const faucetTokens = [
    { symbol: 'MONAD', name: 'Monad Token', amount: '100', color: 'bg-blue-100 text-blue-800' },
    { symbol: 'USDC', name: 'USD Coin', amount: '1000', color: 'bg-green-100 text-green-800' },
    { symbol: 'DAI', name: 'Dai Stablecoin', amount: '1000', color: 'bg-yellow-100 text-yellow-800' }
  ]

  const requestTokens = async (token: 'MONAD' | 'USDC' | 'DAI') => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Check if wallet is connected
      if (!web3Service.isConnected()) {
        throw new Error('Please connect your wallet first')
      }

      const address = web3Service.getAddress()
      if (!address) {
        throw new Error('No wallet address found')
      }

      // Create faucet request
      const request: FaucetRequest = {
        address,
        amount: faucetTokens.find(t => t.symbol === token)?.amount || '100',
        token,
        status: 'pending',
        timestamp: new Date()
      }

      setRequests(prev => [request, ...prev])

      // Simulate faucet request (in real implementation, this would call the faucet API)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate successful response
      const updatedRequest = {
        ...request,
        status: 'success' as const,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`
      }

      setRequests(prev => 
        prev.map(r => r.address === address && r.token === token ? updatedRequest : r)
      )

      setSuccess(`${token} tokens have been sent to your wallet!`)
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000)

    } catch (err: any) {
      console.error('Faucet error:', err)
      setError(err?.message || 'Failed to request tokens')
      
      // Update request status to failed
      const address = web3Service.getAddress()
      if (address) {
        setRequests(prev => 
          prev.map(r => 
            r.address === address && r.token === token 
              ? { ...r, status: 'failed' as const }
              : r
          )
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-blue-600" />
            <span>Monad Testnet Faucet</span>
          </CardTitle>
          <CardDescription>
            Request test tokens for development and testing on the Monad testnet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Token Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {faucetTokens.map((token) => (
                <Card key={token.symbol} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{token.name}</h3>
                    <Badge className={token.color}>
                      {token.symbol}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Get {token.amount} {token.symbol} for testing
                  </p>
                  <Button
                    onClick={() => requestTokens(token.symbol as any)}
                    disabled={loading}
                    className="w-full"
                    variant="outline"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Requesting...
                      </>
                    ) : (
                      <>
                        <Coins className="w-4 h-4 mr-2" />
                        Request {token.symbol}
                      </>
                    )}
                  </Button>
                </Card>
              ))}
            </div>

            {/* Alerts */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Recent Requests */}
            {requests.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">Recent Requests</h3>
                <div className="space-y-2">
                  {requests.slice(0, 5).map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(request.status)}
                        <div>
                          <div className="font-medium">
                            {request.amount} {request.token}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.address.slice(0, 6)}...{request.address.slice(-4)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        {request.txHash && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`https://explorer.monad.xyz/tx/${request.txHash}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">How to use the faucet:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Connect your wallet using MetaMask</li>
                <li>2. Switch to Monad Testnet (Chain ID: 420)</li>
                <li>3. Click on any token to request test tokens</li>
                <li>4. Wait for the transaction to be confirmed</li>
                <li>5. Use the tokens for testing and development</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 