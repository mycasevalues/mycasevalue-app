import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Results | MyCaseValue',
  description: 'View detailed case results and outcomes from the MyCaseValue database.',
  alternates: { canonical: 'https://mycasevalues.com/results' },
  openGraph: {
    title: 'Case Results | MyCaseValue',
    description: 'View detailed case results and outcomes from the MyCaseValue database.',
    type: 'website',
    url: 'https://mycasevalues.com/results',
  },
};

export default function ResultsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F9F8F6' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#E5E0D8', background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F8F6 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#111111' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#111111', letterSpacing: '-1.5px' }}>
            Case Results
          </h1>
          <p className="text-base leading-relaxed max-w-2xl sm:text-lg" style={{ color: '#666666' }}>
            Select a case type and district to see detailed outcome data from federal court records.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Empty State Card */}
        <div className="p-8 rounded-xl border text-center" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
          <div className="text-4xl mb-4" style={{ color: '#8B5CF6' }}>📊</div>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#111111' }}>
            No Results Selected
          </h2>
          <p className="text-sm mb-6" style={{ color: '#666666' }}>
            Select a case type and district to see detailed results including win rates, settlement ranges, average awards, and case timelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all"
              style={{ background: '#8B5CF6', color: '#FFFFFF' }}>
              Use Settlement Calculator
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all border"
              style={{ borderColor: '#E5E0D8', background: '#FFFFFF', color: '#111111' }}>
              Browse by Type
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="p-5 rounded-xl border" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: '#111111' }}>
              Win Rates & Outcomes
            </h3>
            <p className="text-[11px] leading-relaxed" style={{ color: '#666666' }}>
              Percentage of cases won, settled, or dismissed by outcome type.
            </p>
          </div>
          <div className="p-5 rounded-xl border" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: '#111111' }}>
              Settlement Ranges
            </h3>
            <p className="text-[11px] leading-relaxed" style={{ color: '#666666' }}>
              Median and average settlement amounts for your case type.
            </p>
          </div>
          <div className="p-5 rounded-xl border" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: '#111111' }}>
              Case Duration
            </h3>
            <p className="text-[11px] leading-relaxed" style={{ color: '#666666' }}>
              Average time from filing to resolution.
            </p>
          </div>
          <div className="p-5 rounded-xl border" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: '#111111' }}>
              Regional Variation
            </h3>
            <p className="text-[11px] leading-relaxed" style={{ color: '#666666' }}>
              How outcomes differ across federal districts.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-6 text-center mt-12" style={{ borderColor: '#E5E0D8' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: '#999999' }}>
          All results are based on aggregate data from official federal court records.
          This is not legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
