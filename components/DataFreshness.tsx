/**
 * DataFreshness.tsx
 * Reusable component for displaying data freshness indicator
 * Non-intrusive footer link to methodology page
 */

export default function DataFreshness() {
  return (
    <a
      href="/methodology"
      style={{
        fontSize: '12px',
        color: '#9ca3af',
        fontFamily: 'var(--font-body)',
        textDecoration: 'none',
        display: 'inline-block',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
      }}
      className="data-freshness-link"
      title="View methodology and data sources"
    >
      FJC data: Q4 2024 · Updated March 2025
      <style>{`
        .data-freshness-link:hover {
          color: #6b7280;
        }
      `}</style>
    </a>
  );
}
