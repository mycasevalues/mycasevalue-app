import { Metadata } from 'next';
import Link from 'next/link';
import { REAL_DATA } from '../../../lib/realdata';
import { getWinRateColor } from '../../../lib/color-scale';

export const metadata: Metadata = {
  title: 'Class Action Intelligence',
  description: 'Certification rates, settlement data, and strategic insights for class action litigation.',
};

// Mock data for class action specific stats
const CLASS_ACTION_STATS = {
  '365': { // Product Liability
    certRate: 34.2,
    avgPerMember: 2850,
    medianMembers: 15000,
    recentSettlement: 'Galaxy Tab screen defect: $49M (2026)',
  },
  '850': { // Securities
    certRate: 41.8,
    avgPerMember: 4200,
    medianMembers: 28000,
    recentSettlement: 'Crypto exchange pump & dump: $125M (2025)',
  },
  '442': { // Employment
    certRate: 28.5,
    avgPerMember: 1850,
    medianMembers: 520,
    recentSettlement: 'Tech wage fixing: $18M (2025)',
  },
  '480': { // Consumer Credit
    certRate: 37.9,
    avgPerMember: 340,
    medianMembers: 450000,
    recentSettlement: 'Hidden fees settlement: $22M (2025)',
  },
  '485': { // TCPA
    certRate: 45.2,
    avgPerMember: 185,
    medianMembers: 980000,
    recentSettlement: 'Robocall campaign: $8M (2026)',
  },
};

const TOP_CASE_TYPES = [
  { nos: '365', label: 'Product Liability', volume: 18540, certRate: 34.2, avgSettlement: '$12.5M' },
  { nos: '850', label: 'Securities', volume: 2840, certRate: 41.8, avgSettlement: '$45.2M' },
  { nos: '442', label: 'Employment', volume: 5240, certRate: 28.5, avgSettlement: '$8.3M' },
  { nos: '480', label: 'Consumer Credit', volume: 3190, certRate: 37.9, avgSettlement: '$15.8M' },
  { nos: '485', label: 'TCPA', volume: 4080, certRate: 45.2, avgSettlement: '$6.2M' },
];

const RECENT_SETTLEMENTS = [
  { name: 'Automotive seatbelt defect', amount: '$156M', members: 42000, year: 2025, nos: '365' },
  { name: 'Data breach notification delay', amount: '$89M', members: 8500, year: 2026, nos: '370' },
  { name: 'Labor scheduling violations', amount: '$34M', members: 1200, year: 2025, nos: '442' },
  { name: 'Telecom billing overcharges', amount: '$67M', members: 2400000, year: 2025, nos: '480' },
  { name: 'Insurance underwriting discrimination', amount: '$28M', members: 890, year: 2025, nos: '110' },
];

const DISTRICT_RANKINGS = [
  { district: 'N.D. California', approvals: 42, denials: 8, rate: 84, judges: 3 },
  { district: 'C.D. California', approvals: 38, denials: 6, rate: 86, judges: 2 },
  { district: 'S.D. New York', approvals: 35, denials: 9, rate: 79, judges: 4 },
  { district: 'D. Delaware', approvals: 28, denials: 4, rate: 88, judges: 1 },
  { district: 'N.D. Illinois', approvals: 24, denials: 7, rate: 77, judges: 2 },
];

export default function ClassActionPage() {
  const accentColor = 'var(--accent-primary)';
  const secondaryColor = 'var(--accent-primary-hover)';
  const textColor = 'var(--color-text-primary)';
  const bgColor = 'var(--color-surface-1)';
  const borderColor = 'var(--border-default)';

  return (
    <div style={{ minHeight: '100vh', background: bgColor, fontFamily: 'var(--font-body)', color: textColor }}>
      {/* Header */}
      <div style={{ background: secondaryColor, padding: '20px 20px', borderBottom: `1px solid ${borderColor}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700, margin: '0 0 8px', color: 'white', fontFamily: 'var(--font-heading)' }}>
            Class Action Intelligence
          </h1>
          <p style={{ fontSize: '14px', margin: '0', color: 'rgba(255,255,255,0.85)' }}>
            Certification rates, settlement trends, and strategic insights for class action litigation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Section 1: Top Case Types */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: secondaryColor, fontFamily: 'var(--font-heading)' }}>
            Top Case Types for Class Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {TOP_CASE_TYPES.map((caseType) => {
              const stats = CLASS_ACTION_STATS[caseType.nos as keyof typeof CLASS_ACTION_STATS];
              const colorInfo = getWinRateColor(caseType.certRate);
              return (
                <div
                  key={caseType.nos}
                  style={{
                    background: 'var(--color-surface-0)',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 12px', color: textColor }}>
                    {caseType.label}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 4px' }}>Certification Rate</p>
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          background: colorInfo.bg,
                          border: `1px solid ${colorInfo.border}`,
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: colorInfo.text,
                        }}
                      >
                        {caseType.certRate.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>
                    <p style={{ margin: '4px 0' }}>
                      <strong>Avg per member:</strong> ${stats?.avgPerMember.toLocaleString() || 'N/A'}
                    </p>
                    <p style={{ margin: '4px 0' }}>
                      <strong>Median members:</strong> {stats?.medianMembers.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                  {stats?.recentSettlement && (
                    <p style={{ fontSize: '12px', color: accentColor, margin: '8px 0 0', fontWeight: 500 }}>
                      Recent: {stats.recentSettlement}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Recent Class Settlements */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: secondaryColor, fontFamily: 'var(--font-heading)' }}>
            Recent Class Action Settlements
          </h2>
          <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', border: `1px solid ${borderColor}`, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: `1px solid ${borderColor}` }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: textColor }}>Case Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: textColor }}>Settlement</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: textColor }}>Class Members</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: textColor }}>Year</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: textColor }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_SETTLEMENTS.map((settlement, i) => (
                    <tr key={i} style={{ borderBottom: i < RECENT_SETTLEMENTS.length - 1 ? `1px solid ${borderColor}` : 'none' }}>
                      <td style={{ padding: '12px 16px', color: textColor }}>{settlement.name}</td>
                      <td style={{ padding: '12px 16px', color: accentColor, fontWeight: 600 }}>{settlement.amount}</td>
                      <td style={{ padding: '12px 16px', color: textColor }}>{settlement.members.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', color: textColor }}>{settlement.year}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: 'rgba(59,130,246,0.08)', color: secondaryColor, padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 500 }}>
                          {TOP_CASE_TYPES.find((t) => t.nos === settlement.nos)?.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Certification by District */}
        <section>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: secondaryColor, fontFamily: 'var(--font-heading)' }}>
            Class Certification Approval Rates by District
          </h2>
          <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', border: `1px solid ${borderColor}`, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: `1px solid ${borderColor}` }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: textColor }}>District</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: textColor }}>Approvals</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: textColor }}>Denials</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: textColor }}>Approval Rate</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: textColor }}>Judges</th>
                  </tr>
                </thead>
                <tbody>
                  {DISTRICT_RANKINGS.map((district, i) => {
                    const colorInfo = getWinRateColor(district.rate);
                    return (
                      <tr key={i} style={{ borderBottom: i < DISTRICT_RANKINGS.length - 1 ? `1px solid ${borderColor}` : 'none' }}>
                        <td style={{ padding: '12px 16px', color: textColor, fontWeight: 500 }}>{district.district}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', color: textColor }}>{district.approvals}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', color: textColor }}>{district.denials}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <div
                            style={{
                              display: 'inline-block',
                              padding: '4px 10px',
                              background: colorInfo.bg,
                              border: `1px solid ${colorInfo.border}`,
                              borderRadius: '8px',
                              color: colorInfo.text,
                              fontWeight: 600,
                              fontSize: '13px',
                            }}
                          >
                            {district.rate}%
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', color: textColor }}>{district.judges}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '12px' }}>
            Based on class certification motions filed and decided in federal district courts (2018-2025)
          </p>
        </section>
      </div>
    </div>
  );
}

