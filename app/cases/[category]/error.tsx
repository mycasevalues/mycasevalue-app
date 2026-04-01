'use client';

export default function CategoryError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0B1221' }}>
      <div className="text-center max-w-md mx-auto px-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#F0F2F5' }}>Something went wrong</h2>
        <p className="text-sm mb-6" style={{ color: '#94A3B8' }}>
          We couldn&apos;t load this case category. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: '#4F46E5' }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
