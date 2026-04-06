import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '../../components/ui/Icons';
import { SITE_URL } from '../../lib/site-config';
import { getAllJudges } from '../../lib/judges';
import JudgesExplorer from '../../components/JudgesExplorer';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Judge Intelligence',
  description: 'Research federal judges across all 13 circuits and 94 districts. Motion grant rates, case duration, plaintiff win rates, and ruling pattern analytics.',
  alternates: { canonical: `${SITE_URL}/judges` },
  openGraph: {
    title: 'Federal Judge Intelligence',
    description: 'Research federal judges across all 13 circuits and 94 districts. Motion grant rates, case duration, and ruling analytics.',
    type: 'website',
    url: `${SITE_URL}/judges`,
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
  const allJudges = getAllJudges();

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      <style>{`
        .judge-district-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 14px;
          color: #212529;
          text-decoration: none;
          font-family: var(--font-body);
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          transition: all 0.15s ease;
        }
        .judge-district-link:hover {
          background: #F7F8FA;
          border-color: #6D28D9;
          color: #6D28D9;
        }
        .judge-district-link .arrow {
          font-size: 12px;
          color: #6D28D9;
          font-weight: 500;
        }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: '1px solid #E5E7EB', background: '#1B3A5C' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div style={{ paddingTop: 24, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#FFFFFF' }}>Judges</span>
          </div>

          <div style={{ paddingTop: 40, paddingBottom: 48 }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 2, fontSize: 11, fontWeight: 700,
                letterSpacing: '1.5px', marginBottom: 16, background: '#7C3AED',
                color: '#FFFFFF', textTransform: 'uppercase',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Judge Intelligence
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, marginBottom: 16,
              color: '#FFFFFF', letterSpacing: '-1.5px', fontFamily: 'var(--font-display)', lineHeight: 1.2,
            }}>
              Federal Judge Analytics
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.6, maxWidth: 640,
              color: '#C7D1D8', fontFamily: 'var(--font-body)',
            }}>
              Research federal judges across all 13 circuits and 94 districts. Search, sort, and compare judges by win rate, motion grant rate, case duration, and settlement patterns.
            </p>

            {/* Quick stats bar in header */}
            <div style={{ display: 'flex', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'Judges Tracked', value: String(allJudges.length) },
                { label: 'Districts', value: String(new Set(allJudges.map(j => j.district)).size) },
                { label: 'Total Cases', value: `${(allJudges.reduce((s, j) => s + j.stats.totalCases, 0) / 1000).toFixed(0)}K+` },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 48px' }}>
        {/* Interactive Explorer */}
        <JudgesExplorer judges={allJudges} />

        {/* What Judge Profiles Include */}
        <section style={{ marginTop: 64, marginBottom: 64 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: 24 }}>
            What Judge Profiles Include
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: '-', title: 'Motion Grant Rates', desc: 'How often a judge grants motions to dismiss, summary judgment, and other dispositive motions.' },
              { icon: '-', title: 'Case Duration', desc: 'Median time from filing to resolution, broken down by case type and disposition.' },
              { icon: '-', title: 'Plaintiff Win Rates', desc: 'Trial and overall win rates for plaintiffs appearing before this judge.' },
              { icon: '-', title: 'Settlement Patterns', desc: 'Settlement frequency and timing relative to the judge\'s typical case lifecycle.' },
              { icon: '-', title: 'Comparison Analytics', desc: 'How the judge compares to the district and circuit average on key metrics.' },
              { icon: '-', title: 'Case Type Breakdown', desc: 'Performance metrics segmented by Nature of Suit code and case category.' },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: 24, borderRadius: 2, border: '1px solid #E5E7EB', background: '#FFFFFF' }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#4B5563', fontFamily: 'var(--font-body)', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Browse by Circuit */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: 32 }}>
            Browse Judges by Circuit
          </h2>

          <div style={{ display: 'grid', gap: 20 }}>
            {CIRCUITS.map((circuit) => {
              const circuitJudges = allJudges.filter(j => {
                const d = circuit.districts.map(dd => dd.label);
                return d.some(dl => j.court.includes(dl.replace('District of ', '')));
              });
              return (
                <div key={circuit.name} style={{ padding: 24, borderRadius: 2, border: '1px solid #E5E7EB', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #E5E7EB' }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', margin: 0 }}>
                      {circuit.name}
                    </h3>
                    <span style={{ fontSize: 12, color: '#4B5563', fontFamily: 'var(--font-body)' }}>
                      {circuit.districts.length} district{circuit.districts.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                    {circuit.districts.map((d) => (
                      <Link key={d.code} href={`/judges/${d.code.toLowerCase()}`} className="judge-district-link">
                        <span>{d.label}</span>
                        <span className="arrow">View judges &rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '48px 32px', borderRadius: 2, border: '1px solid #E5E7EB', background: '#1B3A5C', textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
            All judge analytics are free during launch
          </h2>
          <p style={{ fontSize: 15, color: '#C7D1D8', fontFamily: 'var(--font-body)', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.6 }}>
            Full judge profiles with motion grant rates, ruling patterns, and case duration benchmarks — free for all users.
          </p>
          <Link
            href="/search"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 2, background: '#7C3AED',
              color: '#FFFFFF', fontSize: 16, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)',
            }}
          >
            Start Researching
            <ArrowRightIcon size={16} />
          </Link>
        </section>

        {/* Disclaimer */}
        <div style={{ padding: 24, border: '1px solid #E5E7EB', borderRadius: 2, background: '#FFFFFF' }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#212529', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
            Data Methodology
          </h3>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: '#4B5563', fontFamily: 'var(--font-body)', margin: 0 }}>
            Judge analytics are derived from publicly available federal court records and PACER data. Metrics include motion grant rates, case duration, plaintiff win rates, and settlement patterns. Data is updated periodically and covers active Article III judges in the 94 federal judicial districts. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
