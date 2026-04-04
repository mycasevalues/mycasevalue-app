'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

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
        redirectTo: 'https://www.mycasevalues.com/reset-password',
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
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '12px',
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
              color: '#1856FF',
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
              color: '#F0F2F5',
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
                borderRadius: '50%',
                backgroundColor: 'rgba(24,86,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1856FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 700,
                color: '#F0F2F5',
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
                color: 'rgba(240,242,245,0.70)',
                margin: '0 0 28px 0',
                lineHeight: 1.5,
              }}
            >
              We sent a password reset link to <strong style={{ color: '#F0F2F5' }}>{email}</strong>. Click the link in the email to reset your password.
            </p>
            <Link
              href="/sign-in"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#1856FF',
                textDecoration: 'none',
                fontWeight: 500,
              }}
              className="auth-link"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            {/* Heading */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 700,
                color: '#F0F2F5',
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
                color: 'rgba(240,242,245,0.70)',
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
                  backgroundColor: 'rgba(255,107,107,0.12)',
                  border: '1px solid rgba(255,107,107,0.30)',
                  borderRadius: '8px',
                  marginBottom: '20px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#FF6B6B',
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
                    color: '#F0F2F5',
                    marginBottom: '8px',
                  }}
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#F0F2F5',
                    backgroundColor: 'rgba(255,255,255,0.08)',
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
                  padding: '12px 16px',
                  backgroundColor: '#1856FF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s, transform 0.1s',
                  opacity: loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#3D72FF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#1856FF';
                  }
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
                  color: '#1856FF',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
                className="auth-link"
              >
                Back to sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
