import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reset Password | MyCaseValue',
  description: 'Reset your MyCaseValue password by entering your email address.',
};

export default function ForgotPasswordPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-base)',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
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
              color: 'var(--accent-secondary)',
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
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 900,
              color: 'var(--fg-primary)',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            MyCaseValue
          </h2>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--fg-primary)',
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
            color: 'var(--fg-muted)',
            margin: '0 0 28px 0',
            lineHeight: 1.5,
          }}
        >
          Enter your email and we'll send you a reset link.
        </p>

        {/* Form */}
        <form style={{ marginBottom: '24px' }}>
          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--fg-primary)',
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
              className="auth-input"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--fg-primary)',
                backgroundColor: 'var(--bg-surface)',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
          </div>

          {/* Send Reset Link Button */}
          <button
            type="submit"
            className="auth-btn"
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: 'var(--fg-primary)',
              color: 'var(--bg-surface)',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s, transform 0.1s',
            }}
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Sign In Link */}
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Link
            href="/sign-in"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--accent-secondary)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
            className="auth-link"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
