'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const PLAN_MESSAGES: Record<string, { heading: string; message: string }> = {
  single: {
    heading: 'Single Report Purchased',
    message: 'Your Single Report is ready. Run your case lookup to generate it.',
  },
  unlimited: {
    heading: 'Unlimited Reports Activated',
    message: 'Your Unlimited Reports subscription is active. Start researching any case.',
  },
  attorney: {
    heading: 'Attorney Mode Activated',
    message: 'Attorney Mode is active. Access all professional features.',
  },
};

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'single';
  const info = PLAN_MESSAGES[plan] || PLAN_MESSAGES.single;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-base)',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
          borderRadius: '12px',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        {/* Green Checkmark */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#ECFDF5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--fg-primary)',
            margin: '0 0 8px 0',
            lineHeight: 1.2,
          }}
        >
          Payment successful!
        </h1>

        {/* Plan-specific subheading */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--accent-primary)',
            margin: '0 0 16px 0',
          }}
        >
          {info.heading}
        </p>

        {/* Message */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--fg-muted)',
            margin: '0 0 32px 0',
            lineHeight: 1.6,
          }}
        >
          {info.message}
        </p>

        {/* Primary CTA */}
        <Link
          href="/cases"
          style={{
            display: 'block',
            width: '100%',
            padding: '14px 16px',
            backgroundColor: 'var(--fg-primary)',
            color: 'var(--bg-surface)',
            border: 'none',
            borderRadius: '12px',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 600,
            textDecoration: 'none',
            textAlign: 'center',
            transition: 'background-color 0.2s, transform 0.1s',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        >
          Start Researching →
        </Link>

        {/* Secondary Link */}
        <Link
          href="/dashboard"
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--accent-secondary)',
            textDecoration: 'none',
            fontWeight: 500,
            padding: '8px 0',
          }}
        >
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-base)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--fg-muted)' }}>
            Loading...
          </p>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
