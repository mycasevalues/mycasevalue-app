import { Metadata } from 'next';
import Link from 'next/link';

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
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: 'var(--fg-primary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: 'var(--fg-primary)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            JUDGES
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px', fontFamily: 'var(--font-display)' }}>
            Judge Intelligence Profiles
          </h1>
          <p className="text-base leading-relaxed max-w-2xl sm:text-lg" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
            Research any federal judge's case history, motion success rates, and ruling patterns. Understanding your judge's track record helps you make informed litigation decisions.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Coming Soon Card */}
        <div className="p-8 rounded-xl border mb-8" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }}>
          <div className="flex items-start gap-4">
            <div className="text-3xl" style={{ color: 'var(--accent-primary)' }}>⚙️</div>
            <div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                Coming Soon
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
                We're currently loading comprehensive judge data from federal court records. Judge profiles, including ruling patterns, motion success rates, and case history, will be available soon. Be the first to know by joining our waitlist.
              </p>
              <Link href="/"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ background: 'var(--accent-primary)', color: 'var(--bg-base)' }}>
                Notify Me When Ready
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Input Placeholder */}
        <div className="mb-8">
          <label className="block text-xs font-semibold mb-2 uppercase tracking-[0.8px]" style={{ color: 'var(--fg-primary)' }}>
            Search Judges
          </label>
          <input
            type="text"
            placeholder="Enter judge name or court..."
            disabled
            className="w-full px-4 py-3 rounded-lg border text-sm transition-all"
            style={{
              borderColor: 'var(--border-default)',
              background: 'var(--bg-surface)',
              color: 'var(--fg-muted)',
              cursor: 'not-allowed',
            }}
          />
          <p className="text-[11px] mt-2" style={{ color: 'var(--fg-muted)' }}>
            Search functionality coming soon with full judge profiles.
          </p>
        </div>

        {/* Tier Info Card */}
        <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-base) 100%)' }}>
          <div className="flex items-start gap-3 mb-4">
            <div className="text-lg" style={{ color: 'var(--accent-secondary)' }}>⭐</div>
            <div>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                Unlimited+ Tier Required
              </h3>
              <p className="text-[11px] mt-1" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
                Full judge profiles, ruling pattern analysis, and motion success rates require an Unlimited+ subscription.
              </p>
            </div>
          </div>
          <Link href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: 'var(--accent-secondary)', color: 'var(--bg-base)' }}>
            Explore Plans
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-6 text-center mt-12" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
          Judge data is sourced from official federal court records and judicial opinions. This information is for research purposes only.
          This is not legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
