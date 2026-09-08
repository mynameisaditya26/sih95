import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FolderKanban, ClipboardList, CheckCircle2, ShieldAlert, Video, Gauge, PhoneCall,
  Shuffle, Eye, FileText, ArrowUpRight, Clock, CircleAlert,
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import RiskBadge from '../components/RiskBadge'
import {
  PROJECTS, INSPECTIONS, ANOMALIES, NOTIFICATIONS, PROJECT_GROWTH, INSPECTION_TREND,
  STATE_WISE_PROJECTS, RISK_DISTRIBUTION, ATTENDANCE_TREND, CCTV_FEEDS,
} from '../data/mockData'

const RISK_COLORS = { LOW: '#10b981', MEDIUM: '#f59e0b', HIGH: '#ef4444' }

export default function AdminDashboard() {
  const navigate = useNavigate()

  const stats = useMemo(() => {
    const total = PROJECTS.length
    const active = PROJECTS.filter((p) => p.status === 'Active').length
    const pendingInsp = INSPECTIONS.filter((i) => i.status === 'Pending' || i.status === 'In Progress').length
    const completedInsp = INSPECTIONS.filter((i) => i.status === 'Completed').length
    const highRisk = PROJECTS.filter((p) => p.risk === 'HIGH').length
    const anomalies = ANOMALIES.length
    const cctvOffline = CCTV_FEEDS.filter((c) => c.status === 'OFFLINE').length
    const compliance = Math.round(PROJECTS.reduce((a, p) => a + p.compliance, 0) / total)
    return { total, active, pendingInsp, completedInsp, highRisk, anomalies, cctvOffline, compliance }
  }, [])

  const recentInspections = INSPECTIONS.slice(0, 5)
  const recentAlerts = NOTIFICATIONS.slice(0, 5)
  const highRiskProjects = PROJECTS.filter((p) => p.risk === 'HIGH').slice(0, 5)
  const upcoming = INSPECTIONS.filter((i) => i.status === 'Pending').slice(0, 5)

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="National mission-control overview of every monitored project, inspection and alert."
        actions={<span className="badge bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"><Gauge size={12} /> System Healthy</span>}
      />

      {/* Top cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Total Projects" value={stats.total} icon={FolderKanban} tone="brand" trend="+6 this month" trendUp />
        <StatCard label="Active Projects" value={stats.active} icon={CheckCircle2} tone="emerald" trend={`${Math.round((stats.active/stats.total)*100)}% of total`} trendUp />
        <StatCard label="Pending Inspections" value={stats.pendingInsp} icon={ClipboardList} tone="amber" trend="Needs scheduling" />
        <StatCard label="Completed Inspections" value={stats.completedInsp} icon={CheckCircle2} tone="emerald" trend="This quarter" trendUp />
        <StatCard label="High Risk Projects" value={stats.highRisk} icon={ShieldAlert} tone="red" trend="Requires attention" />
        <StatCard label="Anomalies Detected" value={stats.anomalies} icon={CircleAlert} tone="red" trend="AI-flagged (demo)" />
        <StatCard label="CCTV Offline" value={stats.cctvOffline} icon={Video} tone="amber" trend={`of ${CCTV_FEEDS.length} cameras`} />
        <StatCard label="Compliance Rate" value={`${stats.compliance}%`} icon={Gauge} tone="brand" trend="+2.1% vs last month" trendUp />
      </div>

      {/* Quick actions */}
      <div className="mt-6 card p-4">
        <p className="section-title mb-3">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate('/app/surprise-vc')} className="btn-primary"><PhoneCall size={15} /> Start Surprise VC</button>
          <button onClick={() => navigate('/app/random-assignment')} className="btn-secondary"><Shuffle size={15} /> Assign Inspection</button>
          <button onClick={() => navigate('/app/risk-management')} className="btn-secondary"><ShieldAlert size={15} /> View High Risk</button>
          <button onClick={() => navigate('/app/cctv')} className="btn-secondary"><Eye size={15} /> View CCTV</button>
          <button onClick={() => navigate('/app/reports')} className="btn-secondary"><FileText size={15} /> Generate Report</button>
        </div>
      </div>

      {/* Charts row 1 */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <p className="section-title mb-3">Project Growth</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={PROJECT_GROWTH}>
              <defs>
                <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1465e6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#1465e6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="projects" stroke="#1465e6" fill="url(#growth)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <p className="section-title mb-3">Risk Distribution</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={RISK_DISTRIBUTION} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                {RISK_DISTRIBUTION.map((entry) => <Cell key={entry.name} fill={RISK_COLORS[entry.name]} />)}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <p className="section-title mb-3">Inspection Trend</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={INSPECTION_TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="completed" fill="#1465e6" radius={[4, 4, 0, 0]} name="Completed" />
              <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4">
          <p className="section-title mb-3">State-wise Projects</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={STATE_WISE_PROJECTS} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="state" tick={{ fontSize: 11 }} width={90} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#0d4fc2" radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 card p-4">
        <p className="section-title mb-3">Attendance Analytics — Expected vs Actual</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={ATTENDANCE_TREND}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="expected" stroke="#94a3b8" strokeWidth={2} dot={false} name="Expected" />
            <Line type="monotone" dataKey="actual" stroke="#1465e6" strokeWidth={2} dot={false} name="Actual" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom sections */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="section-title">Recent Inspections</p>
            <button onClick={() => navigate('/app/inspections')} className="text-xs font-medium text-brand-600 hover:underline flex items-center gap-1">View all <ArrowUpRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {recentInspections.map((i) => (
              <div key={i.id} onClick={() => navigate(`/app/inspections/${i.id}`)} className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 hover:bg-ink-50">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-800">{i.projectName}</p>
                  <p className="text-xs text-ink-400">{i.type} · {i.inspector} · {i.date}</p>
                </div>
                <Badge status={i.status}>{i.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="section-title">Recent Alerts</p>
            <button onClick={() => navigate('/app/notifications')} className="text-xs font-medium text-brand-600 hover:underline flex items-center gap-1">View all <ArrowUpRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {recentAlerts.map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-ink-50">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.priority === 'High' ? 'bg-red-500' : n.priority === 'Medium' ? 'bg-amber-500' : 'bg-ink-300'}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-800">{n.type}</p>
                  <p className="truncate text-xs text-ink-400">{n.projectName} · {n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="section-title">High Risk Projects</p>
            <button onClick={() => navigate('/app/risk-management')} className="text-xs font-medium text-brand-600 hover:underline flex items-center gap-1">View all <ArrowUpRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {highRiskProjects.map((p) => (
              <div key={p.id} onClick={() => navigate(`/app/projects/${p.id}`)} className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 hover:bg-ink-50">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-800">{p.name}</p>
                  <p className="text-xs text-ink-400">{p.district}, {p.state}</p>
                </div>
                <RiskBadge risk={p.risk} />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="section-title">Upcoming Inspections</p>
            <button onClick={() => navigate('/app/inspections')} className="text-xs font-medium text-brand-600 hover:underline flex items-center gap-1">View all <ArrowUpRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {upcoming.map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-ink-50">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-800">{i.projectName}</p>
                  <p className="text-xs text-ink-400 flex items-center gap-1"><Clock size={11} /> {i.date}</p>
                </div>
                <Badge status={i.priority === 'High' ? 'Overdue' : 'Pending'}>{i.priority}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
