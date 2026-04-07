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
  pleading: '#3B82F6',
  discovery: '#F59E0B',
  dispositive: '#0A66C2',
  trial: '#EF4444',
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
    fontSize: '13px',
    fontWeight: 600,
    color: '#0f0f0f',
    marginBottom: '6px',
    fontFamily: 'var(--font-body)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#0f0f0f',
    backgroundColor: '#FFFFFF',
    fontFamily: 'var(--font-body)',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ background: '#1B3A5C', borderBottom: '1px solid #E5E7EB', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.1)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#0A66C2', flexShrink: 0 }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Federal Case Timeline
            </span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
            Case Timeline Generator
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            Generate expected federal case timelines with data-backed milestones and statistical comparison.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: timeline ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* Input Form */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
              Case Information
            </h2>

            <form onSubmit={generateTimeline} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
                <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid #E5E7EB' }}>
                  <p style={{ fontSize: '13px', color: '#CC1019', margin: 0, fontFamily: 'var(--font-body)' }}>{error}</p>
                </div>
              )}

              {/* Generate Button */}
              <button
                type="submit"
                disabled={!caseType || !filingDate}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: !caseType || !filingDate ? '#E5E7EB' : '#0A66C2',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: !caseType || !filingDate ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                Generate Timeline
              </button>

              {/* Custom Milestones Section */}
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '24px', marginTop: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>
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
                      padding: '10px 14px',
                      backgroundColor: !newMilestoneName.trim() || !newMilestoneMonths ? '#E5E7EB' : '#F0F4F8',
                      color: !newMilestoneName.trim() || !newMilestoneMonths ? '#9CA3AF' : '#0A66C2',
                      border: '1px solid #E5E7EB',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                      cursor: !newMilestoneName.trim() || !newMilestoneMonths ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    Add Milestone
                  </button>

                  {customMilestones.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                      {customMilestones.map((m) => (
                        <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F7F8FA', borderRadius: '20px', fontSize: '12px', color: '#4B5563' }}>
                          <span>{m.name} ({m.plannedMonthsFromFiling}mo)</span>
                          <button
                            type="button"
                            onClick={() => removeMilestone(m.id)}
                            style={{ background: 'none', border: 'none', color: '#0A66C2', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
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
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 20px', fontFamily: 'var(--font-display)' }}>
                  Timeline Summary
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                      Case Type
                    </p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-body)' }}>
                      {timeline.caseType}
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                      Filing Date
                    </p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-body)' }}>
                      {new Date(timeline.filingDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                      Projected Resolution
                    </p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#0A66C2', margin: 0, fontFamily: 'var(--font-body)' }}>
                      {new Date(timeline.projectedResolutionDate).toLocaleDateString()} ({timeline.medianDurationMonths} months)
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                      Progress
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flex: 1, height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#0A66C2', width: `${timeline.currentProgress}%`, transition: 'width 0.3s' }} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f', minWidth: '45px', fontFamily: 'var(--font-body)' }}>
                        {timeline.currentProgress}%
                      </span>
                    </div>
                  </div>

                  <div style={{ background: '#F0F9FF', padding: '12px', borderRadius: '20px', border: '1px solid #BFDBFE' }}>
                    <p style={{ fontSize: '12px', color: '#1E40AF', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                      {timeline.statisticalContext}
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestone Timeline */}
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
                  Case Milestones
                </h2>

                <div style={{ position: 'relative', paddingLeft: '32px' }}>
                  {/* Timeline line */}
                  <div style={{ position: 'absolute', left: '11px', top: '12px', bottom: '0', width: '2px', background: '#E5E7EB' }} />

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
                        background: '#FFFFFF',
                        border: `3px solid ${phaseColors[milestone.phase]}`,
                        borderRadius: '50%',
                      }} />

                      {/* Card */}
                      <div style={{ padding: '12px', borderLeft: `3px solid ${phaseColors[milestone.phase]}`, background: milestone.completed ? '#F0FDF4' : '#FAFBFC', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '4px' }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-body)' }}>
                            {milestone.name}
                          </h4>
                          {milestone.completed && (
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-body)' }}>
                              Completed
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: '#4B5563', fontFamily: 'var(--font-body)' }}>
                            {milestone.plannedMonthsFromFiling.toFixed(1)} months
                          </span>
                          <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-body)' }}>
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
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.08)', border: '1px solid rgba(10, 102, 194, 0.2)' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-body)' }}>
              Free during public beta
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <Link href="/attorney" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0A66C2'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Back to Attorney Mode
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                Explore more tools
              </p>
            </div>
          </Link>
          <Link href="/attorney/case-predictor" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0A66C2'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Case Predictor
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                Predict outcomes
              </p>
            </div>
          </Link>
          <Link href="/attorney/court-rules" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0A66C2'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Court Rules Reference
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                Local court rules
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
