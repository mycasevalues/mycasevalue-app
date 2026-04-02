export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: '#0B1221' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="h-4 w-32 rounded bg-[#1E293B] mb-6 animate-pulse" />
        <div className="h-8 w-2/3 rounded bg-[#1E293B] mb-4 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-[#1E293B] mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-[#131B2E] border border-[#1E293B] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
