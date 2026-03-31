export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-base)',
        gap: '20px',
      }}
    >
      {/* Animated logo pulse */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />

      {/* Skeleton content blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <div
          style={{
            width: '180px',
            height: '14px',
            borderRadius: '7px',
            background: 'var(--bg-skeleton)',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.1s',
          }}
        />
        <div
          style={{
            width: '120px',
            height: '10px',
            borderRadius: '5px',
            background: 'var(--bg-skeleton)',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.2s',
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
