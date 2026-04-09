/**
 * Reusable JSON-LD Structured Data Component
 *
 * Use this component to render JSON-LD structured data on any page.
 * The script tag with type="application/ld+json" is safe to use even in Client Components.
 *
 * Example usage:
 * ```tsx
 * <JsonLd data={{
 *   '@context': 'https://schema.org',
 *   '@type': 'Article',
 *   headline: 'My Article',
 *   author: { '@type': 'Person', name: 'John Doe' }
 * }} />
 * ```
 */

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
