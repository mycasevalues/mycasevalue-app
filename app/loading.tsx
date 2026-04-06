export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F7F8FA',
        gap: '24px',
        position: 'relative',
      }}
    >
      {/* Dark navy accent bar at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: '#1B3A5C',
        }}
      />
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
          border: '3px solid #E5E7EB',
          borderTop: '3px solid #6D28D9',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />

      {/* Loading text */}
      <p
        style={{
          fontSize: '14px',
          color: '#4B5563',
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
