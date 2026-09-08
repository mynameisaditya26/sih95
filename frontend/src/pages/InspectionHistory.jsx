import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Filter } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SearchInput from '../components/SearchInput'
import Badge from '../components/Badge'
import { INSPECTIONS, PROJECTS, INSPECTORS } from '../data/mockData'

export default function InspectionHistory() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [projectFilter, setProjectFilter] = useState('All')
  const [inspectorFilter, setInspectorFilter] = useState('All')

  const filtered = useMemo(() => INSPECTIONS.filter((i) => {
    const q = query.toLowerCase()
    return (!q || i.projectName.toLowerCase().includes(q)) &&
      (projectFilter === 'All' || i.projectName === projectFilter) &&
      (inspectorFilter === 'All' || i.inspector === inspectorFilter)
  }), [query, projectFilter, inspectorFilter])

  return (
    <div>
      <PageHeader title="Inspection History" description="A chronological timeline of every inspection carried out across all monitored projects." />

      <div className="card p-4 mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchInput value={query} onChange={setQuery} placeholder="Search by project…" className="lg:w-80" />
          <div className="flex items-center gap-2 text-xs">
            <Filter size={14} className="text-ink-400" />
            <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
              <option>All</option>{[...new Set(PROJECTS.map((p) => p.name))].map((n) => <option key={n}>{n}</option>)}
            </select>
            <select value={inspectorFilter} onChange={(e) => setInspectorFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
              <option>All</option>{INSPECTORS.map((i) => <option key={i.id}>{i.name}</option>)}
            </select>
          </div>
          <p className="ml-auto text-xs text-ink-400">{filtered.length} records</p>
        </div>
      </div>

      <div className="card p-5">
        <div className="space-y-5 border-l border-ink-100 pl-5">
          {filtered.map((i) => (
            <div key={i.id} className="relative cursor-pointer" onClick={() => navigate(`/app/inspections/${i.id}`)}>
              <span className="absolute -left-[26px] top-1 grid h-4 w-4 place-items-center rounded-full bg-white ring-2 ring-brand-500">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-ink-400">
                <Calendar size={12} /> {i.date}
              </div>
              <p className="mt-1 text-sm font-semibold text-ink-800 hover:text-brand-700">{i.projectName}</p>
              <p className="text-xs text-ink-500">{i.inspector} · {i.type}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge status={i.status}>{i.status}</Badge>
                {i.complianceScore != null && <span className="text-xs font-medium text-ink-600">Compliance: {i.complianceScore}%</span>}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-sm text-ink-400">No inspection records match your filters.</p>}
        </div>
      </div>
    </div>
  )
}
