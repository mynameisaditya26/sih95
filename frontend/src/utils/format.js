export function riskColor(risk) {
  switch ((risk || '').toUpperCase()) {
    case 'HIGH': return { text: 'text-red-700', bg: 'bg-red-50', ring: 'ring-red-200', dot: 'bg-red-500', solid: 'bg-red-600' }
    case 'MEDIUM': return { text: 'text-amber-700', bg: 'bg-amber-50', ring: 'ring-amber-200', dot: 'bg-amber-500', solid: 'bg-amber-500' }
    default: return { text: 'text-emerald-700', bg: 'bg-emerald-50', ring: 'ring-emerald-200', dot: 'bg-emerald-500', solid: 'bg-emerald-600' }
  }
}

export function statusColor(status) {
  const map = {
    Active: 'text-emerald-700 bg-emerald-50 ring-emerald-200',
    'Under Review': 'text-amber-700 bg-amber-50 ring-amber-200',
    Suspended: 'text-red-700 bg-red-50 ring-red-200',
    Closed: 'text-ink-500 bg-ink-100 ring-ink-200',
    Completed: 'text-emerald-700 bg-emerald-50 ring-emerald-200',
    Pending: 'text-amber-700 bg-amber-50 ring-amber-200',
    'In Progress': 'text-brand-700 bg-brand-50 ring-brand-200',
    Overdue: 'text-red-700 bg-red-50 ring-red-200',
    ONLINE: 'text-emerald-700 bg-emerald-50 ring-emerald-200',
    OFFLINE: 'text-red-700 bg-red-50 ring-red-200',
    Approved: 'text-emerald-700 bg-emerald-50 ring-emerald-200',
    'Pending Approval': 'text-amber-700 bg-amber-50 ring-amber-200',
    Rejected: 'text-red-700 bg-red-50 ring-red-200',
    Success: 'text-emerald-700 bg-emerald-50 ring-emerald-200',
    Failed: 'text-red-700 bg-red-50 ring-red-200',
    Disabled: 'text-ink-500 bg-ink-100 ring-ink-200',
  }
  return map[status] || 'text-ink-600 bg-ink-100 ring-ink-200'
}

export function initials(name = '') {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}
