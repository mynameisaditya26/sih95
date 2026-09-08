import React, { useMemo, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Filter, FolderKanban, ShieldAlert, Users2, ClipboardList } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import RiskBadge from '../components/RiskBadge'
import { PROJECTS, STATES, SCHEMES, RISK_LEVELS } from '../data/mockData'

export default function RegionalDashboard() {
  const [stateFilter, setStateFilter] = useState('All')
  const [districtFilter, setDistrictFilter] = useState('All')
  const [schemeFilter, setSchemeFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')

  const filtered = useMemo(() => PROJECTS.filter((p) =>
    (stateFilter === 'All' || p.state === stateFilter) &&
    (districtFilter === 'All' || p.district === districtFilter) &&
    (schemeFilter === 'All' || p.scheme === schemeFilter) &&
    (riskFilter === 'All' || p.risk === riskFilter)
  ), [stateFilter, districtFilter, schemeFilter, riskFilter])

  const districtBreak = useMemo(() => {
    const districts = [...new Set(filtered.map((p) => p.district))]
    return districts.map((d) => ({ district: d, count: filtered.filter((p) => p.district === d).length }))
  }, [filtered])

  const highRisk = filtered.filter((p) => p.risk === 'HIGH').length
  const avgCompliance = filtered.length ? Math.round(filtered.reduce((a, p) => a + p.compliance, 0) / filtered.length) : 0

  return (
    <div>
      <PageHeader title="State / District Dashboard" description="Regional monitoring across states, districts and welfare schemes." />

      <div className="card p-4 mb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter size={14} className="text-ink-400" />
          <select value={stateFilter} onChange={(e) => { setStateFilter(e.target.value); setDistrictFilter('All') }} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{STATES.map((s) => <option key={s.state}>{s.state}</option>)}
          </select>
          <select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{(STATES.find((s) => s.state === stateFilter)?.districts || [...new Set(PROJECTS.map(p=>p.district))]).map((d) => <option key={d}>{d}</option>)}
          </select>
          <select value={schemeFilter} onChange={(e) => setSchemeFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{SCHEMES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{RISK_LEVELS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
        <StatCard label="Total Projects" value={filtered.length} icon={FolderKanban} tone="brand" />
        <StatCard label="High Risk Projects" value={highRisk} icon={ShieldAlert} tone="red" />
        <StatCard label="Avg. Compliance" value={`${avgCompliance}%`} icon={Users2} tone="emerald" />
        <StatCard label="Districts Covered" value={districtBreak.length} icon={ClipboardList} tone="amber" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <p className="section-title mb-3">District-wise Projects</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={districtBreak}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
              <XAxis dataKey="district" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#1465e6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4">
          <p className="section-title mb-3">High Risk in Region</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filtered.filter((p) => p.risk === 'HIGH').slice(0, 6).map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-ink-50">
                <p className="truncate text-sm text-ink-700">{p.name}</p>
                <RiskBadge risk={p.risk} />
              </div>
            ))}
            {filtered.filter((p) => p.risk === 'HIGH').length === 0 && <p className="text-sm text-ink-400">No high-risk projects in this region.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
