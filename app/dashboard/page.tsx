import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard | MyCaseValue',
  description: 'Your MyCaseValue dashboard with case reports, research activity, and subscription information.',
};

export default function DashboardPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F9F8F6',
        padding: '40px 20px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            Dashboard
          </h1>
          <p
            style={{
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '16px',
              color: '#8B5CF6',
              margin: 0,
            }}
          >
            Welcome back to MyCaseValue
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {/* Reports Generated */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E0D8',
            }}
          >
            <p
              style={{
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '13px',
                color: '#8B5CF6',
                fontWeight: 600,
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Reports Generated
            </p>
            <p
              style={{
                fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                fontSize: '36px',
                fontWeight: 700,
                color: '#111111',
                margin: 0,
              }}
            >
              0
            </p>
          </div>

          {/* Lookups This Month */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E0D8',
            }}
          >
            <p
              style={{
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '13px',
                color: '#8B5CF6',
                fontWeight: 600,
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Lookups This Month
            </p>
            <p
              style={{
                fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                fontSize: '36px',
                fontWeight: 700,
                color: '#111111',
                margin: 0,
              }}
            >
              0
            </p>
          </div>

          {/* Saved Items */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E0D8',
            }}
          >
            <p
              style={{
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '13px',
                color: '#8B5CF6',
                fontWeight: 600,
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Saved Items
            </p>
            <p
              style={{
                fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                fontSize: '36px',
                fontWeight: 700,
                color: '#111111',
                margin: 0,
              }}
            >
              0
            </p>
          </div>

          {/* Days on Plan */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E0D8',
            }}
          >
            <p
              style={{
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '13px',
                color: '#8B5CF6',
                fontWeight: 600,
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Days on Plan
            </p>
            <p
              style={{
                fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                fontSize: '36px',
                fontWeight: 700,
                color: '#111111',
                margin: 0,
              }}
            >
              0
            </p>
          </div>
        </div>

        {/* Recent Searches Section */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
            border: '1px solid #E5E0D8',
            marginBottom: '40px',
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
            Recent Searches
          </h2>

          {/* Empty State */}
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#F0F0F0',
                borderRadius: '12px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                  fontSize: '32px',
                  color: '#E5E0D8',
                }}
              >
                📋
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                color: '#111111',
                margin: '0 0 8px 0',
              }}
            >
              No searches yet
            </h3>
            <p
              style={{
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                color: '#8B5CF6',
                margin: '0 0 20px 0',
              }}
            >
              Start by searching for a case type to get federal court outcome data.
            </p>
            <Link
              href="/cases"
              className="auth-link"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#111111',
                color: '#FFFFFF',
                textDecoration: 'none',
                borderRadius: '8px',
                fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'background-color 0.2s',
              }}
            >
              Browse Cases →
            </Link>
          </div>
        </div>

        {/* Upgrade Banner */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
            border: '2px solid #8B5CF6',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#111111',
              margin: '0 0 8px 0',
            }}
          >
            Upgrade Your Plan
          </h3>
          <p
            style={{
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              color: '#8B5CF6',
              margin: '0 0 20px 0',
            }}
          >
            Unlock premium reports with detailed settlement data, judge analytics, and cost insights.
          </p>
          <button
            className="auth-btn"
            style={{
              padding: '12px 24px',
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
            See Pricing
          </button>
        </div>
      </div>
    </div>
  );
}
