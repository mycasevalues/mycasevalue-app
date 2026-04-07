'use client';

import { useState } from 'react';
import Link from 'next/link';

type DeadlineItem = {
  id: string;
  event: string;
  daysAfterFiling: number;
  calculatedDate: string;
  note: string;
  category: 'critical' | 'important' | 'planning';
};

const FRCP_DEFAULTS = [
  { id: 'answer', event: 'Answer/Response Due', daysAfterFiling: 21, note: 'Defendant must respond to complaint (FRCP 12(a))' },
  { id: 'discovery-conf', event: 'Discovery Conference (Rule 26(f))', daysAfterFiling: 49, note: 'Parties must meet and confer about discovery plan' },
  { id: 'discovery-close', event: 'Discovery Cutoff', daysAfterFiling: 180, note: 'Default discovery deadline (6 months from filing)' },
  { id: 'expert-disc', event: 'Expert Disclosures', daysAfterFiling: 270, note: 'Expert reports due 90 days before trial' },
  { id: 'pretrial-conf', event: 'Pretrial Conference', daysAfterFiling: 330, note: 'Final case conference before trial' },
  { id: 'trial-date', event: 'Trial Date', daysAfterFiling: 365, note: 'Approximately 1 year from filing' },
];

const eventCategories = {
  critical: { bg: 'rgba(204,16,25,0.12)', text: '#DC2626', dot: '#DC2626', label: 'Critical' },
  important: { bg: 'rgba(184,110,0,0.12)', text: '#B86E00', dot: '#B86E00', label: 'Important' },
  planning: { bg: 'rgba(7,135,74,0.12)', text: '#059669', dot: '#059669', label: 'Planning' },
};

export default function DeadlineCalculatorPage() {
  const [caseFiledDate, setCaseFiledDate] = useState('');
  const [customEvents, setCustomEvents] = useState<DeadlineItem[]>([]);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDays, setNewEventDays] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<'critical' | 'important' | 'planning'>('important');
  const [newEventNote, setNewEventNote] = useState('');

  const calculateDeadline = (baseDate: string, daysOffset: number): string => {
    if (!baseDate) return '';
    const date = new Date(baseDate);
    date.setDate(date.getDate() + daysOffset);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const allDeadlines: DeadlineItem[] = [
    ...FRCP_DEFAULTS.map((d) => ({
      ...d,
      calculatedDate: calculateDeadline(caseFiledDate, d.daysAfterFiling),
      category: (d.id === 'answer' ? 'critical' : d.id === 'discovery-close' ? 'critical' : d.id === 'pretrial-conf' ? 'critical' : d.id === 'expert-disc' ? 'important' : 'planning') as 'critical' | 'important' | 'planning',
    })),
    ...customEvents.map((e) => ({
      ...e,
      calculatedDate: calculateDeadline(caseFiledDate, parseInt(e.daysAfterFiling.toString()) || 0),
    })),
  ].sort((a, b) => a.daysAfterFiling - b.daysAfterFiling);

  const handleAddCustomEvent = () => {
    if (!newEventName.trim() || !newEventDays) return;

    const newEvent: DeadlineItem = {
      id: `custom-${Date.now()}`,
      event: newEventName,
      daysAfterFiling: parseInt(newEventDays),
      calculatedDate: calculateDeadline(caseFiledDate, parseInt(newEventDays)),
      note: newEventNote,
      category: newEventCategory,
    };

    setCustomEvents([...customEvents, newEvent]);
    setNewEventName('');
    setNewEventDays('');
    setNewEventCategory('important');
    setNewEventNote('');
  };

  const handleRemoveEvent = (id: string) => {
    setCustomEvents(customEvents.filter((e) => e.id !== id));
  };

  const generateICS = () => {
    if (!caseFiledDate) return;

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MyCaseValue//Litigation Deadline Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Litigation Deadlines',
      'X-WR-TIMEZONE:America/New_York',
    ];

    allDeadlines.forEach((deadline) => {
      if (deadline.calculatedDate) {
        const date = new Date(deadline.calculatedDate);
        const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

        const categoryLabel = eventCategories[deadline.category].label;
        const priority = deadline.category === 'critical' ? '1' : deadline.category === 'important' ? '5' : '7';

        lines.push(
          'BEGIN:VEVENT',
          `UID:deadline-${deadline.id}@mycasevalue.com`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          `DTSTART;VALUE=DATE:${dateStr}`,
          `SUMMARY:[${categoryLabel}] ${deadline.event}`,
          `DESCRIPTION:${deadline.note}`,
          `PRIORITY:${priority}`,
          `CATEGORIES:${categoryLabel}`,
          'END:VEVENT'
        );
      }
    });

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  };

  const handleDownloadCalendar = () => {
    const icsContent = generateICS();
    if (!icsContent) return;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `litigation-deadlines-${new Date().toISOString().split('T')[0]}.ics`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getDaysUntil = (dateStr: string): number => {
    if (!dateStr) return 0;
    const deadline = new Date(dateStr);
    const today = new Date();
    return Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#0f0f0f',
    marginBottom: '6px',
    fontFamily: 'var(--font-body)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    height: 'auto',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#0f0f0f',
    backgroundColor: '#FFFFFF',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <style>{`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        input:focus, select:focus { border-color: #0966C3 !important; outline: none; box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08); }
        @media (max-width: 640px) { h1 { font-size: clamp(28px, 5vw, 40px); } }
      `}</style>

      {/* Header */}
      <div style={{ background: '#1C3A5E', borderBottom: '1px solid #E5E7EB', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: '#0966C3', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Attorney Tools
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
                Litigation Deadline Calculator
              </h1>
            </div>
          </div>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: '8px 0 0 52px' }}>
            Calculate all critical civil litigation deadlines using Federal Rules of Civil Procedure defaults
          </p>
          <div style={{ marginTop: '12px', display: 'inline-block', background: 'rgba(10, 102, 194, 0.1)', padding: '6px 12px', borderRadius: '12px', border: '1px solid rgba(10, 102, 194, 0.3)' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#0966C3', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Free during public beta
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Input Section */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }} className="grid-responsive">
            <style>{`.grid-responsive { grid-template-columns: 1fr !important; } @media (min-width: 640px) { .grid-responsive { grid-template-columns: 1fr 1fr !important; } } @media (min-width: 1024px) { .grid-responsive { grid-template-columns: 1fr 1fr 1fr !important; } }`}</style>
            <div>
              <label style={labelStyle}>Case Filed Date</label>
              <input
                type="date"
                value={caseFiledDate}
                onChange={(e) => setCaseFiledDate(e.target.value)}
                style={inputStyle}
              />
            </div>
            {caseFiledDate && (
              <div>
                <label style={labelStyle}>Case Filed</label>
                <div style={{ padding: '12px 14px', height: '42px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#0f0f0f', fontWeight: 500, background: '#F3F4F6', borderRadius: '12px' }}>
                  {new Date(caseFiledDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>Add Custom Deadline</h3>
            <button
              onClick={handleDownloadCalendar}
              disabled={allDeadlines.length === 0 || !caseFiledDate}
              style={{
                padding: '8px 16px',
                backgroundColor: caseFiledDate ? '#0966C3' : '#D1D5DB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: caseFiledDate ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Export to Calendar
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '12px', marginTop: '16px' }} className="custom-grid">
            <style>{`.custom-grid { grid-template-columns: 1fr !important; } @media (min-width: 768px) { .custom-grid { grid-template-columns: 2fr 1fr 1fr 1fr auto !important; } }`}</style>
            <input
              type="text"
              placeholder="Event name..."
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Days after filing"
              value={newEventDays}
              onChange={(e) => setNewEventDays(e.target.value)}
              style={inputStyle}
            />
            <select
              value={newEventCategory}
              onChange={(e) => setNewEventCategory(e.target.value as 'critical' | 'important' | 'planning')}
              style={inputStyle}
            >
              <option value="critical">Critical</option>
              <option value="important">Important</option>
              <option value="planning">Planning</option>
            </select>
            <input
              type="text"
              placeholder="Note..."
              value={newEventNote}
              onChange={(e) => setNewEventNote(e.target.value)}
              style={inputStyle}
            />
            <button
              onClick={handleAddCustomEvent}
              disabled={!newEventName.trim() || !newEventDays}
              style={{
                padding: '12px 20px',
                height: '42px',
                backgroundColor: newEventName.trim() && newEventDays ? '#0966C3' : '#D1D5DB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: newEventName.trim() && newEventDays ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap' as const,
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Timeline View */}
        {caseFiledDate && (
          <>
            {/* Summary Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Total Deadlines', value: String(allDeadlines.length), icon: '📋' },
                { label: 'Critical', value: String(allDeadlines.filter(d => d.category === 'critical').length), icon: '🔴' },
                { label: 'Days to First Deadline', value: getDaysUntil(allDeadlines[0]?.calculatedDate) > 0 ? String(getDaysUntil(allDeadlines[0]?.calculatedDate)) : 'Past due', icon: '⏱️' },
              ].map((stat, i) => (
                <div key={i} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Deadlines List */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>All Deadlines</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {Object.entries(eventCategories).map(([key, config]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: config.dot }} />
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>{config.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {allDeadlines.map((deadline, idx) => {
                  const daysLeft = getDaysUntil(deadline.calculatedDate);
                  const isUpcoming = daysLeft > 0 && daysLeft <= 30;
                  const isPastDue = daysLeft < 0;
                  const config = eventCategories[deadline.category];

                  return (
                    <div
                      key={deadline.id}
                      style={{
                        padding: '16px 24px',
                        borderBottom: idx < allDeadlines.length - 1 ? '1px solid #E5E7EB' : 'none',
                        background: isUpcoming ? 'rgba(254, 243, 199, 0.4)' : isPastDue ? 'rgba(254, 226, 226, 0.4)' : '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderLeft: `4px solid ${config.dot}`,
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>
                            {deadline.event}
                          </h3>
                          {deadline.id.startsWith('custom-') && (
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0966C3', background: 'rgba(10, 102, 194, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                              Custom
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 6px' }}>
                          {deadline.note}
                        </p>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#4B5563' }}>
                          <span>{deadline.daysAfterFiling} days after filing</span>
                          {isPastDue && (
                            <span style={{ color: '#DC2626', fontWeight: 600 }}>Past due by {Math.abs(daysLeft)} days</span>
                          )}
                          {isUpcoming && (
                            <span style={{ color: '#B86E00', fontWeight: 600 }}>Due in {daysLeft} days</span>
                          )}
                          {!isPastDue && !isUpcoming && daysLeft > 0 && (
                            <span style={{ color: '#059669' }}>Due in {daysLeft} days</span>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f' }}>
                          {deadline.calculatedDate}
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', backgroundColor: config.bg, color: config.text, textTransform: 'uppercase' as const }}>
                          {config.label}
                        </span>
                        {deadline.id.startsWith('custom-') && (
                          <button
                            onClick={() => handleRemoveEvent(deadline.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#D1D5DB',
                              cursor: 'pointer',
                              fontSize: '16px',
                              padding: '4px',
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FRCP Reference */}
            <div style={{ marginTop: '40px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px' }}>
                Federal Rules of Civil Procedure Reference
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {[
                  { rule: 'FRCP 12(a)', title: 'Time to Serve', content: 'Defendant has 21 days to respond to summons and complaint (or 60 days if served outside U.S.)' },
                  { rule: 'FRCP 26(f)', title: 'Discovery Conference', content: 'Parties must meet within 35 days of service of summons (or per court order)' },
                  { rule: 'FRCP 26(d)', title: 'Discovery Limits', content: 'Discovery generally closes 6 months after Rule 26(f) conference (extensible by agreement/order)' },
                  { rule: 'FRCP 26(a)(2)', title: 'Expert Disclosure', content: 'Experts must be disclosed at least 90 days before trial (or per court order)' },
                  { rule: 'FRCP 50', title: 'Motion for Judgment', content: 'Motion for judgment as a matter of law may be filed before or during trial' },
                  { rule: 'FRCP 65', title: 'Temporary Relief', content: 'Preliminary injunctions and restraining orders governed by specific timing rules' },
                ].map((ref, i) => (
                  <div key={i} style={{ padding: '16px', background: '#F9FAFB', borderRadius: '20px', border: '1px solid #E5E7EB' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#0966C3', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {ref.rule}
                    </h3>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 6px' }}>
                      {ref.title}
                    </p>
                    <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                      {ref.content}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '20px', padding: '14px', background: '#F3F4F6', borderRadius: '20px', borderLeft: '4px solid #0966C3' }}>
                <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: 1.5 }}>
                  <strong>Disclaimer:</strong> These are default Federal Rules of Civil Procedure deadlines. Individual judges may modify deadlines through scheduling orders, and state courts have different rules. Always check the scheduling order entered in your case and local rules of court. Missing a deadline can result in sanctions, dismissal, or default judgment.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
