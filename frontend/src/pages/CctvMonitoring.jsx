import React, { useMemo, useState } from 'react'
import { Video, VideoOff, Maximize2, Expand, Filter, Wifi, WifiOff } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DemoBanner from '../components/DemoBanner'
import Drawer from '../components/Drawer'
import Modal from '../components/Modal'
import { CCTV_FEEDS, PROJECTS } from '../data/mockData'

function CameraPreview({ online }) {
  return (
    <div className={`relative flex aspect-video items-center justify-center overflow-hidden rounded-lg ${online ? 'bg-ink-900' : 'bg-ink-200'}`}>
      {online ? (
        <>
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)' }} />
          <Video size={22} className="text-white/40" />
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-600/90 px-1.5 py-0.5 text-[9px] font-bold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulseSlow" /> LIVE
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center gap-1.5 text-ink-500">
          <VideoOff size={20} />
          <span className="text-[10px] font-semibold">OFFLINE</span>
        </div>
      )}
    </div>
  )
}

export default function CctvMonitoring() {
  const [projectFilter, setProjectFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [fullscreen, setFullscreen] = useState(null)

  const projectOptions = useMemo(() => [...new Set(CCTV_FEEDS.map((c) => c.projectName))], [])

  const filtered = CCTV_FEEDS.filter((c) =>
    (projectFilter === 'All' || c.projectName === projectFilter) &&
    (statusFilter === 'All' || c.status === statusFilter)
  )

  const online = CCTV_FEEDS.filter((c) => c.status === 'ONLINE').length

  return (
    <div>
      <PageHeader
        title="CCTV Monitoring"
        description="Unified camera grid across all monitored institutes."
        actions={<span className="badge bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"><Wifi size={12} /> {online} / {CCTV_FEEDS.length} online</span>}
      />
      <DemoBanner>SIMULATED CCTV FEED — no real camera integration. Previews are illustrative placeholders only.</DemoBanner>

      <div className="card p-4 mb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter size={14} className="text-ink-400" />
          <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{projectOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option><option>ONLINE</option><option>OFFLINE</option>
          </select>
          <p className="ml-auto text-ink-400">{filtered.length} cameras</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((cam) => (
          <div key={cam.id} className="card overflow-hidden">
            <CameraPreview online={cam.status === 'ONLINE'} />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-800">{cam.name}</p>
                <span className={`badge ${cam.status === 'ONLINE' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200' : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200'}`}>
                  {cam.status === 'ONLINE' ? <Wifi size={10} /> : <WifiOff size={10} />} {cam.status}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-ink-500 truncate">{cam.projectName}</p>
              <p className="text-xs text-ink-400">{cam.location} · {cam.lastActive}</p>
              <div className="mt-2.5 flex items-center gap-1.5">
                <button onClick={() => setSelected(cam)} className="btn-secondary flex-1 !py-1.5 text-xs"><Expand size={13} /> Details</button>
                <button disabled={cam.status !== 'ONLINE'} onClick={() => setFullscreen(cam)} className="btn-secondary !py-1.5 !px-2 text-xs disabled:opacity-40"><Maximize2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="space-y-4">
            <CameraPreview online={selected.status === 'ONLINE'} />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-ink-500">Camera ID</dt><dd className="font-mono text-xs">{selected.id}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Project</dt><dd className="font-medium">{selected.projectName}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Location</dt><dd className="font-medium">{selected.location}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Status</dt><dd className="font-medium">{selected.status}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Last Active</dt><dd className="font-medium">{selected.lastActive}</dd></div>
            </dl>
            <button disabled={selected.status !== 'ONLINE'} onClick={() => setFullscreen(selected)} className="btn-primary w-full disabled:opacity-40"><Maximize2 size={15} /> View Fullscreen</button>
          </div>
        )}
      </Drawer>

      <Modal open={!!fullscreen} onClose={() => setFullscreen(null)} title={fullscreen ? `${fullscreen.name} — ${fullscreen.projectName}` : ''} size="xl">
        {fullscreen && (
          <div>
            <div className="flex aspect-video items-center justify-center rounded-lg bg-ink-900">
              <Video size={40} className="text-white/30" />
            </div>
            <p className="mt-2 text-xs text-ink-400">SIMULATED CCTV FEED · {fullscreen.location} · {fullscreen.lastActive}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
