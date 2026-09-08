import React, { useState } from 'react'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { Filter, Users, TrendingUp, TrendingDown } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { ATTENDANCE_TREND, STATES, PROJECTS } from '../data/mockData'

const ANOMALY_TREND = ATTENDANCE_TREND.map((d) => ({ month: d.month, anomalies: Math.max(1, Math.round(Math.abs(d.expected - d.actual) / 12)) }))

const BY_PROJECT = PROJECTS.slice(0, 8).map((p) => ({ name: p.name.split(' ')[0], attendance: Math.round(p.compliance - Math.random() * 10) }))

export default function AttendanceAnalytics() {
  const [stateFilter, setStateFilter] = useState('All')
  const [districtFilter, setDistrictFilter] = useState('All')

  const lastMonth = ATTENDANCE_TREND[ATTENDANCE_TREND.length - 1]
  const pct = Math.round((lastMonth.actual / lastMonth.expected) * 100)

  return (
    <div>
      <PageHeader title="Attendance Analytics" description="Daily, weekly and monthly attendance trends across staff and beneficiaries." />

      <div className="card p-4 mb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter size={14} className="text-ink-400" />
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option>{STATES.map((s) => <option key={s.state}>{s.state}</option>)}
          </select>
          <select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All Districts</option>
            {(STATES.find((s) => s.state === stateFilter)?.districts || []).map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
        <StatCard label="Expected (this month)" value={lastMonth.expected} icon={Users} tone="brand" />
        <StatCard label="Actual (this month)" value={lastMonth.actual} icon={Users} tone="emerald" />
        <StatCard label="Attendance %" value={`${pct}%`} icon={pct >= 85 ? TrendingUp : TrendingDown} tone={pct >= 85 ? 'emerald' : 'amber'} />
        <StatCard label="Staff Attendance" value="91%" icon={TrendingUp} tone="brand" trend="+1.4% vs last month" trendUp />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <p className="section-title mb-3">Attendance Trend — Expected vs Actual</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={ATTENDANCE_TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip /><Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="expected" stroke="#94a3b8" strokeWidth={2} dot={false} name="Expected" />
              <Line type="monotone" dataKey="actual" stroke="#1465e6" strokeWidth={2} dot={false} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4">
          <p className="section-title mb-3">Anomaly Trend</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ANOMALY_TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="anomalies" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 card p-4">
        <p className="section-title mb-3">Attendance by Project</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={BY_PROJECT}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="attendance" fill="#0d4fc2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
