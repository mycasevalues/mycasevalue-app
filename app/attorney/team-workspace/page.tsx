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
];

const DEMO_REPORTS: SharedReport[] = [
  { title: 'Employment Discrimination — CA District Analysis', type: 'Venue Analysis', sharedBy: 'Sarah Chen', date: '2026-04-03', comments: 3 },
  { title: 'Jones v. Acme — Outcome Prediction', type: 'Case Prediction', sharedBy: 'You', date: '2026-04-02', comments: 1 },
  { title: 'Q1 Case Portfolio Review', type: 'Bulk Analysis', sharedBy: 'Michael Torres', date: '2026-03-28', comments: 5 },
  { title: 'Hon. Gee — Judge Intelligence Report', type: 'Judge Intel', sharedBy: 'Lisa Park', date: '2026-03-25', comments: 2 },
];

const roleColors: Record<string, string> = {
  Admin: '#3D72FF',
  Partner: '#07CA6B',
  Associate: '#1856FF',
  Paralegal: '#E89558',
};

export default function TeamWorkspacePage() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [tab, setTab] = useState<'reports' | 'team'>('reports');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EDEEEE', fontFamily: 'var(--font-body)' }}>
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #D5D8DC', padding: '32px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: '#006997', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Attorney Mode
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'rgba(0,105,151,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#212529', margin: 0 }}>Team Workspace</h1>
              <p style={{ fontSize: '14px', color: '#666666', margin: '4px 0 0 0' }}>Collaborate with colleagues — share reports, annotations, and insights</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.10)', padding: '3px', width: 'fit-content', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
          {(['reports', 'team'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', backgroundColor: tab === t ? '#1856FF' : 'transparent', color: tab === t ? '#FFFFFF' : 'rgba(240,242,245,0.40)', textTransform: 'capitalize' as const }}>
              {t === 'reports' ? 'Shared Reports' : 'Team Members'}
            </button>
          ))}
        </div>

        {tab === 'reports' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DEMO_REPORTS.map((r, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '10px', padding: '18px 22px', border: '1px solid rgba(255,255,255,0.10)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#F0F2F5', margin: '0 0 4px' }}>{r.title}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(240,242,245,0.40)', margin: 0 }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(24,86,255,0.12)', color: '#3D72FF', fontSize: '11px', fontWeight: 600, marginRight: '8px' }}>{r.type}</span>
                    Shared by {r.sharedBy} · {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(240,242,245,0.40)', fontSize: '13px' }}>
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
            <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.10)', marginBottom: '24px' }}>
              <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#F0F2F5', margin: '0 0 12px' }}>Invite Team Member</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@firm.com" style={{ flex: 1, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '8px', fontSize: '14px', fontFamily: 'var(--font-body)', backgroundColor: 'rgba(255,255,255,0.06)', color: '#F0F2F5' }} />
                <button onClick={() => { setInviteEmail(''); }} style={{ padding: '10px 20px', backgroundColor: '#1856FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Invite</button>
              </div>
            </div>

            {/* Members */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {DEMO_TEAM.map((m, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '10px', padding: '16px 20px', border: '1px solid rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(24,86,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#3D72FF', flexShrink: 0 }}>{m.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#F0F2F5', margin: '0 0 2px' }}>{m.name}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(240,242,245,0.40)', margin: 0 }}>{m.email}</p>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', backgroundColor: `${roleColors[m.role]}15`, color: roleColors[m.role] }}>{m.role}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(240,242,245,0.30)' }}>{m.lastActive}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
