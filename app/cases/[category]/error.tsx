'use client';

export default function CategoryError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-surface-1)' }}>
      <div className="text-center max-w-md mx-auto px-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Unable to load case category</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          We encountered an issue loading this case category. Try again or return to view all case types.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button"
            onClick={reset}
            className="px-6 py-2 text-sm font-medium text-white"
            style={{ background: 'var(--color-text-primary)', borderRadius: '12px' }}
          >
            Try again
          </button>
          <a
            href="/cases"
            className="px-6 py-2 text-sm font-medium"
            style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', color: 'var(--color-text-primary)', borderRadius: '12px', textDecoration: 'none' }}
          >
            View all cases
          </a>
        </div>
      </div>
    </div>
  );
}
