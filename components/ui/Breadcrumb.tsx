'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMemo } from 'react';

/**
 * Humanize URL segment with special rules
 */
function humanizeSegment(segment: string): string {
  // Special case mappings
  const specialMappings: Record<string, string> = {
    'pro-se': 'Pro Se Litigants',
    'api-access': 'API Access',
    'nos-explorer': 'NOS Explorer',
    'how-it-works': 'How It Works',
    'attorney': 'For Attorneys',
  };

  if (specialMappings[segment]) {
    return specialMappings[segment];
  }

  // Skip "for" segment (show child directly)
  if (segment === 'for') {
    return '';
  }

  // Keep numbers and IDs as-is
  if (/^\d+$/.test(segment)) {
    return segment;
  }

  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Build breadcrumb array from pathname
 */
function buildBreadcrumbs(pathname: string): Array<{ label: string; href: string; isCurrent: boolean }> {
  // Pages that should NOT show breadcrumbs
  const excludedPages = ['/', '/sign-in', '/sign-up'];
  if (excludedPages.includes(pathname)) {
    return [];
  }

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: Array<{ label: string; href: string; isCurrent: boolean }> = [];

  // Always start with Home
  breadcrumbs.push({
    label: 'Home',
    href: '/',
    isCurrent: false,
  });

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isCurrent = index === segments.length - 1;

    // Skip "for" segments—they're not breadcrumb items, but their children are
    if (segment === 'for') {
      return;
    }

    const label = humanizeSegment(segment);

    // Don't add empty labels (only happens with "for" which we already skip)
    if (label) {
      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrent,
      });
    }
  });

  return breadcrumbs;
}

/**
 * Generate JSON-LD BreadcrumbList schema markup
 */
function generateBreadcrumbSchema(breadcrumbs: Array<{ label: string; href: string }>) {
  const items = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.label,
    item: `${typeof window !== 'undefined' ? window.location.origin : ''}${crumb.href}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function Breadcrumb() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => buildBreadcrumbs(pathname), [pathname]);

  // Don't render if no breadcrumbs
  if (breadcrumbs.length === 0) {
    return null;
  }

  const schemaMarkup = useMemo(() => generateBreadcrumbSchema(breadcrumbs), [breadcrumbs]);

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex flex-wrap items-center gap-0 text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-0">
              {crumb.isCurrent ? (
                // Current page: not a link, styled differently
                <span
                  aria-current="page"
                  className="text-gray-900 font-medium"
                >
                  {crumb.label}
                </span>
              ) : (
                // Linkable crumb
                <>
                  <Link
                    href={crumb.href}
                    className="hover:text-brand-blue transition-colors"
                  >
                    {crumb.label}
                  </Link>
                  {/* Separator after non-current crumbs */}
                  {index < breadcrumbs.length - 1 && (
                    <span className="mx-2 text-gray-300" aria-hidden="true">
                      ›
                    </span>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
