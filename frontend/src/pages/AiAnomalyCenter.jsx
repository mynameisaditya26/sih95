import React, { useMemo, useState } from 'react'
import { ShieldAlert, Filter, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DemoBanner from '../components/DemoBanner'
import Modal from '../components/Modal'
import { ANOMALIES } from '../data/mockData'
import { useToast } from '../hooks/useToast'

const SEV_STYLE = {
  HIGH: 'bg-red-50 text-red-700 ring-red-200',
  MEDIUM: 'bg-amber-50 text-amber-700 ring-amber-200',
  LOW: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export default function AiAnomalyCenter() {
  const [severity, setSeverity] = useState('All')
  const [reviewedMap, setReviewedMap] = useState({})
  const [selected, setSelected] = useState(null)
  const { toast } = useToast()

  const list = useMemo(() => ANOMALIES.filter((a) => severity === 'All' || a.severity === severity), [severity])

  function markReviewed(id) {
    setReviewedMap((prev) => ({ ...prev, [id]: true }))
    toast('Anomaly marked as human-reviewed (demo).', 'success')
  }

  return (
    <div>
      <PageHeader title="AI Anomaly Center" description="AI-assisted detection of attendance, evidence and reporting anomalies across all projects." />
      <DemoBanner>AI-GENERATED DEMO RESULTS · HUMAN VERIFICATION REQUIRED — no real AI/ML model is used in this prototype.</DemoBanner>

      <div className="card p-4 mb-4">
        <div className="flex items-center gap-2 text-xs">
          <Filter size={14} className="text-ink-400" />
          <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option>
          </select>
          <p className="ml-auto text-ink-400">{list.length} anomalies</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => {
          const reviewed = reviewedMap[a.id] ?? a.reviewed
          return (
            <div key={a.id} className="card p-4">
              <div className="flex items-start justify-between">
                <span className={`badge ring-1 ring-inset ${SEV_STYLE[a.severity]}`}><ShieldAlert size={11} /> {a.severity}</span>
                {reviewed && <span className="badge bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200"><CheckCircle2 size={11} /> Reviewed</span>}
              </div>
              <p className="mt-2.5 text-sm font-semibold text-ink-900">{a.type}</p>
              <p className="text-xs text-ink-500 truncate">{a.projectName}</p>
              <p className="mt-2 text-xs text-ink-400">Confidence: <span className="font-semibold text-ink-600">{a.confidence}%</span></p>
              <p className="text-xs text-ink-400">Detected: {a.detectedAt}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setSelected(a)} className="btn-secondary flex-1 !py-1.5 text-xs">View Details</button>
                {!reviewed && <button onClick={() => markReviewed(a.id)} className="btn-primary !py-1.5 text-xs">Mark Reviewed</button>}
              </div>
            </div>
          )
        })}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.type} size="md">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <span className={`badge ring-1 ring-inset ${SEV_STYLE[selected.severity]}`}>{selected.severity}</span>
              <span className="text-xs text-ink-400">Confidence: {selected.confidence}%</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase">Explanation</p>
              <p className="mt-1 text-ink-700">{selected.explanation}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase">Recommended Action</p>
              <p className="mt-1 text-ink-700">{selected.action}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3 rounded-lg bg-ink-50 p-3 text-xs">
              <div><dt className="text-ink-400">Project</dt><dd className="font-medium text-ink-700">{selected.projectName}</dd></div>
              <div><dt className="text-ink-400">Detected</dt><dd className="font-medium text-ink-700">{selected.detectedAt}</dd></div>
            </dl>
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">AI-generated demo result · human verification required before action.</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
