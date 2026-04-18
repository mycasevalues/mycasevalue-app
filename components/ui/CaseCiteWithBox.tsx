'use client';

/**
 * CaseCiteWithBox.tsx — "Cited With" box for cases commonly cited together
 *
 * Background: var(--cw) #E8F5EE
 * Border: 1px solid var(--cw-border) #A8D8C0
 * Case names: font-baskerville 11px, link color
 * Separators: "·" in var(--bdr-xstrong)
 */

import React from 'react';
import Link from 'next/link';

interface CitedCase {
  name: string;
  href: string;
}

interface CaseCiteWithBoxProps {
  cases: CitedCase[];
}

export default function CaseCiteWithBox({ cases }: CaseCiteWithBoxProps) {
  if (!cases || cases.length === 0) return null;

  return (
    <div
      style={{
        background: 'var(--cw, #E8F5EE)',
        border: '1px solid var(--cw-border, #A8D8C0)',
        borderRadius: 2,
        padding: '8px 11px',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: 'var(--pos, #176438)',
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        CaseCite™ Cited With — Cases Frequently Cited Alongside
      </div>

      {/* Case list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {cases.map((c, i) => (
          <React.Fragment key={c.href}>
            <Link
              href={c.href}
              style={{
                fontFamily: 'var(--font-legal)',
                fontSize: 12,
                color: 'var(--link, #0A50A2)',
                textDecoration: 'none',
                lineHeight: 1.4,
              }}
            >
              {c.name}
            </Link>
            {i < cases.length - 1 && (
              <span
                style={{
                  color: 'var(--bdr-xstrong, #A8A49C)',
                  fontSize: 12,
                  lineHeight: 1,
                }}
              >
                ·
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
