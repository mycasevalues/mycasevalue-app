'use client';

import React, { ReactNode } from 'react';
import { useSupabaseAuth } from '@/lib/hooks/useSupabaseAuth';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  toolId: string;
  requiresPro?: boolean;
}

export function ToolPageLayout({
  title,
  description,
  children,
  toolId,
  requiresPro = false,
}: ToolPageLayoutProps) {
  const { isAuthenticated, loading } = useSupabaseAuth();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[rgba(255,255,255,0.08)] rounded w-1/3"></div>
            <div className="h-4 bg-[rgba(255,255,255,0.08)] rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[var(--bdr, #E2DFD8)]">
        <div className="max-w-4xl mx-auto px-6 py-4 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1
                  className="text-xl sm:text-2xl font-semibold text-[var(--color-text-muted)]"
                  style={{ fontFamily: 'var(--font-legal)' }}
                >
                  {title}
                </h1>
                {requiresPro && (
                  <span
                    className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-[var(--color-surface-1)]"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Pro
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Gate \u2014 only shown when requiresPro and not authenticated */}
      {requiresPro && !isAuthenticated ? (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="rounded border border-[var(--bdr, #E2DFD8)] p-8 sm:p-12 text-center bg-[var(--color-surface-2)]">
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-muted)] mb-3">
              Sign in to access this tool
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
              This is a Pro attorney tool. Sign in to your MyCaseValue account to continue.
            </p>
            <a
              href="/sign-in"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium text-white transition-colors bg-[var(--gold,#C4882A)] hover:bg-[var(--gold-hover,#A87222)]"
            >
              Sign in
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 py-12">
            {children}
          </div>

          {/* Footer Disclaimer */}
          <div className="border-t border-[var(--bdr, #E2DFD8)] bg-[var(--color-surface-2)] mt-12">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                This tool is provided for informational and analytical purposes only and does not
                constitute legal advice. Results should be reviewed by a qualified attorney. MyCaseValue
                assumes no liability for the use of this tool or accuracy of its results. Always
                consult with legal counsel regarding your specific matter.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
