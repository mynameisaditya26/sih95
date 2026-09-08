import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, Clock, CheckCircle2, AlertOctagon, MapPin, Calendar, WifiOff } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { INSPECTIONS } from '../data/mockData'
import { useAppState } from '../hooks/useAppState'

export default function InspectorDashboard() {
  const navigate = useNavigate()
  const { user } = useAppState()

  const mine = useMemo(() => INSPECTIONS.slice(0, 10), [])
  const today = mine.slice(0, 3)
  const stats = {
    assigned: mine.length,
    pendingReports: mine.filter((i) => i.status === 'In Progress').length,
    completed: mine.filter((i) => i.status === 'Completed').length,
    highPriority: mine.filter((i) => i.priority === 'High').length,
  }

  return (
    <div>
      <PageHeader title={`Welcome, ${user?.name || 'Inspector'}`} description="Your assigned inspections, reports and field alerts." actions={
        <button onClick={() => navigate('/app/offline-mode')} className="btn-secondary"><WifiOff size={15} /> Offline Mode</button>
      } />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
        <StatCard label="Assigned Inspections" value={stats.assigned} icon={ClipboardList} tone="brand" />
        <StatCard label="Pending Reports" value={stats.pendingReports} icon={Clock} tone="amber" />
        <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} tone="emerald" />
        <StatCard label="High Priority" value={stats.highPriority} icon={AlertOctagon} tone="red" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <p className="section-title mb-3 flex items-center gap-1.5"><Calendar size={13} /> Today's Inspections</p>
          <div className="space-y-2">
            {today.map((i) => (
              <div key={i.id} onClick={() => navigate(`/app/inspections/${i.id}`)} className="cursor-pointer rounded-lg border border-ink-100 p-3 hover:bg-ink-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-ink-800">{i.projectName}</p>
                  <Badge status={i.status}>{i.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-ink-400 flex items-center gap-1"><MapPin size={11} /> {i.location} · {i.type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <p className="section-title mb-3">Assigned Inspections</p>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {mine.map((i) => (
              <div key={i.id} onClick={() => navigate(`/app/inspections/${i.id}`)} className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 hover:bg-ink-50">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-800">{i.projectName}</p>
                  <p className="text-xs text-ink-400">{i.date}</p>
                </div>
                <Badge status={i.status}>{i.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
