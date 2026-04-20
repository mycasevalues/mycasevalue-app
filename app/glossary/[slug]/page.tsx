import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../lib/site-config';
import { getAllTerms, getTermBySlug } from '../../../lib/glossary';
import JsonLd from '../../../components/JsonLd';

const styles = `
  .glossary-nos-link {
    transition: all 200ms ease;
  }
  .glossary-nos-link:hover {
    background-color: rgba(10,80,162,0.08) !important;
    border-color: var(--link) !important;
  }

  .glossary-related-term {
    transition: all 200ms ease;
  }
  .glossary-related-term:hover {
    background-color: rgba(10,80,162,0.08) !important;
    border-color: var(--link) !important;
  }

  .glossary-case-type-link {
    transition: all 200ms ease;
  }
  .glossary-case-type-link:hover {
    background-color: var(--gold) !important;
  }

  .glossary-back-link {
    transition: all 200ms ease;
  }
  .glossary-back-link:hover {
    border-color: var(--link) !important;
  }
`;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const term = getTermBySlug(resolvedParams.slug);

  if (!term) {
    return {
      title: 'Term Not Found',
      description: 'The glossary term you are looking for does not exist.',
    };
  }

  const termUrl = `${SITE_URL}/glossary/${term.slug}`;

  return {
    title: `${term.term} - Legal Glossary`,
    description: term.definition,
    alternates: { canonical: termUrl },
    openGraph: {
      title: term.term,
      description: term.definition,
      url: termUrl,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const allTerms = getAllTerms();
  return allTerms.map((term) => ({
    slug: term.slug,
  }));
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const resolvedParams = await params;
  const term = getTermBySlug(resolvedParams.slug);

  if (!term) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--surf)' }}>
        <div className="max-w-3xl mx-auto px-6 py-24">
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text1)' }}>
            Term not found
          </h1>
          <p style={{ color: 'var(--text2)', marginTop: '12px' }}>
            The glossary term you are looking for does not exist.
          </p>
          <Link
            href="/glossary"
            style={{
              display: 'inline-block',
              marginTop: '24px',
              padding: '8px 16px',
              background: 'var(--link)',
              color: 'var(--card)',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Back to Glossary
          </Link>
        </div>
      </div>
    );
  }

  const relatedTermObjects = term.relatedTerms
    .map((slug) => getTermBySlug(slug))
    .filter((t) => t !== undefined);

  return (
    <div className="min-h-screen" style={{ background: 'var(--surf)' }}>
      <style>{styles}</style>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--bdr)', background: 'var(--link)' }}>
        <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2" style={{ color: 'var(--card)', fontSize: 14 }}>
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <span>/</span>
            <Link href="/glossary" className="hover:opacity-80 transition-opacity">
              Glossary
            </Link>
            <span>/</span>
            <span>{term.term}</span>
          </nav>

          {/* Term name */}
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--card)',
              letterSpacing: '-1.5px',
              marginBottom: '12px',
              fontFamily: 'var(--font-legal)',
            }}
          >
            {term.term}
          </h1>

          {/* Pronunciation if available */}
          {term.pronunciation && (
            <div
              style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-ui)',
              }}
            >
              /{term.pronunciation}/
            </div>
          )}
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
          {/* Definition Section */}
          <section className="mb-8" style={{ borderBottom: '1px solid var(--bdr)', paddingBottom: '24px' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link)',
                marginBottom: '12px',
              }}
            >
              Definition
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text1)' }}>
              {term.definition}
            </p>
          </section>

          {/* Federal Context Section */}
          <section className="mb-8" style={{ borderBottom: '1px solid var(--bdr)', paddingBottom: '24px' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link)',
                marginBottom: '12px',
              }}
            >
              In Federal Court
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text1)' }}>
              {term.federalContext}
            </p>
          </section>

          {/* Data Context Section */}
          <section className="mb-8" style={{ borderBottom: '1px solid var(--bdr)', paddingBottom: '24px' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link)',
                marginBottom: '12px',
              }}
            >
              In the Data
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text1)', marginBottom: '12px' }}>
              {term.dataContext}
            </p>
            {term.relatedNosCodes.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text2)', marginBottom: '8px' }}>
                  Related NOS Codes:
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {term.relatedNosCodes.map((code) => (
                    <Link
                      key={code}
                      href={`/nos/${code}`}
                      className="glossary-nos-link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 12px',
                        background: 'var(--surf)',
                        border: '1px solid var(--bdr)',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--link)',
                        textDecoration: 'none',
                        transition: 'all 200ms ease',
                      }}
                    >
                      {code}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Related Terms Section */}
          {relatedTermObjects.length > 0 && (
            <section className="mb-8" style={{ borderBottom: '1px solid var(--bdr)', paddingBottom: '24px' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--link)',
                  marginBottom: '12px',
                }}
              >
                Related Terms
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {relatedTermObjects.map((relatedTerm) => (
                  <Link
                    key={relatedTerm!.slug}
                    href={`/glossary/${relatedTerm!.slug}`}
                    className="glossary-related-term"
                    style={{
                      display: 'block',
                      padding: '12px 14px',
                      background: 'var(--surf)',
                      border: '1px solid var(--bdr)',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--link)',
                      textDecoration: 'none',
                      transition: 'all 200ms ease',
                    }}
                  >
                    {relatedTerm!.term}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Case Types / NOS Codes Section */}
          {term.relatedNosCodes.length > 0 && (
            <section className="mb-0" style={{ paddingBottom: '0' }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--link)',
                  marginBottom: '12px',
                }}
              >
                Related Case Types
              </h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Array.from(new Set(term.relatedNosCodes)).map((code) => (
                  <Link
                    key={code}
                    href={`/nos/${code}`}
                    className="glossary-case-type-link"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 14px',
                      background: 'var(--link)',
                      color: 'var(--card)',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 200ms ease',
                    }}
                  >
                    View Case Type {code}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Source Citation */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid var(--bdr)',
              fontSize: '14px',
              color: 'var(--text2)',
            }}
          >
            <p style={{ margin: 0 }}>
              Source: <em>{term.source}</em>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/glossary"
            className="glossary-back-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              color: 'var(--text1)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 200ms ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Glossary
          </Link>
        </div>
      </div>

      {/* JSON-LD: DefinedTerm + FAQPage + BreadcrumbList */}
      <JsonLd
        data={{
          '@graph': [
            {
              '@type': 'DefinedTerm',
              name: term.term,
              description: term.definition,
              definition: term.definition,
              url: `${SITE_URL}/glossary/${term.slug}`,
              inDefinedTermSet: {
                '@type': 'DefinedTermSet',
                name: 'MyCaseValue Legal Glossary',
                url: `${SITE_URL}/glossary`,
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${SITE_URL}/glossary` },
                { '@type': 'ListItem', position: 3, name: term.term, item: `${SITE_URL}/glossary/${term.slug}` },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `What does "${term.term}" mean in legal terms?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: term.definition,
                  },
                },
                {
                  '@type': 'Question',
                  name: `How does "${term.term}" apply in federal court?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: term.federalContext,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What does the data show about "${term.term}"?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: term.dataContext,
                  },
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
