import React, { useMemo, useState } from 'react'
import { Eye, Download, Printer, Share2, Filter } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import { REPORTS } from '../data/mockData'
import { useToast } from '../hooks/useToast'

const REPORT_TYPES = ['Inspection Report', 'Compliance Report', 'Risk Report', 'Attendance Report']

export default function DigitalReports() {
  const [typeFilter, setTypeFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const { toast } = useToast()

  const list = useMemo(() => REPORTS.filter((r) => typeFilter === 'All' || r.type === typeFilter), [typeFilter])

  const columns = [
    { key: 'id', label: 'Report ID', render: (r) => <span className="font-mono text-xs text-ink-500">{r.id}</span> },
    { key: 'type', label: 'Type' },
    { key: 'projectName', label: 'Project', render: (r) => <span className="font-medium text-ink-800">{r.projectName}</span> },
    { key: 'inspector', label: 'Inspector' },
    { key: 'date', label: 'Date' },
    { key: 'complianceScore', label: 'Compliance', render: (r) => `${r.complianceScore}%` },
    { key: 'approval', label: 'Status', render: (r) => <Badge status={r.approval}>{r.approval}</Badge> },
    { key: 'actions', label: 'Actions', render: (r) => (
      <div className="flex items-center gap-1">
        <button onClick={(e) => { e.stopPropagation(); setSelected(r) }} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600" title="View"><Eye size={14} /></button>
        <button onClick={(e) => { e.stopPropagation(); toast('Report download started (demo).', 'info') }} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600" title="Download"><Download size={14} /></button>
        <button onClick={(e) => { e.stopPropagation(); toast('Sending report to printer (demo).', 'info') }} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600" title="Print"><Printer size={14} /></button>
        <button onClick={(e) => { e.stopPropagation(); toast('Share link copied to clipboard (demo).', 'success') }} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600" title="Share"><Share2 size={14} /></button>
      </div>
    ) },
  ]

  return (
    <div>
      <PageHeader title="Digital Reports" description="Generate, view, and share consolidated inspection, compliance, risk and attendance reports." />

      <div className="card p-4 mb-4">
        <div className="flex items-center gap-2 text-xs">
          <Filter size={14} className="text-ink-400" />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{REPORT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <p className="ml-auto text-ink-400">{list.length} reports</p>
        </div>
      </div>

      <div className="card p-4">
        <DataTable columns={columns} data={list} onRowClick={(r) => setSelected(r)} />
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.id} size="lg" footer={
        <>
          <button onClick={() => toast('Report download started (demo).', 'info')} className="btn-secondary"><Download size={14} /> Download</button>
          <button onClick={() => toast('Sending report to printer (demo).', 'info')} className="btn-primary"><Printer size={14} /> Print</button>
        </>
      }>
        {selected && (
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['Inspection ID', selected.id], ['Report Type', selected.type], ['Project', selected.projectName],
              ['Inspector', selected.inspector], ['Date', selected.date], ['GPS', selected.gps],
              ['Compliance Score', `${selected.complianceScore}%`], ['Risk Score', `${selected.riskScore}/100`],
              ['Approval Status', selected.approval],
            ].map(([k, v]) => (
              <div key={k}><dt className="text-xs text-ink-400">{k}</dt><dd className="font-medium text-ink-800">{v}</dd></div>
            ))}
            <div className="col-span-2">
              <dt className="text-xs text-ink-400">Remarks</dt>
              <dd className="mt-1 rounded-lg bg-ink-50 p-3 text-ink-700">Checklist and evidence collected during the visit align with expected compliance thresholds; see attached evidence for GPS-tagged confirmation.</dd>
            </div>
          </dl>
        )}
      </Modal>
    </div>
  )
}
