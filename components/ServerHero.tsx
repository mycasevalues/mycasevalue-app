/**
 * ServerHero.tsx — Server Component
 * LexisNexis-inspired corporate design: clean navy hero, search-forward layout.
 * SEO-friendly SSR content, hidden once the client component loads.
 */

import QuickLookupForm from './QuickLookupForm';
import HeroStats from './ui/HeroStats';
import AnchorNav from './AnchorNav';
import TabbedFeatures from './TabbedFeatures';
import TrustBar from './TrustBar';

export default function ServerHero() {
  return (
    <section className="server-hero-content" aria-label="Hero section">
      {/* ── VISUAL 1: HERO — Clean LexisNexis-style ────────── */}
      <div style={{
        background: '#00172E',
        borderBottom: '3px solid #E8171F',
        padding: '64px 24px 56px',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="hero-grid">
          {/* Left: Text content */}
          <div>
            <p style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#E8171F',
              fontFamily: 'var(--font-body)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Federal Court Analytics
            </p>

            <h1 style={{
              fontSize: '44px',
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.2,
              marginBottom: '20px',
              letterSpacing: '-0.01em',
            }}>
              Data-driven legal intelligence from 5.1M+ cases
            </h1>

            <p style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.7,
              marginBottom: '28px',
              maxWidth: '480px',
            }}>
              Win rates, settlement ranges, judge analytics, and case timelines — sourced from public federal court records. Research smarter.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <a href="/search" className="hero-cta-primary" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', background: '#E8171F', color: '#FFFFFF',
                borderRadius: '2px', fontWeight: 700, fontSize: '14px',
                fontFamily: 'var(--font-display)', textDecoration: 'none',
                textTransform: 'uppercase', letterSpacing: '0.04em',
                transition: 'background 200ms',
              }}>
                Search Cases
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="/pricing" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '14px 28px', background: 'transparent', color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.3)', borderRadius: '2px',
                fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-display)',
                textDecoration: 'none', letterSpacing: '0.02em',
                transition: 'all 200ms',
              }} className="hero-cta-secondary">
                View Plans
              </a>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
              No account required · Free basic reports · Instant results
            </p>
          </div>

          {/* Right: Quick lookup card */}
          <div style={{
            background: '#FFFFFF', borderRadius: '4px', padding: '28px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                Quick Case Lookup
              </h2>
              <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>
                Select a case type and district to see real outcome data.
              </p>
            </div>
            <QuickLookupForm />
            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', marginTop: '12px', fontFamily: 'var(--font-body)', marginBottom: 0 }}>
              Data from FJC, PACER, CourtListener & BJS
            </p>
          </div>
        </div>

        {/* Hover styles */}
        <style>{`
          .hero-cta-primary:hover { background: #CC1019 !important; }
          .hero-cta-secondary:hover {
            background: rgba(255,255,255,0.08) !important;
            border-color: rgba(255,255,255,0.5) !important;
          }
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
              text-align: center;
            }
            .hero-grid h1 { font-size: 32px !important; }
            .hero-grid > div:first-child p { max-width: 100% !important; }
            .hero-grid > div:first-child > div { justify-content: center; }
          }
        `}</style>
      </div>

      {/* ── VISUAL 1.5: IN-PAGE ANCHOR NAV (Client Component) ── */}
      <AnchorNav />

      {/* ── VISUAL 1.6: WHAT IS MYCASEVALUE? ───────────────── */}
      <div id="what-is" data-section style={{ background: '#FFFFFF', padding: '64px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ borderLeft: '3px solid #E8171F', paddingLeft: '20px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#00172E', fontFamily: 'var(--font-display)', marginBottom: '0', lineHeight: 1.3 }}>
              What is MyCaseValue?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="about-grid">
            <p style={{ fontSize: '17px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.75, margin: 0 }}>
              MyCaseValue is a federal court analytics platform that gives plaintiffs, attorneys, and researchers instant access to real outcome data from over 5.1 million federal court cases. We combine data from the Federal Judicial Center, PACER, and CourtListener to deliver win rates, settlement ranges, timelines, and judge analytics — all in plain English.
            </p>
            <p style={{ fontSize: '17px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.75, margin: 0 }}>
              Whether you're evaluating a potential case, preparing for settlement negotiations, or researching judicial behavior, MyCaseValue delivers the data-driven insights that were previously only available to large law firms with expensive analytics subscriptions.
            </p>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .about-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>

      {/* ── VISUAL 1.7: PRODUCT TOOLS SHOWCASE ─────────────── */}
      <div id="overview" data-section style={{ background: '#F5F6F7', padding: '64px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ borderLeft: '3px solid #E8171F', paddingLeft: '20px', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#00172E', fontFamily: 'var(--font-display)', margin: 0 }}>
                Analytics Tools
              </h2>
            </div>
            <p style={{ fontSize: '16px', color: '#455A64', fontFamily: 'var(--font-body)', maxWidth: '560px', lineHeight: 1.6, marginTop: '12px', paddingLeft: '23px' }}>
              Everything you need to research federal court outcomes in one platform.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }} className="tools-grid">
            {[
              { title: 'Case Research', desc: 'Search outcomes across 84 case types with win rates and settlement data', href: '/search' },
              { title: 'Judge Analytics', desc: 'Analyze judicial behavior, ruling patterns, and case-specific tendencies', href: '/judges' },
              { title: 'Settlement Data', desc: 'Real settlement ranges and monetary distributions from court records', href: '/cases' },
              { title: 'District Comparison', desc: 'Compare win rates and outcomes across 94 federal districts', href: '/districts' },
              { title: 'Case Predictor', desc: 'Data-driven outcome predictions based on historical federal case data', href: '/attorney' },
            ].map((tool, i) => (
              <a key={i} href={tool.href} style={{
                display: 'block', background: '#FFFFFF', borderTop: '3px solid #E8171F',
                border: '1px solid #D5D8DC', borderTopColor: '#E8171F', borderTopWidth: '3px',
                padding: '24px 20px', textDecoration: 'none',
                transition: 'box-shadow 200ms',
              }} className="tool-card">
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#00172E', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>{tool.title}</h3>
                <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: 0 }}>{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── VISUAL 1.8: TABBED FEATURE SHOWCASE (Client) ──── */}
      <div id="features" data-section>
        <TabbedFeatures />
      </div>

      {/* ── VISUAL 2: DATA SOURCE ATTRIBUTION BAR ─────────── */}
      <div style={{
        background: '#EDEEEE',
        borderBottom: '1px solid #D5D8DC',
        padding: '16px 24px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#455A64', fontFamily: 'var(--font-body)' }}>Data sourced from:</span>
          {[
            { name: 'Federal Judicial Center', url: 'https://www.fjc.gov' },
            { name: 'PACER', url: 'https://pacer.uscourts.gov' },
            { name: 'CourtListener', url: 'https://www.courtlistener.com' },
            { name: 'Bureau of Justice Statistics', url: 'https://bjs.ojp.gov' },
          ].map((source, i) => (
            <span key={source.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {i > 0 && <span style={{ color: '#455A64' }}>·</span>}
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

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <TrustBar />

      {/* ── VISUAL 3: STATS BAR — Corporate style ────────────── */}
      <div style={{ background: '#00172E', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '0' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }} className="stats-bar-grid">
          {[
            { value: '5.1M+', label: 'Federal cases analyzed' },
            { value: '94', label: 'Federal districts covered' },
            { value: '50+', label: 'Years of historical data' },
            { value: '84', label: 'Case types tracked' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              padding: '28px 24px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <p style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1,
                marginBottom: '6px',
              }}>{stat.value}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.4, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 640px) {
            .stats-bar-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .stats-bar-grid > div { border-bottom: 1px solid rgba(255,255,255,0.1); }
          }
        `}</style>
      </div>

      {/* Quick Lookup is now embedded in the hero card above */}

      {/* ── VISUAL 7: INTEGRATED CASE RESEARCH ─────────────────────────────── */}
      <div style={{ background: '#EDEEEE', padding: '80px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Integrated case research
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
              From research to action — without friction
            </h2>
            <p style={{ fontSize: '19px', color: '#455A64', fontFamily: 'var(--font-body)', maxWidth: '600px', margin: '0 auto 16px', lineHeight: 1.6, fontWeight: 300 }}>
              Everything case research touches, connected in one place. Explore outcomes, develop strategy, and make informed decisions without disrupting how you think or work.
            </p>
            <a href="/search" className="cta-btn-primary" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              height: '48px', padding: '0 32px', background: '#E8171F', color: '#FFFFFF', borderRadius: '4px',
              fontWeight: 700, fontSize: '14px', textDecoration: 'none', textTransform: 'uppercase',
              letterSpacing: '0.04em', fontFamily: 'var(--font-display)',
            }}>
              Instant Free Trial
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── VISUAL 8: PRODUCTIVITY FEATURES ────────────────────────────────── */}
      <div style={{ background: '#FFFFFF', padding: '80px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Productivity features
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
              Work faster with smart analytics tools
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="productivity-grid">
            {[
              {
                title: 'Get straight to the data',
                desc: 'Select your case type and district — your outcome report generates in under 60 seconds with real federal court statistics.',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
              },
              {
                title: 'Visualize settlement ranges',
                desc: 'See full settlement distributions from P10 to P90 at a glance. Understand where your case falls in the spectrum of outcomes.',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
              },
              {
                title: 'Spot patterns fast',
                desc: 'Judge analytics surface behavioral patterns and motion grant rates so you can anticipate outcomes before they happen.',
                icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
              },
              {
                title: 'Access the most complete data',
                desc: 'Over 5.1 million federal court cases from FJC, PACER, and CourtListener — the most comprehensive plaintiff-focused dataset available.',
                icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
              },
              {
                title: 'Compare across districts',
                desc: 'Side-by-side district comparisons reveal where your case type has the strongest outcomes. Identify favorable venues instantly.',
                icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
              },
              {
                title: 'Export and share',
                desc: 'Generate PDF reports with full analytics for client presentations, settlement negotiations, or case evaluation meetings.',
                icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '24px', background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '4px',
                  background: 'rgba(232,23,31,0.08)', border: '1px solid rgba(232,23,31,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
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
        .anchor-nav-link:hover { color: #212529 !important; border-bottom-color: #E8171F !important; }
        .tool-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important; transform: translateY(-2px); }
        .productivity-grid { gap: 24px; }
        @media (max-width: 1024px) { .tools-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) {
          .tools-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .anchor-nav { display: none !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .feature-bullets-grid { grid-template-columns: 1fr !important; }
          .feature-cards-grid { grid-template-columns: 1fr !important; }
          .productivity-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) { .tools-grid { grid-template-columns: 1fr !important; } }
      `}} />
    </section>
  );
}
