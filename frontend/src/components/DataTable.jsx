import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function DataTable({ columns, data, sortKey, sortDir, onSort, rowKey = 'id', onRowClick, emptyMessage = 'No records found.' }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 whitespace-nowrap ${col.sortable ? 'cursor-pointer select-none hover:text-ink-800' : ''}`}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-ink-400">{emptyMessage}</td>
            </tr>
          )}
          {data.map((row) => (
            <tr
              key={row[rowKey]}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-ink-50 last:border-0 ${onRowClick ? 'cursor-pointer hover:bg-brand-50/40' : ''} transition-colors`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-middle whitespace-nowrap">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
