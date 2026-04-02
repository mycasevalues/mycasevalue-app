import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Account | MyCaseValue',
  description: 'Create your MyCaseValue account to access federal court outcome data and case research tools.',
};

export default function SignUpPage() {
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
            margin: '0 0 24px 0',
            lineHeight: 1.2,
          }}
        >
          Create your MyCaseValue account
        </h1>

        {/* Form */}
        <form style={{ marginBottom: '24px' }}>
          {/* Full Name Field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="name"
              style={{
                display: 'block',
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#111111',
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

          {/* Email Field */}
          <div style={{ marginBottom: '16px' }}>
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

          {/* Password Field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#111111',
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

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="confirm-password"
              style={{
                display: 'block',
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#111111',
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
                accentColor: '#8B5CF6',
              }}
            />
            <label
              htmlFor="terms"
              style={{
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '13px',
                color: '#111111',
                lineHeight: 1.5,
                cursor: 'pointer',
              }}
            >
              I agree to the{' '}
              <Link href="/terms" style={{ color: '#8B5CF6', textDecoration: 'none' }}>
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" style={{ color: '#8B5CF6', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Create Account Button */}
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
            Create Account
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
              backgroundColor: '#E5E0D8',
            }}
          />
          <span
            style={{
              padding: '0 12px',
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '13px',
              color: '#8B5CF6',
              fontWeight: 500,
            }}
          >
            or
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: '#E5E0D8',
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
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              color: '#111111',
              margin: 0,
            }}
          >
            Already have an account?{' '}
            <Link
              href="/sign-in"
              style={{
                color: '#8B5CF6',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
