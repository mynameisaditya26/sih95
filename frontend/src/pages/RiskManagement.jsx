import React, { useMemo, useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { ShieldAlert, Filter, HelpCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import RiskBadge from '../components/RiskBadge'
import Modal from '../components/Modal'
import { PROJECTS, RISK_LEVELS, RISK_DISTRIBUTION } from '../data/mockData'

const RISK_COLORS = { LOW: '#10b981', MEDIUM: '#f59e0b', HIGH: '#ef4444' }

const RISK_FACTOR_POOL = [
  'Attendance mismatch', 'CCTV downtime', 'Inspection overdue', 'Duplicate evidence',
  'Previous compliance issue', 'Location mismatch on evidence', 'Repetitive reporting pattern',
]

function factorsFor(project) {
  const n = project.risk === 'HIGH' ? 4 : project.risk === 'MEDIUM' ? 2 : 1
  return RISK_FACTOR_POOL.slice(0, n)
}

export default function RiskManagement() {
  const [riskFilter, setRiskFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const list = useMemo(() => PROJECTS.filter((p) => riskFilter === 'All' || p.risk === riskFilter)
    .sort((a, b) => b.riskScore - a.riskScore), [riskFilter])

  const columns = [
    { key: 'name', label: 'NGO / Institute', render: (r) => <span className="font-medium text-ink-800">{r.name}</span> },
    { key: 'riskScore', label: 'Risk Score', render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full" style={{ width: `${r.riskScore}%`, backgroundColor: RISK_COLORS[r.risk] }} />
        </div>
        <span className="text-xs font-semibold">{r.riskScore}/100</span>
      </div>
    ) },
    { key: 'risk', label: 'Risk', render: (r) => <RiskBadge risk={r.risk} /> },
    { key: 'district', label: 'Location', render: (r) => `${r.district}, ${r.state}` },
    { key: 'actions', label: '', render: (r) => (
      <button onClick={() => setSelected(r)} className="btn-secondary !py-1.5 text-xs"><HelpCircle size={12} /> Why is this project {r.risk} risk?</button>
    ) },
  ]

  return (
    <div>
      <PageHeader title="Risk Management" description="Dynamic risk scoring for every monitored project based on continuous compliance signals." />

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <div className="card p-4 lg:col-span-2">
          <p className="section-title mb-3">Highest Risk Project</p>
          {list[0] && (
            <div>
              <p className="text-sm font-semibold text-ink-800">{list[0].name}</p>
              <div className="mt-2 flex items-end gap-3">
                <p className="text-4xl font-extrabold text-red-600">{list[0].riskScore}</p>
                <p className="pb-1.5 text-sm text-ink-400">/ 100</p>
              </div>
              <div className="mt-2"><RiskBadge risk={list[0].risk} /></div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {factorsFor(list[0]).map((f) => (
                  <span key={f} className="badge bg-red-50 text-red-700 ring-1 ring-inset ring-red-200">{f}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="card p-4">
          <p className="section-title mb-3">Risk Distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={RISK_DISTRIBUTION} dataKey="value" nameKey="name" innerRadius={40} outerRadius={65} paddingAngle={3}>
                {RISK_DISTRIBUTION.map((e) => <Cell key={e.name} fill={RISK_COLORS[e.name]} />)}
              </Pie>
              <Tooltip /><Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center gap-2 text-xs mb-3">
          <Filter size={14} className="text-ink-400" />
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{RISK_LEVELS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <DataTable columns={columns} data={list} />
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected ? `Why is ${selected.name} ${selected.risk} risk?` : ''} size="md">
        {selected && (
          <div className="space-y-3 text-sm">
            <p className="text-ink-600">This project's risk score of <span className="font-semibold text-ink-900">{selected.riskScore}/100</span> is driven by the following contributing factors:</p>
            <ul className="space-y-2">
              {factorsFor(selected).map((f) => (
                <li key={f} className="flex items-start gap-2 rounded-lg bg-ink-50 px-3 py-2">
                  <ShieldAlert size={14} className="mt-0.5 text-red-500 shrink-0" /> <span className="text-ink-700">{f}</span>
                </li>
              ))}
            </ul>
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">Risk scores are simulated for this demo and combine mock signals across attendance, CCTV uptime and inspection history.</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
