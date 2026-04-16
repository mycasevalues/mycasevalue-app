/**
 * Footer — Bloomberg-style institutional dark with mono status row.
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
        background: '#060a14',
        color: '#94a3b8',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* System-status strip — mono terminal row */}
      <div
        style={{
          background: '#080d19',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          padding: '10px 24px',
        }}
      >
        <div
          className="max-w-5xl mx-auto"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span
              className="animate-pulse"
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}
              aria-hidden
            />
            <span style={{ color: '#22c55e' }}>All systems operational</span>
          </span>
          <span>Uptime · 99.98%</span>
          <span>Cases indexed · 5,147,392</span>
          <span>Last refresh · 02:00 UTC</span>
          <span>Build · v2026.04</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-sm font-bold text-white tracking-tight">
              MyCase<span style={{ color: '#60a5fa' }}>Value</span>
            </span>
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed max-w-xs">
              Institutional-grade federal court intelligence sourced from public records.
            </p>
            <div
              style={{
                marginTop: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 8px',
                borderRadius: 4,
                border: '1px solid rgba(59,130,246,0.2)',
                background: 'rgba(59,130,246,0.06)',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#60a5fa',
              }}
            >
              SOC 2 TYPE II · In progress
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: 12,
                }}
              >
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
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
            borderTop: '1px solid rgba(255,255,255,0.05)',
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
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Data lineage
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.6)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            FJC IDB · CourtListener · PACER (RECAP) · EEOC · USCIS · USPTO · SEC
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.35)',
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
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: 20,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <p className="text-[11px] text-gray-400" style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} MyCaseValue LLC · West Virginia
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[11px] text-gray-400 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[11px] text-gray-400 hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link href="/security" className="text-[11px] text-gray-400 hover:text-gray-300 transition-colors">
              Security
            </Link>
            <Link href="/contact" className="text-[11px] text-gray-400 hover:text-gray-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <p className="text-[10px] text-gray-500 text-center mt-6" style={{ fontFamily: 'var(--font-mono)' }}>
          Data from public federal court records · Not legal advice
        </p>
      </div>
    </footer>
  );
}
