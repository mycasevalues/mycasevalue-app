'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

interface JudgeChartsProps {
  yearlyTrend: { year: number; cases: number; winRate: number }[];
  topCaseTypes: { label: string; count: number; winRate: number }[];
}

export default function JudgeCharts({ yearlyTrend, topCaseTypes }: JudgeChartsProps) {
  const chartStyle = {
    fontFamily: 'var(--font-body, Roboto, sans-serif)',
    fontSize: '12px',
    fill: '#111827',
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid var(--border-default, #E5E7EB)',
    padding: '24px',
    marginBottom: '24px',
  };

  return (
    <div>
      {/* Yearly Win Rate Trend */}
      <div style={cardStyle}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '20px',
            marginTop: 0,
            fontFamily: 'var(--font-display, Roboto, sans-serif)',
          }}
        >
          Win Rate Trend (2018–2024)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyTrend}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="#6B7280"
              style={chartStyle}
            />
            <YAxis
              label={{ value: 'Win Rate (%)', angle: -90, position: 'insideLeft' }}
              stroke="#6B7280"
              style={chartStyle}
              domain={[30, 70]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              cursor={{ stroke: '#E5E7EB' }}
            />
            <Line
              type="monotone"
              dataKey="winRate"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', r: 5 }}
              activeDot={{ r: 7 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Case Types */}
      <div style={cardStyle}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '20px',
            marginTop: 0,
            fontFamily: 'var(--font-display, Roboto, sans-serif)',
          }}
        >
          Top Case Types
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={topCaseTypes}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 200 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="#6B7280"
              style={chartStyle}
            />
            <YAxis
              dataKey="label"
              type="category"
              width={190}
              tick={{ fill: '#111827', fontSize: 12 }}
              style={chartStyle}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }}
            />
            <Bar
              dataKey="count"
              fill="#8B5CF6"
              radius={[0, 8, 8, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
