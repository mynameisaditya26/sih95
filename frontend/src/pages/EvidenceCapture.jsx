import React, { useState } from 'react'
import { Camera, Video, FileUp, MapPin, ShieldCheck, Loader2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DemoBanner from '../components/DemoBanner'
import { useToast } from '../hooks/useToast'

let counter = 1

function makeEvidence(type) {
  const id = `EVD-${String(6000 + counter++)}`
  return {
    id,
    type,
    lat: (20 + Math.random() * 12).toFixed(5),
    lng: (72 + Math.random() * 15).toFixed(5),
    date: '08 Sep 2026',
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    inspectorId: 'INS-204',
    projectId: 'DOSJE-PRJ-1007',
    inspectionId: 'INSP-5012',
  }
}

export default function EvidenceCapture() {
  const [items, setItems] = useState([])
  const [capturing, setCapturing] = useState(null)
  const { toast } = useToast()

  function capture(type) {
    setCapturing(type)
    setTimeout(() => {
      const e = makeEvidence(type)
      setItems((prev) => [e, ...prev])
      setCapturing(null)
      toast(`${type} captured and verified with GPS location (demo).`, 'success')
    }, 1200)
  }

  return (
    <div>
      <PageHeader title="Evidence Capture" description="Capture GPS-tagged, timestamped photo, video and document evidence during an inspection." />
      <DemoBanner>Capture is simulated in this frontend prototype — no camera, microphone or file storage is actually used.</DemoBanner>

      <div className="card p-5 mb-6">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => capture('Photo')} disabled={!!capturing} className="btn-primary"><Camera size={16} /> {capturing === 'Photo' ? 'Capturing…' : 'Capture Photo'}</button>
          <button onClick={() => capture('Video')} disabled={!!capturing} className="btn-secondary"><Video size={16} /> {capturing === 'Video' ? 'Capturing…' : 'Capture Video'}</button>
          <button onClick={() => capture('Document')} disabled={!!capturing} className="btn-secondary"><FileUp size={16} /> {capturing === 'Document' ? 'Adding…' : 'Add Document'}</button>
        </div>
        {capturing && (
          <div className="mt-4 flex items-center gap-2 text-sm text-ink-500">
            <Loader2 size={16} className="animate-spin" /> Verifying GPS location and timestamp…
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="card p-10 text-center text-sm text-ink-400">No evidence captured yet in this session. Use the buttons above to simulate a capture.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e) => (
            <div key={e.id} className="card overflow-hidden">
              <div className="flex aspect-video items-center justify-center bg-ink-100 text-ink-400">
                {e.type === 'Photo' && <Camera size={26} />}
                {e.type === 'Video' && <Video size={26} />}
                {e.type === 'Document' && <FileUp size={26} />}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-800">{e.type} · {e.id}</p>
                  <span className="badge bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"><ShieldCheck size={10} /> Verified</span>
                </div>
                <p className="mt-1.5 text-xs text-ink-500 flex items-center gap-1"><MapPin size={11} /> {e.lat}, {e.lng}</p>
                <p className="text-xs text-ink-400">{e.date} · {e.time}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">VERIFIED LOCATION</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
