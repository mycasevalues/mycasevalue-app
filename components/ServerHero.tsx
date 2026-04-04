/**
 * ServerHero.tsx — Server Component
 * Glassmorphism Design System hero with centered layout, dark mode, glass effects.
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
      {/* ── VISUAL 1: HERO ─────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #00172E 0%, #001A35 50%, #00172E 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(60px, 10vw, 120px) 24px clamp(50px, 8vw, 100px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated gradient overlay for depth */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(232,23,31,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(6,105,151,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        {/* Subtle animated grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(250,251,252,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(250,251,252,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px', opacity: 0.15, pointerEvents: 'none',
          animation: 'grid-drift 20s linear infinite',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <p style={{
            fontSize: 'clamp(11px, 1.2vw, 13px)',
            fontWeight: 700,
            color: 'rgba(232,23,31,0.9)',
            fontFamily: 'var(--font-body)',
            marginBottom: 'clamp(16px, 2vw, 24px)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            opacity: 0.95,
          }}>
            Trusted Legal Analytics Platform
          </p>

          <h1 style={{
            fontSize: 'clamp(42px, 8vw, 72px)',
            fontWeight: 700,
            color: '#FAFBFC',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.15,
            marginBottom: 'clamp(16px, 2vw, 24px)',
            letterSpacing: '-0.02em',
          }}>
            Real Case Outcomes.
            <br />
            Competitive Edge.
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(250,251,252,0.85)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.7,
            marginBottom: 'clamp(24px, 3vw, 32px)',
            maxWidth: '700px',
            margin: '0 auto clamp(24px, 3vw, 32px)',
            fontWeight: 400,
          }}>
            Access settlement data, win rates, and judge analytics from 5.1M+ federal cases. Make informed decisions with the intelligence your opposition already has.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(12px, 2vw, 16px)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'clamp(32px, 4vw, 48px)', alignItems: 'center' }}>
            <a href="/search" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(14px, 1.5vw, 16px) clamp(32px, 4vw, 48px)',
              background: '#E8171F',
              color: '#FFFFFF',
              borderRadius: '6px',
              fontWeight: 800,
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              border: '2px solid #E8171F',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(232,23,31,0.3)',
              minHeight: '48px',
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = '#D01018';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(232,23,31,0.4)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = '#E8171F';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,23,31,0.3)';
            }}>
              Start Free Trial
            </a>
            <a href="/sign-in" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(14px, 1.5vw, 16px) clamp(32px, 4vw, 48px)',
              background: 'transparent',
              color: '#FFFFFF',
              border: '2px solid rgba(255,255,255,0.35)',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              minHeight: '48px',
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
            }}>
              Sign In
            </a>
          </div>

          {/* Social Proof */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: 'clamp(12px, 1.1vw, 14px)',
            color: 'rgba(250,251,252,0.7)',
            fontFamily: 'var(--font-body)',
          }}>
            <span style={{ display: 'flex', gap: '4px' }}>
              <span style={{ color: '#FFB81C' }}>★</span>
              <span style={{ color: '#FFB81C' }}>★</span>
              <span style={{ color: '#FFB81C' }}>★</span>
              <span style={{ color: '#FFB81C' }}>★</span>
              <span style={{ color: '#FFB81C' }}>★</span>
            </span>
            <span>Trusted by 10,000+ legal professionals nationwide</span>
          </div>
        </div>

        {/* CSS Animation for grid drift */}
        <style>{`
          @keyframes grid-drift {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          @media (max-width: 768px) {
            h1 { word-spacing: 9999px; }
          }
        `}</style>
      </div>

      {/* ── VISUAL 1.5: IN-PAGE ANCHOR NAV (Client Component) ── */}
      <AnchorNav />

      {/* ── VISUAL 1.6: WHAT IS MYCASEVALUE? ───────────────── */}
      <div id="what-is" data-section style={{ background: '#FFFFFF', padding: '80px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
            Overview
          </p>
          <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '24px' }}>
            What is MyCaseValue?
          </h2>
          <p style={{ fontSize: '19px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.7, fontWeight: 300, marginBottom: '16px' }}>
            MyCaseValue+ is a federal court analytics platform that gives plaintiffs, attorneys, and researchers instant access to real outcome data from over 5.1 million federal court cases. We combine data from the Federal Judicial Center, PACER, and CourtListener to deliver win rates, settlement ranges, timelines, and judge analytics — all in plain English.
          </p>
          <p style={{ fontSize: '16px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.7, fontWeight: 300 }}>
            Whether you're evaluating a potential case, preparing for settlement negotiations, or researching judicial behavior, MyCaseValue+ delivers the data-driven insights that were previously only available to large law firms with expensive analytics subscriptions.
          </p>
        </div>
      </div>

      {/* ── VISUAL 1.7: PRODUCT TOOLS SHOWCASE ─────────────── */}
      <div id="overview" data-section style={{ background: '#EDEEEE', padding: '80px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
              MyCaseValue+ Analytics Tools
            </h2>
            <p style={{ fontSize: '19px', color: '#455A64', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              Everything you need to research federal court outcomes in one platform.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }} className="tools-grid">
            {[
              { title: 'Case Research', desc: 'Search outcomes across 84 case types', href: '/search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              { title: 'Judge Analytics', desc: 'Understand judicial behavior and patterns', href: '/attorney/judge-intelligence', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
              { title: 'Settlement Data', desc: 'Real settlement ranges from court records', href: '/cases', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z' },
              { title: 'District Comparison', desc: 'Compare outcomes across 94 federal districts', href: '/districts', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
              { title: 'AI Case Predictor', desc: 'Data-driven outcome predictions', href: '/attorney/case-predictor', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            ].map((tool, i) => (
              <a key={i} href={tool.href} style={{
                display: 'block', background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: '4px',
                padding: '24px 20px', textDecoration: 'none', textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 200ms',
              }} className="tool-card">
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 16px',
                  background: 'rgba(232,23,31,0.08)', border: '1px solid rgba(232,23,31,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={tool.icon} /></svg>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '6px' }}>{tool.title}</h3>
                <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.5, margin: 0 }}>{tool.desc}</p>
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
          <span style={{ fontSize: '12px', color: '#666666', fontFamily: 'var(--font-body)' }}>Data sourced from:</span>
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
            <a href="/search" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 24px', background: '#E8171F', color: '#FFFFFF', borderRadius: '4px',
              fontWeight: 700, fontSize: '13px', textDecoration: 'none', textTransform: 'uppercase',
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
