"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { WalletIcon, AlertCircle, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Window {
  ethereum?: any;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  // Check for existing connection on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMetaMask = () => {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
          setIsMetaMaskInstalled(true);
          // Check if already connected
          ethereum.request({ method: 'eth_accounts' })
            .then((accounts: string[]) => {
              if (accounts.length > 0) {
                setAccount(accounts[0]);
              }
            })
            .catch((err: any) => {
              console.log('No accounts found');
            });
        } else {
          setIsMetaMaskInstalled(false);
        }
      };

      checkMetaMask();

      // Listen for account changes
      if (window.ethereum) {
        const handleAccountsChanged = (accounts: string[]) => {
          console.log('Accounts changed:', accounts);
          if (accounts.length === 0) {
            setAccount(null);
            setError(null);
          } else if (accounts[0] !== account) {
            setAccount(accounts[0]);
            setError(null);
          }
        };

        const handleChainChanged = () => {
          console.log('Chain changed');
          // Reload the page when chain changes
          window.location.reload();
        };

        const handleDisconnect = () => {
          console.log('Wallet disconnected');
          setAccount(null);
          setError(null);
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        window.ethereum.on('disconnect', handleDisconnect);

        return () => {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
          window.ethereum.removeListener('disconnect', handleDisconnect);
        };
      }
    }
  }, []);

  const connectWallet = async () => {
    setError(null);
    setLoading(true);

    try {
      if (typeof window === 'undefined') {
        throw new Error('Window object not available');
      }

      const { ethereum } = window;

      if (!ethereum) {
        throw new Error('MetaMask not found. Please install MetaMask extension.');
      }

      if (!ethereum.isMetaMask) {
        throw new Error('Please use MetaMask wallet.');
      }

      // Request account access
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect your wallet.');
      }

      setAccount(accounts[0]);
      setLoading(false);

      // Optional: Switch to Monad network
      try {
        await switchToMonadNetwork();
      } catch (networkError) {
        console.log('Network switch failed, but wallet is connected');
      }

    } catch (err: any) {
      console.error('Wallet connection error:', err);
      setError(err?.message || 'Failed to connect wallet');
      setLoading(false);
    }
  };

  const switchToMonadNetwork = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask not available');
    }

    try {
      const monadNetwork = {
        chainId: '0x1a4', // 420 in hex
        chainName: 'Monad Testnet',
        nativeCurrency: {
          name: 'MONAD',
          symbol: 'MONAD',
          decimals: 18,
        },
        rpcUrls: ['https://rpc.monad.xyz'],
        blockExplorerUrls: ['https://explorer.monad.xyz'],
      };

      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [monadNetwork],
      });
    } catch (error: any) {
      if (error.code !== 4902) {
        throw error;
      }
    }
  };

  const disconnectWallet = async () => {
    try {
      // Clear local state
      setAccount(null);
      setError(null);
      
      // Try to disconnect from MetaMask (if supported)
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          // Some wallets support a disconnect method
          if (window.ethereum.disconnect) {
            await window.ethereum.disconnect();
          }
        } catch (e) {
          console.log('Disconnect method not supported');
        }
      }
      
      console.log('Wallet disconnected successfully');
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
      // Even if disconnect fails, clear the local state
      setAccount(null);
      setError(null);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isMetaMaskInstalled) {
    return (
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          onClick={() => window.open('https://metamask.io/download/', '_blank')}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          <WalletIcon className="w-4 h-4 mr-2" />
          Install MetaMask
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {account ? (
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {formatAddress(account)}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={disconnectWallet}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            title="Disconnect Wallet"
          >
            <LogOut className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          onClick={connectWallet} 
          disabled={loading}
          className="hover:bg-blue-50 hover:border-blue-300"
        >
          <WalletIcon className="w-4 h-4 mr-2" />
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
      
      {error && (
        <div className="flex items-center space-x-1 text-red-500 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
} 