import React from 'react'
import { statusColor } from '../utils/format'

export default function Badge({ children, status, className = '' }) {
  return (
    <span className={`badge ring-1 ring-inset ${statusColor(status || children)} ${className}`}>
      {children}
    </span>
  )
}
