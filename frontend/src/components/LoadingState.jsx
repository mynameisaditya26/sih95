import React from 'react'
import { Loader2 } from 'lucide-react'

export function LoadingState({ label = 'Loading data…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-ink-400">
      <Loader2 size={24} className="animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  )
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulseSlow rounded-md bg-ink-100 ${className}`} />
}
