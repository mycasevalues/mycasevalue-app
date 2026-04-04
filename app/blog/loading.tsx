export default function BlogLoading() {
  return (
    <div className="min-h-screen" style={{ background: '#EDEEEE' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#D5D8DC', background: '#00172E' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4 animate-pulse"
            style={{ background: '#FFF3F4', color: '#CC1019' }}>
            <div className="w-3 h-3 rounded-full" style={{ background: '#CC1019' }} />
            INSIGHTS & ANALYSIS
          </div>
          <div className="h-12 rounded-lg mb-4 animate-pulse" style={{ background: '#D5D8DC' }} />
          <div className="h-8 rounded-lg max-w-2xl animate-pulse" style={{ background: '#D5D8DC' }} />
        </div>
      </div>

      {/* Blog posts skeleton */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-2xl border p-8" style={{ borderColor: '#D5D8DC', background: '#FFFFFF' }}>
              <div className="flex flex-col gap-4">
                <div className="h-6 w-24 rounded animate-pulse" style={{ background: '#E5EBF0' }} />
                <div className="space-y-2">
                  <div className="h-8 rounded animate-pulse" style={{ background: '#E5EBF0' }} />
                  <div className="h-8 w-3/4 rounded animate-pulse" style={{ background: '#E5EBF0' }} />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-4 rounded animate-pulse" style={{ background: '#E5EBF0' }} />
                  <div className="h-4 w-5/6 rounded animate-pulse" style={{ background: '#E5EBF0' }} />
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-4 w-20 rounded-full animate-pulse" style={{ background: '#E5EBF0' }} />
                  <div className="h-4 w-20 rounded-full animate-pulse" style={{ background: '#E5EBF0' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
