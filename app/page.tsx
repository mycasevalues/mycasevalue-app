'use client';

import dynamic from 'next/dynamic';

const MyCaseValue = dynamic(() => import('../components/MyCaseValue'), {
  ssr: false,
  loading: () => (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0B1221 0%, #0F1729 50%, #0A0D18 100%)',
      gap: 24,
    }}>
      <div style={{ width: 64, height: 64, position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 0%, #B8923A 50%, transparent 100%)',
          animation: 'spin 1.2s linear infinite', opacity: 0.3,
        }} />
        <div style={{
          position: 'absolute', inset: 4, borderRadius: '50%', background: '#0B1221',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B8923A" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>
      <div style={{
        fontFamily: 'Newsreader, Georgia, serif', fontSize: 18, fontWeight: 600,
        letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg, #B8923A, #D4AF37, #C9A54E)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: 0.9,
      }}>
        MyCaseValue
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
});

export default function Page() {
  return <MyCaseValue />;
}
