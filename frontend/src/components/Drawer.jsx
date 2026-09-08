import React from 'react'
import { X } from 'lucide-react'

export default function Drawer({ open, onClose, title, children, width = 'max-w-md' }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm animate-fadein" onClick={onClose} />
      <div className={`relative w-full ${width} h-full bg-white shadow-pop animate-slidein flex flex-col`}>
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h3 className="text-base font-semibold text-ink-900">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
