'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF7F0',
          fontFamily: 'Outfit, system-ui, sans-serif',
          padding: 24,
        }}>
          <div style={{
            maxWidth: 440,
            textAlign: 'center',
            background: '#131B2E',
            borderRadius: 24,
            padding: '48px 32px',
            boxShadow: '0 4px 24px rgba(11,18,33,0.06)',
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F0F2F5', marginBottom: 8 }}>Something went wrong</h2>
            <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6, marginBottom: 24 }}>
              We encountered an unexpected error. Please try refreshing.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #B8923A, #C9A54E)',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
