import React from 'react'
import { Search } from 'lucide-react'

export default function SearchInput({ value, onChange, placeholder = 'Search…', className = '' }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-ink-400">
        <Search size={16} strokeWidth={2} />
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input w-full pl-10 pr-3"
      />
    </div>
  )
}