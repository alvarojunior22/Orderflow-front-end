"use client"

import { DashboardLayout } from "../../layout/Dasboard.layout"
import { SettingsTabs } from "@/components/settings-tabs"

export default function SettingsPage() {
  return (
    <DashboardLayout currentPage="Settings">
      <div className="max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Configure your store and AI agent behavior</p>
        </div>

        <SettingsTabs />
      </div>
    </DashboardLayout>
  )
}
