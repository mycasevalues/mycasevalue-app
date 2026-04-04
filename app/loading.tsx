export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 20, 40, 0.95) 100%)',
        gap: '24px',
      }}
    >
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Spinner */}
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '3px solid rgba(255, 255, 255, 0.10)',
          borderTop: '3px solid #1856FF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />

      {/* Loading text */}
      <p
        style={{
          fontSize: '14px',
          color: 'rgba(240, 242, 245, 0.70)',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
        }}
      >
        Loading
        <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>.</span>
        <span style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.2s' }}>.</span>
        <span style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.4s' }}>.</span>
      </p>
    </div>
  );
}
