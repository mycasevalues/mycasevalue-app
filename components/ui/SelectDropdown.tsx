'use client';

/* EXTRACTED from MyCaseValue.tsx — Select dropdown with bilingual support and ARIA */

import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  id: string;
  label: string;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  dark?: boolean;
  lang?: string;
  labelledBy?: string;
}

export function Select({ value, options, onChange, placeholder, dark = false, lang = 'en', labelledBy }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = options.find(o => o.id === value);
  const showSearch = options.length > 6;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setSearch(''); } };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open && showSearch && searchRef.current) searchRef.current.focus();
  }, [open, showSearch]);

  const filtered = search ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase())) : options;

  return (
    <div ref={ref} className="relative">
      <button type="button"
        onClick={() => { setOpen(!open); setSearch(''); }}
        aria-expanded={open}
        aria-haspopup="listbox"
        {...(labelledBy ? { 'aria-labelledby': labelledBy } : {})}
        className="w-full px-4 py-3.5 text-[15px] font-medium border-[1.5px] rounded-xl cursor-pointer text-left flex justify-between items-center transition-all duration-200"
        style={{
          borderColor: open ? '#111111' : 'var(--border-muted)',
          color: selected ? '#111827' : '#6B7280',
          background: '#FFFFFF',
          boxShadow: open ? '0 0 0 3px rgba(17,17,17,0.12)' : 'none',
        }}>
        <span className="truncate">{selected ? selected.label : placeholder || 'Select...'}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#111111' : '#9CA3AF'} strokeWidth="2.5" strokeLinecap="round"
          aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.2s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        role="listbox"
        className="absolute top-full mt-1.5 left-0 right-0 rounded-xl z-[var(--z-raised)] overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: open ? '1px solid var(--border-muted)' : '1px solid transparent',
          boxShadow: open ? '0 12px 40px rgba(0,0,0,.12)' : 'none',
          maxHeight: open ? '280px' : '0',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.98)',
          transition: 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}>
        {showSearch && (
          <div className="px-2 pt-2 pb-1">
            <input ref={searchRef} type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'es' ? 'Buscar...' : 'Search...'}
              aria-label={lang === 'es' ? 'Buscar tipos de caso' : 'Search case types'}
              className="w-full px-3 py-2 text-[13px] rounded-lg outline-none focus:ring-2 focus:ring-[#111111]/40 transition-colors"
              style={{
                background: '#F9FAFB',
                border: '1px solid var(--border-muted)',
                color: '#111827',
              }} />
          </div>
        )}
        <div className="overflow-y-auto p-1" style={{ maxHeight: showSearch ? '220px' : '260px' }}>
          {filtered.map((o, idx) => (
            <button type="button" key={o.id}
              role="option"
              aria-selected={o.id === value}
              onClick={() => { onChange(o.id); setOpen(false); setSearch(''); }}
              className="w-full px-4 py-2.5 text-sm text-left rounded-lg cursor-pointer transition-all duration-150"
              style={{
                fontWeight: o.id === value ? 600 : 400,
                color: o.id === value ? '#111111' : '#374151',
                background: o.id === value ? 'rgba(17,17,17,0.08)' : 'transparent',
                animationDelay: open ? `${idx * 20}ms` : '0ms',
              }}
              onMouseEnter={e => { if (o.id !== value) e.currentTarget.style.background = '#F2F0EC'; }}
              onMouseLeave={e => { if (o.id !== value) e.currentTarget.style.background = 'transparent'; }}>
              <span className="flex items-center gap-2">
                {o.id === value && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                )}
                {o.label}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-[#6B7280] text-center">{lang === 'es' ? 'Sin resultados' : 'No results'}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Select;
