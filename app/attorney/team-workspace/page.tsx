'use client';

import { useState } from 'react';
import Link from 'next/link';

type TeamMember = { name: string; email: string; role: string; avatar: string; lastActive: string };
type SharedReport = { title: string; type: string; sharedBy: string; date: string; comments: number };

const DEMO_TEAM: TeamMember[] = [
  { name: 'You', email: 'you@firm.com', role: 'Admin', avatar: 'Y', lastActive: 'Now' },
  { name: 'Sarah Chen', email: 'schen@firm.com', role: 'Partner', avatar: 'SC', lastActive: '2 hours ago' },
  { name: 'Michael Torres', email: 'mtorres@firm.com', role: 'Associate', avatar: 'MT', lastActive: '1 day ago' },
  { name: 'Lisa Park', email: 'lpark@firm.com', role: 'Paralegal', avatar: 'LP', lastActive: '3 hours ago' },
  { name: 'James Wright', email: 'jwright@firm.com', role: 'Partner', avatar: 'JW', lastActive: '5 hours ago' },
  { name: 'Ana Rodriguez', email: 'arodriguez@firm.com', role: 'Associate', avatar: 'AR', lastActive: '30 min ago' },
  { name: 'David Kim', email: 'dkim@firm.com', role: 'Associate', avatar: 'DK', lastActive: '2 days ago' },
];

const DEMO_REPORTS: SharedReport[] = [
  { title: 'Employment Discrimination — CA District Analysis', type: 'Venue Analysis', sharedBy: 'Sarah Chen', date: '2026-04-03', comments: 3 },
  { title: 'Jones v. Acme — Outcome Prediction', type: 'Case Prediction', sharedBy: 'You', date: '2026-04-02', comments: 1 },
  { title: 'Q1 Case Portfolio Review', type: 'Bulk Analysis', sharedBy: 'Michael Torres', date: '2026-03-28', comments: 5 },
  { title: 'Hon. Gee — Judge Intelligence Report', type: 'Judge Intel', sharedBy: 'Lisa Park', date: '2026-03-25', comments: 2 },
  { title: 'Martinez v. Acme Corp — Opposing Counsel Brief', type: 'Counsel Analysis', sharedBy: 'Ana Rodriguez', date: '2026-04-04', comments: 4 },
  { title: 'Product Liability NOS 365 — National Win Rates', type: 'Data Report', sharedBy: 'James Wright', date: '2026-03-30', comments: 0 },
  { title: 'S.D.N.Y. vs C.D. Cal. — Venue Comparison', type: 'Venue Analysis', sharedBy: 'David Kim', date: '2026-03-22', comments: 7 },
  { title: 'Patent Infringement Portfolio — Risk Assessment', type: 'Bulk Analysis', sharedBy: 'Sarah Chen', date: '2026-03-18', comments: 3 },
];

const roleColors: Record<string, string> = {
  Admin: '#3D8FB5',
  Partner: '#07874A',
  Associate: '#006997',
  Paralegal: '#B86E00',
};

export default function TeamWorkspacePage() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [tab, setTab] = useState<'reports' | 'team' | 'activity'>('reports');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F6F7', fontFamily: 'var(--font-body)' }}>
      <style>{`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        input:focus { border-color: #E8171F !important; outline: none; box-shadow: 0 0 0 2px rgba(232,23,31,0.08); }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
      `}</style>
      <div style={{ background: '#00172E', borderBottom: '1px solid #D5D8DC', padding: '32px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/" style={{ fontSize: '13px', color: '#E8171F', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Home &gt; Attorney Tools &gt; Team Workspace
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '2px', background: 'rgba(232,23,31,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Team Workspace</h1>
              </div>
            </div>
            <div style={{ background: 'rgba(232,23,31,0.15)', padding: '6px 14px', borderRadius: '2px', border: '1px solid #E8171F' }}>
              <span className="font-display" style={{ fontSize: '12px', fontWeight: 700, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Collaboration</span>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: '#B0B8C0', margin: '4px 0 0 52px' }}>Collaborate with colleagues — share reports, annotations, and insights</p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#F8F9FA', borderRadius: '2px', border: '1px solid #D5D8DC', padding: '3px', width: 'fit-content' }}>
          {(['reports', 'team', 'activity'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: '2px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', backgroundColor: tab === t ? '#E8171F' : 'transparent', color: tab === t ? '#FFFFFF' : '#455A64', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
              {t === 'reports' ? 'Shared Reports' : t === 'team' ? 'Team Members' : 'Activity'}
            </button>
          ))}
        </div>

        {tab === 'reports' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DEMO_REPORTS.map((r, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '2px', padding: '18px 22px', border: '1px solid #D5D8DC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#212529', margin: '0 0 4px' }}>{r.title}</p>
                  <p style={{ fontSize: '12px', color: '#455A64', margin: 0 }}>
                    <span style={{ padding: '2px 8px', borderRadius: '2px', backgroundColor: 'rgba(232,23,31,0.12)', color: '#E8171F', fontSize: '11px', fontWeight: 600, marginRight: '8px' }}>{r.type}</span>
                    Shared by {r.sharedBy} · {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#455A64', fontSize: '13px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  {r.comments}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'team' && (
          <>
            {/* Invite */}
            <div style={{ background: '#FFFFFF', borderRadius: '2px', padding: '20px', border: '1px solid #D5D8DC', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#212529', margin: '0 0 12px' }}>Invite Team Member</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@firm.com" style={{ flex: 1, padding: '12px 14px', height: '48px', border: '1px solid #D5D8DC', borderRadius: '2px', fontSize: '14px', fontFamily: 'var(--font-body)', backgroundColor: '#FFFFFF', color: '#212529' }}
                  onFocus={(e) => e.target.style.borderColor = '#E8171F'}
                  onBlur={(e) => e.target.style.borderColor = '#D5D8DC'}
                />
                <button onClick={() => { setInviteEmail(''); }} style={{ padding: '12px 20px', height: '48px', backgroundColor: '#E8171F', color: '#FFFFFF', border: 'none', borderRadius: '2px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Invite</button>
              </div>
            </div>

            {/* Members */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {DEMO_TEAM.map((m, i) => (
                <div key={i} style={{ background: '#FFFFFF', borderRadius: '2px', padding: '16px 20px', border: '1px solid #D5D8DC', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(232,23,31,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#E8171F', flexShrink: 0 }}>{m.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#212529', margin: '0 0 2px' }}>{m.name}</p>
                    <p style={{ fontSize: '12px', color: '#455A64', margin: 0 }}>{m.email}</p>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '2px', backgroundColor: `${roleColors[m.role]}15`, color: roleColors[m.role] }}>{m.role}</span>
                  <span style={{ fontSize: '11px', color: '#AAAAAA' }}>{m.lastActive}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'activity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { who: 'Ana Rodriguez', action: 'shared', target: 'Martinez v. Acme Corp — Opposing Counsel Brief', time: '1 hour ago', icon: 'share' },
              { who: 'Sarah Chen', action: 'commented on', target: 'Employment Discrimination — CA District Analysis', time: '3 hours ago', icon: 'comment' },
              { who: 'You', action: 'ran', target: 'Case Predictor for NOS 442 — Employment Discrimination', time: '5 hours ago', icon: 'predict' },
              { who: 'Michael Torres', action: 'exported', target: 'Q1 Case Portfolio Review as PDF', time: '1 day ago', icon: 'export' },
              { who: 'Lisa Park', action: 'viewed', target: 'Hon. Gee — Judge Intelligence Report', time: '1 day ago', icon: 'view' },
              { who: 'James Wright', action: 'shared', target: 'Product Liability NOS 365 — National Win Rates', time: '2 days ago', icon: 'share' },
              { who: 'David Kim', action: 'ran', target: 'Venue Optimizer for Patent Infringement in S.D.N.Y.', time: '3 days ago', icon: 'predict' },
              { who: 'Sarah Chen', action: 'added', target: 'Patent Infringement Portfolio — Risk Assessment', time: '5 days ago', icon: 'add' },
            ].map((a, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '2px', padding: '14px 20px', border: '1px solid #D5D8DC', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: a.icon === 'share' ? 'rgba(0,105,151,0.08)' : a.icon === 'comment' ? 'rgba(232,23,31,0.08)' : a.icon === 'predict' ? 'rgba(7,135,74,0.08)' : 'rgba(184,110,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.icon === 'share' ? '#006997' : a.icon === 'comment' ? '#E8171F' : a.icon === 'predict' ? '#07874A' : '#B86E00'} strokeWidth="2">
                    {a.icon === 'share' && <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></>}
                    {a.icon === 'comment' && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />}
                    {a.icon === 'predict' && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                    {a.icon === 'export' && <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>}
                    {a.icon === 'view' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                    {a.icon === 'add' && <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></>}
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', color: '#212529', margin: 0 }}>
                    <strong>{a.who}</strong> {a.action} <span style={{ color: '#006997' }}>{a.target}</span>
                  </p>
                </div>
                <span style={{ fontSize: '11px', color: '#AAAAAA', flexShrink: 0 }}>{a.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
