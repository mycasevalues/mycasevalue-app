'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DistrictStats } from '../../lib/districts';
import HorizontalBarChart from '../charts/HorizontalBarChart';

interface DistrictChartsProps {
  stats: DistrictStats;
}

export default function DistrictCharts({ stats }: DistrictChartsProps) {
  // Prepare data for top case types chart (take top 8)
  const topCaseTypesData = stats.topCaseTypes.slice(0, 8).map((ct) => ({
    label: ct.label,
    count: ct.count,
    winRate: ct.winRate,
  }));

  // Prepare data for category breakdown — HorizontalBarChart format
  const totalCases = stats.caseTypeBreakdown.reduce((sum, item) => sum + item.count, 0);
  const categoryBarData = stats.caseTypeBreakdown.map((item) => ({
    label: item.category,
    percentage: totalCases > 0 ? (item.count / totalCases) * 100 : 0,
  }));

  return (
    <div className="space-y-8">
      {/* Top Case Types Bar Chart */}
      {topCaseTypesData.length > 0 && (
        <div
          className="p-6 sm:p-8"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: '4px',
          }}
        >
          <h3
 className="mb-6"
 style={{ color: 'var(--text1)',
 fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 700 }}
 >
            Top Case Types by Volume
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topCaseTypesData}
              layout="vertical"
              margin={{ top: 4, right: 32, left: 200, bottom: 5 }}
            >
              <XAxis type="number" stroke="var(--text2)" />
              <YAxis dataKey="label" type="category" width={200} tick={{ fontSize: 12, fill: 'var(--text2)', fontFamily: 'var(--font-ui)' }} />
              <Tooltip
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--bdr)',
                  borderRadius: '4px',
                  color: 'var(--text1)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '14px',
                }}
              />
              <Bar dataKey="count" fill="var(--link)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category Breakdown — HorizontalBarChart */}
      {categoryBarData.length > 0 && (
        <div
          className="p-6 sm:p-8"
          style={{
            background: 'var(--card, #FFFFFF)',
            border: '1px solid var(--bdr, #E2E0DA)',
            borderRadius: 2,
          }}
        >
          <HorizontalBarChart
            data={categoryBarData}
            title="Case Distribution by Category"
            animate
            dataSources="PACER filing records"
          />
        </div>
      )}
    </div>
  );
}
