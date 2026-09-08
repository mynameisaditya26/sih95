import React, { useMemo, useState } from 'react'
import { Bell, Filter, CheckCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { NOTIFICATIONS } from '../data/mockData'
import { useToast } from '../hooks/useToast'

export default function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS)
  const [filter, setFilter] = useState('All')
  const [priority, setPriority] = useState('All')
  const { toast } = useToast()

  const list = useMemo(() => items.filter((n) =>
    (filter === 'All' || (filter === 'Unread' ? !n.read : n.read)) &&
    (priority === 'All' || n.priority === priority)
  ), [items, filter, priority])

  function toggleRead(id) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)))
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
    toast('All notifications marked as read.', 'success')
  }

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Stay on top of high-risk alerts, anomalies and pending action items."
        actions={<button onClick={markAllRead} className="btn-secondary"><CheckCheck size={15} /> Mark all as read</button>}
      />

      <div className="card p-4 mb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter size={14} className="text-ink-400" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option><option>Unread</option><option value="Read">Read</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input !w-auto !py-1.5 text-xs">
            <option>All</option><option>High</option><option>Medium</option><option>Low</option>
          </select>
          <p className="ml-auto text-ink-400">{list.length} notifications</p>
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up — nothing matches the current filters." />
      ) : (
        <div className="card divide-y divide-ink-50">
          {list.map((n) => (
            <div key={n.id} onClick={() => toggleRead(n.id)} className="flex cursor-pointer items-start gap-3 px-4 py-3.5 hover:bg-ink-50">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-ink-200' : n.priority === 'High' ? 'bg-red-500' : n.priority === 'Medium' ? 'bg-amber-500' : 'bg-brand-400'}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm ${n.read ? 'text-ink-500' : 'font-semibold text-ink-900'}`}>{n.type}</p>
                  <span className="shrink-0 text-xs text-ink-400">{n.time}</span>
                </div>
                <p className="text-xs text-ink-500">{n.message}</p>
              </div>
              <span className={`badge shrink-0 ${n.priority === 'High' ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200' : n.priority === 'Medium' ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200' : 'bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200'}`}>{n.priority}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
