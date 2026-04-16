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
  { id: '7', caseNumber: '4:25-cv-00089', caseName: 'Thompson v. United Airlines', court: 'D. Colo.', event: 'Deposition of plaintiff completed', date: '2026-03-29', priority: 'low' },
  { id: '8', caseNumber: '1:25-cv-00456', caseName: 'Rodriguez v. JP Morgan Chase', court: 'S.D.N.Y.', event: 'Motion to Compel Discovery granted — 30 days to comply', date: '2026-03-28', priority: 'high' },
  { id: '9', caseNumber: '3:24-cv-02345', caseName: 'Patel v. Kaiser Permanente', court: 'N.D. Cal.', event: 'Class certification motion filed', date: '2026-03-27', priority: 'high' },
  { id: '10', caseNumber: '2:25-cv-00567', caseName: 'Lee v. Target Corporation', court: 'D.N.J.', event: 'Mediation ordered for May 12', date: '2026-03-26', priority: 'medium' },
  { id: '11', caseNumber: '1:24-cv-03456', caseName: 'Garcia v. FedEx Ground', court: 'S.D. Fla.', event: 'Defendant answer filed — denying all claims', date: '2026-03-25', priority: 'low' },
  { id: '12', caseNumber: '5:23-cv-01890', caseName: 'Wilson v. County of Cook', court: 'N.D. Ill.', event: 'Partial summary judgment granted for plaintiff on liability', date: '2026-03-24', priority: 'high' },
];

const priorityColors = {
  high: { bg: 'rgba(204,16,25,0.12)', text: 'var(--accent-primary)', dot: 'var(--accent-primary)' },
  medium: { bg: 'rgba(184,110,0,0.12)', text: '#B86E00', dot: '#B86E00' },
  low: { bg: 'rgba(7,135,74,0.12)', text: '#059669', dot: '#059669' },
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
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      <style>{`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        input:focus { border-color: var(--accent-primary) !important; outline: none; box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08); }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
      `}</style>
      <div style={{
        background: '#080d19',
        color: '#fff',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <h1 className="font-display" style={{ fontSize: '26px', fontWeight: 600, color: 'var(--color-surface-0)', margin: '0 0 4px 0' }}>PACER Monitoring</h1>
          <p style={{ fontSize: '14px', color: '#B0B8C0', margin: 0 }}>Real-time alerts on case developments, filings, and motions</p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 300px)', gap: '24px' }} className="pacer-grid">
          <style>{`.pacer-grid { grid-template-columns: 1fr !important; } @media (min-width: 768px) { .pacer-grid { grid-template-columns: minmax(0, 1fr) minmax(260px, 300px) !important; } }`}</style>
          {/* Alerts Feed */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>Recent Alerts</h2>
              <div style={{ display: 'flex', gap: '4px', background: 'var(--color-surface-1)', borderRadius: '12px', border: '1px solid var(--border-default)', padding: '3px' }}>
                {(['all', 'high', 'medium', 'low'] as const).map((f) => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 10px', borderRadius: '12px', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer', backgroundColor: filter === f ? 'var(--accent-primary)' : 'transparent', color: filter === f ? 'var(--color-surface-0)' : 'var(--color-text-secondary)', textTransform: 'capitalize' as const }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filtered.map((alert) => {
                const pc = priorityColors[alert.priority];
                return (
                  <div key={alert.id} style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '16px 20px', border: '1px solid var(--border-default)', borderLeft: `4px solid ${pc.dot}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-primary-hover)' }}>{alert.caseNumber}</span>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginLeft: '8px' }}>{alert.court}</span>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', backgroundColor: pc.bg, color: pc.text, textTransform: 'uppercase' as const }}>{alert.priority}</span>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>{alert.caseName}</p>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 6px', lineHeight: 1.4 }}>{alert.event}</p>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>{new Date(alert.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Add to Watch List */}
            <div style={{ background: 'var(--color-surface-0)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '12px', padding: '20px', border: '1px solid var(--border-default)', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px' }}>Watch List</h3>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={watchCase}
                  onChange={(e) => setWatchCase(e.target.value)}
                  placeholder="Case number..."
                  style={{ flex: 1, padding: '12px 14px', height: '48px', border: '1px solid var(--border-default)', borderRadius: '12px', fontSize: '13px', fontFamily: 'var(--font-mono)', backgroundColor: 'var(--color-surface-1)', color: 'var(--color-text-primary)', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}
                />
                <button onClick={addWatch} style={{ padding: '12px 20px', height: '48px', backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>+</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {watchList.map((c) => (
                  <div key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', backgroundColor: 'var(--color-surface-1)', borderRadius: '12px' }}>
                    <span className="font-mono" style={{ fontSize: '12px', color: 'var(--color-text-primary)' }}>{c}</span>
                    <button onClick={() => setWatchList(watchList.filter((w) => w !== c))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: '14px' }}>&times;</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ background: 'var(--color-surface-0)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '12px', padding: '20px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px' }}>Monitor Stats</h3>
              {[
                { label: 'Watched Cases', value: String(watchList.length) },
                { label: 'Alerts (7 days)', value: String(alerts.length) },
                { label: 'High Priority', value: String(alerts.filter((a) => a.priority === 'high').length) },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-default)' }}>
                  <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{s.label}</span>
                  <span className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
