import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Video, Eye, Filter, Download, Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SearchInput from '../components/SearchInput'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'
import RiskBadge from '../components/RiskBadge'
import Badge from '../components/Badge'
import { PROJECTS, STATES, RISK_LEVELS, PROJECT_STATUSES } from '../data/mockData'
import { useToast } from '../hooks/useToast'

const PAGE_SIZE = 8

export default function ProjectManagement() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [query, setQuery] = useState('')
  const [stateFilter, setStateFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let rows = PROJECTS.filter((p) => {
      const q = query.toLowerCase()
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.scheme.toLowerCase().includes(q)
      const matchesState = stateFilter === 'All' || p.state === stateFilter
      const matchesRisk = riskFilter === 'All' || p.risk === riskFilter
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter
      return matchesQuery && matchesState && matchesRisk && matchesStatus
    })
    rows = [...rows].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (a[sortKey] < b[sortKey]) return -1 * dir
      if (a[sortKey] > b[sortKey]) return 1 * dir
      return 0
    })
    return rows
  }, [query, stateFilter, riskFilter, statusFilter, sortKey, sortDir])

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const columns = [
    { key: 'id', label: 'Project ID', sortable: true, render: (r) => <span className="font-mono text-xs text-ink-500">{r.id}</span> },
    { key: 'name', label: 'NGO / Institute', sortable: true, render: (r) => <span className="font-medium text-ink-800">{r.name}</span> },
    { key: 'scheme', label: 'Scheme', render: (r) => <span className="text-xs">{r.scheme}</span> },
    { key: 'state', label: 'State', sortable: true },
    { key: 'district', label: 'District' },
    { key: 'beneficiaries', label: 'Beneficiaries', sortable: true },
    { key: 'staff', label: 'Staff' },
    { key: 'risk', label: 'Risk', sortable: true, render: (r) => <RiskBadge risk={r.risk} /> },
    { key: 'cctv', label: 'CCTV', render: (r) => <span className="text-xs">{r.cctvOnline}/{r.cctvTotal} online</span> },
    { key: 'compliance', label: 'Compliance', sortable: true, render: (r) => <span className="font-semibold text-ink-700">{r.compliance}%</span> },
    { key: 'lastInspection', label: 'Last Inspection' },
    { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> },
    {
      key: 'actions', label: 'Actions', render: (r) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/app/projects/${r.id}`) }} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600" title="View details">
            <Eye size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigate('/app/cctv') }} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600" title="View CCTV">
            <Video size={14} />
          </button>
        </div>
      )
    },
  ]

  return (
    <div>
      <PageHeader
        title="Project Management"
        description="Search, filter and manage all NGOs and institutes registered under DoSJE schemes."
        actions={
          <>
            <button onClick={() => toast('Export started — CSV will download shortly (demo).', 'info')} className="btn-secondary"><Download size={15} /> Export</button>
            <button onClick={() => toast('Add Project form would open here (demo).', 'info')} className="btn-primary"><Plus size={15} /> Add Project</button>
          </>
        }
      />

      <div className="card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1) }} placeholder="Search by project, ID or scheme…" className="lg:w-80" />
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Filter size={14} className="text-ink-400" />
            <select value={stateFilter} onChange={(e) => { setStateFilter(e.target.value); setPage(1) }} className="input !w-auto !py-1.5 text-xs">
              <option>All</option>
              {STATES.map((s) => <option key={s.state}>{s.state}</option>)}
            </select>
            <select value={riskFilter} onChange={(e) => { setRiskFilter(e.target.value); setPage(1) }} className="input !w-auto !py-1.5 text-xs">
              <option>All</option>
              {RISK_LEVELS.map((r) => <option key={r}>{r}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} className="input !w-auto !py-1.5 text-xs">
              <option>All</option>
              {PROJECT_STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <p className="ml-auto text-xs text-ink-400">{filtered.length} projects found</p>
        </div>

        <div className="mt-4">
          <DataTable
            columns={columns}
            data={paged}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
            onRowClick={(r) => navigate(`/app/projects/${r.id}`)}
            emptyMessage="No projects match your filters."
          />
        </div>
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
      </div>
    </div>
  )
}
