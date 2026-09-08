import React, { useState } from 'react'
import { Shuffle, Loader2, CheckCircle2, MapPin, Briefcase, Star, Phone } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DemoBanner from '../components/DemoBanner'
import { INSPECTORS, PROJECTS } from '../data/mockData'
import { useToast } from '../hooks/useToast'

export default function RandomAssignment() {
  const [status, setStatus] = useState('idle') // idle | running | done
  const [assignment, setAssignment] = useState(null)
  const { toast } = useToast()

  function generate() {
    setStatus('running')
    setAssignment(null)
    setTimeout(() => {
      const inspector = INSPECTORS[Math.floor(Math.random() * INSPECTORS.length)]
      const project = PROJECTS[Math.floor(Math.random() * PROJECTS.length)]
      setAssignment({
        inspector,
        project,
        distance: (Math.random() * 30 + 2).toFixed(1),
        conflict: Math.random() > 0.85 ? 'Potential prior visit' : 'None',
      })
      setStatus('done')
      toast('Assignment confirmed and sent to inspector (demo).', 'success')
    }, 1600)
  }

  return (
    <div>
      <PageHeader title="Random Inspection Assignment" description="Fair, unbiased inspector-to-project matching using workload, distance and conflict checks." />
      <DemoBanner>This is a frontend simulation of the random assignment engine — no real routing or scheduling occurs.</DemoBanner>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <p className="section-title mb-3">Available Inspectors</p>
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {INSPECTORS.map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-lg border border-ink-100 px-3.5 py-2.5">
                <div>
                  <p className="text-sm font-medium text-ink-800">{i.name}</p>
                  <p className="text-xs text-ink-400 flex items-center gap-1"><MapPin size={11} /> {i.district}, {i.state}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-ink-500">
                  <span className="flex items-center gap-1"><Briefcase size={11} /> {i.workload}</span>
                  <span className="flex items-center gap-1"><Star size={11} className="text-amber-500" /> {i.rating}</span>
                  <span className={`badge ${i.available ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200' : 'bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200'}`}>
                    {i.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5 flex flex-col">
          <p className="section-title mb-3">Assignment Engine</p>
          <button onClick={generate} disabled={status === 'running'} className="btn-primary w-full !py-3">
            {status === 'running' ? <><Loader2 size={16} className="animate-spin" /> Generating…</> : <><Shuffle size={16} /> GENERATE RANDOM ASSIGNMENT</>}
          </button>

          <div className="mt-4 flex-1">
            {status === 'idle' && (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center text-ink-400">
                <Shuffle size={26} />
                <p className="mt-3 text-sm">Click generate to assign an inspector.</p>
              </div>
            )}
            {status === 'running' && (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center text-ink-400">
                <Loader2 size={26} className="animate-spin text-brand-600" />
                <p className="mt-3 text-sm">Matching inspector to project…</p>
              </div>
            )}
            {status === 'done' && assignment && (
              <div className="animate-fadein rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 size={18} />
                  <p className="text-sm font-bold">ASSIGNMENT CONFIRMED</p>
                </div>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-ink-500">Inspector</dt><dd className="font-semibold text-ink-800">{assignment.inspector.name}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Project</dt><dd className="font-semibold text-ink-800 text-right">{assignment.project.name}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Distance</dt><dd className="font-semibold text-ink-800">{assignment.distance} km</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Workload</dt><dd className="font-semibold text-ink-800">{assignment.inspector.workload}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Conflict</dt><dd className="font-semibold text-ink-800">{assignment.conflict}</dd></div>
                </dl>
                <button onClick={() => toast(`Call placed to ${assignment.inspector.name} (demo).`, 'info')} className="btn-secondary mt-4 w-full !py-1.5 text-xs"><Phone size={13} /> Notify Inspector</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
