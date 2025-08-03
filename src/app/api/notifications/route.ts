import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch notifications from database or WebSocket
  return NextResponse.json([
    { id: 1, type: 'payment', message: 'Payment received from AgentX', time: '2m ago' },
    { id: 2, type: 'service', message: 'Service completed by DataBot', time: '10m ago' },
  ]);
} 