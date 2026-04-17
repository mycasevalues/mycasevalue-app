'use client';

import Link from 'next/link';
import { getWinRateColor } from '@/lib/color-scale';

export interface JudgeSectionProps {
  title: string;
  subtitle?: string;
  judges: Array<{
    id: string;
    full_name: string;
    district_id: string | null;
    appointment_year?: number;
    appointing_president?: string | null;
    plaintiff_win_rate: number;
    total_cases: number;
  }>;
  showDistrict?: boolean;
}

export default function JudgeSection({ title, subtitle, judges, showDistrict = false }: JudgeSectionProps) {
  if (!judges || judges.length === 0) {
    return null;
  }

  return (
    <section style={{ marginTop: 56, marginBottom: 56 }}>
      <div style={{
        background: 'var(--color-surface-0)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '4px',
        padding: 'clamp(24px, 4vw, 32px)',
      }}>
        <h2 style={{
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 8px',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.5px',
        }}>
          {title}
        </h2>

        {subtitle && (
          <p style={{
            fontSize: 14,
            color: 'var(--color-text-secondary)',
            margin: '0 0 24px',
            fontFamily: 'var(--font-ui)',
          }}>
            {subtitle}
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {judges.map((judge) => {
            const colorInfo = getWinRateColor(judge.plaintiff_win_rate);

            return (
              <div
                key={judge.id}
                style={{
                  background: 'var(--color-surface-1)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '4px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {/* Judge Name and District */}
                <div>
                  <Link
                    href={`/judges/${judge.id}`}
                    style={{
                      color: 'var(--accent-primary)',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: 14,
                      fontFamily: 'var(--font-ui)',
                      display: 'inline-block',
                      marginBottom: 4,
                    }}
                  >
                    {judge.full_name}
                  </Link>
                  {showDistrict && judge.district_id && (
                    <div style={{
                      fontSize: 12,
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-ui)',
                    }}>
                      {judge.district_id}
                    </div>
                  )}
                </div>

                {/* Win Rate */}
                <div>
                  <div style={{
                    fontSize: 11,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    marginBottom: 4,
                    fontFamily: 'var(--font-ui)',
                  }}>
                    Win Rate
                  </div>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: colorInfo.text,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {Math.round(judge.plaintiff_win_rate * 10) / 10}%
                  </div>
                </div>

                {/* Total Cases */}
                <div>
                  <div style={{
                    fontSize: 11,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    marginBottom: 4,
                    fontFamily: 'var(--font-ui)',
                  }}>
                    Total Cases
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {judge.total_cases.toLocaleString()}
                  </div>
                </div>

                {/* View Profile Link */}
                <Link
                  href={`/judges/${judge.id}`}
                  style={{
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: 'var(--font-ui)',
                    marginTop: 'auto',
                    paddingTop: 8,
                    borderTop: '1px solid #e5e7eb',
                  }}
                >
                  View Profile →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
