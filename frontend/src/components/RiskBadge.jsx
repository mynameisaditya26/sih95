import React from 'react'
import { riskColor } from '../utils/format'

export default function RiskBadge({ risk }) {
  const c = riskColor(risk)
  return (
    <span className={`badge ring-1 ring-inset ${c.text} ${c.bg} ${c.ring}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {risk} RISK
    </span>
  )
}
