'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Hydration errors from browser extensions (Grammarly, etc.) are benign -- don't crash the app
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

/**
 * Default fallback UI for the ErrorBoundary.
 * Uses inline styles with CSS custom properties for Westlaw Precision design consistency.
 */
function DefaultFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surf, #F6F5F2)',
        fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          background: 'var(--card)',
          border: '1px solid var(--bdr, #E2DFD8)',
          borderRadius: 4,
          padding: '48px 32px',
          boxShadow: '0 1px 4px rgba(27, 45, 69, 0.08)',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: '100%',
            height: 4,
            background: 'var(--chrome-bg, #1B2D45)',
            borderRadius: '4px 4px 0 0',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />

        {/* Alert icon */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 4,
            background: 'rgba(176, 30, 30, 0.06)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--data-negative, #B01E1E)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--chrome-bg, #1B2D45)',
            margin: '0 0 8px',
            fontFamily: "var(--font-legal, 'Libre Baskerville', serif)",
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          Something went wrong
        </h2>

        <p
          style={{
            fontSize: 15,
            color: 'var(--text-tertiary)',
            lineHeight: 1.6,
            margin: '0 0 28px',
            fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
            maxWidth: 380,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          This tool encountered an error. Please try refreshing.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={onRetry}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 24px',
              background: 'var(--chrome-bg, #1B2D45)',
              color: 'var(--chrome-text)',
              border: 'none',
              borderRadius: 2,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
              cursor: 'pointer',
              transition: 'background 150ms ease',
              letterSpacing: '0.01em',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            Try Again
          </button>
          <a
            href="mailto:support@mycasevalues.com?subject=Error%20Report"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 24px',
              background: 'transparent',
              color: 'var(--link, #0A50A2)',
              border: '1px solid var(--bdr, #E2DFD8)',
              borderRadius: 2,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'border-color 150ms ease',
              letterSpacing: '0.01em',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Report Issue
          </a>
        </div>
      </div>
    </div>
  );
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
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

    // Fire optional callback
    if (this.props.onError) {
      this.props.onError(error, info);
    }

    // Send error to analytics (fire-and-forget)
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'error_caught',
          sessionId:
            typeof sessionStorage !== 'undefined'
              ? sessionStorage.getItem('__analytics_session_id') || 'unknown'
              : 'unknown',
          timestamp: Date.now(),
          pathname:
            typeof window !== 'undefined'
              ? window.location.pathname
              : undefined,
          data: {
            type: 'react_boundary',
            message: error.message?.slice(0, 500),
            stack: error.stack?.slice(0, 1000),
            componentStack: info.componentStack?.slice(0, 500),
          },
        }),
      }).catch(() => {});
    } catch {
      /* silent */
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <DefaultFallback onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
