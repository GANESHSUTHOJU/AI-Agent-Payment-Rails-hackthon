"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const [nickname, setNickname] = useState("AgentX")
  const [visibility, setVisibility] = useState(true)
  const [currency, setCurrency] = useState("USDC")
  const [darkMode, setDarkMode] = useState(false)
  const [spendingLimit, setSpendingLimit] = useState(1000)
  const [network, setNetwork] = useState("Testnet")

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Wallet Address</h3>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground flex items-center gap-2">
            0x12cd...ab23 <Button variant="ghost">Copy</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Agent Nickname</h3>
          </CardHeader>
          <CardContent>
            <Input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="AgentX" />
            <Button className="mt-2">Save</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Agent Visibility</h3>
          </CardHeader>
          <CardContent>
            <Button variant={visibility ? "default" : "outline"} onClick={() => setVisibility(!visibility)}>
              {visibility ? "Public" : "Private"}
            </Button>
          </CardContent>
        </Card>
        {/* Preferences */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Preferences</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Dark Mode</label>
              <Button variant={darkMode ? "default" : "outline"} onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div>
              <label className="block mb-1 font-medium">Default Currency</label>
              <select value={currency} onChange={e => setCurrency(e.target.value)} className="border rounded px-3 py-2">
                <option>USDC</option>
                <option>MONAD</option>
                <option>DAI</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Language</label>
              <select className="border rounded px-3 py-2">
                <option>English</option>
                <option>Spanish</option>
                <option>Chinese</option>
              </select>
            </div>
          </CardContent>
        </Card>
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Security Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Revoke Token Permissions</Button>
            <div>
              <label className="block mb-1 font-medium">Spending Limit (USDC)</label>
              <Input type="number" value={spendingLimit} onChange={e => setSpendingLimit(Number(e.target.value))} />
              <Button className="mt-2">Set Limit</Button>
            </div>
            <div>
              <label className="block mb-1 font-medium">Transaction Approvals</label>
              <Button variant="outline">Enable Manual Confirm</Button>
            </div>
          </CardContent>
        </Card>
        {/* Dev Tools */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Dev Tools</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Network</label>
              <Button variant={network === "Testnet" ? "default" : "outline"} onClick={() => setNetwork(network === "Testnet" ? "Mainnet" : "Testnet")}>{network}</Button>
            </div>
            <div>
              <label className="block mb-1 font-medium">Smart Contract Addresses</label>
              <Input value="0x1234...abcd" readOnly />
            </div>
            <div>
              <label className="block mb-1 font-medium">Simulate Agent Behavior</label>
              <Button variant="outline">Send Mock Payload</Button>
            </div>
            <div>
              <label className="block mb-1 font-medium">Webhook Config</label>
              <Input placeholder="https://your-webhook.url" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 