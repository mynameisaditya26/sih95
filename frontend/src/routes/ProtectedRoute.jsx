import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppState } from '../hooks/useAppState'

export default function ProtectedRoute({ children }) {
  const { user } = useAppState()
  const token = localStorage.getItem('token')

  if (!user || !token) {
    return <Navigate to="/login" replace />
  }

  return children
}