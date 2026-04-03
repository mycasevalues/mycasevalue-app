'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class PageErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PageErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center px-6"
          style={{ background: '#F9F8F6', fontFamily: "'Roboto', system-ui, sans-serif" }}
        >
          <div className="text-center max-w-md">
            <div
              className="text-6xl font-bold mb-4"
              style={{ color: '#111111' }}
            >
              Oops
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#111827' }}>
              Something went wrong
            </h2>
            <p className="text-base mb-6" style={{ color: '#6B7280' }}>
              We encountered an error loading this page. Please try again.
            </p>
            <div className="flex flex-col gap-3">
              <button type="button"
                onClick={() => this.setState({ hasError: false })}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                  boxShadow: '0 4px 14px rgba(64, 64, 242, 0.22)',
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-center transition-all"
                style={{
                  color: '#6B7280',
                  border: '1px solid #E5E0D8',
                  background: 'transparent',
                }}
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
