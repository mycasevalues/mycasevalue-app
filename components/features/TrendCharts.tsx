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

// LexisNexis color palette for categories
const CATEGORY_CHART_COLORS: Record<string, string> = {
  Financial: '#7C3AED',
  Employment: '#1B3A5C',
  Injury: '#6D28D9',
  Consumer: '#4B5563',
  'Civil Rights': '#E5E7EB',
  Housing: '#0080B8',
  Medical: '#00A4D9',
  Family: '#1AA8D1',
  Government: '#004D6D',
  'Intellectual Property': '#003A52',
  Other: '#002838',
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
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          padding: '12px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <p style={{ color: '#212529', fontSize: '13px', fontWeight: 600, margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: '12px', margin: '4px 0', fontFamily: 'var(--font-body)' }}>
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
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
          borderRadius: '6px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#212529',
          }}
        >
          Federal Filing Trends (2015–2024)
        </h3>
        <p style={{ color: '#4B5563', fontSize: '13px', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          Total federal civil case filings over the past decade
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={nationalTrends}>
            <defs>
              <linearGradient id="colorFilings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6D28D9" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F7F8FA" />
            <XAxis dataKey="year" stroke="#4B5563" tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <YAxis stroke="#4B5563" tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="totalFilings"
              stroke="#6D28D9"
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
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
          borderRadius: '6px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#212529',
          }}
        >
          Win Rate Trends by Category (2018–2024)
        </h3>
        <p style={{ color: '#4B5563', fontSize: '13px', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          Plaintiff win rate trends across top case categories
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={categoryTrends[0]?.years ? buildCombinedCategoryData(categoryTrends) : []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F7F8FA" />
            <XAxis dataKey="year" stroke="#4B5563" tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <YAxis stroke="#4B5563" domain={[0, 100]} tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '13px', fontFamily: 'var(--font-body)', color: '#4B5563' }} />
            {categoryTrends.map((cat, idx) => (
              <Line
                key={cat.category}
                type="monotone"
                dataKey={cat.categoryLabel}
                stroke={
                  [
                    '#7C3AED',
                    '#1B3A5C',
                    '#6D28D9',
                    '#4B5563',
                    '#E5E7EB',
                    '#0080B8',
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
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
          borderRadius: '6px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#212529',
          }}
        >
          Top 15 Case Types by Filing Volume
        </h3>
        <p style={{ color: '#4B5563', fontSize: '13px', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          Most frequently filed federal civil case types
        </p>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={caseTypeChartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 300, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F7F8FA" />
            <XAxis type="number" stroke="#4B5563" tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <YAxis dataKey="label" type="category" stroke="#4B5563" width={300} tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#6D28D9" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Settlement Rate Trends - Area Chart */}
      <div
        className="p-6 border"
        style={{
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
          borderRadius: '6px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#212529',
          }}
        >
          Settlement Rate Trends (2015–2024)
        </h3>
        <p style={{ color: '#4B5563', fontSize: '13px', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          Percentage of federal civil cases resolved through settlement over time
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={nationalTrends}>
            <defs>
              <linearGradient id="colorSettlement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F7F8FA" />
            <XAxis dataKey="year" stroke="#4B5563" tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <YAxis stroke="#4B5563" domain={[0, 100]} tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="avgSettlementRate"
              stroke="#10B981"
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
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
          borderRadius: '6px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#212529',
          }}
        >
          Circuit Court Win Rates
        </h3>
        <p style={{ color: '#4B5563', fontSize: '13px', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          Average plaintiff win rate by federal circuit
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={circuitWinRates}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F7F8FA" />
            <XAxis type="number" domain={[0, 100]} stroke="#4B5563" tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <YAxis dataKey="circuit" type="category" stroke="#4B5563" width={120} tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <p style={{ color: '#212529', fontSize: '13px', fontWeight: 600, margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                        {payload[0].payload.circuit}
                      </p>
                      <p style={{ color: '#6D28D9', fontSize: '12px', margin: '4px 0', fontFamily: 'var(--font-body)' }}>
                        Win Rate: {payload[0].value}%
                      </p>
                      <p style={{ color: '#4B5563', fontSize: '12px', margin: '4px 0', fontFamily: 'var(--font-body)' }}>
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
                <Cell key={index} fill={entry.avgWinRate > 55 ? '#10B981' : entry.avgWinRate < 45 ? '#7C3AED' : '#6D28D9'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Case Outcome Distribution - Horizontal Bar Chart */}
      <div
        className="p-6 border"
        style={{
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
          borderRadius: '6px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#212529',
          }}
        >
          How Cases End
        </h3>
        <p style={{ color: '#4B5563', fontSize: '13px', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          Distribution of case outcomes across all federal civil cases
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={outcomeBreakdown}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F7F8FA" />
            <XAxis type="number" stroke="#4B5563" tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <YAxis dataKey="outcome" type="category" stroke="#4B5563" width={150} tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <p style={{ color: '#212529', fontSize: '13px', fontWeight: 600, margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                        {payload[0].payload.outcome}
                      </p>
                      <p style={{ color: payload[0].payload.color, fontSize: '12px', margin: '4px 0', fontFamily: 'var(--font-body)' }}>
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
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
          borderRadius: '6px',
        }}
      >
        <h3
          className="text-lg font-semibold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: '#212529',
          }}
        >
          Settlement vs. Trial Duration by Category
        </h3>
        <p style={{ color: '#4B5563', fontSize: '13px', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          Average case duration for settlement versus trial across case categories
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={settlementDurations}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F7F8FA" />
            <XAxis type="number" stroke="#4B5563" tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <YAxis dataKey="category" type="category" stroke="#4B5563" width={120} tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '13px', fontFamily: 'var(--font-body)', color: '#4B5563' }} />
            <Bar dataKey="settlementMonths" fill="#10B981" radius={[0, 4, 4, 0]} />
            <Bar dataKey="trialMonths" fill="#7C3AED" radius={[0, 4, 4, 0]} />
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
