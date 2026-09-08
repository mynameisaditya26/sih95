import React from 'react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { TrendingUp, TrendingDown, ShieldCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { COMPLIANCE_BREAKDOWN } from '../data/mockData'

const OVERALL = Math.round(COMPLIANCE_BREAKDOWN.reduce((a, c) => a + c.score, 0) / COMPLIANCE_BREAKDOWN.length)
const PREVIOUS = OVERALL - 3

const TREND = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => ({ month: m, score: 78 + i * 1.4 + (i % 2) }))

const FAILED_CRITERIA = [
  'Attendance register digitization pending at 4 institutes',
  'CCTV uptime below 90% threshold for 3 projects',
  'Overdue inspection reports at 2 institutes',
]

export default function ComplianceDashboard() {
  return (
    <div>
      <PageHeader title="Compliance Dashboard" description="A composite view of compliance across infrastructure, staff, service quality, documentation and attendance." />

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <div className="card p-5">
          <p className="section-title mb-2">Overall Compliance</p>
          <div className="flex items-end gap-3">
            <p className="text-5xl font-extrabold text-brand-700">{OVERALL}%</p>
            <p className={`mb-2 flex items-center gap-1 text-sm font-semibold ${OVERALL >= PREVIOUS ? 'text-emerald-600' : 'text-red-600'}`}>
              {OVERALL >= PREVIOUS ? <TrendingUp size={15} /> : <TrendingDown size={15} />} {Math.abs(OVERALL - PREVIOUS)}%
            </p>
          </div>
          <p className="mt-1 text-xs text-ink-400">Previous period: {PREVIOUS}%</p>
          <div className="mt-4 space-y-2">
            {COMPLIANCE_BREAKDOWN.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1"><span className="text-ink-500">{c.name}</span><span className="font-semibold text-ink-700">{c.score}%</span></div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full rounded-full bg-brand-600" style={{ width: `${c.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5 lg:col-span-2">
          <p className="section-title mb-2">Compliance Breakdown</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={COMPLIANCE_BREAKDOWN} outerRadius={90}>
              <PolarGrid stroke="#e5e9f0" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar dataKey="score" stroke="#1465e6" fill="#1465e6" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <p className="section-title mb-3">Compliance Trend</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#1465e6" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4">
          <p className="section-title mb-3 flex items-center gap-1.5"><ShieldCheck size={13} /> Failed Criteria</p>
          <ul className="space-y-2">
            {FAILED_CRITERIA.map((f, i) => (
              <li key={i} className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
