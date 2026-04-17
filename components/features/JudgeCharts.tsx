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
    fill: 'var(--color-text-primary)',
  };

  const cardStyle = {
    background: 'var(--color-surface-0)',
    borderRadius: '6px',
    border: '1px solid var(--border-default)',
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
            color: 'var(--color-text-primary)',
            marginBottom: '20px',
            marginTop: 0,
            fontFamily: 'var(--font-ui)',
          }}
        >
          Win Rate Trend (2018–2024)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyTrend}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-surface-1)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="var(--color-text-secondary)"
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
            />
            <YAxis
              label={{ value: 'Win Rate (%)', angle: -90, position: 'insideLeft' }}
              stroke="var(--color-text-secondary)"
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
              domain={[30, 70]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
              }}
              cursor={{ stroke: 'var(--color-surface-1)' }}
            />
            <Line
              type="monotone"
              dataKey="winRate"
              stroke="var(--accent-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--accent-primary)', r: 5 }}
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
            color: 'var(--color-text-primary)',
            marginBottom: '20px',
            marginTop: 0,
            fontFamily: 'var(--font-ui)',
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
              stroke="var(--color-surface-1)"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="var(--color-text-secondary)"
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
            />
            <YAxis
              dataKey="label"
              type="category"
              width={190}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12, fontFamily: 'var(--font-body)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
              }}
              cursor={{ fill: 'rgba(0, 105, 151, 0.05)' }}
            />
            <Bar
              dataKey="count"
              fill="var(--accent-primary)"
              radius={[0, 8, 8, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
