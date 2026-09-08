import React from 'react'
import { Users, ShieldCheck, ClipboardList, FileText, Bell, Building2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Badge from '../components/Badge'
import { PROJECTS, INSPECTIONS } from '../data/mockData'

export default function NgoDashboard() {
  const project = PROJECTS[3]
  const history = INSPECTIONS.filter((i) => i.projectId === project.id).slice(0, 4)

  return (
    <div>
      <PageHeader title={project.name} description={`${project.scheme} · ${project.district}, ${project.state}`} actions={<Badge status={project.status}>{project.status}</Badge>} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: 'Beneficiaries', value: project.beneficiaries, icon: Users },
          { label: 'Staff', value: project.staff, icon: Building2 },
          { label: 'Compliance', value: `${project.compliance}%`, icon: ShieldCheck },
          { label: 'Last Inspection', value: project.lastInspection, icon: ClipboardList },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <s.icon size={16} className="text-brand-600" />
            <p className="mt-2 text-lg font-bold text-ink-900">{s.value}</p>
            <p className="text-xs text-ink-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <p className="section-title mb-3">Inspection History</p>
          <div className="space-y-2">
            {history.map((h) => (
              <div key={h.id} className="flex items-center justify-between rounded-lg border border-ink-100 px-3.5 py-2.5">
                <div>
                  <p className="text-sm font-medium text-ink-800">{h.type}</p>
                  <p className="text-xs text-ink-400">{h.date}</p>
                </div>
                <Badge status={h.status}>{h.status}</Badge>
              </div>
            ))}
            {history.length === 0 && <p className="text-sm text-ink-400">No inspections recorded yet.</p>}
          </div>
        </div>

        <div className="card p-4">
          <p className="section-title mb-3 flex items-center gap-1.5"><Bell size={13} /> Notices</p>
          <div className="space-y-2">
            {[
              'Your last inspection compliance score improved by 4% — well done.',
              'Please upload updated staff ID documentation before 20 Sep 2026.',
              'CCTV camera at Dormitory reported offline for over 6 hours.',
            ].map((n, i) => (
              <div key={i} className="rounded-lg bg-ink-50 px-3 py-2.5 text-xs text-ink-600">{n}</div>
            ))}
          </div>
          <p className="section-title mt-5 mb-2 flex items-center gap-1.5"><FileText size={13} /> Documents</p>
          <ul className="space-y-1.5 text-sm text-brand-700">
            {['Scheme Enrollment Certificate.pdf', 'Latest Compliance Report.pdf', 'Staff ID Register.xlsx'].map((d) => (
              <li key={d} className="hover:underline cursor-pointer">{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
