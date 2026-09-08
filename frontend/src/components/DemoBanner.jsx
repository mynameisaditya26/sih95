import React from 'react'
import { Info } from 'lucide-react'

export default function DemoBanner({ children }) {
  return (
    <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-800">
      <Info size={14} />
      {children}
    </div>
  )
}
