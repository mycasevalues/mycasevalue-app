'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../lib/data';
import { ArrowRightIcon, SearchIcon } from '../../components/ui/Icons';
import { SITE_URL } from '../../lib/site-config';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Federal Court Case Categories',
  description: 'Browse federal court outcome data across 10 major case types.',
  url: `${SITE_URL}/cases`,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Case Categories', item: `${SITE_URL}/cases` },
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
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <div style={{ background: '#00172E', borderBottom: '1px solid #D5D8DC', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', background: 'rgba(255,255,255,0.1)', color: '#E8171F' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
            CASE TYPES
          </div>
          <h1 className="font-display" style={{ fontSize: 44, fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', letterSpacing: '-0.5px' }}>
            Case Categories
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6, maxWidth: 600 }}>
            Research real federal court outcomes across 10 major case types. Explore win rates, settlements, timelines, and recovery data from 5.1M+ public cases.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px', marginBottom: '32px' }}>
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon size={20} color="#455A64" />
          </div>
          <input
            type="text"
            placeholder="Search case types... (e.g. wrongful termination, medical malpractice)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search case types"
            style={{
              width: '100%',
              height: '56px',
              padding: '12px 16px 12px 48px',
              fontSize: '15px',
              border: '1px solid #D5D8DC',
              borderRadius: '2px',
              background: '#FFFFFF',
              color: '#212529',
              fontFamily: 'var(--font-body)',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              outline: 'none',
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = '#E8171F';
              (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(232,23,31,0.08)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = '#D5D8DC';
              (e.target as HTMLInputElement).style.boxShadow = 'none';
            }}
          />
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .cat-card {
            background: #FFFFFF;
            border: 1px solid #D5D8DC;
            border-radius: 2px;
            padding: 32px;
            transition: all 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .cat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-color: #E8171F;
          }
          .cat-card-arrow {
            color: #E8171F;
            transition: transform 0.2s ease;
            margin-left: auto;
          }
          .cat-card:hover .cat-card-arrow {
            transform: translateX(4px);
          }
          .clear-search-btn:hover {
            background: #FAFBFC;
            border-color: #B5B9BD;
          }
          .cta-link:hover {
            background: #CC1019;
            box-shadow: none;
            transform: translateY(-2px);
          }
        `}} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: 18, color: '#455A64', fontFamily: 'var(--font-body)' }}>
              No case types match &ldquo;{search}&rdquo;
            </p>
            <button
              onClick={() => setSearch('')}
              className="clear-search-btn"
              style={{
                marginTop: 16,
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: 600,
                border: '1px solid #D5D8DC',
                borderRadius: 4,
                background: '#FFFFFF',
                color: '#212529',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
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
                  <h2 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: '#212529', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
                    {category.label}
                  </h2>
                  <p style={{ fontSize: 14, color: '#455A64', margin: 0, lineHeight: 1.5, marginBottom: 'auto' }}>{category.sub}</p>
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #D5D8DC', fontSize: 13, color: '#455A64', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{category.opts.length} types covered</span>
                    <span className="cat-card-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ background: '#FFFFFF', border: '1px solid #D5D8DC', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: '#212529', margin: '0 0 16px', letterSpacing: '-0.3px' }}>
            Ready to research your case?
          </h2>
          <p style={{ fontSize: 18, color: '#455A64', margin: '0 0 32px', lineHeight: 1.6 }}>
            Start with our interactive research tool to find real outcome data for cases like yours.
          </p>
          <a href="/cases" className="cta-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '48px', padding: '0 40px', background: '#E8171F', color: '#FFFFFF', borderRadius: '2px', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-display)', textDecoration: 'none', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)', textTransform: 'uppercase', letterSpacing: '0.04em', gap: '8px' }}>
            Start Researching
            <ArrowRightIcon size={14} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#F5F5F5', color: '#455A64', padding: '40px 20px', fontSize: 14, lineHeight: 1.6, borderTop: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ margin: 0 }}>
            <strong>Legal Disclaimer:</strong> This data is for research purposes only and is not legal advice. MyCaseValue provides historical federal court outcome data from public records. This does not constitute a prediction of any case outcome. Consult a qualified attorney for legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
          </p>
        </div>
      </div>
    </div>
  );
}
