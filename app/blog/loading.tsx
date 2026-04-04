export default function BlogLoading() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, var(--bg-base) 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4 animate-pulse"
            style={{ background: 'rgba(24,86,255,0.12)', color: '#3D72FF' }}>
            <div className="w-3 h-3 rounded-full" style={{ background: '#3D72FF' }} />
            INSIGHTS & ANALYSIS
          </div>
          <div className="h-12 rounded-lg mb-4 animate-pulse" style={{ background: 'rgba(24,86,255,0.10)' }} />
          <div className="h-8 rounded-lg max-w-2xl animate-pulse" style={{ background: 'rgba(24,86,255,0.10)' }} />
        </div>
      </div>

      {/* Blog posts skeleton */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-2xl border p-8" style={{ borderColor: 'var(--border-default)', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
              <div className="flex flex-col gap-4">
                <div className="h-6 w-24 rounded animate-pulse" style={{ background: 'rgba(24,86,255,0.10)' }} />
                <div className="space-y-2">
                  <div className="h-8 rounded animate-pulse" style={{ background: 'rgba(24,86,255,0.10)' }} />
                  <div className="h-8 w-3/4 rounded animate-pulse" style={{ background: 'rgba(24,86,255,0.10)' }} />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-4 rounded animate-pulse" style={{ background: 'rgba(24,86,255,0.08)' }} />
                  <div className="h-4 w-5/6 rounded animate-pulse" style={{ background: 'rgba(24,86,255,0.08)' }} />
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-4 w-20 rounded-full animate-pulse" style={{ background: 'rgba(24,86,255,0.08)' }} />
                  <div className="h-4 w-20 rounded-full animate-pulse" style={{ background: 'rgba(24,86,255,0.08)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
