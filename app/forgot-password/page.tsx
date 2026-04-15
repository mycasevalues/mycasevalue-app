'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { SITE_URL } from '../../lib/site-config';

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${SITE_URL}/reset-password`,
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--accent-primary)',
        padding: '20px',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .auth-card {
          animation: fadeIn 0.4s ease-out;
        }
        .auth-input:focus {
          border-color: #004182 !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.1) !important;
        }
        .auth-btn:hover:not(:disabled) {
          background-color: #B91C1C !important;
          transform: translateY(-1px);
        }
        .auth-link:hover {
          color: #004d6d !important;
        }
      `}</style>
      <div
        className="auth-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--color-surface-0)',
          border: '1px solid var(--border-default)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '32px',
        }}
      >
        {/* Back to Home Link */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--accent-primary-hover)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
            className="auth-link"
          >
            ← Back to home
          </Link>
        </div>

        {/* Wordmark */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 900,
              color: 'var(--color-text-primary)',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            MyCaseValue
          </p>
        </div>

        {/* Success State */}
        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0,105,151,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 12px 0',
                lineHeight: 1.2,
              }}
            >
              Check your email
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: '0 0 28px 0',
                lineHeight: 1.5,
              }}
            >
              We sent a password reset link to <strong style={{ color: 'var(--color-text-primary)' }}>{email}</strong>. Click the link in the email to reset your password.
            </p>
            <Link
              href="/sign-in"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--accent-primary-hover)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
              className="auth-link"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            {/* Heading */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 12px 0',
                lineHeight: 1.2,
              }}
            >
              Reset your password
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: '0 0 28px 0',
                lineHeight: 1.5,
              }}
            >
              Enter your email and we&apos;ll send you a reset link.
            </p>

            {/* Error Banner */}
            {error && (
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(10, 102, 194, 0.06)',
                  border: '1px solid rgba(204,16,25,0.20)',
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--accent-primary)',
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
              {/* Email Field */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '12px 14px',
                    border: '1px solid var(--border-default)',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--color-text-primary)',
                    backgroundColor: 'var(--color-surface-0)',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
              </div>

              {/* Send Reset Link Button */}
              <button
                type="submit"
                disabled={loading}
                className="auth-btn"
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--color-surface-0)',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s, transform 0.1s',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            {/* Back to Sign In Link */}
            <div style={{ textAlign: 'center' }}>
              <Link
                href="/sign-in"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--accent-primary-hover)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
                className="auth-link"
              >
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
