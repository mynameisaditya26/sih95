import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PageHeader({ title, description, breadcrumbs = [], actions }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between animate-fadein">
      <div>
        {breadcrumbs.length > 0 && (
          <div className="mb-1.5 flex items-center gap-1 text-xs text-ink-400">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1">
                {b.to ? <Link to={b.to} className="hover:text-brand-600">{b.label}</Link> : <span>{b.label}</span>}
                {i < breadcrumbs.length - 1 && <ChevronRight size={12} />}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-2xl font-bold text-ink-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-500 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
