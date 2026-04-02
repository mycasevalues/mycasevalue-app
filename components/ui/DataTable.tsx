'use client';

import React, { useState, useMemo } from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  emptyMessage?: string;
  striped?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  caption?: string;
  className?: string;
  onRowClick?: (row: T) => void;
}

type SortDir = 'asc' | 'desc' | null;

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No data available',
  striped = true,
  compact = false,
  stickyHeader = false,
  caption,
  className = '',
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = typeof aVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal));
      return sortDir === 'desc' ? -cmp : cmp;
    });
  }, [data, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className={`mcv-table-wrap ${className}`}>
      <table className={`mcv-table ${compact ? 'mcv-table--compact' : ''} ${striped ? 'mcv-table--striped' : ''}`}>
        {caption && <caption className="mcv-table__caption">{caption}</caption>}
        <thead className={stickyHeader ? 'mcv-table__thead--sticky' : ''}>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className={`mcv-table__th ${col.align ? `text-${col.align}` : 'text-left'}`}
                style={col.width ? { width: col.width } : undefined}
                aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    className="mcv-table__sort-btn"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.header}
                    <span className="mcv-table__sort-icon" aria-hidden="true">
                      {sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="mcv-table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, idx) => (
              <tr
                key={keyExtractor(row, idx)}
                className={`mcv-table__row ${onRowClick ? 'mcv-table__row--clickable' : ''}`}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={onRowClick ? (e) => {
                  if (e.key === 'Enter') onRowClick(row);
                } : undefined}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={`mcv-table__td ${col.align ? `text-${col.align}` : ''}`}
                  >
                    {col.render ? col.render(row, idx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
