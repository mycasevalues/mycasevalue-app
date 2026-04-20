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
    <div className="min-h-screen" style={{ background: 'var(--surf)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--bdr)', background: 'var(--link)' }}>
        <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: 'var(--card)' }}>
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <span>/</span>
            <span>Glossary</span>
          </nav>

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'var(--link)', color: 'var(--card)', borderRadius: '2px' }}
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--card)" strokeWidth="2.5">
              <path d="M12 2L2 7V12C2 16.5 6.48 20.68 12 22C17.52 20.68 22 16.5 22 12V7L12 2Z" />
            </svg>
            REFERENCE
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--card)',
              letterSpacing: '-1.5px',
              marginBottom: '16px',
              fontFamily: 'var(--font-legal)',
            }}
          >
            Legal Glossary
          </h1>
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--card)',
              maxWidth: '600px',
              fontFamily: 'var(--font-ui)',
            }}
          >
            Plain-English definitions of federal court terms, data concepts, and legal statutes used throughout MyCaseValue.
          </p>
          <div className="mt-6 inline-block px-3 py-1.5 text-[13px] font-semibold" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--card)', borderRadius: '4px' }}>
            327 Legal Terms
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div
          style={{
            background: 'var(--card)',
            borderRadius: '4px',
            border: '1px solid var(--bdr)',
            padding: '32px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <GlossaryExplorer terms={explorerTerms} featured={explorerFeatured} />
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t" style={{ borderColor: 'var(--bdr)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>
            Have a term you think should be in this glossary?
          </p>
          <a
            href="mailto:support@mycasevalues.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              color: 'var(--text1)',
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
              background: var(--card);
              border: 1px solid var(--bdr);
              border-radius: 2px;
              text-decoration: none;
              display: block;
              transition: all 200ms ease;
              padding: 24px;
            }

            .glossary-tool-card:hover {
              border-color: var(--link);
              box-shadow: 0 2px 8px rgba(232, 23, 31, 0.12);
            }
          `}
        </style>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text1)', marginBottom: 12, fontFamily: 'var(--font-legal)' }}>
          Related Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/translate" className="glossary-tool-card">
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', marginBottom: '8px', fontFamily: 'var(--font-legal)' }}>
              Case Translator
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text2)' }}>Convert between case types and legal citations.</div>
          </Link>

          <Link href="/nos-explorer" className="glossary-tool-card">
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', marginBottom: '8px', fontFamily: 'var(--font-legal)' }}>
              NOS Explorer
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text2)' }}>Browse and explore Nature of Suit codes.</div>
          </Link>

          <Link href="/search" className="glossary-tool-card">
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', marginBottom: '8px', fontFamily: 'var(--font-legal)' }}>
              Case Search
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text2)' }}>Search federal court cases by type and location.</div>
          </Link>

          <Link href="/methodology" className="glossary-tool-card">
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', marginBottom: '8px', fontFamily: 'var(--font-legal)' }}>
              Our Methodology
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text2)' }}>Learn how we analyze federal court data.</div>
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
