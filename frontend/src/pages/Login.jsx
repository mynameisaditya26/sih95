import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Loader2, Eye, EyeOff, ChevronDown, LogIn } from 'lucide-react'
import { useAppState } from '../hooks/useAppState'
import { useToast } from '../hooks/useToast'
import { ROLES } from '../data/mockData'

const ROLE_ROUTE = {
  'NGO / Institute': '/app/ngo-dashboard',
  'State Authority': '/app/regional-dashboard',
  'District Authority': '/app/regional-dashboard',
  'PMU / Inspector': '/app/inspector-dashboard',
}

export default function Login() {
  const [email, setEmail] = useState('admin.demo@dosje.gov.in')
  const [password, setPassword] = useState('••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState(ROLES[0])
  const [loading, setLoading] = useState(false)
  const { login } = useAppState()
  const { toast } = useToast()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login(role, roleToName(role))
      setLoading(false)
      toast(`Welcome back, logged in as ${role} (demo).`, 'success')
      navigate(ROLE_ROUTE[role] || '/app/dashboard')
    }, 1100)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-ink-950 p-10 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500"><Shield size={18} /></div>
          <span className="text-sm font-bold">DoSJE Smart Monitoring</span>
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold leading-tight">Mission control for<br />nationwide compliance.</h2>
          <p className="mt-3 max-w-sm text-sm text-ink-300">
            Monitor projects, run surprise inspections, and track compliance across every
            state and district — all from one secure platform.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[['2,480+', 'Projects'], ['28', 'States'], ['87%', 'Compliance']].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-bold text-brand-400">{v}</p>
                <p className="text-xs text-ink-400">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-ink-500">© 2026 Department of Social Justice & Empowerment. Frontend Prototype.</p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600"><Shield size={18} className="text-white" /></div>
            <span className="text-sm font-bold text-ink-900">DoSJE Smart Monitoring</span>
          </div>

          <h1 className="text-2xl font-bold text-ink-900">Sign in to your account</h1>
          <p className="mt-1.5 text-sm text-ink-500">This is a demo login — no real authentication is performed.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-600">Email / Username</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="input" placeholder="you@dosje.gov.in" required />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-600">Password</label>
              <div className="relative">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="input pr-10" placeholder="Enter password" required />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-600">Role</label>
              <div className="relative">
                <select value={role} onChange={(e) => setRole(e.target.value)} className="input appearance-none pr-9">
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-ink-500">
                <input type="checkbox" className="rounded border-ink-300" defaultChecked /> Remember me
              </label>
              <button type="button" onClick={() => toast('Password reset link sent (demo).', 'info')} className="font-medium text-brand-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full !py-2.5">
              {loading ? (<><Loader2 size={16} className="animate-spin" /> Signing in…</>) : (<><LogIn size={16} /> Login</>)}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-ink-400">
            Frontend-only demo. Any email/password combination will work.{' '}
            <Link to="/" className="font-medium text-brand-600 hover:underline">Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function roleToName(role) {
  const names = {
    'DoSJE Admin': 'Anita Desai',
    'Department Official': 'Karan Malhotra',
    'PMU / Inspector': 'Rahul Sharma',
    'NGO / Institute': 'Priya Verma',
    'State Authority': 'Suresh Nair',
    'District Authority': 'Kavita Rao',
  }
  return names[role] || 'Demo User'
}
