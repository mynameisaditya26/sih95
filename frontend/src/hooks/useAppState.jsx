import React, { createContext, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'

const AppContext = createContext(null)

const DEFAULT_USER = null

export function AppProvider({ children }) {
  const [user, setUser] = useLocalStorage('dosje_user', DEFAULT_USER)
  const [notifState, setNotifState] = useLocalStorage('dosje_notif_reads', {})

  function login(role, name) {
    setUser({ role, name: name || 'Demo User', loggedInAt: new Date().toISOString() })
  }
  function logout() {
    setUser(null)
  }

  return (
    <AppContext.Provider value={{ user, login, logout, notifState, setNotifState }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppState must be used within AppProvider')
  return ctx
}
