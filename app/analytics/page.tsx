'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';
import { ArrowLeftIcon } from '../../components/ui/Icons';

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

const COLORS = ['#0966C3', '#004182', '#004182', '#5B21B6', '#4C1D95', '#D4D4D8'];
const USER_COLORS = ['#0966C3', '#A78BFA', '#C4B5FD', '#DDD6FE'];

export default function AnalyticsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
      <style>{`
        .metric-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .metric-value {
          font-size: 32px;
          font-weight: bold;
          color: #0f0f0f;
          margin-bottom: 8px;
          font-family: var(--font-display);
        }

        .metric-label {
          font-size: 14px;
          color: #4B5563;
          font-family: var(--font-body);
        }

        .metric-change {
          font-size: 12px;
          color: #10B981;
          margin-top: 8px;
          font-weight: 500;
        }

        .chart-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .chart-title {
          font-size: 18px;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 20px;
          font-family: var(--font-display);
        }

        .header {
          background: #1C3A5E;
          color: #FFFFFF;
          padding: 48px 24px;
          border-bottom: 1px solid #E5E7EB;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header h1 {
          font-size: 36px;
          font-weight: bold;
          margin: 0 0 8px 0;
          font-family: var(--font-display);
          letter-spacing: -1px;
        }

        .header p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 16px;
          font-family: var(--font-body);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
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
          font-family: var(--font-body);
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: #FFFFFF;
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
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 12px;
          font-size: 12px;
          font-family: var(--font-body);
        }

        .legend-item {
          color: #4B5563 !important;
          font-size: 12px !important;
          font-family: var(--font-body) !important;
        }

        .info-banner {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-left: 4px solid #0966C3;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 40px;
        }

        .info-banner h3 {
          font-size: 16px;
          font-weight: 600;
          color: #0f0f0f;
          margin: 0 0 8px 0;
          font-family: var(--font-display);
        }

        .info-banner p {
          font-size: 14px;
          color: #4B5563;
          margin: 0;
          font-family: var(--font-body);
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
          <h1>Platform Analytics Dashboard</h1>
          <p>Real-time insights into federal court research activity and platform usage</p>
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
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#4B5563" style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }} />
                <YAxis stroke="#4B5563" style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }} />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '20px',
                    padding: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: '#4B5563',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-body)' }} />
                <Line
                  type="monotone"
                  dataKey="searches"
                  stroke="#0966C3"
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
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#4B5563" style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }} />
                <YAxis dataKey="name" type="category" width={150} stroke="#4B5563" style={{ fontSize: '11px', fontFamily: 'var(--font-body)' }} />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '20px',
                    padding: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: '#4B5563',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Bar dataKey="value" fill="#0966C3" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Types Pie Chart */}
          <div className="chart-card">
            <div className="chart-title">User Types Distribution</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} (${Math.round((entry.percent || 0) * 100)}%)`}
                  outerRadius={100}
                  fill="#0966C3"
                  dataKey="value"
                >
                  {Array.from({ length: userTypeData.length }, (_, i) => (
                    <Cell key={`cell-${i}`} fill={USER_COLORS[i % USER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '20px',
                    padding: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: '#4B5563',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Case Type Distribution Pie Chart */}
          <div className="chart-card">
            <div className="chart-title">Case Type Distribution</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} (${Math.round((entry.percent || 0) * 100)}%)`}
                  outerRadius={100}
                  fill="#0966C3"
                  dataKey="value"
                >
                  {Array.from({ length: caseTypeData.length }, (_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '20px',
                    padding: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: '#4B5563',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer Info */}
        <div style={{ marginTop: '48px', padding: '24px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 8px 0', fontFamily: 'var(--font-display)' }}>
            Have questions about the data?
          </h3>
          <p style={{ fontSize: '14px', color: '#4B5563', margin: '0 0 16px 0', fontFamily: 'var(--font-body)' }}>
            Contact our research team or visit our documentation for more details about platform usage and federal court analytics.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: '#0966C3',
              color: '#FFFFFF',
              borderRadius: '20px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'var(--font-body)',
            }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
