import { Metadata } from 'next';
import { SITS, STATES, TIMING_OPTS } from '../../lib/data';

export const metadata: Metadata = {
  title: 'Settlement Calculator | MyCaseValue',
  description: 'Use our settlement calculator to estimate your case value range based on federal court outcomes and historical settlement data.',
  alternates: { canonical: 'https://mycasevalues.com/calculator' },
  openGraph: {
    title: 'Settlement Calculator | MyCaseValue',
    description: 'Estimate your settlement range using federal court data.',
    type: 'website',
    url: 'https://mycasevalues.com/calculator',
  },
};

export default function CalculatorPage() {
  const caseTypes = SITS;
  const stateOptions = STATES.filter(s => s.id !== '');
  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { id: year.toString(), label: year.toString() };
  });

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
            CALCULATOR
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#111111', letterSpacing: '-1.5px' }}>
            Settlement Calculator
          </h1>
          <p className="text-base leading-relaxed max-w-2xl sm:text-lg" style={{ color: '#666666' }}>
            Estimate your settlement range based on federal court outcomes, your district, and case type. Our calculator uses data from 5.1M+ real federal cases to provide realistic estimates.
          </p>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8 gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: '#8B5CF6', color: '#FFFFFF' }}>
              1
            </div>
            <div className="flex-1 h-1" style={{ background: '#E5E0D8' }}></div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: '#E5E0D8', color: '#999999' }}>
              2
            </div>
            <div className="flex-1 h-1" style={{ background: '#E5E0D8' }}></div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: '#E5E0D8', color: '#999999' }}>
              3
            </div>
          </div>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.8px]" style={{ color: '#111111' }}>
            Step 1 of 3: Case Basics
          </p>
        </div>

        {/* Form Card */}
        <form className="p-8 rounded-xl border" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
          <div className="space-y-6">
            {/* Case Type */}
            <div>
              <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: '#111111' }}>
                Case Type
              </label>
              <select
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none"
                style={{
                  borderColor: '#E5E0D8',
                  background: '#FFFFFF',
                  color: '#111111',
                }}
              >
                <option value="">Select a case type...</option>
                {caseTypes.map(sit => (
                  <option key={sit.id} value={sit.id}>
                    {sit.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] mt-2" style={{ color: '#999999' }}>
                {caseTypes[0].sub}
              </p>
            </div>

            {/* Case Subcategory */}
            <div>
              <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: '#111111' }}>
                Specific Issue
              </label>
              <select
                defaultValue=""
                disabled
                className="w-full px-4 py-3 rounded-lg border text-sm transition-all"
                style={{
                  borderColor: '#E5E0D8',
                  background: '#F9F8F6',
                  color: '#999999',
                  cursor: 'not-allowed',
                }}
              >
                <option value="">Select case type first...</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: '#111111' }}>
                Federal District
              </label>
              <select
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none"
                style={{
                  borderColor: '#E5E0D8',
                  background: '#FFFFFF',
                  color: '#111111',
                }}
              >
                <option value="">Select your district...</option>
                {stateOptions.map(state => (
                  <option key={state.id} value={state.id}>
                    {state.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] mt-2" style={{ color: '#999999' }}>
                This affects win rates and settlement ranges in your results.
              </p>
            </div>

            {/* Year Filed */}
            <div>
              <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: '#111111' }}>
                Year Case Filed
              </label>
              <select
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none"
                style={{
                  borderColor: '#E5E0D8',
                  background: '#FFFFFF',
                  color: '#111111',
                }}
              >
                <option value="">Select year...</option>
                {yearOptions.map(year => (
                  <option key={year.id} value={year.id}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: '#E5E0D8' }}>
            <button
              type="button"
              className="w-full px-6 py-3 rounded-lg text-sm font-semibold transition-all text-white"
              style={{ background: '#8B5CF6' }}
            >
              Continue to Next Step
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-2" style={{ marginBottom: '2px' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </form>

        {/* Legal Disclaimer */}
        <div className="mt-8 p-6 rounded-xl border" style={{ borderColor: '#E5E0D8', background: '#FFFFFF' }}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.8px] mb-3" style={{ color: '#111111' }}>
            Important Disclaimer
          </h3>
          <p className="text-[11px] leading-relaxed" style={{ color: '#666666' }}>
            The Settlement Calculator provides estimates based on historical aggregate data from federal court records. These are statistical approximations and not predictions. Actual settlement amounts vary significantly based on case facts, legal representation, evidence quality, and many other factors. This calculator is not legal advice. Do not rely on these estimates as a substitute for consulting with a qualified attorney. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-6 text-center mt-12" style={{ borderColor: '#E5E0D8' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: '#999999' }}>
          This calculator uses aggregate federal court data for educational purposes only.
          This is not legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
