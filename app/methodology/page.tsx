import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Methodology — MyCaseValue | How We Process Federal Court Data',
  description: 'Learn how MyCaseValue processes data from the Federal Judicial Center Integrated Database and CourtListener to provide aggregate federal court outcome statistics.',
  alternates: { canonical: 'https://www.mycasevalues.com/methodology' },
  openGraph: {
    title: 'Methodology — MyCaseValue',
    description: 'Learn how MyCaseValue processes and presents aggregate federal court outcome data with transparency.',
    url: 'https://www.mycasevalues.com/methodology',
    type: 'website',
  },
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-base) 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            TRANSPARENCY
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#111111', letterSpacing: '-1.5px' }}>
            Data Methodology
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#6B7280' }}>
            How MyCaseValue processes and presents aggregate outcome data from public federal court records.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose max-w-none">
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#111111' }}>Data Sources</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Federal Judicial Center — Integrated Database (IDB)',
                  description: 'The IDB contains case-level data for every federal civil case filed since 1970, maintained by the Federal Judicial Center as a public statistical resource. It includes case type (Nature of Suit code), final disposition, procedural progress, jurisdiction basis, and case duration. Currently contains 5.1M+ cases.',
                  badge: 'Primary Source',
                  color: '#111111',
                  url: 'https://www.fjc.gov/research/idb',
                },
                {
                  name: 'CourtListener (Free Law Project)',
                  description: 'We query the CourtListener API and RECAP Archive in real time to surface related federal court opinions and docket records alongside our aggregate outcome data. CourtListener covers 471 jurisdictions with 10M+ opinions and provides free access to PACER documents through the RECAP Archive.',
                  badge: 'Supplementary',
                  color: '#0D9488',
                  url: 'https://www.courtlistener.com/',
                },
                {
                  name: 'PACER (Public Access to Court Electronic Records)',
                  description: 'PACER is the federal judiciary\'s official electronic records system. Court filings, docket sheets, and case documents referenced in our dataset originate from PACER.',
                  badge: 'Reference',
                  color: '#9CA3AF',
                  url: 'https://pacer.uscourts.gov/',
                },
                {
                  name: 'Bureau of Justice Statistics (BJS)',
                  description: 'The BJS publishes benchmark civil trial statistics including verdict and settlement distributions, trial rates, and case processing times for federal and state courts.',
                  badge: 'Benchmark',
                  color: '#A78BFA',
                  url: 'https://bjs.ojp.gov/library/publications/civil-bench-and-jury-trials-state-courts-2005',
                },
                {
                  name: 'Administrative Office of U.S. Courts',
                  description: 'The AO publishes annual statistical tables on federal court caseloads, median disposition times, and case processing metrics used for our timeline and volume statistics.',
                  badge: 'Primary Source',
                  color: '#F59E0B',
                  url: 'https://www.uscourts.gov/statistics-reports',
                },
              ].map((source, i) => (
                <div key={i} className="p-5 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-base font-semibold m-0" style={{ color: '#111111' }}>{source.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: source.color + '15', color: source.color }}>
                      {source.badge}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed m-0 mb-2" style={{ color: '#6B7280' }}>{source.description}</p>
                  {source.url && (
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold transition-opacity hover:opacity-80" style={{ color: source.color }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      View Source
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#111827' }}>How We Process Data</h2>
            <div className="space-y-6">
              {[
                { step: '01', title: 'Ingestion', desc: 'Raw data is pulled from the FJC IDB (updated quarterly) and CourtListener API. Each record is validated for completeness and coded by Nature of Suit (NOS) classification.' },
                { step: '02', title: 'Classification', desc: 'Cases are grouped by NOS code (e.g., 442 for Employment Discrimination, 365 for Personal Injury). We map the 96 NOS codes to 20+ human-readable categories.' },
                { step: '03', title: 'Outcome Coding', desc: 'Final dispositions from the Administrative Office (AO) codes are categorized into outcomes: plaintiff verdict, defendant verdict, settlement, dismissal, transfer, or other. Win rates are calculated from judgment-level outcomes only.' },
                { step: '04', title: 'Aggregation', desc: 'Statistics are computed at multiple levels: national, circuit, state, and by NOS code. Confidence indicators are assigned based on sample size. We require a minimum of 100 cases for any published statistic.' },
                { step: '05', title: 'Quality Checks', desc: 'Automated validation checks for statistical anomalies, data completeness thresholds, and temporal consistency. Any NOS code with fewer than 100 total cases is flagged with reduced confidence.' },
              ].map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-data font-bold"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', color: '#fff' }}>
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold m-0 mb-1" style={{ color: '#111111' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed m-0" style={{ color: '#6B7280' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#111827' }}>Important Limitations</h2>
            <div className="p-5 rounded-xl border-l-4" style={{ borderColor: '#D97706', background: '#E5E7EB', color: '#6B7280' }}>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ margin: 0, paddingLeft: '1rem', color: '#6B7280' }}>
                <li>MyCaseValue displays <strong>aggregate historical data</strong> from public records. It does not evaluate, predict, or assess individual cases.</li>
                <li>Win rates reflect <strong>final dispositions coded by AO classifications</strong>, which may not capture the full complexity of case outcomes (e.g., partial victories, consent decrees).</li>
                <li>Settlement amounts are not systematically reported in federal court records. Recovery ranges are derived from cases where monetary awards were documented.</li>
                <li>Past outcomes do not predict future results. Every case has unique facts, parties, and circumstances.</li>
                <li>This tool is <strong>not legal advice</strong>. It does not create an attorney-client relationship. Always consult a licensed attorney.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#111827' }}>Dataset Coverage</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { v: '5.1M+', l: 'Federal cases', c: '#111111' },
                { v: '50+', l: 'Years of data', c: '#0D9488' },
                { v: '20+', l: 'Case categories', c: '#1A3260' },
                { v: '94', l: 'Federal districts', c: '#9CA3AF' },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
                  <div className="text-xl font-display font-extrabold" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-[11px] font-semibold mt-1" style={{ color: '#6B7280' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#111111' }}>Public Domain Status</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              All source data used by MyCaseValue is public domain under 17 U.S.C. § 105 (works of the United States government) or made freely available by the Free Law Project under open-access principles. MyCaseValue&apos;s proprietary contribution is in the aggregation, categorization, and presentation of this data — not in the underlying records themselves.
            </p>
          </section>

          {/* CTA */}
          <div className="text-center pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
            <p className="text-sm mb-4" style={{ color: '#6B7280' }}>Questions about our methodology?</p>
            <a href="mailto:support@mycasevalue.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: '#FFFFFF', border: '1px solid #334155', color: '#111111' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contact Us
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
