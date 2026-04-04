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
        background: 'transparent',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        padding: '80px 24px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle grid background pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.3,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Eyebrow badge */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(24,86,255,0.12)',
              color: '#3D72FF',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.02em',
              border: '1px solid rgba(24,86,255,0.20)',
            }}>
              5.1M+ federal cases analyzed
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            color: '#F0F2F5',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.15,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            The settlement data the<br />
            other side already has.
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: '20px',
            color: 'rgba(240,242,245,0.70)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
          }}>
            Research real outcomes from federal court cases across all 94 US districts.
            Win rates, settlement ranges, timelines — sourced from public court records.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <a href="/search" aria-label="Search case types and view federal court data" style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#1856FF',
              color: '#FFFFFF',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '16px',
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(24,86,255,0.30)',
            }}>
              Search case types →
            </a>
            <a href="/sample" aria-label="View sample settlement data report" style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: 'rgba(255,255,255,0.06)',
              color: '#F0F2F5',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '16px',
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              backdropFilter: 'blur(12px)',
            }}>
              View sample report
            </a>
            <a href="/calculator" aria-label="Estimate your case value with our settlement calculator" style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: 'rgba(255,255,255,0.06)',
              color: '#F0F2F5',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '16px',
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              backdropFilter: 'blur(12px)',
            }}>
              Calculator
            </a>
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              'No account required',
              'Private & encrypted',
              'PACER-verified data',
              '3 free lookups/day',
            ].map(signal => (
              <div key={signal} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#07CA6B' }} />
                <span style={{ fontSize: '13px', color: 'rgba(240,242,245,0.70)', fontFamily: 'var(--font-body)' }}>{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VISUAL 2: DATA SOURCE ATTRIBUTION BAR ─────────── */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        padding: '16px 24px',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'rgba(240,242,245,0.40)', fontFamily: 'var(--font-body)' }}>Data sourced from:</span>
          {[
            { name: 'Federal Judicial Center', url: 'https://www.fjc.gov' },
            { name: 'PACER', url: 'https://pacer.uscourts.gov' },
            { name: 'CourtListener', url: 'https://www.courtlistener.com' },
            { name: 'Bureau of Justice Statistics', url: 'https://bjs.ojp.gov' },
          ].map((source, i) => (
            <span key={source.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {i > 0 && <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>}
              <a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Data sourced from ${source.name} (opens in new window)`} style={{
                fontSize: '12px',
                color: 'rgba(240,242,245,0.70)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                textDecoration: 'none',
              }}>{source.name}</a>
            </span>
          ))}
        </div>
      </div>

      {/* ── VISUAL 3: STATS BAR ────────────────────────────── */}
      <div style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.10)', padding: '40px 24px' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '12px',
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
        }}>
          {[
            { value: '5.1M+', label: 'Federal cases analyzed' },
            { value: '94', label: 'Federal districts covered' },
            { value: '50+', label: 'Years of historical data' },
            { value: '84', label: 'Case types covered' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.04)', padding: '32px 24px', textAlign: 'center' }}>
              <p style={{
                fontSize: '40px',
                fontWeight: 700,
                color: '#1856FF',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>{stat.value}</p>
              <p style={{ fontSize: '13px', color: 'rgba(240,242,245,0.70)', fontFamily: 'var(--font-body)', lineHeight: 1.4, margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── VISUAL 4: QUICK CASE LOOKUP ────────────────────── */}
      <div style={{ background: 'transparent', padding: '64px 24px', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#3D72FF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
            Quick lookup
          </p>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#F0F2F5', fontFamily: 'var(--font-display)', textAlign: 'center', marginBottom: '8px' }}>
            Find your case data
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(240,242,245,0.70)', fontFamily: 'var(--font-body)', textAlign: 'center', marginBottom: '32px' }}>
            Select a case type and district to see real federal court outcome data instantly.
          </p>

          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '12px', padding: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.30)', backdropFilter: 'blur(12px)' }}>
            <QuickLookupForm />
            <p style={{ fontSize: '12px', color: 'rgba(240,242,245,0.40)', textAlign: 'center', marginTop: '12px', fontFamily: 'var(--font-body)', marginBottom: 0 }}>
              3 free lookups per day · No account required
            </p>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS (VISUAL 5 section header pattern) ── */}
      <div style={{ background: 'transparent', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#3D72FF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              How it works
            </p>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#F0F2F5', fontFamily: 'var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              Three steps to real court data
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(240,242,245,0.70)', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
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
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '12px',
                  padding: '28px',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(24,86,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(24,86,255,0.20)',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D72FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#3D72FF',
                    letterSpacing: '0.05em',
                  }}>
                    STEP {item.step}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#F0F2F5',
                  margin: '0 0 8px 0',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'rgba(240,242,245,0.70)',
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

      {/* Responsive overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}} />
    </section>
  );
}
