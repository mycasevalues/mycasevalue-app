'use client';

import { useState } from 'react';
import Link from 'next/link';
import SaveToTeamButton from './SaveToTeamButton';

// Mock data types
type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Partner' | 'Associate' | 'Paralegal';
  avatar: string;
  lastActive: string;
};

type SharedReport = {
  id: string;
  title: string;
  type: 'Venue Analysis' | 'Case Prediction' | 'Bulk Analysis' | 'Judge Intel' | 'Counsel Analysis' | 'Data Report';
  sharedBy: string;
  date: string;
  note: string;
};

type SharedNote = {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  attachedTo: string; // NOS code or district name
  attachedType: 'nos' | 'district';
};

type Case = {
  id: string;
  name: string;
  type: string;
  district: string;
  status: 'Researching' | 'Active' | 'Settled' | 'Closed';
  notes: string;
  relatedNOS?: string;
};

type ActivityItem = {
  id: string;
  who: string;
  action: string;
  target: string;
  time: string;
  icon: 'share' | 'comment' | 'predict' | 'export' | 'view' | 'add' | 'note';
};

// Mock data
const DEMO_TEAM: TeamMember[] = [
  { id: '1', name: 'You', email: 'you@firm.com', role: 'Admin', avatar: 'Y', lastActive: 'Now' },
  { id: '2', name: 'Sarah Chen', email: 'schen@firm.com', role: 'Partner', avatar: 'SC', lastActive: '2 hours ago' },
  { id: '3', name: 'Michael Torres', email: 'mtorres@firm.com', role: 'Associate', avatar: 'MT', lastActive: '1 day ago' },
];

const DEMO_REPORTS: SharedReport[] = [
  {
    id: '1',
    title: 'Employment Discrimination — CA District Analysis',
    type: 'Venue Analysis',
    sharedBy: 'Sarah Chen',
    date: '2026-04-03',
    note: 'Excellent win rates in Northern District',
  },
  {
    id: '2',
    title: 'Jones v. Acme — Outcome Prediction',
    type: 'Case Prediction',
    sharedBy: 'You',
    date: '2026-04-02',
    note: '72% settlement likelihood based on comparable cases',
  },
  {
    id: '3',
    title: 'Q1 Case Portfolio Review',
    type: 'Bulk Analysis',
    sharedBy: 'Michael Torres',
    date: '2026-03-28',
    note: 'Strong portfolio performance across all practice areas',
  },
  {
    id: '4',
    title: 'Hon. Gee — Judge Intelligence Report',
    type: 'Judge Intel',
    sharedBy: 'Sarah Chen',
    date: '2026-03-25',
    note: 'Favorable to plaintiff discovery motions',
  },
];

const DEMO_NOTES: SharedNote[] = [
  {
    id: '1',
    text: 'NOS 442 has been showing improved settlement rates in the last 6 months. Consider prioritizing these cases.',
    author: 'Sarah Chen',
    timestamp: '2026-04-04T14:30:00',
    attachedTo: 'NOS 442',
    attachedType: 'nos',
  },
  {
    id: '2',
    text: 'N.D. California judges tend to be more favorable to plaintiff summary judgment motions. Prepare discovery carefully.',
    author: 'Michael Torres',
    timestamp: '2026-04-03T09:15:00',
    attachedTo: 'N.D. California',
    attachedType: 'district',
  },
  {
    id: '3',
    text: 'Product liability verdicts in this district average 15% higher than national median. Risk management is critical.',
    author: 'You',
    timestamp: '2026-04-02T16:45:00',
    attachedTo: 'NOS 365',
    attachedType: 'nos',
  },
];

const DEMO_CASES: Case[] = [
  {
    id: '1',
    name: 'Jones v. Acme Corp',
    type: 'Product Liability',
    district: 'N.D. California',
    status: 'Active',
    notes: 'Settlement negotiations ongoing',
    relatedNOS: '365',
  },
  {
    id: '2',
    name: 'Martinez v. Tech Inc.',
    type: 'Employment Discrimination',
    district: 'C.D. California',
    status: 'Researching',
    notes: 'Awaiting discovery responses',
    relatedNOS: '442',
  },
  {
    id: '3',
    name: 'Williams Settlement',
    type: 'Medical Malpractice',
    district: 'S.D. New York',
    status: 'Settled',
    notes: 'Settlement finalized March 2026',
    relatedNOS: '367',
  },
  {
    id: '4',
    name: 'Anderson v. State',
    type: 'Employment Discrimination',
    district: 'E.D. Texas',
    status: 'Closed',
    notes: 'Judgment rendered January 2026',
    relatedNOS: '442',
  },
];

const DEMO_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    who: 'Sarah Chen',
    action: 'shared',
    target: 'Employment Discrimination — CA District Analysis',
    time: '1 hour ago',
    icon: 'share',
  },
  {
    id: '2',
    who: 'You',
    action: 'added note to',
    target: 'NOS 365 Product Liability Cases',
    time: '2 hours ago',
    icon: 'note',
  },
  {
    id: '3',
    who: 'Michael Torres',
    action: 'commented on',
    target: 'Jones v. Acme — Outcome Prediction',
    time: '3 hours ago',
    icon: 'comment',
  },
  {
    id: '4',
    who: 'Sarah Chen',
    action: 'ran',
    target: 'Case Predictor for NOS 442',
    time: '5 hours ago',
    icon: 'predict',
  },
  {
    id: '5',
    who: 'You',
    action: 'exported',
    target: 'Q1 Case Portfolio Review as PDF',
    time: '1 day ago',
    icon: 'export',
  },
  {
    id: '6',
    who: 'Michael Torres',
    action: 'viewed',
    target: 'Hon. Gee — Judge Intelligence Report',
    time: '1 day ago',
    icon: 'view',
  },
  {
    id: '7',
    who: 'Sarah Chen',
    action: 'added',
    target: 'Martinez v. Tech Inc. to Case List',
    time: '2 days ago',
    icon: 'add',
  },
  {
    id: '8',
    who: 'You',
    action: 'added note to',
    target: 'N.D. California District',
    time: '3 days ago',
    icon: 'note',
  },
];

const roleColors: Record<string, string> = {
  Admin: '#3D8FB5',
  Partner: '#059669',
  Associate: 'var(--accent-primary-hover)',
  Paralegal: '#B86E00',
};

const statusColors: Record<string, string> = {
  Researching: 'var(--accent-primary)',
  Active: '#059669',
  Settled: '#B86E00',
  Closed: '#6B7280',
};

export default function TeamWorkspace() {
  const [activeTab, setActiveTab] = useState<'reports' | 'notes' | 'cases' | 'activity'>('reports');
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteSuccess, setShowInviteSuccess] = useState(false);
  const [newNoteNOS, setNewNoteNOS] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [newCaseName, setNewCaseName] = useState('');
  const [newCaseType, setNewCaseType] = useState('');
  const [newCaseDistrict, setNewCaseDistrict] = useState('');
  const [newCaseStatus, setNewCaseStatus] = useState<'Researching' | 'Active' | 'Settled' | 'Closed'>('Researching');
  const [localNotes, setLocalNotes] = useState<SharedNote[]>(DEMO_NOTES);
  const [localCases, setLocalCases] = useState<Case[]>(DEMO_CASES);

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      // TODO: Supabase integration - send invite to email
      setInviteEmail('');
      setShowInviteSuccess(true);
      setTimeout(() => setShowInviteSuccess(false), 3000);
    }
  };

  const handleAddNote = () => {
    if (newNoteText.trim() && newNoteNOS.trim()) {
      const newNote: SharedNote = {
        id: String(localNotes.length + 1),
        text: newNoteText,
        author: 'You',
        timestamp: new Date().toISOString(),
        attachedTo: newNoteNOS,
        attachedType: 'nos',
      };
      setLocalNotes([newNote, ...localNotes]);
      setNewNoteText('');
      setNewNoteNOS('');
      // TODO: Supabase integration - save note
    }
  };

  const handleAddCase = () => {
    if (newCaseName.trim() && newCaseType && newCaseDistrict) {
      const newCase: Case = {
        id: String(localCases.length + 1),
        name: newCaseName,
        type: newCaseType,
        district: newCaseDistrict,
        status: newCaseStatus,
        notes: '',
      };
      setLocalCases([newCase, ...localCases]);
      setNewCaseName('');
      setNewCaseType('');
      setNewCaseDistrict('');
      setNewCaseStatus('Researching');
      // TODO: Supabase integration - save case
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      <style>{`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        input:focus, textarea:focus { border-color: var(--accent-primary) !important; outline: none; box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08); }
        select:focus { border-color: var(--accent-primary) !important; outline: none; box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08); }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
      `}</style>

      {/* Header */}
      <div style={{ background: 'var(--accent-primary)', borderBottom: '1px solid var(--border-default)', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link
            href="/attorney"
            style={{
              fontSize: '13px',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: '16px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Home &gt; Attorney Tools &gt; Team Workspace
          </Link>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '6px',
                  background: 'rgba(10, 102, 194, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h1
                  className="font-display"
                  style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-text-inverse)', margin: 0 }}
                >
                  Team Workspace
                </h1>
              </div>
            </div>
            <div
              style={{
                background: 'rgba(10, 102, 194, 0.15)',
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid var(--accent-primary)',
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Collaboration
              </span>
            </div>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-muted)',
              margin: '4px 0 0 52px',
            }}
          >
            Collaborate with colleagues — share reports, annotations, and case insights
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '24px',
            background: 'var(--color-surface-1)',
            borderRadius: '6px',
            border: '1px solid var(--border-default)',
            padding: '3px',
            width: 'fit-content',
            flexWrap: 'wrap',
          }}
        >
          {(['reports', 'notes', 'cases', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: activeTab === tab ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === tab ? 'var(--color-surface-0)' : 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'all 0.2s ease',
              }}
            >
              {tab === 'reports'
                ? 'Shared Reports'
                : tab === 'notes'
                ? 'Shared Notes'
                : tab === 'cases'
                ? 'Case List'
                : 'Activity Feed'}
            </button>
          ))}
        </div>

        {/* Shared Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            {DEMO_REPORTS.length === 0 ? (
              <div
                style={{
                  background: 'var(--color-surface-0)',
                  borderRadius: '6px',
                  padding: '40px',
                  border: '1px solid var(--border-default)',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>No shared reports yet</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {DEMO_REPORTS.map((report) => (
                  <div
                    key={report.id}
                    style={{
                      background: 'var(--color-surface-0)',
                      borderRadius: '6px',
                      padding: '16px',
                      border: '1px solid var(--border-default)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                      {report.title}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(10, 102, 194, 0.12)',
                          color: 'var(--accent-primary)',
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        {report.type}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
                      Shared by {report.sharedBy} · {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    {report.note && (
                      <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', margin: '8px 0 0', fontStyle: 'italic' }}>
                        {report.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Shared Notes Tab */}
        {activeTab === 'notes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Add Note Form */}
            <div
              style={{
                background: 'var(--color-surface-0)',
                borderRadius: '6px',
                padding: '20px',
                border: '1px solid var(--border-default)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <h3
                className="font-display"
                style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 14px' }}
              >
                Add Note
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Attach to NOS Code or District
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., NOS 442 or N.D. California"
                    value={newNoteNOS}
                    onChange={(e) => setNewNoteNOS(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border-default)',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                      backgroundColor: 'var(--color-surface-0)',
                      color: 'var(--color-text-primary)',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Note
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border-default)',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                      backgroundColor: 'var(--color-surface-0)',
                      color: 'var(--color-text-primary)',
                      minHeight: '100px',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <button
                  onClick={handleAddNote}
                  disabled={!newNoteText.trim() || !newNoteNOS.trim()}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: newNoteText.trim() && newNoteNOS.trim() ? 'var(--accent-primary)' : 'var(--bdr, #E2DFD8)',
                    color: 'var(--color-text-inverse)',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: newNoteText.trim() && newNoteNOS.trim() ? 'pointer' : 'not-allowed',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    alignSelf: 'flex-start',
                  }}
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Notes List */}
            {localNotes.length === 0 ? (
              <div
                style={{
                  background: 'var(--color-surface-0)',
                  borderRadius: '6px',
                  padding: '40px',
                  border: '1px solid var(--border-default)',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>No shared notes yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {localNotes.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      background: 'var(--color-surface-0)',
                      borderRadius: '6px',
                      padding: '16px',
                      border: '1px solid var(--border-default)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div style={{ marginBottom: '10px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(10, 102, 194, 0.12)',
                          color: 'var(--accent-primary)',
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        {note.attachedTo}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-primary)', margin: '0 0 8px', lineHeight: '1.5' }}>
                      {note.text}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>
                      By {note.author} • {new Date(note.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Case List Tab */}
        {activeTab === 'cases' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Add Case Form */}
            <div
              style={{
                background: 'var(--color-surface-0)',
                borderRadius: '6px',
                padding: '20px',
                border: '1px solid var(--border-default)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <h3
                className="font-display"
                style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 14px' }}
              >
                Add Case
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                <div>
                  <label
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Case Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Jones v. Acme Corp"
                    value={newCaseName}
                    onChange={(e) => setNewCaseName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border-default)',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                      backgroundColor: 'var(--color-surface-0)',
                      color: 'var(--color-text-primary)',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Case Type
                  </label>
                  <select
                    value={newCaseType}
                    onChange={(e) => setNewCaseType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border-default)',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                      backgroundColor: 'var(--color-surface-0)',
                      color: 'var(--color-text-primary)',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select type</option>
                    <option value="Product Liability">Product Liability</option>
                    <option value="Employment Discrimination">Employment Discrimination</option>
                    <option value="Medical Malpractice">Medical Malpractice</option>
                    <option value="Contract Dispute">Contract Dispute</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    District
                  </label>
                  <select
                    value={newCaseDistrict}
                    onChange={(e) => setNewCaseDistrict(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border-default)',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                      backgroundColor: 'var(--color-surface-0)',
                      color: 'var(--color-text-primary)',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select district</option>
                    <option value="N.D. California">N.D. California</option>
                    <option value="C.D. California">C.D. California</option>
                    <option value="S.D. New York">S.D. New York</option>
                    <option value="E.D. Texas">E.D. Texas</option>
                    <option value="N.D. Illinois">N.D. Illinois</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={newCaseStatus}
                    onChange={(e) => setNewCaseStatus(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border-default)',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                      backgroundColor: 'var(--color-surface-0)',
                      color: 'var(--color-text-primary)',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Researching">Researching</option>
                    <option value="Active">Active</option>
                    <option value="Settled">Settled</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleAddCase}
                disabled={!newCaseName.trim() || !newCaseType || !newCaseDistrict}
                style={{
                  marginTop: '12px',
                  padding: '10px 16px',
                  backgroundColor:
                    newCaseName.trim() && newCaseType && newCaseDistrict ? 'var(--accent-primary)' : 'var(--bdr, #E2DFD8)',
                  color: 'var(--color-surface-0)',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: newCaseName.trim() && newCaseType && newCaseDistrict ? 'pointer' : 'not-allowed',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Add Case
              </button>
            </div>

            {/* Cases Table */}
            {localCases.length === 0 ? (
              <div
                style={{
                  background: 'var(--color-surface-0)',
                  borderRadius: '6px',
                  padding: '40px',
                  border: '1px solid var(--border-default)',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>No cases yet</p>
              </div>
            ) : (
              <div
                style={{
                  background: 'var(--color-surface-0)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-default)',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '13px',
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: 'var(--color-surface-1)', borderBottom: '1px solid var(--border-default)' }}>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                          Case Name
                        </th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                          Type
                        </th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                          District
                        </th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                          Status
                        </th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {localCases.map((caseItem, idx) => (
                        <tr
                          key={caseItem.id}
                          style={{
                            backgroundColor: idx % 2 === 0 ? 'var(--color-surface-0)' : 'var(--color-surface-1)',
                            borderBottom: '1px solid var(--border-default)',
                          }}
                        >
                          <td style={{ padding: '12px 16px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                            {caseItem.relatedNOS ? (
                              <Link
                                href={`/nos/${caseItem.relatedNOS}`}
                                style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}
                              >
                                {caseItem.name}
                              </Link>
                            ) : (
                              caseItem.name
                            )}
                          </td>
                          <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>{caseItem.type}</td>
                          <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>{caseItem.district}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '3px 10px',
                                borderRadius: '6px',
                                backgroundColor: `${statusColors[caseItem.status]}15`,
                                color: statusColors[caseItem.status],
                                fontSize: '11px',
                                fontWeight: 600,
                              }}
                            >
                              {caseItem.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>{caseItem.notes || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Activity Feed Tab */}
        {activeTab === 'activity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {DEMO_ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                style={{
                  background: 'var(--color-surface-0)',
                  borderRadius: '6px',
                  padding: '14px 20px',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor:
                      activity.icon === 'share'
                        ? 'rgba(0,105,151,0.08)'
                        : activity.icon === 'comment'
                        ? 'rgba(10, 102, 194, 0.08)'
                        : activity.icon === 'predict'
                        ? 'rgba(21, 128, 61, 0.08)'
                        : activity.icon === 'note'
                        ? 'rgba(180,83,9,0.08)'
                        : 'rgba(184,110,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={
                      activity.icon === 'share'
                        ? 'var(--accent-primary-hover)'
                        : activity.icon === 'comment'
                        ? 'var(--accent-primary)'
                        : activity.icon === 'predict'
                        ? '#059669'
                        : activity.icon === 'note'
                        ? '#B45309'
                        : '#B86E00'
                    }
                    strokeWidth="2"
                  >
                    {activity.icon === 'share' && (
                      <>
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </>
                    )}
                    {activity.icon === 'comment' && (
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    )}
                    {activity.icon === 'predict' && (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </>
                    )}
                    {activity.icon === 'export' && (
                      <>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </>
                    )}
                    {activity.icon === 'view' && (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                    {activity.icon === 'add' && (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </>
                    )}
                    {activity.icon === 'note' && (
                      <>
                        <path d="M12 2L2 7v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7l-10-5z" />
                        <path d="M12 11v6" />
                        <line x1="9" y1="14" x2="15" y2="14" />
                      </>
                    )}
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-primary)', margin: 0 }}>
                    <strong>{activity.who}</strong> {activity.action}{' '}
                    <span style={{ color: 'var(--accent-primary-hover)' }}>{activity.target}</span>
                  </p>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', flexShrink: 0 }}>{activity.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Team Members Sidebar */}
      <div
        style={{
          borderTop: '1px solid var(--border-default)',
          background: 'var(--color-surface-0)',
          padding: '24px 20px',
          marginTop: '40px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3
                className="font-display"
                style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}
              >
                Team Members
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  margin: '4px 0 0',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(10, 102, 194, 0.12)',
                    color: 'var(--accent-primary)',
                    fontSize: '10px',
                    fontWeight: 600,
                    marginTop: '4px',
                  }}
                >
                  Up to 5 members during beta
                </span>
              </p>
            </div>
          </div>

          {/* Invite Section */}
          <div
            style={{
              background: 'var(--color-surface-1)',
              borderRadius: '6px',
              padding: '16px',
              marginBottom: '20px',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@firm.com"
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                backgroundColor: 'var(--color-surface-0)',
                color: 'var(--color-text-primary)',
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={handleInvite}
              disabled={!inviteEmail.trim()}
              style={{
                padding: '10px 16px',
                backgroundColor: inviteEmail.trim() ? 'var(--accent-primary)' : 'var(--bdr, #E2DFD8)',
                color: 'var(--color-text-inverse)',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: inviteEmail.trim() ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
              }}
            >
              Invite
            </button>
          </div>

          {showInviteSuccess && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '4px',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                color: '#34d399',
                fontSize: '13px',
                marginBottom: '16px',
              }}
            >
              Invitation sent successfully
            </div>
          )}

          {/* Team Members Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {DEMO_TEAM.map((member) => (
              <div
                key={member.id}
                style={{
                  background: 'var(--color-surface-1)',
                  borderRadius: '6px',
                  padding: '12px',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(10, 102, 194, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {member.avatar}
                </div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 2px' }}>
                  {member.name}
                </p>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: `${roleColors[member.role]}15`,
                    color: roleColors[member.role],
                    marginBottom: '6px',
                  }}
                >
                  {member.role}
                </span>
                <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', margin: 0 }}>{member.lastActive}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
