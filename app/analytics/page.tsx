'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';
import { ArrowLeftIcon } from '../../components/ui/Icons';
import HorizontalBarChart from '../../components/charts/HorizontalBarChart';

// Mock data for analytics
const dailySearchData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  searches: Math.floor(Math.random() * 500) + 200,
  activeUsers: Math.floor(Math.random() * 300) + 100,
}));

const caseTypeData = [
  { name: 'Employment Discrimination', value: 2450, percentage: 18.5 },
  { name: 'Personal Injury', value: 2100, percentage: 15.8 },
  { name: 'Contract Disputes', value: 1950, percentage: 14.7 },
  { name: 'Civil Rights', value: 1650, percentage: 12.4 },
  { name: 'Securities', value: 1450, percentage: 10.9 },
  { name: 'Other', value: 3400, percentage: 25.6 },
];

const userTypeData = [
  { name: 'Attorneys', value: 6200, percentage: 47 },
  { name: 'Paralegals', value: 3100, percentage: 23 },
  { name: 'Researchers', value: 2100, percentage: 16 },
  { name: 'Students', value: 1600, percentage: 12 },
];

// Data transformed for HorizontalBarChart
const caseTypeBarData = caseTypeData.map((d) => ({
  label: d.name,
  percentage: d.percentage,
}));

const userTypeBarData = userTypeData.map((d) => ({
  label: d.name,
  percentage: d.percentage,
}));

export default function AnalyticsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf)' }}>
      <style>{`
        .metric-card {
          background: var(--card);
          border: 1px solid var(--bdr);
          border-radius: 2px;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .metric-value {
          font-size: 32px;
          font-weight: bold;
          color: var(--text1);
          margin-bottom: 8px;
          font-family: var(--font-ui);
        }

        .metric-label {
          font-size: 14px;
          color: var(--text2);
          font-family: var(--font-ui);
        }

        .metric-change {
          font-size: 12px;
          color: var(--data-positive);
          margin-top: 8px;
          font-weight: 500;
        }

        .chart-card {
          background: var(--card);
          border: 1px solid var(--bdr);
          border-radius: 2px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .chart-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text1);
          margin-bottom: 20px;
          font-family: var(--font-ui);
        }

        .header {
          background: var(--card);
          color: var(--chrome-text);
          padding: 48px 24px 40px;
          border-bottom: 1px solid var(--bdr);
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .header-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          margin-bottom: 16px;
          border-radius: 999px;
          border: 1px solid rgba(10,80,162,0.2);
          background: rgba(10,80,162,0.08);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--link);
        }

        .header-eyebrow-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--data-positive);
        }

        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 16px 0;
          font-family: var(--font-ui);
          letter-spacing: -0.025em;
          line-height: 1.1;
        }

        .header p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 16px;
          font-family: var(--font-ui);
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 24px;
          font-size: 14px;
          font-family: var(--font-ui);
          transition: color 200ms ease;
        }

        .back-link:hover {
          color: var(--card);
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .charts-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 24px;
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .charts-row {
            grid-template-columns: 1fr;
          }

          .header h1 {
            font-size: 28px;
          }
        }

        @media (max-width: 640px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .header {
            padding: 32px 16px;
          }

          .container {
            padding: 24px 16px;
          }
        }

        .tooltip-content {
          background: var(--card);
          border: 1px solid var(--bdr);
          border-radius: 4px;
          padding: 12px;
          font-size: 12px;
          font-family: var(--font-ui);
        }

        .legend-item {
          color: var(--text2) !important;
          font-size: 12px !important;
          font-family: var(--font-ui) !important;
        }

        .info-banner {
          background: var(--card);
          border: 1px solid var(--bdr);
          border-left: 4px solid var(--link);
          border-radius: 2px;
          padding: 24px;
          margin-bottom: 40px;
        }

        .info-banner h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text1);
          margin: 0 0 8px 0;
          font-family: var(--font-ui);
        }

        .info-banner p {
          font-size: 14px;
          color: var(--text2);
          margin: 0;
          font-family: var(--font-ui);
          line-height: 1.5;
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="header-content">
          <Link href="/blog" className="back-link">
            <ArrowLeftIcon size={16} />
            Back to Blog
          </Link>
          <div className="header-eyebrow">
            <span className="header-eyebrow-dot animate-pulse" />
            Platform Analytics
          </div>
          <h1>Platform Usage Intelligence</h1>
          <p>Real-time insights into federal court research activity and platform engagement.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">13,250</div>
            <div className="metric-label">Total Searches (30 days)</div>
            <div className="metric-change">+ 12% from previous period</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">8,150</div>
            <div className="metric-label">Active Users</div>
            <div className="metric-change">+ 8% from previous period</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">45,620</div>
            <div className="metric-label">API Calls</div>
            <div className="metric-change">+ 15% from previous period</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">94.2%</div>
            <div className="metric-label">Platform Uptime</div>
            <div className="metric-change">+ 0.3% from previous period</div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="info-banner">
          <h3>About These Metrics</h3>
          <p>
            This dashboard shows aggregate analytics from our federal court data platform over the last 30 days. Data includes searches across all 94 federal districts, case analysis, settlement research, and judge comparison tools. All metrics are updated in real-time.
          </p>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          {/* Daily Searches Line Chart */}
          <div className="chart-card">
            <div className="chart-title">Daily Searches (Last 30 Days)</div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySearchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--bdr)" />
                <XAxis dataKey="day" stroke="var(--text2)" style={{ fontSize: '12px', fontFamily: 'var(--font-ui)' }} />
                <YAxis stroke="var(--text2)" style={{ fontSize: '12px', fontFamily: 'var(--font-ui)' }} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: '2px',
                    padding: '12px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '12px',
                    color: 'var(--text2)',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-ui)' }} />
                <Line
                  type="monotone"
                  dataKey="searches"
                  stroke="var(--link)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Case Types Bar Chart */}
          <div className="chart-card">
            <div className="chart-title">Top Case Types Searched</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={caseTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--bdr)" />
                <XAxis type="number" stroke="var(--text2)" style={{ fontSize: '12px', fontFamily: 'var(--font-ui)' }} />
                <YAxis dataKey="name" type="category" width={150} stroke="var(--text2)" style={{ fontSize: '12px', fontFamily: 'var(--font-ui)' }} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: '2px',
                    padding: '12px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '12px',
                    color: 'var(--text2)',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Bar dataKey="value" fill="var(--link)" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Types Distribution — HorizontalBarChart */}
          <div className="chart-card">
            <HorizontalBarChart
              data={userTypeBarData}
              title="User Types Distribution"
              animate
            />
          </div>

          {/* Case Type Distribution — HorizontalBarChart */}
          <div className="chart-card">
            <HorizontalBarChart
              data={caseTypeBarData}
              title="Case Type Distribution"
              animate
              dataSources="PACER filing records"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div style={{ marginTop: '48px', padding: '24px', background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text1)', margin: '0 0 8px 0', fontFamily: 'var(--font-legal)' }}>
            Have questions about the data?
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text2)', margin: '0 0 16px 0', fontFamily: 'var(--font-ui)' }}>
            Contact our research team or visit our documentation for more details about platform usage and federal court analytics.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '8px 24px',
              background: 'var(--link)',
              color: 'var(--card)',
              borderRadius: '2px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'var(--font-ui)',
            }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
