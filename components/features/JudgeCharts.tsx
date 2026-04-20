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
    fontFamily: 'var(--font-ui)',
    fontSize: '12px',
    fill: 'var(--text1)',
  };

  const cardStyle = {
    background: 'var(--card)',
    borderRadius: '4px',
    border: '1px solid var(--bdr)',
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
            color: 'var(--text1)',
            marginBottom: '24px',
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
              stroke="var(--surf)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="var(--text2)"
              tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }}
            />
            <YAxis
              label={{ value: 'Win Rate (%)', angle: -90, position: 'insideLeft' }}
              stroke="var(--text2)"
              tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }}
              domain={[30, 70]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--bdr)',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                color: 'var(--text1)',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
              }}
              cursor={{ stroke: 'var(--surf)' }}
            />
            <Line
              type="monotone"
              dataKey="winRate"
              stroke="var(--link)"
              strokeWidth={3}
              dot={{ fill: 'var(--link)', r: 5 }}
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
            color: 'var(--text1)',
            marginBottom: '24px',
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
            margin={{ top: 4, right: 32, left: 200 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--surf)"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="var(--text2)"
              tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }}
            />
            <YAxis
              dataKey="label"
              type="category"
              width={190}
              tick={{ fill: 'var(--text2)', fontSize: 12, fontFamily: 'var(--font-ui)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--bdr)',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                color: 'var(--text1)',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
              }}
              cursor={{ fill: 'rgba(0, 105, 151, 0.05)' }}
            />
            <Bar
              dataKey="count"
              fill="var(--link)"
              radius={[0, 8, 8, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
