'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createBrowserClient } from '@supabase/ssr';

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#00172E' }} />}>
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
        background: '#F5F6F7',
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
          padding: 48px 24px;
          gap: 64px;
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
          border-color: #006997 !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 105, 151, 0.1) !important;
        }
        .auth-btn {
          background: linear-gradient(to right, #d91b5a, #dd2c00);
        }
        .auth-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .auth-link:hover {
          color: #004d6d !important;
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
          accent-color: #E8171F;
          cursor: pointer;
        }
        .benefits-section {
          flex: 1;
          max-width: 380px;
        }
        .benefits-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 24px 0;
          line-height: 1.3;
        }
        .benefit-item {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
          color: #FFFFFF;
        }
        .benefit-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          background: #07874A;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }
        .benefit-text {
          font-family: var(--font-body);
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
          color: #FFFFFF;
        }
        .trust-number {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 700;
          color: #07874A;
        }
        .trust-label {
          font-family: var(--font-body);
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

      {/* Navy Header Strip */}
      <div
        style={{
          background: '#00172E',
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
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            fontWeight: 700,
            color: '#FFFFFF',
            textDecoration: 'none',
          }}
        >
          MyCaseValue
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="auth-container">
        {/* Benefits/Trust Indicators Section */}
        <div className="benefits-section">
          <h2 className="benefits-title">
            Access federal court analytics powering legal professionals
          </h2>

          {/* Benefit Items */}
          <div className="benefit-item">
            <div className="benefit-icon">✓</div>
            <div className="benefit-text">
              Search and analyze cases from all 94 federal districts
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">✓</div>
            <div className="benefit-text">
              Track judge histories, ruling patterns, and docket trends
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">✓</div>
            <div className="benefit-text">
              Real-time alerts for case updates and statute changes
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">✓</div>
            <div className="benefit-text">
              Export reports in multiple formats for filings and strategy
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <div className="trust-number">4.1M+</div>
              <div className="trust-label">Cases from FJC/PACER</div>
            </div>
            <div className="trust-item">
              <div className="trust-number">94</div>
              <div className="trust-label">Federal districts covered</div>
            </div>
            <div className="trust-item">
              <div className="trust-number">2020+</div>
              <div className="trust-label">Years of case history</div>
            </div>
          </div>
        </div>

        {/* Sign-In Form Card */}
        <div
          className="auth-card"
          style={{
            background: '#FFFFFF',
            border: '1px solid #D5D8DC',
            borderRadius: '2px',
            padding: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >

        {/* Logo */}
        <div className="auth-logo">
          <Image
            src="/logo.svg"
            alt="MyCaseValue"
            width={120}
            height={30}
            priority
            style={{ display: 'block' }}
          />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            color: '#212529',
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
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#212529',
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
                height: '48px',
                padding: '12px 14px',
                border: '1px solid #D5D8DC',
                borderRadius: '2px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#212529',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box' as const,
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
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
                  color: '#212529',
                }}
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#006997',
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
                height: '48px',
                padding: '12px 14px',
                border: '1px solid #D5D8DC',
                borderRadius: '2px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#212529',
                backgroundColor: '#FFFFFF',
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
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#455A64',
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
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#E8171F',
                margin: '0 0 16px 0',
                padding: '10px 12px',
                backgroundColor: 'rgba(204,16,25,0.06)',
                borderRadius: '2px',
                border: '1px solid rgba(204,16,25,0.20)',
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
              backgroundColor: '#E8171F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 700,
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
              backgroundColor: '#D5D8DC',
            }}
          />
          <span
            style={{
              padding: '0 12px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#455A64',
              fontWeight: 500,
            }}
          >
            or
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: '#D5D8DC',
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
              color: '#212529',
              margin: 0,
            }}
          >
            New to MyCaseValue?{' '}
            <Link
              href="/sign-up"
              style={{
                color: '#006997',
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
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: '#455A64',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            By signing in, you agree to our{' '}
            <Link
              href="/terms"
              style={{
                color: '#006997',
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
                color: '#006997',
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
