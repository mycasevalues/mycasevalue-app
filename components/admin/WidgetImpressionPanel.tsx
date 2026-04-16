'use client';

import { useMemo } from 'react';

interface ImpressionMetric {
  label: string;
  value: string;
}

interface DomainData {
  domain: string;
  impressions: number;
}

interface CaseTypeData {
  caseType: string;
  impressions: number;
}

interface ChartPoint {
  date: string;
  impressions: number;
}

export default function WidgetImpressionPanel() {
  // Mock data for demonstration
  const totalImpressions = 8432;
  const topDomains: DomainData[] = [
    { domain: 'example-law.com', impressions: 2145 },
    { domain: 'litigation-pro.com', impressions: 1823 },
    { domain: 'counsel-group.net', impressions: 1456 },
    { domain: 'attorney-practice.com', impressions: 987 },
    { domain: 'legal-services.org', impressions: 756 },
  ];

  const topCaseTypes: CaseTypeData[] = [
    { caseType: 'Contract Disputes', impressions: 1890 },
    { caseType: 'Personal Injury', impressions: 1654 },
    { caseType: 'Employment Law', impressions: 1345 },
    { caseType: 'Medical Malpractice', impressions: 1123 },
    { caseType: 'Product Liability', impressions: 876 },
  ];

  // Generate chart data for last 30 days
  const chartData: ChartPoint[] = useMemo(() => {
    const data: ChartPoint[] = [];
    const today = new Date();

    Array.from({ length: 30 }).forEach((_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (29 - i));
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Generate realistic impression counts that total 8432
      const impressions = Math.floor(Math.random() * 350) + 150;
      data.push({ date: dateStr, impressions });
    });

    return data;
  }, []);

  const metrics: ImpressionMetric[] = [
    { label: 'Total Impressions (30 days)', value: totalImpressions.toLocaleString() },
    { label: 'Avg. Daily Impressions', value: Math.round(totalImpressions / 30).toLocaleString() },
    { label: 'Unique Domains', value: topDomains.length.toLocaleString() },
  ];

  const maxImpressions = Math.max(...chartData.map((d) => d.impressions));

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '24px' }}>
        Widget Impressions & Embeds
      </h2>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {metrics.map((metric, index) => (
          <div
            key={index}
            style={{
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              {metric.label}
            </p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--accent-primary)' }}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
          Impressions Over Time (Last 30 Days)
        </h3>
        <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', minHeight: '250px', position: 'relative' }}>
          <svg
            viewBox={`0 0 900 200`}
            style={{ width: '100%', height: '250px' }}
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {Array.from({ length: 5 }).map((_, i) => {
              const y = (i / 4) * 180 + 10;
              return (
                <line
                  key={`grid-${i}`}
                  x1="30"
                  y1={y}
                  x2="870"
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
              );
            })}

            {/* Line chart */}
            <polyline
              points={chartData
                .map((d, i) => {
                  const x = 30 + (i / (chartData.length - 1)) * 840;
                  const y = 190 - (d.impressions / maxImpressions) * 180;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="2"
            />

            {/* Data points */}
            {chartData.map((d, i) => {
              const x = 30 + (i / (chartData.length - 1)) * 840;
              const y = 190 - (d.impressions / maxImpressions) * 180;
              return (
                <circle
                  key={`point-${i}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="var(--accent-primary)"
                />
              );
            })}

            {/* X-axis labels (show every 5 days) */}
            {chartData.map((d, i) => {
              if (i % 5 !== 0) return null;
              const x = 30 + (i / (chartData.length - 1)) * 840;
              return (
                <text
                  key={`label-${i}`}
                  x={x}
                  y="200"
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6b7280"
                >
                  {d.date}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Top Domains */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
          Top 5 Embedding Domains
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {topDomains.map((domain, index) => {
            const percentage = (domain.impressions / totalImpressions) * 100;
            return (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                    {domain.domain}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    {domain.impressions.toLocaleString()} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: 'var(--accent-primary)',
                      width: `${percentage}%`,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Case Types */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
          Most Popular Case Types (Top 5)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {topCaseTypes.map((caseType, index) => {
            const percentage = (caseType.impressions / totalImpressions) * 100;
            return (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                    {caseType.caseType}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    {caseType.impressions.toLocaleString()} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: '#3b82f6',
                      width: `${percentage}%`,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
