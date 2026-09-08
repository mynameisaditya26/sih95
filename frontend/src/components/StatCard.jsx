import React from 'react'

export default function StatCard({ label, value, icon: Icon, trend, trendUp, tone = 'brand' }) {
  const toneMap = {
    brand: 'bg-brand-50 text-brand-600',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    ink: 'bg-ink-100 text-ink-600',
  }
  return (
    <div className="card p-4 hover:shadow-pop transition-shadow animate-fadein">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-ink-900">{value}</p>
        </div>
        {Icon && (
          <div className={`rounded-lg p-2 ${toneMap[tone]}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
      {trend && (
        <p className={`mt-2 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend}
        </p>
      )}
    </div>
  )
}
