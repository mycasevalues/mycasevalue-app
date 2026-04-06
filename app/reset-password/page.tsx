'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Supabase automatically picks up the token from the URL hash
    // and establishes a session. Give it a moment, then verify.
    const supabase = getSupabase();
    const timeout = setTimeout(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          router.replace('/forgot-password');
        } else {
          setReady(true);
        }
      });
    }, 1500);

    // Also listen for the auth event in case it fires quickly
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
        clearTimeout(timeout);
      }
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  // Loading state while checking session
  if (!ready && !success) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#00172E',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: '#FFFFFF',
            opacity: 0.8,
          }}
        >
          Verifying reset link...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#00172E',
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
          border-color: #006997 !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 105, 151, 0.1) !important;
        }
        .auth-btn:hover:not(:disabled) {
          background-color: #CC1019 !important;
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
          backgroundColor: '#FFFFFF',
          border: '1px solid #D5D8DC',
          borderRadius: '4px',
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
              color: '#006997',
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
              color: '#212529',
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
                borderRadius: '4px',
                backgroundColor: 'rgba(0,105,151,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 700,
                color: '#212529',
                margin: '0 0 12px 0',
                lineHeight: 1.2,
              }}
            >
              Password updated
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#455A64',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Redirecting to your dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Heading */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 700,
                color: '#212529',
                margin: '0 0 12px 0',
                lineHeight: 1.2,
              }}
            >
              Set a new password
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#455A64',
                margin: '0 0 28px 0',
                lineHeight: 1.5,
              }}
            >
              Choose a new password for your account. Minimum 8 characters.
            </p>

            {/* Error Banner */}
            {error && (
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(204,16,25,0.06)',
                  border: '1px solid rgba(204,16,25,0.20)',
                  borderRadius: '4px',
                  marginBottom: '20px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#E8171F',
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
              {/* New Password */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="password"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#212529',
                    marginBottom: '8px',
                  }}
                >
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '12px 14px',
                    border: '1px solid #D5D8DC',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#212529',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="confirm-password"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#212529',
                    marginBottom: '8px',
                  }}
                >
                  Confirm new password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '12px 14px',
                    border: '1px solid #D5D8DC',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#212529',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="auth-btn"
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  backgroundColor: '#E8171F',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background-color 0.2s, transform 0.1s',
                }}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>

            {/* Back to Sign In */}
            <div style={{ textAlign: 'center' }}>
              <Link
                href="/sign-in"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#006997',
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
