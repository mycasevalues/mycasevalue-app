export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: '#F9F8F6' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="h-4 w-32 rounded bg-[#E5E0D8] mb-6 animate-pulse" />
        <div className="h-8 w-2/3 rounded bg-[#E5E0D8] mb-4 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-[#E5E0D8] mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-[#FFFFFF] border border-[#E5E0D8] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
