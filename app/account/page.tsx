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
        backgroundColor: '#F9F8F6',
        padding: '40px 20px',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1
            style={{
              fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
              fontSize: '32px',
              fontWeight: 700,
              color: '#111111',
              margin: '0 0 8px 0',
              lineHeight: 1.2,
            }}
          >
            Account Settings
          </h1>
          <p
            style={{
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              color: '#8B5CF6',
              margin: 0,
            }}
          >
            Manage your profile, subscription, and billing preferences
          </p>
        </div>

        {/* Profile Info Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
            border: '1px solid #E5E0D8',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#111111',
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
                  fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#111111',
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

            {/* Save Button */}
            <button
              type="submit"
              className="auth-btn"
              style={{
                padding: '10px 20px',
                backgroundColor: '#111111',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
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
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
            border: '1px solid #E5E0D8',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#111111',
              margin: '0 0 24px 0',
            }}
          >
            Subscription Plan
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                color: '#8B5CF6',
                margin: '0 0 8px 0',
                fontWeight: 500,
              }}
            >
              Current Plan
            </p>
            <p
              style={{
                fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                color: '#111111',
                margin: 0,
              }}
            >
              Free Tier
            </p>
          </div>

          <p
            style={{
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '13px',
              color: '#8B5CF6',
              margin: '0 0 24px 0',
              lineHeight: 1.5,
            }}
          >
            You have full access to basic reports. Upgrade to unlock premium features including detailed settlement data, judge analytics, and litigation cost insights.
          </p>

          <button
            className="auth-btn"
            style={{
              padding: '10px 20px',
              backgroundColor: '#8B5CF6',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            View Plans
          </button>
        </div>

        {/* Billing Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
            border: '1px solid #E5E0D8',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#111111',
              margin: '0 0 24px 0',
            }}
          >
            Billing
          </h2>

          <p
            style={{
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '13px',
              color: '#8B5CF6',
              margin: '0 0 24px 0',
              lineHeight: 1.5,
            }}
          >
            Manage your payment methods and billing history. View and download invoices from your billing portal.
          </p>

          <button
            className="auth-btn"
            style={{
              padding: '10px 20px',
              backgroundColor: '#111111',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            Manage Billing
          </button>
        </div>

        {/* Danger Zone Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
            border: '2px solid #DC2626',
          }}
        >
          <h2
            style={{
              fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#DC2626',
              margin: '0 0 24px 0',
            }}
          >
            Danger Zone
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#111111',
                margin: '0 0 8px 0',
              }}
            >
              Delete Account
            </h3>
            <p
              style={{
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '13px',
                color: '#8B5CF6',
                margin: '0 0 16px 0',
                lineHeight: 1.5,
              }}
            >
              Once you delete your account, there is no going back. Please be certain. All your data will be permanently removed.
            </p>
            <button
              className="auth-btn"
              style={{
                padding: '10px 20px',
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
