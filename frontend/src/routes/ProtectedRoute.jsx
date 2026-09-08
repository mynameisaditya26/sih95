import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppState } from '../hooks/useAppState'

// NOTE: This is a frontend-only simulation of route protection.
// There is no real authentication — it simply checks local demo state.
export default function ProtectedRoute({ children }) {
  const { user } = useAppState()
  if (!user) return <Navigate to="/login" replace />
  return children
}
