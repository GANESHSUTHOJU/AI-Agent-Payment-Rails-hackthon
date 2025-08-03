import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch payments from database or blockchain
  return NextResponse.json([
    { txHash: '0xabc123...', from: '0x1234...abcd', to: '0x5678...efgh', amount: 10, token: 'USDC', status: 'confirmed' },
  ]);
}

export async function POST(request: Request) {
  // TODO: Send payment via blockchain
  const data = await request.json();
  return NextResponse.json({ txHash: '0xdef456...', ...data, status: 'pending' });
} 