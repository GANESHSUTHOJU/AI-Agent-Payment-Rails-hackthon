import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Agent Payment Rails',
  description: 'Decentralized payment infrastructure for autonomous AI agents to transact value securely across networks',
  keywords: ['AI', 'blockchain', 'payments', 'autonomous agents', 'Monad', 'decentralized'],
  authors: [{ name: 'AI Agent Payment Rails Team' }],
  openGraph: {
    title: 'AI Agent Payment Rails',
    description: 'The economic layer for the autonomous AI revolution',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  )
} 