'use client';

import React from 'react';

interface AnnouncementBarProps {
  lang?: 'en' | 'es';
  totalCases?: number;
}

export default function AnnouncementBar({ lang = 'en', totalCases = 4200000 }: AnnouncementBarProps) {
  const caseCount = (totalCases / 1000000).toFixed(1);

  return (
    <div
      className="relative overflow-hidden no-print"
      style={{
        background: 'linear-gradient(90deg, rgba(79,70,229,0.12) 0%, rgba(13,148,136,0.08) 50%, rgba(79,70,229,0.12) 100%)',
        borderBottom: '1px solid rgba(79,70,229,0.15)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
        {/* Live dot */}
        <span
          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
          style={{
            background: '#10B981',
            boxShadow: '0 0 6px rgba(16,185,129,0.6)',
            animation: 'livePulse 2s ease-in-out infinite',
          }}
          aria-hidden="true"
        />

        <span className="text-[11px] sm:text-[12px]" style={{ color: 'var(--fg-secondary)' }}>
          {lang === 'es' ? (
            <>
              <span style={{ fontWeight: 600, color: 'var(--fg-primary)' }}>{caseCount}M+</span>
              {' '}resultados de tribunales federales indexados
              <span className="hidden sm:inline"> · </span>
              <span className="hidden sm:inline" style={{ color: 'var(--accent-primary, #6366F1)' }}>
                Actualizado en tiempo real desde PACER
              </span>
            </>
          ) : (
            <>
              <span style={{ fontWeight: 600, color: 'var(--fg-primary)' }}>{caseCount}M+</span>
              {' '}federal court outcomes indexed
              <span className="hidden sm:inline"> · </span>
              <span className="hidden sm:inline" style={{ color: 'var(--accent-primary, #6366F1)' }}>
                Updated in real-time from PACER
              </span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
