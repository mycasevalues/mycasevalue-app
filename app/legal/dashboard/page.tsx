'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/* Types and data                                                      */
/* ------------------------------------------------------------------ */

interface SourceStatus {
  name: string;
  key: string;
  color: string;
  status: 'healthy' | 'degraded' | 'offline';
  documents: number;
  lastSync: string;
  syncInterval: string;
  latency: number;
  uptime: number;
  trend: number;
}

interface PipelineEvent {
  id: string;
  type: 'ingestion' | 'processing' | 'embedding' | 'error';
  source: string;
  message: string;
  timestamp: string;
  count?: number;
}

const SOURCES: SourceStatus[] = [
  { name: 'CourtListener', key: 'courtlistener', color: '#1E3A5F', status: 'healthy', documents: 547832, lastSync: '2 min ago', syncInterval: '15 min', latency: 142, uptime: 99.8, trend: 2.4 },
  { name: 'Federal Register', key: 'federal_register', color: '#7C3AED', status: 'healthy', documents: 89421, lastSync: '8 min ago', syncInterval: '1 hr', latency: 210, uptime: 99.5, trend: 1.8 },
  { name: 'eCFR', key: 'ecfr', color: '#0D9488', status: 'healthy', documents: 198765, lastSync: '25 min ago', syncInterval: '6 hr', latency: 95, uptime: 99.9, trend: 0.3 },
  { name: 'EDGAR', key: 'edgar', color: '#D97706', status: 'degraded', documents: 1243098, lastSync: '1 hr ago', syncInterval: '30 min', latency: 890, uptime: 97.2, trend: -0.5 },
  { name: 'Caselaw Access', key: 'caselaw', color: '#059669', status: 'healthy', documents: 6712340, lastSync: '12 min ago', syncInterval: '4 hr', latency: 178, uptime: 99.7, trend: 0.9 },
  { name: 'CanLII', key: 'canlii', color: '#DC2626', status: 'healthy', documents: 134562, lastSync: '45 min ago', syncInterval: '12 hr', latency: 320, uptime: 99.1, trend: 1.2 },
  { name: 'GovInfo', key: 'govinfo', color: 'var(--color-text-muted)', status: 'offline', documents: 2891234, lastSync: '3 hr ago', syncInterval: '2 hr', latency: 0, uptime: 94.3, trend: -1.1 },
];

const PIPELINE_EVENTS: PipelineEvent[] = [
  { id: 'e1', type: 'ingestion', source: 'CourtListener', message: 'Ingested 1,247 new opinions from 9th Circuit', timestamp: '2 min ago', count: 1247 },
  { id: 'e2', type: 'processing', source: 'Federal Register', message: 'Processing 89 proposed rules from EPA and FTC', timestamp: '8 min ago', count: 89 },
  { id: 'e3', type: 'embedding', source: 'eCFR', message: 'Generated embeddings for 3,421 regulation sections', timestamp: '22 min ago', count: 3421 },
  { id: 'e4', type: 'error', source: 'EDGAR', message: 'Rate limit exceeded on SEC API - retrying in 5 min', timestamp: '58 min ago' },
  { id: 'e5', type: 'ingestion', source: 'Caselaw Access', message: 'Synced 5,892 historical cases from Harvard Law', timestamp: '1 hr ago', count: 5892 },
  { id: 'e6', type: 'error', source: 'GovInfo', message: 'Connection timeout - GPO server unreachable', timestamp: '3 hr ago' },
  { id: 'e7', type: 'processing', source: 'CanLII', message: 'Processed 412 Canadian Supreme Court decisions', timestamp: '3 hr ago', count: 412 },
  { id: 'e8', type: 'embedding', source: 'CourtListener', message: 'Generated semantic embeddings for 8,934 documents', timestamp: '4 hr ago', count: 8934 },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  healthy: { bg: 'rgba(34,197,94,0.06)', color: '#15803D', label: 'Healthy' },
  degraded: { bg: 'rgba(234,179,8,0.08)', color: '#B45309', label: 'Degraded' },
  offline: { bg: '#FEF2F2', color: '#B91C1C', label: 'Offline' },
};

const EVENT_STYLES: Record<string, { bg: string; color: string; icon: string }> = {
  ingestion: { bg: '#E8F4FD', color: 'var(--accent-primary)', icon: '\u2B07' },
  processing: { bg: '#F5F3FF', color: '#7C3AED', icon: '\u2699' },
  embedding: { bg: 'rgba(34,197,94,0.06)', color: '#059669', icon: '\u2728' },
  error: { bg: '#FEF2F2', color: '#DC2626', icon: '\u26A0' },
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return String(n);
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function LegalDashboardPage() {
  const [sources, setSources] = useState(SOURCES);
  const [events] = useState(PIPELINE_EVENTS);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'quality'>('overview');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const totalDocs = sources.reduce((sum, s) => sum + s.documents, 0);
  const healthySources = sources.filter(s => s.status === 'healthy').length;
  const avgUptime = (sources.reduce((sum, s) => sum + s.uptime, 0) / sources.length).toFixed(1);
  const avgLatency = Math.round(sources.filter(s => s.latency > 0).reduce((sum, s) => sum + s.latency, 0) / sources.filter(s => s.latency > 0).length);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 16px 40px' }}>

      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 24 }}>
        <Link href="/legal" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Research Hub</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span>Data Dashboard</span>
      </nav>

      {/* Hero */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 8px', lineHeight: 1.2 }}>
            Data Pipeline Dashboard
          </h1>
          <p style={{ fontSize: 15, color: 'var(--color-text-muted)', margin: 0, maxWidth: 540, lineHeight: 1.6 }}>
            Monitor ingestion, processing, and health across all 7 legal data sources in real time.
          </p>
        </div>
        <div style={{
          padding: '8px 16px',
          borderRadius: 10,
          background: 'rgba(34,197,94,0.06)',
          border: '1px solid #BBF7D0',
          fontSize: 13,
          color: '#15803D',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#15803D', display: 'inline-block' }} />
          System operational
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
        <div style={{ padding: '20px 24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Total Documents</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono, monospace)' }}>{formatNumber(totalDocs)}</div>
          <div style={{ fontSize: 12, color: '#15803D', marginTop: 4 }}>+12,341 today</div>
        </div>
        <div style={{ padding: '20px 24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Sources Online</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#059669', fontFamily: 'var(--font-mono, monospace)' }}>{healthySources}/{sources.length}</div>
          <div style={{ fontSize: 12, color: sources.some(s => s.status !== 'healthy') ? '#B45309' : '#15803D', marginTop: 4 }}>
            {sources.some(s => s.status === 'offline') ? '1 source offline' : sources.some(s => s.status === 'degraded') ? '1 degraded' : 'All healthy'}
          </div>
        </div>
        <div style={{ padding: '20px 24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Avg Uptime</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>{avgUptime}%</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>30-day rolling</div>
        </div>
        <div style={{ padding: '20px 24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Avg Latency</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>{avgLatency}ms</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>API response time</div>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid var(--border-default)', paddingBottom: 0 }}>
        {(['overview', 'events', 'quality'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? 'var(--accent-primary)' : '#6B7280',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--accent-primary)' : '2px solid transparent',
              cursor: 'pointer',
              textTransform: 'capitalize',
              marginBottom: -1,
            }}
          >
            {tab === 'quality' ? 'Data Quality' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sources.map((src) => {
            const st = STATUS_STYLES[src.status];
            return (
              <div
                key={src.key}
                style={{
                  padding: '20px 24px',
                  borderRadius: 14,
                  border: '1px solid var(--border-default)',
                  background: 'var(--color-surface-0)',
                  display: 'grid',
                  gridTemplateColumns: '200px 100px 1fr 120px 100px',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                {/* Name + status */}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: src.color, marginBottom: 4 }}>{src.name}</div>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 600,
                    color: st.color,
                    background: st.bg,
                  }}>
                    {st.label}
                  </span>
                </div>

                {/* Documents */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
                    {formatNumber(src.documents)}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>docs</div>
                </div>

                {/* Health bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Uptime</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: src.uptime >= 99 ? '#15803D' : src.uptime >= 97 ? '#B45309' : '#B91C1C' }}>
                      {src.uptime}%
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 8, background: 'var(--border-default)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${src.uptime}%`,
                      borderRadius: 8,
                      background: src.uptime >= 99 ? '#22C55E' : src.uptime >= 97 ? '#F59E0B' : '#EF4444',
                      transition: 'width 0.5s',
                    }} />
                  </div>
                </div>

                {/* Latency */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: src.latency === 0 ? '#DC2626' : src.latency < 300 ? 'var(--color-text-primary)' : '#B45309', fontFamily: 'var(--font-mono, monospace)' }}>
                    {src.latency === 0 ? '---' : `${src.latency}ms`}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>latency</div>
                </div>

                {/* Last sync */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{src.lastSync}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>every {src.syncInterval}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {events.map((evt) => {
            const es = EVENT_STYLES[evt.type];
            return (
              <div
                key={evt.id}
                style={{
                  padding: '14px 20px',
                  borderRadius: 12,
                  border: '1px solid var(--border-default)',
                  background: 'var(--color-surface-0)',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: es.bg,
                  color: es.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  flexShrink: 0,
                }}>
                  {es.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>{evt.source}</span>
                    <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{evt.timestamp}</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{evt.message}</div>
                  {evt.count && (
                    <span style={{
                      display: 'inline-block',
                      marginTop: 6,
                      padding: '2px 8px',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 600,
                      color: es.color,
                      background: es.bg,
                    }}>
                      {evt.count.toLocaleString()} documents
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Data Quality Tab */}
      {activeTab === 'quality' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
            {/* Completeness */}
            <div style={{ padding: '24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px' }}>Document Completeness</h3>
              {[
                { label: 'Has full text', value: 94 },
                { label: 'Has metadata', value: 99 },
                { label: 'Has jurisdiction', value: 97 },
                { label: 'Has date', value: 98 },
                { label: 'Has embeddings', value: 87 },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: item.value >= 95 ? '#15803D' : item.value >= 90 ? '#B45309' : '#DC2626' }}>{item.value}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 8, background: 'var(--border-default)' }}>
                    <div style={{
                      height: '100%',
                      width: `${item.value}%`,
                      borderRadius: 8,
                      background: item.value >= 95 ? '#22C55E' : item.value >= 90 ? '#F59E0B' : '#EF4444',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Freshness */}
            <div style={{ padding: '24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px' }}>Data Freshness</h3>
              {sources.map(src => {
                const fresh = src.status === 'healthy' ? 'current' : src.status === 'degraded' ? 'stale' : 'unavailable';
                const freshColor = fresh === 'current' ? '#15803D' : fresh === 'stale' ? '#B45309' : '#DC2626';
                return (
                  <div key={src.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 13, color: src.color, fontWeight: 500 }}>{src.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>synced {src.lastSync}</span>
                      <span style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: freshColor,
                        display: 'inline-block',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Processing stats */}
          <div style={{ padding: '24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px' }}>Processing Pipeline</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {[
                { stage: 'Ingestion Queue', count: 3421, status: 'active', color: 'var(--accent-primary)' },
                { stage: 'Text Extraction', count: 892, status: 'active', color: '#7C3AED' },
                { stage: 'Entity Recognition', count: 456, status: 'active', color: '#0D9488' },
                { stage: 'Embedding Generation', count: 1203, status: 'active', color: '#059669' },
                { stage: 'Index Update', count: 78, status: 'active', color: '#D97706' },
              ].map(stage => (
                <div key={stage.stage} style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: stage.color, fontFamily: 'var(--font-mono, monospace)' }}>
                    {stage.count.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 4 }}>{stage.stage}</div>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 600,
                    color: '#15803D',
                    background: 'rgba(34,197,94,0.06)',
                  }}>
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back to hub */}
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link href="/legal" style={{ fontSize: 14, color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500 }}>
          &larr; Back to Research Hub
        </Link>
      </div>
    </div>
  );
}
