import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import { INSPECTIONS } from '../data/mockData'
import { useToast } from '../hooks/useToast'

const SECTIONS = [
  {
    title: 'Staff Verification',
    fields: [
      { id: 'staff_present', label: 'Are all registered staff present on site?', type: 'yesno' },
      { id: 'staff_count', label: 'Number of staff physically verified', type: 'number' },
      { id: 'staff_id', label: 'ID cards / documentation verified', type: 'yesno' },
    ],
  },
  {
    title: 'Beneficiary Verification',
    fields: [
      { id: 'ben_present', label: 'Beneficiaries match registered count?', type: 'yesno' },
      { id: 'ben_count', label: 'Number of beneficiaries physically verified', type: 'number' },
      { id: 'ben_rating', label: 'Overall beneficiary welfare rating', type: 'rating' },
    ],
  },
  {
    title: 'Infrastructure',
    fields: [
      { id: 'infra_condition', label: 'Overall infrastructure condition', type: 'dropdown', options: ['Excellent', 'Good', 'Needs Repair', 'Poor'] },
      { id: 'infra_safety', label: 'Any visible safety hazards?', type: 'yesno' },
      { id: 'infra_notes', label: 'Infrastructure remarks', type: 'text' },
    ],
  },
  {
    title: 'Documents',
    fields: [
      { id: 'doc_registers', label: 'Attendance registers up to date?', type: 'yesno' },
      { id: 'doc_financial', label: 'Financial records available on request?', type: 'yesno' },
    ],
  },
  {
    title: 'Activities',
    fields: [
      { id: 'activities_running', label: 'Scheme activities actively running?', type: 'yesno' },
      { id: 'activities_rating', label: 'Activity quality rating', type: 'rating' },
    ],
  },
  {
    title: 'Attendance',
    fields: [
      { id: 'attendance_match', label: 'Attendance matches CCTV / manual count?', type: 'yesno' },
      { id: 'attendance_pct', label: 'Attendance percentage observed', type: 'number' },
    ],
  },
  {
    title: 'Scheme Compliance',
    fields: [
      { id: 'scheme_guidelines', label: 'Scheme guidelines being followed?', type: 'yesno' },
      { id: 'scheme_notes', label: 'Compliance remarks', type: 'text' },
    ],
  },
  {
    title: 'Safety',
    fields: [
      { id: 'safety_fire', label: 'Fire safety equipment in place?', type: 'yesno' },
      { id: 'safety_rating', label: 'Overall safety rating', type: 'rating' },
    ],
  },
  {
    title: 'General Observation',
    fields: [
      { id: 'general_remarks', label: 'General remarks / observations', type: 'text' },
    ],
  },
]

function Field({ field, value, onChange }) {
  if (field.type === 'yesno') {
    return (
      <div className="flex items-center gap-2">
        {['Yes', 'No'].map((opt) => (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className={`rounded-lg border px-4 py-1.5 text-xs font-semibold ${value === opt ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-500 hover:bg-ink-50'}`}>
            {opt}
          </button>
        ))}
      </div>
    )
  }
  if (field.type === 'rating') {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => onChange(n)}
            className={`h-8 w-8 rounded-md text-xs font-bold ${value >= n ? 'bg-amber-400 text-white' : 'bg-ink-100 text-ink-400'}`}>
            {n}
          </button>
        ))}
      </div>
    )
  }
  if (field.type === 'number') {
    return <input type="number" value={value || ''} onChange={(e) => onChange(e.target.value)} className="input !w-32" placeholder="0" />
  }
  if (field.type === 'dropdown') {
    return (
      <select value={value || ''} onChange={(e) => onChange(e.target.value)} className="input !w-56">
        <option value="">Select…</option>
        {field.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    )
  }
  return <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={2} className="input" placeholder="Enter remarks…" />
}

export default function InspectionChecklist() {
  const { inspectionId } = useParams()
  const navigate = useNavigate()
  const inspection = INSPECTIONS.find((i) => i.id === inspectionId) || INSPECTIONS[0]
  const { toast } = useToast()
  const [values, setValues] = useState({})
  const [openSections, setOpenSections] = useState(() => new Set([SECTIONS[0].title]))
  const [submitted, setSubmitted] = useState(false)

  const totalFields = useMemo(() => SECTIONS.reduce((a, s) => a + s.fields.length, 0), [])
  const filled = Object.values(values).filter((v) => v !== undefined && v !== '').length
  const progress = Math.round((filled / totalFields) * 100)

  function toggleSection(title) {
    setOpenSections((prev) => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      return next
    })
  }

  function setValue(id, v) { setValues((prev) => ({ ...prev, [id]: v })) }

  function submit() {
    setSubmitted(true)
    toast('Inspection submitted successfully (demo).', 'success')
  }

  return (
    <div>
      <PageHeader
        title="Inspection Checklist"
        breadcrumbs={[{ label: 'Inspections', to: '/app/inspections' }, { label: inspection.id, to: `/app/inspections/${inspection.id}` }, { label: 'Checklist' }]}
        description={inspection.projectName}
      />

      <div className="card p-4 mb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-sm font-semibold text-ink-800">Inspection Progress</p>
          <p className="text-sm font-bold text-brand-700">{progress}%</p>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const open = openSections.has(section.title)
          return (
            <div key={section.title} className="card overflow-hidden">
              <button onClick={() => toggleSection(section.title)} className="flex w-full items-center justify-between px-4 py-3">
                <p className="text-sm font-semibold text-ink-800">{section.title}</p>
                {open ? <ChevronUp size={16} className="text-ink-400" /> : <ChevronDown size={16} className="text-ink-400" />}
              </button>
              {open && (
                <div className="space-y-4 border-t border-ink-100 px-4 py-4">
                  {section.fields.map((f) => (
                    <div key={f.id} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                      <label className="text-sm text-ink-700 sm:max-w-md">{f.label}</label>
                      <Field field={f} value={values[f.id]} onChange={(v) => setValue(f.id, v)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={submit} className="btn-primary !px-6 !py-3">SUBMIT INSPECTION</button>
      </div>

      <Modal open={submitted} onClose={() => setSubmitted(false)} title="Inspection Submitted" size="sm" footer={
        <button className="btn-primary" onClick={() => navigate('/app/inspections')}>Back to Inspections</button>
      }>
        <div className="flex flex-col items-center py-4 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={28} />
          </div>
          <p className="mt-3 text-sm font-semibold text-ink-800">Inspection submitted successfully</p>
          <p className="mt-1 text-xs text-ink-500">Your checklist for {inspection.projectName} has been recorded (demo data — not persisted to a server).</p>
        </div>
      </Modal>
    </div>
  )
}
