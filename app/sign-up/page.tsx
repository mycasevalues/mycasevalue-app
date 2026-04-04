'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function getSupabase() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const supabase = getSupabase();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      if (error.message?.toLowerCase().includes('already registered')) {
        setError('already_registered');
      } else {
        setError(error.message || 'Something went wrong. Please try again.');
      }
      setLoading(false);
      return;
    }

    // Create a free-tier record in premium_sessions so the user exists in the system
    try {
      await supabase.from('premium_sessions').upsert({
        email: email.toLowerCase(),
        plan: 'free',
        granted_at: Date.now(),
        expires_at: null,
      }, { onConflict: 'email' });
    } catch {
      // Non-blocking — user is still created even if this fails
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#EDEEEE',
          padding: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D5D8DC',
            borderRadius: '4px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,105,151,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 700,
              color: '#212529',
              margin: '0 0 12px 0',
            }}
          >
            Check your email
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: '#455A64',
              lineHeight: 1.6,
              margin: '0 0 24px 0',
            }}
          >
            We sent a confirmation link to <strong style={{ color: '#212529' }}>{email}</strong>. Click the link to activate your account.
          </p>
          <Link
            href="/sign-in"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#E8171F',
              color: '#FFFFFF',
              borderRadius: '0px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
            className="auth-btn"
          >
            Go to Sign In
          </Link>
        </div>
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
        background: '#EDEEEE',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#FFFFFF',
          border: '1px solid #D5D8DC',
          borderRadius: '4px',
          padding: '40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
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
            &larr; Back to home
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
              color: '#212529',
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
            color: '#212529',
            margin: '0 0 24px 0',
            lineHeight: 1.2,
          }}
        >
          Create your MyCaseValue account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          {/* Full Name Field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="name"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#212529',
                marginBottom: '8px',
              }}
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
              style={{
                width: '100%',
                padding: '10px 12px',
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
                padding: '10px 12px',
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

          {/* Password Field */}
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
              Password
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
                padding: '10px 12px',
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
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#999999',
                margin: '6px 0 0 0',
              }}
            >
              Minimum 8 characters
            </p>
          </div>

          {/* Confirm Password Field */}
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
              Confirm password
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
                padding: '10px 12px',
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

          {/* Terms Checkbox */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '20px',
              gap: '10px',
            }}
          >
            <input
              id="terms"
              type="checkbox"
              required
              style={{
                width: '18px',
                height: '18px',
                minWidth: '18px',
                marginTop: '2px',
                cursor: 'pointer',
                accentColor: '#006997',
              }}
            />
            <label
              htmlFor="terms"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#212529',
                lineHeight: 1.5,
                cursor: 'pointer',
              }}
            >
              I agree to the{' '}
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
            </label>
          </div>

          {/* Error Message */}
          {error && error !== 'already_registered' && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#CC1019',
                margin: '0 0 16px 0',
                padding: '10px 12px',
                backgroundColor: 'rgba(204,16,25,0.06)',
                borderRadius: '4px',
                border: '1px solid rgba(255,107,107,0.30)',
              }}
            >
              {error}
            </p>
          )}

          {error === 'already_registered' && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#CC1019',
                margin: '0 0 16px 0',
                padding: '10px 12px',
                backgroundColor: 'rgba(204,16,25,0.06)',
                borderRadius: '4px',
                border: '1px solid rgba(255,107,107,0.30)',
              }}
            >
              An account with this email already exists.{' '}
              <Link
                href="/sign-in"
                style={{
                  color: '#006997',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Sign in &rarr;
              </Link>
            </p>
          )}

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={loading}
            className="auth-btn"
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: '#E8171F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '0px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s, transform 0.1s',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.backgroundColor = '#CC1019';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.backgroundColor = '#E8171F';
              }
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
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
              color: '#999999',
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

        {/* Sign In Link */}
        <div
          style={{
            textAlign: 'center',
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
            Already have an account?{' '}
            <Link
              href="/sign-in"
              style={{
                color: '#006997',
                textDecoration: 'none',
                fontWeight: 600,
              }}
              className="auth-link"
            >
              Sign in &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
