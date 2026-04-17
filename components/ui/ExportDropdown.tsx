'use client';

/**
 * ExportDropdown — Export button with CSV/PDF options.
 * Shows "Export coming soon" hint toast for now.
 */

import { useState } from 'react';
import { useToastStore } from '@/store/toast';

export default function ExportDropdown() {
  const [open, setOpen] = useState(false);
  const { addToast } = useToastStore();

  const handleExport = (format: 'csv' | 'pdf') => {
    setOpen(false);
    addToast(`Exporting ${format.toUpperCase()}...`, 'info');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          inline-flex items-center gap-1.5 px-3 py-1.5
          text-xs font-medium text-gray-600 hover:text-gray-100
          border border-[var(--bdr, #E2DFD8)] hover:border-[var(--bdr, #E2DFD8)]
          rounded-lg transition-colors duration-150
          hover:bg-[var(--color-surface-2)]
        "
        title="Export judge data"
      >
        <span>↓</span>
        Export
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-[#FFFFFF] border border-[var(--bdr, #E2DFD8)] rounded-lg shadow-lg z-10">
          <button
            onClick={() => handleExport('csv')}
            className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-300 hover:bg-[var(--color-surface-2)] border-b border-[var(--bdr, #E2DFD8)]"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-300 hover:bg-[var(--color-surface-2)]"
          >
            Export PDF
          </button>
        </div>
      )}
    </div>
  );
}
