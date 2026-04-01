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
      background: '#0B1221',
      gap: 24,
    }}>
      <div style={{ width: 48, height: 48, position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '3px solid rgba(64, 64, 242, 0.12)',
          borderTopColor: '#4F46E5',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
      <div style={{
        fontFamily: 'Outfit, system-ui, sans-serif',
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: '-0.5px',
        color: '#F0F2F5',
        opacity: 0.8,
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
