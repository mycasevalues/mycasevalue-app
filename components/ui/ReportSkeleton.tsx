export default function ReportSkeleton() {
  const bar = (w: string, h = '16px') => (
    <div style={{
      width: w, height: h,
      background: 'var(--bg-elevated)',
      borderRadius: '4px',
      animation: 'pulse 1.5s ease-in-out infinite',
    }} />
  );
  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .report-skeleton-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 768px) {
          .report-skeleton-grid { grid-template-columns: 1fr; gap: 12px !important; }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '48px 24px', maxWidth: '900px', margin: '0 auto' }}>
        {bar('40%', '32px')}
        {bar('25%', '16px')}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1,2,3].map(i => <div key={i} style={{ width: '120px', height: '24px', background: 'var(--bg-elevated)', borderRadius: '4px' }} />)}
        </div>
        {[1,2,3].map(i => (
          <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {bar('30%', '20px')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="report-skeleton-grid">
              {[1,2,3].map(j => <div key={j} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                {bar('60%', '36px')}
                {bar('80%', '12px')}
              </div>)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
