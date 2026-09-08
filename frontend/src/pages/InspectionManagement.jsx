import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, Clock, CheckCircle2, AlertOctagon, Filter, Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import SearchInput from '../components/SearchInput'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'
import Badge from '../components/Badge'
import RiskBadge from '../components/RiskBadge'
import { INSPECTIONS } from '../data/mockData'
import { useToast } from '../hooks/useToast'

const PAGE_SIZE = 8

export default function InspectionManagement() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [page, setPage] = useState(1)

  const stats = useMemo(() => ({
    total: INSPECTIONS.length,
    pending: INSPECTIONS.filter((i) => i.status === 'Pending').length,
    completed: INSPECTIONS.filter((i) => i.status === 'Completed').length,
    highPriority: INSPECTIONS.filter((i) => i.priority === 'High').length,
    overdue: INSPECTIONS.filter((i) => i.status === 'Overdue').length,
  }), [])

  const filtered = useMemo(() => INSPECTIONS.filter((i) => {
    const q = query.toLowerCase()
    const matchesQuery = !q || i.projectName.toLowerCase().includes(q) || i.id.toLowerCase().includes(q) || i.inspector.toLowerCase().includes(q)
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || i.priority === priorityFilter
    return matchesQuery && matchesStatus && matchesPriority
  }), [query, statusFilter, priorityFilter])

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const columns = [
    { key: 'id', label: 'Inspection ID', render: (r) => <span className="font-mono text-xs text-ink-500">{r.id}</span> },
    { key: 'projectName', label: 'Project', render: (r) => <span className="font-medium text-ink-800">{r.projectName}</span> },
    { key: 'inspector', label: 'Inspector' },
    { key: 'type', label: 'Type' },
    { key: 'date', label: 'Date' },
    { key: 'priority', label: 'Priority', render: (r) => <Badge status={r.priority === 'High' ? 'Overdue' : r.priority === 'Medium' ? 'Pending' : 'Completed'}>{r.priority}</Badge> },
    { key: 'risk', label: 'Risk', render: (r) => <RiskBadge risk={r.risk} /> },
    { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> },
  ]

  return (
    <div>
      <PageHeader
        title="Inspection Management"
        description="Track and manage every scheduled, ongoing and completed inspection."
        actions={<button onClick={() => navigate('/app/random-assignment')} className="btn-primary"><Plus size={15} /> New Assignment</button>}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 mb-6">
        <StatCard label="Total" value={stats.total} icon={ClipboardList} tone="brand" />
        <StatCard label="Pending" value={stats.pending} icon={Clock} tone="amber" />
        <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} tone="emerald" />
        <StatCard label="High Priority" value={stats.highPriority} icon={AlertOctagon} tone="red" />
        <StatCard label="Overdue" value={stats.overdue} icon={AlertOctagon} tone="red" />
      </div>

      <div className="card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1) }} placeholder="Search inspections…" className="lg:w-80" />
          <div className="flex items-center gap-2 text-xs">
            <Filter size={14} className="text-ink-400" />
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} className="input !w-auto !py-1.5 text-xs">
              <option>All</option><option>Pending</option><option>In Progress</option><option>Completed</option><option>Overdue</option>
            </select>
            <select value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); setPage(1) }} className="input !w-auto !py-1.5 text-xs">
              <option>All</option><option>Low</option><option>Medium</option><option>High</option>
            </select>
          </div>
          <p className="ml-auto text-xs text-ink-400">{filtered.length} inspections found</p>
        </div>
        <div className="mt-4">
          <DataTable columns={columns} data={paged} onRowClick={(r) => navigate(`/app/inspections/${r.id}`)} emptyMessage="No inspections match your filters." />
        </div>
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
      </div>
    </div>
  )
}
