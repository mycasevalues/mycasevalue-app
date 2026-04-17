'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--surf, #F6F5F2)' }} />}>
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

  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-surface-1)',
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
        .auth-container {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          padding: 24px 24px;
          gap: 32px;
        }
        .auth-card {
          animation: fadeIn 0.4s ease-out;
          width: 100%;
          max-width: 440px;
        }
        .auth-logo {
          margin-bottom: 32px;
          text-align: center;
        }
        .auth-input:focus {
          border-color: var(--link) !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(10, 80, 162, 0.15) !important;
        }
        .auth-btn {
          background: var(--gold);
          border: 1px solid var(--gold);
          color: var(--color-text-inverse, #FFFFFF);
          border-radius: '2px';
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.005em;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
          transition: background-color 150ms ease, border-color 150ms ease;
        }
        .auth-btn:hover:not(:disabled) {
          background: var(--gold);
          border-color: var(--gold);
        }
        .auth-link:hover {
          color: var(--link) !important;
        }
        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .checkbox-input {
          width: 18px;
          height: 18px;
          accent-color: var(--accent-primary);
          cursor: pointer;
        }
        .benefits-section {
          flex: 1;
          max-width: 380px;
        }
        .benefits-title {
          font-family: var(--font-ui);
          font-size: 20px;
          font-weight: 600;
          color: var(--color-surface-0);
          margin: 0 0 24px 0;
          line-height: 1.3;
        }
        .benefit-item {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
          color: var(--color-surface-0);
        }
        .benefit-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          background: var(--data-positive);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }
        .benefit-text {
          font-family: var(--font-ui);
          font-size: 14px;
          line-height: 1.5;
        }
        .trust-indicators {
          display: flex;
          gap: 16px;
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.2);
        }
        .trust-item {
          flex: 1;
          color: var(--color-surface-0);
        }
        .trust-number {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 600;
          color: var(--data-positive);
        }
        .trust-label {
          font-family: var(--font-ui);
          font-size: 12px;
          color: rgba(255,255,255,0.8);
          margin-top: 4px;
          line-height: 1.4;
        }
        @media (max-width: 968px) {
          .auth-container {
            flex-direction: column;
            gap: 32px;
            padding: 32px 24px;
          }
          .benefits-section {
            max-width: 100%;
            order: -1;
          }
        }
      `}</style>

      {/* Brand Blue Header Strip */}
      <div
        style={{
          background: 'var(--accent-primary)',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-surface-0)',
            textDecoration: 'none',
          }}
        >
          MyCaseValue
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="auth-container">
        {/* Benefits/Trust Indicators Section */}
        <div className="benefits-section" style={{ background: '#0F2A4A', borderRadius: '4px', padding: '36px' }}>
          <h2 className="benefits-title">
            Access federal court analytics powering legal professionals
          </h2>

          {/* Benefit Items */}
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="benefit-text">
              Search and analyze cases from all 95 federal districts
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="benefit-text">
              Track judge histories, ruling patterns, and docket trends
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="benefit-text">
              Real-time alerts for case updates and statute changes
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="benefit-text">
              Export reports in multiple formats for filings and strategy
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <div className="trust-number">5.1M+</div>
              <div className="trust-label">Cases from FJC/PACER</div>
            </div>
            <div className="trust-item">
              <div className="trust-number">95</div>
              <div className="trust-label">Federal districts covered</div>
            </div>
            <div className="trust-item">
              <div className="trust-number">84</div>
              <div className="trust-label">Case types tracked</div>
            </div>
          </div>
        </div>

        {/* Sign-In Form Card */}
        <div
          className="auth-card"
          style={{
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >

        {/* Logo */}
        <div className="auth-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <svg width="28" height="28" viewBox="-100 -100 200 200">
            <rect x="-100" y="-100" width="200" height="200" rx="26" fill="var(--accent-primary)" />
            <g transform="rotate(12)">
              <polygon points="0,0 -40,-69.3 40,-69.3 80,0" fill="white" opacity="0.93" />
              <polygon points="0,0 80,0 40,69.3 -40,69.3" fill="white" opacity="0.52" />
              <polygon points="0,0 -40,69.3 -80,0 -40,-69.3" fill="white" opacity="0.24" />
            </g>
          </svg>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            MyCase<span style={{ color: 'var(--accent-primary)' }}>Value</span>
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 24px 0',
            lineHeight: 1.2,
          }}
        >
          Sign In
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          {/* Email Field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontFamily: 'var(--font-ui)',
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
                borderRadius: '4px',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-surface-0)',
                boxSizing: 'border-box' as const,
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '24px' }}>
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
                  fontFamily: 'var(--font-ui)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                }}
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '14px',
                  color: 'var(--gold)',
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
              autoComplete="current-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              style={{
                width: '100%',
                height: '48px',
                padding: '12px 14px',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-surface-0)',
                boxSizing: 'border-box' as const,
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
          </div>

          {/* Remember Me Checkbox */}
          <div style={{ marginBottom: '24px' }}>
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
              />
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  userSelect: 'none',
                }}
              >
                Remember me on this device
              </span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '13px',
                color: 'var(--accent-primary)',
                margin: '0 0 16px 0',
                padding: '8px 12px',
                backgroundColor: 'rgba(10, 102, 194, 0.06)',
                borderRadius: '4px',
                border: '1px solid rgba(10, 102, 194, 0.2)',
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
              height: '48px',
              padding: '0 16px',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--color-surface-0)',
              border: 'none',
              borderRadius: '20px',
              fontFamily: 'var(--font-ui)',
              fontSize: '15px',
              fontWeight: 600,
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s, transform 0.1s',
            }}
          >
            {loading ? 'Signing in...' : 'SIGN IN'}
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
              fontFamily: 'var(--font-ui)',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
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
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            New to MyCaseValue?{' '}
            <Link
              href="/sign-up"
              style={{
                color: 'var(--gold)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
              className="auth-link"
            >
              Create an account →
            </Link>
          </p>
        </div>

          {/* Legal Footer */}
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            By signing in, you agree to our{' '}
            <Link
              href="/terms"
              style={{
                color: 'var(--gold)',
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
                color: 'var(--gold)',
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
    </div>
  );
}
