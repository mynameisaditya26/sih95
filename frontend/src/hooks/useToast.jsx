import React, { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}
const STYLES = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-brand-200 bg-brand-50 text-brand-800',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const toast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => dismiss(id), duration)
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || Info
          return (
            <div key={t.id} className={`animate-slidein flex items-start gap-3 rounded-lg border shadow-pop px-4 py-3 ${STYLES[t.type] || STYLES.info}`}>
              <Icon size={18} className="mt-0.5 shrink-0" />
              <p className="text-sm font-medium flex-1">{t.message}</p>
              <button onClick={() => dismiss(t.id)} className="shrink-0 opacity-60 hover:opacity-100">
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
