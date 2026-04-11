'use client';

import Link from 'next/link';
import { Card, CardBody } from '../../components/ui/Card';

const FEATURES = [
  {
    title: 'Legal Document Search',
    description: 'Full-text and semantic search across 7 legal data sources â opinions, regulations, filings, and statutes.',
    href: '/legal/search',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    color: '#0966C3',
    bg: '#E8F4FD',
  },
  {
    title: 'Data Pipeline Dashboard',
    description: 'Monitor ingestion status, source health, document processing, and embedding generation in real time.',
    href: '/legal/dashboard',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    color: '#059669',
    bg: '#F0FDF4',
  },
  {
    title: 'Citation Explorer',
    description: 'Interactive force-directed graph visualization of citation networks between legal documents.',
    href: '/legal/citations',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2" /><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" />
        <line x1="12" y1="10" x2="7.5" y2="7.5" /><line x1="12" y1="10" x2="16.5" y2="7.5" />
        <line x1="12" y1="14" x2="7.5" y2="16.5" /><line x1="12" y1="14" x2="16.5" y2="16.5" />
      </svg>
    ),
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
];

const SOURCES = [
  { name: 'CourtListener', records: '500k+', type: 'Legal Opinions', color: '#1E3A5F' },
  { name: 'Federal Register', records: 'Daily', type: 'Regulations', color: '#7C3AED' },
  { name: 'eCFR', records: '~200k', type: 'Federal Code', color: '#0D9488' },
  { name: 'EDGAR', records: 'Millions', type: 'SEC Filings', color: '#D97706' },
  { name: 'Caselaw Access', records: '6.7M', type: 'US Cases', color: '#059669' },
  { name: 'CanLII', records: '100k+', type: 'Canadian Law', color: '#DC2626' },
  { name: 'GovInfo', records: 'Millions', type: 'Gov Documents', color: '#6B7280' },
];

export default function LegalDataPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 16px 80px' }}>

      {/* ââ Hero ââ */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-block',
          padding: '4px 14px',
          borderRadius: 20,
          background: '#E8F4FD',
          color: '#0966C3',
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 16,
        }}>
          Legal Data Integration
        </div>
        <h1 style={{
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          fontSize: 36,
          fontWeight: 700,
          color: '#0f0f0f',
          margin: '0 0 12px',
          lineHeight: 1.2,
        }}>
          Comprehensive Legal Data at Your Fingertips
        </h1>
        <p style={{
          color: '#4B5563',
          fontSize: 16,
          maxWidth: 600,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Search, analyze, and explore millions of legal documents from 7 authoritative sources â with full-text search, semantic matching, citation analysis, and real-time pipeline monitoring.
        </p>
      </div>

      {/* ââ Feature cards ââ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16,
        marginBottom: 56,
      }}>
        {FEATURES.map((feat) => (
          <Link key={feat.href} href={feat.href} style={{ textDecoration: 'none' }}>
            <Card variant="interactive" padding="lg">
              <CardBody>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: feat.bg,
                  color: feat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  {feat.icon}
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f0f0f', margin: '0 0 6px' }}>
                  {feat.title}
                </h2>
                <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                  {feat.description}
                </p>
                <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: feat.color }}>
                  Explore &rarr;
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* ââ Data sources ââ */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: '#0f0f0f', marginBottom: 16, textAlign: 'center' }}>
          Integrated Data Sources
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}>
          {SOURCES.map((src) => (
            <div
              key={src.name}
              style={{
                padding: '16px 20px',
                borderRadius: 12,
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
              }}
            >
              <div style={{
                fontSize: 15,
                fontWeight: 600,
                color: src.color,
                marginBottom: 4,
              }}>
                {src.name}
              </div>
              <div style={{ fontSize: 13, color: '#4B5563' }}>{src.type}</div>
              <div style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#0f0f0f',
                fontFamily: 'var(--font-mono, monospace)',
                marginTop: 8,
              }}>
                {src.records}
              </div>
              <div style={{ fontSize: 11, color: '#9CA3AF' }}>records</div>
            </div>
          ))}
        </div>
      </div>

      {/* ââ CTA ââ */}
      <div style={{
        textAlign: 'center',
        padding: '32px 24px',
        background: '#F7F8FA',
        borderRadius: 16,
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0f0f0f', margin: '0 0 8px' }}>
          Ready to get started?
        </h3>
        <p style={{ fontSize: 14, color: '#4B5563', margin: '0 0 16px' }}>
          Jump into the search or explore the citation network.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/legal/search" className="mcv-btn mcv-btn--primary" style={{ padding: '12px 28px', borderRadius: 20, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Search Documents
          </Link>
          <Link href="/legal/dashboard" className="mcv-btn mcv-btn--secondary" style={{ padding: '12px 28px', borderRadius: 20, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
