import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Judge Intelligence Profiles | MyCaseValue',
  description: 'Research any federal judge\'s case history, motion success rates, and ruling patterns. Access judge intelligence profiles.',
  alternates: { canonical: 'https://mycasevalues.com/judges' },
  openGraph: {
    title: 'Judge Intelligence Profiles | MyCaseValue',
    description: 'Research any federal judge\'s case history, motion success rates, and ruling patterns.',
    type: 'website',
    url: 'https://mycasevalues.com/judges',
  },
};

export default function JudgesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F9F8F6' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#E5E0D8', background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F8F6 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#111111' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            JUDGES
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#111111', letterSpacing: '-1.5px' }}>
            Judge Intelligence Profiles
          </h1>
          <p className="text-base leading-relaxed max-w-2xl sm:text-lg" style={{ color: '#666666' }}>
            Research any federal judge's case history, motion success rates, and ruling patterns. Understanding your judge's track record helps you make informed litigation decisions.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Coming Soon Card */}
        <div className="p-8 rounded-xl border mb-8" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
          <div className="flex items-start gap-4">
            <div className="text-3xl" style={{ color: '#8B5CF6' }}>⚙️</div>
            <div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                Coming Soon
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                We're currently loading comprehensive judge data from federal court records. Judge profiles, including ruling patterns, motion success rates, and case history, will be available soon. Be the first to know by joining our waitlist.
              </p>
              <a href="/"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ background: '#111111', color: '#FFFFFF' }}>
                Notify Me When Ready
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Search Input Placeholder */}
        <div className="mb-8">
          <label className="block text-xs font-semibold mb-2 uppercase tracking-[0.8px]" style={{ color: '#111111' }}>
            Search Judges
          </label>
          <input
            type="text"
            placeholder="Enter judge name or court..."
            disabled
            className="w-full px-4 py-3 rounded-lg border text-sm transition-all"
            style={{
              borderColor: '#E5E0D8',
              background: '#FFFFFF',
              color: '#999999',
              cursor: 'not-allowed',
            }}
          />
          <p className="text-[11px] mt-2" style={{ color: '#999999' }}>
            Search functionality coming soon with full judge profiles.
          </p>
        </div>

        {/* Tier Info Card */}
        <div className="p-6 rounded-xl border" style={{ borderColor: '#E5E0D8', background: 'linear-gradient(135deg, #FFFFFF 0%, #F9F8F6 100%)' }}>
          <div className="flex items-start gap-3 mb-4">
            <div className="text-lg" style={{ color: '#8B5CF6' }}>⭐</div>
            <div>
              <h3 className="font-semibold text-sm" style={{ color: '#111111' }}>
                Unlimited+ Tier Required
              </h3>
              <p className="text-[11px] mt-1" style={{ color: '#666666' }}>
                Full judge profiles, ruling pattern analysis, and motion success rates require an Unlimited+ subscription.
              </p>
            </div>
          </div>
          <a href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: '#8B5CF6', color: '#FFFFFF' }}>
            Explore Plans
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-6 text-center mt-12" style={{ borderColor: '#E5E0D8' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: '#999999' }}>
          Judge data is sourced from official federal court records and judicial opinions. This information is for research purposes only.
          This is not legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
