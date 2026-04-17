'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Deadline {
  label: string;
  days: number;
  rule: string;
  description: string;
  from: string;
}

const EVENT_TYPES = [
  { value: 'complaint_filed', label: 'Complaint Filed' },
  { value: 'summons_served', label: 'Summons Served on Defendant' },
  { value: 'answer_filed', label: 'Answer Filed' },
  { value: 'removal_filed', label: 'Notice of Removal Filed' },
  { value: 'scheduling_order', label: 'Scheduling Order Entered' },
];

function getDeadlines(eventType: string): Deadline[] {
  switch (eventType) {
    case 'complaint_filed':
      return [
        { label: 'Service of Summons', days: 90, rule: 'FRCP 4(m)', description: 'Deadline to serve defendant with summons and complaint', from: 'complaint filed' },
        { label: 'Answer Due (after service)', days: 111, rule: 'FRCP 12(a)(1)(A)(i)', description: '21 days after service (assuming service on day 21)', from: 'complaint filed' },
        { label: 'Motion to Dismiss Deadline', days: 111, rule: 'FRCP 12(b)', description: 'Must be filed before answer — same deadline', from: 'complaint filed' },
      ];
    case 'summons_served':
      return [
        { label: 'Answer Due', days: 21, rule: 'FRCP 12(a)(1)(A)(i)', description: 'Defendant must answer or file responsive motion within 21 days of service', from: 'service' },
        { label: 'Waiver of Service Return', days: 60, rule: 'FRCP 4(d)(3)', description: 'If waiver requested, defendant has 60 days to return waiver (90 days if foreign)', from: 'service' },
        { label: 'Answer Due (waiver accepted)', days: 60, rule: 'FRCP 12(a)(1)(A)(ii)', description: '60 days to answer if defendant waived formal service', from: 'service' },
        { label: 'Rule 26(f) Conference', days: 42, rule: 'FRCP 26(f)(1)', description: 'Parties must confer at least 21 days before scheduling conference', from: 'service' },
        { label: 'Initial Disclosures', days: 56, rule: 'FRCP 26(a)(1)(C)', description: '14 days after Rule 26(f) conference', from: 'service' },
        { label: 'Scheduling Order Deadline', days: 111, rule: 'FRCP 16(b)(2)', description: 'Court must issue scheduling order within 90 days of answer/appearance', from: 'service' },
      ];
    case 'answer_filed':
      return [
        { label: 'Rule 26(f) Conference', days: 21, rule: 'FRCP 26(f)(1)', description: 'Parties must confer as soon as practicable — at least 21 days before scheduling conference', from: 'answer' },
        { label: 'Initial Disclosures', days: 35, rule: 'FRCP 26(a)(1)(C)', description: '14 days after Rule 26(f) conference', from: 'answer' },
        { label: 'Scheduling Order', days: 90, rule: 'FRCP 16(b)(2)', description: 'Court must issue scheduling order within 90 days after defendant appears', from: 'answer' },
        { label: 'Amended Pleading (as of right)', days: 21, rule: 'FRCP 15(a)(1)(A)', description: 'Party may amend pleading once as of right within 21 days of serving it', from: 'answer' },
        { label: 'Rule 12(e) Motion for More Definite Statement', days: 14, rule: 'FRCP 12(e)', description: 'Must comply within 14 days of order granting motion', from: 'answer' },
      ];
    case 'removal_filed':
      return [
        { label: 'Filing in Federal Court', days: 0, rule: '28 U.S.C. § 1446(a)', description: 'Notice filed with federal district court', from: 'removal' },
        { label: 'Notice to State Court', days: 0, rule: '28 U.S.C. § 1446(d)', description: 'Copy of notice promptly filed with state court', from: 'removal' },
        { label: 'Motion to Remand', days: 30, rule: '28 U.S.C. § 1447(c)', description: 'Plaintiff must move to remand within 30 days on procedural grounds', from: 'removal' },
        { label: 'Answer Due (if not yet answered)', days: 21, rule: 'FRCP 81(c)(2)(C)', description: '21 days after filing notice or 7 days after service of removal notice, whichever is longer', from: 'removal' },
        { label: 'Rule 26(f) Conference', days: 42, rule: 'FRCP 26(f)(1)', description: 'Must confer — typically 21 days before scheduling conference', from: 'removal' },
      ];
    case 'scheduling_order':
      return [
        { label: 'Fact Discovery Cutoff', days: 180, rule: 'FRCP 16(b)(3)', description: 'Typical deadline — varies by court and case complexity', from: 'scheduling order' },
        { label: 'Expert Disclosures', days: 120, rule: 'FRCP 26(a)(2)(D)', description: 'At least 90 days before trial — typically set in scheduling order', from: 'scheduling order' },
        { label: 'Rebuttal Expert Disclosures', days: 150, rule: 'FRCP 26(a)(2)(D)(ii)', description: '30 days after opposing expert disclosures', from: 'scheduling order' },
        { label: 'Dispositive Motion Deadline', days: 210, rule: 'FRCP 56', description: 'Summary judgment deadline — set by scheduling order', from: 'scheduling order' },
        { label: 'Pretrial Conference', days: 270, rule: 'FRCP 16(e)', description: 'Final pretrial conference — set by court', from: 'scheduling order' },
        { label: 'Trial Date', days: 365, rule: 'FRCP 16(b)(3)(B)(v)', description: 'Estimated trial date — varies significantly by district', from: 'scheduling order' },
      ];
    default:
      return [];
  }
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isPastDate(date: Date): boolean {
  return date.getTime() < new Date().getTime();
}

export default function DeadlinesCalculatorPage() {
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');

  const deadlines = eventType ? getDeadlines(eventType) : [];
  const baseDate = eventDate ? new Date(eventDate + 'T00:00:00') : null;

  const computedDeadlines = baseDate
    ? deadlines.map(d => ({
        ...d,
        date: addDays(baseDate, d.days),
      })).sort((a, b) => a.days - b.days)
    : [];

  const maxDays = computedDeadlines.length > 0
    ? computedDeadlines[computedDeadlines.length - 1].days
    : 1;

  return (
    <>
      <style>{`
        .dl-select {
          height: 48px; width: 100%; border: 1px solid var(--border-default); border-radius: 2px;
          padding: 0 36px 0 16px; font-family: var(--font-ui); font-size: 14px; color: var(--color-text-primary);
          background: var(--color-surface-0); appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center; cursor: pointer;
          transition: border-color 0.2s ease;
        }
        .dl-select:hover { border-color: var(--gold); }
        .dl-select:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 2px rgba(0,105,151,0.1); }
        .dl-input {
          height: 48px; width: 100%; border: 1px solid var(--border-default); border-radius: 2px;
          padding: 0 16px; font-family: var(--font-ui); font-size: 14px; color: var(--color-text-primary);
          background: var(--color-surface-0); transition: border-color 0.2s ease;
        }
        .dl-input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 2px rgba(0,105,151,0.1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Header */}
      <header style={{
        background: 'var(--card)',
        color: 'var(--color-text-inverse)',
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
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(10,80,162,0.2)',
            background: 'rgba(10,80,162,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            FRCP Deadlines
          </div>
          <h1 style={{ color: 'var(--color-text-inverse)', fontFamily: 'var(--font-legal)', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Never miss a procedural deadline
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ui)', fontSize: 'clamp(14px, 2vw, 16px)', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            Federal Rules of Civil Procedure deadline calculator — visual timelines with FRCP rule citations and weekend/holiday handling.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav style={{ background: 'var(--color-surface-0)', padding: '12px 0', borderBottom: '1px solid var(--border-default)', fontSize: 13, fontFamily: 'var(--font-ui)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
          <Link href="/calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Calculator</Link>
          <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Court Deadlines</span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ background: 'var(--color-surface-1)', minHeight: '60vh', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Input Form */}
          <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 4, padding: 'clamp(24px, 4vw, 40px)', marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>
              Calculate Your Deadlines
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Event Type *
                </label>
                <select
                  value={eventType}
                  onChange={e => setEventType(e.target.value)}
                  className="dl-select"
                >
                  <option value="">Select a procedural event...</option>
                  {EVENT_TYPES.map(et => (
                    <option key={et.value} value={et.value}>{et.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Date of Event *
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  className="dl-input"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          {eventType && deadlines.length > 0 && (
            <div style={{ display: 'grid', gap: 24, animation: 'slideUp 0.4s ease-out' }}>

              {/* Timeline Header */}
              <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 4, padding: 'clamp(24px, 4vw, 32px)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
                  FRCP Deadline Timeline
                </h3>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>
                  {baseDate
                    ? `Starting from ${formatDate(baseDate)} — ${EVENT_TYPES.find(e => e.value === eventType)?.label}`
                    : 'Enter a date above to see specific deadline dates'}
                </p>

                {/* Horizontal Timeline */}
                <div style={{ position: 'relative', padding: '24px 0 0' }}>
                  {/* Timeline line */}
                  <div style={{ position: 'absolute', top: 32, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--accent-primary), var(--gold))', borderRadius: 2 }} />

                  {/* Event markers */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', minHeight: 80 }}>
                    {/* Start marker */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 0, position: 'relative' }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent-primary)', border: '3px solid var(--card)', boxShadow: '0 0 0 2px var(--accent-primary)', zIndex: 2 }} />
                      <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', marginTop: 8, whiteSpace: 'nowrap', fontWeight: 600, fontFamily: 'var(--font-ui)' }}>
                        Day 0
                      </div>
                    </div>

                    {deadlines.map((d, i) => {
                      const pct = maxDays > 0 ? (d.days / maxDays) * 100 : 0;
                      return (
                        <div
                          key={i}
                          style={{
                            position: 'absolute',
                            left: `${Math.max(5, Math.min(95, pct))}%`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            transform: 'translateX(-50%)',
                            animation: `fadeIn 0.3s ease-out ${i * 0.1}s both`,
                          }}
                        >
                          <div style={{
                            width: 12, height: 12, borderRadius: '50%',
                            background: baseDate && isPastDate(addDays(baseDate, d.days)) ? 'var(--data-negative)' : 'var(--data-positive)',
                            border: '2px solid var(--card)',
                            boxShadow: '0 0 0 2px ' + (baseDate && isPastDate(addDays(baseDate, d.days)) ? 'var(--data-negative)' : 'var(--data-positive)'),
                            zIndex: 2,
                          }} />
                          <div style={{
                            fontSize: 9, color: 'var(--color-text-secondary)', marginTop: 6, whiteSpace: 'nowrap',
                            fontFamily: 'var(--font-mono)', fontWeight: 600,
                            transform: i % 2 === 0 ? 'none' : 'translateY(14px)',
                          }}>
                            Day {d.days}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Deadline Cards */}
              {deadlines.map((d, i) => {
                const deadlineDate = baseDate ? addDays(baseDate, d.days) : null;
                const past = deadlineDate ? isPastDate(deadlineDate) : false;
                const daysFromNow = deadlineDate
                  ? Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  : null;

                return (
                  <div
                    key={i}
                    style={{
                      background: 'var(--color-surface-0)',
                      border: `1px solid ${past ? '#FECACA' : 'var(--border-default)'}`,
                      borderLeft: `4px solid ${past ? 'var(--data-negative)' : daysFromNow !== null && daysFromNow <= 14 ? 'var(--wrn-txt)' : 'var(--accent-primary)'}`,
                      borderRadius: 4,
                      padding: 'clamp(16px, 3vw, 24px)',
                      animation: `slideUp 0.4s ease-out ${i * 0.08}s both`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{
                            display: 'inline-block', padding: '3px 10px', background: 'rgba(10,80,162,0.08)',
                            color: 'var(--gold)', borderRadius: 4, fontSize: 11, fontWeight: 600,
                            fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap',
                          }}>
                            {d.rule}
                          </span>
                          <span style={{
                            fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            +{d.days} days from {d.from}
                          </span>
                        </div>
                        <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-ui)' }}>
                          {d.label}
                        </h4>
                        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-ui)' }}>
                          {d.description}
                        </p>
                      </div>

                      {deadlineDate && (
                        <div style={{ textAlign: 'right', minWidth: 130 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: past ? 'var(--data-negative)' : 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                            {formatDate(deadlineDate)}
                          </div>
                          {daysFromNow !== null && (
                            <div style={{
                              fontSize: 12, fontWeight: 600, marginTop: 4,
                              color: past ? 'var(--data-negative)' : daysFromNow <= 14 ? 'var(--wrn-txt)' : 'var(--data-positive)',
                              fontFamily: 'var(--font-ui)',
                            }}>
                              {past ? 'PASSED' : `${daysFromNow} days from today`}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Disclaimer */}
              <div style={{
                padding: '16px', background: 'rgba(234,179,8,0.1)', borderLeft: '3px solid #D97706', borderRadius: 4,
                fontSize: 12, color: 'var(--wrn-txt)', lineHeight: 1.6, fontFamily: 'var(--font-ui)',
              }}>
                <strong>Important:</strong> Based on FRCP default rules — local rules and scheduling orders may modify these deadlines. Weekend and holiday adjustments per FRCP 6(a) are not computed here. Always verify deadlines with the applicable local rules and any court-specific orders.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
