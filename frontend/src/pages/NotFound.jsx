import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-50 px-4 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <ShieldAlert size={30} />
      </div>
      <h1 className="mt-4 text-3xl font-bold text-ink-900">404 — Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-500">The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/" className="btn-primary mt-6">Back to Home</Link>
    </div>
  )
}
