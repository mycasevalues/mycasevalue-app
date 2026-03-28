import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology — MyCaseValue | How We Process Federal Court Data',
  description: 'Learn how MyCaseValue processes data from the Federal Judicial Center Integrated Database and CourtListener to provide aggregate federal court outcome statistics.',
  alternates: { canonical: 'https://mycasevalues.com/methodology' },
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F7FA' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#E2E8F0', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#4F46E5' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: '#E4E5FF', color: '#4F46E5' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            TRANSPARENCY
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#0F172A', letterSpacing: '-1.5px' }}>
            Data Methodology
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            How MyCaseValue processes and presents aggregate outcome data from public federal court records.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-slate max-w-none">
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#0F172A' }}>Data Sources</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Federal Judicial Center — Integrated Database (IDB)',
                  description: 'The IDB contains case-level data for every federal civil case filed since 1970, maintained by the Federal Judicial Center as a public statistical resource. It includes case type (Nature of Suit code), final disposition, procedural progress, jurisdiction basis, and case duration.',
                  badge: 'Primary Source',
                  color: '#4F46E5',
                },
                {
                  name: 'CourtListener (Free Law Project)',
                  description: 'CourtListener aggregates judicial opinions, oral arguments, and PACER data into an open, searchable database. We use opinion data for supplementary analysis on case complexity and judicial reasoning.',
                  badge: 'Supplementary',
                  color: '#0D9488',
                },
                {
                  name: 'PACER (Public Access to Court Electronic Records)',
                  description: 'PACER is the federal judiciary\'s electronic records system. Court filings, docket sheets, and case documents referenced in our dataset originate from PACER.',
                  badge: 'Reference',
                  color: '#64748B',
                },
                {
                  name: 'Google Scholar',
                  description: 'MyCaseValue cross-references legal scholarship from Google Scholar to provide context on legal trends, key precedents, and scholarly analysis relevant to each case category. This supplementary source enriches case data with academic and expert perspectives.',
                  badge: 'Supplementary',
                  color: '#0D9488',
                },
              ].map((source, i) => (
                <div key={i} className="p-5 rounded-xl border" style={{ borderColor: '#E2E8F0', background: '#FFFFFF' }}>
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-base font-semibold m-0" style={{ color: '#0F172A' }}>{source.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: source.color + '15', color: source.color }}>
                      {source.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed m-0">{source.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#0F172A' }}>How We Process Data</h2>
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
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', color: '#fff' }}>
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold m-0 mb-1" style={{ color: '#0F172A' }}>{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed m-0">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#0F172A' }}>Important Limitations</h2>
            <div className="p-5 rounded-xl border-l-4" style={{ borderColor: '#D97706', background: '#FFFBEB' }}>
              <ul className="space-y-3 text-sm text-slate-600 leading-relaxed" style={{ margin: 0, paddingLeft: '1rem' }}>
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
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#0F172A' }}>Dataset Coverage</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { v: '4.2M+', l: 'Federal cases', c: '#4F46E5' },
                { v: '50+', l: 'Years of data', c: '#0D9488' },
                { v: '20+', l: 'Case categories', c: '#1A3260' },
                { v: '94', l: 'Federal districts', c: '#64748B' },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 rounded-xl border" style={{ borderColor: '#E2E8F0', background: '#FFFFFF' }}>
                  <div className="text-xl font-display font-extrabold" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-[11px] text-slate-400 font-semibold mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#0F172A' }}>Public Domain Status</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              All source data used by MyCaseValue is public domain under 17 U.S.C. § 105 (works of the United States government) or made freely available by the Free Law Project under open-access principles. MyCaseValue&apos;s proprietary contribution is in the aggregation, categorization, and presentation of this data — not in the underlying records themselves.
            </p>
          </section>

          {/* CTA */}
          <div className="text-center pt-8 border-t" style={{ borderColor: '#E2E8F0' }}>
            <p className="text-sm text-slate-400 mb-4">Questions about our methodology?</p>
            <a href="mailto:support@mycasevalue.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#4F46E5' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: '#E2E8F0' }}>
        <p className="text-[11px] text-slate-400 max-w-xl mx-auto px-6">
          MyCaseValue provides aggregate historical data from public federal court records for informational purposes only.
          Not legal advice. No attorney-client relationship. © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
