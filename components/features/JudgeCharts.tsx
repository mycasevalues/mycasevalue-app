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
    fill: '#212529',
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid var(--border-default, rgba(255,255,255,0.10))',
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
            color: '#212529',
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
              stroke="rgba(255,255,255,0.10)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="#455A64"
              style={chartStyle}
            />
            <YAxis
              label={{ value: 'Win Rate (%)', angle: -90, position: 'insideLeft' }}
              stroke="#455A64"
              style={chartStyle}
              domain={[30, 70]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              cursor={{ stroke: 'rgba(255,255,255,0.10)' }}
            />
            <Line
              type="monotone"
              dataKey="winRate"
              stroke="#006997"
              strokeWidth={3}
              dot={{ fill: '#006997', r: 5 }}
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
            color: '#212529',
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
              stroke="rgba(255,255,255,0.10)"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="#455A64"
              style={chartStyle}
            />
            <YAxis
              dataKey="label"
              type="category"
              width={190}
              tick={{ fill: '#212529', fontSize: 12 }}
              style={chartStyle}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }}
            />
            <Bar
              dataKey="count"
              fill="#006997"
              radius={[0, 8, 8, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
