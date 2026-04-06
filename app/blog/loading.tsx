export default function BlogLoading() {
  return (
    <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#E5E7EB', background: '#1B3A5C' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4 animate-pulse"
            style={{ background: '#FFF3F4', color: '#7C3AED', borderRadius: '9999px' }}>
            <div className="w-3 h-3" style={{ background: '#7C3AED', borderRadius: '50%' }} />
            INSIGHTS & ANALYSIS
          </div>
          <div className="h-12 mb-4 animate-pulse" style={{ background: '#E5E7EB', borderRadius: '6px' }} />
          <div className="h-8 max-w-2xl animate-pulse" style={{ background: '#E5E7EB', borderRadius: '6px' }} />
        </div>
      </div>

      {/* Blog posts skeleton */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border p-8" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '6px' }}>
              <div className="flex flex-col gap-4">
                <div className="h-6 w-24 animate-pulse" style={{ background: '#E5E7EB', borderRadius: '6px' }} />
                <div className="space-y-2">
                  <div className="h-8 animate-pulse" style={{ background: '#E5E7EB', borderRadius: '6px' }} />
                  <div className="h-8 w-3/4 animate-pulse" style={{ background: '#E5E7EB', borderRadius: '6px' }} />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-4 animate-pulse" style={{ background: '#E5E7EB', borderRadius: '6px' }} />
                  <div className="h-4 w-5/6 animate-pulse" style={{ background: '#E5E7EB', borderRadius: '6px' }} />
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-4 w-20 animate-pulse" style={{ background: '#E5E7EB', borderRadius: '9999px' }} />
                  <div className="h-4 w-20 animate-pulse" style={{ background: '#E5E7EB', borderRadius: '9999px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
