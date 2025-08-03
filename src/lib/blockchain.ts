import { ethers } from 'ethers'
import { PaymentCurrency, Transaction } from '@/types'

// Monad Blockchain Configuration
export const MONAD_CONFIG = {
  rpcUrl: process.env.NEXT_PUBLIC_MONAD_RPC_URL || 'https://rpc.monad.xyz',
  chainId: 1337, // Testnet chain ID
  blockTime: 1, // 1 second block time
  gasLimit: 30000000, // 30M gas limit
}

// Token Contract Addresses (Monad Testnet)
export const TOKEN_ADDRESSES = {
  USDC: '0x1234567890123456789012345678901234567890', // Placeholder
  DAI: '0x2345678901234567890123456789012345678901', // Placeholder
  MONAD: '0x3456789012345678901234567890123456789012', // Placeholder
}

// ERC20 Token ABI (minimal for transfers)
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
]

// Payment Contract ABI (for AI agent payments)
const PAYMENT_CONTRACT_ABI = [
  'function processPayment(address from, address to, uint256 amount, string memory description) returns (bool)',
  'function getPaymentStatus(bytes32 paymentId) view returns (uint8)',
  'function createEscrow(address from, address to, uint256 amount) returns (bytes32)',
  'function releaseEscrow(bytes32 escrowId) returns (bool)',
  'function cancelEscrow(bytes32 escrowId) returns (bool)',
  'event PaymentProcessed(bytes32 indexed paymentId, address indexed from, address indexed to, uint256 amount)',
  'event EscrowCreated(bytes32 indexed escrowId, address indexed from, address indexed to, uint256 amount)',
  'event EscrowReleased(bytes32 indexed escrowId)',
]

export class MonadBlockchain {
  private provider: ethers.JsonRpcProvider
  private paymentContract: ethers.Contract

  constructor() {
    this.provider = new ethers.JsonRpcProvider(MONAD_CONFIG.rpcUrl)
    this.paymentContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
      PAYMENT_CONTRACT_ABI,
      this.provider
    )
  }

  // Get wallet balance for a specific token
  async getTokenBalance(walletAddress: string, currency: PaymentCurrency): Promise<number> {
    try {
      const tokenAddress = TOKEN_ADDRESSES[currency.toUpperCase() as keyof typeof TOKEN_ADDRESSES]
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, this.provider)
      
      const balance = await tokenContract.balanceOf(walletAddress)
      const decimals = await tokenContract.decimals()
      
      return parseFloat(ethers.formatUnits(balance, decimals))
    } catch (error) {
      console.error(`Error getting ${currency} balance:`, error)
      return 0
    }
  }

  // Get all token balances for a wallet
  async getWalletBalances(walletAddress: string) {
    const balances = await Promise.all([
      this.getTokenBalance(walletAddress, PaymentCurrency.USDC),
      this.getTokenBalance(walletAddress, PaymentCurrency.DAI),
      this.getTokenBalance(walletAddress, PaymentCurrency.MONAD),
    ])

    return {
      usdc: balances[0],
      dai: balances[1],
      monad: balances[2],
    }
  }

  // Process a payment between AI agents
  async processPayment(
    fromAddress: string,
    toAddress: string,
    amount: number,
    currency: PaymentCurrency,
    description: string,
    signer: ethers.Signer
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      const tokenAddress = TOKEN_ADDRESSES[currency.toUpperCase() as keyof typeof TOKEN_ADDRESSES]
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
      
      // Convert amount to wei
      const decimals = await tokenContract.decimals()
      const amountWei = ethers.parseUnits(amount.toString(), decimals)
      
      // Check balance
      const balance = await tokenContract.balanceOf(fromAddress)
      if (balance < amountWei) {
        return { success: false, error: 'Insufficient balance' }
      }

      // Transfer tokens
      const tx = await tokenContract.transfer(toAddress, amountWei, {
        gasLimit: MONAD_CONFIG.gasLimit,
      })

      const receipt = await tx.wait()
      
      return {
        success: true,
        transactionHash: receipt.hash,
      }
    } catch (error) {
      console.error('Payment processing error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Create an escrow for a service payment
  async createEscrow(
    fromAddress: string,
    toAddress: string,
    amount: number,
    currency: PaymentCurrency,
    signer: ethers.Signer
  ): Promise<{ success: boolean; escrowId?: string; transactionHash?: string; error?: string }> {
    try {
      const tokenAddress = TOKEN_ADDRESSES[currency.toUpperCase() as keyof typeof TOKEN_ADDRESSES]
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
      
      // Convert amount to wei
      const decimals = await tokenContract.decimals()
      const amountWei = ethers.parseUnits(amount.toString(), decimals)
      
      // Approve payment contract to spend tokens
      const approveTx = await tokenContract.approve(this.paymentContract.target, amountWei)
      await approveTx.wait()
      
      // Create escrow
      const tx = await this.paymentContract.createEscrow(fromAddress, toAddress, amountWei, {
        gasLimit: MONAD_CONFIG.gasLimit,
      })
      
      const receipt = await tx.wait()
      
      // Find escrow ID from events
      const escrowEvent = receipt.logs.find((log: any) => 
        log.fragment?.name === 'EscrowCreated'
      )
      
      const escrowId = escrowEvent ? escrowEvent.args[0] : undefined
      
      return {
        success: true,
        escrowId,
        transactionHash: receipt.hash,
      }
    } catch (error) {
      console.error('Escrow creation error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Release escrow funds
  async releaseEscrow(
    escrowId: string,
    signer: ethers.Signer
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      const tx = await this.paymentContract.releaseEscrow(escrowId, {
        gasLimit: MONAD_CONFIG.gasLimit,
      })
      
      const receipt = await tx.wait()
      
      return {
        success: true,
        transactionHash: receipt.hash,
      }
    } catch (error) {
      console.error('Escrow release error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Get transaction details
  async getTransaction(hash: string): Promise<Transaction | null> {
    try {
      const tx = await this.provider.getTransaction(hash)
      const receipt = await this.provider.getTransactionReceipt(hash)
      
      if (!tx || !receipt) return null
      
      return {
        hash: tx.hash,
        from: tx.from,
        to: tx.to || '',
        value: tx.value.toString(),
        gasUsed: receipt.gasUsed.toString(),
        gasPrice: tx.gasPrice?.toString() || '0',
        blockNumber: receipt.blockNumber,
        timestamp: new Date(), // Would need to get from block
        status: receipt.status === 1 ? 'success' : 'failed',
      }
    } catch (error) {
      console.error('Error getting transaction:', error)
      return null
    }
  }

  // Get recent transactions for a wallet
  async getWalletTransactions(walletAddress: string, limit: number = 10): Promise<Transaction[]> {
    // This would typically require an indexer or API
    // For now, return empty array
    return []
  }

  // Estimate gas for a transaction
  async estimateGas(
    fromAddress: string,
    toAddress: string,
    amount: number,
    currency: PaymentCurrency
  ): Promise<number> {
    try {
      const tokenAddress = TOKEN_ADDRESSES[currency.toUpperCase() as keyof typeof TOKEN_ADDRESSES]
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, this.provider)
      
      const decimals = await tokenContract.decimals()
      const amountWei = ethers.parseUnits(amount.toString(), decimals)
      
      const gasEstimate = await tokenContract.transfer.estimateGas(toAddress, amountWei, {
        from: fromAddress,
      })
      
      return Number(gasEstimate)
    } catch (error) {
      console.error('Gas estimation error:', error)
      return MONAD_CONFIG.gasLimit
    }
  }
}

// Singleton instance
export const monadBlockchain = new MonadBlockchain() 

// Blockchain integration stubs for Monad
// TODO: Replace with real Monad contract addresses and ABI

export async function connectWallet() {
  // TODO: Implement real wallet connection
  return { address: '0x1234...abcd' };
}

export async function sendPayment({ from, to, amount, token }: { from: string, to: string, amount: number, token: string }) {
  // TODO: Implement real payment logic using Monad smart contracts
  return { txHash: '0xabc123...', status: 'pending' };
}

export async function registerAgent({ owner, name }: { owner: string, name: string }) {
  // TODO: Implement agent registration on-chain
  return { agentId: 'agent-001', status: 'registered' };
}

export async function getAgent(agentId: string) {
  // TODO: Fetch agent info from blockchain
  return { id: agentId, name: 'AgentX', owner: '0x1234...abcd', services: [] };
}

export async function getTransactionHistory(address: string) {
  // TODO: Fetch transaction history from blockchain
  return [
    { txHash: '0xabc123...', from: address, to: '0x5678...efgh', amount: 10, token: 'USDC', status: 'confirmed' }
  ];
} 