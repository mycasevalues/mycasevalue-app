'use client';

export default function NosCodeError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-surface-1)' }}>
      <div className="text-center max-w-md mx-auto px-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Something went wrong</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          We couldn&apos;t load data for this case type. Please try again.
        </p>
        <button type="button"
          onClick={reset}
          className="px-6 py-2 text-sm font-medium text-white"
          style={{ background: 'var(--color-text-primary)', borderRadius: '12px' }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
