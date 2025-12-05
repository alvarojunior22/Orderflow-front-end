"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { MessageSquare, CheckCircle2 } from "lucide-react"

const tabs = [
  { id: "general", label: "General" },
  { id: "ai-agent", label: "AI Agent" },
  { id: "integrations", label: "Integrations" },
  { id: "team", label: "Team" },
]

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("ai-agent")
  const [allowSubstitution, setAllowSubstitution] = useState(true)
  const [sellZeroStock, setSellZeroStock] = useState(false)
  const [responseLength, setResponseLength] = useState([50])
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a friendly and helpful AI assistant for OrderFlow. Your role is to help customers place orders smoothly, answer questions about products, and provide excellent service.",
  )

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "ai-agent" && (
          <div className="space-y-6">
            {/* Personality Section */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="system-prompt" className="text-sm font-medium text-slate-900">
                  System Prompt / Agent Personality
                </Label>
                <p className="text-xs text-slate-500 mt-1">
                  Define how your AI assistant should interact with customers
                </p>
              </div>
              <Textarea
                id="system-prompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="You are a friendly assistant..."
                className="min-h-[120px] bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>

            {/* Inventory Rules */}
            <Card className="bg-slate-50 border-slate-200 shadow-none p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Inventory Rules</h3>
                <p className="text-xs text-slate-500 mt-1">Configure how the AI handles product availability</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-substitution" className="text-sm font-medium text-slate-900">
                      Allow substitution suggestions?
                    </Label>
                    <p className="text-xs text-slate-500">Suggest similar items when products are unavailable</p>
                  </div>
                  <Switch id="allow-substitution" checked={allowSubstitution} onCheckedChange={setAllowSubstitution} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sell-zero-stock" className="text-sm font-medium text-slate-900">
                      Sell items with 0 stock?
                    </Label>
                    <p className="text-xs text-slate-500">
                      {sellZeroStock ? "Flexible Mode - Allow orders" : "Strict Mode - Prevent orders"}
                    </p>
                  </div>
                  <Switch id="sell-zero-stock" checked={sellZeroStock} onCheckedChange={setSellZeroStock} />
                </div>
              </div>
            </Card>

            {/* Response Length */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="response-length" className="text-sm font-medium text-slate-900">
                  Response Length
                </Label>
                <p className="text-xs text-slate-500 mt-1">Adjust how detailed the AI responses should be</p>
              </div>
              <div className="pt-2">
                <Slider
                  id="response-length"
                  value={responseLength}
                  onValueChange={setResponseLength}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-500">Short / Concise</span>
                  <span className="text-xs text-slate-500">Detailed / Friendly</span>
                </div>
              </div>
            </div>

            {/* Connected Channels */}
            <div className="pt-6 border-t border-slate-200">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900">Connected Channels</h3>
                <p className="text-xs text-slate-500 mt-1">Manage messaging platform integrations</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Telegram - Connected */}
                <Card className="bg-white border-slate-200 shadow-sm p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Connected
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">Telegram</h4>
                  <p className="text-xs text-slate-500 mb-3">Receive orders via Telegram bot</p>
                  <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                    Configure
                  </Button>
                </Card>

                {/* WhatsApp - Not Connected */}
                <Card className="bg-white border-slate-200 shadow-sm p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-slate-400">Not Connected</div>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">WhatsApp</h4>
                  <p className="text-xs text-slate-500 mb-3">Accept orders via WhatsApp Business</p>
                  <Button size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700">
                    Connect
                  </Button>
                </Card>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== "ai-agent" && (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm">{tabs.find((t) => t.id === activeTab)?.label} content coming soon</p>
          </div>
        )}
      </div>
    </Card>
  )
}
