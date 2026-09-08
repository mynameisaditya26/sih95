import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Loader2, Eye, EyeOff, LogIn } from 'lucide-react'
import { useAppState } from '../hooks/useAppState'
import { useToast } from '../hooks/useToast'
import api from '../services/api'

const ROLE_ROUTE = {
  'DoSJE Admin': '/app/dashboard',
  'PMU / Inspector': '/app/inspector-dashboard',
  'NGO / Institute': '/app/ngo-dashboard',
  ADMIN: '/app/dashboard',
  INSPECTOR: '/app/inspector-dashboard',
  INSTITUTION: '/app/ngo-dashboard',
}

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAppState()
  const { toast } = useToast()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post('/auth/login', { email, password })
      const userData = res.data

      login(userData)

      toast(`Welcome back, ${userData.name}!`, 'success')

      const route =
        ROLE_ROUTE[userData.role] ||
        ROLE_ROUTE[userData.role?.toUpperCase()] ||
        '/app/dashboard'

      navigate(route)
    } catch (err) {
      const message =
        err.response?.data?.message || 'Invalid email or password'
      toast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-ink-950 p-10 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500">
            <Shield size={18} />
          </div>
          <span className="text-sm font-bold">DoSJE Smart Monitoring</span>
        </Link>

        <div>
          <h2 className="text-3xl font-extrabold leading-tight">
            Mission control for
            <br />
            nationwide compliance.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-ink-300">
            Monitor projects, run surprise inspections, and track compliance
            across every state and district — all from one secure platform.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ['2,480+', 'Projects'],
              ['28', 'States'],
              ['87%', 'Compliance'],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-bold text-brand-400">{v}</p>
                <p className="text-xs text-ink-400">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-ink-500">
          © 2026 Department of Social Justice & Empowerment
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white">
                <Shield size={18} />
              </div>
              <span className="text-sm font-bold text-ink-900">
                DoSJE Smart Monitoring
              </span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-ink-900">Sign in</h1>
          <p className="mt-1 text-sm text-ink-500">
            Enter your credentials to access the platform
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-600">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-600">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-ink-500">
                <input
                  type="checkbox"
                  className="rounded border-ink-300"
                  defaultChecked
                />
                Remember me
              </label>
              <button
                type="button"
                className="font-medium text-brand-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-2.5"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Signing in…
                </>
              ) : (
                <>
                  <LogIn size={16} /> Login
                </>
              )}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-ink-200 bg-ink-50 p-3 text-xs text-ink-600">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Admin → admin@example.com / admin123</p>
            <p>Inspector → inspector1@example.com / inspector123</p>
            <p>Institution → institution@example.com / institution123</p>
          </div>

          <p className="mt-6 text-center text-xs text-ink-400">
            <Link to="/" className="font-medium text-brand-600 hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}