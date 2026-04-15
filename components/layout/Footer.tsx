/**
 * Footer — Clean 4-column layout with consistent copy.
 */

import Link from 'next/link';

const COL_PLATFORM = [
  { label: 'Case Types', href: '/cases' },
  { label: 'Judges', href: '/judges' },
  { label: 'Districts', href: '/districts' },
  { label: 'Attorney Tools', href: '/attorney' },
  { label: 'Pricing', href: '/pricing' },
];

const COL_RESOURCES = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const COL_DATA = [
  { label: 'Data Sources', href: '/data-sources' },
  { label: 'Methodology', href: '/methodology' },
  {
    label: 'FJC Integrated Database',
    href: 'https://fjc.gov',
    external: true,
  },
  {
    label: 'CourtListener / RECAP',
    href: 'https://courtlistener.com',
    external: true,
  },
];

export default function Footer() {
  return (
    <footer
      className="site-footer border-t"
      role="contentinfo"
      style={{
        background: 'var(--color-surface-0)',
        borderColor: 'var(--border-default)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1.2fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <svg
                width="32"
                height="32"
                viewBox="-100 -100 200 200"
                className="block flex-shrink-0"
              >
                <rect
                  x="-100"
                  y="-100"
                  width="200"
                  height="200"
                  rx="26"
                  fill="#0966C3"
                />
                <g transform="rotate(12)">
                  <polygon
                    points="0,0 -40,-69.3 40,-69.3 80,0"
                    fill="white"
                    opacity="0.93"
                  />
                  <polygon
                    points="0,0 80,0 40,69.3 -40,69.3"
                    fill="white"
                    opacity="0.52"
                  />
                  <polygon
                    points="0,0 -40,69.3 -80,0 -40,-69.3"
                    fill="white"
                    opacity="0.24"
                  />
                </g>
              </svg>
              <span className="font-inter text-base font-bold text-gray-900 tracking-tight">
                MyCase<span className="text-brand-blue">Value</span>
              </span>
            </Link>
            <p className="text-sm font-medium text-gray-900 mb-2 leading-snug">
              Federal court intelligence, built from public records.
            </p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed max-w-xs">
              Case outcomes, judge analytics, and litigation data sourced
              entirely from public federal court and agency records.
            </p>
            <a
              href="https://linkedin.com/company/mycasevalue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-400"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {COL_PLATFORM.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {COL_RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Data
            </h3>
            <ul className="space-y-2.5">
              {COL_DATA.map((link) => (
                <li key={link.href}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-brand-blue transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-brand-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden mb-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <svg
                width="32"
                height="32"
                viewBox="-100 -100 200 200"
                className="block flex-shrink-0"
              >
                <rect
                  x="-100"
                  y="-100"
                  width="200"
                  height="200"
                  rx="26"
                  fill="#0966C3"
                />
                <g transform="rotate(12)">
                  <polygon
                    points="0,0 -40,-69.3 40,-69.3 80,0"
                    fill="white"
                    opacity="0.93"
                  />
                  <polygon
                    points="0,0 80,0 40,69.3 -40,69.3"
                    fill="white"
                    opacity="0.52"
                  />
                  <polygon
                    points="0,0 -40,69.3 -80,0 -40,-69.3"
                    fill="white"
                    opacity="0.24"
                  />
                </g>
              </svg>
              <span className="font-inter text-base font-bold text-gray-900 tracking-tight">
                MyCase<span className="text-brand-blue">Value</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              Federal court intelligence, built from public records.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Platform
              </h3>
              <ul className="space-y-2">
                {COL_PLATFORM.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-brand-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Resources
              </h3>
              <ul className="space-y-2">
                {COL_RESOURCES.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-brand-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} MyCaseValue LLC &middot; West
              Virginia
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-gray-400 hover:text-brand-blue transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-gray-400 hover:text-brand-blue transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-xs text-gray-400 hover:text-brand-blue transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 text-center mt-4">
            Data sourced from public federal court records for informational
            purposes only. Not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
