export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--surf)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="h-4 w-32 bg-[var(--bdr)] mb-6 animate-pulse" style={{ borderRadius: '4px' }} />
        <div className="h-8 w-2/3 bg-[var(--bdr)] mb-4 animate-pulse" style={{ borderRadius: '4px' }} />
        <div className="h-4 w-1/2 bg-[var(--bdr)] mb-8 animate-pulse" style={{ borderRadius: '4px' }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-[var(--card)] border border-[var(--bdr)] animate-pulse" style={{ borderRadius: '4px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
