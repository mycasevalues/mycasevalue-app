'use client';

import Link from 'next/link';

interface FreeReportCTAProps {
  caseType?: string;
  district?: string;
}

export default function FreeReportCTA({ caseType, district }: FreeReportCTAProps) {
  let subtext = 'Get a free case outcome report for your case type';
  if (caseType && district) {
    subtext = `See how ${caseType} cases resolve in ${district}`;
  } else if (caseType) {
    subtext = `See how ${caseType} cases resolve in federal court`;
  } else if (district) {
    subtext = `Get a free case outcome report for ${district}`;
  }

  return (
    <div
      style={{
        background: 'var(--surf, #F6F5F2)',
        border: '1px solid var(--bdr)',
        borderRadius: 4,
        padding: '32px 24px',
        textAlign: 'center',
      }}
    >
      <h3
        style={{
          fontSize: 20,
          fontWeight: 600,
          fontFamily: 'var(--font-ui)',
          color: 'var(--color-text-primary, #18181A)',
          margin: '0 0 8px',
        }}
      >
        Get Your Free Report
      </h3>
      <p
        style={{
          fontSize: 14,
          fontWeight: 400,
          fontFamily: 'var(--font-ui)',
          color: 'var(--color-text-secondary, #42403C)',
          margin: '0 0 20px',
          lineHeight: 1.5,
        }}
      >
        {subtext}
      </p>
      <Link
        href="/sign-up"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          padding: '0 28px',
          background: 'var(--chrome-bg)',
          color: '#fff',
          borderRadius: 2,
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'var(--font-ui)',
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Get Free Report
      </Link>
      <p
        style={{
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'var(--font-ui)',
          color: 'var(--color-text-muted, #8A8780)',
          margin: '12px 0 0',
        }}
      >
        Free basic report — no credit card required
      </p>
    </div>
  );
}
