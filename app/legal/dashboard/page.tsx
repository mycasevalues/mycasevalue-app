'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';

/* ââ Source theme colors ââ */
const SOURCE_THEME: Record<string, { color: string; bg: string }> = {
  courtlistener:    { color: '#1E3A5F', bg: '#EFF6FF' },
  federal_register: { color: '#7C3AED', bg: '#F5F3FF' },
  ecfr:             { color: '#0D9488', bg: '#F0FDFA' },
  edgar:            { color: '#D97706', bg: '#FFFBEB' },
  caselaw:          { color: '#059669', bg: '#F0FDF4' },
  canlii:           { color: '#DC2626', bg: '#FEF2F2' },
  govinfo:          { color: '#4B5563', bg: '#F9FAFB' },
};

const STATUS_COLORS: Record<string, { color: string; bg: string; label: string }> = {
  active:    { color: '#15803D', bg: '#F0FDF4', label: 'Active' },
  syncing:   { color: '#D97706', bg: '#FFFBEB', label: 'Syncing' },
  error:     { color: '#B91C1C', bg: '#FEF2F2', label: 'Error' },
  idle:      { color: '#6B7280', bg: '#F3F4F6', label: 'Idle' },
  completed: { color: '#15803D', bg: '#F0FDF4', label: 'Completed' },
  failed:    { color: '#B91C1C', bg: '#FEF2F2', label: 'Failed' },
  pending:   { color: '#D97706', bg: '#FFFBEB', label: 'Pending' },
};

interface DashboardData {
  overview: {
    totalDocuments: number;
    documentsBySource: any;
    pendingEmbeddings: number;
    processingStatus: Record<string, number>;
  };
  sources: {
    name: string;
    status: string;
    lastSync: string;
    nextSync: string;
    totalSynced: number;
    lastError: string | null;
    retryCount: number;
  }[];
  topCited: {
    documentId: string;
    title: string;
    citationCount: number;
    source: string;
  }[];
  recentDocuments: {
    id: string;
    title: string;
    source: string;
    type: string;
    datePublished: string;
    status: string;
    createdAt: string;
  }[];
  timestamp: string;
}

/* ââ Stat card ââ */
function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      background: accent ? '#E8F4FD' : '#FFFFFF',
      border: `1px solid ${accent ? '#B3D9F2' : '#E5E7EB'}`,
      borderRadius: 12,
      padding: '20px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 28,
        fontWeight: 700,
        color: accent ? '#0966C3' : '#0f0f0f',
        fontFamily: 'var(--font-mono, IBM Plex Mono, monospace)',
        lineHeight: 1.1,
      }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div style={{ fontSize: 13, color: '#4B5563', fontWeight: 500, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function LegalDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch('/api/legal/dashboard');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError('Failed to load dashboard data. The legal data pipeline may not be initialized yet.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
    // Auto-refresh every 30s
    const interval = setInterval(fetchDashboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = (dateStr: string | null) => {
    if (!dateStr) return 'â';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px 64px' }}>

      {/* ââ Header ââ */}
      <div style={{ marginBottom: 32 }}>
        <nav style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
          <Link href="/" style={{ color: '#0966C3', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 6px' }}>/</span>
          <Link href="/legal" style={{ color: '#0966C3', textDecoration: 'none' }}>Legal Data</Link>
          <span style={{ margin: '0 6px' }}>/</span>
          <span>Dashboard</span>
        </nav>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: 28, fontWeight: 700, color: '#0f0f0f', margin: 0 }}>
              Legal Data Dashboard
            </h1>
            <p style={{ color: '#4B5563', fontSize: 15, margin: '4px 0 0' }}>
              Monitor ingestion pipeline, source health, and document processing status.
            </p>
          </div>
          {data && (
            <div style={{ fontSize: 12, color: '#9CA3AF' }}>
              Last updated: {new Date(data.timestamp).toLocaleTimeString()} &middot; Auto-refreshes
            </div>
          )}
        </div>
      </div>

      {/* ââ Loading ââ */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 48 }}>
          <div style={{
            width: 40,
            height: 40,
            border: '3px solid #E5E7EB',
            borderTopColor: '#0966C3',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <p style={{ color: '#6B7280', fontSize: 14 }}>Loading dashboard dataâ¦</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ââ Error ââ */}
      {error && !loading && (
        <Card variant="outlined" padding="lg">
          <CardBody>
            <div style={{ textAlign: 'center', color: '#6B7280' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 4px' }}>Dashboard Unavailable</p>
              <p style={{ fontSize: 13 }}>{error}</p>
              <p style={{ fontSize: 13, marginTop: 12 }}>
                Check the <Link href="/legal" style={{ color: '#0966C3' }}>Implementation Guide</Link> to set up the data pipeline.
              </p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* ââ Dashboard content ââ */}
      {data && !loading && (
        <>
          {/* Overview stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
            marginBottom: 32,
          }}>
            <StatCard label="Total Documents" value={data.overview.totalDocuments} accent />
            <StatCard label="Pending Embeddings" value={data.overview.pendingEmbeddings} />
            <StatCard
              label="Completed"
              value={data.overview.processingStatus.completed || 0}
              sub={`of ${data.overview.totalDocuments}`}
            />
            <StatCard
              label="Failed"
              value={data.overview.processingStatus.failed || 0}
              sub={data.overview.processingStatus.failed > 0 ? 'needs attention' : 'none'}
            />
            <StatCard label="Data Sources" value={data.sources.length || 7} />
          </div>

          {/* Sources grid */}
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px' }}>Source Health</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 12,
            marginBottom: 32,
          }}>
            {data.sources.map((src) => {
              const theme = SOURCE_THEME[src.name] || { color: '#4B5563', bg: '#F9FAFB' };
              const status = STATUS_COLORS[src.status] || STATUS_COLORS.idle;
              return (
                <Card key={src.name} variant="outlined" padding="md">
                  <CardBody>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: theme.color,
                        padding: '2px 10px',
                        background: theme.bg,
                        borderRadius: 20,
                      }}>
                        {src.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 20,
                        color: status.color,
                        background: status.bg,
                      }}>
                        {status.label}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                      <div>
                        <span style={{ color: '#9CA3AF' }}>Synced</span>
                        <div style={{ fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-mono, monospace)' }}>
                          {(src.totalSynced || 0).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span style={{ color: '#9CA3AF' }}>Last Sync</span>
                        <div style={{ fontWeight: 500, color: '#4B5563' }}>{timeAgo(src.lastSync)}</div>
                      </div>
                    </div>
                    {src.lastError && (
                      <div style={{
                        marginTop: 8,
                        padding: '6px 10px',
                        background: '#FEF2F2',
                        borderRadius: 6,
                        fontSize: 12,
                        color: '#B91C1C',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {src.lastError}
                      </div>
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </div>

          {/* Two-column: Recent docs + Top cited */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 16,
          }}>
            {/* Recent documents */}
            <Card variant="outlined" padding="none">
              <CardHeader className="p-4 border-b" style={{ borderBottom: '1px solid #E5E7EB', padding: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0f0f0f', margin: 0 }}>Recent Documents</h3>
              </CardHeader>
              <CardBody className="p-0">
                {data.recentDocuments.length === 0 ? (
                  <div style={{ padding: 24, textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>
                    No documents ingested yet.
                  </div>
                ) : (
                  <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                    {data.recentDocuments.map((doc) => {
                      const srcTheme = SOURCE_THEME[doc.source] || { color: '#4B5563', bg: '#F9FAFB' };
                      const docStatus = STATUS_COLORS[doc.status] || STATUS_COLORS.pending;
                      return (
                        <div
                          key={doc.id}
                          style={{
                            padding: '12px 16px',
                            borderBottom: '1px solid #F3F4F6',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: 8,
                          }}
                        >
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{
                              fontSize: 13.5,
                              fontWeight: 500,
                              color: '#0f0f0f',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}>
                              {doc.title || 'Untitled'}
                            </div>
                            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, display: 'flex', gap: 8 }}>
                              <span style={{
                                color: srcTheme.color,
                                background: srcTheme.bg,
                                padding: '0 6px',
                                borderRadius: 10,
                                fontSize: 10,
                                fontWeight: 600,
                              }}>
                                {doc.source}
                              </span>
                              <span>{timeAgo(doc.createdAt)}</span>
                            </div>
                          </div>
                          <span style={{
                            fontSize: 10,
                            fontWeight: 600,
                            padding: '2px 6px',
                            borderRadius: 10,
                            color: docStatus.color,
                            background: docStatus.bg,
                            flexShrink: 0,
                          }}>
                            {docStatus.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Top cited documents */}
            <Card variant="outlined" padding="none">
              <CardHeader className="p-4 border-b" style={{ borderBottom: '1px solid #E5E7EB', padding: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0f0f0f', margin: 0 }}>Most Cited Documents</h3>
              </CardHeader>
              <CardBody className="p-0">
                {data.topCited.length === 0 ? (
                  <div style={{ padding: 24, textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>
                    No citation data yet. Citations are extracted as documents are processed.
                  </div>
                ) : (
                  <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                    {data.topCited.map((doc, idx) => (
                      <div
                        key={doc.documentId}
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #F3F4F6',
                          display: 'flex',
                          gap: 12,
                          alignItems: 'center',
                        }}
                      >
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: idx < 3 ? '#E8F4FD' : '#F3F4F6',
                          color: idx < 3 ? '#0966C3' : '#6B7280',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}>
                          {idx + 1}
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <Link
                            href={`/legal/citations?documentId=${doc.documentId}`}
                            style={{
                              fontSize: 13.5,
                              fontWeight: 500,
                              color: '#004182',
                              textDecoration: 'none',
                              display: 'block',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {doc.title || 'Untitled'}
                          </Link>
                        </div>
                        <div style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: '#0966C3',
                          fontFamily: 'var(--font-mono, monospace)',
                          flexShrink: 0,
                        }}>
                          {doc.citationCount}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
