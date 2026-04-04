/**
 * ServerHero.tsx — Server Component
 * Glassmorphism Design System hero with centered layout, dark mode, glass effects.
 * SEO-friendly SSR content, hidden once the client component loads.
 */

import QuickLookupForm from './QuickLookupForm';
import HeroStats from './ui/HeroStats';

export default function ServerHero() {
  return (
    <section className="server-hero-content" aria-label="Hero section">
      {/* ── VISUAL 1: HERO ─────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, #00172E 0%, #001A35 50%, #00172E 100%)',
        borderBottom: '1px solid #D5D8DC',
        padding: '120px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle grid background pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(250,251,252,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(250,251,252,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.2,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Small subtitle above h1 */}
          <p style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#E6E6E6',
            fontFamily: 'var(--font-body)',
            marginBottom: '16px',
            margin: '0 0 16px 0',
          }}>
            MyCaseValue Federal Case Outcome Analytics
          </p>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 600,
            color: '#FAFBFC',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.15,
            marginBottom: '24px',
            letterSpacing: 'normal',
          }}>
            The settlement data the<br />
            other side already has.
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: '19px',
            color: 'rgba(250,251,252,0.70)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            fontStyle: 'italic',
            fontWeight: 300,
          }}>
            Research real outcomes from federal court cases across all 94 US districts.
            Win rates, settlement ranges, timelines — sourced from public court records.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <a href="/search" aria-label="Start your free trial" style={{
              display: 'inline-block',
              padding: '8px 24px',
              background: '#E8171F',
              color: '#FFFFFF',
              borderRadius: '0px',
              fontWeight: 700,
              fontSize: '14px',
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Free Trial
            </a>
            <a href="/sample" aria-label="Sign in to your account" style={{
              display: 'inline-block',
              padding: '8px 24px',
              background: 'transparent',
              color: '#FFFFFF',
              border: '1px solid #FFFFFF',
              borderRadius: '0px',
              fontWeight: 600,
              fontSize: '14px',
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Sign In
            </a>
          </div>

        </div>
      </div>

      {/* ── VISUAL 2: DATA SOURCE ATTRIBUTION BAR ─────────── */}
      <div style={{
        background: '#EDEEEE',
        borderBottom: '1px solid #D5D8DC',
        padding: '16px 24px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#666666', fontFamily: 'var(--font-body)' }}>Data sourced from:</span>
          {[
            { name: 'Federal Judicial Center', url: 'https://www.fjc.gov' },
            { name: 'PACER', url: 'https://pacer.uscourts.gov' },
            { name: 'CourtListener', url: 'https://www.courtlistener.com' },
            { name: 'Bureau of Justice Statistics', url: 'https://bjs.ojp.gov' },
          ].map((source, i) => (
            <span key={source.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {i > 0 && <span style={{ color: '#999999' }}>·</span>}
              <a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Data sourced from ${source.name} (opens in new window)`} style={{
                fontSize: '12px',
                color: '#006997',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                textDecoration: 'none',
              }}>{source.name}</a>
            </span>
          ))}
        </div>
      </div>

      {/* ── VISUAL 3: STATS BAR ────────────────────────────── */}
      <div style={{ background: 'transparent', borderBottom: '1px solid #D5D8DC', padding: '40px 24px' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: '#EDEEEE',
          border: '1px solid #D5D8DC',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          {[
            { value: '5.1M+', label: 'Federal cases analyzed' },
            { value: '94', label: 'Federal districts covered' },
            { value: '50+', label: 'Years of historical data' },
            { value: '84', label: 'Case types covered' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#FFFFFF', padding: '32px 24px', textAlign: 'center' }}>
              <p style={{
                fontSize: '40px',
                fontWeight: 700,
                color: '#E8171F',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>{stat.value}</p>
              <p style={{ fontSize: '13px', color: '#666666', fontFamily: 'var(--font-body)', lineHeight: 1.4, margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── VISUAL 4: QUICK CASE LOOKUP ────────────────────── */}
      <div style={{ background: 'transparent', padding: '64px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
            Quick lookup
          </p>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', textAlign: 'center', marginBottom: '8px' }}>
            Find your case data
          </h2>
          <p style={{ fontSize: '16px', color: '#455A64', fontFamily: 'var(--font-body)', textAlign: 'center', marginBottom: '32px' }}>
            Select a case type and district to see real federal court outcome data instantly.
          </p>

          <div style={{ background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: '4px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <QuickLookupForm />
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', textAlign: 'center', marginTop: '12px', fontFamily: 'var(--font-body)', marginBottom: 0 }}>
              3 free lookups per day · No account required
            </p>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS (VISUAL 5 section header pattern) ── */}
      <div style={{ background: '#FFFFFF', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              How it works
            </p>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              Three steps to real court data
            </h2>
            <p style={{ fontSize: '18px', color: '#455A64', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              Get reliable federal court outcome data in under 60 seconds.
            </p>
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
                  background: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '28px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    background: 'rgba(232,23,31,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(232,23,31,0.15)',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#E8171F',
                    letterSpacing: '0.05em',
                  }}>
                    STEP {item.step}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#212529',
                  margin: '0 0 8px 0',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#455A64',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VISUAL 6: FEATURE HIGHLIGHTS (LexisNexis-style) ── */}
      <div style={{ background: '#FFFFFF', padding: '80px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Analytics platform
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
              More Data, Better Outcomes
            </h2>
            <p style={{ fontSize: '19px', color: '#455A64', fontFamily: 'var(--font-body)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300, fontStyle: 'italic' }}>
              Broader coverage and greater depth than any other plaintiff-focused platform.
            </p>
          </div>

          {/* Feature bullets */}
          <div style={{ maxWidth: '720px', margin: '0 auto 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="feature-bullets-grid">
            {[
              'Enhanced coverage with data from 5.1M+ federal court cases',
              'All 94 federal districts with 50+ years of historical data',
              'High-value analytics for settlements, timing, and outcomes',
              'Exclusive comparisons via judge and district analytics',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 16px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E5EBF0' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: '14px', color: '#212529', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Feature cards - mirroring LexisNexis tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="feature-cards-grid">
            {[
              {
                title: 'Know Your Judge & Court',
                desc: 'Understand the big-picture background for a judge or court with insights into top case types, filing trends, timing patterns, and outcome distributions.',
                icon: 'M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
                details: [
                  'Judge-specific win rates by case type',
                  'Motion grant/deny patterns',
                  'Average case timelines per judge',
                  'Settlement vs. trial disposition rates',
                ],
              },
              {
                title: 'Evaluate Your Options',
                desc: 'Review the experience and past performance of your district with insights into how outcomes compare across similar case types nationwide.',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                details: [
                  'District-by-district outcome comparison',
                  'Win rate benchmarking across districts',
                  'Settlement range comparison tools',
                  'Identify the most favorable venues',
                ],
              },
              {
                title: 'Understand Your Odds',
                desc: 'Get data-driven insights into how cases like yours have been resolved, with settlement percentiles and timeline breakdowns from real court records.',
                icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
                details: [
                  'Settlement distribution from P10 to P90',
                  'Win rate with vs. without attorney',
                  'Case duration percentiles',
                  'Historical outcome trend analysis',
                ],
              },
            ].map((card, i) => (
              <div key={i} style={{
                background: '#FFFFFF',
                border: '1px solid #D5D8DC',
                borderRadius: '4px',
                padding: '32px 24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'box-shadow 200ms',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '4px',
                    background: 'rgba(232,23,31,0.08)', border: '1px solid rgba(232,23,31,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={card.icon} />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: '#212529', margin: 0 }}>
                    {card.title}
                  </h3>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#455A64', lineHeight: 1.6, marginBottom: '16px' }}>
                  {card.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {card.details.map((detail, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderTop: j === 0 ? '1px solid #E5EBF0' : 'none' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      <span style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)' }}>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .feature-bullets-grid { grid-template-columns: 1fr !important; }
          .feature-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
