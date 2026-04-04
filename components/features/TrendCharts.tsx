'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import {
  getNationalTrends,
  getCategoryTrends,
  getTopCaseTypesByVolume,
  type YearlyTrend,
  type CategoryTrend,
  type TopCaseType,
} from '../../lib/trends';

// Purple palette for categories
const CATEGORY_CHART_COLORS: Record<string, string> = {
  Financial: '#1856FF',
  Employment: '#A78BFA',
  Injury: '#C4B5FD',
  Consumer: '#DDD6FE',
  'Civil Rights': 'rgba(24,86,255,0.12)',
  Housing: '#3D72FF',
  Medical: '#6D28D9',
  Family: '#5B21B6',
  Government: '#4C1D95',
  'Intellectual Property': '#9F7AEA',
  Other: '#B794F6',
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: any; color: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '8px',
          padding: '12px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <p style={{ color: '#F0F2F5', fontSize: '12px', fontWeight: 600, margin: '0 0 8px 0' }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: '12px', margin: '4px 0' }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrendCharts() {
  const nationalTrends = getNationalTrends();
  const categoryTrends = getCategoryTrends();
  const topCaseTypes = getTopCaseTypesByVolume(15);

  // Transform top case types for horizontal bar chart
  const caseTypeChartData = topCaseTypes
    .slice()
    .reverse()
    .map((ct) => ({
      label: ct.label.length > 30 ? ct.label.substring(0, 27) + '...' : ct.label,
      count: ct.count,
      fullLabel: ct.label,
    }));

  return (
    <div className="space-y-10">
      {/* National Filing Trends - Area Chart */}
      <div
        className="p-6 rounded-lg border"
        style={{
          background: '#FFFFFF',
          borderColor: 'rgba(255,255,255,0.10)',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#F0F2F5',
          }}
        >
          Federal Filing Trends (2015–2024)
        </h3>
        <p style={{ color: '#455A64', fontSize: '13px', marginBottom: '16px' }}>
          Total federal civil case filings over the past decade
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={nationalTrends}>
            <defs>
              <linearGradient id="colorFilings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1856FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1856FF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5EBF0" />
            <XAxis dataKey="year" stroke="#455A64" />
            <YAxis stroke="#455A64" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="totalFilings"
              stroke="#1856FF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorFilings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Win Rate by Category - Multi-line Chart */}
      <div
        className="p-6 rounded-lg border"
        style={{
          background: '#FFFFFF',
          borderColor: 'rgba(255,255,255,0.10)',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#F0F2F5',
          }}
        >
          Win Rate Trends by Category (2018–2024)
        </h3>
        <p style={{ color: '#455A64', fontSize: '13px', marginBottom: '16px' }}>
          Plaintiff win rate trends across top case categories
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={categoryTrends[0]?.years ? buildCombinedCategoryData(categoryTrends) : []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5EBF0" />
            <XAxis dataKey="year" stroke="#455A64" />
            <YAxis stroke="#455A64" domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {categoryTrends.map((cat, idx) => (
              <Line
                key={cat.category}
                type="monotone"
                dataKey={cat.categoryLabel}
                stroke={
                  [
                    '#1856FF',
                    '#3D72FF',
                    '#EC4899',
                    '#06B6D4',
                    '#F59E0B',
                    '#10B981',
                  ][idx % 6]
                }
                strokeWidth={2}
                dot={{ r: 3 }}
                isAnimationActive={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Case Types by Volume - Horizontal Bar Chart */}
      <div
        className="p-6 rounded-lg border"
        style={{
          background: '#FFFFFF',
          borderColor: 'rgba(255,255,255,0.10)',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#F0F2F5',
          }}
        >
          Top 15 Case Types by Filing Volume
        </h3>
        <p style={{ color: '#455A64', fontSize: '13px', marginBottom: '16px' }}>
          Most frequently filed federal civil case types
        </p>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={caseTypeChartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 300, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5EBF0" />
            <XAxis type="number" stroke="#455A64" />
            <YAxis dataKey="label" type="category" stroke="#455A64" width={300} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#1856FF" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/**
 * Helper to combine category trend data into format suitable for recharts
 */
function buildCombinedCategoryData(
  categoryTrends: CategoryTrend[]
): Record<string, any>[] {
  const dataByYear: Record<number, Record<string, number>> = {};

  for (const cat of categoryTrends) {
    for (const yearData of cat.years) {
      if (!dataByYear[yearData.year]) {
        dataByYear[yearData.year] = { year: yearData.year };
      }
      dataByYear[yearData.year][cat.categoryLabel] = yearData.winRate;
    }
  }

  return Object.values(dataByYear).sort((a, b) => a.year - b.year);
}
