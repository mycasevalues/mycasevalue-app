'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface AuthGateProps {
  /** Display name of the gated feature/tool */
  feature: string;
  /** Protected content shown only to authenticated users */
  children: React.ReactNode;
}

/**
 * AuthGate wraps premium attorney-tool content.
 *
 * - While auth state is loading, renders a minimal skeleton.
 * - If the user is not signed in, shows a professional paywall prompt
 *   styled with the design system tokens.
 * - If the user is signed in, renders children immediately.
 *
 * NOTE: This is a client-side UX gate only. Server-side authorization
 * should always be enforced independently (see lib/access.ts).
 */
export default function AuthGate({ feature, children }: AuthGateProps) {
  const { loading, isAuthenticated } = useAuth();

  // ── Loading skeleton ──────────────────────────────────────────────
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          fontFamily: 'var(--font-ui)',
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            border: '3px solid var(--bdr)',
            borderTopColor: 'var(--gold)',
            borderRadius: '50%',
            animation: 'authgate-spin 0.8s linear infinite',
          }}
        />
        <style>{`
          @keyframes authgate-spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // ── Authenticated — render protected content ──────────────────────
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // ── Not authenticated — paywall prompt ────────────────────────────
  return (
    <div
      style={{
        fontFamily: 'var(--font-ui)',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: '100%',
          background: 'var(--card)',
          border: '1px solid var(--bdr)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            height: 4,
            background: 'var(--gold)',
          }}
        />

        <div style={{ padding: '40px 32px' }}>
          {/* Lock icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(196, 136, 42, 0.1)',
              border: '1px solid var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-legal)',
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--text-primary)',
              textAlign: 'center',
              margin: '0 0 8px',
              letterSpacing: '-0.02em',
            }}
          >
            Attorney-Grade Tool
          </h2>

          <p
            style={{
              fontSize: 14,
              color: 'var(--text2)',
              textAlign: 'center',
              margin: '0 0 28px',
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: 'var(--text-primary)' }}>{feature}</strong> is
            part of the Attorney tier. Sign in or start a free trial to access
            this and all premium litigation tools.
          </p>

          {/* Tier card */}
          <div
            style={{
              background: 'var(--surf)',
              border: '1px solid var(--bdr)',
              borderRadius: 4,
              padding: '20px 24px',
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--gold)',
                }}
              >
                Attorney Mode
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                $29.99
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'var(--text2)',
                  }}
                >
                  /mo
                </span>
              </span>
            </div>

            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: 10,
              }}
            >
              {[
                'AI case outcome predictor',
                'Judge intelligence profiles',
                'Document analysis & comparison',
                'Opposing counsel research',
                'Real-time PACER monitoring',
                'Team workspace (5 seats)',
                'White-label PDF reports',
                'Priority support — 24h response',
              ].map((benefit) => (
                <li
                  key={benefit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 14,
                    color: 'var(--text-primary)',
                    lineHeight: 1.4,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ flexShrink: 0 }}
                  >
                    <path
                      d="M3.5 8.5L6.5 11.5L12.5 4.5"
                      stroke="var(--gold)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            <a
              href="/sign-in"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 44,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'var(--text-primary)',
                background: 'var(--surf)',
                border: '1px solid var(--bdr)',
                borderRadius: 3,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              Sign In
            </a>
            <a
              href="/sign-up"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 44,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'white',
                background: 'var(--gold)',
                border: 'none',
                borderRadius: 3,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
