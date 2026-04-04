/**
 * StatuteOfLimitations.tsx — Paper Design System component.
 * Displays statute of limitations information for legal case categories.
 */

'use client';

import React from 'react';

interface StatuteOfLimitationsProps {
  category: string;
}

const STATUTES: Record<
  string,
  { limits: string[]; notes: string; warning: string }
> = {
  work: {
    limits: [
      'EEOC charge: 180 days (non-deferral) or 300 days (deferral states)',
      'Federal lawsuit: 90 days after EEOC right-to-sue letter',
      'Section 1981 claims: 4 years',
    ],
    notes: 'For Title VII, ADA, ADEA claims you must file an EEOC charge before suing.',
    warning: 'Missing the EEOC deadline permanently bars your federal claim.',
  },
  injury: {
    limits: [
      'Federal Tort Claims Act: 2 years',
      'General personal injury: 2-3 years (varies by state)',
      'Medical malpractice: 2-3 years from discovery',
    ],
    notes: 'If your case involves a federal employee or agency, the FTCA 2-year limit applies.',
    warning:
      'Statutes of limitations are strict deadlines — missing them usually ends your case.',
  },
  consumer: {
    limits: [
      'FDCPA (debt collection): 1 year',
      'TCPA (robocalls): 4 years',
      'FCRA (credit reporting): 2 years from discovery',
      'Truth in Lending: 1 year',
    ],
    notes: 'Consumer protection statutes each have different limitations periods.',
    warning:
      'Each statute has its own deadline — check which law covers your situation.',
  },
  rights: {
    limits: [
      'Section 1983: varies by state (1-3 years)',
      'Fair Housing Act: 2 years',
      'Bivens claims: varies by state',
    ],
    notes: 'Section 1983 borrows the personal injury statute from the state where the violation occurred.',
    warning: 'Government defendants may have additional notice requirements.',
  },
  money: {
    limits: [
      'Breach of contract: 4-6 years (varies)',
      'Securities fraud: 2 years from discovery',
      'RICO: 4 years',
      'Fraud: 2-5 years from discovery',
    ],
    notes: 'Contract disputes often depend on state law even in federal court.',
    warning: 'Discovery rule may extend some deadlines — consult an attorney.',
  },
  housing: {
    limits: [
      'Fair Housing Act: 2 years',
      'Section 1983 housing claims: varies',
      'Landlord-tenant: varies (1-6 years)',
    ],
    notes: 'Housing discrimination under FHA has a strict 2-year federal limit.',
    warning: 'Some states have shorter deadlines for housing claims.',
  },
  medical: {
    limits: [
      'ERISA benefit denials: 180 days to appeal internally',
      'SSDI appeals: 60 days from denial',
      'Medical malpractice: 2-3 years from discovery',
    ],
    notes: 'Benefits cases often require exhausting administrative remedies first.',
    warning: 'Missing administrative appeal deadlines can bar your federal claim.',
  },
  family: {
    limits: [
      'Most family law is state court',
      'VAWA: 4 years',
      'Interstate custody (UCCJEA): varies',
    ],
    notes: 'Federal family law cases are uncommon — most belong in state court.',
    warning:
      'If you believe you have a federal family claim, consult an attorney immediately.',
  },
  gov: {
    limits: [
      'Federal benefits appeals: 60-90 days',
      'Tax disputes: 2 years from IRS denial',
      'FOIA: 6 years',
      'Social Security: 60 days from ALJ decision',
    ],
    notes: 'Government claims almost always require exhausting administrative remedies.',
    warning: 'Federal agency deadlines are strict and rarely waived.',
  },
  education: {
    limits: [
      'Title IX: 180-300 days for OCR complaint',
      'IDEA: 2 years',
      'Section 504: varies by state',
    ],
    notes: 'Education discrimination may need Department of Education review first.',
    warning: 'School districts have specific notice requirements.',
  },
};

export function StatuteOfLimitations({ category }: StatuteOfLimitationsProps) {
  const statute = STATUTES[category];

  if (!statute) {
    return null;
  }

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      {/* Warning box */}
      <div
        role="alert"
        style={{
          backgroundColor: '#FEF3C7',
          borderLeft: '4px solid #D97706',
          borderRadius: '8px',
          padding: '16px 20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D97706"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: '2px' }}
          aria-hidden="true"
        >
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              color: '#92400E',
              margin: '0 0 4px 0',
            }}
          >
            Critical Deadline
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#78350F',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {statute.warning}
          </p>
        </div>
      </div>

      {/* Limits list */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
            color: '#111111',
            margin: '0 0 12px 0',
          }}
        >
          Time Limits
        </h3>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {statute.limits.map((limit, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--fg-secondary)',
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  color: '#8B5CF6',
                  fontWeight: 600,
                  marginTop: '2px',
                  flexShrink: 0,
                }}
              >
                •
              </span>
              <span>{limit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notes box */}
      <div
        style={{
          backgroundColor: 'var(--bg-hover)',
          borderRadius: '8px',
          padding: '14px 16px',
          borderLeft: '3px solid #7C3AED',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--fg-secondary)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {statute.notes}
        </p>
      </div>

      {/* Disclaimer */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: '#6B7280',
          lineHeight: 1.6,
          margin: 0,
          fontStyle: 'italic',
        }}
      >
        This information is for educational purposes only and should not be
        construed as legal advice. Consult an attorney regarding your specific
        situation and applicable state law.
      </p>
    </section>
  );
}

export default StatuteOfLimitations;
