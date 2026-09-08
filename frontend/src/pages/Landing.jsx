import React from 'react'
import { Link } from 'react-router-dom'
import {
  Shield, Radar, Video, PhoneCall, ClipboardCheck, ShieldAlert, MapPin, LineChart,
  Lock, Eye, ArrowRight, CheckCircle2, Users, Building2, Activity, FileCheck, Shuffle,
} from 'lucide-react'

const FEATURES = [
  { icon: Radar, title: 'AI Anomaly Detection', desc: 'Machine-learning models flag attendance mismatches, duplicate evidence, and unusual patterns for human review.' },
  { icon: Video, title: 'CCTV Integration Ready', desc: 'Unified camera grid across every funded institute with live status and offline alerts.' },
  { icon: PhoneCall, title: 'Surprise Video Verification', desc: 'Randomized, unannounced video calls to verify on-ground activity in real time.' },
  { icon: ClipboardCheck, title: 'Digital Inspection Checklists', desc: 'Structured, GPS-tagged, offline-capable inspection workflows for field officers.' },
  { icon: ShieldAlert, title: 'Dynamic Risk Scoring', desc: 'Every project gets a continuously updated risk score built from multiple compliance signals.' },
  { icon: MapPin, title: 'Live Geo Monitoring', desc: 'A national map view of every project with color-coded risk status.' },
]

const STEPS = [
  { title: 'Register Projects', desc: 'NGOs and institutes are onboarded with full scheme, staff and beneficiary data.' },
  { title: 'Continuous Monitoring', desc: 'CCTV, attendance and AI signals feed a live risk score for every project.' },
  { title: 'Surprise Inspections', desc: 'Inspectors are randomly and fairly assigned to reduce bias and predictability.' },
  { title: 'Evidence & Reporting', desc: 'Findings, GPS-tagged evidence and digital reports are compiled automatically.' },
  { title: 'Compliance Action', desc: 'State and district authorities act on verified, transparent compliance data.' },
]

const STATS = [
  { label: 'Projects Monitored', value: '2,480+' },
  { label: 'States Covered', value: '28' },
  { label: 'Inspections / Month', value: '6,300+' },
  { label: 'Avg. Compliance Rate', value: '87%' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-ink-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">DoSJE Smart Monitoring</p>
              <p className="text-[10px] text-ink-400 leading-tight">Govt. of India — Dept. of Social Justice & Empowerment</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-ink-600 md:flex">
            <a href="#features" className="hover:text-brand-600">Features</a>
            <a href="#how-it-works" className="hover:text-brand-600">How it Works</a>
            <a href="#transparency" className="hover:text-brand-600">Transparency</a>
            <a href="#contact" className="hover:text-brand-600">Contact</a>
          </nav>
          <Link to="/login" className="btn-primary">Login <ArrowRight size={15} /></Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:py-24 lg:px-8">
          <div>
            <span className="badge bg-brand-100 text-brand-700 ring-1 ring-inset ring-brand-200">
              <Activity size={12} /> Smart India Hackathon Prototype
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
              Smart Monitoring, Surprise Inspection &amp; Compliance Management
            </h1>
            <p className="mt-4 max-w-xl text-base text-ink-600">
              A unified command platform for the Department of Social Justice & Empowerment
              to monitor funded institutes, verify ground reality through AI-assisted
              surprise inspections, and drive transparent, evidence-based compliance.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/login" className="btn-primary !px-6 !py-3 text-sm">
                Login to Platform <ArrowRight size={16} />
              </Link>
              <a href="#how-it-works" className="btn-secondary !px-6 !py-3 text-sm">See how it works</a>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-extrabold text-brand-700">{s.value}</p>
                  <p className="text-xs text-ink-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="card p-5">
              <div className="flex items-center justify-between border-b border-ink-100 pb-3">
                <p className="text-sm font-semibold text-ink-800">National Monitoring Overview</p>
                <span className="badge bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200">Live Demo</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: 'Active Projects', value: '2,142', tone: 'bg-brand-50 text-brand-700' },
                  { label: 'High Risk', value: '186', tone: 'bg-red-50 text-red-700' },
                  { label: 'Inspections Today', value: '58', tone: 'bg-amber-50 text-amber-700' },
                  { label: 'Compliance Rate', value: '87%', tone: 'bg-emerald-50 text-emerald-700' },
                ].map((c) => (
                  <div key={c.label} className={`rounded-lg p-3 ${c.tone}`}>
                    <p className="text-lg font-bold">{c.value}</p>
                    <p className="text-[11px] font-medium opacity-80">{c.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {['Attendance mismatch flagged — Nirmal Welfare Society', 'Surprise inspection completed — 92% compliance', 'CCTV camera restored — Kalyan Foundation'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-ink-50 px-3 py-2 text-xs text-ink-600">
                    <CheckCircle2 size={13} className="text-brand-600 shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-white p-3 shadow-pop ring-1 ring-ink-100 sm:block">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-700">
                <Eye size={14} className="text-brand-600" /> 480 cameras online
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-title">The Problem</p>
            <h2 className="mt-2 text-2xl font-bold text-ink-900">Manual, infrequent oversight leaves gaps</h2>
            <p className="mt-3 text-sm text-ink-600">
              Thousands of NGOs and institutes receive government funding across social
              welfare schemes, but physical inspections are sparse, predictable, and
              paper-based — making it difficult to catch attendance fraud, ghost
              beneficiaries, or infrastructure neglect early.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink-600">
              {[
                'Scheduled inspections are predictable and easy to prepare for',
                'Paper-based reporting is slow, inconsistent, and hard to audit',
                'No unified, real-time view of nationwide project health',
                'Limited ability to detect subtle attendance or documentation fraud',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <p className="section-title">Our Solution</p>
            <h3 className="mt-2 text-lg font-bold text-ink-900">A single, transparent monitoring layer</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { icon: Radar, label: 'AI-assisted detection' },
                { icon: Shuffle, label: 'Unbiased random assignment' },
                { icon: Lock, label: 'Tamper-evident evidence' },
                { icon: LineChart, label: 'Live compliance scoring' },
              ].map((f) => (
                <div key={f.label} className="rounded-lg bg-brand-50 p-3 text-center">
                  <f.icon size={18} className="mx-auto text-brand-600" />
                  <p className="mt-1.5 text-xs font-medium text-brand-800">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-ink-50/60 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-xl">
            <p className="section-title">Key Features</p>
            <h2 className="mt-2 text-2xl font-bold text-ink-900">Everything needed for end-to-end compliance</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-5 hover:shadow-pop transition-shadow">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <f.icon size={19} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-1.5 text-xs text-ink-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="max-w-xl">
          <p className="section-title">How It Works</p>
          <h2 className="mt-2 text-2xl font-bold text-ink-900">The inspection workflow</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</div>
                {i < STEPS.length - 1 && <div className="hidden h-px flex-1 bg-ink-200 lg:block" />}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-1.5 text-xs text-ink-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI monitoring */}
      <section className="bg-ink-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">AI-Assisted Monitoring</p>
            <h2 className="mt-2 text-2xl font-bold">Signals, not surveillance</h2>
            <p className="mt-3 text-sm text-ink-300">
              AI models continuously scan attendance, CCTV uptime, and evidence patterns
              to surface anomalies — every AI result is clearly marked as demo output
              requiring human verification before any compliance action is taken.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-300">
              {['Attendance mismatch detection', 'Duplicate evidence detection', 'Location & timestamp verification', 'Pattern-based risk scoring'].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-400" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Attendance Mismatch', sev: 'HIGH', conf: '94%' },
              { label: 'Duplicate Evidence', sev: 'MEDIUM', conf: '89%' },
              { label: 'Unusual Pattern', sev: 'HIGH', conf: '91%' },
              { label: 'Repetitive Reporting', sev: 'LOW', conf: '76%' },
            ].map((a) => (
              <div key={a.label} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs font-semibold text-white">{a.label}</p>
                <p className={`mt-2 badge ${a.sev === 'HIGH' ? 'bg-red-500/15 text-red-300' : a.sev === 'MEDIUM' ? 'bg-amber-500/15 text-amber-300' : 'bg-emerald-500/15 text-emerald-300'}`}>{a.sev}</p>
                <p className="mt-2 text-[11px] text-ink-400">Confidence: {a.conf}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency & Security */}
      <section id="transparency" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="card p-6">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600"><FileCheck size={19} /></div>
            <h3 className="mt-3 text-base font-bold text-ink-900">Transparency by Design</h3>
            <p className="mt-2 text-sm text-ink-500">
              Every inspection, evidence upload, and report approval is logged in an
              immutable audit trail viewable by authorized state and district
              authorities, closing the gap between funding and ground reality.
            </p>
          </div>
          <div className="card p-6">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600"><Lock size={19} /></div>
            <h3 className="mt-3 text-base font-bold text-ink-900">Security &amp; Data Protection</h3>
            <p className="mt-2 text-sm text-ink-500">
              Role-based access control, GPS-verified evidence, and tamper-evident
              logging are designed in from day one to protect the integrity of
              compliance data across every level of government.
            </p>
          </div>
        </div>
      </section>

      {/* Contact / footer */}
      <section id="contact" className="border-t border-ink-100 bg-ink-50/60 py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center lg:px-8">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600">
            <Building2 size={22} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-ink-900">Ready to see the platform in action?</h2>
          <p className="max-w-md text-sm text-ink-500">Log in with any demo role to explore the full monitoring, inspection and compliance workflow.</p>
          <Link to="/login" className="btn-primary !px-6 !py-3">Login to Platform <ArrowRight size={16} /></Link>
          <div className="mt-6 flex items-center gap-2 text-xs text-ink-400">
            <Users size={13} /> Need help? Reach the DoSJE PMU helpdesk at <span className="font-medium text-ink-600">helpdesk@dosje.gov.in (demo)</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-100 py-6 text-center text-xs text-ink-400">
        © 2026 Department of Social Justice & Empowerment — Frontend Prototype for Smart India Hackathon. All data shown is demo data.
      </footer>
    </div>
  )
}
