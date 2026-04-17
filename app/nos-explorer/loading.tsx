export default function NosExplorerLoading() {
  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', padding: '2rem' }}>
      {/* Header skeleton */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          height: '14px',
          width: '180px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
        }} />
        <div style={{
          height: '36px',
          width: '400px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderRadius: '4px',
          marginBottom: '0.75rem',
        }} />
        <div style={{
          height: '18px',
          width: '600px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderRadius: '4px',
          marginBottom: '2rem',
        }} />

        {/* Search bar skeleton */}
        <div style={{
          height: '48px',
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderRadius: '4px',
          marginBottom: '2rem',
        }} />

        {/* Grid skeleton */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              height: '120px',
              backgroundColor: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              padding: '1rem',
            }}>
              <div style={{ height: '14px', width: '60%', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '0.75rem' }} />
              <div style={{ height: '12px', width: '40%', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '4px', marginBottom: '0.5rem' }} />
              <div style={{ height: '12px', width: '80%', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
