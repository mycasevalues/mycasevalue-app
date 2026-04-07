'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import React, { createContext, useContext } from 'react';

// Create a context for demo mode
const DemoModeContext = createContext<boolean>(false);

/**
 * Hook to detect if demo mode is active
 */
export function useDemoMode(): boolean {
  return useContext(DemoModeContext);
}

/**
 * Badge component shown in demo mode
 */
function DemoModeBadge() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  if (!isDemo) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        backgroundColor: '#0966C3',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        boxShadow: '0 2px 8px rgba(10, 102, 194, 0.2)',
        pointerEvents: 'none',
      }}
    >
      Demo Mode
    </div>
  );
}

/**
 * DemoModeProvider wrapper
 */
export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isDemo = useMemo(() => searchParams.get('demo') === 'true', [searchParams]);

  return (
    <DemoModeContext.Provider value={isDemo}>
      {children}
      <DemoModeBadge />
    </DemoModeContext.Provider>
  );
}

/**
 * Client component that detects demo mode via useSearchParams
 * Wrapped in Suspense for proper Next.js App Router support
 */
export default function DemoMode() {
  return (
    <Suspense fallback={null}>
      <DemoModeProvider>
        <div />
      </DemoModeProvider>
    </Suspense>
  );
}
