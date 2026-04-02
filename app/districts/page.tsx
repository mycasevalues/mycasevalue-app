import { Metadata } from 'next';
import { STATES } from '../../lib/data';

export const metadata: Metadata = {
  title: 'Federal Court Outcomes by District | MyCaseValue',
  description: 'Explore federal court outcomes across all 94 federal judicial districts. Research case results by district and state.',
  alternates: { canonical: 'https://mycasevalues.com/districts' },
  openGraph: {
    title: 'Federal Court Outcomes by District | MyCaseValue',
    description: 'Explore federal court outcomes across all 94 federal judicial districts.',
    type: 'website',
    url: 'https://mycasevalues.com/districts',
  },
};

export default function DistrictsPage() {
  // Filter out "All states" and organize districts by state
  const stateList = STATES.filter(s => s.id !== '');

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F8F6 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: 'var(--fg-primary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            DISTRICTS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#111111', fontFamily: 'var(--font-display)', letterSpacing: '-1.5px' }}>
            Federal Court Outcomes by District
          </h1>
          <p className="text-base leading-relaxed max-w-2xl sm:text-lg" style={{ color: 'var(--fg-muted)' }}>
            The federal court system is divided into 94 judicial districts spanning all 50 states, Washington D.C., and U.S. territories. Each district has its own judges, caseload, and outcome patterns. Explore outcomes across districts to understand regional variations in case results and settlement patterns.
          </p>
        </div>
      </div>

      {/* Districts Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stateList.map((state) => (
            <a
              key={state.id}
              href={`/outcomes/${state.id}/employment-discrimination`}
              className="group p-5 rounded-xl border transition-all hover:shadow-md hover:border-opacity-100"
              style={{
                borderColor: 'var(--border-default)',
                background: 'var(--bg-surface)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>
                    {state.label}
                  </h3>
                  <p className="text-[11px] mt-1" style={{ color: 'var(--fg-subtle)' }}>
                    {state.id}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>
                Employment discrimination outcomes
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--fg-subtle)' }}>
          MyCaseValue provides aggregate historical data from public federal court records for informational and research purposes only.
          We are not a law firm. This is not legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
