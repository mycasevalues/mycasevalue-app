'use client';

import Link from 'next/link';
import { Card, CardBody } from '../../components/ui/Card';

const FEATURES = [
  {
    title: 'Legal Document Search',
    description: 'Full-text and semantic search across 7 legal data sources — opinions, regulations, filings, and statutes. Filter by source, type, date, and jurisdiction.',
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
    title: 'Citation Explorer',
    description: 'Interactive force-directed graph of how landmark cases cite each other. See the precedent chains that drive outcomes in your case type.',
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
  {
    title: 'Data Pipeline Dashboard',
    description: 'Monitor ingestion status, source health, document processing, and embedding generation across all 7 sources in real time.',
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
];

const SOURCES = [
  { name: 'CourtListener', records: '500k+', type: 'Legal Opinions', color: '#1E3A5F', description: 'Federal and state court opinions with full text and metadata' },
  { name: 'Federal Register', records: 'Daily', type: 'Regulations', color: '#7C3AED', description: 'Proposed and final rules, notices, and presidential documents' },
  { name: 'eCFR', records: '~200k', type: 'Federal Code', color: '#0D9488', description: 'Electronic Code of Federal Regulations — current regulatory text' },
  { name: 'EDGAR', records: 'Millions', type: 'SEC Filings', color: '#D97706', description: '10-K, 10-Q, 8-K, and other corporate filings and disclosures' },
  { name: 'Caselaw Access', records: '6.7M', type: 'US Cases', color: '#059669', description: 'Harvard Law Library digitized caselaw spanning 360+ years' },
  { name: 'CanLII', records: '100k+', type: 'Canadian Law', color: '#DC2626', description: 'Canadian court decisions and legislation for cross-border research' },
  { name: 'GovInfo', records: 'Millions', type: 'Gov Documents', color: '#6B7280', description: 'Congressional records, federal reports, and government publications' },
];

const USE_CASES = [
  {
    audience: 'Plaintiff Attorneys',
    description: 'Build stronger demand packages with citation-backed precedents. See which regulations and landmark cases support your case type before drafting.',
    icon: '\u2696\uFE0F',
  },
  {
    audience: 'Defense & Insurance',
    description: 'Evaluate exposure against the actual regulatory landscape and precedent chains. Know which citations opposing counsel will likely rely on.',
    icon: '\uD83D\uDEE1\uFE0F',
  },
  {
    audience: 'Legal Researchers',
    description: 'Cross-reference case outcomes with the regulations that drive them. Explore citation networks to trace how legal doctrine evolves.',
    icon: '\uD83D\uDD0D',
  },
  {
    audience: 'Self-Represented Litigants',
    description: 'Understand the legal landscape around your case in plain language. See which laws apply, what courts have decided, and what outcomes look like.',
    icon: '\uD83D\uDC64',
  },
];

export default function LegalDataPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 16px 80px' }}>

      {/* -- Hero -- */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
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
          Research Hub
        </div>
        <h1 style={{
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          fontSize: 40,
          fontWeight: 700,
          color: '#0f0f0f',
          margin: '0 0 16px',
          lineHeight: 1.2,
        }}>
          Case Outcomes Meet Legal Research
        </h1>
        <p style={{
          color: '#4B5563',
          fontSize: 17,
          maxWidth: 640,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          MyCaseValue doesn&apos;t just tell you win rates — it shows you the regulations, precedents, and citation networks behind them. Search 127,000+ legal documents from 7 authoritative sources alongside 5.1M federal case outcomes.
        </p>
      </div>

      {/* -- Feature cards -- */}
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

      {/* -- How It Enhances Your Research -- */}
      <div style={{ marginBottom: 56 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0f0f0f', marginBottom: 8, textAlign: 'center' }}>
          How Legal Data Powers Better Outcomes
        </h2>
        <p style={{ fontSize: 15, color: '#4B5563', textAlign: 'center', maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.6 }}>
          The legal data integration enriches every part of MyCaseValue — from case type pages to judge profiles to your exported reports.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}>
          {USE_CASES.map((uc) => (
            <div
              key={uc.audience}
              style={{
                padding: '24px',
                borderRadius: 16,
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{uc.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#0f0f0f', marginBottom: 6 }}>
                {uc.audience}
              </div>
              <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
                {uc.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -- Data sources -- */}
      <div style={{ marginBottom: 56 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: '#0f0f0f', marginBottom: 8, textAlign: 'center' }}>
          7 Integrated Data Sources
        </h2>
        <p style={{ fontSize: 14, color: '#4B5563', textAlign: 'center', maxWidth: 480, margin: '0 auto 20px' }}>
          All indexed, cross-referenced, and searchable from a single interface.
        </p>
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
              <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 4 }}>{src.type}</div>
              <div style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#0f0f0f',
                fontFamily: 'var(--font-mono, monospace)',
                marginTop: 4,
              }}>
                {src.records}
              </div>
              <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 6 }}>records</div>
              <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>
                {src.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -- What's Coming Next -- */}
      <div style={{
        padding: '32px',
        borderRadius: 16,
        background: '#F0F5FF',
        border: '1px solid #D4E4F7',
        marginBottom: 40,
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px' }}>
          Coming Soon to the Research Hub
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          <div style={{ fontSize: 14, color: '#374151' }}>
            <strong style={{ color: '#0966C3' }}>Regulatory Alerts</strong> — Get notified when Federal Register rulemaking affects your case types
          </div>
          <div style={{ fontSize: 14, color: '#374151' }}>
            <strong style={{ color: '#0966C3' }}>Citation-Backed Reports</strong> — PDF exports with the legal landscape section showing relevant precedents
          </div>
          <div style={{ fontSize: 14, color: '#374151' }}>
            <strong style={{ color: '#0966C3' }}>Case Page Integration</strong> — Related regulations and landmark precedents on every case type page
          </div>
        </div>
      </div>

      {/* -- CTA -- */}
      <div style={{
        textAlign: 'center',
        padding: '40px 24px',
        background: '#0966C3',
        borderRadius: 16,
        color: '#FFFFFF',
      }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
          Start Researching
        </h3>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', margin: '0 0 20px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          Search legal documents, explore citation networks, or check the data pipeline. Free during beta.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/legal/search" style={{ padding: '12px 28px', borderRadius: 20, fontSize: 15, fontWeight: 600, textDecoration: 'none', background: '#FFFFFF', color: '#0966C3' }}>
            Search Documents
          </Link>
          <Link href="/legal/citations" style={{ padding: '12px 28px', borderRadius: 20, fontSize: 15, fontWeight: 600, textDecoration: 'none', background: 'transparent', color: '#FFFFFF', border: '2px solid rgba(255,255,255,0.6)' }}>
            Citation Explorer
          </Link>
          <Link href="/legal/dashboard" style={{ padding: '12px 28px', borderRadius: 20, fontSize: 15, fontWeight: 500, textDecoration: 'none', background: 'transparent', color: '#FFFFFF', border: '2px solid rgba(255,255,255,0.6)' }}>
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
