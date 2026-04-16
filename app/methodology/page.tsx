import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Methodology',
  description: 'Learn how MyCaseValue processes data from FJC IDB, PACER, and CourtListener. Transparent methodology for 5.1M+ case outcome statistics.',
  alternates: { canonical: `${SITE_URL}/methodology` },
  openGraph: {
    title: 'Methodology',
    description: 'Learn how MyCaseValue processes and presents aggregate federal court outcome data with transparency.',
    url: `${SITE_URL}/methodology`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue Methodology' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Methodology — MyCaseValue | How We Process Federal Court Data',
    description: 'Learn how MyCaseValue processes data from the Federal Judicial Center Integrated Database and CourtListener to provide aggregate federal court outcome statistics.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      <style>{`
        .source-card {
          transition: all 0.3s ease;
          border: 1px solid var(--border-default);
        }
        .source-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.08);
        }
        .timeline-item {
          display: flex;
          gap: 1.5rem;
          position: relative;
          padding-bottom: 2rem;
        }
        .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 1rem;
          top: 3.5rem;
          width: 2px;
          height: calc(100% - 2rem);
          background-color: var(--border-default);
        }
        .timeline-number {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: var(--accent-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }
        .coverage-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 640px) {
          .coverage-grid {
            grid-template-columns: 1fr;
          }
        }
        .stat-card {
          padding: 1.5rem;
          border: 1px solid var(--border-default);
          border-radius: 12px;
          background: var(--color-surface-0);
          text-align: center;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          border-color: var(--color-text-secondary);
          transform: translateY(-2px);
        }
        .limitation-callout {
          border-left: 3px solid #F59E0B;
          background: rgba(234,179,8,0.08);
          padding: 1.5rem;
          border-radius: 12px;
        }
        .public-domain-callout {
          border-left: 3px solid #1e40af;
          background: #F0F9FF;
          padding: 1.5rem;
          border-radius: 12px;
        }
        .at-a-glance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .at-a-glance-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .at-a-glance-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }
        .at-a-glance-card {
          padding: 1.25rem;
          border: 2px solid var(--border-default);
          border-radius: 12px;
          background: var(--color-surface-0);
          text-align: center;
        }
        .at-a-glance-stat {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
          font-family: var(--font-inter, 'Inter', sans-serif);
        }
        .at-a-glance-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6B7280;
          font-family: var(--font-inter, 'Inter', sans-serif);
        }
        .confidence-tiers {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        @media (min-width: 768px) {
          .confidence-tiers {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .confidence-tier {
          padding: 1.5rem;
          border: 1px solid var(--border-default);
          border-radius: 12px;
          background: var(--color-surface-0);
          text-align: center;
        }
        .confidence-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .confidence-label {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--color-text-primary);
        }
        .confidence-desc {
          font-size: 0.75rem;
          color: #6B7280;
          margin-bottom: 0.5rem;
        }
        .confidence-threshold {
          font-size: 0.7rem;
          font-weight: 600;
          font-family: var(--font-mono, 'monospace');
          color: var(--color-text-secondary);
          background: var(--color-surface-1);
          padding: 0.5rem;
          border-radius: 12px;
        }
        .stats-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1.5rem;
        }
        .stats-table th {
          border-bottom: 2px solid var(--accent-primary);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--color-text-primary);
          font-family: var(--font-inter, 'Inter', sans-serif);
        }
        .stats-table td {
          border-bottom: 1px solid var(--border-default);
          padding: 1rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }
        .stats-table tr:hover {
          background: var(--color-surface-1);
        }
        .stats-stat-name {
          font-weight: 600;
          color: var(--color-text-primary);
          font-family: var(--font-inter, 'Inter', sans-serif);
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        @media (min-width: 768px) {
          .related-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .related-card {
          padding: 1.5rem;
          border: 1px solid var(--border-default);
          border-radius: 12px;
          background: var(--color-surface-0);
          text-align: center;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
        }
        .related-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.08);
          transform: translateY(-2px);
        }
        .related-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
        .related-title {
          font-weight: 600;
          font-size: 0.875rem;
          color: #1e40af;
          font-family: var(--font-inter, 'Inter', sans-serif);
        }
      `}</style>

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'var(--accent-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 mb-6 text-[11px]" style={{ color: '#CCCCCC' }}>
            <a href="/" className="transition-colors hover:text-white" style={{ color: '#CCCCCC' }}>Home</a>
            <span>/</span>
            <span style={{ color: 'var(--color-surface-0)' }}>Methodology</span>
          </nav>

          {/* Badge and Title */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(239,68,68,0.08)', color: 'var(--accent-primary)', borderRadius: '9999px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>
            METHODOLOGY
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--color-surface-0)', letterSpacing: '-1.5px' }}>
            Methodology
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: '#CCCCCC' }}>
            Data processing, classification methodology, and quality standards.
          </p>
        </div>
      </div>

      {/* Data Coverage at a Glance */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-1)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <h2 className="text-lg font-display font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>Data Coverage at a Glance</h2>
          <div className="at-a-glance-grid">
            {[
              { stat: '5.1M+', label: 'Federal Cases' },
              { stat: '84', label: 'NOS Case Types' },
              { stat: '95', label: 'Federal Districts' },
              { stat: '13', label: 'Circuit Courts' },
              { stat: '55+', label: 'Years of Data' },
              { stat: 'Quarterly', label: 'Update Frequency' },
            ].map((item, i) => (
              <div key={i} className="at-a-glance-card">
                <div className="at-a-glance-stat">{item.stat}</div>
                <div className="at-a-glance-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Section 1: Processing Pipeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>How We Process Data</h2>
          <div>
            {[
              { step: '1', title: 'Ingestion', desc: 'Raw data is pulled from the FJC IDB (updated quarterly) and CourtListener API. Each record is validated for completeness and coded by Nature of Suit (NOS) classification.' },
              { step: '2', title: 'Classification', desc: 'Cases are grouped by NOS code (e.g., 442 for Employment Discrimination, 365 for Personal Injury). We map the 96 NOS codes to 20+ human-readable categories.' },
              { step: '3', title: 'Outcome Coding', desc: 'Final dispositions from the Administrative Office (AO) codes are categorized into outcomes: plaintiff verdict, defendant verdict, settlement, dismissal, transfer, or other. Win rates are calculated from judgment-level outcomes only.' },
              { step: '4', title: 'Aggregation', desc: 'Statistics are computed at multiple levels: national, circuit, state, and by NOS code. Confidence indicators are assigned based on sample size. We require a minimum of 100 cases for any published statistic.' },
              { step: '5', title: 'Quality Checks', desc: 'Automated validation checks for statistical anomalies, data completeness thresholds, and temporal consistency. Any NOS code with fewer than 100 total cases is flagged with reduced confidence.' },
            ].map((s, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-number">{s.step}</div>
                <div className="pt-0.5">
                  <h3 className="text-base font-display font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--color-text-secondary)' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Data Sources */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                name: 'Federal Judicial Center — Integrated Database (IDB)',
                description: 'The IDB contains case-level data for every federal civil case filed since 1970, maintained by the Federal Judicial Center as a public statistical resource. It includes case type (Nature of Suit code), final disposition, procedural progress, jurisdiction basis, and case duration. Currently contains 5.1M+ cases.',
                badge: 'Primary Source',
                color: 'var(--color-text-primary)',
                url: 'https://www.fjc.gov/research/idb',
                icon: 'database'
              },
              {
                name: 'CourtListener (Free Law Project)',
                description: 'We query the CourtListener API and RECAP Archive in real time to surface related federal court opinions and docket records alongside our aggregate outcome data. CourtListener covers 471 jurisdictions with 10M+ opinions.',
                badge: 'Supplementary',
                color: '#34d399',
                url: 'https://www.courtlistener.com/',
                icon: 'scale'
              },
              {
                name: 'PACER (Public Access to Court Electronic Records)',
                description: 'PACER is the federal judiciary\'s official electronic records system. Court filings, docket sheets, and case documents referenced in our dataset originate from PACER.',
                badge: 'Reference',
                color: '#C0C4C8',
                url: 'https://pacer.uscourts.gov/',
                icon: 'files'
              },
              {
                name: 'Bureau of Justice Statistics (BJS)',
                description: 'The BJS publishes benchmark civil trial statistics including verdict and settlement distributions, trial rates, and case processing times for federal and state courts.',
                badge: 'Benchmark',
                color: 'var(--accent-primary)',
                url: 'https://bjs.ojp.gov/library/publications/civil-bench-and-jury-trials-state-courts-2005',
                icon: 'chart'
              },
              {
                name: 'Administrative Office of U.S. Courts',
                description: 'The AO publishes annual statistical tables on federal court caseloads, median disposition times, and case processing metrics used for our timeline and volume statistics.',
                badge: 'Primary Source',
                color: '#B86E00',
                url: 'https://www.uscourts.gov/statistics-reports',
                icon: 'building'
              },
            ].map((source, i) => (
              <div key={i} className="source-card p-5 bg-[#111827]" style={{ borderRadius: '12px' }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-2xl flex-shrink-0">
                    {source.icon === 'database' && '-'}
                    {source.icon === 'scale' && '-'}
                    {source.icon === 'files' && '-'}
                    {source.icon === 'chart' && '-'}
                    {source.icon === 'building' && '-'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-display font-semibold m-0 mb-1" style={{ color: 'var(--color-text-primary)' }}>{source.name}</h3>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5" style={{ background: source.color.replace('#', '#').substring(0, 7) + '1F', color: source.color, borderRadius: '9999px' }}>
                      {source.badge}
                    </span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed m-0 mb-3" style={{ color: 'var(--color-text-secondary)' }}>{source.description}</p>
                {source.url && (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold transition-opacity hover:opacity-70" style={{ color: source.color }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Visit Source
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Data Accuracy & Confidence */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>Data Accuracy & Confidence</h2>

          <div className="mb-8">
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              We assign confidence levels to our statistics based on sample size. A larger dataset provides more reliable and stable estimates of outcomes. Confidence levels indicate how much we trust the statistical measures for a particular case type, jurisdiction, or aggregation level.
            </p>
          </div>

          <div className="confidence-tiers">
            {[
              { iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', label: 'High Confidence', desc: 'Robust sample', threshold: '1,000+ cases' },
              { iconPath: 'M12 9v2m0 4v2m0 0v2M7 9h.01M17 9h.01M7 13h.01M17 13h.01M7 17h.01M17 17h.01', label: 'Medium Confidence', desc: 'Adequate sample', threshold: '100–999 cases' },
              { iconPath: 'M15 19l-7-7 7-7', label: 'Low Confidence', desc: 'Limited sample', threshold: '< 100 cases' },
            ].map((tier, i) => (
              <div key={i} className="confidence-tier">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="confidence-icon">
                  <path d={tier.iconPath}/>
                </svg>
                <div className="confidence-label">{tier.label}</div>
                <div className="confidence-desc">{tier.desc}</div>
                <div className="confidence-threshold">{tier.threshold}</div>
              </div>
            ))}
          </div>

          <div className="limitation-callout mt-8">
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>Known Limitations:</p>
            <ul className="space-y-2 text-sm m-0 pl-4" style={{ color: 'var(--color-text-secondary)' }}>
              <li><strong>Sealed settlements</strong> are not captured in public court records.</li>
              <li><strong>Pro se case outcomes</strong> may be underrepresented in aggregate statistics.</li>
              <li><strong>Multi-district litigation</strong> is counted per district, which may inflate case counts for coordinated actions.</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Dataset Coverage */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>Dataset Coverage</h2>
          <div className="coverage-grid">
            {[
              { v: '5.1M+', l: 'Federal Cases', c: 'var(--color-text-primary)' },
              { v: '55+', l: 'Years of Data', c: '#059669' },
              { v: '20+', l: 'Case Categories', c: 'var(--accent-primary)' },
              { v: '95', l: 'Federal Districts', c: 'var(--accent-primary-hover)' },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="text-3xl sm:text-4xl font-display font-extrabold mb-2" style={{ color: stat.c }}>{stat.v}</div>
                <div className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Frequently Cited Statistics */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>Frequently Cited Statistics</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            These five metrics are the most commonly referenced on MyCaseValue. Each has a specific calculation method rooted in federal court records and administrative classifications.
          </p>
          <table className="stats-table">
            <thead>
              <tr>
                <th>Statistic</th>
                <th>Definition & Methodology</th>
                <th>Data Source & Limitations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="stats-stat-name">Win Rate</span></td>
                <td>Percentage of cases resolved by plaintiff verdict (judgment) divided by all judgment-level dispositions (excluding settlements, dismissals, transfers).</td>
                <td>AO disposition codes only; does not include consent decrees, partial settlements, or default judgments.</td>
              </tr>
              <tr>
                <td><span className="stats-stat-name">Settlement Rate</span></td>
                <td>Percentage of cases concluding with a settlement disposition code (AO code range 5xx) out of all closed cases.</td>
                <td>Settlement identification relies on administrative codes; actual settlement amounts are not systematically reported and thus not included.</td>
              </tr>
              <tr>
                <td><span className="stats-stat-name">Median Recovery</span></td>
                <td>Middle value of documented monetary awards in cases with recoveries {'>'} $0. Excludes non-monetary outcomes.</td>
                <td>Recovery data sourced from docket entries in PACER; civil rights and statutory damages cases may have missing recovery data.</td>
              </tr>
              <tr>
                <td><span className="stats-stat-name">Case Duration</span></td>
                <td>Median calendar time (in months) from case filing date to final disposition date, across all case types.</td>
                <td>FJC IDB date fields; does not account for tolled periods, stayed cases, or post-judgment motions.</td>
              </tr>
              <tr>
                <td><span className="stats-stat-name">Dismissal Rate</span></td>
                <td>Percentage of cases terminated by dismissal (motion to dismiss, Rule 12 dismissal, summary judgment) divided by all closed cases.</td>
                <td>Includes dismissals with and without prejudice; does not distinguish between procedural dismissals and meritorious denials.</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 6: Limitations */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>Important Limitations</h2>
          <div className="limitation-callout">
            <ul className="space-y-3 text-sm leading-relaxed m-0 pl-4" style={{ color: 'var(--color-text-secondary)' }}>
              <li>MyCaseValue displays <strong style={{ color: 'var(--color-text-primary)' }}>aggregate historical data</strong> from public records. It does not evaluate, predict, or assess individual cases.</li>
              <li>Win rates reflect <strong style={{ color: 'var(--color-text-primary)' }}>final dispositions coded by AO classifications</strong>, which may not capture the full complexity of case outcomes (e.g., partial victories, consent decrees).</li>
              <li>Settlement amounts are not systematically reported in federal court records. Recovery ranges are derived from cases where monetary awards were documented.</li>
              <li>Past outcomes do not predict future results. Every case has unique facts, parties, and circumstances.</li>
              <li>This tool is <strong style={{ color: 'var(--color-text-primary)' }}>not legal advice</strong>. It does not create an attorney-client relationship. Always consult a licensed attorney.</li>
            </ul>
          </div>
        </section>

        {/* Section 7: Public Domain */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>Public Domain Status</h2>
          <div className="public-domain-callout">
            <p className="text-sm leading-relaxed m-0" style={{ color: '#003d5c' }}>
              All source data used by MyCaseValue is public domain under 17 U.S.C. § 105 (works of the United States government) or made freely available by the Free Law Project under open-access principles. MyCaseValue's proprietary contribution is in the aggregation, categorization, and presentation of this data — not in the underlying records themselves.
            </p>
          </div>
        </section>

        {/* Section 8: Related Pages */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>Related Pages</h2>
          <div className="related-grid">
            {[
              { href: '/faq', iconPath: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', title: 'FAQ' },
              { href: '/glossary', iconPath: 'M12 6.253v13m0-13C6.5 6.253 2 10.058 2 15s4.5 8.747 10 8.747m0-13c5.5 0 10 4.058 10 9s-4.5 8.747-10 8.747M9 9h.01M15 9h.01M9 15h.01M15 15h.01', title: 'Glossary' },
              { href: '/about', iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', title: 'About Us' },
              { href: '/nos-explorer', iconPath: 'M12 6.253v13m0-13C6.5 6.253 2 10.058 2 15s4.5 8.747 10 8.747m0-13c5.5 0 10 4.058 10 9s-4.5 8.747-10 8.747M12 2l3 5-3 5-3-5 3-5z', title: 'NOS Explorer' },
            ].map((link, i) => (
              <Link key={i} href={link.href}>
                <div className="related-card">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="related-icon">
                    <path d={link.iconPath}/>
                  </svg>
                  <div className="related-title">{link.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-12 border-t" style={{ borderColor: 'var(--border-default)' }}>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>Questions about our methodology?</p>
          <a href="mailto:support@mycasevalues.com"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
            style={{ borderRadius: '20px', background: 'var(--accent-primary)', color: 'var(--color-surface-0)', border: '1px solid var(--accent-primary)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
