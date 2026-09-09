import React, { useMemo, useState, useRef } from 'react'
import {
  ShieldAlert, Filter, CheckCircle2, Upload, Video, Loader2,
  AlertTriangle, Play, X, FileVideo, Clock, MapPin, Eye
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DemoBanner from '../components/DemoBanner'
import Modal from '../components/Modal'
import { ANOMALIES, PROJECTS } from '../data/mockData'
import { useToast } from '../hooks/useToast'

const SEV_STYLE = {
  HIGH: 'bg-red-50 text-red-700 ring-red-200',
  MEDIUM: 'bg-amber-50 text-amber-700 ring-amber-200',
  LOW: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

// Realistic mock anomaly templates for uploaded videos (demo)
const VIDEO_ANOMALY_TEMPLATES = [
  {
    type: 'Empty Classroom / Low Attendance',
    severity: 'HIGH',
    confidence: 91,
    explanation: 'Video frames show significantly fewer students than the registered attendance count for this session. Multiple empty desks detected across consecutive frames. Possible attendance padding or proxy attendance.',
    action: 'Trigger surprise physical verification. Cross-check biometric / digital attendance logs with video timestamps. Notify District Authority.',
    findings: [
      'Student count in video ≈ 8–11 (registered: 34)',
      'No instructor movement detected in first 45 seconds',
      'Consistent empty seats in rows 2–4',
      'Timestamp mismatch with claimed session start',
    ],
    timeline: [
      { time: '00:00–00:15', event: 'Classroom appears mostly empty' },
      { time: '00:16–00:40', event: 'Only 3–4 students visible near front' },
      { time: '00:41–01:10', event: 'No significant change in occupancy' },
    ],
  },
  {
    type: 'Unauthorized Activity / Facility Misuse',
    severity: 'HIGH',
    confidence: 87,
    explanation: 'Detected non-program related activity inside the funded facility during claimed operational hours. Objects and posture analysis indicate possible commercial use of premises.',
    action: 'Schedule immediate surprise inspection. Freeze next tranche until physical verification is completed. Request CCTV archive for last 7 days.',
    findings: [
      'Non-beneficiary individuals present',
      'Equipment not matching approved inventory list',
      'Activity pattern inconsistent with scheme guidelines',
      'Possible commercial / residential misuse signals',
    ],
    timeline: [
      { time: '00:00–00:20', event: 'Multiple unknown adults enter frame' },
      { time: '00:21–00:55', event: 'Objects moved that are not scheme assets' },
      { time: '00:56–01:30', event: 'Sustained non-program activity' },
    ],
  },
  {
    type: 'Ghost Beneficiaries / Duplicate Presence',
    severity: 'MEDIUM',
    confidence: 84,
    explanation: 'Face re-identification across frames suggests the same individuals appear multiple times under different beneficiary IDs. Possible ghost beneficiary list inflation.',
    action: 'Run beneficiary identity cross-check. Request Aadhaar / photo re-verification for the flagged batch. Mark project under elevated risk.',
    findings: [
      'Same individual detected in 3 different “beneficiary” slots',
      'Clothing & posture match across claimed separate persons',
      'Attendance sheet numbers do not match unique faces',
    ],
    timeline: [
      { time: '00:05', event: 'Person A enters' },
      { time: '00:28', event: 'Same person reappears with different ID card' },
      { time: '00:51', event: 'Third appearance of identical face' },
    ],
  },
  {
    type: 'Safety / Infrastructure Hazard',
    severity: 'MEDIUM',
    confidence: 79,
    explanation: 'Visible structural or safety issues in the facility (exposed wiring, blocked exits, overcrowding). Risk to beneficiaries present in the video.',
    action: 'Issue corrective action notice within 48 hours. Require photographic proof of remediation. Escalate if not closed in 7 days.',
    findings: [
      'Blocked emergency exit path',
      'Exposed electrical wiring near seating area',
      'Overcrowding beyond approved capacity',
    ],
    timeline: [
      { time: '00:00–00:30', event: 'Hazard objects clearly visible' },
      { time: '00:31–01:00', event: 'Beneficiaries moving near hazard zone' },
    ],
  },
  {
    type: 'No Significant Anomaly Detected',
    severity: 'LOW',
    confidence: 76,
    explanation: 'Video content is consistent with expected program activity. Attendance density, staff presence and facility usage appear normal for the claimed session.',
    action: 'No immediate action required. Continue routine monitoring. Sample may be retained for audit trail.',
    findings: [
      'Occupancy within expected range',
      'Staff presence confirmed',
      'No policy violation signals detected',
    ],
    timeline: [
      { time: '00:00–end', event: 'Normal program activity throughout' },
    ],
  },
]

function pickTemplate(filename = '') {
  const lower = (filename || '').toLowerCase()
  if (lower.includes('empty') || lower.includes('absent') || lower.includes('low')) return VIDEO_ANOMALY_TEMPLATES[0]
  if (lower.includes('misuse') || lower.includes('unauthorized')) return VIDEO_ANOMALY_TEMPLATES[1]
  if (lower.includes('ghost') || lower.includes('duplicate')) return VIDEO_ANOMALY_TEMPLATES[2]
  if (lower.includes('safety') || lower.includes('hazard')) return VIDEO_ANOMALY_TEMPLATES[3]
  // default: weighted random-ish based on name length for demo variety
  const idx = filename.length % VIDEO_ANOMALY_TEMPLATES.length
  return VIDEO_ANOMALY_TEMPLATES[idx]
}

export default function AiAnomalyCenter() {
  const [severity, setSeverity] = useState('All')
  const [reviewedMap, setReviewedMap] = useState({})
  const [selected, setSelected] = useState(null)
  const [uploadedAnomalies, setUploadedAnomalies] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewName, setPreviewName] = useState('')
  const [resultModal, setResultModal] = useState(null)
  const fileRef = useRef(null)
  const { toast } = useToast()

  const list = useMemo(() => {
    const base = ANOMALIES.filter((a) => severity === 'All' || a.severity === severity)
    const extra = uploadedAnomalies.filter((a) => severity === 'All' || a.severity === severity)
    return [...extra, ...base]
  }, [severity, uploadedAnomalies])

  function markReviewed(id) {
    setReviewedMap((prev) => ({ ...prev, [id]: true }))
    toast('Anomaly marked as human-reviewed (demo).', 'success')
  }

  function clearPreview() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setPreviewName('')
    if (fileRef.current) fileRef.current.value = ''
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('video/')) {
      toast('Please select a video file (mp4, webm, mov, etc.).', 'error')
      return
    }
    if (file.size > 100 * 1024 * 1024) {
      toast('File too large. Please use a video under 100 MB for demo.', 'error')
      return
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setPreviewName(file.name)
  }

  async function runAnalysis() {
    if (!previewUrl || !previewName) {
      toast('Select a video first.', 'error')
      return
    }
    setAnalyzing(true)
    setUploadProgress(0)

    // Simulated progressive analysis for a convincing demo
    const steps = [12, 28, 45, 62, 78, 91, 100]
    for (const p of steps) {
      await new Promise((r) => setTimeout(r, 280 + Math.random() * 180))
      setUploadProgress(p)
    }

    const template = pickTemplate(previewName)
    const project = PROJECTS[Math.floor(Math.random() * Math.min(PROJECTS.length, 8))] || {
      id: 'DOSJE-PRJ-DEMO',
      name: 'Demo Project – Uploaded Video',
    }

    const anomaly = {
      id: `ANM-UP-${Date.now().toString().slice(-6)}`,
      type: template.type,
      severity: template.severity,
      confidence: template.confidence,
      explanation: template.explanation,
      action: template.action,
      findings: template.findings,
      timeline: template.timeline,
      projectId: project.id,
      projectName: project.name,
      detectedAt: new Date().toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
      reviewed: false,
      source: 'Uploaded Video',
      videoName: previewName,
      videoUrl: previewUrl, // keep for preview in modal
    }

    setUploadedAnomalies((prev) => [anomaly, ...prev])
    setResultModal(anomaly)
    setAnalyzing(false)
    setUploadProgress(0)
    toast(`Analysis complete — ${template.severity} severity anomaly detected.`, template.severity === 'LOW' ? 'success' : 'error')
  }

  return (
    <div>
      <PageHeader
        title="AI Anomaly Center"
        description="AI-assisted detection of attendance, evidence and reporting anomalies. Upload a video to run analysis without a live camera."
      />
      <DemoBanner>
        AI-GENERATED DEMO RESULTS · HUMAN VERIFICATION REQUIRED — analysis is simulated for presentation. No real ML model is executed.
      </DemoBanner>

      {/* ===== VIDEO UPLOAD PANEL ===== */}
      <div className="card p-5 mb-6 border-2 border-dashed border-brand-200 bg-brand-50/30">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
                <Upload size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-ink-900">Upload Video for Anomaly Analysis</p>
                <p className="text-xs text-ink-500">No camera needed — select any MP4 / WebM / MOV from your computer</p>
              </div>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={analyzing}
                className="btn-secondary"
              >
                <FileVideo size={16} /> Choose Video
              </button>
              <button
                type="button"
                onClick={runAnalysis}
                disabled={!previewUrl || analyzing}
                className="btn-primary"
              >
                {analyzing ? (
                  <><Loader2 size={16} className="animate-spin" /> Analyzing… {uploadProgress}%</>
                ) : (
                  <><ShieldAlert size={16} /> Run AI Analysis</>
                )}
              </button>
              {previewUrl && !analyzing && (
                <button type="button" onClick={clearPreview} className="btn-secondary !px-3">
                  <X size={16} /> Clear
                </button>
              )}
            </div>

            {analyzing && (
              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-brand-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-ink-500 flex items-center gap-1.5">
                  <Loader2 size={12} className="animate-spin" />
                  Extracting frames · running occupancy / face / activity models · scoring risk…
                </p>
              </div>
            )}

            {previewName && !analyzing && (
              <p className="mt-3 text-xs text-ink-600">
                Selected: <span className="font-semibold">{previewName}</span>
              </p>
            )}
          </div>

          {/* Live preview of selected video */}
          <div className="w-full lg:w-80 shrink-0">
            {previewUrl ? (
              <div className="relative overflow-hidden rounded-xl bg-ink-900 aspect-video">
                <video
                  src={previewUrl}
                  controls
                  className="h-full w-full object-contain"
                />
                <span className="absolute left-2 top-2 rounded bg-brand-600/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  PREVIEW
                </span>
              </div>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center rounded-xl border border-ink-200 bg-ink-50 text-ink-400">
                <Video size={28} className="mb-2 opacity-50" />
                <p className="text-xs font-medium">Video preview will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== FILTER + LIST ===== */}
      <div className="card p-4 mb-4">
        <div className="flex items-center gap-2 text-xs">
          <Filter size={14} className="text-ink-400" />
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="input !w-auto !py-1.5 text-xs"
          >
            <option>All</option>
            <option>HIGH</option>
            <option>MEDIUM</option>
            <option>LOW</option>
          </select>
          <p className="ml-auto text-ink-400">{list.length} anomalies</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => {
          const reviewed = reviewedMap[a.id] ?? a.reviewed
          return (
            <div key={a.id} className="card p-4">
              <div className="flex items-start justify-between gap-2">
                <span className={`badge ring-1 ring-inset ${SEV_STYLE[a.severity]}`}>
                  <ShieldAlert size={11} /> {a.severity}
                </span>
                <div className="flex items-center gap-1.5">
                  {a.source === 'Uploaded Video' && (
                    <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200">
                      <Video size={10} /> Uploaded
                    </span>
                  )}
                  {reviewed && (
                    <span className="badge bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200">
                      <CheckCircle2 size={11} /> Reviewed
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-2.5 text-sm font-semibold text-ink-900">{a.type}</p>
              <p className="text-xs text-ink-500 truncate">{a.projectName}</p>
              <p className="mt-2 text-xs text-ink-400">
                Confidence: <span className="font-semibold text-ink-600">{a.confidence}%</span>
              </p>
              <p className="text-xs text-ink-400">Detected: {a.detectedAt}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setSelected(a)}
                  className="btn-secondary flex-1 !py-1.5 text-xs"
                >
                  <Eye size={13} /> View Details
                </button>
                {!reviewed && (
                  <button
                    onClick={() => markReviewed(a.id)}
                    className="btn-primary !py-1.5 text-xs"
                  >
                    Mark Reviewed
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Standard detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.type} size="md">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`badge ring-1 ring-inset ${SEV_STYLE[selected.severity]}`}>
                {selected.severity}
              </span>
              <span className="text-xs text-ink-400">Confidence: {selected.confidence}%</span>
              {selected.source === 'Uploaded Video' && (
                <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200">
                  From uploaded video
                </span>
              )}
            </div>

            {selected.videoUrl && (
              <div className="overflow-hidden rounded-lg bg-ink-900 aspect-video">
                <video src={selected.videoUrl} controls className="h-full w-full object-contain" />
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase">Explanation</p>
              <p className="mt-1 text-ink-700">{selected.explanation}</p>
            </div>

            {selected.findings?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-ink-500 uppercase mb-1.5">Key Findings</p>
                <ul className="space-y-1.5">
                  {selected.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink-700">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selected.timeline?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-ink-500 uppercase mb-1.5">Timeline Highlights</p>
                <div className="space-y-2 rounded-lg bg-ink-50 p-3">
                  {selected.timeline.map((t, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                      <span className="font-mono font-semibold text-brand-700 shrink-0 w-24">{t.time}</span>
                      <span className="text-ink-600">{t.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase">Recommended Action</p>
              <p className="mt-1 text-ink-700">{selected.action}</p>
            </div>

            <dl className="grid grid-cols-2 gap-3 rounded-lg bg-ink-50 p-3 text-xs">
              <div>
                <dt className="text-ink-400">Project</dt>
                <dd className="font-medium text-ink-700">{selected.projectName}</dd>
              </div>
              <div>
                <dt className="text-ink-400">Detected</dt>
                <dd className="font-medium text-ink-700">{selected.detectedAt}</dd>
              </div>
              {selected.videoName && (
                <div className="col-span-2">
                  <dt className="text-ink-400">Source Video</dt>
                  <dd className="font-medium text-ink-700 flex items-center gap-1">
                    <FileVideo size={12} /> {selected.videoName}
                  </dd>
                </div>
              )}
            </dl>

            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
              AI-generated demo result · human verification required before any official action.
            </p>
          </div>
        )}
      </Modal>

      {/* Immediate result modal after analysis */}
      <Modal
        open={!!resultModal}
        onClose={() => setResultModal(null)}
        title="Analysis Complete"
        size="lg"
      >
        {resultModal && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 rounded-xl bg-ink-50 p-4">
              <div className={`grid h-12 w-12 place-items-center rounded-full ${
                resultModal.severity === 'HIGH' ? 'bg-red-100 text-red-600' :
                resultModal.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-600' :
                'bg-emerald-100 text-emerald-600'
              }`}>
                <ShieldAlert size={22} />
              </div>
              <div>
                <p className="font-bold text-ink-900">{resultModal.type}</p>
                <p className="text-xs text-ink-500">
                  Severity <span className="font-semibold">{resultModal.severity}</span> · Confidence {resultModal.confidence}%
                </p>
              </div>
            </div>

            {resultModal.videoUrl && (
              <div className="overflow-hidden rounded-lg bg-ink-900 aspect-video">
                <video src={resultModal.videoUrl} controls className="h-full w-full object-contain" />
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase">Explanation</p>
              <p className="mt-1 text-ink-700">{resultModal.explanation}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase mb-1.5">Key Findings</p>
              <ul className="space-y-1.5">
                {resultModal.findings.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-ink-700">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase mb-1.5">Timeline</p>
              <div className="space-y-2 rounded-lg bg-ink-50 p-3">
                {resultModal.timeline.map((t, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <span className="font-mono font-semibold text-brand-700 shrink-0 w-24 flex items-center gap-1">
                      <Clock size={11} /> {t.time}
                    </span>
                    <span className="text-ink-600">{t.event}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase">Recommended Action</p>
              <p className="mt-1 text-ink-700">{resultModal.action}</p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setSelected(resultModal)
                  setResultModal(null)
                }}
                className="btn-secondary flex-1"
              >
                Keep in list
              </button>
              <button
                onClick={() => {
                  markReviewed(resultModal.id)
                  setResultModal(null)
                }}
                className="btn-primary flex-1"
              >
                Mark Reviewed
              </button>
            </div>

            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
              This is a simulated AI result for the Smart India Hackathon demonstration. Always require human verification before taking action.
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}