/**
 * Footer.tsx — Westlaw Precision 4-column dark footer
 *
 * Background: var(--chrome-bg) = #1B2D45
 * Border-top: 1px solid var(--chrome-border) = #2A3F58
 * 4 columns: Brand | Product | Tools | Company
 * Bottom bar: copyright + attribution
 * No orange anywhere. No status strip. No data lineage row.
 */

import Link from 'next/link';

/* ── Column definitions ── */

const COLS = [
  {
    title: 'PRODUCT',
    links: [
      { label: 'Federal Districts', href: '/districts' },
      { label: 'Judges', href: '/judges' },
      { label: 'Case Analytics', href: '/analytics' },
      { label: 'Settlement Ranges', href: '/cases' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'API', href: '/api-docs' },
    ],
  },
  {
    title: 'TOOLS',
    links: [
      { label: 'Precision Analytics', href: '/analytics' },
      { label: 'Venue Comparison', href: '/compare' },
      { label: 'Settlement Calculator', href: '/attorney' },
      { label: 'Alert Setup', href: '/dashboard' },
      { label: 'Methodology', href: '/methodology' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Changelog', href: '/data/changelog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

/* ── Column header style ── */
const colHeaderStyle: React.CSSProperties = {
  fontSize: 10,
  fontFamily: 'var(--font-ui)',
  fontWeight: 600,
  color: 'var(--chrome-text-muted, #8AAAC8)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 8,
};

/* ── Link style ── */
const linkStyle: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'var(--font-ui)',
  color: 'var(--chrome-text-muted, #8AAAC8)',
  textDecoration: 'none',
  lineHeight: 2.1,
  transition: 'color 120ms',
};

/* ── Gold cube logo (20px) ── */
function GoldCube() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14 2L26 9V19L14 26L2 19V9L14 2Z" fill="var(--gold, #C4882A)" />
      <path d="M14 2L26 9L14 16L2 9L14 2Z" fill="var(--gold, #C4882A)" opacity="0.9" />
      <path d="M14 16V26L2 19V9L14 16Z" fill="var(--gold, #C4882A)" opacity="0.7" />
      <path d="M14 16V26L26 19V9L14 16Z" fill="var(--gold, #C4882A)" opacity="0.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--chrome-bg, #1B2D45)',
        borderTop: '1px solid var(--chrome-border, #2A3F58)',
        padding: '24px 0 16px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* 4-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}
          className="footer-grid"
        >
          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <GoldCube />
              <span
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-legal)',
                  fontWeight: 700,
                  color: 'var(--card, #FFFFFF)',
                }}
              >
                MyCaseValue
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                fontFamily: 'var(--font-ui)',
                color: 'var(--chrome-text-muted, #8AAAC8)',
                lineHeight: 1.5,
                maxWidth: 170,
                marginTop: 6,
                marginBottom: 0,
              }}
            >
              The Federal Court Record. Open to Everyone.
            </p>
            <p
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-ui)',
                color: 'var(--gold, #C4882A)',
                marginTop: 4,
                marginBottom: 0,
              }}
            >
              No enterprise price tag.
            </p>
          </div>

          {/* Cols 2-4 — Product, Tools, Company */}
          {COLS.map((col) => (
            <div key={col.title}>
              <p style={colHeaderStyle}>{col.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {col.links.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    style={linkStyle}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'var(--chrome-border, #2A3F58)',
            margin: '16px 0',
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-ui)',
              color: 'var(--chrome-text-muted, #8AAAC8)',
              margin: 0,
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            &copy; {new Date().getFullYear()} MyCaseValue LLC. All rights reserved. Federal court
            data sourced from FJC IDB, CourtListener, RECAP, and PACER.
          </p>
          <p
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-ui)',
              color: 'var(--chrome-text-muted, #8AAAC8)',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Built for pro se litigants, solo attorneys, law students, and researchers.
          </p>
        </div>
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
