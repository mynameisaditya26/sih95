import React, { useState } from 'react'
import { ChevronDown, BookOpen, MessageCircle, Bug, Info, Mail } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { FAQS } from '../data/mockData'
import { useToast } from '../hooks/useToast'

export default function HelpSupport() {
  const [openIdx, setOpenIdx] = useState(0)
  const [form, setForm] = useState({ subject: '', message: '' })
  const { toast } = useToast()

  function submitTicket(e) {
    e.preventDefault()
    toast('Support request submitted (demo) — our team will respond shortly.', 'success')
    setForm({ subject: '', message: '' })
  }

  return (
    <div>
      <PageHeader title="Help & Support" description="Guides, FAQs and support contacts for the DoSJE Smart Monitoring platform." />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <p className="section-title mb-3 flex items-center gap-1.5"><BookOpen size={13} /> Frequently Asked Questions</p>
          <div className="divide-y divide-ink-50">
            {FAQS.map((f, i) => (
              <div key={i}>
                <button onClick={() => setOpenIdx(openIdx === i ? -1 : i)} className="flex w-full items-center justify-between py-3 text-left">
                  <span className="text-sm font-medium text-ink-800">{f.q}</span>
                  <ChevronDown size={16} className={`text-ink-400 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
                </button>
                {openIdx === i && <p className="pb-3 text-sm text-ink-500">{f.a}</p>}
              </div>
            ))}
          </div>

          <p className="section-title mt-6 mb-3 flex items-center gap-1.5"><Bug size={13} /> Report an Issue</p>
          <form onSubmit={submitTicket} className="space-y-3">
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" placeholder="Subject" required />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input" rows={4} placeholder="Describe the issue…" required />
            <button type="submit" className="btn-primary">Submit Ticket</button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <p className="section-title mb-3 flex items-center gap-1.5"><MessageCircle size={13} /> Contact Support</p>
            <p className="text-sm text-ink-600">DoSJE PMU Helpdesk</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-700"><Mail size={13} /> helpdesk@dosje.gov.in</p>
            <p className="text-xs text-ink-400">Mon–Sat, 9:30 AM – 6:00 PM IST (demo contact)</p>
          </div>
          <div className="card p-5">
            <p className="section-title mb-3">User Guide</p>
            <ul className="space-y-1.5 text-sm text-brand-700">
              {['Getting Started Guide.pdf', 'Inspector Field Manual.pdf', 'Admin Configuration Guide.pdf'].map((d) => (
                <li key={d} className="hover:underline cursor-pointer">{d}</li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <p className="section-title mb-3 flex items-center gap-1.5"><Info size={13} /> System Information</p>
            <dl className="space-y-1.5 text-xs text-ink-500">
              <div className="flex justify-between"><dt>Version</dt><dd className="font-medium text-ink-700">Prototype v1.0.0</dd></div>
              <div className="flex justify-between"><dt>Environment</dt><dd className="font-medium text-ink-700">Frontend Demo</dd></div>
              <div className="flex justify-between"><dt>Build</dt><dd className="font-medium text-ink-700">SIH 2026</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
