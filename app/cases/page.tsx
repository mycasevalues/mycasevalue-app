'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../lib/data';

const categoryIcons: Record<string, string> = {
  work: '', injury: '', consumer: '', rights: '', money: '',
  housing: '', medical: '', family: '‍👩‍👧‍👦', gov: '', education: '',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Federal Court Case Categories',
  description: 'Browse federal court outcome data across 10 major case types.',
  url: 'https://www.mycasevalues.com/cases',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
      { '@type': 'ListItem', position: 2, name: 'Case Categories', item: 'https://www.mycasevalues.com/cases' },
    ],
  },
};

export default function CasesIndexPage() {
  const [search, setSearch] = useState('');

  const filtered = SITS.filter(cat =>
    cat.label.toLowerCase().includes(search.toLowerCase()) ||
    cat.sub.toLowerCase().includes(search.toLowerCase()) ||
    cat.opts.some(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: 'var(--fg-primary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <h1 className="font-display" style={{ fontSize: 44, fontWeight: 700, color: 'var(--fg-primary)', margin: '0 0 16px', letterSpacing: '-0.5px' }}>
            Case Categories
          </h1>
          <p style={{ fontSize: 18, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.6, maxWidth: 600 }}>
            Research real federal court outcomes across 10 major case types. Explore win rates, settlements, timelines, and recovery data from 5.1M+ public cases.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search case types... (e.g. wrongful termination, medical malpractice)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '480px',
            padding: '12px 16px',
            fontSize: '15px',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            background: 'var(--bg-surface)',
            color: 'var(--fg-primary)',
            fontFamily: 'var(--font-body)',
            marginBottom: '32px',
            display: 'block',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            outline: 'none',
          }}
        />

        <style dangerouslySetInnerHTML={{ __html: `
          .cat-card { background: white; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 32px; transition: all 0.3s ease; height: 100%; }
          .cat-card:hover { transform: translateY(-4px); box-shadow: 0 4px 20px rgba(17,17,17,0.12); border-color: #111111; }
        `}} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: 18, color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
              No case types match &ldquo;{search}&rdquo;
            </p>
            <button
              onClick={() => setSearch('')}
              style={{
                marginTop: 16,
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: 600,
                border: '1px solid var(--border-default)',
                borderRadius: 8,
                background: 'var(--bg-surface)',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
              }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map((category) => (
              <Link key={category.id} href={`/cases/${category.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="cat-card">
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{categoryIcons[category.id]}</div>
                  <h2 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: 'var(--fg-primary)', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
                    {category.label}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.5 }}>{category.sub}</p>
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-default)', fontSize: 13, color: 'var(--fg-primary)', fontWeight: 500 }}>
                    {category.opts.length} types covered →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #111111, #7C3AED)', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'white', margin: '0 0 16px', letterSpacing: '-0.3px' }}>
            Ready to research your case?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', margin: '0 0 32px', lineHeight: 1.6 }}>
            Start with our interactive research tool to find real outcome data for cases like yours.
          </p>
          <a href="/#search" style={{ display: 'inline-block', background: '#FFFFFF', color: '#111111', padding: '14px 36px', borderRadius: 8, fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>
            Start Researching →
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: 'var(--bg-base)', color: 'var(--fg-muted)', padding: '40px 20px', fontSize: 14, lineHeight: 1.6 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ margin: 0 }}>
            <strong>Legal Disclaimer:</strong> This data is for research purposes only and is not legal advice. MyCaseValue provides historical federal court outcome data from public records. This does not constitute a prediction of any case outcome. Consult a qualified attorney for legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
          </p>
        </div>
      </div>
    </div>
  );
}
