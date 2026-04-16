'use client';

import { useRef, useState } from 'react';
import { SITS } from '../lib/data';
import { REAL_DATA } from '../lib/realdata';

const FEDERAL_DISTRICTS = [
  'District of Delaware',
  'Central District of California',
  'Southern District of New York',
  'Northern District of California',
  'Southern District of Texas',
  'Eastern District of Texas',
  'Northern District of Illinois',
  'Eastern District of Michigan',
  'District of Massachusetts',
  'District of New Jersey',
];

interface TimelineInput {
  caseType: string;
  district: string;
  filingDate: string;
}

interface Milestone {
  name: string;
  date: string;
  daysFromFiling: number;
  isUpcoming: boolean;
}

export default function CaseTimelineGenerator() {
  const [input, setInput] = useState<TimelineInput>({
    caseType: '',
    district: FEDERAL_DISTRICTS[0],
    filingDate: new Date().toISOString().split('T')[0],
  });

  const [timeline, setTimeline] = useState<Milestone[] | null>(null);
  const [error, setError] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allCaseTypes = SITS.flatMap((cat) =>
    cat.opts.map((opt) => ({
      label: opt.label,
      nos: opt.nos,
      category: cat.label,
    }))
  ).sort((a, b) => a.label.localeCompare(b.label));

  const generateTimeline = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.caseType || !input.filingDate) {
      setError('Please select a case type and filing date');
      return;
    }

    setError('');

    const caseData = REAL_DATA[input.caseType];
    if (!caseData) {
      setError('Case type data not found');
      return;
    }

    const medianMonths = caseData.mo || 12;
    const filingDateObj = new Date(input.filingDate);
    const now = new Date();

    const calculateDate = (daysFromFiling: number): Date => {
      const date = new Date(filingDateObj);
      date.setDate(date.getDate() + daysFromFiling);
      return date;
    };

    const milestones: Milestone[] = [
      { name: 'Case Filed', daysFromFiling: 0, date: '', isUpcoming: false },
      { name: 'Answer Deadline', daysFromFiling: 21, date: '', isUpcoming: false },
      { name: 'Rule 26(f) Conference', daysFromFiling: 45, date: '', isUpcoming: false },
      { name: 'Initial Disclosures', daysFromFiling: 59, date: '', isUpcoming: false },
      { name: 'Scheduling Order', daysFromFiling: 90, date: '', isUpcoming: false },
      { name: 'Close of Discovery', daysFromFiling: Math.round(medianMonths * 0.6 * 30.44), date: '', isUpcoming: false },
      { name: 'Dispositive Motion Deadline', daysFromFiling: Math.round((medianMonths * 0.6 + 2) * 30.44), date: '', isUpcoming: false },
      { name: 'Trial Date', daysFromFiling: Math.round(medianMonths * 30.44), date: '', isUpcoming: false },
    ];

    milestones.forEach((m) => {
      const mDate = calculateDate(m.daysFromFiling);
      m.date = mDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      m.isUpcoming = mDate > now;
    });

    setTimeline(milestones);
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    marginBottom: '6px',
    fontFamily: 'var(--font-body)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--border-default)',
    borderRadius: '12px',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-surface-0)',
    fontFamily: 'var(--font-body)',
    boxSizing: 'border-box' as const,
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    backgroundColor: input.caseType && input.filingDate ? 'var(--accent-primary)' : 'var(--border-default)',
    color: 'var(--color-surface-0)',
    border: 'none',
    borderRadius: '20px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    cursor: input.caseType && input.filingDate ? 'pointer' : 'not-allowed',
    transition: 'background-color 0.2s',
  };

  const containerWidth = containerRef.current?.offsetWidth || 800;
  const svgHeight = 120;
  const markerSpacing = containerWidth / (timeline?.length || 8);

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <style>{`
        @media print {
          body {
            background: white;
          }
          .no-print {
            display: none;
          }
          .print-only {
            display: block;
          }
        }
      `}</style>

      <div style={{ background: 'var(--accent-primary)', borderBottom: '1px solid var(--border-default)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: 'var(--color-surface-0)', fontFamily: 'var(--font-display)', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Case Timeline Generator
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.4, fontFamily: 'var(--font-body)' }}>
            Generate expected federal case timelines based on historical data
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: timeline ? '350px 1fr' : '1fr', gap: '40px', alignItems: 'start' }}>
          {/* Input Section */}
          <div className="no-print" style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', height: 'fit-content' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
              Case Information
            </h2>

            <form onSubmit={generateTimeline} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={labelStyle}>Case Type</label>
                <select
                  value={input.caseType}
                  onChange={(e) => {
                    setInput({ ...input, caseType: e.target.value });
                    setError('');
                  }}
                  style={inputStyle}
                >
                  <option value="">Select case type...</option>
                  {allCaseTypes.map((ct) => (
                    <option key={ct.nos + ct.label} value={ct.nos}>
                      {ct.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Federal District</label>
                <select
                  value={input.district}
                  onChange={(e) => setInput({ ...input, district: e.target.value })}
                  style={inputStyle}
                >
                  {FEDERAL_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Filing Date</label>
                <input
                  type="date"
                  value={input.filingDate}
                  onChange={(e) => {
                    setInput({ ...input, filingDate: e.target.value });
                    setError('');
                  }}
                  style={inputStyle}
                />
              </div>

              {error && (
                <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid var(--border-default)' }}>
                  <p style={{ fontSize: '13px', color: '#CC1019', margin: 0, fontFamily: 'var(--font-body)' }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!input.caseType || !input.filingDate}
                style={buttonStyle}
              >
                Generate Timeline
              </button>
            </form>
          </div>

          {/* Timeline Visualization */}
          {timeline && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* SVG Timeline */}
              <div ref={containerRef} style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '40px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <svg
                  ref={svgRef}
                  width="100%"
                  height={svgHeight}
                  style={{ overflow: 'visible', minHeight: '180px' }}
                  viewBox={`0 0 ${containerWidth} ${svgHeight}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <line x1="40" y1="60" x2={containerWidth - 40} y2="60" stroke="var(--border-default)" strokeWidth="2" />

                  {timeline.map((m, idx) => {
                    const x = 40 + (idx * (containerWidth - 80)) / (timeline.length - 1);
                    const isAbove = idx % 2 === 0;
                    const textY = isAbove ? 30 : 90;

                    return (
                      <g key={m.name}>
                        <line x1={x} y1="50" x2={x} y2="70" stroke={m.isUpcoming ? 'var(--accent-primary)' : 'var(--color-text-muted)'} strokeWidth="2" />
                        <circle cx={x} cy="60" r="6" fill={m.isUpcoming ? 'var(--accent-primary)' : 'var(--color-text-muted)'} />
                        <text
                          x={x}
                          y={textY}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="600"
                          fill="var(--color-text-primary)"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {m.name}
                        </text>
                        <text
                          x={x}
                          y={textY + 14}
                          textAnchor="middle"
                          fontSize="10"
                          fill="var(--color-text-secondary)"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {m.date}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Milestones List */}
              <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
                  Timeline Milestones
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {timeline.map((m) => (
                    <div key={m.name} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                      backgroundColor: m.isUpcoming ? '#F0F9FF' : 'var(--color-surface-1)',
                      borderRadius: '12px',
                      borderLeft: `4px solid ${m.isUpcoming ? 'var(--accent-primary)' : 'var(--color-text-muted)'}`,
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                          {m.name}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
                          {m.date} ({Math.round(m.daysFromFiling / 30.44)} months)
                        </p>
                      </div>
                      {!m.isUpcoming && (
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-body)' }}>
                          Past
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer & Export */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'rgba(234,179,8,0.1)', padding: '16px', borderRadius: '12px', border: '1px solid #FCD34D' }}>
                  <p style={{ fontSize: '13px', color: '#fbbf24', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                    Statistical averages based on historical case data from 5.1M+ federal court cases. Actual deadlines are set by the court's scheduling order and may vary.
                  </p>
                </div>

                <button
                  onClick={handleDownloadPdf}
                  className="no-print"
                  style={{
                    padding: '14px',
                    backgroundColor: 'var(--accent-primary-hover)',
                    color: 'var(--color-surface-0)',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '15px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                >
                  Download as PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
