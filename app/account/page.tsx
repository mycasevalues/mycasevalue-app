import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Account Settings | MyCaseValue',
  description: 'Manage your MyCaseValue account settings, subscription, and billing information.',
};

export default function AccountPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-base)',
        padding: '40px 20px',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--fg-primary)',
              margin: '0 0 8px 0',
              lineHeight: 1.2,
            }}
          >
            Account Settings
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--accent-secondary)',
              margin: 0,
            }}
          >
            Manage your profile, subscription, and billing preferences
          </p>
        </div>

        {/* Profile Info Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)',
            border: `1px solid var(--border-default)`,
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--fg-primary)',
              margin: '0 0 24px 0',
            }}
          >
            Profile Information
          </h2>

          <form>
            {/* Name Field */}
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--fg-primary)',
                  marginBottom: '8px',
                }}
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="auth-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid var(--border-default)`,
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
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="auth-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid var(--border-default)`,
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

            {/* Save Button */}
            <button
              type="submit"
              className="auth-btn"
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--fg-primary)',
                color: 'var(--bg-surface)',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Subscription Tier Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)',
            border: `1px solid var(--border-default)`,
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--fg-primary)',
              margin: '0 0 24px 0',
            }}
          >
            Subscription Plan
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--accent-secondary)',
                margin: '0 0 8px 0',
                fontWeight: 500,
              }}
            >
              Current Plan
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--fg-primary)',
                margin: 0,
              }}
            >
              Free Tier
            </p>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--accent-secondary)',
              margin: '0 0 24px 0',
              lineHeight: 1.5,
            }}
          >
            You have full access to basic reports. Upgrade to unlock premium features including detailed settlement data, judge analytics, and litigation cost insights.
          </p>

          <Link
            href="/pricing"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: 'var(--accent-secondary)',
              color: 'var(--bg-surface)',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
          >
            View Plans
          </Link>
        </div>

        {/* Billing Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)',
            border: `1px solid var(--border-default)`,
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--fg-primary)',
              margin: '0 0 24px 0',
            }}
          >
            Billing
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--accent-secondary)',
              margin: '0 0 24px 0',
              lineHeight: 1.5,
            }}
          >
            Manage your payment methods and billing history. View and download invoices from your billing portal.
          </p>

          <Link
            href="/billing"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: 'var(--fg-primary)',
              color: 'var(--bg-surface)',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
          >
            Manage Billing
          </Link>
        </div>

        {/* Danger Zone Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)',
            border: '2px solid var(--semantic-danger)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--semantic-danger)',
              margin: '0 0 24px 0',
            }}
          >
            Danger Zone
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--fg-primary)',
                margin: '0 0 8px 0',
              }}
            >
              Delete Account
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--accent-secondary)',
                margin: '0 0 16px 0',
                lineHeight: 1.5,
              }}
            >
              Once you delete your account, there is no going back. Please be certain. All your data will be permanently removed.
            </p>
            <button
              disabled
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--semantic-danger)',
                color: 'var(--bg-surface)',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'not-allowed',
                opacity: 0.5,
                transition: 'background-color 0.2s',
              }}
            >
              Delete Account
            </button>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--fg-muted)',
                margin: '8px 0 0 0',
              }}
            >
              To delete your account, please contact <a href="mailto:support@mycasevalue.com" style={{ color: 'var(--accent-secondary)', textDecoration: 'none' }}>support@mycasevalue.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
