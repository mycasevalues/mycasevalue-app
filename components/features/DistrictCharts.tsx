'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { DistrictStats } from '../../lib/districts';

interface DistrictChartsProps {
  stats: DistrictStats;
}

const PURPLE_PALETTE = ['#1856FF', '#3D72FF', '#A78BFA', '#C4B5FD', '#DDD6FE', 'rgba(24,86,255,0.12)', '#6D28D9', '#5B21B6', '#4C1D95', '#F5F3FF', '#818CF8'];

export default function DistrictCharts({ stats }: DistrictChartsProps) {
  // Prepare data for top case types chart (take top 8)
  const topCaseTypesData = stats.topCaseTypes.slice(0, 8).map((ct) => ({
    label: ct.label,
    count: ct.count,
    winRate: ct.winRate,
  }));

  // Prepare data for category breakdown pie chart
  const categoryData = stats.caseTypeBreakdown.map((item) => ({
    name: item.category,
    value: item.count,
  }));

  return (
    <div className="space-y-8">
      {/* Top Case Types Bar Chart */}
      {topCaseTypesData.length > 0 && (
        <div
          className="rounded-[12px] p-6 sm:p-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <h3
            className="text-lg font-bold mb-6"
            style={{
              color: '#1F2937',
              fontFamily: "'Roboto', system-ui, sans-serif",
            }}
          >
            Top Case Types by Volume
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topCaseTypesData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="label" type="category" width={200} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#1856FF" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category Breakdown Pie Chart */}
      {categoryData.length > 0 && (
        <div
          className="rounded-[12px] p-6 sm:p-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <h3
            className="text-lg font-bold mb-6"
            style={{
              color: '#1F2937',
              fontFamily: "'Roboto', system-ui, sans-serif",
            }}
          >
            Case Distribution by Category
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PURPLE_PALETTE[index % PURPLE_PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Cases']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => value}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
