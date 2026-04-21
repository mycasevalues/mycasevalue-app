'use client';

/**
 * Case Detail Page
 *
 * Premium case view with AI summary, parties, tags, filings, opinions,
 * source provenance, and related cases.
 *
 * Route: /case/[id]
 */

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// ── Types ──

interface CaseDetail {
  id: number;
  caseName: string;
  docketNumber: string;
  caseType: string | null;
  natureOfSuit: string | null;
  filingDate: string | null;
  terminationDate: string | null;
  status: string | null;
  proceduralPosture: string | null;
  court: { name: string; abbreviation: string; circuit: string; state: string } | null;
  parties: Array<{ name: string; role: string }>;
  summary: {
    type: string;
    text: string;
    confidenceNotes: string;
    model: string;
    generatedAt: string;
  } | null;
  tags: Array<{ tag: string; category: string; confidence: number; source: string }>;
  sources: Array<{ sourceName: string; sourceUrl: string; fetchedAt: string }>;
  filings: Array<{ number: number; date: string; title: string; description: string; documentUrl: string }>;
  opinions: Array<{ title: string; author: string; date: string; sourceUrl: string; citation: string }>;
  relatedCases: Array<{
    id: number;
    caseName: string;
    caseType: string;
    filingDate: string;
    status: string;
    courtAbbreviation: string;
  }>;
}

// ── Component ──

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params?.id;

  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!caseId) return;

    async function fetchCase() {
      try {
        const res = await fetch(`/api/cases/${caseId}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError('Case not found.');
          } else {
            setError('Failed to load case details.');
          }
          return;
        }
        const data = await res.json();
        setCaseData(data);
      } catch {
        setError('Unable to load case. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchCase();
  }, [caseId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-7 rounded w-3/4" style={{ background: '#F0F1F4' }} />
            <div className="h-4 rounded w-1/2" style={{ background: '#F0F1F4' }} />
            <div className="h-32 rounded" style={{ background: '#F7F8FA' }} />
            <div className="h-24 rounded" style={{ background: '#F7F8FA' }} />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !caseData) {
    return (
      <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h1
            className="mb-2"
            style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-legal)' }}
          >
            {error || 'Case not found'}
          </h1>
          <p className="mb-4" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            The case you are looking for may not exist in our database yet.
          </p>
          <Link
            href="/case-search"
            className="inline-flex items-center hover:underline"
            style={{ fontSize: 14, color: 'var(--link)' }}
          >
            &larr; Back to search
          </Link>
        </div>
      </div>
    );
  }

  const c = caseData;
  const plaintiffs = c.parties.filter((p) => p.role === 'plaintiff');
  const defendants = c.parties.filter((p) => p.role === 'defendant');
  const otherParties = c.parties.filter((p) => !['plaintiff', 'defendant'].includes(p.role));

  const tagsByCategory = new Map<string, typeof c.tags>();
  c.tags.forEach((t) => {
    const existing = tagsByCategory.get(t.category) ?? [];
    existing.push(t);
    tagsByCategory.set(t.category, existing);
  });

  // Status badge palette — Westlaw/KeyCite-style semantic colors
  const statusStyle = (() => {
    const s = (c.status || '').toLowerCase();
    if (s === 'open' || s === 'pending' || s === 'active') {
      return { bg: '#EBF5FF', fg: '#1557B0', border: '#B6D4F7' };
    }
    if (s === 'closed' || s === 'terminated') {
      return { bg: '#F0F9F3', fg: '#166534', border: '#BBE5C6' };
    }
    if (s === 'stayed' || s === 'remanded') {
      return { bg: '#FAF3E6', fg: '#8A6020', border: '#E8D09C' };
    }
    return { bg: '#F3F4F6', fg: '#525252', border: '#E5E7EB' };
  })();

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
      {/* Breadcrumb bar — Westlaw-style thin rule, UI font, muted label */}
      <div
        className="border-b"
        style={{ borderColor: 'var(--bdr)', background: '#FAFBFC' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5">
          <Link
            href="/case-search"
            className="hover:underline transition-colors"
            style={{ fontSize: 12, color: 'var(--link)', fontWeight: 500 }}
          >
            &larr; Back to search
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* ── SECTION 1: DOCUMENT HEADER — Westlaw-style case citation block ── */}
        <div
          className="pb-5"
          style={{ borderBottom: '2px solid var(--bdr)' }}
        >
          {/* Top row: status badge + anchor line above case name */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <span
              className="uppercase tracking-widest"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              Case Detail
            </span>
            {c.status && (
              <span
                className="flex-shrink-0 inline-flex items-center uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 3,
                  background: statusStyle.bg,
                  color: statusStyle.fg,
                  border: `1px solid ${statusStyle.border}`,
                }}
              >
                {c.status}
              </span>
            )}
          </div>

          {/* Case name — serif, document-style headline */}
          <h1
            className="leading-tight"
            style={{
              fontFamily: 'var(--font-legal)',
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              marginBottom: 12,
            }}
          >
            {c.caseName}
          </h1>

          {/* Metadata row — label/value pairs, Westlaw citation style */}
          <div
            className="flex flex-wrap items-baseline"
            style={{ fontSize: 13, color: 'var(--text-secondary)', gap: '4px 18px' }}
          >
            {c.court && (
              <MetaPair
                label="Court"
                value={c.court.name}
                valueStyle={{ fontWeight: 600, color: 'var(--text-primary)' }}
              />
            )}
            {c.docketNumber && (
              <MetaPair
                label="No."
                value={c.docketNumber}
                valueStyle={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  fontSize: 12.5,
                }}
              />
            )}
            {c.filingDate && (
              <MetaPair
                label="Filed"
                value={new Date(c.filingDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              />
            )}
            {c.terminationDate && (
              <MetaPair
                label="Terminated"
                value={new Date(c.terminationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              />
            )}
          </div>
        </div>

        {/* ── SECTION 2: AI SUMMARY ── */}
        {c.summary && (
          <Section title="Case Overview">
            <p className="leading-relaxed" style={{ fontSize: 14, color: 'var(--text-primary)' }}>
              {c.summary.text}
            </p>
            {c.summary.confidenceNotes && c.summary.confidenceNotes !== 'No confidence notes.' && (
              <p className="mt-3 italic" style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Note: {c.summary.confidenceNotes}
              </p>
            )}
            <p className="mt-2" style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>
              Generated {c.summary.generatedAt ? new Date(c.summary.generatedAt).toLocaleDateString() : 'recently'} &middot; AI-assisted summary from public records
            </p>
          </Section>
        )}

        {/* ── SECTION 3: KEY DETAILS / TAGS ── */}
        {(c.tags.length > 0 || c.caseType || c.proceduralPosture || c.natureOfSuit) && (
          <Section title="Classification">
            <div className="space-y-3">
              {c.caseType && (
                <DetailRow label="Case Type" value={c.caseType} />
              )}
              {c.natureOfSuit && (
                <DetailRow label="Nature of Suit" value={c.natureOfSuit} />
              )}
              {c.proceduralPosture && (
                <DetailRow label="Procedural Posture" value={c.proceduralPosture} />
              )}
              {c.court?.circuit && (
                <DetailRow label="Circuit" value={`${c.court.circuit}${ordinalSuffix(c.court.circuit)} Circuit`} />
              )}

              {c.tags.length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((t) => {
                      const tagStyle =
                        t.category === 'practice_area'
                          ? { bg: '#EBF5FF', fg: '#1557B0', border: '#B6D4F7' }
                          : t.category === 'claim_type'
                            ? { bg: '#FAF3E6', fg: '#8A6020', border: '#E8D09C' }
                            : { bg: '#FFFFFF', fg: 'var(--text-secondary)', border: 'var(--bdr)' };
                      return (
                        <span
                          key={`${t.category}-${t.tag}`}
                          className="px-2.5 py-1 rounded border"
                          style={{
                            borderColor: tagStyle.border,
                            color: tagStyle.fg,
                            background: tagStyle.bg,
                            fontSize: 12,
                            fontWeight: 500,
                          }}
                        >
                          {t.tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* ── SECTION 4: PARTIES ── */}
        {c.parties.length > 0 && (
          <Section title="Parties">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plaintiffs.length > 0 && (
                <PartyGroup label="Plaintiffs" parties={plaintiffs} />
              )}
              {defendants.length > 0 && (
                <PartyGroup label="Defendants" parties={defendants} />
              )}
              {otherParties.length > 0 && (
                <PartyGroup label="Other Parties" parties={otherParties} />
              )}
            </div>
          </Section>
        )}

        {/* ── SECTION 5: OPINIONS ── */}
        {c.opinions.length > 0 && (
          <Section title="Opinions">
            <div className="space-y-2">
              {c.opinions.map((op, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-3 py-2 border-b last:border-0"
                  style={{ borderColor: 'var(--bdr)' }}
                >
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-legal)' }}>{op.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
                      {op.author && <span>{op.author} · </span>}
                      {op.date && <span>{new Date(op.date).toLocaleDateString()}</span>}
                      {op.citation && (
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                          {' '}· {op.citation}
                        </span>
                      )}
                    </p>
                  </div>
                  {op.sourceUrl && (
                    <a
                      href={op.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex-shrink-0"
                      style={{ fontSize: 12, color: 'var(--link)', fontWeight: 500 }}
                    >
                      View &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── SECTION 5b: FILINGS ── */}
        {c.filings.length > 0 && (
          <Section title="Docket Activity">
            <div className="space-y-1">
              {c.filings.slice(0, 20).map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2 border-b last:border-0"
                  style={{ borderColor: 'var(--bdr)' }}
                >
                  <span
                    className="w-10 flex-shrink-0 text-right tabular-nums"
                    style={{
                      fontSize: 12,
                      color: 'var(--text-tertiary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    #{f.number || i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                      {f.title || 'Filing'}
                    </p>
                    {f.date && (
                      <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 1 }}>
                        {new Date(f.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {f.documentUrl && (
                    <a
                      href={f.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex-shrink-0"
                      style={{ fontSize: 12, color: 'var(--link)', fontWeight: 500 }}
                    >
                      Doc &rarr;
                    </a>
                  )}
                </div>
              ))}
              {c.filings.length > 20 && (
                <p className="pt-2" style={{ fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                  Showing 20 of {c.filings.length} filings
                </p>
              )}
            </div>
          </Section>
        )}

        {/* ── SECTION 6: SOURCE / PROVENANCE ── */}
        <Section title="Data Sources">
          <div className="space-y-2">
            {c.sources.length > 0 ? (
              c.sources.map((s, i) => (
                <div key={i} className="flex items-center justify-between" style={{ fontSize: 14 }}>
                  <span className="capitalize" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {s.sourceName.replace(/_/g, ' ')}
                  </span>
                  <div className="flex items-center gap-3">
                    {s.fetchedAt && (
                      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                        Last synced {new Date(s.fetchedAt).toLocaleDateString()}
                      </span>
                    )}
                    {s.sourceUrl && (
                      <a
                        href={s.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ fontSize: 12, color: 'var(--link)', fontWeight: 500 }}
                      >
                        View source &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                Data from public federal court records.
              </p>
            )}
          </div>
          <p className="mt-3 italic" style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>
            All data sourced from public federal court and agency records. Not legal advice.
          </p>
        </Section>

        {/* ── SECTION 7: RELATED CASES ── */}
        {c.relatedCases.length > 0 && (
          <Section title="Related Cases">
            <div className="space-y-1">
              {c.relatedCases.map((rc) => (
                <Link
                  key={rc.id}
                  href={`/case/${rc.id}`}
                  className="flex items-center justify-between py-2 border-b last:border-0 group"
                  style={{ borderColor: 'var(--bdr)' }}
                >
                  <div>
                    <p
                      className="group-hover:underline transition-colors"
                      style={{
                        fontSize: 14,
                        color: 'var(--link)',
                        fontFamily: 'var(--font-legal)',
                        fontWeight: 500,
                      }}
                    >
                      {rc.caseName}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 1 }}>
                      {rc.courtAbbreviation && (
                        <span style={{ fontFamily: 'var(--font-mono)' }}>{rc.courtAbbreviation}</span>
                      )}
                      {rc.courtAbbreviation && rc.filingDate && <span> · </span>}
                      {rc.filingDate && new Date(rc.filingDate).getFullYear()}
                      {rc.caseType && <span> · {rc.caseType}</span>}
                    </p>
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--link)' }}>&rarr;</span>
                </Link>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

// ── Reusable Components ──

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded border"
      style={{ borderColor: 'var(--bdr)', background: '#FFFFFF' }}
    >
      <header
        style={{
          padding: '10px 20px',
          borderBottom: '1px solid var(--bdr)',
          background: '#F7F8FA',
          borderRadius: '4px 4px 0 0',
        }}
      >
        <h2
          className="uppercase"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-ui)',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </header>
      <div style={{ padding: '16px 20px' }}>{children}</div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className="w-36 flex-shrink-0 uppercase"
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.06em',
          color: 'var(--text-tertiary)',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

function MetaPair({
  label,
  value,
  valueStyle,
}: {
  label: string;
  value: string;
  valueStyle?: React.CSSProperties;
}) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span
        className="uppercase"
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'var(--text-tertiary)',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)', ...valueStyle }}>{value}</span>
    </span>
  );
}

function ordinalSuffix(n: string): string {
  const num = parseInt(n, 10);
  if (isNaN(num)) return '';
  const mod100 = num % 100;
  if (mod100 >= 11 && mod100 <= 13) return 'th';
  switch (num % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function PartyGroup({ label, parties }: { label: string; parties: Array<{ name: string; role: string }> }) {
  return (
    <div>
      <p
        className="mb-2 uppercase"
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.06em',
          color: 'var(--text-tertiary)',
        }}
      >
        {label}
      </p>
      <ul className="space-y-1">
        {parties.map((p, i) => (
          <li key={i} style={{ fontSize: 14, color: 'var(--text-primary)', fontFamily: 'var(--font-legal)' }}>
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
