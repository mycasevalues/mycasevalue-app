'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' }} />}>
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
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.10)',
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
              color: '#F0F2F5',
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
            color: '#F0F2F5',
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
                boxSizing: 'border-box' as const,
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
                  color: '#F0F2F5',
                }}
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#1856FF',
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

          {/* Error Message */}
          {error && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#FF6B6B',
                margin: '0 0 16px 0',
                padding: '10px 12px',
                backgroundColor: 'rgba(255,107,107,0.12)',
                borderRadius: '8px',
                border: '1px solid rgba(255,107,107,0.30)',
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
              backgroundColor: '#1856FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s, transform 0.1s',
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
              backgroundColor: 'rgba(255,255,255,0.10)',
            }}
          />
          <span
            style={{
              padding: '0 12px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(240,242,245,0.40)',
              fontWeight: 500,
            }}
          >
            or
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'rgba(255,255,255,0.10)',
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
              color: '#F0F2F5',
              margin: 0,
            }}
          >
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              style={{
                color: '#1856FF',
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
            color: 'rgba(240,242,245,0.40)',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          By signing in, you agree to our{' '}
          <Link
            href="/terms"
            style={{
              color: '#1856FF',
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
              color: '#1856FF',
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
