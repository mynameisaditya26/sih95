import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="flex items-center justify-between border-t border-ink-100 px-4 py-3 text-sm text-ink-500">
      <p>Showing <span className="font-medium text-ink-700">{start}-{end}</span> of <span className="font-medium text-ink-700">{total}</span></p>
      <div className="flex items-center gap-1">
        <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="btn-secondary !px-2 !py-1.5 disabled:opacity-40">
          <ChevronLeft size={14} />
        </button>
        <span className="px-2 text-xs font-medium text-ink-600">Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="btn-secondary !px-2 !py-1.5 disabled:opacity-40">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
