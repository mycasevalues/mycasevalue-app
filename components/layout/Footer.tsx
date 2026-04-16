/**
 * Footer — Bloomberg Law-style institutional footer.
 *
 * Specs:
 * - Background: #1A1A1A (charcoal, matching nav bar)
 * - 3-column link layout + brand column
 * - System-status strip: mono, green dot, operational status
 * - Data lineage row
 * - Bottom bar: copyright, legal links
 * - No SOC 2 badge (per mandatory rules)
 */

import Link from 'next/link';

const COLS = [
  {
    title: 'Platform',
    links: [
      { label: 'Case Types', href: '/cases' },
      { label: 'Judges', href: '/judges' },
      { label: 'Districts', href: '/districts' },
      { label: 'Attorney Tools', href: '/attorney' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Whitepaper', href: '/methodology/whitepaper' },
      { label: 'FAQ', href: '/faq' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Data',
    links: [
      { label: 'Data Sources', href: '/data-sources' },
      { label: 'Changelog', href: '/data/changelog' },
      { label: 'API Reference', href: '/api-docs' },
      { label: 'FJC IDB', href: 'https://fjc.gov', external: true },
      { label: 'CourtListener', href: 'https://courtlistener.com', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: '#1A1A1A',
        color: 'rgba(255,255,255,0.6)',
        borderTop: '1px solid #333333',
      }}
    >
      {/* System-status strip */}
      <div
        style={{
          background: '#222222',
          borderBottom: '1px solid #333333',
          padding: '10px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span
              className="animate-pulse"
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803D' }}
              aria-hidden
            />
            <span style={{ color: '#15803D' }}>All systems operational</span>
          </span>
          <span>Uptime · 99.98%</span>
          <span>Cases indexed · 5,147,392</span>
          <span>Last refresh · 02:00 UTC</span>
          <span>Build · v2026.04</span>
        </div>
      </div>

      {/* Main footer content */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
            marginBottom: 32,
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-inter)',
              }}
            >
              MyCaseValue
            </span>
            <p
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.45)',
                marginTop: 8,
                lineHeight: 1.5,
                maxWidth: 200,
              }}
            >
              Institutional-grade federal court intelligence sourced from public records.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: 12,
                }}
              >
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.55)',
                          textDecoration: 'none',
                          transition: 'color 120ms',
                        }}
                        className="footer-link"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.55)',
                          textDecoration: 'none',
                          transition: 'color 120ms',
                        }}
                        className="footer-link"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data lineage row */}
        <div
          style={{
            borderTop: '1px solid #333333',
            paddingTop: 20,
            paddingBottom: 16,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px 24px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            Data lineage
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            FJC IDB · CourtListener · PACER (RECAP) · EEOC · USCIS · USPTO · SEC
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.3)',
              marginLeft: 'auto',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            Refreshed daily · 02:00 UTC
          </span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #333333',
            paddingTop: 20,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            &copy; {new Date().getFullYear()} MyCaseValue LLC · West Virginia
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {['Privacy', 'Terms', 'Security', 'Contact'].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  transition: 'color 120ms',
                }}
                className="footer-link"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'center',
            marginTop: 24,
          }}
        >
          Data from public federal court records · Not legal advice
        </p>
      </div>

      <style>{`
        .footer-link:hover { color: #FFFFFF !important; }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
