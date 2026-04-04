'use client';

import { useState } from 'react';
import Link from 'next/link';

type Alert = {
  id: string;
  caseNumber: string;
  caseName: string;
  court: string;
  event: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
};

const DEMO_ALERTS: Alert[] = [
  { id: '1', caseNumber: '2:24-cv-01234', caseName: 'Martinez v. Acme Corp', court: 'C.D. Cal.', event: 'Motion for Summary Judgment filed by Defendant', date: '2026-04-03', priority: 'high' },
  { id: '2', caseNumber: '1:24-cv-05678', caseName: 'Chen v. Global Health Inc.', court: 'S.D.N.Y.', event: 'Order granting extension of discovery deadline to June 15', date: '2026-04-02', priority: 'medium' },
  { id: '3', caseNumber: '3:23-cv-09876', caseName: 'Johnson v. State Farm', court: 'N.D. Tex.', event: 'Settlement conference scheduled for April 28', date: '2026-04-02', priority: 'medium' },
  { id: '4', caseNumber: '5:24-cv-00321', caseName: 'Williams v. City of Chicago', court: 'N.D. Ill.', event: 'Amended complaint filed', date: '2026-04-01', priority: 'low' },
  { id: '5', caseNumber: '2:23-cv-04567', caseName: 'Davis v. Amazon Logistics', court: 'W.D. Wash.', event: 'Jury trial date set for September 8, 2026', date: '2026-03-31', priority: 'high' },
  { id: '6', caseNumber: '1:24-cv-07890', caseName: 'Brown v. Metro Hospital', court: 'E.D. Pa.', event: 'Expert witness report deadline — 14 days remaining', date: '2026-03-30', priority: 'medium' },
];

const priorityColors = {
  high: { bg: '#FEF2F2', text: '#991B1B', dot: '#DC2626' },
  medium: { bg: '#FFFBEB', text: '#92400E', dot: '#D97706' },
  low: { bg: '#F0FDF4', text: '#065F46', dot: '#16A34A' },
};

export default function PacerMonitorPage() {
  const [alerts] = useState<Alert[]>(DEMO_ALERTS);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [watchCase, setWatchCase] = useState('');
  const [watchList, setWatchList] = useState<string[]>(['2:24-cv-01234', '1:24-cv-05678', '3:23-cv-09876']);

  const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.priority === filter);

  function addWatch() {
    if (watchCase.trim() && !watchList.includes(watchCase.trim())) {
      setWatchList([...watchList, watchCase.trim()]);
      setWatchCase('');
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'var(--font-body)' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '32px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: '#8B5CF6', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Attorney Mode
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8" /><line x1="12" y1="10" x2="12" y2="18" />
              </svg>
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#111111', margin: 0 }}>PACER Monitoring</h1>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>Real-time alerts on case developments, filings, and motions</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 300px)', gap: '24px' }} className="pacer-grid">
          <style>{`.pacer-grid { grid-template-columns: 1fr !important; } @media (min-width: 768px) { .pacer-grid { grid-template-columns: minmax(0, 1fr) minmax(260px, 300px) !important; } }`}</style>
          {/* Alerts Feed */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#111111', margin: 0 }}>Recent Alerts</h2>
              <div style={{ display: 'flex', gap: '4px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '3px' }}>
                {(['all', 'high', 'medium', 'low'] as const).map((f) => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 10px', borderRadius: '5px', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer', backgroundColor: filter === f ? '#8B5CF6' : 'transparent', color: filter === f ? '#FFFFFF' : '#6B7280', textTransform: 'capitalize' as const }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filtered.map((alert) => {
                const pc = priorityColors[alert.priority];
                return (
                  <div key={alert.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '16px 20px', border: '1px solid #E5E7EB', borderLeft: `4px solid ${pc.dot}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#8B5CF6' }}>{alert.caseNumber}</span>
                        <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: '8px' }}>{alert.court}</span>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: pc.bg, color: pc.text, textTransform: 'uppercase' as const }}>{alert.priority}</span>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', margin: '0 0 4px' }}>{alert.caseName}</p>
                    <p style={{ fontSize: '13px', color: '#374151', margin: '0 0 6px', lineHeight: 1.4 }}>{alert.event}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>{new Date(alert.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Add to Watch List */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', marginBottom: '16px' }}>
              <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#111111', margin: '0 0 12px' }}>Watch List</h3>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={watchCase}
                  onChange={(e) => setWatchCase(e.target.value)}
                  placeholder="Case number..."
                  style={{ flex: 1, padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}
                />
                <button onClick={addWatch} style={{ padding: '8px 12px', backgroundColor: '#8B5CF6', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {watchList.map((c) => (
                  <div key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                    <span className="font-mono" style={{ fontSize: '12px', color: '#111111' }}>{c}</span>
                    <button onClick={() => setWatchList(watchList.filter((w) => w !== c))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '14px' }}>&times;</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
              <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#111111', margin: '0 0 12px' }}>Monitor Stats</h3>
              {[
                { label: 'Watched Cases', value: String(watchList.length) },
                { label: 'Alerts (7 days)', value: String(alerts.length) },
                { label: 'High Priority', value: String(alerts.filter((a) => a.priority === 'high').length) },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ fontSize: '13px', color: '#6B7280' }}>{s.label}</span>
                  <span className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: '#111111' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
