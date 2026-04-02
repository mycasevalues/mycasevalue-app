/**
 * ServerHero.tsx — Server Component
 * Renders meaningful, SEO-friendly HTML for the homepage.
 * This component renders server-side and is hidden once the interactive client component loads.
 */

export default function ServerHero() {
  return (
    <section className="server-hero-content" aria-label="Hero section">
      {/* Hero Content */}
      <div
        className="hero-container py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: '#F9F8F6',
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Badge/Trust Indicator */}
          <div className="flex items-center justify-center mb-8 sm:mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{
                borderColor: 'rgba(64, 64, 242, 0.25)',
                background: 'rgba(64, 64, 242, 0.08)',
              }}
            >
              <span
                className="text-xs sm:text-sm font-medium tracking-wide"
                style={{
                  color: '#111111',
                  letterSpacing: '0.5px',
                }}
              >
                Built on PACER &middot; FJC &middot; CourtListener data
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight"
            style={{
              fontFamily: '"Outfit", system-ui, sans-serif',
              color: '#111827',
            }}
          >
            <span>The settlement data</span>
            <br />
            <span>the other side already has.</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #111111, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Now you have it too.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl text-center mx-auto mb-10 sm:mb-12 max-w-2xl"
            style={{
              color: '#6B7280',
              fontFamily: '"Outfit", system-ui, sans-serif',
              lineHeight: '1.6',
            }}
          >
            Research real outcomes from <strong>5.1M+ federal court cases</strong> across 94 districts. Win rates, settlement ranges,
            timelines, and judge analytics — sourced from public court records.
          </p>

          {/* Privacy Assurance */}
          <div
            className="flex items-center justify-center mb-10 sm:mb-12"
            style={{
              color: '#0D9488',
              fontSize: '14px',
              fontFamily: '"Outfit", system-ui, sans-serif',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Private & encrypted — zero data stored</span>
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center mb-12 sm:mb-16">
            <button type="button"
              className="px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                background: 'linear-gradient(135deg, #111111, #3535D0)',
                color: '#111827',
                borderRadius: '12px',
                fontFamily: '"Outfit", system-ui, sans-serif',
                cursor: 'pointer',
              }}
              disabled
            >
              Calculate Your Case Value
            </button>
          </div>
        </div>
      </div>

      {/* Trust Stats Bar */}
      <div
        className="trust-bar-wrapper"
        style={{
          background: '#F9F8F6',
          borderTop: '1px solid rgba(51, 65, 85, 0.4)',
          borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {/* Stat 1: Cases Analyzed */}
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                  fontFamily: '"JetBrains Mono", "Courier New", monospace',
                  color: '#111111',
                  letterSpacing: '-0.5px',
                }}
              >
                5.1M+
              </div>
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  fontFamily: '"Outfit", system-ui, sans-serif',
                  color: '#6B7280',
                  letterSpacing: '0.5px',
                }}
              >
                Federal Cases Analyzed
              </div>
            </div>

            {/* Stat 2: Districts */}
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                  fontFamily: '"JetBrains Mono", "Courier New", monospace',
                  color: '#111111',
                  letterSpacing: '-0.5px',
                }}
              >
                94
              </div>
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  fontFamily: '"Outfit", system-ui, sans-serif',
                  color: '#6B7280',
                  letterSpacing: '0.5px',
                }}
              >
                Federal Districts
              </div>
            </div>

            {/* Stat 3: Years of Data */}
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                  fontFamily: '"JetBrains Mono", "Courier New", monospace',
                  color: '#111111',
                  letterSpacing: '-0.5px',
                }}
              >
                50+
              </div>
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  fontFamily: '"Outfit", system-ui, sans-serif',
                  color: '#6B7280',
                  letterSpacing: '0.5px',
                }}
              >
                Years of Data
              </div>
            </div>

            {/* Stat 4: Case Types */}
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                  fontFamily: '"JetBrains Mono", "Courier New", monospace',
                  color: '#111111',
                  letterSpacing: '-0.5px',
                }}
              >
                84
              </div>
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  fontFamily: '"Outfit", system-ui, sans-serif',
                  color: '#6B7280',
                  letterSpacing: '0.5px',
                }}
              >
                Case Types Covered
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources & Citations */}
      <div
        className="sources-section py-8 sm:py-10 px-4 sm:px-6 lg:px-8"
        style={{
          background: '#F9F8F6',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="text-center text-xs sm:text-sm"
            style={{
              color: '#9CA3AF',
            }}
          >
            <p className="mb-3">
              <strong>Verified Data Sources:</strong> Federal Judicial Center Integrated Database (FJCID), PACER (Public Access to Court Electronic Records), and CourtListener. All data is derived from public federal court records.
            </p>
            <p>
              Data updated April 2026. Learn more about our{' '}
              <a
                href="#methodology"
                style={{
                  color: '#111111',
                  textDecoration: 'underline',
                }}
              >
                methodology
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Accessibility & Semantic Enhancement */}
      <noscript>
        <p style={{ color: '#6B7280', textAlign: 'center', padding: '20px' }}>
          Please enable JavaScript to use MyCaseValue. Our interactive features require JavaScript to function properly.
        </p>
      </noscript>
    </section>
  );
}
