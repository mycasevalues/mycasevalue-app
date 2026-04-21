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
  const [copied, setCopied] = useState(false);

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

  const keyIssues = c.tags.filter((t) => t.category === 'practice_area' || t.category === 'claim_type');
  const otherTags = c.tags.filter((t) => t.category !== 'practice_area' && t.category !== 'claim_type');

  // ── Batch 6: Procedural history timeline ──
  // Synthesize a chronological timeline from filings + case bookends (filed/terminated).
  type HistoryEvent = {
    date: string | null;
    title: string;
    description?: string;
    kind: 'filed' | 'answer' | 'motion' | 'order' | 'opinion' | 'judgment' | 'discovery' | 'trial' | 'settlement' | 'terminated' | 'filing';
    documentUrl?: string;
    filingNumber?: number;
  };
  const classifyFiling = (title: string): HistoryEvent['kind'] => {
    const t = title.toLowerCase();
    if (t.includes('complaint') || t.includes('notice of removal')) return 'filed';
    if (t.includes('answer')) return 'answer';
    if (t.includes('judgment')) return 'judgment';
    if (t.includes('order')) return 'order';
    if (t.includes('opinion') || t.includes('memorandum')) return 'opinion';
    if (t.includes('motion')) return 'motion';
    if (t.includes('discovery') || t.includes('deposition') || t.includes('interrogator')) return 'discovery';
    if (t.includes('trial') || t.includes('hearing')) return 'trial';
    if (t.includes('settlement') || t.includes('stipulation of dismissal') || t.includes('voluntary dismissal')) return 'settlement';
    return 'filing';
  };
  const historyEvents: HistoryEvent[] = [];
  if (c.filingDate) {
    historyEvents.push({
      date: c.filingDate,
      title: 'Case Filed',
      description: c.caseType ? `${c.caseType} action commenced` : 'Action commenced',
      kind: 'filed',
    });
  }
  c.filings.forEach((f) => {
    historyEvents.push({
      date: f.date,
      title: f.title || 'Filing',
      description: f.description,
      kind: classifyFiling(f.title || ''),
      documentUrl: f.documentUrl,
      filingNumber: f.number,
    });
  });
  if (c.terminationDate) {
    historyEvents.push({
      date: c.terminationDate,
      title: 'Case Terminated',
      description: c.proceduralPosture ? `Disposition: ${c.proceduralPosture}` : 'Proceeding closed',
      kind: 'terminated',
    });
  }
  // Sort chronologically by date (null dates sink to end)
  historyEvents.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // ── Batch 6: Citing References vs Related Cases partition ──
  // Citing References = same court or same NOS/caseType (like KeyCite's citing references)
  // Related Cases    = "Cited With" — other cases frequently seen alongside this one
  const courtAbbr = c.court?.abbreviation || '';
  const citingReferences = c.relatedCases.filter(
    (rc) =>
      (courtAbbr && rc.courtAbbreviation === courtAbbr) ||
      (c.caseType && rc.caseType === c.caseType),
  );
  const citedWith = c.relatedCases.filter((rc) => !citingReferences.includes(rc));

  const citationText = [
    c.caseName,
    c.docketNumber ? `No. ${c.docketNumber}` : '',
    c.court?.abbreviation ? `(${c.court.abbreviation}${c.filingDate ? ` ${new Date(c.filingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : ''})` : '',
  ].filter(Boolean).join(', ');
  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fail — clipboard API may be blocked
    }
  };
  const handlePrint = () => { if (typeof window !== 'undefined') window.print(); };

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
            <CaseCiteFlag status={c.status} size={20} />
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

          <div className="flex items-center gap-2 mt-4 pt-3" style={{ borderTop: '1px dashed var(--bdr)' }}>
            <button
              onClick={handleCopyCitation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border transition-colors hover:bg-[#EBF5FF]"
              style={{ fontSize: 12, fontWeight: 500, color: copied ? '#166534' : 'var(--link)', borderColor: copied ? '#BBE5C6' : 'var(--bdr)', background: copied ? '#F0F9F3' : '#FFFFFF', fontFamily: 'var(--font-ui)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              {copied ? 'Copied' : 'Copy Citation'}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border transition-colors hover:bg-[#EBF5FF]"
              style={{ fontSize: 12, fontWeight: 500, color: 'var(--link)', borderColor: 'var(--bdr)', background: '#FFFFFF', fontFamily: 'var(--font-ui)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print
            </button>
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

        {/* ── SECTION 2b: KEY ISSUES ── */}
        {keyIssues.length > 0 && (
          <Section title="Key Issues">
            <div className="flex flex-wrap gap-2">
              {keyIssues.map((t) => (
                <Link
                  key={`${t.category}-${t.tag}`}
                  href={`/case-search?caseType=${encodeURIComponent(t.tag)}`}
                  className="inline-flex items-center px-3 py-1.5 rounded border transition-colors hover:bg-[#EBF5FF]"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: 'var(--font-legal)',
                    color: 'var(--link)',
                    borderColor: '#B6D4F7',
                    background: '#FFFFFF',
                  }}
                >
                  {t.tag}
                </Link>
              ))}
            </div>
            <p className="mt-3" style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
              Click to find more cases on the same issue.
            </p>
          </Section>
        )}

        {/* ── SECTION 3: KEY DETAILS / TAGS ── */}
        {(otherTags.length > 0 || c.caseType || c.proceduralPosture || c.natureOfSuit) && (
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

              {otherTags.length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {otherTags.map((t) => {
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

        {/* ── SECTION 5b: HISTORY TIMELINE ── */}
        {historyEvents.length > 0 && (
          <Section title="History">
            <p
              className="mb-4"
              style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}
            >
              Procedural timeline from filing through disposition.
            </p>
            <HistoryTimeline events={historyEvents.slice(0, 25)} />
            {historyEvents.length > 25 && (
              <p className="pt-3" style={{ fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                Showing 25 of {historyEvents.length} events
              </p>
            )}
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

        {/* ── SECTION 7: CITING REFERENCES ── */}
        {citingReferences.length > 0 && (
          <Section title="Citing References">
            <p
              className="mb-3"
              style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}
            >
              {courtAbbr && c.caseType
                ? `Other cases from ${courtAbbr} or involving ${c.caseType}.`
                : courtAbbr
                  ? `Other cases from ${courtAbbr}.`
                  : c.caseType
                    ? `Other cases involving ${c.caseType}.`
                    : 'Cases that share court, judge, or nature-of-suit with this matter.'}
            </p>
            <RelatedCaseList cases={citingReferences} currentCourtAbbr={courtAbbr} currentCaseType={c.caseType} />
          </Section>
        )}

        {/* ── SECTION 8: RELATED CASES (Cited With) ── */}
        {citedWith.length > 0 && (
          <Section title="Related Cases">
            <p
              className="mb-3"
              style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}
            >
              Cases frequently appearing alongside this one in the broader docket.
            </p>
            <RelatedCaseList cases={citedWith} currentCourtAbbr={courtAbbr} currentCaseType={c.caseType} />
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

function CaseCiteFlag({ status, size = 14 }: { status?: string | null; size?: number }) {
  const s = (status || '').toLowerCase();
  let color = '#9CA3AF';
  let label = 'Status unknown';
  if (s === 'closed' || s === 'terminated') { color = '#16A34A'; label = 'Closed'; }
  else if (s === 'open' || s === 'pending' || s === 'active') { color = '#1A73E8'; label = 'Open'; }
  else if (s === 'stayed' || s === 'remanded') { color = '#C4882A'; label = 'Stayed'; }
  const w = size * (10 / 14);
  return (
    <svg aria-label={`CaseCite flag: ${label}`} role="img" width={w} height={size} viewBox="0 0 10 14" style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: 8, flexShrink: 0 }}>
      <rect x="1" y="0" width="1.5" height="14" fill="#6B7280" />
      <path d="M2.5 0 L9 0 L7.5 3 L9 6 L2.5 6 Z" fill={color} />
    </svg>
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

// ── Batch 6: History Timeline ──

type TimelineEvent = {
  date: string | null;
  title: string;
  description?: string;
  kind: 'filed' | 'answer' | 'motion' | 'order' | 'opinion' | 'judgment' | 'discovery' | 'trial' | 'settlement' | 'terminated' | 'filing';
  documentUrl?: string;
  filingNumber?: number;
};

function eventDotColor(kind: TimelineEvent['kind']): { fill: string; ring: string } {
  switch (kind) {
    case 'filed':
      return { fill: '#1A73E8', ring: '#B6D4F7' };
    case 'terminated':
      return { fill: '#16A34A', ring: '#BBE5C6' };
    case 'judgment':
    case 'order':
    case 'opinion':
      return { fill: '#6B7280', ring: '#D1D5DB' };
    case 'motion':
      return { fill: '#C4882A', ring: '#F2DDB3' };
    case 'settlement':
      return { fill: '#16A34A', ring: '#BBE5C6' };
    default:
      return { fill: '#9CA3AF', ring: '#E5E7EB' };
  }
}

function eventKindLabel(kind: TimelineEvent['kind']): string {
  switch (kind) {
    case 'filed': return 'Filed';
    case 'answer': return 'Answer';
    case 'motion': return 'Motion';
    case 'order': return 'Order';
    case 'opinion': return 'Opinion';
    case 'judgment': return 'Judgment';
    case 'discovery': return 'Discovery';
    case 'trial': return 'Trial';
    case 'settlement': return 'Settlement';
    case 'terminated': return 'Terminated';
    default: return 'Filing';
  }
}

function HistoryTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol style={{ position: 'relative', margin: 0, padding: 0, listStyle: 'none' }}>
      {/* Vertical rail */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 92,
          top: 6,
          bottom: 6,
          width: 1,
          background: 'var(--bdr, #E5E7EB)',
        }}
      />
      {events.map((e, i) => {
        const dot = eventDotColor(e.kind);
        return (
          <li
            key={i}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '84px 20px 1fr',
              gap: 8,
              alignItems: 'start',
              padding: '8px 0',
            }}
          >
            {/* Date column */}
            <span
              className="tabular-nums"
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-tertiary)',
                paddingTop: 1,
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
            >
              {e.date
                ? new Date(e.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : '—'}
            </span>
            {/* Dot column */}
            <span style={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: dot.fill,
                  boxShadow: `0 0 0 3px ${dot.ring}`,
                }}
              />
            </span>
            {/* Content column */}
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span
                  className="uppercase"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: dot.fill,
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {eventKindLabel(e.kind)}
                </span>
                {typeof e.filingNumber === 'number' && e.filingNumber > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    #{e.filingNumber}
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-legal)',
                  fontWeight: 500,
                  margin: '2px 0 0',
                }}
              >
                {e.title}
              </p>
              {e.description && (
                <p
                  style={{
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    marginTop: 2,
                    lineHeight: 1.4,
                  }}
                >
                  {e.description}
                </p>
              )}
              {e.documentUrl && (
                <a
                  href={e.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{
                    display: 'inline-block',
                    marginTop: 4,
                    fontSize: 12,
                    color: 'var(--link)',
                    fontWeight: 500,
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  View document &rarr;
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// ── Batch 6: Related-case list (shared by Citing References + Related Cases) ──

function RelatedCaseList({
  cases,
  currentCourtAbbr,
  currentCaseType,
}: {
  cases: Array<{
    id: number;
    caseName: string;
    caseType: string;
    filingDate: string;
    status: string;
    courtAbbreviation: string;
  }>;
  currentCourtAbbr?: string;
  currentCaseType?: string | null;
}) {
  const statusColor = (s: string): string => {
    const v = (s || '').toLowerCase();
    if (v === 'open' || v === 'pending' || v === 'active') return '#1A73E8';
    if (v === 'closed' || v === 'terminated') return '#16A34A';
    if (v === 'stayed' || v === 'remanded') return '#C4882A';
    return '#9CA3AF';
  };
  return (
    <div className="space-y-1">
      {cases.map((rc) => {
        const sameCourt = !!currentCourtAbbr && rc.courtAbbreviation === currentCourtAbbr;
        const sameNos = !!currentCaseType && rc.caseType === currentCaseType;
        const dot = statusColor(rc.status);
        return (
          <Link
            key={rc.id}
            href={`/case/${rc.id}`}
            className="flex items-center justify-between py-2 border-b last:border-0 group"
            style={{ borderColor: 'var(--bdr)' }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  aria-label={`Status: ${rc.status || 'unknown'}`}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: dot,
                    flexShrink: 0,
                  }}
                />
                <p
                  className="group-hover:underline transition-colors truncate"
                  style={{
                    fontSize: 14,
                    color: 'var(--link)',
                    fontFamily: 'var(--font-legal)',
                    fontWeight: 500,
                  }}
                >
                  {rc.caseName}
                </p>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-tertiary)',
                  marginTop: 3,
                  paddingLeft: 16,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {rc.courtAbbreviation && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: sameCourt ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                      fontWeight: sameCourt ? 600 : 400,
                    }}
                  >
                    {rc.courtAbbreviation}
                    {sameCourt && (
                      <span
                        className="uppercase"
                        style={{
                          marginLeft: 4,
                          padding: '1px 5px',
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          color: '#1557B0',
                          background: '#EBF5FF',
                          borderRadius: 2,
                          fontFamily: 'var(--font-ui)',
                        }}
                      >
                        Same court
                      </span>
                    )}
                  </span>
                )}
                {rc.filingDate && (
                  <>
                    <span>·</span>
                    <span>{new Date(rc.filingDate).getFullYear()}</span>
                  </>
                )}
                {rc.caseType && (
                  <>
                    <span>·</span>
                    <span
                      style={{
                        color: sameNos ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                        fontWeight: sameNos ? 600 : 400,
                      }}
                    >
                      {rc.caseType}
                      {sameNos && (
                        <span
                          className="uppercase"
                          style={{
                            marginLeft: 4,
                            padding: '1px 5px',
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            color: '#166534',
                            background: '#F0F9F3',
                            borderRadius: 2,
                            fontFamily: 'var(--font-ui)',
                          }}
                        >
                          Same NOS
                        </span>
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>
            <span style={{ fontSize: 14, color: 'var(--link)', marginLeft: 8, flexShrink: 0 }}>&rarr;</span>
          </Link>
        );
      })}
    </div>
  );
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
