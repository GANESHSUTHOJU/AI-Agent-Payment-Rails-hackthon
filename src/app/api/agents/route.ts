import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch agents from database or blockchain
  return NextResponse.json([
    { id: 'agent-001', name: 'AgentX', owner: '0x1234...abcd' },
    { id: 'agent-002', name: 'DataBot', owner: '0x5678...efgh' },
  ]);
}

export async function POST(request: Request) {
  // TODO: Register agent in database or blockchain
  const data = await request.json();
  return NextResponse.json({ id: 'agent-003', ...data, status: 'registered' });
} 