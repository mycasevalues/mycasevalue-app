'use client';

/**
 * GetStartedBar.tsx — Homepage "Get Started" shortcuts bar
 *
 * Equivalent to Westlaw's Get Started bar.
 * Height: 42px, bg var(--surf), horizontal scroll
 * Shortcut pills with hover effect + gear icon
 */

import React from 'react';

const DEFAULT_SHORTCUTS = [
  'Court Records',
  'Judge Profiles',
  'District Analytics',
  'Settlement Data',
  'CaseCite™',
  'Research Organizer',
  'Folders',
  'Case Alerts',
  'Practical Guidance',
];

interface GetStartedBarProps {
  shortcuts?: string[];
}

/* ── Gear icon ── */
function GearIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.8 1h2.4l.3 1.8.9.4 1.5-1 1.7 1.7-1 1.5.4.9 1.8.3v2.4l-1.8.3-.4.9 1 1.5-1.7 1.7-1.5-1-.9.4L9.2 15H6.8l-.3-1.8-.9-.4-1.5 1-1.7-1.7 1-1.5-.4-.9L1.2 9.2V6.8l1.8-.3.4-.9-1-1.5 1.7-1.7 1.5 1 .9-.4L6.8 1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function GetStartedBar({ shortcuts = DEFAULT_SHORTCUTS }: GetStartedBarProps) {
  return (
    <div
      style={{
        height: 42,
        background: 'var(--surf, #F6F5F2)',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid var(--bdr, #E2DFD8)',
        borderBottom: '1px solid var(--bdr, #E2DFD8)',
        padding: '0 18px',
        gap: 6,
        overflowX: 'auto',
        /* Hidden scrollbar */
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: 11,
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          color: 'var(--text3, #78766C)',
          marginRight: 2,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Get Started:
      </span>

      {/* Shortcut pills */}
      {shortcuts.map((label) => (
        <button
          key={label}
          type="button"
          style={{
            height: 26,
            padding: '0 10px',
            border: '1px solid var(--bdr-strong, #C8C4B8)',
            borderRadius: 2,
            background: '#FFFFFF',
            fontSize: 11,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text2, #42403C)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'border-color 0.15s ease, color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--link, #0A50A2)';
            e.currentTarget.style.color = 'var(--link, #0A50A2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--bdr-strong, #C8C4B8)';
            e.currentTarget.style.color = 'var(--text2, #42403C)';
          }}
        >
          {label}
        </button>
      ))}

      {/* Gear icon (rightmost) */}
      <button
        type="button"
        aria-label="Customize shortcuts"
        style={{
          width: 26,
          height: 26,
          border: '1px solid var(--bdr-strong, #C8C4B8)',
          borderRadius: 2,
          background: '#FFFFFF',
          color: 'var(--text3, #78766C)',
          fontSize: 12,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
          flexShrink: 0,
        }}
      >
        <GearIcon />
      </button>
    </div>
  );
}
