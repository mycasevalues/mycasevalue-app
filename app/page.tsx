'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedCounter from '../components/AnimatedCounter';
import DataFreshness from '../components/DataFreshness';
import CaseFilingTicker from '../components/CaseFilingTicker';
import HeroDataViz from '../components/HeroDataViz';
import { HeroEntrance, StaggerGrid, StaggerItem, FadeIn } from '../components/motion';

const ACCENT_COLOR = '#0A66C2';
const TEXT_COLOR = '#0f0f0f';
const SUCCESS_COLOR = '#059669';
const BORDER_COLOR = '#e5e7eb';
const BG_LIGHT = '#f9fafb';

interface Feature {
  title: string;
  description: string;
  href: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Case Analytics',
    description: 'Detailed win rates, settlement ranges, and outcome trends across all federal cases.',
    href: '/calculator',
  },
  {
    title: 'District Intelligence',
    description: 'Case type analysis by district with jurisdiction-specific insights and benchmarks.',
    href: '/districts',
  },
  {
    title: 'Attorney Tools',
    description: 'Judge analytics, attorney performance metrics, and strategy recommendations.',
    href: '/attorney',
  },
  {
    title: 'AI-Powered Search',
    description: 'Natural language search across 5.1M+ cases with advanced filtering capabilities.',
    href: '/search',
  },
  {
    title: 'Interactive Maps',
    description: 'Visualize case distribution, outcomes, and trends across all 94 federal districts.',
    href: '/map',
  },
  {
    title: 'Trend Analysis',
    description: 'Historical case trends, settlement patterns, and emerging case type trajectories.',
    href: '/trends',
  },
];

const TESTIMONIALS = [
  {
    text: 'Invaluable for case valuation and settlement strategy. We use it daily.',
    author: 'Jennifer M.',
    role: 'Managing Partner',
  },
  {
    text: 'The data accuracy and breadth across all districts is unmatched in the market.',
    author: 'David K.',
    role: 'General Counsel',
  },
  {
    text: 'Transformed how we evaluate risk and communicate with clients. Essential tool.',
    author: 'Sarah L.',
    role: 'Trial Attorney',
  },
];

export default function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [reportsCount, setReportsCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/metrics')
      .then(r => r.json())
      .then(d => setReportsCount(d.reportsGenerated ?? 0))
      .catch(() => setReportsCount(0));
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section
        style={{
          background: `linear-gradient(135deg, #ffffff 0%, ${BG_LIGHT} 100%)`,
          paddingTop: '80px',
          paddingBottom: '80px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <HeroEntrance delay={0} y={12}>
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 600,
                color: TEXT_COLOR,
                marginTop: '0',
                marginBottom: '20px',
                lineHeight: '1.2',
              }}
            >
              What really happened in cases like yours.
            </h1>
          </HeroEntrance>

          <HeroEntrance delay={0.1} y={12}>
            <p
              style={{
                fontSize: '20px',
                color: '#666666',
                marginTop: '0',
                marginBottom: '40px',
                maxWidth: '800px',
                margin: '0 auto 40px',
                lineHeight: '1.6',
              }}
            >
              Win rates, settlement ranges, judge analytics, and case timelines from 5.1 million public federal court records. Free during beta. No account required.
            </p>
          </HeroEntrance>

          {/* Search Input */}
          <div style={{ marginBottom: '60px' }}>
            <div
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                boxShadow: '0 10px 40px rgba(10, 102, 194, 0.1)',
                borderRadius: '20px',
                overflow: 'hidden',
              }}
            >
              <input
                type="text"
                placeholder="Search cases by party, judge, or case type..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  fontSize: '16px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  color: TEXT_COLOR,
                }}
              />
              <Link
                href={`/search${searchInput ? `?q=${encodeURIComponent(searchInput)}` : ''}`}
                style={{
                  padding: '16px 32px',
                  backgroundColor: ACCENT_COLOR,
                  color: '#ffffff',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Search
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <HeroEntrance delay={0.3} y={12}>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px',
            }}
          >
            <Link
              href="/search"
              style={{
                padding: '14px 32px',
                backgroundColor: ACCENT_COLOR,
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 600,
                borderRadius: '20px',
                fontSize: '16px',
                border: `2px solid ${ACCENT_COLOR}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              Explore Data
            </Link>
            <Link
              href="/cases"
              style={{
                padding: '14px 32px',
                backgroundColor: '#ffffff',
                color: ACCENT_COLOR,
                textDecoration: 'none',
                fontWeight: 600,
                borderRadius: '20px',
                fontSize: '16px',
                border: `2px solid ${ACCENT_COLOR}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              View Case Types
            </Link>
          </div>
          </HeroEntrance>

          {/* Trust Line */}
          <p style={{ fontSize: '14px', color: '#999999', margin: '20px 0 0', letterSpacing: '0.02em' }}>
            No account required · Free during public beta · Instant results
          </p>

          {/* Live Data Visualization */}
          <div style={{ marginTop: '60px', maxWidth: '1100px', margin: '60px auto 0' }}>
            <HeroDataViz />
          </div>

          {/* Animated Stats Counters */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginTop: '60px',
            }}
          >
            <div style={{ padding: '20px' }}>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 600,
                  color: ACCENT_COLOR,
                  marginBottom: '8px',
                }}
              >
                <AnimatedCounter end={5.1} suffix="M+" decimals={1} />
              </div>
              <p style={{ fontSize: '14px', color: '#666666', margin: '0' }}>Federal Cases</p>
            </div>
            <div style={{ padding: '20px' }}>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 600,
                  color: ACCENT_COLOR,
                  marginBottom: '8px',
                }}
              >
                <AnimatedCounter end={84} />
              </div>
              <p style={{ fontSize: '14px', color: '#666666', margin: '0' }}>Case Types</p>
            </div>
            <div style={{ padding: '20px' }}>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 600,
                  color: ACCENT_COLOR,
                  marginBottom: '8px',
                }}
              >
                <AnimatedCounter end={94} />
              </div>
              <p style={{ fontSize: '14px', color: '#666666', margin: '0' }}>Federal Districts</p>
            </div>
            <div style={{ padding: '20px' }}>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 600,
                  color: ACCENT_COLOR,
                  marginBottom: '8px',
                }}
              >
                <AnimatedCounter end={54} suffix=" yrs" />
              </div>
              <p style={{ fontSize: '14px', color: '#666666', margin: '0' }}>Data Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Platform Metrics Bar */}
      <section style={{ background: '#F3F2EF', padding: '32px 20px', borderTop: '1px solid #E0DDD8', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '12px', right: '24px' }}>
          <DataFreshness />
        </div>
        <div className="metrics-grid-4" style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { value: '5,118,830', label: 'Cases Analyzed' },
            { value: '94', label: 'Federal Districts' },
            { value: '84', label: 'Case Types' },
            { value: reportsCount !== null ? reportsCount.toLocaleString() : '—', label: 'Reports Generated' },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#191919', fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '13px', color: '#666666', fontFamily: 'var(--font-body)', marginTop: '4px' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Case Filing Ticker */}
      <CaseFilingTicker />

      {/* What This Data Actually Tells You — S.D.N.Y. Example */}
      <section style={{ borderTop: '1px solid #E0DDD8', padding: '80px 20px' }}>
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <p className="mcv-section-label">In plain English</p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em', borderLeft: '3px solid #0A66C2', paddingLeft: '20px' }}>
              What this data actually tells you
            </h2>
            <p style={{ fontSize: '19px', color: '#4B5563', fontFamily: 'var(--font-body)', maxWidth: '640px', lineHeight: 1.6, fontWeight: 300 }}>
              We take millions of public federal court records and turn them into clear, actionable insights.
            </p>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4B5563', textAlign: 'center', marginBottom: '12px' }}>
            Example data — Employment Discrimination, S.D.N.Y.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {/* Win Rate Card */}
            <div style={{ background: '#E8F3EB', border: '1px solid #057642', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#057642', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Win Rate</div>
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#057642', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>42%</div>
              <p style={{ fontSize: '13px', color: '#0f0f0f', lineHeight: 1.5, margin: 0 }}>Of cases that went to trial, 42% resulted in a plaintiff verdict.</p>
            </div>
            {/* Settlement Range Card */}
            <div style={{ background: '#EDF3FB', border: '1px solid #0A66C2', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Settlement Range</div>
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#0A66C2', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>$18K–$145K</div>
              <p style={{ fontSize: '13px', color: '#0f0f0f', lineHeight: 1.5, margin: 0 }}>The middle 80% of settlements fell in this range.</p>
            </div>
            {/* Timeline Card */}
            <div style={{ background: '#FEF0EF', border: '1px solid #CC1016', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#CC1016', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Timeline</div>
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#CC1016', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>14 mo</div>
              <p style={{ fontSize: '13px', color: '#0f0f0f', lineHeight: 1.5, margin: 0 }}>Average filing-to-resolution for similar cases in this district.</p>
            </div>
            {/* Attorney Impact Card */}
            <div style={{ background: '#EDF3FB', border: '1px solid #0A66C2', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Attorney Impact</div>
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#0A66C2', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>+23%</div>
              <p style={{ fontSize: '13px', color: '#0f0f0f', lineHeight: 1.5, margin: 0 }}>Plaintiffs with attorneys won 23% more often than pro se litigants.</p>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#4B5563', textAlign: 'center', marginTop: '12px', fontStyle: 'italic' }}>
            Sample figures only. Your results depend on your specific case type, district, and facts.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: '40px',
                fontWeight: 600,
                color: TEXT_COLOR,
                margin: '0 0 16px',
              }}
            >
              Powerful Features for Legal Intelligence
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#666666',
                margin: '0',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Everything you need to make data-driven legal decisions
            </p>
          </div>

          <StaggerGrid
            className="features-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '32px',
            }}
          >
            {FEATURES.map((feature) => (
              <StaggerItem key={feature.title}>
              <Link
                href={feature.href}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #E0DDD8',
                    borderRadius: '8px',
                    padding: '32px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 150ms ease, box-shadow 150ms ease',
                    cursor: 'pointer',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = '0 0 0 1px #0A66C2';
                    el.style.borderColor = '#0A66C2';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = 'none';
                    el.style.borderColor = '#E0DDD8';
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '4px',
                      backgroundColor: ACCENT_COLOR,
                      borderRadius: '2px',
                      marginBottom: '16px',
                    }}
                  />
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: TEXT_COLOR,
                      margin: '0 0 12px',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#666666',
                      margin: '0',
                      lineHeight: '1.6',
                      flex: 1,
                    }}
                  >
                    {feature.description}
                  </p>
                  <div
                    style={{
                      marginTop: '16px',
                      color: ACCENT_COLOR,
                      fontWeight: 600,
                      fontSize: '14px',
                    }}
                  >
                    Learn More {'>'}
                  </div>
                </div>
              </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Trust Section with Testimonials */}
      <section
        style={{
          backgroundColor: BG_LIGHT,
          padding: '80px 20px',
          borderTop: `1px solid ${BORDER_COLOR}`,
          borderBottom: `1px solid ${BORDER_COLOR}`,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: '40px',
                fontWeight: 600,
                color: TEXT_COLOR,
                margin: '0 0 16px',
              }}
            >
              Trusted by Leading Legal Professionals
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#666666',
                margin: '0',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Top law firms and general counsels rely on our data for critical decisions
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #E0DDD8',
                  borderRadius: '8px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'none',
                }}
              >
                <p
                  style={{
                    fontSize: '16px',
                    color: TEXT_COLOR,
                    margin: '0 0 24px',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                  }}
                >
                  "{testimonial.text}"
                </p>
                <div
                  style={{
                    borderTop: `1px solid ${BORDER_COLOR}`,
                    paddingTop: '16px',
                    marginTop: 'auto',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: TEXT_COLOR,
                      margin: '0 0 4px',
                    }}
                  >
                    {testimonial.author}
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      color: ACCENT_COLOR,
                      margin: '0',
                    }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section
        style={{
          background: `linear-gradient(135deg, ${ACCENT_COLOR} 0%, #004182 100%)`,
          padding: '80px 20px',
          textAlign: 'center',
          color: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '40px',
              fontWeight: 600,
              margin: '0 0 16px',
              color: '#ffffff',
            }}
          >
            Ready to Access Federal Court Intelligence?
          </h2>
          <p
            style={{
              fontSize: '18px',
              margin: '0 0 40px',
              opacity: 0.95,
              lineHeight: '1.6',
            }}
          >
            Start exploring 5.1M+ cases with advanced analytics and AI-powered insights.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/search"
              style={{
                padding: '14px 32px',
                backgroundColor: '#ffffff',
                color: ACCENT_COLOR,
                textDecoration: 'none',
                fontWeight: 600,
                borderRadius: '20px',
                fontSize: '16px',
                border: '2px solid #ffffff',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              Start Exploring
            </Link>
            <Link
              href="/attorney"
              style={{
                padding: '14px 32px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 600,
                borderRadius: '20px',
                fontSize: '16px',
                border: '2px solid #ffffff',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              View Attorney Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
