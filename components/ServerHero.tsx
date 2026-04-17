/**
 * ServerHero.tsx — Server Component
 * Westlaw-inspired institutional design: clean navy hero, search-forward layout.
 * SEO-friendly SSR content, hidden once the client component loads.
 */

import QuickLookupForm from './QuickLookupForm';
import HeroStats from './ui/HeroStats';
import AnchorNav from './AnchorNav';
import TabbedFeatures from './TabbedFeatures';
import TrustBar from './TrustBar';
import AnimatedDataViz from './AnimatedDataViz';

export default function ServerHero() {
  return (
    <section className="server-hero-content" aria-label="Hero section">
      {/* ── VISUAL 1: HERO — Westlaw-style institutional ────────── */}
      <div style={{
        background: 'var(--card, #FFFFFF)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '64px 24px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="hero-grid">
          {/* Left: Text content */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', marginBottom: 16,
              borderRadius: 999,
              border: '1px solid rgba(59,130,246,0.2)',
              background: 'rgba(59,130,246,0.08)',
              fontFamily: 'var(--font-mono)', fontSize: 10,
              fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--link, #0A50A2)',
            }}>
              <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive, #176438)' }} />
              Federal Court Analytics · Live Data
            </div>

            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--card, #FFFFFF)',
              fontFamily: 'var(--font-legal)',
              lineHeight: 1.1,
              marginBottom: 20,
              letterSpacing: '-0.025em',
            }}>
              What really happened in cases like yours.
            </h1>

            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'var(--font-ui)',
              lineHeight: 1.6,
              marginBottom: '28px',
              maxWidth: '480px',
              fontWeight: 400,
            }}>
              Win rates, settlement ranges, judge analytics, and case timelines from 5.1 million public federal court records. Free during beta. No account required.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <a href="/search" className="hero-cta-primary" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '1rem 1.5rem', background: 'var(--accent-primary)', color: 'var(--color-surface-1)',
                borderRadius: '0.25rem', fontWeight: 600, fontSize: '1.25rem',
                fontFamily: 'var(--font-ui)', textDecoration: 'none',
                transition: 'background 200ms',
              }}>
                Start Researching
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="/cases" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '1rem 1.5rem', background: 'transparent', color: 'var(--color-surface-1)',
                border: '2px solid rgba(255,255,255,0.4)', borderRadius: '0.25rem',
                fontWeight: 600, fontSize: '1rem', fontFamily: 'var(--font-ui)',
                textDecoration: 'none',
                transition: 'all 200ms',
              }} className="hero-cta-secondary">
                View Case Types
              </a>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ui)' }}>
              No account required · Free during public beta · Instant results
            </p>

            {/* Animated data visualization */}
            <AnimatedDataViz />
          </div>

          {/* Right: Quick lookup card */}
          <div style={{
            background: 'var(--color-surface-0)', borderRadius: '4px', padding: '32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            border: '1px solid var(--border-default)',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '4px' }}>
                Quick Case Lookup
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', margin: 0 }}>
                Select a case type and district to see real outcome data.
              </p>
            </div>
            <QuickLookupForm />
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '12px', fontFamily: 'var(--font-ui)', marginBottom: 0 }}>
              Data from FJC, PACER, CourtListener & BJS
            </p>
          </div>
        </div>

        {/* Hover styles */}
        <style>{`
          .hero-cta-primary:hover { background: var(--accent-primary-hover) !important; }
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
      <div id="what-is" data-section style={{ background: 'var(--color-surface-0)', padding: '64px 24px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '24px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '0', lineHeight: 1.3 }}>
              What is MyCaseValue?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="about-grid">
            <p style={{ fontSize: '17px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', lineHeight: 1.75, margin: 0 }}>
              MyCaseValue is a federal court analytics platform that gives litigants, attorneys, and researchers instant access to real outcome data from over 5.1 million federal court cases. We combine data from the Federal Judicial Center, PACER, and CourtListener to deliver win rates, settlement ranges, timelines, and judge analytics — all in plain English.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', lineHeight: 1.75, margin: 0 }}>
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
      <div id="overview" data-section style={{ background: 'var(--color-surface-1)', padding: '64px 24px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '24px', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', margin: 0 }}>
                Analytics Tools
              </h2>
            </div>
            <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', maxWidth: '560px', lineHeight: 1.6, marginTop: '12px', paddingLeft: '23px' }}>
              Everything you need to research federal court outcomes in one platform.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }} className="tools-grid">
            {[
              { title: 'Case Research', desc: 'Search outcomes across 84 case types with win rates and settlement data', href: '/search' },
              { title: 'Judge Analytics', desc: 'Analyze judicial behavior, ruling patterns, and case-specific tendencies', href: '/judges' },
              { title: 'Settlement Data', desc: 'Real settlement ranges and monetary distributions from court records', href: '/cases' },
              { title: 'District Comparison', desc: 'Compare win rates and outcomes across 95 federal districts', href: '/districts' },
              { title: 'Case Predictor', desc: 'Data-driven outcome predictions based on historical federal case data', href: '/attorney' },
            ].map((tool, i) => (
              <a key={i} href={tool.href} style={{
                display: 'block', background: 'var(--color-surface-0)', borderTop: '3px solid var(--accent-primary)',
                border: '1px solid var(--border-default)', borderTopColor: 'var(--accent-primary)', borderTopWidth: '3px',
                padding: '24px 20px', textDecoration: 'none',
                transition: 'box-shadow 200ms',
              }} className="tool-card">
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '8px' }}>{tool.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', lineHeight: 1.6, margin: 0 }}>{tool.desc}</p>
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
        background: 'var(--color-surface-0)',
        borderBottom: '1px solid var(--border-default)',
        padding: '16px 24px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>Data sourced from:</span>
          {[
            { name: 'Federal Judicial Center', url: 'https://www.fjc.gov' },
            { name: 'PACER', url: 'https://pacer.uscourts.gov' },
            { name: 'CourtListener', url: 'https://www.courtlistener.com' },
            { name: 'Bureau of Justice Statistics', url: 'https://bjs.ojp.gov' },
          ].map((source, i) => (
            <span key={source.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {i > 0 && <span style={{ color: 'var(--color-text-secondary)' }}>·</span>}
              <a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Data sourced from ${source.name} (opens in new window)`} style={{
                fontSize: '12px',
                color: 'var(--accent-primary-hover)',
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                textDecoration: 'none',
              }}>{source.name}</a>
            </span>
          ))}
        </div>
      </div>

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <TrustBar />

      {/* ── VISUAL 3: STATS BAR — Terminal metrics strip ────────────── */}
      <div style={{ background: 'var(--card, #FFFFFF)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }} className="stats-bar-grid">
          {[
            { value: '5.1M+', label: 'Federal cases analyzed' },
            { value: '95', label: 'Federal districts covered' },
            { value: '55+ years', label: 'Historical data (1970–2025)' },
            { value: '84', label: 'Case types tracked' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              padding: '32px 24px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <p style={{
                fontSize: '28px',
                fontWeight: 600,
                color: 'var(--card, #FFFFFF)',
                fontFamily: 'var(--font-mono)',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1,
                marginBottom: 8,
                letterSpacing: '-0.02em',
              }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)', lineHeight: 1.4, margin: 0, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{stat.label}</p>
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

      {/* ── VISUAL 7: INTEGRATED CASE RESEARCH ─────────────── */}
      <div style={{ background: 'var(--card, #FFFFFF)', padding: '64px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--link, #0A50A2)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive, #176438)' }} />
            Integrated Workflow
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--card, #FFFFFF)', fontFamily: 'var(--font-ui)', marginBottom: 16, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            From research to action — without friction
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ui)', maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Everything case research touches, connected in one place. Explore outcomes, develop strategy, and make informed decisions.
          </p>
          <a href="/search" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 24px', background: 'var(--gold, #C4882A)', color: 'var(--card, #FFFFFF)', borderRadius: '3px',
            fontWeight: 600, fontSize: 13, letterSpacing: '-0.005em', textDecoration: 'none',
            fontFamily: 'var(--font-ui)', border: '1px solid var(--gold, #C4882A)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            transition: 'background-color 150ms ease, border-color 150ms ease',
          }}>
            Start Researching
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      {/* ── VISUAL 8: PRODUCTIVITY FEATURES ────────────────── */}
      <div style={{ background: 'var(--color-surface-0)', padding: '64px 24px', borderTop: '3px solid var(--accent-primary)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', margin: 0 }}>
                Work Faster With Smart Analytics
              </h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="productivity-grid">
            {[
              { title: 'Get straight to the data', desc: 'Select your case type and district — your outcome report generates in under 60 seconds with real federal court statistics.' },
              { title: 'Visualize settlement ranges', desc: 'See full settlement distributions from P10 to P90 at a glance. Understand where your case falls in the spectrum of outcomes.' },
              { title: 'Spot patterns fast', desc: 'Judge analytics surface behavioral patterns and motion grant rates so you can anticipate outcomes before they happen.' },
              { title: 'Access the most complete data', desc: 'Over 5.1 million federal court cases from FJC, PACER, and CourtListener — the most comprehensive litigation dataset available.' },
              { title: 'Compare across districts', desc: 'Side-by-side district comparisons reveal where your case type has the strongest outcomes. Identify favorable venues instantly.' },
              { title: 'Export and share', desc: 'Generate PDF reports with full analytics for client presentations, settlement negotiations, or case evaluation meetings.' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '24px', background: 'var(--color-surface-1)', border: '1px solid var(--border-default)',
                borderTop: '2px solid var(--accent-primary)',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background: 'var(--color-surface-0)', padding: '64px 24px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '24px', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', margin: 0 }}>
                How It Works
              </h2>
            </div>
            <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', maxWidth: '500px', lineHeight: 1.6, marginTop: '12px', paddingLeft: '23px' }}>
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
              },
              {
                step: '02',
                title: 'Choose your district',
                desc: 'Pick the federal district where your case is filed or would be filed. All 95 districts covered.',
              },
              {
                step: '03',
                title: 'Get your report',
                desc: 'Instant results: win rates, settlement ranges, timelines, and judge analytics from public records.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-surface-1)',
                  border: '1px solid var(--border-default)',
                  padding: '32px',
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '28px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                  }}>
                    {item.step}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '17px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 8px 0',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
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
      <div style={{ background: 'var(--color-surface-0)', padding: '80px 24px', borderTop: '3px solid var(--accent-primary)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>
              Analytics platform
            </p>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '12px' }}>
              More Data, Better Outcomes
            </h2>
            <p style={{ fontSize: '19px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300, fontStyle: 'italic' }}>
              Broader coverage and greater depth than any other litigation analytics platform.
            </p>
          </div>

          {/* Feature bullets */}
          <div style={{ maxWidth: '720px', margin: '0 auto 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="feature-bullets-grid">
            {[
              'Enhanced coverage with data from 5.1M+ federal court cases',
              'All 95 federal districts with 55+ years of historical data (1970–2025)',
              'High-value analytics for settlements, timing, and outcomes',
              'Exclusive comparisons via judge and district analytics',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '12px 16px', background: 'var(--color-surface-1)', borderRadius: '4px', border: '1px solid var(--border-default)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: '14px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', lineHeight: 1.5 }}>{text}</span>
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
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                padding: '32px 24px',
                transition: 'border-color 200ms',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '4px',
                    background: 'rgba(10, 102, 194, 0.08)', border: '1px solid rgba(232,23,31,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={card.icon} />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '17px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                    {card.title}
                  </h3>
                </div>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {card.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {card.details.map((detail, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderTop: j === 0 ? '1px solid var(--border-default)' : 'none' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHO IS IT FOR — Segment Grid ────────────────── */}
      <div id="who" data-section style={{ background: 'var(--color-surface-1)', padding: '80px 24px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>
              Solutions
            </p>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '12px' }}>
              Who Is MyCaseValue For?
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Trusted by individuals, attorneys, and organizations who need data-driven federal court insights.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="who-grid">
            {[
              { title: 'Individuals', desc: 'Research your own case value with real settlement data and win rates from cases like yours.', href: '/solutions/individuals', iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
              { title: 'Small Law Firms', desc: 'Case research, judge analytics, and opposing counsel intelligence for solo and boutique practices.', href: '/solutions/small-firms', iconPath: 'M3 21h18M3 7v14M21 7v14M6 21V10M10 21V10M14 21V10M18 21V10M3 7l9-4 9 4' },
              { title: 'Enterprise Legal', desc: 'API access, custom dashboards, SSO, and bulk exports for large legal departments.', href: '/solutions/enterprise', iconPath: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 0 3-3h7z' },
              { title: 'Insurance Companies', desc: 'Settlement benchmarking, claim valuation, and risk scoring for claims teams and defense counsel.', href: '/solutions/insurance', iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
              { title: 'Litigation Funders', desc: 'Portfolio analytics, case evaluation, and due diligence data for litigation finance decisions.', href: '/solutions/funders', iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
              { title: 'Academic Researchers', desc: 'Datasets, analysis tools, and institutional licensing for law school faculty and research institutions.', href: '/solutions/academic', iconPath: 'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 3 4 6 4s6-2 6-4v-5' },
            ].map((seg) => (
              <a key={seg.title} href={seg.href} style={{
                display: 'block', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)',
                padding: '32px 24px', textDecoration: 'none',
                transition: 'box-shadow 200ms, border-color 200ms',
              }} className="who-card">
                <div style={{ marginBottom: '12px' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={seg.iconPath}/></svg></div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '8px' }}>{seg.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', lineHeight: 1.6, margin: 0 }}>{seg.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <div style={{ background: 'var(--color-surface-0)', padding: '80px 24px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>
              Testimonials
            </p>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '12px' }}>
              What Legal Professionals Say
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="testimonials-grid">
            {[
              { quote: 'MyCaseValue gave me the settlement data I needed to negotiate a fair offer. My attorney was impressed with the research.', name: 'Sarah M.', role: 'Litigant, Employment Case' },
              { quote: 'I use it before every initial client consultation. The win rates and judge analytics save me hours of research.', name: 'David K.', role: 'Trial Attorney, Chicago' },
              { quote: 'The district comparison tool helped us identify the strongest venue for our product liability case.', name: 'Jennifer L.', role: 'Partner, Boutique Firm' },
              { quote: 'Finally, a platform that makes federal court data accessible without a five-figure analytics subscription.', name: 'Marcus T.', role: 'Solo Practitioner, Miami' },
              { quote: 'Our claims team uses MyCaseValue daily for settlement benchmarking. It has improved our reserve accuracy significantly.', name: 'Rachel W.', role: 'Claims Director, Insurance Co.' },
              { quote: 'The academic license gives our students real-world data to work with. Invaluable for our civil procedure course.', name: 'Prof. Alan B.', role: 'Law School Faculty' },
              { quote: 'We integrated the API into our case management system. The data quality and coverage are exceptional.', name: 'Chris N.', role: 'Legal Tech Developer' },
              { quote: 'As a litigation funder, the portfolio analytics help us make better investment decisions with objective data.', name: 'Victoria S.', role: 'Managing Director, Lit Finance' },
            ].map((t, i) => (
              <div key={i} style={{
                background: 'var(--color-surface-1)', border: '1px solid var(--border-default)',
                padding: '32px', borderLeft: '3px solid var(--accent-primary-hover)',
              }}>
                <p style={{ fontSize: '14px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', margin: 0 }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AWARDS / TRUST BADGES GRID ───────────────────── */}
      <div style={{ background: 'var(--card, #FFFFFF)', padding: '64px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--link, #0A50A2)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive, #176438)' }} />
            Data Provenance
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--card, #FFFFFF)', fontFamily: 'var(--font-ui)', marginBottom: 40, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Trusted data sources &amp; standards
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="awards-grid">
            {[
              { label: 'Federal Judicial Center', sub: 'Official statistics' },
              { label: 'PACER', sub: 'Court records access' },
              { label: 'CourtListener', sub: 'Free Law Project' },
              { label: 'Bureau of Justice Stats', sub: 'DOJ data' },
              { label: '5.1M+ Cases', sub: 'Analyzed' },
              { label: '95 districts', sub: 'Full coverage' },
              { label: '55+ Years', sub: 'Historical data (1970–2025)' },
              { label: 'Daily Updates', sub: 'Fresh data' },
            ].map((award, i) => (
              <div key={i} style={{
                padding: '24px 16px', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px',
              }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-inverse)', fontFamily: 'var(--font-ui)', margin: '0 0 4px' }}>{award.label}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ui)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{award.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COMPARISON TABLE — MyCaseValue vs. Others ──── */}
      <div style={{ background: 'var(--color-surface-0)', padding: '80px 24px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '12px' }}>
              How MyCaseValue Compares
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
              The most comprehensive federal court analytics available.
            </p>
          </div>
          <div style={{ overflow: 'auto' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontFamily: 'var(--font-ui)', fontSize: '14px',
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--accent-primary)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '13px' }}>Feature</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: 'var(--color-text-inverse)', fontWeight: 600, fontSize: '13px', background: 'var(--accent-primary)' }}>MyCaseValue</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '13px' }}>PACER Alone</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '13px' }}>Premium Platforms</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Win rate analytics', mcv: true, pacer: false, premium: true },
                  { feature: 'Settlement range data', mcv: true, pacer: false, premium: true },
                  { feature: 'Judge-level analytics', mcv: true, pacer: false, premium: true },
                  { feature: 'District comparisons', mcv: true, pacer: false, premium: false },
                  { feature: 'Plain English reports', mcv: true, pacer: false, premium: false },
                  { feature: 'Free tier available', mcv: true, pacer: true, premium: false },
                  { feature: 'No training required', mcv: true, pacer: false, premium: false },
                  { feature: 'API access', mcv: true, pacer: true, premium: true },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-default)', background: i % 2 === 0 ? 'var(--color-surface-0)' : 'var(--color-surface-1)' }}>
                    <td style={{ padding: '8px 16px', color: 'var(--color-text-primary)', fontWeight: 500 }}>{row.feature}</td>
                    <td style={{ padding: '8px 16px', textAlign: 'center', color: row.mcv ? 'var(--data-positive, #176438)' : '#B91C1C', fontWeight: 600 }}>{row.mcv ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{display:'inline'}}><path d="M20 6L9 17l-5-5"/></svg> : '—'}</td>
                    <td style={{ padding: '8px 16px', textAlign: 'center', color: row.pacer ? 'var(--data-positive, #176438)' : 'var(--color-text-muted)' }}>{row.pacer ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{display:'inline'}}><path d="M20 6L9 17l-5-5"/></svg> : '—'}</td>
                    <td style={{ padding: '8px 16px', textAlign: 'center', color: row.premium ? 'var(--data-positive, #176438)' : 'var(--color-text-muted)' }}>{row.premium ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{display:'inline'}}><path d="M20 6L9 17l-5-5"/></svg> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── FAQ ACCORDION ────────────────────────────────── */}
      <div id="faq" data-section style={{ background: 'var(--color-surface-1)', padding: '80px 24px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '12px' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { q: 'Where does MyCaseValue get its data?', a: 'Our data comes from the Federal Judicial Center (FJC), PACER (Public Access to Court Electronic Records), CourtListener (Free Law Project), and the Bureau of Justice Statistics. All data is sourced from official public federal court records.' },
              { q: 'How many cases are in the database?', a: 'Over 5.1 million federal court cases spanning 55+ years (1970–2025) across all 95 federal judicial districts. We cover 84 case types including employment, personal injury, civil rights, contract disputes, and more.' },
              { q: 'Is MyCaseValue free to use?', a: 'Yes, all features are currently free with no account required — including settlement ranges, judge analytics, circuit breakdowns, and attorney tools.' },
              { q: 'Can I use this data in court?', a: 'MyCaseValue is an informational tool. While the underlying data comes from official court records, our analytics are for research purposes. Consult with an attorney for legal strategy decisions.' },
              { q: 'What case types are covered?', a: 'We cover all 84 federal Nature of Suit (NOS) codes, including employment discrimination (Title VII, ADA, ADEA), personal injury, product liability, medical malpractice, civil rights, contract disputes, insurance, patent, trademark, and more.' },
              { q: 'How current is the data?', a: 'Our database is updated regularly with new case dispositions. Most data reflects cases closed within the last several years, with historical data spanning 55+ years (1970–2025) for trend analysis.' },
              { q: 'What is Attorney Mode?', a: 'Attorney Mode provides advanced analytics tools including case outcome prediction, judge intelligence reports, venue optimization, opposing counsel research, bulk analysis, and team workspace features.' },
              { q: 'Do you offer an API?', a: 'Yes. Our REST API provides programmatic access to case analytics data for integration into your own tools and workflows. Documentation and sandbox access are available on our API page.' },
              { q: 'How are win rates calculated?', a: 'Win rates are calculated from final case dispositions in federal court records. We categorize outcomes as favorable verdicts, defense verdicts, settlements, and dismissals based on FJC disposition codes.' },
              { q: 'Can I compare districts?', a: 'Yes. Our district comparison tool lets you view win rates, settlement ranges, and case timelines side by side across any of the 95 federal judicial districts.' },
              { q: 'Is there an institutional or academic license?', a: 'Yes. We offer institutional licensing for law schools, research institutions, and government agencies with special pricing and bulk data access. Contact us for details.' },
              { q: 'How do I contact support?', a: 'Visit our contact page or email support directly. We offer email support for all users.' },
            ].map((faq, i) => (
              <details key={i} style={{
                borderTop: i === 0 ? '1px solid var(--border-default)' : 'none',
                borderBottom: '1px solid var(--border-default)',
                background: 'var(--color-surface-0)',
              }}>
                <summary style={{
                  padding: '16px 24px', cursor: 'pointer', fontSize: '14px',
                  fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)',
                  listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" style={{ flexShrink: 0, marginLeft: '16px', transition: 'transform 200ms' }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <div style={{ padding: '0 20px 16px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED SOLUTIONS ────────────────────────────── */}
      <div style={{ background: 'var(--color-surface-0)', padding: '64px 24px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '32px' }}>
            Explore Solutions
          </h2>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'For Individuals', href: '/solutions/individuals' },
              { label: 'For Small Firms', href: '/solutions/small-firms' },
              { label: 'For Enterprise', href: '/solutions/enterprise' },
              { label: 'API Access', href: '/solutions/api' },
              { label: 'View All Solutions', href: '/solutions' },
            ].map((s) => (
              <a key={s.href} href={s.href} style={{
                padding: '8px 24px', fontSize: '13px', fontWeight: 600,
                color: 'var(--accent-primary-hover)', border: '1px solid var(--border-default)', borderRadius: '4px',
                textDecoration: 'none', fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase', letterSpacing: '0.04em',
                transition: 'all 150ms',
              }} className="solution-pill">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ────────────────── */}
      <div style={{ background: 'var(--card, #FFFFFF)', padding: '80px 24px', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--link, #0A50A2)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive, #176438)' }} />
            Free · No Account Required
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--card, #FFFFFF)', fontFamily: 'var(--font-ui)', marginBottom: 16, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Start researching today
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ui)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Free basic reports. No account required. See real federal court outcome data in under 60 seconds.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/sign-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 24px', background: 'var(--gold, #C4882A)',
              color: 'var(--card, #FFFFFF)', borderRadius: '3px', fontWeight: 600, fontSize: 13,
              fontFamily: 'var(--font-ui)', textDecoration: 'none',
              letterSpacing: '-0.005em', border: '1px solid var(--gold, #C4882A)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'background-color 150ms ease, border-color 150ms ease',
            }}>
              Start Researching
            </a>
            <a href="/pricing" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '8px 24px', background: 'transparent', color: 'var(--card, #FFFFFF)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4,
              fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-ui)',
              textDecoration: 'none', letterSpacing: '-0.005em',
              transition: 'border-color 150ms ease, background-color 150ms ease',
            }}>
              View Pricing
            </a>
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        .anchor-nav-link:hover { color: var(--color-text-primary) !important; border-bottom-color: var(--accent-primary) !important; }
        .tool-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important; transform: translateY(-2px); }
        .who-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important; border-color: rgba(0,105,151,0.30) !important; }
        .solution-pill:hover { background: var(--accent-primary-hover) !important; color: var(--color-text-inverse) !important; border-color: var(--accent-primary-hover) !important; }
        .productivity-grid { gap: 24px; }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary svg { transform: rotate(180deg); }
        @media (max-width: 1024px) { .tools-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) {
          .tools-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .anchor-nav { display: none !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .feature-bullets-grid { grid-template-columns: 1fr !important; }
          .feature-cards-grid { grid-template-columns: 1fr !important; }
          .productivity-grid { grid-template-columns: 1fr !important; }
          .who-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .awards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) { .tools-grid { grid-template-columns: 1fr !important; } }
      `}} />
    </section>
  );
}
