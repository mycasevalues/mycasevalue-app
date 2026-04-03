import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Judge Intelligence | MyCaseValue',
  description: 'Research federal judges across all 13 circuits and 94 districts. Motion grant rates, case duration, plaintiff win rates, and ruling pattern analytics.',
  alternates: { canonical: 'https://www.mycasevalues.com/judges' },
  openGraph: {
    title: 'Federal Judge Intelligence | MyCaseValue',
    description: 'Research federal judges across all 13 circuits and 94 districts. Motion grant rates, case duration, and ruling analytics.',
    type: 'website',
    url: 'https://www.mycasevalues.com/judges',
  },
};

const CIRCUITS: {
  name: string;
  districts: { code: string; label: string }[];
}[] = [
  {
    name: '1st Circuit',
    districts: [
      { code: 'MA', label: 'District of Massachusetts' },
      { code: 'RI', label: 'District of Rhode Island' },
      { code: 'ME', label: 'District of Maine' },
      { code: 'NH', label: 'District of New Hampshire' },
      { code: 'PR', label: 'District of Puerto Rico' },
    ],
  },
  {
    name: '2nd Circuit',
    districts: [
      { code: 'NY-S', label: 'Southern District of New York' },
      { code: 'NY-E', label: 'Eastern District of New York' },
      { code: 'CT', label: 'District of Connecticut' },
      { code: 'VT', label: 'District of Vermont' },
    ],
  },
  {
    name: '3rd Circuit',
    districts: [
      { code: 'PA-E', label: 'Eastern District of Pennsylvania' },
      { code: 'NJ', label: 'District of New Jersey' },
      { code: 'DE', label: 'District of Delaware' },
      { code: 'PA-W', label: 'Western District of Pennsylvania' },
    ],
  },
  {
    name: '4th Circuit',
    districts: [
      { code: 'MD', label: 'District of Maryland' },
      { code: 'VA-E', label: 'Eastern District of Virginia' },
      { code: 'NC-W', label: 'Western District of North Carolina' },
      { code: 'SC', label: 'District of South Carolina' },
    ],
  },
  {
    name: '5th Circuit',
    districts: [
      { code: 'TX-S', label: 'Southern District of Texas' },
      { code: 'TX-N', label: 'Northern District of Texas' },
      { code: 'LA-E', label: 'Eastern District of Louisiana' },
      { code: 'MS-S', label: 'Southern District of Mississippi' },
    ],
  },
  {
    name: '6th Circuit',
    districts: [
      { code: 'OH-N', label: 'Northern District of Ohio' },
      { code: 'MI-E', label: 'Eastern District of Michigan' },
      { code: 'TN-M', label: 'Middle District of Tennessee' },
      { code: 'KY-W', label: 'Western District of Kentucky' },
    ],
  },
  {
    name: '7th Circuit',
    districts: [
      { code: 'IL-N', label: 'Northern District of Illinois' },
      { code: 'WI-E', label: 'Eastern District of Wisconsin' },
      { code: 'IN-S', label: 'Southern District of Indiana' },
    ],
  },
  {
    name: '8th Circuit',
    districts: [
      { code: 'MN', label: 'District of Minnesota' },
      { code: 'MO-E', label: 'Eastern District of Missouri' },
      { code: 'AR-E', label: 'Eastern District of Arkansas' },
      { code: 'IA-S', label: 'Southern District of Iowa' },
    ],
  },
  {
    name: '9th Circuit',
    districts: [
      { code: 'CA-C', label: 'Central District of California' },
      { code: 'CA-N', label: 'Northern District of California' },
      { code: 'WA-W', label: 'Western District of Washington' },
      { code: 'AZ', label: 'District of Arizona' },
      { code: 'NV', label: 'District of Nevada' },
    ],
  },
  {
    name: '10th Circuit',
    districts: [
      { code: 'CO', label: 'District of Colorado' },
      { code: 'UT', label: 'District of Utah' },
      { code: 'OK-W', label: 'Western District of Oklahoma' },
      { code: 'KS', label: 'District of Kansas' },
    ],
  },
  {
    name: '11th Circuit',
    districts: [
      { code: 'FL-S', label: 'Southern District of Florida' },
      { code: 'FL-M', label: 'Middle District of Florida' },
      { code: 'GA-N', label: 'Northern District of Georgia' },
      { code: 'AL-N', label: 'Northern District of Alabama' },
    ],
  },
  {
    name: 'D.C. Circuit',
    districts: [
      { code: 'DC', label: 'District of Columbia' },
    ],
  },
  {
    name: 'Federal Circuit',
    districts: [
      { code: 'FED', label: 'U.S. Court of Federal Claims' },
    ],
  },
];

export default function JudgesPage() {
  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border-default)',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ paddingTop: 64, paddingBottom: 64 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '1.5px',
                marginBottom: 16,
                background: 'var(--accent-primary-subtle)',
                color: 'var(--fg-primary)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Judge Intelligence
            </div>

            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 44px)',
                fontWeight: 900,
                marginBottom: 16,
                color: 'var(--fg-primary)',
                letterSpacing: '-1.5px',
                fontFamily: 'var(--font-display)',
                lineHeight: 1.2,
              }}
            >
              Federal Judge Intelligence
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px, 2vw, 17px)',
                lineHeight: 1.6,
                maxWidth: 640,
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Research federal judges across all 13 circuits and 94 districts. Judge profiles include motion grant rates, average case duration, plaintiff win rates, and ruling pattern analytics drawn from public court records.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
        {/* What Judge Profiles Include */}
        <section style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--fg-primary)',
              fontFamily: 'var(--font-display)',
              marginBottom: 24,
            }}
          >
            What Judge Profiles Include
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {[
              { title: 'Motion Grant Rates', desc: 'How often a judge grants motions to dismiss, summary judgment, and other dispositive motions.' },
              { title: 'Case Duration', desc: 'Median time from filing to resolution, broken down by case type and disposition.' },
              { title: 'Plaintiff Win Rates', desc: 'Trial and overall win rates for plaintiffs appearing before this judge.' },
              { title: 'Settlement Patterns', desc: 'Settlement frequency and timing relative to the judge\'s typical case lifecycle.' },
              { title: 'Comparison Analytics', desc: 'How the judge compares to the district and circuit average on key metrics.' },
              { title: 'Case Type Breakdown', desc: 'Performance metrics segmented by Nature of Suit code and case category.' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: 24,
                  borderRadius: 10,
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-surface)',
                }}
              >
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--fg-primary)',
                    fontFamily: 'var(--font-display)',
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: 'var(--fg-muted)',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Browse by Circuit */}
        <section style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--fg-primary)',
              fontFamily: 'var(--font-display)',
              marginBottom: 32,
            }}
          >
            Browse Judges by Circuit
          </h2>

          <div style={{ display: 'grid', gap: 20 }}>
            {CIRCUITS.map((circuit) => (
              <div
                key={circuit.name}
                style={{
                  padding: 24,
                  borderRadius: 12,
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-surface)',
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: 'var(--fg-primary)',
                    fontFamily: 'var(--font-display)',
                    marginBottom: 16,
                    paddingBottom: 12,
                    borderBottom: '1px solid var(--border-default)',
                  }}
                >
                  {circuit.name}
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: 10,
                  }}
                >
                  {circuit.districts.map((d) => (
                    <Link
                      key={d.code}
                      href={`/judges/${d.code.toLowerCase()}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        borderRadius: 8,
                        fontSize: 14,
                        color: 'var(--fg-primary)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                        background: 'var(--bg-base)',
                        border: '1px solid var(--border-default)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{d.label}</span>
                      <span style={{ fontSize: 12, color: 'var(--accent-primary)', fontWeight: 500 }}>
                        View judges &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: '48px 32px',
            borderRadius: 16,
            border: '2px solid var(--accent-primary)',
            background: 'var(--bg-surface)',
            textAlign: 'center',
            marginBottom: 64,
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--fg-primary)',
              fontFamily: 'var(--font-display)',
              marginBottom: 12,
            }}
          >
            Judge analytics included in Unlimited Reports and Attorney Mode
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--fg-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: 520,
              margin: '0 auto 28px',
              lineHeight: 1.6,
            }}
          >
            Unlock full judge profiles with motion grant rates, ruling patterns, and case duration benchmarks for every federal judge.
          </p>
          <Link
            href="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 28px',
              borderRadius: 8,
              background: 'var(--accent-primary)',
              color: 'var(--bg-base)',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
            }}
          >
            View Pricing
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}
