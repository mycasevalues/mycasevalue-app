'use client';

/**
 * Footer.tsx — White background footer with 5-column layout.
 * Part of the MyCaseValue site overhaul.
 *
 * Desktop: 5 columns (Brand, EXPLORE, RESOURCES, USE CASES, DATA)
 * Mobile: Column 1 at top, Columns 2-5 in 2x2 grid
 * Bottom bar: Copyright left, links right, disclaimer center
 */

import Link from 'next/link';

const COLUMN_2_EXPLORE = [
  { label: 'Cases', href: '/cases' },
  { label: 'Judges', href: '/judges' },
  { label: 'Districts', href: '/districts' },
  { label: 'NOS Explorer', href: '/nos-explorer' },
  { label: 'Pricing', href: '/pricing' },
];

const COLUMN_3_RESOURCES = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const COLUMN_4_USE_CASES = [
  { label: 'For Pro Se Litigants', href: '/for/pro-se' },
  { label: 'For Attorneys', href: '/attorney' },
  { label: 'For Researchers', href: '/for/researchers' },
  { label: 'For Students', href: '/for/students' },
  { label: 'For Paralegals', href: '/for/paralegals' },
];

const COLUMN_5_DATA = [
  { label: 'Data Sources', href: '/data-sources' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'FJC Integrated Database', href: 'https://fjc.gov', external: true },
  { label: 'CourtListener / RECAP', href: 'https://courtlistener.com', external: true },
];

export default function Footer() {
  return (
    <footer
      className="site-footer"
      role="contentinfo"
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid #E0DDD8',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        {/* Desktop grid: 5 columns */}
        <div
          className="hidden lg:grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1.2fr',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <svg width="40" height="40" viewBox="-100 -100 200 200" style={{ display: 'block', flexShrink: 0 }}>
                <rect x="-100" y="-100" width="200" height="200" rx="26" fill="#0966C3" />
                <g transform="rotate(12)">
                  <polygon points="0,0 -40,-69.3 40,-69.3 80,0" fill="white" opacity="0.93" />
                  <polygon points="0,0 80,0 40,69.3 -40,69.3" fill="white" opacity="0.52" />
                  <polygon points="0,0 -40,69.3 -80,0 -40,-69.3" fill="white" opacity="0.24" />
                </g>
              </svg>
              <span style={{
                fontFamily: 'var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '-0.3px',
                color: '#0f0f0f',
              }}>
                MyCase<span style={{ color: '#0966C3' }}>Value</span>
              </span>
            </Link>
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: '12px',
              lineHeight: '1.4',
            }}>
              The federal court record, open to everyone.
            </p>
            <p style={{
              fontSize: '13px',
              color: '#4B5563',
              marginBottom: '16px',
              lineHeight: '1.5',
            }}>
              Data sourced entirely from public federal court records.
            </p>
            <a
              href="https://linkedin.com/company/mycasevalue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
              }}
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#4B5563' }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Column 2: EXPLORE */}
          <div>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#999999',
              marginBottom: '16px',
            }}>
              Explore
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {COLUMN_2_EXPLORE.map((link) => (
                <li key={link.href} style={{ marginBottom: '12px' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: '#4B5563',
                      textDecoration: 'none',
                      transition: 'color 200ms',
                    }}
                    className="hover:text-brand-blue"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#999999',
              marginBottom: '16px',
            }}>
              Resources
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {COLUMN_3_RESOURCES.map((link) => (
                <li key={link.href} style={{ marginBottom: '12px' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: '#4B5563',
                      textDecoration: 'none',
                      transition: 'color 200ms',
                    }}
                    className="hover:text-brand-blue"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: USE CASES */}
          <div>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#999999',
              marginBottom: '16px',
            }}>
              Use Cases
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {COLUMN_4_USE_CASES.map((link) => (
                <li key={link.href} style={{ marginBottom: '12px' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: '#4B5563',
                      textDecoration: 'none',
                      transition: 'color 200ms',
                    }}
                    className="hover:text-brand-blue"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: DATA */}
          <div>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#999999',
              marginBottom: '16px',
            }}>
              Data
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {COLUMN_5_DATA.map((link) => (
                <li key={link.href} style={{ marginBottom: '12px' }}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '14px',
                        color: '#4B5563',
                        textDecoration: 'none',
                        transition: 'color 200ms',
                      }}
                      className="hover:text-brand-blue"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '14px',
                        color: '#4B5563',
                        textDecoration: 'none',
                        transition: 'color 200ms',
                      }}
                      className="hover:text-brand-blue"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile: Column 1 + 2x2 grid */}
        <div className="lg:hidden mb-8">
          {/* Column 1: Brand (full width on mobile) */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <svg width="40" height="40" viewBox="-100 -100 200 200" style={{ display: 'block', flexShrink: 0 }}>
                <rect x="-100" y="-100" width="200" height="200" rx="26" fill="#0966C3" />
                <g transform="rotate(12)">
                  <polygon points="0,0 -40,-69.3 40,-69.3 80,0" fill="white" opacity="0.93" />
                  <polygon points="0,0 80,0 40,69.3 -40,69.3" fill="white" opacity="0.52" />
                  <polygon points="0,0 -40,69.3 -80,0 -40,-69.3" fill="white" opacity="0.24" />
                </g>
              </svg>
              <span style={{
                fontFamily: 'var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '-0.3px',
                color: '#0f0f0f',
              }}>
                MyCase<span style={{ color: '#0966C3' }}>Value</span>
              </span>
            </Link>
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: '12px',
              lineHeight: '1.4',
            }}>
              The federal court record, open to everyone.
            </p>
            <p style={{
              fontSize: '13px',
              color: '#4B5563',
              marginBottom: '16px',
              lineHeight: '1.5',
            }}>
              Data sourced entirely from public federal court records.
            </p>
            <a
              href="https://linkedin.com/company/mycasevalue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
              }}
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#4B5563' }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* 2x2 grid for Columns 2-5 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Column 2: EXPLORE */}
            <div>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#999999',
                marginBottom: '16px',
              }}>
                Explore
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {COLUMN_2_EXPLORE.map((link) => (
                  <li key={link.href} style={{ marginBottom: '12px' }}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '14px',
                        color: '#4B5563',
                        textDecoration: 'none',
                        transition: 'color 200ms',
                      }}
                      className="hover:text-brand-blue"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: RESOURCES */}
            <div>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#999999',
                marginBottom: '16px',
              }}>
                Resources
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {COLUMN_3_RESOURCES.map((link) => (
                  <li key={link.href} style={{ marginBottom: '12px' }}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '14px',
                        color: '#4B5563',
                        textDecoration: 'none',
                        transition: 'color 200ms',
                      }}
                      className="hover:text-brand-blue"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: USE CASES */}
            <div>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#999999',
                marginBottom: '16px',
              }}>
                Use Cases
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {COLUMN_4_USE_CASES.map((link) => (
                  <li key={link.href} style={{ marginBottom: '12px' }}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '14px',
                        color: '#4B5563',
                        textDecoration: 'none',
                        transition: 'color 200ms',
                      }}
                      className="hover:text-brand-blue"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: DATA */}
            <div>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#999999',
                marginBottom: '16px',
              }}>
                Data
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {COLUMN_5_DATA.map((link) => (
                  <li key={link.href} style={{ marginBottom: '12px' }}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '14px',
                          color: '#4B5563',
                          textDecoration: 'none',
                          transition: 'color 200ms',
                        }}
                        className="hover:text-brand-blue"
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{
                          fontSize: '14px',
                          color: '#4B5563',
                          textDecoration: 'none',
                          transition: 'color 200ms',
                        }}
                        className="hover:text-brand-blue"
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar: full-width, border-top */}
        <div
          style={{
            borderTop: '1px solid #E0DDD8',
            paddingTop: '24px',
            marginTop: '24px',
          }}
        >
          {/* Desktop: left + right + center */}
          <div className="hidden md:flex items-center justify-between gap-8 mb-4">
            {/* Left: Copyright */}
            <p style={{
              fontSize: '12px',
              color: '#999999',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              © 2026 MyCaseValue LLC · West Virginia
            </p>

            {/* Right: Links */}
            <div style={{ display: 'flex', gap: '24px', flexShrink: 0 }}>
              <Link
                href="/privacy"
                style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                className="hover:text-brand-blue"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
              >
                Privacy Policy
              </Link>
              <span style={{ color: '#E0DDD8' }}>→</span>
              <Link
                href="/terms"
                style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                className="hover:text-brand-blue"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
              >
                Terms of Service
              </Link>
              <span style={{ color: '#E0DDD8' }}>→</span>
              <Link
                href="/contact"
                style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                className="hover:text-brand-blue"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
              >
                Responsible Disclosure
              </Link>
            </div>
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden mb-4">
            <p style={{
              fontSize: '12px',
              color: '#999999',
              margin: '0 0 16px 0',
            }}>
              © 2026 MyCaseValue LLC · West Virginia
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href="/privacy"
                style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                className="hover:text-brand-blue"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                className="hover:text-brand-blue"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                className="hover:text-brand-blue"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0966C3')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
              >
                Responsible Disclosure
              </Link>
            </div>
          </div>

          {/* Center: Disclaimer */}
          <p style={{
            fontSize: '11px',
            color: '#999999',
            textAlign: 'center',
            margin: 0,
            lineHeight: '1.4',
          }}>
            Data sourced from public federal court records for informational purposes only. Not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
