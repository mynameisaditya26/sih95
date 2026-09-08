import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, User, ShieldAlert, ClipboardCheck, FileText } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Badge from '../components/Badge'
import RiskBadge from '../components/RiskBadge'
import { INSPECTIONS, PROJECTS } from '../data/mockData'

export default function InspectionDetails() {
  const { inspectionId } = useParams()
  const navigate = useNavigate()
  const inspection = INSPECTIONS.find((i) => i.id === inspectionId) || INSPECTIONS[0]
  const project = PROJECTS.find((p) => p.id === inspection.projectId)

  const previousFindings = [
    'Attendance register matched CCTV headcount within tolerance.',
    'Minor documentation gap noted in beneficiary enrollment forms.',
    'Infrastructure in satisfactory condition; no safety concerns raised.',
  ]

  return (
    <div>
      <PageHeader
        title={inspection.id}
        breadcrumbs={[{ label: 'Inspections', to: '/app/inspections' }, { label: inspection.id }]}
        description={`${inspection.type} for ${inspection.projectName}`}
        actions={<><RiskBadge risk={inspection.risk} /><Badge status={inspection.status}>{inspection.status}</Badge></>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <p className="section-title mb-3">Inspection Information</p>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['Inspection ID', inspection.id], ['Project', inspection.projectName],
              ['NGO', project?.name], ['Inspector', inspection.inspector],
              ['Date', inspection.date], ['Location', inspection.location],
              ['Scheme', project?.scheme], ['Priority', inspection.priority],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-ink-400">{k}</dt>
                <dd className="font-medium text-ink-800">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="section-title mt-6 mb-2">Previous Findings</p>
          <ul className="space-y-2 text-sm text-ink-600">
            {previousFindings.map((f, i) => (
              <li key={i} className="flex items-start gap-2"><ShieldAlert size={14} className="mt-0.5 text-ink-400 shrink-0" /> {f}</li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <p className="section-title mb-3">Risk & Compliance</p>
          <div className="rounded-lg bg-ink-50 p-3 mb-3">
            <p className="text-xs text-ink-500">Project Risk</p>
            <div className="mt-1"><RiskBadge risk={inspection.risk} /></div>
          </div>
          {project && (
            <div className="rounded-lg bg-ink-50 p-3 mb-4">
              <p className="text-xs text-ink-500">Current Compliance Score</p>
              <p className="text-2xl font-bold text-ink-900">{project.compliance}%</p>
            </div>
          )}
          <button onClick={() => navigate(`/app/inspections/${inspection.id}/checklist`)} className="btn-primary w-full !py-3">
            <ClipboardCheck size={16} /> START INSPECTION
          </button>
          <button onClick={() => navigate('/app/reports')} className="btn-secondary w-full !py-2.5 mt-2">
            <FileText size={15} /> View Past Reports
          </button>
        </div>
      </div>
    </div>
  )
}
