import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { getAllTerms, getFeaturedTerms } from '../../lib/glossary';
import GlossaryExplorer from '../../components/GlossaryExplorer';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Legal Glossary — Federal Court Terms Defined',
  description: 'Plain-English definitions of 327 federal court terms. NOS codes, PACER, settlement percentiles, win rates, summary judgment, and more legal jargon explained.',
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    title: 'Legal Glossary',
    description: 'Plain-English definitions of 327 federal court terms. NOS codes, PACER, settlement percentiles, win rates, summary judgment, and more legal jargon explained.',
    url: `${SITE_URL}/glossary`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Glossary',
    description: 'Plain-English definitions of 327 federal court terms. NOS codes, PACER, settlement percentiles, win rates, summary judgment, and more legal jargon explained.',
  },
};

export default function GlossaryPage() {
  const allTerms = getAllTerms();
  const featuredTerms = getFeaturedTerms();

  // Format terms for the explorer component
  const explorerTerms = allTerms.map((term) => ({
    slug: term.slug,
    term: term.term,
    definition: term.definition,
  }));

  const explorerFeatured = featuredTerms.map((term) => ({
    slug: term.slug,
    term: term.term,
    definition: term.definition,
  }));

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'var(--accent-primary)' }}>
        <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: 'var(--color-surface-0)' }}>
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <span>/</span>
            <span>Glossary</span>
          </nav>

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '20px' }}
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-surface-0)" strokeWidth="2.5">
              <path d="M12 2L2 7V12C2 16.5 6.48 20.68 12 22C17.52 20.68 22 16.5 22 12V7L12 2Z" />
            </svg>
            REFERENCE
          </div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: 'var(--color-surface-0)',
              letterSpacing: '-1.5px',
              marginBottom: '16px',
              fontFamily: 'var(--font-ui)',
            }}
          >
            Legal Glossary
          </h1>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--color-surface-0)',
              maxWidth: '600px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Plain-English definitions of federal court terms, data concepts, and legal statutes used throughout MyCaseValue.
          </p>
          <div className="mt-6 inline-block px-3 py-1.5 text-[13px] font-semibold" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--color-surface-0)', borderRadius: '4px' }}>
            327 Legal Terms
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div
          style={{
            background: 'var(--color-surface-0)',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <GlossaryExplorer terms={explorerTerms} featured={explorerFeatured} />
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Have a term you think should be in this glossary?
          </p>
          <a
            href="mailto:support@mycasevalues.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              color: 'var(--color-text-primary)',
              borderRadius: '4px',
            }}
          >
            <svg aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Suggest a Term
          </a>
        </div>
      </div>

      {/* Related Tools */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <style>
          {`
            .glossary-tool-card {
              background: var(--color-surface-0);
              border: 1px solid var(--border-default);
              border-radius: 12px;
              text-decoration: none;
              display: block;
              transition: all 200ms ease;
              padding: 24px;
            }

            .glossary-tool-card:hover {
              border-color: var(--accent-primary);
              box-shadow: 0 2px 8px rgba(232, 23, 31, 0.12);
            }
          `}
        </style>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '24px', fontFamily: 'var(--font-ui)' }}>
          Related Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/translate" className="glossary-tool-card">
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>
              Case Translator
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>Convert between case types and legal citations.</div>
          </Link>

          <Link href="/nos-explorer" className="glossary-tool-card">
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>
              NOS Explorer
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>Browse and explore Nature of Suit codes.</div>
          </Link>

          <Link href="/search" className="glossary-tool-card">
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>
              Case Search
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>Search federal court cases by type and location.</div>
          </Link>

          <Link href="/methodology" className="glossary-tool-card">
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>
              Our Methodology
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>Learn how we analyze federal court data.</div>
          </Link>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            name: 'Legal Glossary',
            description: 'Plain-English definitions of federal court terms, data concepts, and legal statutes',
            url: `${SITE_URL}/glossary`,
            hasDefinedTerm: allTerms.map((term) => ({
              '@type': 'DefinedTerm',
              name: term.term,
              definition: term.definition,
            })),
          }),
        }}
      />
    </div>
  );
}
