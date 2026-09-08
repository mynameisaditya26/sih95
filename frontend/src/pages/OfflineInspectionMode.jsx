import React, { useState } from 'react'
import { WifiOff, Save, RefreshCw, CheckCircle2, Loader2, ClipboardList, ImageIcon, MapPin, ClipboardCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DemoBanner from '../components/DemoBanner'
import { useToast } from '../hooks/useToast'

const SAVE_ITEMS = [
  { icon: ClipboardList, label: 'Save Checklist' },
  { icon: ImageIcon, label: 'Save Evidence' },
  { icon: MapPin, label: 'Save GPS' },
  { icon: ClipboardCheck, label: 'Save Inspection' },
]

export default function OfflineInspectionMode() {
  const [saved, setSaved] = useState(new Set())
  const [syncing, setSyncing] = useState(false)
  const [synced, setSynced] = useState(false)
  const { toast } = useToast()

  function saveItem(label) {
    setSaved((prev) => new Set(prev).add(label))
    toast(`${label} saved locally (demo).`, 'info')
  }

  function sync() {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setSynced(true)
      toast('All data synced successfully.', 'success')
    }, 1800)
  }

  const pendingCount = synced ? 0 : Math.max(4 - saved.size, saved.size > 0 ? saved.size : 4)

  return (
    <div>
      <PageHeader title="Offline Inspection Mode" description="Continue inspections without internet connectivity — data syncs automatically when back online." />

      <div className="card p-5 mb-4">
        <div className="flex items-center gap-2">
          <span className="badge bg-ink-800 text-white"><WifiOff size={12} /> OFFLINE MODE</span>
          {synced && <span className="badge bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"><CheckCircle2 size={12} /> Synced</span>}
        </div>
        <p className="mt-2 text-sm text-ink-500">Your device is currently simulating an offline field environment. Data entered below is stored locally until you sync.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <p className="section-title mb-3">Simulate Local Save</p>
          <div className="space-y-2">
            {SAVE_ITEMS.map((item) => (
              <button key={item.label} onClick={() => saveItem(item.label)} className="flex w-full items-center justify-between rounded-lg border border-ink-100 px-3.5 py-2.5 text-sm hover:bg-ink-50">
                <span className="flex items-center gap-2 text-ink-700"><item.icon size={15} className="text-brand-600" /> {item.label}</span>
                {saved.has(item.label) ? <CheckCircle2 size={15} className="text-emerald-600" /> : <Save size={15} className="text-ink-300" />}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-5 flex flex-col">
          <p className="section-title mb-3">Sync Status</p>
          <div className="rounded-xl bg-amber-50 p-4 text-amber-800">
            <p className="text-sm font-semibold">Pending Sync: {synced ? 0 : Math.max(saved.size, 4)} items</p>
            <p className="mt-1 text-xs">Checklist, evidence, GPS coordinates and inspection record queued locally.</p>
          </div>
          <button onClick={sync} disabled={syncing} className="btn-primary mt-4 w-full !py-3">
            {syncing ? <><Loader2 size={16} className="animate-spin" /> Syncing…</> : <><RefreshCw size={16} /> SYNC NOW</>}
          </button>
          {synced && (
            <div className="mt-4 animate-fadein rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <CheckCircle2 size={22} className="mx-auto text-emerald-600" />
              <p className="mt-2 text-sm font-bold text-emerald-800">ALL DATA SYNCED SUCCESSFULLY</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
