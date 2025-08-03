import { ethers } from 'ethers';

export interface Web3Provider {
  provider: ethers.BrowserProvider;
  signer: ethers.JsonRpcSigner;
  address: string;
  chainId: number;
}

export class Web3Service {
  private static instance: Web3Service;
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private address: string | null = null;
  private chainId: number | null = null;

  private constructor() {}

  static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  async connect(): Promise<Web3Provider> {
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

    try {
      // Create provider
      this.provider = new ethers.BrowserProvider(ethereum);
      
      // Request account access
      const accounts = await this.provider.send('eth_requestAccounts', []);
      
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect your wallet.');
      }

      this.address = accounts[0];
      this.signer = await this.provider.getSigner();
      
      // Get network info
      const network = await this.provider.getNetwork();
      this.chainId = Number(network.chainId);

      return {
        provider: this.provider,
        signer: this.signer,
        address: this.address,
        chainId: this.chainId,
      };
    } catch (error: any) {
      console.error('Web3 connection error:', error);
      throw new Error(error?.message || 'Failed to connect wallet');
    }
  }

  async switchToMonadNetwork(): Promise<void> {
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
  }

  async getBalance(address?: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not connected');
    }

    const targetAddress = address || this.address;
    if (!targetAddress) {
      throw new Error('No address provided');
    }

    const balance = await this.provider.getBalance(targetAddress);
    return ethers.formatEther(balance);
  }

  async sendTransaction(to: string, amount: string): Promise<ethers.TransactionResponse> {
    if (!this.signer) {
      throw new Error('Signer not connected');
    }

    const tx = await this.signer.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });

    return tx;
  }

  async signMessage(message: string): Promise<string> {
    if (!this.signer) {
      throw new Error('Signer not connected');
    }

    return await this.signer.signMessage(message);
  }

  isConnected(): boolean {
    return !!this.provider && !!this.address;
  }

  getAddress(): string | null {
    return this.address;
  }

  getChainId(): number | null {
    return this.chainId;
  }

  disconnect(): void {
    this.provider = null;
    this.signer = null;
    this.address = null;
    this.chainId = null;
  }

  // Method to check if wallet is still connected
  async checkConnection(): Promise<boolean> {
    if (typeof window === 'undefined' || !window.ethereum) {
      return false;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts.length > 0;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const web3Service = Web3Service.getInstance(); 