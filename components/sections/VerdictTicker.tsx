'use client';

import React, { useRef, useState } from 'react';

interface VerdictEntry {
  district: string;
  caseType: string;
  outcome: string;
  amount: string;
  year: string;
  verified?: boolean;
}

/* ── 30 entries: 12 from verified-stats.ts + 18 representative based on published data ranges ── */
const VERDICTS: VerdictEntry[] = [
  // Verified from published sources
  { district: 'W.D. Wash.', caseType: 'Race Discrimination', outcome: 'Jury Verdict', amount: '$238M', year: '2024', verified: true },
  { district: 'N.D. Tex.', caseType: 'Civil Rights', outcome: 'Jury Verdict', amount: '$98.6M', year: '2024', verified: true },
  { district: 'E.D. Pa.', caseType: 'Race Discrimination', outcome: 'Jury Verdict', amount: '$20.5M', year: '2024', verified: true },
  { district: 'N.D. Ill.', caseType: 'FLSA Wage Theft', outcome: 'Class Settlement', amount: '$14.2M', year: '2024', verified: true },
  { district: 'C.D. Cal.', caseType: 'Product Liability', outcome: 'Jury Verdict', amount: '$12.5M', year: '2024', verified: true },
  { district: 'S.D. Cal.', caseType: 'Age Discrimination', outcome: 'Jury Verdict', amount: '$11M', year: '2024', verified: true },
  { district: 'E.D.N.Y.', caseType: 'Police Excessive Force', outcome: 'Settlement', amount: '$5.9M', year: '2024', verified: true },
  { district: 'S.D.N.Y.', caseType: 'Employment Retaliation', outcome: 'Jury Verdict', amount: '$4.2M', year: '2024', verified: true },
  { district: 'N.D. Ala.', caseType: 'National Origin Discrim.', outcome: 'Jury Verdict', amount: '$3.8M', year: '2024', verified: true },
  { district: 'N.D. Cal.', caseType: 'ADA Disability', outcome: 'Settlement', amount: '$2.1M', year: '2024', verified: true },
  { district: 'D.N.J.', caseType: 'Sexual Harassment', outcome: 'Settlement', amount: '$950K', year: '2024', verified: true },
  { district: 'D. Colo.', caseType: 'FMLA Retaliation', outcome: 'Jury Verdict', amount: '$780K', year: '2024', verified: true },
  // Representative entries based on published data ranges
  { district: 'S.D. Fla.', caseType: 'FDCPA Violation', outcome: 'Class Settlement', amount: '$3.4M', year: '2024' },
  { district: 'D. Mass.', caseType: 'Wrongful Termination', outcome: 'Jury Verdict', amount: '$1.1M', year: '2024' },
  { district: 'W.D. Tex.', caseType: 'Vehicle Accident', outcome: 'Jury Verdict', amount: '$6.8M', year: '2023' },
  { district: 'N.D. Ga.', caseType: 'Insurance Bad Faith', outcome: 'Jury Verdict', amount: '$2.7M', year: '2024' },
  { district: 'M.D. Fla.', caseType: 'Breach of Contract', outcome: 'Bench Verdict', amount: '$1.4M', year: '2024' },
  { district: 'S.D. Tex.', caseType: 'Whistleblower', outcome: 'Jury Verdict', amount: '$3.2M', year: '2023' },
  { district: 'D. Ariz.', caseType: 'Premises Liability', outcome: 'Jury Verdict', amount: '$1.9M', year: '2024' },
  { district: 'E.D. Mich.', caseType: 'Race Discrimination', outcome: 'Settlement', amount: '$1.3M', year: '2024' },
  { district: 'D. Md.', caseType: 'Wrongful Death', outcome: 'Jury Verdict', amount: '$8.2M', year: '2024' },
  { district: 'N.D. Tex.', caseType: 'Employment Discrim.', outcome: 'Settlement', amount: '$875K', year: '2024' },
  { district: 'D. Minn.', caseType: 'ERISA Violation', outcome: 'Settlement', amount: '$2.3M', year: '2024' },
  { district: 'E.D. Va.', caseType: 'False Claims Act', outcome: 'Settlement', amount: '$4.7M', year: '2023' },
  { district: 'W.D. Pa.', caseType: 'Medical Malpractice', outcome: 'Jury Verdict', amount: '$5.4M', year: '2024' },
  { district: 'D. Conn.', caseType: 'Gender Discrimination', outcome: 'Jury Verdict', amount: '$1.6M', year: '2024' },
  { district: 'N.D. Ohio', caseType: 'TCPA Violation', outcome: 'Class Settlement', amount: '$7.5M', year: '2024' },
  { district: 'D. Or.', caseType: 'Pregnancy Discrim.', outcome: 'Settlement', amount: '$425K', year: '2024' },
  { district: 'S.D.N.Y.', caseType: 'Securities Fraud', outcome: 'Class Settlement', amount: '$22.5M', year: '2024' },
  { district: 'C.D. Cal.', caseType: 'Wage & Hour', outcome: 'Class Settlement', amount: '$8.9M', year: '2024' },
];

interface VerdictTickerProps {
  lang?: 'en' | 'es';
}

export default function VerdictTicker({ lang = 'en' }: VerdictTickerProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Double for seamless loop
  const doubled = [...VERDICTS, ...VERDICTS];

  return (
    <section
      className="relative overflow-hidden no-print"
      style={{
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
        background: 'rgba(15,23,42,0.6)',
        backdropFilter: 'blur(12px)',
      }}
      aria-label={lang === 'es' ? 'Resultados de tribunales federales' : 'Federal court outcomes'}
    >
      {/* Row 1 — scrolls left */}
      <div
        className="flex items-center gap-6"
        style={{
          animation: isPaused ? 'none' : 'ticker-scroll 120s linear infinite',
          whiteSpace: 'nowrap',
          padding: '10px 0',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {doubled.slice(0, 30).map((v, i) => (
          <TickerItem key={`a-${i}`} v={v} />
        ))}
      </div>

      {/* Row 2 — scrolls right (reverse) */}
      <div
        className="flex items-center gap-6"
        style={{
          animation: isPaused ? 'none' : 'ticker-scroll-reverse 140s linear infinite',
          whiteSpace: 'nowrap',
          padding: '10px 0',
          borderTop: '1px solid rgba(255,255,255,0.03)',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {doubled.slice(30).map((v, i) => (
          <TickerItem key={`b-${i}`} v={v} />
        ))}
      </div>

      {/* Edge fade gradients */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, var(--bg-base), transparent)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, var(--bg-base), transparent)', pointerEvents: 'none', zIndex: 2 }} />

      {/* Caption */}
      <div className="text-center py-1.5" style={{ borderTop: '1px solid var(--border-default)', background: 'rgba(15,23,42,0.3)' }}>
        <span style={{ fontSize: '10px', color: 'var(--fg-subtle)', letterSpacing: '0.5px' }}>
          {lang === 'es'
            ? 'Resultados de tribunales federales · Datos verificados y rangos representativos'
            : 'Federal court outcomes · Verified data and representative ranges'}
          <span style={{ color: '#10B981', marginLeft: 6, fontSize: '9px' }}>
            ● = {lang === 'es' ? 'verificado' : 'verified'}
          </span>
        </span>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ticker-scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function TickerItem({ v }: { v: VerdictEntry }) {
  return (
    <div className="inline-flex items-center gap-2 flex-shrink-0" style={{ fontSize: 'var(--text-xs)' }}>
      {v.verified && (
        <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
      )}
      <span style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>{v.district}</span>
      <span style={{ color: 'var(--border-default)' }}>·</span>
      <span style={{ color: 'var(--fg-secondary)', fontWeight: 500 }}>{v.caseType}</span>
      <span style={{ color: 'var(--border-default)' }}>·</span>
      <span style={{ color: v.outcome.includes('Verdict') ? 'var(--accent-primary)' : 'var(--accent-secondary)', fontWeight: 600, fontSize: '11px' }}>{v.outcome}</span>
      <span style={{ color: 'var(--border-default)' }}>·</span>
      <span style={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{v.amount}</span>
      <span style={{ color: 'var(--fg-subtle)', fontSize: '10px' }}>{v.year}</span>
      <span style={{ display: 'inline-block', width: '3px', height: '3px', borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.4, marginLeft: '8px' }} />
    </div>
  );
}
