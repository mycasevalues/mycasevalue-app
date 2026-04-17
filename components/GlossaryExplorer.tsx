'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
}

interface GlossaryExplorerProps {
  terms: GlossaryTerm[];
  featured: GlossaryTerm[];
}

function groupTermsByLetter(terms: GlossaryTerm[]): Map<string, GlossaryTerm[]> {
  const grouped = new Map<string, GlossaryTerm[]>();

  terms.forEach((term) => {
    const letter = term.term.charAt(0).toUpperCase();
    if (!grouped.has(letter)) {
      grouped.set(letter, []);
    }
    grouped.get(letter)!.push(term);
  });

  return new Map(Array.from(grouped.entries()).sort());
}

export default function GlossaryExplorer({ terms, featured }: GlossaryExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Filter terms based on search
  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) {
      return terms;
    }

    const lowerQuery = searchQuery.toLowerCase();
    return terms.filter(
      (term) =>
        term.term.toLowerCase().includes(lowerQuery) ||
        term.definition.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, terms]);

  const groupedTerms = groupTermsByLetter(filteredTerms);
  const lettersWithTerms = new Set(Array.from(groupedTerms.keys()));

  return (
    <>
      {/* Search Bar */}
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{
            position: 'relative',
            marginBottom: '16px',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text3, #78766C)',
              pointerEvents: 'none',
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search terms and definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              fontSize: '14px',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              outline: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'all 200ms ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10, 102, 194, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text3, #78766C)', margin: '0' }}>
          {filteredTerms.length} of {terms.length} terms
        </p>
      </div>

      {/* Featured Terms Section (show only if no search) */}
      {!searchQuery.trim() && featured.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: 'var(--font-ui)',
              color: 'var(--accent-primary)',
              marginBottom: '16px',
            }}
          >
            Featured Terms
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            {featured.map((term) => (
              <Link
                key={term.slug}
                href={`/glossary/${term.slug}`}
                style={{
                  display: 'block',
                  padding: '16px',
                  background: '#FFF9E6',
                  border: '1px solid #FFE5B4',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  transition: 'all 200ms ease',
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'var(--accent-primary)';
                  el.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.12)';
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = '#FFE5B4';
                  el.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {term.term}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {term.definition.length > 90
                    ? term.definition.substring(0, 90) + '...'
                    : term.definition}
                </div>
              </Link>
            ))}
          </div>
          <div
            style={{
              borderBottom: '1px solid var(--border-default)',
              marginBottom: '24px',
            }}
          />
        </section>
      )}

      {/* Alphabet Navigation */}
      {filteredTerms.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  textDecoration: 'none',
                  transition: 'all 200ms ease',
                  color: lettersWithTerms.has(letter) ? 'var(--accent-primary)' : '#A9AEB3',
                  background: lettersWithTerms.has(letter) ? 'transparent' : 'var(--color-surface-1)',
                  cursor: lettersWithTerms.has(letter) ? 'pointer' : 'default',
                }}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Letter-grouped terms */}
      {filteredTerms.length > 0 ? (
        Array.from(groupedTerms.entries()).map(([letter, letterTerms]) => (
          <div key={letter} className="mb-8" id={`letter-${letter}`}>
            {/* Letter header */}
            <div
              style={{
                fontSize: '18px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                color: 'var(--accent-primary)',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '2px solid var(--border-default)',
              }}
            >
              {letter}
            </div>

            {/* Terms in this letter */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {letterTerms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  style={{
                    display: 'block',
                    padding: '14px',
                    background: 'var(--color-surface-0)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'all 200ms ease',
                  }}
                  onMouseOver={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'var(--accent-primary)';
                    el.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.12)';
                  }}
                  onMouseOut={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'var(--border-default)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <h3
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--color-text-primary)',
                      marginBottom: '6px',
                      margin: 0,
                    }}
                  >
                    {term.term}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: 'var(--color-text-secondary)',
                      margin: '6px 0 0 0',
                    }}
                  >
                    {term.definition.length > 100
                      ? term.definition.substring(0, 100) + '...'
                      : term.definition}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              marginBottom: '12px',
            }}
          >
            No terms found matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery('')}
            style={{
              padding: '8px 16px',
              background: 'var(--accent-primary)',
              color: 'var(--color-surface-0)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 200ms ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary-hover)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
            }}
          >
            Clear Search
          </button>
        </div>
      )}
    </>
  );
}
