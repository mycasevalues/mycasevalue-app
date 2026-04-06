import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Case Results',
  description: 'View detailed case results and outcomes from the MyCaseValue database.',
  alternates: { canonical: `${SITE_URL}/results` },
  openGraph: {
    title: 'Case Results',
    description: 'View detailed case results and outcomes from the MyCaseValue database.',
    type: 'website',
    url: `${SITE_URL}/results`,
  },
};

export default function ResultsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
      <style>{`
        .cta-button {
          transition: all 0.2s ease;
        }
        .cta-button:hover {
          background-color: #CC0D14 !important;
          transform: translateY(-1px);
        }
        .secondary-button {
          transition: all 0.2s ease;
        }
        .secondary-button:hover {
          background-color: #F5F5F5;
          border-color: #A8ACB1;
        }
        .info-card {
          transition: all 0.2s ease;
        }
        .info-card:hover {
          border-color: #B0B5BA;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '12px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
          <nav style={{ fontSize: '13px', fontFamily: 'var(--font-body)', color: '#4B5563' }}>
            <Link href="/" style={{ color: '#6D28D9', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 8px', color: '#A8ACB1' }}>&gt;</span>
            <span style={{ color: '#212529', fontWeight: '600' }}>Case Results</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div style={{ background: '#1B3A5C', paddingTop: '48px', paddingBottom: '48px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{
              display: 'inline-block',
              background: '#7C3AED',
              color: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: '2px',
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              CASE RESULTS
            </span>
          </div>
          <h1 style={{
            fontSize: '40px',
            fontWeight: '700',
            color: '#FFFFFF',
            margin: '0 0 12px 0',
            lineHeight: '1.2',
            fontFamily: 'var(--font-display)'
          }}>
            Case Results
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#E5E7EB',
            margin: '0',
            maxWidth: '600px',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.6'
          }}>
            Select a case type and district to see detailed outcome data from federal court records.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', paddingTop: '48px', paddingBottom: '48px' }}>
        {/* Empty State Card */}
        <div style={{
          padding: '32px',
          borderRadius: '2px',
          border: '1px solid #E5E7EB',
          background: '#FFFFFF',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#212529',
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-display)'
          }}>
            No Results Selected
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#4B5563',
            margin: '0 0 24px 0',
            lineHeight: '1.6',
            fontFamily: 'var(--font-body)'
          }}>
            Select a case type and district to see detailed results including win rates, settlement ranges, average awards, and case timelines.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/calculator"
              className="cta-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                paddingLeft: '24px',
                paddingRight: '24px',
                height: '48px',
                borderRadius: '2px',
                fontSize: '14px',
                fontWeight: '600',
                background: '#7C3AED',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                border: 'none',
                cursor: 'pointer'
              }}>
              Use Settlement Calculator
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/"
              className="secondary-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                paddingLeft: '24px',
                paddingRight: '24px',
                height: '48px',
                borderRadius: '2px',
                fontSize: '14px',
                fontWeight: '600',
                background: '#FFFFFF',
                color: '#212529',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                border: '1px solid #E5E7EB',
                cursor: 'pointer'
              }}>
              Browse by Type
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '32px' }}>
          <div className="info-card" style={{
            padding: '20px',
            borderRadius: '2px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF'
          }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#212529',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Win Rates & Outcomes
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#4B5563',
              margin: '0',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              Percentage of cases won, settled, or dismissed by outcome type.
            </p>
          </div>
          <div className="info-card" style={{
            padding: '20px',
            borderRadius: '2px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF'
          }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#212529',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Settlement Ranges
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#4B5563',
              margin: '0',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              Median and average settlement amounts for your case type.
            </p>
          </div>
          <div className="info-card" style={{
            padding: '20px',
            borderRadius: '2px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF'
          }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#212529',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Case Duration
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#4B5563',
              margin: '0',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              Average time from filing to resolution.
            </p>
          </div>
          <div className="info-card" style={{
            padding: '20px',
            borderRadius: '2px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF'
          }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#212529',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Regional Variation
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#4B5563',
              margin: '0',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              How outcomes differ across federal districts.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '24px', paddingBottom: '24px', textAlign: 'center', marginTop: '48px', background: '#FFFFFF' }}>
        <p style={{
          fontSize: '11px',
          color: '#4B5563',
          maxWidth: '600px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          fontFamily: 'var(--font-body)',
          lineHeight: '1.6'
        }}>
          All results are based on aggregate data from official federal court records.
          This is not legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
