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
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fill: '#0f0f0f',
  };

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    padding: '32px',
    marginBottom: '24px',
  };

  return (
    <div>
      {/* Yearly Win Rate Trend */}
      <div style={cardStyle}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#0f0f0f',
            marginBottom: '20px',
            marginTop: 0,
            fontFamily: 'var(--font-display)',
          }}
        >
          Win Rate Trend (2018–2024)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyTrend}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F7F8FA"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="#4B5563"
              tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }}
            />
            <YAxis
              label={{ value: 'Win Rate (%)', angle: -90, position: 'insideLeft' }}
              stroke="#4B5563"
              tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }}
              domain={[30, 70]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                color: '#0f0f0f',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
              }}
              cursor={{ stroke: '#F7F8FA' }}
            />
            <Line
              type="monotone"
              dataKey="winRate"
              stroke="#0A66C2"
              strokeWidth={3}
              dot={{ fill: '#0A66C2', r: 5 }}
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
            fontWeight: 600,
            color: '#0f0f0f',
            marginBottom: '20px',
            marginTop: 0,
            fontFamily: 'var(--font-display)',
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
              stroke="#F7F8FA"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="#4B5563"
              tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }}
            />
            <YAxis
              dataKey="label"
              type="category"
              width={190}
              tick={{ fill: '#4B5563', fontSize: 12, fontFamily: 'var(--font-body)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                color: '#0f0f0f',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
              }}
              cursor={{ fill: 'rgba(0, 105, 151, 0.05)' }}
            />
            <Bar
              dataKey="count"
              fill="#0A66C2"
              radius={[0, 8, 8, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
