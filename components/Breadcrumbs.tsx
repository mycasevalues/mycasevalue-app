import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string; // if no href, it's the current page (not linked)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const HomeIcon = () => (
  <svg aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 7V12.5C1 12.7761 1.22386 13 1.5 13H5V9H9V13H12.5C12.7761 13 13 12.7761 13 12.5V7M1 7L7 1.5L13 7M1 7H2.5M11.5 7V3.5"
      stroke="var(--accent-primary-hover)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate schema.org BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: item.href }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav
        className="breadcrumbs-container"
        aria-label="Breadcrumb"
        style={{
          padding: '0.75rem 0 0.5rem 0',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <React.Fragment key={`breadcrumb-${index}`}>
              {isFirst && (
                <span
                  className="breadcrumbs-home-icon"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginRight: '8px',
                  }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="breadcrumbs-link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'var(--accent-primary-hover)',
                        fontFamily: 'var(--font-body)',
                      }}
                      title={item.label}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      <HomeIcon />
                    </a>
                  ) : (
                    <span
                      className="breadcrumbs-current"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                      aria-current="page"
                    >
                      <HomeIcon />
                    </span>
                  )}
                </span>
              )}

              {!isFirst && (
                <span
                  className="breadcrumbs-separator"
                  style={{
                    color: 'var(--color-text-muted)',
                    margin: '0 8px',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                  }}
                  aria-hidden="true"
                >
                  /
                </span>
              )}

              {isFirst ? null : isLast ? (
                <span
                  className="breadcrumbs-current"
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-primary)',
                    fontWeight: '500',
                    fontFamily: 'var(--font-body)',
                  }}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="breadcrumbs-link"
                  style={{
                    fontSize: '13px',
                    color: 'var(--accent-primary-hover)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {item.label}
                </a>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      <style>{`
        .breadcrumbs-container {
          font-family: var(--font-body);
        }
        .breadcrumbs-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
