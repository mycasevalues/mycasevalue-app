'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';

type Milestone = {
  id: string;
  name: string;
  phase: 'pleading' | 'discovery' | 'dispositive' | 'trial';
  plannedMonthsFromFiling: number;
  actualMonthsFromFiling?: number;
  completed: boolean;
};

type TimelineData = {
  caseType: string;
  nosCode: string;
  filingDate: string;
  milestones: Milestone[];
  medianDurationMonths: number;
  projectedResolutionDate: string;
  currentProgress: number;
  statisticalContext: string;
};

const phaseColors = {
  pleading: 'var(--link)',
  discovery: 'var(--wrn-txt)',
  dispositive: 'var(--accent-primary)',
  trial: 'var(--data-negative)',
};

const phaseLabels = {
  pleading: 'Pleading',
  discovery: 'Discovery',
  dispositive: 'Dispositive Motions',
  trial: 'Trial',
};

export default function CaseTimelinePage() {
  const [caseType, setCaseType] = useState('');
  const [filingDate, setFilingDate] = useState('');
  const [customMilestones, setCustomMilestones] = useState<Milestone[]>([]);
  const [newMilestoneName, setNewMilestoneName] = useState('');
  const [newMilestonePhase, setNewMilestonePhase] = useState<'pleading' | 'discovery' | 'dispositive' | 'trial'>('discovery');
  const [newMilestoneMonths, setNewMilestoneMonths] = useState('');
  const [timeline, setTimeline] = useState<TimelineData | null>(null);
  const [error, setError] = useState('');

  const allCaseTypes = SITS.flatMap(cat =>
    cat.opts.map(opt => ({
      label: opt.label,
      nos: opt.nos,
      category: cat.label,
    }))
  ).sort((a, b) => a.label.localeCompare(b.label));

  const generateTimeline = (e: React.FormEvent) => {
    e.preventDefault();

    if (!caseType || !filingDate) {
      setError('Please select a case type and filing date');
      return;
    }

    setError('');

    const caseData = REAL_DATA[caseType];
    if (!caseData) {
      setError('Case type data not found');
      return;
    }

    const medianMonths = caseData.mo || 12;
    const filingDateObj = new Date(filingDate);
    const projectedResolution = new Date(filingDateObj);
    projectedResolution.setMonth(projectedResolution.getMonth() + medianMonths);

    const now = new Date();
    const monthsElapsed = Math.floor((now.getTime() - filingDateObj.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    const currentProgress = Math.min(100, Math.floor((monthsElapsed / medianMonths) * 100));

    const defaultMilestones: Milestone[] = [
      { id: '1', name: 'Complaint Filed', phase: 'pleading', plannedMonthsFromFiling: 0, completed: monthsElapsed >= 0 },
      { id: '2', name: 'Answer Filed', phase: 'pleading', plannedMonthsFromFiling: 1, completed: monthsElapsed >= 1 },
      { id: '3', name: 'Rule 26 Conference', phase: 'discovery', plannedMonthsFromFiling: 2, completed: monthsElapsed >= 2 },
      { id: '4', name: 'Scheduling Order Issued', phase: 'discovery', plannedMonthsFromFiling: 3, completed: monthsElapsed >= 3 },
      { id: '5', name: 'Initial Disclosures Due', phase: 'discovery', plannedMonthsFromFiling: 3.5, completed: monthsElapsed >= 3.5 },
      { id: '6', name: 'Interrogatories & Requests for Production', phase: 'discovery', plannedMonthsFromFiling: 4, completed: monthsElapsed >= 4 },
      { id: '7', name: 'Discovery Responses Due', phase: 'discovery', plannedMonthsFromFiling: 5.5, completed: monthsElapsed >= 5.5 },
      { id: '8', name: 'Depositions', phase: 'discovery', plannedMonthsFromFiling: 7, completed: monthsElapsed >= 7 },
      { id: '9', name: 'Discovery Cutoff', phase: 'discovery', plannedMonthsFromFiling: 10, completed: monthsElapsed >= 10 },
      { id: '10', name: 'Expert Disclosures', phase: 'dispositive', plannedMonthsFromFiling: 11, completed: monthsElapsed >= 11 },
      { id: '11', name: 'Dispositive Motions (MSJ)', phase: 'dispositive', plannedMonthsFromFiling: 12, completed: monthsElapsed >= 12 },
      { id: '12', name: 'Dispositive Motion Deadline', phase: 'dispositive', plannedMonthsFromFiling: 13, completed: monthsElapsed >= 13 },
      { id: '13', name: 'Pretrial Conference', phase: 'trial', plannedMonthsFromFiling: 15, completed: monthsElapsed >= 15 },
      { id: '14', name: 'Trial', phase: 'trial', plannedMonthsFromFiling: medianMonths, completed: monthsElapsed >= medianMonths },
    ];

    const allMilestones = [...defaultMilestones, ...customMilestones].sort((a, b) => a.plannedMonthsFromFiling - b.plannedMonthsFromFiling);

    const statisticalContext = `${Math.round((caseData.sp || 50))}% of similar cases settle before trial`;

    setTimeline({
      caseType: allCaseTypes.find(ct => ct.nos === caseType)?.label || caseType,
      nosCode: caseType,
      filingDate,
      milestones: allMilestones,
      medianDurationMonths: medianMonths,
      projectedResolutionDate: projectedResolution.toISOString().split('T')[0],
      currentProgress,
      statisticalContext,
    });
  };

  const addCustomMilestone = () => {
    if (!newMilestoneName.trim() || !newMilestoneMonths) {
      setError('Please fill in milestone name and months');
      return;
    }

    const newMilestone: Milestone = {
      id: Date.now().toString(),
      name: newMilestoneName,
      phase: newMilestonePhase,
      plannedMonthsFromFiling: parseFloat(newMilestoneMonths),
      completed: false,
    };

    setCustomMilestones([...customMilestones, newMilestone]);
    setNewMilestoneName('');
    setNewMilestoneMonths('');
    setError('');
  };

  const removeMilestone = (id: string) => {
    setCustomMilestones(customMilestones.filter(m => m.id !== id));
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    marginBottom: '6px',
    fontFamily: 'var(--font-ui)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--border-default)',
    borderRadius: '2px',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-surface-0)',
    fontFamily: 'var(--font-ui)',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-ui)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--card)',
        color: 'var(--card)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-legal)', margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
            Case Timeline Generator
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text3)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
            Generate expected federal case timelines with data-backed milestones and statistical comparison.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: timeline ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* Input Form */}
          <div style={{ background: 'var(--color-surface-0)', borderRadius: '4px', padding: '32px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px', fontFamily: 'var(--font-ui)' }}>
              Case Information
            </h2>

            <form onSubmit={generateTimeline} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Case Type */}
              <div>
                <label style={labelStyle}>Case Type *</label>
                <select
                  value={caseType}
                  onChange={(e) => {
                    setCaseType(e.target.value);
                    setError('');
                  }}
                  style={inputStyle}
                >
                  <option value="">Select case type...</option>
                  {allCaseTypes.map((ct) => (
                    <option key={ct.nos} value={ct.nos}>
                      {ct.label} ({ct.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Filing Date */}
              <div>
                <label style={labelStyle}>Filing Date *</label>
                <input
                  type="date"
                  value={filingDate}
                  onChange={(e) => {
                    setFilingDate(e.target.value);
                    setError('');
                  }}
                  style={inputStyle}
                />
              </div>

              {/* Error */}
              {error && (
                <div style={{ padding: '12px 14px', borderRadius: '4px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid var(--border-default)' }}>
                  <p style={{ fontSize: '14px', color: '#CC1019', margin: 0, fontFamily: 'var(--font-ui)' }}>{error}</p>
                </div>
              )}

              {/* Generate Button */}
              <button
                type="submit"
                disabled={!caseType || !filingDate}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: !caseType || !filingDate ? 'var(--border-default)' : 'var(--accent-primary)',
                  color: 'var(--color-text-primary)',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: !caseType || !filingDate ? 'not-allowed' : 'pointer',
                  transition: 'background-color 200ms',
                }}
              >
                Generate Timeline
              </button>

              {/* Custom Milestones Section */}
              <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '24px', marginTop: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                  Add Custom Milestones
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Milestone Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Settlement Conference"
                      value={newMilestoneName}
                      onChange={(e) => setNewMilestoneName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={labelStyle}>Phase</label>
                      <select
                        value={newMilestonePhase}
                        onChange={(e) => setNewMilestonePhase(e.target.value as any)}
                        style={inputStyle}
                      >
                        <option value="pleading">Pleading</option>
                        <option value="discovery">Discovery</option>
                        <option value="dispositive">Dispositive</option>
                        <option value="trial">Trial</option>
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Months from Filing</label>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        step="0.5"
                        value={newMilestoneMonths}
                        onChange={(e) => setNewMilestoneMonths(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addCustomMilestone}
                    disabled={!newMilestoneName.trim() || !newMilestoneMonths}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: !newMilestoneName.trim() || !newMilestoneMonths ? 'var(--border-default)' : 'var(--color-surface-0)',
                      color: !newMilestoneName.trim() || !newMilestoneMonths ? 'var(--color-text-muted)' : 'var(--accent-primary)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '2px',
                      fontSize: '14px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-ui)',
                      cursor: !newMilestoneName.trim() || !newMilestoneMonths ? 'not-allowed' : 'pointer',
                      transition: 'all 200ms',
                    }}
                  >
                    Add Milestone
                  </button>

                  {customMilestones.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                      {customMilestones.map((m) => (
                        <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--color-surface-1)', borderRadius: '4px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          <span>{m.name} ({m.plannedMonthsFromFiling}mo)</span>
                          <button
                            type="button"
                            onClick={() => removeMilestone(m.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Timeline Visualization */}
          {timeline && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Timeline Summary Card */}
              <div style={{ background: 'var(--color-surface-0)', borderRadius: '4px', padding: '32px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
                  Timeline Summary
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                      Case Type
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                      {timeline.caseType}
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                      Filing Date
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                      {new Date(timeline.filingDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                      Projected Resolution
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                      {new Date(timeline.projectedResolutionDate).toLocaleDateString()} ({timeline.medianDurationMonths} months)
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '16px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                      Progress
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flex: 1, height: '8px', background: 'var(--border-default)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: 'var(--accent-primary)', width: `${timeline.currentProgress}%`, transition: 'width 0.3s' }} />
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', minWidth: '45px', fontFamily: 'var(--font-ui)' }}>
                        {timeline.currentProgress}%
                      </span>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(59,130,246,0.06)', padding: '12px', borderRadius: '4px', border: '1px solid rgba(59,130,246,0.15)' }}>
                    <p style={{ fontSize: '12px', color: 'var(--link)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-ui)' }}>
                      {timeline.statisticalContext}
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestone Timeline */}
              <div style={{ background: 'var(--color-surface-0)', borderRadius: '4px', padding: '32px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
                  Case Milestones
                </h2>

                <div style={{ position: 'relative', paddingLeft: '32px' }}>
                  {/* Timeline line */}
                  <div style={{ position: 'absolute', left: '12px', top: '12px', bottom: '0', width: '2px', background: 'var(--border-default)' }} />

                  {/* Milestones */}
                  {timeline.milestones.map((milestone, idx) => (
                    <div key={milestone.id} style={{ marginBottom: idx === timeline.milestones.length - 1 ? 0 : '24px', position: 'relative' }}>
                      {/* Dot */}
                      <div style={{
                        position: 'absolute',
                        left: '-24px',
                        top: '2px',
                        width: '22px',
                        height: '22px',
                        background: 'var(--color-surface-0)',
                        border: `3px solid ${phaseColors[milestone.phase]}`,
                        borderRadius: '50%',
                      }} />

                      {/* Card */}
                      <div style={{ padding: '12px', borderLeft: `3px solid ${phaseColors[milestone.phase]}`, background: milestone.completed ? 'rgba(34,197,94,0.06)' : 'var(--color-surface-1)', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '4px' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                            {milestone.name}
                          </h4>
                          {milestone.completed && (
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--data-positive)', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-ui)' }}>
                              Completed
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
                            {milestone.plannedMonthsFromFiling.toFixed(1)} months
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                            {phaseLabels[milestone.phase]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Beta Badge */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-default)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '3px', background: 'rgba(10, 102, 194, 0.08)', border: '1px solid rgba(10, 102, 194, 0.2)' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-ui)' }}>
              Free during public beta
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-default)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <Link href="/attorney" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', cursor: 'pointer', transition: 'all 200ms' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-ui)' }}>
                Back to Attorney Mode
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                Explore more tools
              </p>
            </div>
          </Link>
          <Link href="/attorney/case-predictor" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', cursor: 'pointer', transition: 'all 200ms' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-ui)' }}>
                Case Predictor
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                Predict outcomes
              </p>
            </div>
          </Link>
          <Link href="/attorney/court-rules" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', cursor: 'pointer', transition: 'all 200ms' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-ui)' }}>
                Court Rules Reference
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                Local court rules
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
