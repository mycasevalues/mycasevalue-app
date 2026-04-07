'use client';

import React from 'react';

interface State { hasError: boolean; error?: Error }

// Hydration errors from browser extensions (Grammarly, etc.) are benign — don't crash the app
function isHydrationError(error: Error): boolean {
  const msg = error.message || '';
  return (
    msg.includes('Hydration') ||
    msg.includes('hydration') ||
    msg.includes('server HTML') ||
    msg.includes('matching') ||
    msg.includes('Text content does not match') ||
    msg.includes('did not match') ||
    msg.includes('Extra attributes') ||
    msg.includes('Minified React error #418') ||
    msg.includes('Minified React error #423') ||
    msg.includes('Minified React error #425')
  );
}

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Don't show error screen for hydration mismatches
    if (isHydrationError(error)) {
      return { hasError: false };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (isHydrationError(error)) {
      return;
    }
    console.error('[ErrorBoundary] componentDidCatch:', error.message || error, info);

    // Send error to analytics (fire-and-forget)
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'error_caught',
          sessionId: typeof sessionStorage !== 'undefined'
            ? sessionStorage.getItem('__analytics_session_id') || 'unknown'
            : 'unknown',
          timestamp: Date.now(),
          pathname: typeof window !== 'undefined' ? window.location.pathname : undefined,
          data: {
            type: 'react_boundary',
            message: error.message?.slice(0, 500),
            stack: error.stack?.slice(0, 1000),
            componentStack: info.componentStack?.slice(0, 500),
          },
        }),
      }).catch(() => {});
    } catch { /* silent */ }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F7F8FA',
          fontFamily: 'var(--font-body)',
          padding: 24,
        }}>
          <div style={{
            maxWidth: 440,
            textAlign: 'center',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: 4,
            padding: '48px 32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#0966C3',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#0f0f0f', marginBottom: 8, fontFamily: 'var(--font-display)' }}>Something went wrong</h2>
            <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6, marginBottom: 24 }}>
              We encountered an unexpected error. Your data is safe — please try refreshing the page.
            </p>
            <button type="button"
              onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
              style={{
                padding: '0 32px',
                height: '48px',
                background: '#0966C3',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Refresh page
            </button>
            <p style={{ fontSize: 11, color: '#4B5563', marginTop: 16 }}>
              If this persists, contact support@mycasevalue.com
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
