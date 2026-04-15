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
      <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-32 bg-gray-100 rounded-xl" />
            <div className="h-24 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !caseData) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="text-3xl mb-3 opacity-40">&#x2696;</div>
          <h1 className="text-lg font-semibold text-gray-900 mb-2">{error || 'Case not found'}</h1>
          <p className="text-sm text-gray-500 mb-4">
            The case you are looking for may not exist in our database yet.
          </p>
          <Link
            href="/case-search"
            className="inline-flex items-center text-sm text-brand-blue hover:underline"
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

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      {/* Back link */}
      <div
        className="border-b"
        style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <Link
            href="/case-search"
            className="text-xs text-gray-500 hover:text-brand-blue transition-colors"
          >
            &larr; Back to search
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* ── SECTION 1: HEADER ── */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-xl font-bold text-gray-900 leading-snug">
              {c.caseName}
            </h1>
            {c.status && (
              <span
                className="flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{
                  background: c.status === 'open' ? '#EFF6FF' : c.status === 'closed' ? '#F0FDF4' : '#F7F8FA',
                  color: c.status === 'open' ? '#1E40AF' : c.status === 'closed' ? '#166534' : '#4B5563',
                }}
              >
                {c.status}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            {c.court && (
              <span className="font-medium text-gray-700">{c.court.name}</span>
            )}
            {c.docketNumber && <span>No. {c.docketNumber}</span>}
            {c.filingDate && (
              <span>Filed {new Date(c.filingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            )}
            {c.terminationDate && (
              <span>Terminated {new Date(c.terminationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            )}
          </div>
        </div>

        {/* ── SECTION 2: AI SUMMARY ── */}
        {c.summary && (
          <Section title="Case Overview">
            <p className="text-sm text-gray-700 leading-relaxed">
              {c.summary.text}
            </p>
            {c.summary.confidenceNotes && c.summary.confidenceNotes !== 'No confidence notes.' && (
              <p className="text-xs text-gray-400 mt-3 italic">
                Note: {c.summary.confidenceNotes}
              </p>
            )}
            <p className="text-[10px] text-gray-300 mt-2">
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
                <DetailRow label="Circuit" value={`${c.court.circuit}${c.court.circuit.match(/\d/) ? 'th' : ''} Circuit`} />
              )}

              {c.tags.length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span
                        key={`${t.category}-${t.tag}`}
                        className="text-xs px-2.5 py-1 rounded-full border"
                        style={{
                          borderColor: 'var(--border-default)',
                          color: 'var(--color-text-secondary)',
                          background: t.category === 'practice_area' ? '#EFF6FF' : t.category === 'claim_type' ? '#FEF3C7' : 'transparent',
                        }}
                      >
                        {t.tag}
                      </span>
                    ))}
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
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{op.title}</p>
                    <p className="text-xs text-gray-500">
                      {op.author && `${op.author} · `}
                      {op.date && new Date(op.date).toLocaleDateString()}
                      {op.citation && ` · ${op.citation}`}
                    </p>
                  </div>
                  {op.sourceUrl && (
                    <a
                      href={op.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-blue hover:underline flex-shrink-0"
                    >
                      View
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
            <div className="space-y-2">
              {c.filings.slice(0, 20).map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2 border-b last:border-0"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <span className="text-xs text-gray-400 w-10 flex-shrink-0 text-right tabular-nums">
                    #{f.number || i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">
                      {f.title || 'Filing'}
                    </p>
                    {f.date && (
                      <p className="text-xs text-gray-400">
                        {new Date(f.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {f.documentUrl && (
                    <a
                      href={f.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-blue hover:underline flex-shrink-0"
                    >
                      Doc
                    </a>
                  )}
                </div>
              ))}
              {c.filings.length > 20 && (
                <p className="text-xs text-gray-400 pt-2">
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
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 capitalize">{s.sourceName.replace(/_/g, ' ')}</span>
                  <div className="flex items-center gap-3">
                    {s.fetchedAt && (
                      <span className="text-xs text-gray-400">
                        Last synced {new Date(s.fetchedAt).toLocaleDateString()}
                      </span>
                    )}
                    {s.sourceUrl && (
                      <a
                        href={s.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-blue hover:underline"
                      >
                        View source
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Data from public federal court records.
              </p>
            )}
          </div>
          <p className="text-[10px] text-gray-300 mt-3">
            All data sourced from public federal court and agency records. Not legal advice.
          </p>
        </Section>

        {/* ── SECTION 7: RELATED CASES ── */}
        {c.relatedCases.length > 0 && (
          <Section title="Related Cases">
            <div className="space-y-2">
              {c.relatedCases.map((rc) => (
                <Link
                  key={rc.id}
                  href={`/case/${rc.id}`}
                  className="flex items-center justify-between py-2 border-b last:border-0 group"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <div>
                    <p className="text-sm text-gray-900 group-hover:text-brand-blue transition-colors">
                      {rc.caseName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {rc.courtAbbreviation && `${rc.courtAbbreviation} · `}
                      {rc.filingDate && new Date(rc.filingDate).getFullYear()}
                      {rc.caseType && ` · ${rc.caseType}`}
                    </p>
                  </div>
                  <span className="text-xs text-gray-300">&rarr;</span>
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
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)' }}
    >
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-32 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-700">{value}</span>
    </div>
  );
}

function PartyGroup({ label, parties }: { label: string; parties: Array<{ name: string; role: string }> }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-2">{label}</p>
      <ul className="space-y-1">
        {parties.map((p, i) => (
          <li key={i} className="text-sm text-gray-800">
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
