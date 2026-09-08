import React, { createContext, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'

const AppContext = createContext(null)

const DEFAULT_USER = null

// Map backend roles → frontend display roles
const ROLE_MAP = {
  ADMIN: 'DoSJE Admin',
  INSPECTOR: 'PMU / Inspector',
  INSTITUTION: 'NGO / Institute',
}

export function AppProvider({ children }) {
  const [user, setUser] = useLocalStorage('dosje_user', DEFAULT_USER)

  function login(userData) {
    // userData comes from backend: { _id, name, email, role, token }
    const mappedRole = ROLE_MAP[userData.role] || userData.role

    setUser({
      id: userData._id,
      name: userData.name,
      email: userData.email,
      role: mappedRole,
      backendRole: userData.role,
      loggedInAt: new Date().toISOString(),
    })

    if (userData.token) {
      localStorage.setItem('token', userData.token)
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppState must be used within AppProvider')
  return ctx
}