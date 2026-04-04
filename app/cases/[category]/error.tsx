'use client';

export default function CategoryError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F9FA' }}>
      <div className="text-center max-w-md mx-auto px-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#212529' }}>Something went wrong</h2>
        <p className="text-sm mb-6" style={{ color: '#455A64' }}>
          We couldn&apos;t load this case type. Please try again.
        </p>
        <button type="button"
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
