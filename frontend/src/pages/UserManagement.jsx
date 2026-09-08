import React, { useMemo, useState } from 'react'
import { Plus, Eye, Pencil, Ban, KeyRound } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SearchInput from '../components/SearchInput'
import DataTable from '../components/DataTable'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { USERS, ROLES, STATES } from '../data/mockData'
import { useToast } from '../hooks/useToast'

export default function UserManagement() {
  const [users, setUsers] = useState(USERS)
  const [query, setQuery] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [confirmDisable, setConfirmDisable] = useState(null)
  const [newUser, setNewUser] = useState({ name: '', role: ROLES[0], state: STATES[0].state })
  const { toast } = useToast()

  const filtered = useMemo(() => users.filter((u) => {
    const q = query.toLowerCase()
    return !q || u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)
  }), [users, query])

  function toggleStatus(id) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u)))
  }

  function addUser() {
    if (!newUser.name.trim()) { toast('Please enter a name.', 'warning'); return }
    setUsers((prev) => [{ id: `USR-${Math.floor(Math.random() * 900 + 100)}`, name: newUser.name, role: newUser.role, department: 'PMU', state: newUser.state, district: STATES.find(s=>s.state===newUser.state)?.districts[0], status: 'Active', lastActive: 'Just now' }, ...prev])
    setAddOpen(false)
    setNewUser({ name: '', role: ROLES[0], state: STATES[0].state })
    toast('User added successfully (demo).', 'success')
  }

  const columns = [
    { key: 'name', label: 'Name', render: (r) => <span className="font-medium text-ink-800">{r.name}</span> },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { key: 'state', label: 'State' },
    { key: 'district', label: 'District' },
    { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> },
    { key: 'lastActive', label: 'Last Active' },
    { key: 'actions', label: 'Actions', render: (r) => (
      <div className="flex items-center gap-1">
        <button className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600" title="View"><Eye size={14} /></button>
        <button className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600" title="Edit"><Pencil size={14} /></button>
        <button onClick={() => toast(`Password reset link sent to ${r.name} (demo).`, 'info')} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600" title="Reset Password"><KeyRound size={14} /></button>
        <button onClick={() => setConfirmDisable(r)} className="rounded-md p-1.5 text-ink-400 hover:bg-red-50 hover:text-red-600" title="Disable"><Ban size={14} /></button>
      </div>
    ) },
  ]

  return (
    <div>
      <PageHeader title="User Management" description="Manage platform users, roles and access across every department and region." actions={
        <button onClick={() => setAddOpen(true)} className="btn-primary"><Plus size={15} /> Add User</button>
      } />

      <div className="card p-4 mb-4">
        <SearchInput value={query} onChange={setQuery} placeholder="Search by name or role…" className="lg:w-80" />
      </div>

      <div className="card p-4">
        <DataTable columns={columns} data={filtered} />
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add User" footer={
        <><button className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button><button className="btn-primary" onClick={addUser}>Add User</button></>
      }>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-600">Full Name</label>
            <input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="input" placeholder="e.g. Anjali Mehta" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-600">Role</label>
            <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="input">
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-600">State</label>
            <select value={newUser.state} onChange={(e) => setNewUser({ ...newUser, state: e.target.value })} className="input">
              {STATES.map((s) => <option key={s.state}>{s.state}</option>)}
            </select>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!confirmDisable}
        onClose={() => setConfirmDisable(null)}
        onConfirm={() => { toggleStatus(confirmDisable.id); toast(`${confirmDisable.name}'s access updated.`, 'success') }}
        title="Disable this user?"
        description={confirmDisable ? `${confirmDisable.name} will lose access to the platform until re-enabled.` : ''}
        confirmLabel="Disable User"
        danger
      />
    </div>
  )
}
