'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
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
          background: '#1C3A5E',
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
            box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.15) !important;
          }
          .auth-btn:hover:not(:disabled) {
            background-color: #004182 !important;
            transform: translateY(-1px);
          }
          .auth-link:hover {
            color: #004182 !important;
          }
        `}</style>
        <div
          className="auth-card"
          style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
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
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 600,
              color: '#0f0f0f',
              margin: '0 0 12px 0',
            }}
          >
            Check your email
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: '#4B5563',
              lineHeight: 1.6,
              margin: '0 0 24px 0',
            }}
          >
            We sent a confirmation link to <strong style={{ color: '#0f0f0f' }}>{email}</strong>. Click the link to activate your account.
          </p>
          <Link
            href="/sign-in"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#0966C3',
              color: '#FFFFFF',
              borderRadius: '20px',
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
        flexDirection: 'column',
        background: '#F7F8FA',
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
          box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.15) !important;
        }
        .auth-btn:hover:not(:disabled) {
          background: #004182 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.25) !important;
        }
        .auth-link:hover {
          color: #004182 !important;
        }
        .feature-card {
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          padding: 20px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .feature-card:hover {
          box-shadow: 0 4px 16px rgba(27, 58, 92, 0.08);
          transform: translateY(-2px);
        }
        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #F7F8FA;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          font-size: 12px;
          color: #4B5563;
          font-family: var(--font-body);
        }
      `}</style>

      {/* Free Launch Banner */}
      <div
        style={{
          backgroundColor: '#059669',
          color: '#FFFFFF',
          padding: '12px 24px',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.3px',
        }}
      >
        All features available free during our launch period
      </div>

      {/* Navy Header Strip with Logo */}
      <div
        style={{
          backgroundColor: '#1C3A5E',
          padding: '24px',
          color: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 900,
            letterSpacing: '-0.5px',
          }}
        >
          MyCaseValue
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '48px 24px',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN: Form */}
        <div>
          <div
            className="auth-card"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              padding: '40px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            {/* Heading */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 600,
                color: '#0f0f0f',
                margin: '0 0 24px 0',
                lineHeight: 1.2,
              }}
            >
              Create your account
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
                    color: '#0f0f0f',
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
                    height: '48px',
                    padding: '12px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#0f0f0f',
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
                    color: '#0f0f0f',
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
                    padding: '12px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#0f0f0f',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
              </div>

              {/* Role/Profession Dropdown */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="role"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#0f0f0f',
                    marginBottom: '8px',
                  }}
                >
                  Role/Profession
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="auth-input"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '12px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#0f0f0f',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select your profession</option>
                  <option value="attorney">Attorney</option>
                  <option value="paralegal">Paralegal</option>
                  <option value="insurance">Insurance Professional</option>
                  <option value="funder">Litigation Funder</option>
                  <option value="academic">Academic</option>
                  <option value="individual">Individual</option>
                  <option value="other">Other</option>
                </select>
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
                    color: '#0f0f0f',
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
                    height: '48px',
                    padding: '12px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#0f0f0f',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: '#4B5563',
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
                    color: '#0f0f0f',
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
                    height: '48px',
                    padding: '12px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#0f0f0f',
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
                    accentColor: '#004182',
                  }}
                />
                <label
                  htmlFor="terms"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#0f0f0f',
                    lineHeight: 1.5,
                    cursor: 'pointer',
                  }}
                >
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    style={{
                      color: '#004182',
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
                      color: '#004182',
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
                    color: '#0966C3',
                    margin: '0 0 16px 0',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(10, 102, 194, 0.06)',
                    borderRadius: '12px',
                    border: '1px solid rgba(10, 102, 194, 0.2)',
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
                    color: '#0966C3',
                    margin: '0 0 16px 0',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(10, 102, 194, 0.06)',
                    borderRadius: '12px',
                    border: '1px solid rgba(10, 102, 194, 0.2)',
                  }}
                >
                  An account with this email already exists.{' '}
                  <Link
                    href="/sign-in"
                    style={{
                      color: '#004182',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Sign In
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
                  height: '48px',
                  padding: '0',
                  background: '#0966C3',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '20px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background 0.2s, transform 0.1s, box-shadow 0.2s',
                }}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            {/* Sign In Link */}
            <div
              style={{
                textAlign: 'center',
                paddingTop: '16px',
                borderTop: '1px solid #E5E7EB',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#0f0f0f',
                  margin: 0,
                }}
              >
                Already have an account?{' '}
                <Link
                  href="/sign-in"
                  style={{
                    color: '#004182',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                  className="auth-link"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Features & Trust */}
        <div>
          {/* What You'll Get Access To */}
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 600,
                color: '#1C3A5E',
                margin: '0 0 24px 0',
              }}
            >
              What you'll get access to
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {/* Feature Card: Case Analytics */}
              <div className="feature-card">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(27, 58, 92, 0.08)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C3A5E" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9m-5 8V5m-5 12v-3" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 8px 0',
                  }}
                >
                  Case Analytics
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#4B5563',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Deep insights into case outcomes and trends
                </p>
              </div>

              {/* Feature Card: Judge Statistics */}
              <div className="feature-card">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(10, 102, 194, 0.08)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 8px 0',
                  }}
                >
                  Judge Statistics
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#4B5563',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Judicial tendencies and ruling patterns
                </p>
              </div>

              {/* Feature Card: Settlement Data */}
              <div className="feature-card">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(21, 128, 61, 0.08)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M12 2v20m10-10H2" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 8px 0',
                  }}
                >
                  Settlement Data
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#4B5563',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Real settlement ranges and comparables
                </p>
              </div>

              {/* Feature Card: Damage Calculator */}
              <div className="feature-card">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(217, 119, 6, 0.08)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M7 7h10M7 17h10M7 12h10" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 8px 0',
                  }}
                >
                  Damage Calculator
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#4B5563',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Estimate damages based on case data
                </p>
              </div>

              {/* Feature Card: Case Comparison */}
              <div className="feature-card">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(0, 110, 187, 0.08)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                    <line x1="7" y1="7" x2="7" y2="18" />
                    <line x1="17" y1="3" x2="17" y2="18" />
                    <line x1="3" y1="20" x2="21" y2="20" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 8px 0',
                  }}
                >
                  Case Comparison Tool
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#4B5563',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Compare similar cases side-by-side
                </p>
              </div>

              {/* Feature Card: Trend Reports */}
              <div className="feature-card">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(10, 102, 194, 0.08)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 8px 0',
                  }}
                >
                  Trend Reports
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#4B5563',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Market trends and emerging patterns
                </p>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 600,
                color: '#1C3A5E',
                margin: '0 0 24px 0',
              }}
            >
              Trusted by attorneys nationwide
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#4B5563',
                margin: '0 0 16px 0',
                lineHeight: 1.6,
              }}
            >
              Our database includes federal court data from official PACER records, providing the most accurate litigation insights available.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div className="trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Official PACER Data
              </div>
              <div className="trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                100+ Courts
              </div>
              <div className="trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                1M+ Cases
              </div>
              <div className="trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Real-Time Updates
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Privacy/Terms Text */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E5E7EB',
          padding: '24px',
          textAlign: 'center',
          marginTop: 'auto',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: '#4B5563',
            margin: 0,
          }}
        >
          Your privacy is important to us. Read our{' '}
          <Link
            href="/privacy"
            style={{
              color: '#004182',
              textDecoration: 'none',
            }}
            className="auth-link"
          >
            Privacy Policy
          </Link>
          {' '}and{' '}
          <Link
            href="/terms"
            style={{
              color: '#004182',
              textDecoration: 'none',
            }}
            className="auth-link"
          >
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
