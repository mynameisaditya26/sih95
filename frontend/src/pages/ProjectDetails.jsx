import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Phone, MapPin, Users, Video, ClipboardList, FileText, AlertTriangle, Calendar,
  Building2, ShieldCheck, ImageIcon, ChevronRight,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Badge from '../components/Badge'
import RiskBadge from '../components/RiskBadge'
import EmptyState from '../components/EmptyState'
import { PROJECTS, INSPECTIONS } from '../data/mockData'

const TABS = ['Overview', 'Staff & Beneficiaries', 'Attendance', 'CCTV', 'Inspection History', 'Evidence & Documents', 'Issues']

export default function ProjectDetails() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Overview')
  const project = PROJECTS.find((p) => p.id === projectId) || PROJECTS[0]
  const history = INSPECTIONS.filter((i) => i.projectId === project.id)

  return (
    <div>
      <PageHeader
        title={project.name}
        breadcrumbs={[{ label: 'Projects', to: '/app/projects' }, { label: project.id }]}
        description={`${project.scheme} · ${project.district}, ${project.state}`}
        actions={
          <>
            <RiskBadge risk={project.risk} />
            <Badge status={project.status}>{project.status}</Badge>
          </>
        }
      />

      {/* Top stat strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {[
          { label: 'Beneficiaries', value: project.beneficiaries, icon: Users },
          { label: 'Staff', value: project.staff, icon: Building2 },
          { label: 'Risk Score', value: `${project.riskScore}/100`, icon: AlertTriangle },
          { label: 'Compliance', value: `${project.compliance}%`, icon: ShieldCheck },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <s.icon size={16} className="text-brand-600" />
            <p className="mt-2 text-lg font-bold text-ink-900">{s.value}</p>
            <p className="text-xs text-ink-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex gap-1 overflow-x-auto border-b border-ink-100 px-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap border-b-2 px-3.5 py-3 text-sm font-medium transition-colors ${tab === t ? 'border-brand-600 text-brand-700' : 'border-transparent text-ink-500 hover:text-ink-800'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === 'Overview' && (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <p className="section-title mb-2">Project Information</p>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ['Project ID', project.id], ['Scheme', project.scheme], ['NGO / Institute', project.name],
                      ['Project Incharge', project.incharge], ['Incharge Phone', project.inchargePhone],
                      ['Registered Since', project.registeredOn], ['Address', project.address],
                      ['Last Inspection', project.lastInspection],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-ink-400">{k}</dt>
                        <dd className="font-medium text-ink-800">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <p className="section-title mb-2">Timeline</p>
                  <div className="space-y-3 border-l border-ink-100 pl-4">
                    {[
                      { t: 'Project onboarded', d: `${project.registeredOn}` },
                      { t: 'CCTV integration completed', d: 'Feb 2026' },
                      { t: `Last inspection — ${project.compliance}% compliance`, d: project.lastInspection },
                    ].map((e, i) => (
                      <div key={i} className="relative">
                        <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-brand-500" />
                        <p className="text-sm font-medium text-ink-800">{e.t}</p>
                        <p className="text-xs text-ink-400">{e.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl bg-ink-50 p-4">
                  <p className="text-xs font-semibold text-ink-500">Location</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-ink-700"><MapPin size={14} className="text-brand-600" /> {project.address}</div>
                  <button onClick={() => navigate('/app/live-map')} className="btn-secondary mt-3 w-full !py-1.5 text-xs">View on Live Map</button>
                </div>
                <div className="rounded-xl bg-ink-50 p-4">
                  <p className="text-xs font-semibold text-ink-500">Quick Actions</p>
                  <div className="mt-3 space-y-2">
                    <button onClick={() => navigate('/app/surprise-vc')} className="btn-secondary w-full !py-1.5 text-xs"><Phone size={13} /> Start Surprise VC</button>
                    <button onClick={() => navigate('/app/random-assignment')} className="btn-secondary w-full !py-1.5 text-xs"><ClipboardList size={13} /> Assign Inspection</button>
                    <button onClick={() => navigate('/app/cctv')} className="btn-secondary w-full !py-1.5 text-xs"><Video size={13} /> View CCTV Feeds</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'Staff & Beneficiaries' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-ink-100 p-4">
                <p className="text-sm font-semibold text-ink-800">Staff on record</p>
                <p className="mt-1 text-3xl font-bold text-brand-700">{project.staff}</p>
                <p className="mt-1 text-xs text-ink-400">Verified during last inspection</p>
              </div>
              <div className="rounded-xl border border-ink-100 p-4">
                <p className="text-sm font-semibold text-ink-800">Beneficiaries enrolled</p>
                <p className="mt-1 text-3xl font-bold text-brand-700">{project.beneficiaries}</p>
                <p className="mt-1 text-xs text-ink-400">Under {project.scheme}</p>
              </div>
            </div>
          )}

          {tab === 'Attendance' && (
            <EmptyState icon={Users} title="Attendance analytics available" description="Open the full Attendance Analytics page to view trends specific to this and other projects." action={<button onClick={() => navigate('/app/attendance')} className="btn-primary">Open Attendance Analytics</button>} />
          )}

          {tab === 'CCTV' && (
            <div>
              <p className="mb-3 text-sm text-ink-500">{project.cctvOnline} of {project.cctvTotal} cameras online for this project.</p>
              <button onClick={() => navigate('/app/cctv')} className="btn-primary"><Video size={15} /> Open CCTV Monitoring</button>
            </div>
          )}

          {tab === 'Inspection History' && (
            history.length ? (
              <div className="space-y-2">
                {history.map((h) => (
                  <div key={h.id} onClick={() => navigate(`/app/inspections/${h.id}`)} className="flex cursor-pointer items-center justify-between rounded-lg border border-ink-100 px-4 py-3 hover:bg-ink-50">
                    <div className="flex items-center gap-3">
                      <Calendar size={15} className="text-ink-400" />
                      <div>
                        <p className="text-sm font-medium text-ink-800">{h.type}</p>
                        <p className="text-xs text-ink-400">{h.inspector} · {h.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge status={h.status}>{h.status}</Badge>
                      <ChevronRight size={14} className="text-ink-300" />
                    </div>
                  </div>
                ))}
              </div>
            ) : <EmptyState icon={ClipboardList} title="No inspections recorded yet" description="This project hasn't been inspected in the demo dataset yet." />
          )}

          {tab === 'Evidence & Documents' && (
            <EmptyState icon={ImageIcon} title="No evidence uploaded in this view" description="Evidence captured during inspections appears here, GPS-tagged and timestamped." action={<button onClick={() => navigate('/app/evidence-capture')} className="btn-primary">Go to Evidence Capture</button>} />
          )}

          {tab === 'Issues' && (
            <EmptyState icon={AlertTriangle} title="No open issues" description="Flagged compliance issues for this project will be listed here once raised by an inspector or the AI anomaly engine." />
          )}
        </div>
      </div>
    </div>
  )
}
