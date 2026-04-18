'use client';

import { useState } from 'react';

// Mock Alert Type
interface Alert {
  id: string;
  name: string;
  searchTerms: string;
  contentTypes: string[];
  frequency: 'real-time' | 'daily' | 'weekly' | 'monthly';
  deliveryMethods: string[];
  status: 'active' | 'paused' | 'expired';
  createdDate: string;
  lastRunDate: string;
  resultsCount: number;
  timezone: string;
  scheduleDay?: number;
  scheduleTime?: string;
  recentResults?: Array<{ id: string; title: string; date: string; source: string }>;
}

// Mock sample alerts database
const SAMPLE_ALERTS: Alert[] = [
  {
    id: 'alert-001',
    name: 'Patent Infringement - Software',
    searchTerms: 'patent AND infringement AND ("software" OR "computer") AND /p (damages OR liability)',
    contentTypes: ['Cases', 'Dockets'],
    frequency: 'daily',
    deliveryMethods: ['Email (HTML)', 'In-App Notification'],
    status: 'active',
    createdDate: '2024-01-15',
    lastRunDate: '2026-04-17',
    resultsCount: 847,
    timezone: 'America/New_York',
    scheduleDay: undefined,
    scheduleTime: '08:00 AM',
    recentResults: [
      { id: 'r1', title: 'Smith v. TechCorp Inc. - Patent Infringement Claim', date: '2026-04-17', source: 'Federal District Court' },
      { id: 'r2', title: 'Acme Patents LLC v. Innovation Systems', date: '2026-04-16', source: 'Court Docket' },
    ]
  },
  {
    id: 'alert-002',
    name: 'TCPA Violations & Class Actions',
    searchTerms: 'TCPA AND ("class action" OR "class certification") AND (/s telephone /s marketing)',
    contentTypes: ['Cases', 'News', 'Statutes'],
    frequency: 'real-time',
    deliveryMethods: ['Email (HTML)', 'Webhook/API'],
    status: 'active',
    createdDate: '2024-02-20',
    lastRunDate: '2026-04-17',
    resultsCount: 1203,
    timezone: 'America/Chicago',
    recentResults: [
      { id: 'r3', title: 'Telecom Solutions Inc. - TCPA Settlement Approved', date: '2026-04-17', source: 'News Feed' },
      { id: 'r4', title: 'FCC Update: TCPA Enforcement Actions 2026', date: '2026-04-15', source: 'Regulatory News' },
    ]
  },
  {
    id: 'alert-003',
    name: 'Federal Employment Discrimination',
    searchTerms: '("employment discrimination" OR "civil rights") AND ("Title VII" OR "ADA" OR "ADEA")',
    contentTypes: ['Cases', 'Regulations'],
    frequency: 'weekly',
    deliveryMethods: ['Email (Plain Text)', 'RSS Feed'],
    status: 'active',
    createdDate: '2024-03-10',
    lastRunDate: '2026-04-14',
    resultsCount: 562,
    timezone: 'America/Los_Angeles',
    scheduleDay: 1, // Monday
    scheduleTime: '09:00 AM',
    recentResults: [
      { id: 'r5', title: 'Lopez v. State Department - Discrimination Settlement', date: '2026-04-12', source: 'Federal District Court' },
    ]
  },
  {
    id: 'alert-004',
    name: 'Securities Class Actions - Recent',
    searchTerms: 'securities AND ("class action" OR "class certification") AND /p fraud',
    contentTypes: ['Cases', 'Briefs', 'Dockets'],
    frequency: 'daily',
    deliveryMethods: ['Email (HTML)', 'In-App Notification'],
    status: 'active',
    createdDate: '2024-01-05',
    lastRunDate: '2026-04-17',
    resultsCount: 421,
    timezone: 'America/New_York',
    scheduleDay: undefined,
    scheduleTime: '02:00 PM',
    recentResults: [
      { id: 'r6', title: 'Investors v. Global Finance Corp - Securities Fraud Class Action', date: '2026-04-16', source: 'Court Docket' },
    ]
  },
  {
    id: 'alert-005',
    name: 'Antitrust & Competition Law',
    searchTerms: 'antitrust AND (monopoly OR "unfair competition" OR cartel) AND NOT /p dicta',
    contentTypes: ['Cases', 'Secondary Sources'],
    frequency: 'weekly',
    deliveryMethods: ['Email (HTML)', 'RSS Feed', 'Webhook/API'],
    status: 'paused',
    createdDate: '2024-04-01',
    lastRunDate: '2026-04-10',
    resultsCount: 234,
    timezone: 'America/New_York',
    scheduleDay: 3, // Wednesday
    scheduleTime: '10:00 AM',
    recentResults: []
  },
  {
    id: 'alert-006',
    name: 'Environmental Compliance & Liability',
    searchTerms: '("environmental law" OR "environmental compliance") AND (EPA OR RCRA OR CERCLA)',
    contentTypes: ['Regulations', 'Secondary Sources', 'News'],
    frequency: 'monthly',
    deliveryMethods: ['Email (HTML)'],
    status: 'active',
    createdDate: '2024-05-15',
    lastRunDate: '2026-04-01',
    resultsCount: 156,
    timezone: 'America/New_York',
    scheduleDay: 1, // First of month
    scheduleTime: '11:00 AM',
    recentResults: []
  },
  {
    id: 'alert-007',
    name: 'Healthcare & Medical Malpractice',
    searchTerms: '("medical malpractice" OR "healthcare liability") AND (damages OR settlement OR verdict)',
    contentTypes: ['Cases', 'Dockets'],
    frequency: 'daily',
    deliveryMethods: ['Email (HTML)'],
    status: 'expired',
    createdDate: '2024-06-01',
    lastRunDate: '2026-03-15',
    resultsCount: 89,
    timezone: 'America/New_York',
    scheduleDay: undefined,
    scheduleTime: '03:00 PM',
    recentResults: []
  },
  {
    id: 'alert-008',
    name: 'Contract Interpretation - Recent Rulings',
    searchTerms: '("contract interpretation" OR "contract law") AND (ambiguity OR "plain language") /p common law',
    contentTypes: ['Cases', 'Briefs'],
    frequency: 'weekly',
    deliveryMethods: ['Email (Plain Text)', 'In-App Notification'],
    status: 'active',
    createdDate: '2024-02-14',
    lastRunDate: '2026-04-16',
    resultsCount: 312,
    timezone: 'America/Denver',
    scheduleDay: 2, // Tuesday
    scheduleTime: '08:30 AM',
    recentResults: [
      { id: 'r7', title: 'Premier Enterprises v. Valley Holdings - Contract Interpretation', date: '2026-04-15', source: 'Federal Court' },
    ]
  }
];

// Wizard Step Component
const WizardSteps = ({ step, setStep, formData, setFormData }: {
  step: number;
  setStep: (s: number) => void;
  formData: any;
  setFormData: (f: any) => void;
}) => {
  const contentTypeOptions = ['Cases', 'Statutes', 'Regulations', 'Secondary Sources', 'News', 'Briefs', 'Dockets'];
  const frequencyOptions = ['Real-time', 'Daily', 'Weekly', 'Monthly'];
  const deliveryOptions = ['Email (HTML)', 'Email (Plain Text)', 'RSS Feed', 'In-App Notification', 'Webhook/API'];
  const timezoneOptions = ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Step 1: Alert Name */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label htmlFor="alert-name" className="institutional-label">Alert Name</label>
            <input
              id="alert-name"
              type="text"
              placeholder="e.g., Patent Infringement - Technology Sector"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', fontSize: '14px', border: '1px solid var(--bdr)', borderRadius: '2px' }}
            />
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: 0 }}>Give this alert a descriptive name. You can edit it anytime.</p>
        </div>
      )}

      {/* Step 2: Content Types */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <label className="institutional-label">Content Types (Select all that apply)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)' }}>
            {contentTypeOptions.map((type) => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.contentTypes.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({ ...formData, contentTypes: [...formData.contentTypes, type] });
                    } else {
                      setFormData({ ...formData, contentTypes: formData.contentTypes.filter((t: string) => t !== type) });
                    }
                  }}
                />
                <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Search Terms */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label htmlFor="search-terms" className="institutional-label">Search Terms & Boolean Operators</label>
            <textarea
              id="search-terms"
              placeholder="e.g., (patent OR intellectual property) AND infringement AND /p damages"
              value={formData.searchTerms}
              onChange={(e) => setFormData({ ...formData, searchTerms: e.target.value })}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: 'var(--space-3) var(--space-4)',
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            <strong>Operators:</strong> AND, OR, NOT, /p (same paragraph), /s (same sentence)
          </div>
        </div>
      )}

      {/* Step 4: Delivery & Schedule */}
      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div>
            <label className="institutional-label">Delivery Methods</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-3)' }}>
              {deliveryOptions.map((method) => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.deliveryMethods.includes(method)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, deliveryMethods: [...formData.deliveryMethods, method] });
                      } else {
                        setFormData({ ...formData, deliveryMethods: formData.deliveryMethods.filter((m: string) => m !== method) });
                      }
                    }}
                  />
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--bdr)', paddingTop: 'var(--space-4)' }}>
            <label className="institutional-label">Frequency</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              {frequencyOptions.map((freq) => (
                <label key={freq} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="frequency"
                    checked={formData.frequency === freq.toLowerCase()}
                    onChange={() => setFormData({ ...formData, frequency: freq.toLowerCase() })}
                  />
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{freq}</span>
                </label>
              ))}
            </div>

            {formData.frequency !== 'real-time' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--space-4)', alignItems: 'center' }}>
                {formData.frequency === 'weekly' && (
                  <>
                    <label htmlFor="schedule-day" className="institutional-label" style={{ marginBottom: 0 }}>Day</label>
                    <select
                      id="schedule-day"
                      value={formData.scheduleDay || 0}
                      onChange={(e) => setFormData({ ...formData, scheduleDay: parseInt(e.target.value) })}
                      style={{ padding: 'var(--space-2) var(--space-3)', fontSize: '14px', border: '1px solid var(--bdr)', borderRadius: '2px' }}
                    >
                      <option value="0">Monday</option>
                      <option value="1">Tuesday</option>
                      <option value="2">Wednesday</option>
                      <option value="3">Thursday</option>
                      <option value="4">Friday</option>
                    </select>
                  </>
                )}

                <label htmlFor="schedule-time" className="institutional-label" style={{ marginBottom: 0 }}>Time</label>
                <input
                  id="schedule-time"
                  type="time"
                  value={formData.scheduleTime || '09:00'}
                  onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
                  style={{ padding: 'var(--space-2) var(--space-3)', fontSize: '14px', border: '1px solid var(--bdr)', borderRadius: '2px' }}
                />

                <label htmlFor="schedule-timezone" className="institutional-label" style={{ marginBottom: 0 }}>Timezone</label>
                <select
                  id="schedule-timezone"
                  value={formData.timezone || 'America/New_York'}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  style={{ padding: 'var(--space-2) var(--space-3)', fontSize: '14px', border: '1px solid var(--bdr)', borderRadius: '2px' }}
                >
                  {timezoneOptions.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between', marginTop: 'var(--space-4)' }}>
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          style={{
            padding: '0 var(--space-4)',
            height: '40px',
            border: '1px solid var(--bdr-strong)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '2px',
            cursor: step === 1 ? 'not-allowed' : 'pointer',
            opacity: step === 1 ? 0.5 : 1
          }}
        >
          Previous
        </button>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: s === step ? 'var(--gold)' : s < step ? 'var(--data-positive)' : 'var(--bdr)',
                cursor: 'pointer'
              }}
              onClick={() => s <= step && setStep(s)}
            />
          ))}
        </div>
        <button
          onClick={() => {
            if (step < 4) setStep(step + 1);
          }}
          disabled={step === 4}
          style={{
            padding: '0 var(--space-4)',
            height: '40px',
            border: '1px solid var(--bdr-strong)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '2px',
            cursor: step === 4 ? 'not-allowed' : 'pointer',
            opacity: step === 4 ? 0.5 : 1
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Main Alerts Page
export default function AlertsPage() {
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [alerts, setAlerts] = useState<Alert[]>(SAMPLE_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'expired'>('all');
  const [formData, setFormData] = useState({
    name: '',
    contentTypes: [],
    searchTerms: '',
    frequency: 'daily',
    deliveryMethods: [],
    timezone: 'America/New_York',
    scheduleDay: undefined,
    scheduleTime: '09:00'
  });

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.name.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateAlert = () => {
    const newAlert: Alert = {
      id: `alert-${Date.now()}`,
      name: formData.name,
      searchTerms: formData.searchTerms,
      contentTypes: formData.contentTypes,
      frequency: formData.frequency as any,
      deliveryMethods: formData.deliveryMethods,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      lastRunDate: new Date().toISOString().split('T')[0],
      resultsCount: Math.floor(Math.random() * 1000),
      timezone: formData.timezone,
      scheduleDay: formData.scheduleDay,
      scheduleTime: formData.scheduleTime,
      recentResults: []
    };
    setAlerts([newAlert, ...alerts]);
    setShowWizard(false);
    setWizardStep(1);
    setFormData({
      name: '',
      contentTypes: [],
      searchTerms: '',
      frequency: 'daily',
      deliveryMethods: [],
      timezone: 'America/New_York',
      scheduleDay: undefined,
      scheduleTime: '09:00'
    });
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(alerts.map((alert) => {
      if (alert.id === id) {
        return { ...alert, status: alert.status === 'active' ? 'paused' : 'active' };
      }
      return alert;
    }));
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
    setSelectedAlert(null);
  };

  const getStatusBadgeStyle = (status: string) => {
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-1)',
      fontSize: '12px',
      fontWeight: '600',
      padding: '0 var(--space-2)',
      height: '20px',
      borderRadius: '3px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    };

    if (status === 'active') {
      return { ...baseStyle, background: 'var(--status-active-bg)', color: 'var(--status-active-text)' };
    } else if (status === 'paused') {
      return { ...baseStyle, background: 'var(--status-pending-bg)', color: 'var(--status-pending-text)' };
    } else {
      return { ...baseStyle, background: 'var(--status-closed-bg)', color: 'var(--status-closed-text)' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf)', padding: 'var(--space-8)' }}>
      <style>{`
        @media (max-width: 768px) {
          .alerts-controls-grid { grid-template-columns: 1fr !important; }
          .alerts-list-grid { grid-template-columns: 1fr !important; }
          .alerts-detail-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-legal)', marginBottom: 'var(--space-2)' }}>
            Alerts & Notifications
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
            Create custom research alerts and receive notifications when new cases, statutes, or news matching your criteria are published.
          </p>
        </div>

        {/* Create Alert Wizard Modal */}
        {showWizard && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-4)'
          }}>
            <div style={{
              background: 'var(--surface-primary)',
              borderRadius: '4px',
              padding: 'var(--space-8)',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'var(--font-ui)', marginBottom: 'var(--space-6)' }}>
                Create New Alert — Step {wizardStep} of 4
              </h2>

              <WizardSteps
                step={wizardStep}
                setStep={setWizardStep}
                formData={formData}
                setFormData={setFormData}
              />

              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-8)', borderTop: '1px solid var(--bdr)', paddingTop: 'var(--space-6)' }}>
                <button
                  onClick={() => {
                    setShowWizard(false);
                    setWizardStep(1);
                  }}
                  style={{
                    flex: 1,
                    padding: '0 var(--space-4)',
                    height: '40px',
                    border: '1px solid var(--bdr-strong)',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    fontWeight: '600',
                    borderRadius: '2px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAlert}
                  disabled={!formData.name || formData.contentTypes.length === 0 || !formData.searchTerms}
                  style={{
                    flex: 1,
                    padding: '0 var(--space-4)',
                    height: '40px',
                    border: 'none',
                    background: formData.name && formData.contentTypes.length > 0 && formData.searchTerms ? 'var(--gold)' : '#CCCCCC',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    borderRadius: '2px',
                    cursor: formData.name && formData.contentTypes.length > 0 && formData.searchTerms ? 'pointer' : 'not-allowed'
                  }}
                >
                  Create Alert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto auto',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-6)',
          alignItems: 'center'
        }} className="alerts-controls-grid">
          <button
            onClick={() => setShowWizard(true)}
            style={{
              padding: '0 var(--space-5)',
              height: '40px',
              background: 'var(--gold)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
          >
            + Create Alert
          </button>

          <input
            type="text"
            placeholder="Search alerts..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              fontSize: '14px',
              border: '1px solid var(--bdr)',
              borderRadius: '2px',
              width: '100%'
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              fontSize: '14px',
              border: '1px solid var(--bdr)',
              borderRadius: '2px'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedAlert ? '1fr 1fr' : '1fr', gap: 'var(--space-6)' }} className="alerts-list-grid">
          {/* Alerts List */}
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'var(--font-ui)', marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              Active & Saved Alerts ({filteredAlerts.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {filteredAlerts.length === 0 ? (
                <div style={{
                  padding: 'var(--space-8)',
                  background: 'var(--surface-primary)',
                  border: '1px solid var(--bdr)',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', margin: 0 }}>
                    No alerts found. Create your first alert to get started.
                  </p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    style={{
                      padding: 'var(--space-4)',
                      background: selectedAlert?.id === alert.id ? 'var(--link-light)' : 'var(--surface-primary)',
                      border: `1px solid ${selectedAlert?.id === alert.id ? 'var(--link)' : 'var(--bdr)'}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'var(--font-ui)', color: 'var(--text-primary)', margin: 0 }}>
                        {alert.name}
                      </h3>
                      <div style={getStatusBadgeStyle(alert.status)}>
                        <span>{alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}</span>
                      </div>
                    </div>

                    <p style={{
                      fontSize: '14px',
                      color: 'var(--text-tertiary)',
                      fontFamily: 'var(--font-mono)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      margin: '0 0 var(--space-2) 0'
                    }}>
                      {alert.searchTerms}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '2px' }}>Frequency</div>
                        <div style={{ fontFamily: 'var(--font-mono)' }}>{alert.frequency}</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '2px' }}>Results</div>
                        <div style={{ fontFamily: 'var(--font-mono)' }}>{alert.resultsCount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '2px' }}>Last Run</div>
                        <div style={{ fontFamily: 'var(--font-mono)' }}>{alert.lastRunDate}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                      {alert.contentTypes.map((type) => (
                        <span
                          key={type}
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            padding: '0 var(--space-2)',
                            height: '20px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: 'rgba(10,80,160,0.08)',
                            color: 'var(--link)',
                            borderRadius: '3px'
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Alert Details Panel */}
          {selectedAlert && (
            <div style={{
              padding: 'var(--space-6)',
              background: 'var(--surface-primary)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--bdr)', paddingBottom: 'var(--space-4)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'var(--font-ui)', margin: 0 }}>
                  {selectedAlert.name}
                </h2>
                <button
                  onClick={() => handleDeleteAlert(selectedAlert.id)}
                  style={{
                    padding: '0 var(--space-3)',
                    height: '32px',
                    border: '1px solid var(--data-negative)',
                    background: 'transparent',
                    color: 'var(--data-negative)',
                    fontSize: '12px',
                    fontWeight: '600',
                    borderRadius: '2px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }} className="alerts-detail-stats-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Status</label>
                  <button
                    onClick={() => handleToggleAlert(selectedAlert.id)}
                    style={{
                      ...getStatusBadgeStyle(selectedAlert.status),
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    {selectedAlert.status.charAt(0).toUpperCase() + selectedAlert.status.slice(1)}
                  </button>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Frequency</label>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {selectedAlert.frequency.charAt(0).toUpperCase() + selectedAlert.frequency.slice(1)}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Total Results</label>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {selectedAlert.resultsCount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Last Run</label>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {selectedAlert.lastRunDate}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Search Terms</label>
                <div style={{
                  padding: 'var(--space-3)',
                  background: 'var(--sidebar)',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  wordBreak: 'break-all'
                }}>
                  {selectedAlert.searchTerms}
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Content Types</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {selectedAlert.contentTypes.map((type) => (
                    <span
                      key={type}
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        padding: '0 var(--space-3)',
                        height: '24px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: 'rgba(10,80,160,0.08)',
                        color: 'var(--link)',
                        borderRadius: '3px'
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Delivery Methods</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {selectedAlert.deliveryMethods.map((method) => (
                    <span
                      key={method}
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        padding: '0 var(--space-3)',
                        height: '24px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: 'var(--wrn-bg)',
                        color: 'var(--wrn-txt)',
                        borderRadius: '3px'
                      }}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              {selectedAlert.scheduleTime && (
                <div style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-3)', background: 'var(--sidebar)', borderRadius: '2px', borderLeft: '3px solid var(--gold)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <strong>Schedule:</strong> {selectedAlert.scheduleTime} {selectedAlert.timezone}
                  </div>
                </div>
              )}

              {selectedAlert.recentResults && selectedAlert.recentResults.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-ui)', marginBottom: 'var(--space-3)' }}>
                    Recent Results
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {selectedAlert.recentResults.map((result) => (
                      <div
                        key={result.id}
                        style={{
                          padding: 'var(--space-3)',
                          background: 'var(--sidebar)',
                          borderRadius: '2px',
                          borderLeft: '3px solid var(--link)'
                        }}
                      >
                        <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--link)', marginBottom: '2px' }}>
                          {result.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                          {result.source} • {result.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Related Tools */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
              {[
                { name: 'Advanced Search', href: '/attorney/advanced-search', desc: 'Advanced legal research search tools' },
                { name: 'KeyCite', href: '/attorney/keycite', desc: 'Citation validation and case treatment analysis' },
                { name: 'Folders', href: '/attorney/folders', desc: 'Organize and manage research folders' },
                { name: 'PACER Monitor', href: '/attorney/pacer-monitor', desc: 'Monitor federal court PACER filings' },
              ].map(tool => (
                <a key={tool.href} href={tool.href} style={{ display: 'block', padding: '16px', background: 'var(--surf)', border: '1px solid var(--bdr)', borderRadius: '4px', textDecoration: 'none', color: 'inherit', transition: 'border-color 200ms' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--link)', marginBottom: '4px' }}>{tool.name}</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{tool.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
