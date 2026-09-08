import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, X, Video, Users, ShieldCheck, Calendar, Filter } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import RiskBadge from '../components/RiskBadge'
import DemoBanner from '../components/DemoBanner'
import { PROJECTS, STATES, RISK_LEVELS, SCHEMES } from '../data/mockData'
import { riskColor } from '../utils/format'

// Deterministic pseudo geographic layout mapped onto a simple India-shaped viewbox (demo only)
function toXY(p, w, h) {
  const x = ((p.lng - 68) / (97 - 68)) * w
  const y = h - ((p.lat - 6) / (37 - 6)) * h
  return { x: Math.max(20, Math.min(w - 20, x)), y: Math.max(20, Math.min(h - 20, y)) }
}

export default function LiveMap() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [stateFilter, setStateFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')
  const [schemeFilter, setSchemeFilter] = useState('All')

  const W = 760, H = 480

  const filtered = useMemo(() => PROJECTS.filter((p) =>
    (stateFilter === 'All' || p.state === stateFilter) &&
    (riskFilter === 'All' || p.risk === riskFilter) &&
    (schemeFilter === 'All' || p.scheme === schemeFilter)
  ), [stateFilter, riskFilter, schemeFilter])

  return (
    <div>
      <PageHeader title="Live Map Monitoring" description="A simulated national map view of every monitored project, color-coded by risk status." />
      <DemoBanner>DEMO MAP — coordinates are simulated for illustration and do not represent verified GPS positions.</DemoBanner>

      <div className="card p-4 mb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter size={14} className="text-ink-400" />
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{STATES.map((s) => <option key={s.state}>{s.state}</option>)}
          </select>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{RISK_LEVELS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select value={schemeFilter} onChange={(e) => setSchemeFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{SCHEMES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <div className="ml-auto flex items-center gap-3 text-xs text-ink-500">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Normal</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Attention</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> High Risk</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-brand-50 to-white" style={{ aspectRatio: `${W}/${H}` }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
              <rect x="0" y="0" width={W} height={H} fill="#f5f8ff" />
              {Array.from({ length: 10 }).map((_, i) => <line key={`v${i}`} x1={(W / 10) * i} y1="0" x2={(W / 10) * i} y2={H} stroke="#e5edfb" />)}
              {Array.from({ length: 7 }).map((_, i) => <line key={`h${i}`} x1="0" y1={(H / 7) * i} x2={W} y2={(H / 7) * i} stroke="#e5edfb" />)}
              {filtered.map((p) => {
                const { x, y } = toXY(p, W, H)
                const c = riskColor(p.risk)
                const fill = p.risk === 'HIGH' ? '#ef4444' : p.risk === 'MEDIUM' ? '#f59e0b' : '#10b981'
                return (
                  <g key={p.id} className="cursor-pointer" onClick={() => setSelected(p)}>
                    {p.risk === 'HIGH' && <circle cx={x} cy={y} r="11" fill={fill} opacity="0.25" className="animate-pulseSlow" />}
                    <circle cx={x} cy={y} r="6.5" fill={fill} stroke="#fff" strokeWidth="2" />
                  </g>
                )
              })}
            </svg>
            <span className="absolute left-3 top-3 rounded-md bg-ink-900/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Demo Map</span>
          </div>
          <p className="mt-2 text-xs text-ink-400">{filtered.length} projects shown · click a marker for details</p>
        </div>

        <div className="card p-4">
          {selected ? (
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-ink-900">{selected.name}</p>
                  <p className="text-xs text-ink-400 flex items-center gap-1 mt-0.5"><MapPin size={12} /> {selected.district}, {selected.state}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-ink-400 hover:text-ink-700"><X size={16} /></button>
              </div>
              <div className="mt-3"><RiskBadge risk={selected.risk} /></div>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-center justify-between"><dt className="flex items-center gap-1.5 text-ink-500"><Video size={13} /> CCTV Status</dt><dd className="font-medium text-ink-800">{selected.cctvOnline}/{selected.cctvTotal} online</dd></div>
                <div className="flex items-center justify-between"><dt className="flex items-center gap-1.5 text-ink-500"><Calendar size={13} /> Last Inspection</dt><dd className="font-medium text-ink-800">{selected.lastInspection}</dd></div>
                <div className="flex items-center justify-between"><dt className="flex items-center gap-1.5 text-ink-500"><Users size={13} /> Beneficiaries</dt><dd className="font-medium text-ink-800">{selected.beneficiaries}</dd></div>
                <div className="flex items-center justify-between"><dt className="flex items-center gap-1.5 text-ink-500"><ShieldCheck size={13} /> Compliance</dt><dd className="font-medium text-ink-800">{selected.compliance}%</dd></div>
              </dl>
              <button onClick={() => navigate(`/app/projects/${selected.id}`)} className="btn-primary mt-4 w-full">View Full Details</button>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <MapPin size={26} className="text-ink-300" />
              <p className="mt-3 text-sm font-medium text-ink-600">Select a project marker</p>
              <p className="mt-1 text-xs text-ink-400">Click any point on the map to view project details here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
