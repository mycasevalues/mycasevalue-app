'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const EXAMPLE_PHRASES = [
  'The defendant moves for summary judgment on all claims.',
  'The Court hereby dismisses the case with prejudice.',
  'The plaintiff seeks an injunction to compel discovery of evidence.',
  'The statute of limitations has expired for filing this claim.',
  'Arbitration is the agreed-upon mechanism for dispute resolution.',
  'The plaintiff\'s motion for class certification is denied without prejudice.',
  'Respondeat superior liability attaches to the employer for the agent\'s tortious conduct.',
  'The court grants the motion in limine to exclude the expert testimony.',
  'A writ of mandamus is issued compelling the agency to produce the records.',
  'The parties stipulate to a continuance pending mediation.',
];

// Common legal terms quick reference with phonetic pronunciation and related terms
const LEGAL_TERMS = [
  { term: 'Pro Se', definition: 'Self-represented (no attorney)', pronunciation: 'proh say', related: ['Pro Bono', 'Representation', 'Self-Represented Litigant'] },
  { term: 'Summary Judgment', definition: 'Case decided without trial', pronunciation: 'SUM-uh-rer-ee JUJ-muhnt', related: ['Motion', 'Dismissal', 'Trial'] },
  { term: 'Deposition', definition: 'Sworn out-of-court testimony', pronunciation: 'dep-uh-ZISH-uhn', related: ['Testimony', 'Discovery', 'Interrogatory'] },
  { term: 'Discovery', definition: 'Pre-trial evidence exchange', pronunciation: 'dis-KUV-uh-ree', related: ['Deposition', 'Interrogatory', 'Subpoena'] },
  { term: 'Injunction', definition: 'Court order to act or stop', pronunciation: 'in-JUNGK-shuhn', related: ['Restraining Order', 'Temporary', 'Preliminary'] },
  { term: 'Arbitration', definition: 'Private dispute resolution', pronunciation: 'ar-buh-TRAY-shuhn', related: ['Mediation', 'Settlement', 'Negotiation'] },
  { term: 'Statute of Limitations', definition: 'Deadline to file lawsuit', pronunciation: 'STAT-oot uv lim-uh-TAY-shunz', related: ['Filing Deadline', 'Time Barred', 'Claim'] },
  { term: 'Class Action', definition: 'Group lawsuit with many plaintiffs', pronunciation: 'klas AK-shuhn', related: ['Plaintiff', 'Defendant', 'Certification'] },
  { term: 'Settlement', definition: 'Agreement to resolve without trial', pronunciation: 'SET-ul-muhnt', related: ['Compromise', 'Agreement', 'Release'] },
  { term: 'Verdict', definition: 'Jury or judge\'s final decision', pronunciation: 'VER-dikt', related: ['Judgment', 'Ruling', 'Decision'] },
  { term: 'Damages', definition: 'Money awarded for harm/loss', pronunciation: 'DAM-ij-iz', related: ['Compensation', 'Relief', 'Award'] },
  { term: 'Tort', definition: 'Civil wrong causing injury', pronunciation: 'tort', related: ['Negligence', 'Liability', 'Civil'] },
];

export default function TranslatePage() {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<Array<{ input: string; output: string; timestamp: Date }>>([]);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  // All translations free during launch
  const remaining = 999;

  const handleTranslate = async () => {
    if (!input.trim()) {
      setError('Please enter some legal text to translate.');
      return;
    }

    setLoading(true);
    setError('');
    setTranslation('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Translation failed. Please try again.');
        setLoading(false);
        return;
      }

      // Stream the response word by word
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setTranslation(fullText);
        }
      }

      // Add to history, keeping last 5
      setHistory(prev => [
        { input, output: fullText, timestamp: new Date() },
        ...prev
      ].slice(0, 5));
    } catch (err: unknown) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExample = (phrase: string) => {
    setInput(phrase);
    setTranslation('');
    setError('');
  };

  const loadFromHistory = (item: { input: string; output: string; timestamp: Date }) => {
    setInput(item.input);
    setTranslation(item.output);
    setError('');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'var(--accent-primary)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 mb-12 text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ui)' }}>
            <Link href="/" className="hover:opacity-100 opacity-80 transition-opacity">Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-surface-0)' }}>Translate</span>
          </div>

          {/* Header Content */}
          <div className="pb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
              style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              TRANSLATE
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: 'var(--color-surface-0)', letterSpacing: '-2px', fontFamily: 'var(--font-legal)' }}>
              Legal Jargon Translator
            </h1>
            <p className="text-base leading-relaxed max-w-2xl sm:text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ui)' }}>
              Paste any legal text from a federal court document in English or Spanish and get an instant explanation in the same language. Free translations every day.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Translator Form */}
        <div className="p-6 sm:p-8 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', boxShadow: 'var(--shadow-xs)', borderRadius: '4px' }}>
          {/* Free Access Banner */}
          <div className="mb-8 p-4 flex items-center gap-3" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid var(--link-light, #BAE6FD)', borderRadius: '4px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--data-positive)', flexShrink: 0 }} />
            <p className="text-sm" style={{ color: 'var(--gold)', fontFamily: 'var(--font-ui)', margin: 0 }}>
              <strong>Unlimited translations</strong> — all features are free during launch
            </p>
          </div>

          {/* Text Area */}
          <div className="mb-6">
            <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
              Legal Text to Translate (English or Spanish)
            </label>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
                setTranslation('');
              }}
              placeholder="Paste legal text here in English or Spanish. Examples: 'The court hereby grants the motion for summary judgment...' or 'La corte otorga la moción para sentencia sumaria...'"
              className="w-full px-4 py-4 border text-sm transition-all focus:outline-none focus:ring-2 resize-none"
              style={{
                borderRadius: '4px',
                borderColor: 'var(--border-default)',
                background: 'var(--color-surface-1)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-ui)',
                minHeight: '140px',
              }}
            />
            <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
              Minimum 10 characters, maximum 3,000 characters. Supports English and Spanish input.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4" style={{ background: 'rgba(10, 102, 194, 0.06)', border: '1px solid var(--accent-primary)', borderRadius: '4px' }}>
              <p className="text-sm" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-ui)' }}>
                {error}
              </p>
            </div>
          )}

          {/* Translate Button */}
          <button
            onClick={handleTranslate}
            disabled={!input.trim() || loading}
            className="w-full px-6 py-3 text-sm font-semibold transition-all hover:shadow-lg active:scale-[0.99]"
            style={{
              borderRadius: '4px',
              background:
                !input.trim() || loading
                  ? 'var(--border-default)'
                  : 'var(--accent-primary)',
              color:
                !input.trim() || loading
                  ? 'var(--color-text-secondary)'
                  : 'var(--color-surface-0)',
              fontFamily: 'var(--font-ui)',
              cursor:
                !input.trim() || loading
                  ? 'not-allowed'
                  : 'pointer',
              opacity:
                !input.trim() || loading
                  ? 0.7
                  : 1,
            }}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline animate-spin mr-2" style={{ marginBottom: '2px' }}><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 2.2"/></svg>
                Translating...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-2" style={{ marginBottom: '2px' }}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
                Translate to Plain Language
              </>
            )}
          </button>
        </div>

        {/* Translation Result */}
        {translation && (
          <>
            <div className="mt-8 p-6 sm:p-8 border animate-in fade-in slide-in-from-bottom-4" style={{ borderColor: 'var(--accent-primary)', background: 'var(--color-surface-0)', boxShadow: 'var(--shadow-xs)', borderLeft: '4px solid var(--accent-primary)', borderRadius: '4px' }}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.8px] mb-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
                Plain English Translation
              </h2>
              <div className="prose prose-sm max-w-none"
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-ui)',
                  lineHeight: '1.6',
                }}>
                <p className="whitespace-pre-wrap">{translation}</p>
              </div>
              <p className="text-[11px] mt-6 pt-6 border-t" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', borderColor: 'var(--border-default)' }}>
                Unlimited translations available. Paste more legal text above to translate.
              </p>
            </div>

            {/* Related Terms - Show related concepts from the input */}
            {(() => {
              const relatedTerms = new Set<string>();
              const inputLower = input.toLowerCase();
              for (const term of LEGAL_TERMS) {
                if (inputLower.includes(term.term.toLowerCase())) {
                  if (term.related) {
                    term.related.forEach(r => relatedTerms.add(r));
                  }
                }
              }
              return relatedTerms.size > 0 ? (
                <div className="mt-8 p-6 sm:p-8 border" style={{ borderColor: 'rgba(59,130,246,0.15)', background: 'rgba(59,130,246,0.06)', boxShadow: 'var(--shadow-xs)', borderRadius: '4px' }}>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.8px] mb-4" style={{ color: 'var(--link)', fontFamily: 'var(--font-ui)' }}>
                    Related Legal Concepts
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                    {Array.from(relatedTerms).map((term, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(term)}
                        style={{
                          padding: '8px 12px',
                          background: 'var(--color-surface-0)',
                          border: '1px solid var(--link-light, #BAE6FD)',
                          borderRadius: '4px',
                          fontSize: '12px',
                          color: 'var(--link)',
                          cursor: 'pointer',
                          transition: 'all 150ms',
                          fontFamily: 'var(--font-ui)',
                          fontWeight: '500',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(59,130,246,0.08)';
                          e.currentTarget.style.borderColor = 'var(--link-hover)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--color-surface-0)';
                          e.currentTarget.style.borderColor = 'var(--bdr)';
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
          </>
        )}

        {/* Example Phrases Section */}
        <div className="mt-12">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
            Try These Examples
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {EXAMPLE_PHRASES.map((phrase, i) => (
              <button
                key={i}
                onClick={() => handleExample(phrase)}
                className="p-4 border text-left transition-all hover:border-2 hover:shadow-sm active:scale-[0.98]"
                style={{
                  borderRadius: '4px',
                  borderColor: 'var(--border-default)',
                  background: 'var(--color-surface-0)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  lineHeight: '1.5',
                }}
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>

        {/* Common Legal Terms Quick Reference */}
        <div className="mt-12">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
            Common Legal Terms Quick Reference
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEGAL_TERMS.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <p className="font-bold text-[13px] mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {item.term}
                </p>
                {item.pronunciation && (
                  <p className="text-[11px] mb-2" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontStyle: 'italic' }}>
                    {item.pronunciation}
                  </p>
                )}
                <p className="text-[11px] mb-3" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                  {item.definition}
                </p>
                {item.related && (
                  <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-default)' }}>
                    <p className="text-[10px] font-semibold mb-2" style={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '8px 0 4px' }}>
                      Related Terms:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {item.related.map((rel, j) => (
                        <span
                          key={j}
                          style={{
                            fontSize: '10px',
                            padding: '2px 6px',
                            background: 'rgba(139,92,246,0.08)',
                            color: 'var(--gold)',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-ui)',
                          }}
                        >
                          {rel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Translation History */}
        {history.length > 0 && (
          <div className="mt-12">
            <button
              onClick={() => setHistoryExpanded(!historyExpanded)}
              className="flex items-center gap-2 text-sm font-semibold mb-4 transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}
            >
              <span>Recent Translations</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: historyExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {historyExpanded && (
              <div className="grid gap-3">
                {history.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 border"
                    style={{
                      borderColor: 'var(--border-default)',
                      background: 'var(--color-surface-0)',
                      borderRadius: '4px',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-[13px] mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
                          {item.input.substring(0, 80)}{item.input.length > 80 ? '...' : ''}
                        </p>
                        <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
                          {item.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <button
                        onClick={() => loadFromHistory(item)}
                        className="px-3 py-2 text-[11px] font-semibold whitespace-nowrap transition-all hover:shadow-sm active:scale-[0.98]"
                        style={{
                          background: 'var(--gold)',
                          color: 'var(--color-surface-0)',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Load
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation Links */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link
            href="/search"
            className="p-6 border transition-all hover:shadow-md hover:border-2"
            style={{
              borderRadius: '4px',
              borderColor: 'var(--border-default)',
              background: 'var(--color-surface-0)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
              Case Search
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
              Search federal court cases by nature of suit or keyword.
            </p>
          </Link>
          <Link
            href="/calculator"
            className="p-6 border transition-all hover:shadow-md hover:border-2"
            style={{
              borderRadius: '4px',
              borderColor: 'var(--border-default)',
              background: 'var(--color-surface-0)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
              Settlement Calculator
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
              Estimate settlement ranges based on case data.
            </p>
          </Link>
          <Link
            href="/glossary"
            className="p-6 border transition-all hover:shadow-md hover:border-2"
            style={{
              borderRadius: '4px',
              borderColor: 'var(--border-default)',
              background: 'var(--color-surface-0)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
              Legal Glossary
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
              Browse all federal court term definitions.
            </p>
          </Link>
          <Link
            href="/odds"
            className="p-6 border transition-all hover:shadow-md hover:border-2"
            style={{
              borderRadius: '4px',
              borderColor: 'var(--border-default)',
              background: 'var(--color-surface-0)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
              Odds Checker
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
              Check your case type win probability.
            </p>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', boxShadow: 'var(--shadow-xs)', borderRadius: '4px' }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.8px] mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
            Important Disclaimer
          </h2>
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
            This translator provides informal explanations of legal terminology and should not be considered legal advice. Legal language can have nuanced meanings depending on context, jurisdiction, and specific case facts. Always consult with a qualified attorney for authoritative interpretations of legal documents. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
