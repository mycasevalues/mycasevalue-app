'use client';

import { useEffect, useState } from 'react';

interface OpinionData {
  id: number;
  case_name: string;
  court: string;
  year: string;
  citation: string;
  url: string;
  summary: string;
}

interface RelevantOpinionsProps {
  nosCode: string;
  nosLabel: string;
}

export default function RelevantOpinions({ nosCode, nosLabel }: RelevantOpinionsProps) {
  const [opinions, setOpinions] = useState<OpinionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchOpinions() {
      try {
        const res = await fetch(`/api/nos/opinions?code=${nosCode}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (!cancelled) {
          setOpinions(data.opinions || []);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchOpinions();
    return () => { cancelled = true; };
  }, [nosCode]);

  if (loading) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: '4px',
            padding: '24px',
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--text1)',
              marginBottom: '24px',
              fontFamily: 'var(--font-ui)',
            }}>Relevant Opinions</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text2)', fontSize: '14px' }}>
              <span style={{
                display: 'inline-block',
                width: '16px',
                height: '16px',
                border: '2px solid var(--link)',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              Loading opinions from CourtListener...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || opinions.length === 0) {
    return null; // Silently hide if no opinions available
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--bdr)',
          borderRadius: '4px',
          padding: '24px',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--text1)',
            marginBottom: '4px',
            fontFamily: 'var(--font-ui)',
          }}>Relevant Opinions</h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--text2)',
            marginBottom: '24px',
            fontFamily: 'var(--font-ui)',
          }}>
            Most-cited federal court opinions for {nosLabel} cases
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {opinions.map((op) => (
              <div key={op.id} style={{
                padding: '16px',
                background: 'var(--surf)',
                border: '1px solid var(--bdr)',
                borderRadius: '4px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <a
                      href={op.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--link)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-ui)',
                        lineHeight: 1.3,
                      }}
                    >
                      {op.case_name}
                    </a>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      marginTop: '4px',
                      fontSize: '12px',
                      color: 'var(--text2)',
                      fontFamily: 'var(--font-ui)',
                    }}>
                      {op.court && <span>{op.court}</span>}
                      {op.year && <span>{op.year}</span>}
                      {op.citation && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{op.citation}</span>}
                    </div>
                  </div>
                </div>
                {op.summary && (
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--text2)',
                    marginTop: '8px',
                    marginBottom: 0,
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-ui)',
                  }}>
                    {op.summary}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* AI disclaimer */}
          <div style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid var(--bdr)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-ui)',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '1px 6px',
              background: 'var(--card)',
              borderRadius: '3px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text2)',
              letterSpacing: '0.3px',
            }}>AI</span>
            Summarized by AI — read the full opinion for accuracy.
          </div>
        </div>
      </div>
    </section>
  );
}
