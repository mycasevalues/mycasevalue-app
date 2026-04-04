'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg-base)' }} />}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  function getSupabase() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Incorrect email or password. Please try again.');
      setLoading(false);
      return;
    }

    const redirectTo = searchParams?.get('redirect') || '/dashboard';
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F9FAFB',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderRadius: '12px',
          padding: '40px',
        }}
      >
        {/* Back to Home Link */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#7C3AED',
              textDecoration: 'none',
              fontWeight: 500,
            }}
            className="auth-link"
          >
            ← Back to home
          </Link>
        </div>

        {/* Wordmark */}
        <div
          style={{
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 900,
              color: '#111111',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            MyCaseValue
          </p>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            color: '#111111',
            margin: '0 0 24px 0',
            lineHeight: 1.2,
          }}
        >
          Sign in to MyCaseValue
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          {/* Email Field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#111111',
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
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#111111',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#111111',
                }}
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#7C3AED',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
                className="auth-link"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#111111',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#DC2626',
                margin: '0 0 16px 0',
                padding: '10px 12px',
                backgroundColor: '#FEF2F2',
                borderRadius: '8px',
                border: '1px solid #FECACA',
              }}
            >
              {error}
            </p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="auth-btn"
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: '#111111',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s, transform 0.1s',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'var(--border-default)',
            }}
          />
          <span
            style={{
              padding: '0 12px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#6B7280',
              fontWeight: 500,
            }}
          >
            or
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'var(--border-default)',
            }}
          />
        </div>

        {/* Sign Up Link */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#111111',
              margin: 0,
            }}
          >
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              style={{
                color: '#7C3AED',
                textDecoration: 'none',
                fontWeight: 600,
              }}
              className="auth-link"
            >
              Sign up →
            </Link>
          </p>
        </div>

        {/* Legal Footer */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: '#6B7280',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          By signing in, you agree to our{' '}
          <Link
            href="/terms"
            style={{
              color: '#7C3AED',
              textDecoration: 'none',
            }}
            className="auth-link"
          >
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link
            href="/privacy"
            style={{
              color: '#7C3AED',
              textDecoration: 'none',
            }}
            className="auth-link"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
