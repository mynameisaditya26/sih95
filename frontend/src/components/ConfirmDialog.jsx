import React from 'react'
import Modal from './Modal'
import { AlertTriangle } from 'lucide-react'

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Are you sure?', description, confirmLabel = 'Confirm', danger = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm" footer={
      <>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className={danger ? 'btn-danger' : 'btn-primary'} onClick={() => { onConfirm(); onClose() }}>{confirmLabel}</button>
      </>
    }>
      <div className="flex gap-3">
        <div className={`rounded-full p-2 h-fit ${danger ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
          <AlertTriangle size={18} />
        </div>
        <p className="text-sm text-ink-600">{description}</p>
      </div>
    </Modal>
  )
}
