/**
 * Footer — Institutional dark footer matching homepage aesthetic.
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
      { label: 'FAQ', href: '/faq' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Data',
    links: [
      { label: 'Data Sources', href: '/data-sources' },
      { label: 'FJC IDB', href: 'https://fjc.gov', external: true },
      { label: 'CourtListener', href: 'https://courtlistener.com', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background: '#060a14', color: '#94a3b8' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-sm font-bold text-white">
              MyCase<span style={{ color: '#3b82f6' }}>Value</span>
            </span>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-xs">
              Federal court intelligence from public records.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-3">
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

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-400">
            &copy; {new Date().getFullYear()} MyCaseValue LLC &middot; West Virginia
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[11px] text-gray-400 hover:text-gray-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[11px] text-gray-400 hover:text-gray-400 transition-colors">Terms</Link>
            <Link href="/contact" className="text-[11px] text-gray-400 hover:text-gray-400 transition-colors">Contact</Link>
          </div>
        </div>

        <p className="text-[10px] text-gray-300 text-center mt-4">
          Data from public federal court records. Not legal advice.
        </p>
      </div>
    </footer>
  );
}
