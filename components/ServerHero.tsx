/**
 * ServerHero.tsx — Server Component (Phase 4)
 * Two-column hero: text left, live widget placeholder right.
 * SEO-friendly SSR content, hidden once the client component loads.
 * Paper Design System: Montserrat headings, Roboto body, PT Mono data.
 */

import QuickLookupForm from './QuickLookupForm';
import HeroStats from './ui/HeroStats';

export default function ServerHero() {
  return (
    <section className="server-hero-content" aria-label="Hero section">
      {/* ── HERO ─────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--bg-base)',
          padding: '48px 24px 0',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '48px',
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            {/* LEFT — Copy */}
            <div>
              {/* Trust badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  background: 'var(--accent-primary-subtle)',
                  border: '1px solid var(--accent-primary-border)',
                  marginBottom: '24px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--fg-secondary)',
                  letterSpacing: '0.03em',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Built on PACER &middot; FJC &middot; CourtListener data
              </div>

              {/* Headline */}
              <h1
                style={{
                  fontFamily: 'Montserrat, system-ui, sans-serif',
                  fontSize: 'clamp(2rem, 5.5vw, 3.5rem)',
                  fontWeight: 800,
                  color: 'var(--fg-primary)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  margin: '0 0 20px 0',
                }}
              >
                The settlement data{' '}
                <span style={{ display: 'block' }}>the other side already has.</span>
                <span
                  style={{
                    display: 'block',
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
                style={{
                  fontFamily: 'Roboto, system-ui, sans-serif',
                  fontSize: '17px',
                  color: 'var(--fg-muted)',
                  lineHeight: 1.7,
                  maxWidth: '520px',
                  margin: '0 0 28px 0',
                }}
              >
                Research real outcomes from <strong style={{ color: 'var(--fg-primary)' }}>5.1M+ federal court cases</strong> across all 94 US districts.
                Win rates, settlement ranges, timelines, and judge analytics — sourced from public court records.
              </p>

              {/* Privacy pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: '#0D9488',
                  marginBottom: '28px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Private &amp; encrypted — zero data stored
              </div>

              {/* CTA */}
              <div>
                <a
                  href="/search"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    background: 'var(--accent-primary)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  Check My Case Type
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Trust pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '20px',
                }}
              >
                {['No account required', 'No credit card', '5.1M+ federal cases', 'PACER-verified data', 'Private & encrypted'].map((item, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: 'var(--fg-muted)',
                      fontFamily: 'Roboto, system-ui, sans-serif',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Quick Case Lookup (server-rendered form) */}
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--accent-primary-subtle)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--fg-primary)',
                    margin: '0 0 4px',
                  }}
                >
                  Quick Case Lookup
                </p>
                <p
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '14px',
                    color: 'var(--fg-muted)',
                    margin: 0,
                  }}
                >
                  Select your case type and district to see real outcome data.
                </p>
              </div>
              <QuickLookupForm />
            </div>
          </div>
        </div>
      </div>

      {/* ── TRUST STATS BAR ──────────────────────────────── */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          padding: '40px 24px',
          marginTop: '48px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <HeroStats />
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <div
        style={{
          background: 'var(--bg-base)',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: 'var(--accent-primary-subtle)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--fg-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              How It Works
            </div>
            <h2
              style={{
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--fg-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Three steps to real court data
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="steps-grid"
          >
            {[
              {
                step: '01',
                title: 'Select your case type',
                desc: 'Choose from 84 federal case types — employment, injury, contract, civil rights, and more.',
                icon: 'M4 6h16M4 12h16M4 18h7',
              },
              {
                step: '02',
                title: 'Choose your district',
                desc: 'Pick the federal district where your case is filed or would be filed. All 94 districts covered.',
                icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
              },
              {
                step: '03',
                title: 'Get your report',
                desc: 'Instant results: win rates, settlement ranges, timelines, and judge analytics from public records.',
                icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '16px',
                  padding: '28px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--accent-primary-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: '"PT Mono", monospace',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--accent-secondary)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    STEP {item.step}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--fg-primary)',
                    margin: '0 0 8px 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '14px',
                    color: 'var(--fg-muted)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DATA SOURCES ─────────────────────────────────── */}
      <div
        style={{
          background: 'var(--bg-base)',
          padding: '0 24px 48px',
        }}
      >
        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '12px',
            color: 'var(--fg-subtle)',
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: '0 0 8px' }}>
            <strong style={{ color: 'var(--fg-muted)' }}>Verified Data Sources:</strong> Federal Judicial Center Integrated Database (FJCID),
            PACER, and CourtListener. All data from public federal court records.
          </p>
          <p style={{ margin: 0 }}>
            Data updated April 2026.{' '}
            <a href="/methodology" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
              Learn about our methodology
            </a>
          </p>
        </div>
      </div>

      {/* Responsive grid overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 767px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
