'use client';

/**
 * ResearchOrganizer.tsx — Right-panel outline builder
 *
 * Equivalent to Westlaw Outline Builder.
 * Container: bg var(--sidebar2), border var(--bdr), radius 2px
 * Button: full-width, var(--link-light) bg, var(--link) text
 */

import React from 'react';

interface ResearchOrganizerProps {
  itemCount?: number;
}

/* ── Document icon (11px) ── */
function DocIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="1"
        width="10"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <line x1="4.5" y1="4" x2="9.5" y2="4" stroke="currentColor" strokeWidth="1" />
      <line x1="4.5" y1="6.5" x2="9.5" y2="6.5" stroke="currentColor" strokeWidth="1" />
      <line x1="4.5" y1="9" x2="7.5" y2="9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function ResearchOrganizer({ itemCount }: ResearchOrganizerProps) {
  return (
    <div
      style={{
        background: 'var(--sidebar2, #F7F8FA)',
        border: '1px solid var(--bdr, #E5E7EB)',
        borderRadius: 2,
        padding: 8,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: 'var(--text3, #4A4940)',
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          marginBottom: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        RESEARCH ORGANIZER
        {typeof itemCount === 'number' && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--card, #FFFFFF)',
              background: 'var(--link, #1A73E8)',
              borderRadius: 4,
              padding: '1px 5px',
              lineHeight: '14px',
            }}
          >
            {itemCount}
          </span>
        )}
      </div>

      {/* Note text */}
      <p
        style={{
          fontSize: 12,
          fontFamily: 'var(--font-ui)',
          color: 'var(--text3, #4A4940)',
          lineHeight: 1.5,
          margin: '0 0 7px 0',
        }}
      >
        Drag text from this profile into your outline. Export to Word when ready.
      </p>

      {/* CTA Button */}
      <button
        type="button"
        style={{
          width: '100%',
          height: 29,
          border: '1px solid var(--link, #1A73E8)',
          background: 'var(--link-light, #EAF1FB)',
          color: 'var(--link, #1A73E8)',
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'var(--font-ui)',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          cursor: 'pointer',
        }}
      >
        <DocIcon />
        Open Research Organizer
      </button>
    </div>
  );
}
