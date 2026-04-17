/**
 * Reusable JSON-LD Structured Data Component
 *
 * Renders a <script type="application/ld+json"> tag for schema.org structured data.
 * Works as a Server Component — no 'use client' needed.
 *
 * Features:
 * - Automatically injects @context if not present
 * - Supports single objects and @graph arrays
 * - Safely serializes data to prevent XSS via script injection
 *
 * Example usage:
 * ```tsx
 * <JsonLd data={{
 *   '@type': 'Article',
 *   headline: 'My Article',
 *   author: { '@type': 'Person', name: 'John Doe' }
 * }} />
 * ```
 */

interface JsonLdProps {
  /** Any valid JSON-LD object. @context defaults to "https://schema.org" if omitted. */
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  const payload = {
    '@context': 'https://schema.org',
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload, null, 0).replace(
          /<\/script/gi,
          '<\\/script'
        ),
      }}
    />
  );
}
