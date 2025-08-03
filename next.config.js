/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_MONAD_RPC_URL: process.env.NEXT_PUBLIC_MONAD_RPC_URL || 'https://rpc.monad.xyz',
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  },
}

module.exports = nextConfig 