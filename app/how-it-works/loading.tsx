export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="h-4 w-32 bg-[rgba(255,255,255,0.08)] mb-6 animate-pulse" style={{ borderRadius: '4px' }} />
        <div className="h-8 w-2/3 bg-[rgba(255,255,255,0.08)] mb-4 animate-pulse" style={{ borderRadius: '4px' }} />
        <div className="h-4 w-1/2 bg-[rgba(255,255,255,0.08)] mb-8 animate-pulse" style={{ borderRadius: '4px' }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-white border border-[var(--bdr)] animate-pulse" style={{ borderRadius: '4px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
