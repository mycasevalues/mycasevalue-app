'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimatedCounter from '../components/AnimatedCounter';

const ACCENT_COLOR = '#8B5CF6';
const TEXT_COLOR = '#0f0f0f';
const SUCCESS_COLOR = '#059669';
const BORDER_COLOR = '#e5e7eb';
const BG_LIGHT = '#f9fafb';

interface Feature {
  title: string;
  description: string;
  href: string;
  icon: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Case Analytics',
    description: 'Detailed win rates, settlement ranges, and outcome trends across all federal cases.',
    href: '/calculator',
    icon: '📊',
  },
  {
    title: 'District Intelligence',
    description: 'Case type analysis by district with jurisdiction-specific insights and benchmarks.',
    href: '/districts',
    icon: '🗺️',
  },
  {
    title: 'Attorney Tools',
    description: 'Judge analytics, attorney performance metrics, and strategy recommendations.',
    href: '/attorney',
    icon: '⚖️',
  },
  {
    title: 'AI-Powered Search',
    description: 'Natural language search across 4.1M+ cases with advanced filtering capabilities.',
    href: '/search',
    icon: '🔍',
  },
  {
    title: 'Interactive Maps',
    description: 'Visualize case distribution, outcomes, and trends across all 94 federal districts.',
    href: '/map',
    icon: '🌍',
  },
  {
    title: 'Trend Analysis',
    description: 'Historical case trends, settlement patterns, and emerging case type trajectories.',
    href: '/trends',
    icon: '📈',
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
            Federal Court Intelligence Platform
          </h1>

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
            Access intelligence from 4.1M+ federal court cases spanning 84 case types across 94 districts, covering 54 years of precedent data (1970-2024).
          </p>

          {/* Search Input */}
          <div style={{ marginBottom: '60px' }}>
            <div
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                boxShadow: '0 10px 40px rgba(139, 92, 246, 0.1)',
                borderRadius: '8px',
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
                borderRadius: '8px',
                fontSize: '16px',
                border: `2px solid ${ACCENT_COLOR}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              Explore Data
            </Link>
            <Link
              href="/attorney"
              style={{
                padding: '14px 32px',
                backgroundColor: '#ffffff',
                color: ACCENT_COLOR,
                textDecoration: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                fontSize: '16px',
                border: `2px solid ${ACCENT_COLOR}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              Attorney Tools
            </Link>
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
                <AnimatedCounter end={4100000} suffix="+" />
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

      {/* Key Metrics Bar */}
      <section
        style={{
          backgroundColor: TEXT_COLOR,
          color: '#ffffff',
          padding: '40px 20px',
          borderBottom: `1px solid ${BORDER_COLOR}`,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>
                4,100,000+
              </div>
              <p style={{ fontSize: '14px', margin: '0', opacity: 0.8 }}>Federal Cases Indexed</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>84</div>
              <p style={{ fontSize: '14px', margin: '0', opacity: 0.8 }}>Case Types Covered</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>94</div>
              <p style={{ fontSize: '14px', margin: '0', opacity: 0.8 }}>Federal Districts</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>54 years</div>
              <p style={{ fontSize: '14px', margin: '0', opacity: 0.8 }}>of Court Records (1970-2024)</p>
            </div>
          </div>
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '32px',
            }}
          >
            {FEATURES.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: `1px solid ${BORDER_COLOR}`,
                    borderRadius: '12px',
                    padding: '32px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.15)';
                    el.style.borderColor = ACCENT_COLOR;
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    el.style.borderColor = BORDER_COLOR;
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      fontSize: '36px',
                      marginBottom: '16px',
                    }}
                  >
                    {feature.icon}
                  </div>
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
            ))}
          </div>
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
                  border: `1px solid ${BORDER_COLOR}`,
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
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
          background: `linear-gradient(135deg, ${ACCENT_COLOR} 0%, #7c3aed 100%)`,
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
            Start exploring 4.1M+ cases with advanced analytics and AI-powered insights. No account required.
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
                borderRadius: '8px',
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
                borderRadius: '8px',
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
