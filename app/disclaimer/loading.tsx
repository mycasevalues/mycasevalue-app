export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="h-4 w-32 bg-[#E5E7EB] mb-6 animate-pulse" style={{ borderRadius: '12px' }} />
        <div className="h-8 w-2/3 bg-[#E5E7EB] mb-4 animate-pulse" style={{ borderRadius: '12px' }} />
        <div className="h-4 w-1/2 bg-[#E5E7EB] mb-8 animate-pulse" style={{ borderRadius: '12px' }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-[#FFFFFF] border border-[#E5E7EB] animate-pulse" style={{ borderRadius: '12px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
