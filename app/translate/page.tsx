'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const EXAMPLE_PHRASES = [
  'The defendant moves for summary judgment on all claims.',
  'The Court hereby dismisses the case with prejudice.',
  'The plaintiff seeks an injunction to compel discovery of evidence.',
  'The statute of limitations has expired for filing this claim.',
  'Arbitration is the agreed-upon mechanism for dispute resolution.',
];

export default function TranslatePage() {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [remaining, setRemaining] = useState(3);

  useEffect(() => {
    // Load remaining translations from localStorage
    const saved = localStorage.getItem('translate-remaining');
    if (saved) {
      setRemaining(parseInt(saved, 10));
    }
  }, []);

  const handleTranslate = async () => {
    if (!input.trim()) {
      setError('Please enter some legal text to translate.');
      return;
    }

    if (remaining <= 0) {
      setError('You\'ve used all 3 free translations for today. Come back tomorrow!');
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

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Translation failed. Please try again.');
        setLoading(false);
        return;
      }

      setTranslation(data.translation);
      const newRemaining = data.remaining;
      setRemaining(newRemaining);
      localStorage.setItem('translate-remaining', String(newRemaining));
    } catch (err: any) {
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

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-dark)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'var(--accent-primary)', color: 'var(--fg-on-dark)', borderRadius: '9999px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            TRANSLATE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: 'var(--fg-on-dark)', letterSpacing: '-2px', fontFamily: 'var(--font-display)' }}>
            Legal Jargon Translator
          </h1>
          <p className="text-base leading-relaxed max-w-2xl sm:text-lg" style={{ color: 'var(--fg-on-dark-secondary)', fontFamily: 'var(--font-body)' }}>
            Paste any legal text from a federal court document and get an instant plain-English explanation. Free translations every day.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Translator Form */}
        <div className="p-6 sm:p-8 border" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)', boxShadow: 'var(--shadow-xs)', borderRadius: '4px' }}>
          {/* Daily Limit Counter */}
          <div className="mb-8 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-default)', borderRadius: '4px' }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.8px]" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                Free Translations Today
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--fg-secondary)', fontFamily: 'var(--font-body)' }}>
                {remaining} remaining
              </p>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 transition-colors"
                  style={{
                    borderRadius: '50%',
                    background: i < remaining ? 'var(--accent-primary)' : 'var(--border-default)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div className="mb-6">
            <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
              Legal Text to Translate
            </label>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
                setTranslation('');
              }}
              placeholder="Paste legal text here, e.g., 'The court hereby grants the motion for summary judgment...'"
              className="w-full px-4 py-4 border text-sm transition-all focus:outline-none focus:ring-2 resize-none"
              style={{
                borderRadius: '4px',
                borderColor: 'var(--border-default)',
                background: 'var(--bg-base)',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-body)',
                minHeight: '140px',
              }}
            />
            <p className="text-[11px] mt-2" style={{ color: 'var(--fg-secondary)', fontFamily: 'var(--font-body)' }}>
              Minimum 10 characters, maximum 3,000 characters.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4" style={{ background: 'var(--danger-subtle)', border: '1px solid var(--danger)', borderRadius: '4px' }}>
              <p className="text-sm" style={{ color: 'var(--danger)', fontFamily: 'var(--font-body)' }}>
                {error}
              </p>
            </div>
          )}

          {/* Translate Button */}
          <button
            onClick={handleTranslate}
            disabled={!input.trim() || loading || remaining <= 0}
            className="w-full px-6 py-3 text-sm font-semibold transition-all text-white hover:shadow-lg active:scale-[0.99]"
            style={{
              borderRadius: '4px',
              background:
                !input.trim() || loading || remaining <= 0
                  ? 'var(--border-default)'
                  : 'var(--accent-primary)',
              color:
                !input.trim() || loading || remaining <= 0
                  ? 'var(--fg-secondary)'
                  : '#FFFFFF',
              fontFamily: 'var(--font-body)',
              cursor:
                !input.trim() || loading || remaining <= 0
                  ? 'not-allowed'
                  : 'pointer',
              opacity:
                !input.trim() || loading || remaining <= 0
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
                Translate to Plain English
              </>
            )}
          </button>
        </div>

        {/* Translation Result */}
        {translation && (
          <div className="mt-8 p-6 sm:p-8 border animate-in fade-in slide-in-from-bottom-4" style={{ borderColor: 'var(--accent-primary-border)', background: 'var(--bg-elevated)', boxShadow: 'var(--shadow-xs)', borderLeft: '4px solid var(--accent-primary)', borderRadius: '4px' }}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.8px] mb-4" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
              Plain English Translation
            </h2>
            <div className="prose prose-sm max-w-none"
              style={{
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-body)',
                lineHeight: '1.6',
              }}>
              <p className="whitespace-pre-wrap">{translation}</p>
            </div>
            <p className="text-[11px] mt-6 pt-6 border-t" style={{ color: 'var(--fg-secondary)', fontFamily: 'var(--font-body)', borderColor: 'var(--border-default)' }}>
              Have more legal text to translate? You have {remaining - 1} free translations left today.
            </p>
          </div>
        )}

        {/* Example Phrases Section */}
        <div className="mt-12">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
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
                  background: 'var(--bg-elevated)',
                  color: 'var(--fg-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: '1.5',
                }}
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link
            href="/search"
            className="p-6 border transition-all hover:shadow-md hover:border-2"
            style={{
              borderRadius: '4px',
              borderColor: 'var(--border-default)',
              background: 'var(--bg-elevated)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
              Case Search
            </p>
            <p className="text-sm" style={{ color: 'var(--fg-secondary)', fontFamily: 'var(--font-body)' }}>
              Search federal court cases by nature of suit or keyword.
            </p>
          </Link>
          <Link
            href="/calculator"
            className="p-6 border transition-all hover:shadow-md hover:border-2"
            style={{
              borderRadius: '4px',
              borderColor: 'var(--border-default)',
              background: 'var(--bg-elevated)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
              Settlement Calculator
            </p>
            <p className="text-sm" style={{ color: 'var(--fg-secondary)', fontFamily: 'var(--font-body)' }}>
              Estimate settlement ranges based on case data.
            </p>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 border" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)', boxShadow: 'var(--shadow-xs)', borderRadius: '4px' }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.8px] mb-3" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
            Important Disclaimer
          </h2>
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--fg-secondary)', fontFamily: 'var(--font-body)' }}>
            This translator provides informal explanations of legal terminology and should not be considered legal advice. Legal language can have nuanced meanings depending on context, jurisdiction, and specific case facts. Always consult with a qualified attorney for authoritative interpretations of legal documents. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
