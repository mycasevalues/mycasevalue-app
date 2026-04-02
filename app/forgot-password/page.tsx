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
        backgroundColor: '#F9F8F6',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
          borderRadius: '12px',
          padding: '32px',
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
              fontSize: '24px',
              fontWeight: 900,
              color: '#111111',
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
            fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
            fontSize: '24px',
            fontWeight: 700,
            color: '#111111',
            margin: '0 0 12px 0',
            lineHeight: 1.2,
          }}
        >
          Reset your password
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
            fontSize: '14px',
            color: '#8B5CF6',
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
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
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
              className="auth-input"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E5E0D8',
                borderRadius: '8px',
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                color: '#111111',
                backgroundColor: '#FFFFFF',
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
              backgroundColor: '#111111',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
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
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              color: '#8B5CF6',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
