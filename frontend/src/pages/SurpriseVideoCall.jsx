import React, { useEffect, useRef, useState } from 'react'
import { PhoneCall, Mic, MicOff, Video, VideoOff, PhoneOff, Loader2, History, User } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DemoBanner from '../components/DemoBanner'
import { PROJECTS } from '../data/mockData'
import { useToast } from '../hooks/useToast'

const PARTICIPANT_ROLES = ['Project Incharge', 'Staff Member', 'Beneficiary Representative']

const CALL_HISTORY = Array.from({ length: 6 }).map((_, i) => {
  const p = PROJECTS[(i * 3) % PROJECTS.length]
  return {
    id: `VC-${1000 + i}`,
    project: p.name,
    participant: PARTICIPANT_ROLES[i % 3],
    date: `0${(i % 8) + 1} Sep 2026`,
    duration: `${2 + (i % 5)}m ${10 + i * 7 % 50}s`,
    status: i % 4 === 0 ? 'Missed' : 'Completed',
  }
})

export default function SurpriseVideoCall() {
  const [stage, setStage] = useState('idle') // idle | connecting | connected
  const [participant, setParticipant] = useState(null)
  const [project, setProject] = useState(null)
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef(null)
  const { toast } = useToast()

  function startCall() {
    const p = PROJECTS[Math.floor(Math.random() * PROJECTS.length)]
    const role = PARTICIPANT_ROLES[Math.floor(Math.random() * PARTICIPANT_ROLES.length)]
    setProject(p)
    setParticipant(role)
    setStage('connecting')
    setTimeout(() => {
      setStage('connected')
      setSeconds(0)
      toast(`Connected with ${role} at ${p.name} (demo).`, 'success')
    }, 1800)
  }

  function endCall() {
    setStage('idle')
    clearInterval(timerRef.current)
    toast('Call ended and logged to Call History (demo).', 'info')
  }

  useEffect(() => {
    if (stage === 'connected') {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [stage])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div>
      <PageHeader title="Surprise Video Call" description="Randomized, unannounced video verification of on-ground activity." />
      <DemoBanner>DEMO VIDEO CALL — no real WebRTC or telephony backend is used. All participants and video are simulated.</DemoBanner>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          {stage === 'idle' && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-600">
                <PhoneCall size={26} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink-900">Ready to run a surprise verification call</h3>
              <p className="mt-1.5 max-w-sm text-sm text-ink-500">A random project and participant will be selected automatically to reduce predictability.</p>
              <button onClick={startCall} className="btn-primary mt-6 !px-6 !py-3"><PhoneCall size={16} /> START SURPRISE VIDEO CALL</button>
            </div>
          )}

          {stage === 'connecting' && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <Loader2 size={30} className="animate-spin text-brand-600" />
              <h3 className="mt-4 text-base font-semibold text-ink-900">Connecting to {participant}…</h3>
              <p className="mt-1 text-sm text-ink-500">{project?.name} · {project?.district}, {project?.state}</p>
            </div>
          )}

          {stage === 'connected' && (
            <div>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-ink-900">
                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                  {cameraOff ? <VideoOff size={40} /> : <User size={56} />}
                </div>
                <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulseSlow" /> {mm}:{ss}
                </span>
                <span className="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-bold uppercase text-white">Demo Video Call</span>
                <div className="absolute bottom-3 right-3 h-20 w-32 rounded-lg border-2 border-white/70 bg-ink-800 flex items-center justify-center text-white/40">
                  <User size={20} />
                </div>
                <div className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2.5 py-1.5 text-xs text-white">
                  <p className="font-semibold">{participant}</p>
                  <p className="text-white/70">{project?.name}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                <button onClick={() => setMuted((m) => !m)} className={`grid h-11 w-11 place-items-center rounded-full ${muted ? 'bg-red-100 text-red-600' : 'bg-ink-100 text-ink-600'}`}>
                  {muted ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <button onClick={() => setCameraOff((c) => !c)} className={`grid h-11 w-11 place-items-center rounded-full ${cameraOff ? 'bg-red-100 text-red-600' : 'bg-ink-100 text-ink-600'}`}>
                  {cameraOff ? <VideoOff size={18} /> : <Video size={18} />}
                </button>
                <button onClick={endCall} className="grid h-11 w-11 place-items-center rounded-full bg-red-600 text-white hover:bg-red-700">
                  <PhoneOff size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="card p-4">
          <p className="section-title mb-3 flex items-center gap-1.5"><History size={13} /> Call History</p>
          <div className="space-y-2">
            {CALL_HISTORY.map((c) => (
              <div key={c.id} className="rounded-lg border border-ink-100 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-ink-800 truncate">{c.project}</p>
                  <span className={`badge ${c.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200' : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200'}`}>{c.status}</span>
                </div>
                <p className="mt-1 text-xs text-ink-400">{c.participant} · {c.date} · {c.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
