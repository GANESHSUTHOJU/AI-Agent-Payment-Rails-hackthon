"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const overview = [
  { label: "💼 Total Agents", value: 124 },
  { label: "🔄 Total Transactions", value: 3201 },
  { label: "💰 Total Volume (USDC)", value: "$42,500" },
  { label: "🟢 Active Agents", value: 37 },
]

const volumeData = [
  { date: "2024-06-01", USDC: 1200, MONAD: 800 },
  { date: "2024-06-02", USDC: 1500, MONAD: 900 },
  { date: "2024-06-03", USDC: 1800, MONAD: 1100 },
  { date: "2024-06-04", USDC: 2000, MONAD: 1200 },
  { date: "2024-06-05", USDC: 1700, MONAD: 950 },
  { date: "2024-06-06", USDC: 2100, MONAD: 1300 },
  { date: "2024-06-07", USDC: 2500, MONAD: 1400 },
]

const topAgents = [
  { name: "AgentX", services: 3, tx: 452, earned: "1,200 USDC" },
  { name: "DataBot", services: 2, tx: 390, earned: "950 USDC" },
  { name: "ComputeAI", services: 4, tx: 320, earned: "1,500 USDC" },
]

const activityFeed = [
  { type: "Transaction", desc: "AgentX paid 10 USDC to DataBot", time: "2m ago" },
  { type: "Service Created", desc: "ComputeAI listed GPU Rental", time: "10m ago" },
  { type: "Agent Registered", desc: "New agent StoragePro joined", time: "1h ago" },
  { type: "Transaction", desc: "RecoAI paid 5 USDC to AgentX", time: "2h ago" },
]

const dateRanges = ["Last 7 days", "Last 30 days", "All time"]
const tokens = ["USDC", "MONAD"]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState(dateRanges[0])
  const [token, setToken] = useState(tokens[0])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Analytics Dashboard</h1>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="border rounded px-3 py-2">
          {dateRanges.map(r => <option key={r}>{r}</option>)}
        </select>
        <select value={token} onChange={e => setToken(e.target.value)} className="border rounded px-3 py-2">
          {tokens.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {overview.map(card => (
          <Card key={card.label} className="text-center">
            <CardHeader className="font-semibold text-lg">{card.label}</CardHeader>
            <CardContent className="text-3xl font-bold py-6">{card.value}</CardContent>
          </Card>
        ))}
      </div>
      {/* Transaction Volume Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="font-semibold mb-4">Transaction Volume (Mock Chart)</h2>
        {/* Replace with recharts or @nivo/line for real chart */}
        <div className="h-48 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
      </div>
      {/* Top Agents Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-10 max-w-4xl mx-auto overflow-x-auto">
        <h2 className="font-semibold mb-4">Top Agents</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Agent Name</th>
              <th className="py-2 px-4">Services</th>
              <th className="py-2 px-4">Tx Count</th>
              <th className="py-2 px-4">Total Earned</th>
            </tr>
          </thead>
          <tbody>
            {topAgents.map(agent => (
              <tr key={agent.name} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4 font-semibold">{agent.name}</td>
                <td className="py-2 px-4">{agent.services}</td>
                <td className="py-2 px-4">{agent.tx}</td>
                <td className="py-2 px-4">{agent.earned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Recent Activity Feed */}
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {activityFeed.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-blue-500 font-bold">{item.type}:</span>
              <span>{item.desc}</span>
              <span className="ml-auto text-xs text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 