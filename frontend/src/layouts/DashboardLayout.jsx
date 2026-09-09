import React, { useState, useMemo } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FolderKanban, Map, Video, PhoneCall, ClipboardList, Shuffle,
  Users2, BarChart3, ShieldAlert, ShieldCheck, FileText, Bell, UserCog, ScrollText,
  Settings, HelpCircle, Menu, ChevronLeft, Search, LogOut, ChevronDown, Shield,
} from 'lucide-react'
import { useAppState } from '../hooks/useAppState'
import { initials } from '../utils/format'
import { NOTIFICATIONS } from '../data/mockData'

const NAV = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/projects', label: 'Projects', icon: FolderKanban },
  { to: '/app/live-map', label: 'Live Map', icon: Map },
  { to: '/app/cctv', label: 'CCTV Monitoring', icon: Video },
  { to: '/app/surprise-vc', label: 'Surprise VC', icon: PhoneCall },
  { to: '/app/inspections', label: 'Inspections', icon: ClipboardList },
  { to: '/app/random-assignment', label: 'Random Assignment', icon: Shuffle },
  { to: '/app/attendance', label: 'Attendance', icon: Users2 },
  { to: '/app/ai-anomalies', label: 'AI Anomalies', icon: ShieldAlert },
  { to: '/app/risk-management', label: 'Risk Management', icon: ShieldAlert },
  { to: '/app/compliance', label: 'Compliance', icon: ShieldCheck },
  { to: '/app/reports', label: 'Reports', icon: FileText },
  { to: '/app/notifications', label: 'Notifications', icon: Bell },
  { to: '/app/users', label: 'Users', icon: UserCog },
  { to: '/app/audit-logs', label: 'Audit Logs', icon: ScrollText },
  { to: '/app/settings', label: 'Settings', icon: Settings },
  { to: '/app/help', label: 'Help', icon: HelpCircle },
]

const ROLE_HOME = {
  'NGO / Institute': '/app/ngo-dashboard',
  'State Authority': '/app/regional-dashboard',
  'District Authority': '/app/regional-dashboard',
  'PMU / Inspector': '/app/inspector-dashboard',
}

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const { user, logout } = useAppState()
  const navigate = useNavigate()
  const unread = useMemo(() => NOTIFICATIONS.filter((n) => !n.read).length, [])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen w-full bg-ink-50 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-ink-950/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static z-50 h-full bg-ink-950 text-ink-100 flex flex-col transition-all duration-200
        ${collapsed ? 'lg:w-[76px]' : 'lg:w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64
      `}>
        <div className="flex items-center gap-2 px-4 h-16 border-b border-white/10 shrink-0">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500">
            <Shield size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold leading-tight truncate">DoSJE Monitor</p>
              <p className="text-[10px] text-ink-400 truncate">Smart Compliance System</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={item.label}
              className={({ isActive }) => `
                group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                ${isActive ? 'bg-brand-600 text-white' : 'text-ink-300 hover:bg-white/5 hover:text-white'}
                ${collapsed ? 'justify-center' : ''}
              `}
              onClick={() => setMobileOpen(false)}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-2">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden lg:flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-ink-300 hover:bg-white/5 hover:text-white"
          >
            <ChevronLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            {!collapsed && 'Collapse'}
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top nav */}
        <header className="h-16 shrink-0 bg-white border-b border-ink-100 flex items-center gap-3 px-4 lg:px-6">
          <button className="lg:hidden text-ink-500" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>

          {/* ===== FIXED SEARCH BAR ===== */}
          <div className="hidden md:flex relative flex-1 max-w-md items-center">
            <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-ink-400">
              <Search size={16} strokeWidth={2} />
            </span>
            <input
              placeholder="Search projects, inspections, inspectors…"
              className="input w-full pl-10 pr-3 bg-ink-50 border-transparent focus:bg-white"
            />
          </div>
          {/* ===== END FIXED SEARCH BAR ===== */}

          <div className="flex-1 md:hidden" />

          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <button onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false) }} className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-100">
                <Bell size={19} />
                {unread > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-pop border border-ink-100 p-2 animate-fadein z-50">
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <p className="text-xs font-semibold text-ink-500 uppercase">Notifications</p>
                    <NavLink to="/app/notifications" onClick={() => setNotifOpen(false)} className="text-xs font-medium text-brand-600 hover:underline">View all</NavLink>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {NOTIFICATIONS.slice(0, 5).map((n) => (
                      <div key={n.id} className="flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-ink-50">
                        <span className={`mt-1 h-1.5 w-1.5 rounded-full ${n.read ? 'bg-ink-200' : 'bg-brand-500'}`} />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-ink-800 truncate">{n.type}</p>
                          <p className="text-[11px] text-ink-500 truncate">{n.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false) }} className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-ink-100">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {initials(user?.name || 'Demo User')}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-ink-800 leading-tight">{user?.name || 'Demo User'}</p>
                  <p className="text-[10px] text-ink-400 leading-tight">{user?.role || 'DoSJE Admin'}</p>
                </div>
                <ChevronDown size={14} className="text-ink-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-pop border border-ink-100 p-1.5 animate-fadein z-50">
                  <NavLink to="/app/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-ink-50">
                    <Settings size={15} /> Settings
                  </NavLink>
                  <NavLink to="/app/help" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-ink-50">
                    <HelpCircle size={15} /> Help & Support
                  </NavLink>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}