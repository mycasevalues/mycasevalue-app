'use client';

/**
 * ResearchPath.tsx — Research Path visualization
 *
 * Equivalent to Westlaw "Graphical View of History".
 * Vertical list of steps with dots and arrows.
 * Last step shows "← Here" instead of arrow.
 */

import React from 'react';
import Link from 'next/link';

interface ResearchStep {
  label: string;
  href?: string;
}

interface ResearchPathProps {
  steps: ResearchStep[];
  stepCount: number;
}

export default function ResearchPath({ steps, stepCount }: ResearchPathProps) {
  return (
    <div
      style={{
        background: 'var(--sidebar2, #F4F3EF)',
        border: '1px solid var(--bdr, #E2DFD8)',
        borderRadius: 2,
        padding: 8,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 7,
        }}
      >
        <span
          style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text3, #78766C)',
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
          }}
        >
          RESEARCH PATH
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: 'var(--card, #FFFFFF)',
            background: 'var(--link, #0A50A2)',
            borderRadius: 4,
            padding: '1px 5px',
            lineHeight: '14px',
          }}
        >
          {stepCount}
        </span>
      </div>

      {/* Steps list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const labelEl = step.href ? (
            <Link
              href={step.href}
              style={{
                fontSize: 11,
                color: 'var(--link, #0A50A2)',
                fontFamily: 'var(--font-ui)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {step.label}
            </Link>
          ) : (
            <span
              style={{
                fontSize: 11,
                color: 'var(--link, #0A50A2)',
                fontFamily: 'var(--font-ui)',
                cursor: 'pointer',
              }}
            >
              {step.label}
            </span>
          );

          return (
            <div
              key={`${step.label}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {/* Dot */}
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  border: '2px solid var(--link, #0A50A2)',
                  background: 'var(--card, #FFFFFF)',
                  flexShrink: 0,
                }}
              />
              {labelEl}
              {!isLast && (
                <span
                  style={{
                    fontSize: 9,
                    color: 'var(--bdr-xstrong, #A8A49C)',
                  }}
                >
                  →
                </span>
              )}
              {isLast && (
                <span
                  style={{
                    fontSize: 9,
                    color: 'var(--link, #0A50A2)',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  ← Here
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* View full path link */}
      <div style={{ marginTop: 6 }}>
        <span
          style={{
            fontSize: 11,
            color: 'var(--link, #0A50A2)',
            fontFamily: 'var(--font-ui)',
            cursor: 'pointer',
          }}
        >
          View full Research Path →
        </span>
      </div>
    </div>
  );
}
