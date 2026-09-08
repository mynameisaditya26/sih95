import React, { useState } from 'react'
import { User, Bell, Palette, Lock, Globe, SlidersHorizontal } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { useToast } from '../hooks/useToast'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TABS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'security', label: 'Security', icon: Lock },
  { key: 'language', label: 'Language', icon: Globe },
  { key: 'system', label: 'System Preferences', icon: SlidersHorizontal },
]

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-ink-100 px-3.5 py-2.5">
      <span className="text-sm text-ink-700">{label}</span>
      <button type="button" onClick={() => onChange(!checked)} className={`h-5 w-9 rounded-full transition-colors ${checked ? 'bg-brand-600' : 'bg-ink-200'}`}>
        <span className={`block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </button>
    </label>
  )
}

export default function SettingsPage() {
  const [tab, setTab] = useState('profile')
  const { user } = useAppState()
  const { toast } = useToast()
  const [notifPrefs, setNotifPrefs] = useLocalStorage('dosje_notif_prefs', { highRisk: true, anomalies: true, cctv: false, reports: true })
  const [theme, setTheme] = useLocalStorage('dosje_theme', 'light')
  const [lang, setLang] = useLocalStorage('dosje_lang', 'English')

  function save() { toast('Settings saved (demo — stored locally only).', 'success') }

  return (
    <div>
      <PageHeader title="Settings" description="Manage your profile, notification preferences, security and system settings." />

      <div className="card grid lg:grid-cols-[220px_1fr]">
        <div className="border-b border-ink-100 p-2 lg:border-b-0 lg:border-r">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${tab === t.key ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-ink-50'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === 'profile' && (
            <div className="max-w-md space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-600">Full Name</label>
                <input defaultValue={user?.name || 'Demo User'} className="input" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-600">Role</label>
                <input defaultValue={user?.role || 'DoSJE Admin'} disabled className="input bg-ink-50" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-600">Email</label>
                <input defaultValue="demo.user@dosje.gov.in" className="input" />
              </div>
              <button onClick={save} className="btn-primary">Save Changes</button>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="max-w-md space-y-2.5">
              <Toggle label="High Risk Alerts" checked={notifPrefs.highRisk} onChange={(v) => setNotifPrefs({ ...notifPrefs, highRisk: v })} />
              <Toggle label="AI Anomaly Alerts" checked={notifPrefs.anomalies} onChange={(v) => setNotifPrefs({ ...notifPrefs, anomalies: v })} />
              <Toggle label="CCTV Offline Alerts" checked={notifPrefs.cctv} onChange={(v) => setNotifPrefs({ ...notifPrefs, cctv: v })} />
              <Toggle label="Report Approval Reminders" checked={notifPrefs.reports} onChange={(v) => setNotifPrefs({ ...notifPrefs, reports: v })} />
              <button onClick={save} className="btn-primary mt-2">Save Preferences</button>
            </div>
          )}

          {tab === 'appearance' && (
            <div className="max-w-md space-y-3">
              <p className="text-xs font-semibold text-ink-600">Theme</p>
              <div className="flex gap-2">
                {['light', 'dark', 'system'].map((t) => (
                  <button key={t} onClick={() => setTheme(t)} className={`btn-secondary flex-1 capitalize ${theme === t ? '!border-brand-600 !text-brand-700 bg-brand-50' : ''}`}>{t}</button>
                ))}
              </div>
              <p className="text-xs text-ink-400">Note: this demo prototype is optimized for light theme; dark mode is illustrative only.</p>
            </div>
          )}

          {tab === 'security' && (
            <div className="max-w-md space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-600">Current Password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-600">New Password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>
              <Toggle label="Two-Factor Authentication" checked={false} onChange={() => toast('2FA setup would begin here (demo).', 'info')} />
              <button onClick={save} className="btn-primary">Update Security Settings</button>
            </div>
          )}

          {tab === 'language' && (
            <div className="max-w-md space-y-3">
              <p className="text-xs font-semibold text-ink-600">Interface Language</p>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="input">
                {['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi'].map((l) => <option key={l}>{l}</option>)}
              </select>
              <button onClick={save} className="btn-primary">Save Language</button>
            </div>
          )}

          {tab === 'system' && (
            <div className="max-w-md space-y-2.5">
              <Toggle label="Enable Offline Mode by Default" checked={false} onChange={() => {}} />
              <Toggle label="Auto-sync when connectivity restored" checked={true} onChange={() => {}} />
              <Toggle label="Show demo data banners" checked={true} onChange={() => {}} />
              <button onClick={save} className="btn-primary mt-2">Save System Preferences</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
