import React, { useMemo, useState } from 'react'
import { Filter } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SearchInput from '../components/SearchInput'
import DataTable from '../components/DataTable'
import Badge from '../components/Badge'
import { AUDIT_LOGS } from '../data/mockData'

const MODULES = [...new Set(AUDIT_LOGS.map((l) => l.module))]

export default function AuditLogs() {
  const [query, setQuery] = useState('')
  const [moduleFilter, setModuleFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')

  const filtered = useMemo(() => AUDIT_LOGS.filter((l) => {
    const q = query.toLowerCase()
    return (!q || l.user.toLowerCase().includes(q) || l.action.toLowerCase().includes(q)) &&
      (moduleFilter === 'All' || l.module === moduleFilter) &&
      (!dateFilter || l.date === dateFilter)
  }), [query, moduleFilter, dateFilter])

  const columns = [
    { key: 'user', label: 'User', render: (r) => <span className="font-medium text-ink-800">{r.user}</span> },
    { key: 'action', label: 'Action' },
    { key: 'module', label: 'Module' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> },
  ]

  return (
    <div>
      <PageHeader title="Audit Logs" description="A complete, immutable trail of every action taken across the platform." />

      <div className="card p-4 mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchInput value={query} onChange={setQuery} placeholder="Search by user or action…" className="lg:w-80" />
          <div className="flex items-center gap-2 text-xs">
            <Filter size={14} className="text-ink-400" />
            <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
              <option>All</option>{MODULES.map((m) => <option key={m}>{m}</option>)}
            </select>
            <input type="text" placeholder="Filter by date e.g. 08 Sep 2026" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="input !w-56 !py-1.5 text-xs" />
          </div>
          <p className="ml-auto text-xs text-ink-400">{filtered.length} log entries</p>
        </div>
      </div>

      <div className="card p-4">
        <DataTable columns={columns} data={filtered} emptyMessage="No audit log entries match your filters." />
      </div>
    </div>
  )
}
