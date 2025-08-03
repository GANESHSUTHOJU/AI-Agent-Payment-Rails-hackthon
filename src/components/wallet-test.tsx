'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Wallet, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Info
} from 'lucide-react'

export function WalletTest() {
  const [walletStatus, setWalletStatus] = useState<string>('Not Connected')
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const checkWalletStatus = async () => {
    setLoading(true)
    setError(null)

    try {
      if (typeof window === 'undefined') {
        setWalletStatus('Browser not supported')
        return
      }

      const { ethereum } = window

      if (!ethereum) {
        setWalletStatus('MetaMask not installed')
        return
      }

      if (!ethereum.isMetaMask) {
        setWalletStatus('Not MetaMask wallet')
        return
      }

      // Check if connected
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      
      if (accounts.length > 0) {
        setAccount(accounts[0])
        setWalletStatus('Connected')
        
        // Get chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' })
        setChainId(chainId)
      } else {
        setAccount(null)
        setChainId(null)
        setWalletStatus('Not Connected')
      }

    } catch (err: any) {
      setError(err?.message || 'Failed to check wallet status')
      setWalletStatus('Error')
    } finally {
      setLoading(false)
    }
  }

  const connectWallet = async () => {
    setLoading(true)
    setError(null)

    try {
      if (typeof window === 'undefined') {
        throw new Error('Browser not supported')
      }

      const { ethereum } = window

      if (!ethereum) {
        throw new Error('MetaMask not installed')
      }

      if (!ethereum.isMetaMask) {
        throw new Error('Please use MetaMask wallet')
      }

      // Request account access
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      setAccount(accounts[0])
      setWalletStatus('Connected')

      // Get chain ID
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      setChainId(chainId)

    } catch (err: any) {
      setError(err?.message || 'Failed to connect wallet')
      setWalletStatus('Error')
    } finally {
      setLoading(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setChainId(null)
    setWalletStatus('Not Connected')
    setError(null)
  }

  useEffect(() => {
    checkWalletStatus()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return 'bg-green-100 text-green-800'
      case 'Not Connected':
        return 'bg-yellow-100 text-yellow-800'
      case 'Error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="w-5 h-5" />
          <span>Wallet Connection Test</span>
        </CardTitle>
        <CardDescription>
          Test and debug wallet connection issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge className={getStatusColor(walletStatus)}>
            {walletStatus}
          </Badge>
        </div>

        {/* Account */}
        {account && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Account:</span>
            <span className="text-sm font-mono">{formatAddress(account)}</span>
          </div>
        )}

        {/* Chain ID */}
        {chainId && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Chain ID:</span>
            <span className="text-sm font-mono">{chainId}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            onClick={checkWalletStatus}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          {walletStatus === 'Not Connected' ? (
            <Button
              onClick={connectWallet}
              disabled={loading}
              size="sm"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect
            </Button>
          ) : (
            <Button
              onClick={disconnectWallet}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              Disconnect
            </Button>
          )}
        </div>

        {/* Info */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This component helps debug wallet connection issues. Check the browser console for detailed logs.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
} 