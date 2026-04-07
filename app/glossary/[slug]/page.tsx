import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../../lib/site-config';
import { getAllTerms, getTermBySlug } from '../../../lib/glossary';

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
      <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
        <div className="max-w-3xl mx-auto px-6 py-24">
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#0f0f0f' }}>
            Term not found
          </h1>
          <p style={{ color: '#4B5563', marginTop: '12px' }}>
            The glossary term you are looking for does not exist.
          </p>
          <Link
            href="/glossary"
            style={{
              display: 'inline-block',
              marginTop: '24px',
              padding: '10px 16px',
              background: '#0A66C2',
              color: '#FFFFFF',
              borderRadius: '8px',
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
    <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#E5E7EB', background: '#1B3A5C' }}>
        <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: '#FFFFFF' }}>
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
              fontSize: '32px',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '-1.5px',
              marginBottom: '12px',
              fontFamily: 'var(--font-display)',
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
                fontFamily: 'var(--font-body)',
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
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          {/* Definition Section */}
          <section className="mb-8" style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '24px' }}>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                color: '#0A66C2',
                marginBottom: '12px',
              }}
            >
              Definition
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#0f0f0f' }}>
              {term.definition}
            </p>
          </section>

          {/* Federal Context Section */}
          <section className="mb-8" style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '24px' }}>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                color: '#0A66C2',
                marginBottom: '12px',
              }}
            >
              In Federal Court
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#0f0f0f' }}>
              {term.federalContext}
            </p>
          </section>

          {/* Data Context Section */}
          <section className="mb-8" style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '24px' }}>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                color: '#0A66C2',
                marginBottom: '12px',
              }}
            >
              In the Data
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#0f0f0f', marginBottom: '12px' }}>
              {term.dataContext}
            </p>
            {term.relatedNosCodes.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563', marginBottom: '8px' }}>
                  Related NOS Codes:
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {term.relatedNosCodes.map((code) => (
                    <Link
                      key={code}
                      href={`/nos/${code}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 12px',
                        background: '#F0F2F5',
                        border: '1px solid #E5E7EB',
                        borderRadius: '16px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#0A66C2',
                        textDecoration: 'none',
                        transition: 'all 200ms ease',
                      }}
                      onMouseOver={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = '#E6F1FF';
                        el.style.borderColor = '#0A66C2';
                      }}
                      onMouseOut={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = '#F0F2F5';
                        el.style.borderColor = '#E5E7EB';
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
            <section className="mb-8" style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '24px' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  color: '#0A66C2',
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
                    style={{
                      display: 'block',
                      padding: '12px 14px',
                      background: '#F7F8FA',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0A66C2',
                      textDecoration: 'none',
                      transition: 'all 200ms ease',
                    }}
                    onMouseOver={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = '#E6F1FF';
                      el.style.borderColor = '#0A66C2';
                    }}
                    onMouseOut={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = '#F7F8FA';
                      el.style.borderColor = '#E5E7EB';
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
                  fontSize: '18px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  color: '#0A66C2',
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
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 14px',
                      background: '#0A66C2',
                      color: '#FFFFFF',
                      borderRadius: '16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 200ms ease',
                    }}
                    onMouseOver={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = '#004182';
                    }}
                    onMouseOut={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = '#0A66C2';
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
              borderTop: '1px solid #E5E7EB',
              fontSize: '13px',
              color: '#666',
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
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              color: '#0f0f0f',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 200ms ease',
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = '#0A66C2';
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = '#E5E7EB';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Glossary
          </Link>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: term.term,
            description: term.definition,
            definition: term.definition,
            url: `${SITE_URL}/glossary/${term.slug}`,
          }),
        }}
      />
    </div>
  );
}
