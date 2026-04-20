'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
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
  getCircuitWinRates,
  getOutcomeBreakdown,
  getSettlementDurations,
  type YearlyTrend,
  type CategoryTrend,
  type TopCaseType,
} from '../../lib/trends';

// LinkedIn color palette for categories
const CATEGORY_CHART_COLORS: Record<string, string> = {
  Financial: 'var(--link)',
  Employment: 'var(--text2)',
  Injury: 'var(--link)',
  Consumer: 'var(--text2)',
  'Civil Rights': 'var(--bdr)',
  Housing: '#70B5F9',
  Medical: 'var(--data-negative, #B01E1E)',
  Family: '#C37D16',
  Government: 'var(--text2)',
  'Intellectual Property': 'var(--data-positive, #176438)',
  Other: 'var(--text2)',
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
          background: 'var(--card)',
          border: '1px solid var(--bdr)',
          borderRadius: '4px',
          padding: '12px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <p style={{ color: 'var(--text1)', fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0', fontFamily: 'var(--font-ui)' }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: '12px', margin: '4px 0', fontFamily: 'var(--font-ui)' }}>
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
  const circuitWinRates = getCircuitWinRates();
  const outcomeBreakdown = getOutcomeBreakdown();
  const settlementDurations = getSettlementDurations();

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
        className="p-6 border"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--bdr)',
          borderRadius: '4px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            color: 'var(--text1)',
          }}
        >
          Federal Filing Trends (2015–2024)
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>
          Total federal civil case filings over the past decade
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={nationalTrends}>
            <defs>
              <linearGradient id="colorFilings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--link)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--link)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surf)" />
            <XAxis dataKey="year" stroke="var(--text2)" tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <YAxis stroke="var(--text2)" tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="totalFilings"
              stroke="var(--link)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorFilings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Win Rate by Category - Multi-line Chart */}
      <div
        className="p-6 border"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--bdr)',
          borderRadius: '4px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            color: 'var(--text1)',
          }}
        >
          Win Rate Trends by Category (2018–2024)
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>
          Win rate trends across top case categories
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={categoryTrends[0]?.years ? buildCombinedCategoryData(categoryTrends) : []}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surf)" />
            <XAxis dataKey="year" stroke="var(--text2)" tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <YAxis stroke="var(--text2)" domain={[0, 100]} tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px', fontFamily: 'var(--font-ui)', color: 'var(--text2)' }} />
            {categoryTrends.map((cat, idx) => (
              <Line
                key={cat.category}
                type="monotone"
                dataKey={cat.categoryLabel}
                stroke={
                  [
                    'var(--link)',
                    'var(--text2)',
                    '#70B5F9',
                    'var(--text2)',
                    'var(--bdr)',
                    'var(--data-positive, #176438)',
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
        className="p-6 border"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--bdr)',
          borderRadius: '4px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            color: 'var(--text1)',
          }}
        >
          Top 15 Case Types by Filing Volume
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>
          Most frequently filed federal civil case types
        </p>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={caseTypeChartData}
            layout="vertical"
            margin={{ top: 4, right: 32, left: 300, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surf)" />
            <XAxis type="number" stroke="var(--text2)" tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <YAxis dataKey="label" type="category" stroke="var(--text2)" width={300} tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="var(--link)" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Settlement Rate Trends - Area Chart */}
      <div
        className="p-6 border"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--bdr)',
          borderRadius: '4px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            color: 'var(--text1)',
          }}
        >
          Settlement Rate Trends (2015–2024)
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>
          Percentage of federal civil cases resolved through settlement over time
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={nationalTrends}>
            <defs>
              <linearGradient id="colorSettlement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#057642" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#057642" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surf)" />
            <XAxis dataKey="year" stroke="var(--text2)" tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <YAxis stroke="var(--text2)" domain={[0, 100]} tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="avgSettlementRate"
              stroke="var(--data-positive)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSettlement)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Circuit Court Win Rates - Horizontal Bar Chart */}
      <div
        className="p-6 border"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--bdr)',
          borderRadius: '4px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            color: 'var(--text1)',
          }}
        >
          Circuit Court Win Rates
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>
          Average win rate by federal circuit
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={circuitWinRates}
            layout="vertical"
            margin={{ top: 4, right: 32, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surf)" />
            <XAxis type="number" domain={[0, 100]} stroke="var(--text2)" tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <YAxis dataKey="circuit" type="category" stroke="var(--text2)" width={120} tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--bdr)',
                        borderRadius: '4px',
                        padding: '12px 16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <p style={{ color: 'var(--text1)', fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0', fontFamily: 'var(--font-ui)' }}>
                        {payload[0].payload.circuit}
                      </p>
                      <p style={{ color: 'var(--link)', fontSize: '12px', margin: '4px 0', fontFamily: 'var(--font-ui)' }}>
                        Win Rate: {payload[0].value}%
                      </p>
                      <p style={{ color: 'var(--text2)', fontSize: '12px', margin: '4px 0', fontFamily: 'var(--font-ui)' }}>
                        Cases: {payload[0].payload.caseCount.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="avgWinRate" radius={[0, 8, 8, 0]}>
              {circuitWinRates.map((entry, index) => (
                <Cell key={index} fill={entry.avgWinRate > 55 ? 'var(--data-positive, #176438)' : entry.avgWinRate < 45 ? 'var(--link)' : '#70B5F9'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Case Outcome Distribution - Horizontal Bar Chart */}
      <div
        className="p-6 border"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--bdr)',
          borderRadius: '4px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            color: 'var(--text1)',
          }}
        >
          How Cases End
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>
          Distribution of case outcomes across all federal civil cases
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={outcomeBreakdown}
            layout="vertical"
            margin={{ top: 4, right: 32, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surf)" />
            <XAxis type="number" stroke="var(--text2)" tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <YAxis dataKey="outcome" type="category" stroke="var(--text2)" width={150} tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--bdr)',
                        borderRadius: '4px',
                        padding: '12px 16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <p style={{ color: 'var(--text1)', fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0', fontFamily: 'var(--font-ui)' }}>
                        {payload[0].payload.outcome}
                      </p>
                      <p style={{ color: payload[0].payload.color, fontSize: '12px', margin: '4px 0', fontFamily: 'var(--font-ui)' }}>
                        {payload[0].value}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="percentage" radius={[0, 8, 8, 0]}>
              {outcomeBreakdown.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Duration by Category - Grouped Bar Chart */}
      <div
        className="p-6 border"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--bdr)',
          borderRadius: '4px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            color: 'var(--text1)',
          }}
        >
          Settlement vs. Trial Duration by Category
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>
          Average case duration for settlement versus trial across case categories
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={settlementDurations}
            layout="vertical"
            margin={{ top: 4, right: 32, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surf)" />
            <XAxis type="number" stroke="var(--text2)" tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <YAxis dataKey="category" type="category" stroke="var(--text2)" width={120} tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px', fontFamily: 'var(--font-ui)', color: 'var(--text2)' }} />
            <Bar dataKey="settlementMonths" fill="#057642" radius={[0, 4, 4, 0]} />
            <Bar dataKey="trialMonths" fill="var(--link)" radius={[0, 4, 4, 0]} />
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
