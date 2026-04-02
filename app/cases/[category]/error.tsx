'use client';

export default function CategoryError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F9F8F6' }}>
      <div className="text-center max-w-md mx-auto px-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>Something went wrong</h2>
        <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
          We couldn&apos;t load this case category. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: '#111111' }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
