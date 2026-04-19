'use client';

/**
 * GetStartedBar.tsx — Homepage "Get Started" shortcuts bar
 *
 * Equivalent to Westlaw's Get Started bar.
 * Height: 42px, bg var(--surf), horizontal scroll
 * Shortcut pills with hover effect + gear icon
 */

import React from 'react';
import { useRouter } from 'next/navigation';

const DEFAULT_SHORTCUTS: { label: string; href: string }[] = [
  { label: 'Court Records', href: '/cases' },
  { label: 'Judge Profiles', href: '/judges' },
  { label: 'District Analytics', href: '/districts' },
  { label: 'Settlement Data', href: '/outcomes' },
  { label: 'Citation Check', href: '/attorney/keycite' },
  { label: 'Research Organizer', href: '/attorney/folders' },
  { label: 'Folders', href: '/attorney/folders' },
  { label: 'Case Alerts', href: '/dashboard' },
  { label: 'Practical Guidance', href: '/attorney/secondary-sources' },
];

interface ShortcutItem {
  label: string;
  href: string;
}

interface GetStartedBarProps {
  shortcuts?: ShortcutItem[];
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
  const router = useRouter();

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
          fontSize: 12,
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
      {shortcuts.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => router.push(item.href)}
          style={{
            height: 26,
            padding: '0 10px',
            border: '1px solid var(--bdr-strong, #C8C4B8)',
            borderRadius: 2,
            background: 'var(--card, #FFFFFF)',
            fontSize: 12,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text2, #42403C)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'border-color 150ms ease, color 150ms ease',
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
          {item.label}
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
          background: 'var(--card, #FFFFFF)',
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
