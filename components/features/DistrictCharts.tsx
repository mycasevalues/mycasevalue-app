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

const CHART_PALETTE = ['#0A66C2', '#70B5F9', '#666666', '#4B5563', '#E5E7EB', '#057642', '#C37D16', '#CC1016', '#70B5F9', '#057642', '#666666'];

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
          className="p-6 sm:p-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
          }}
        >
          <h3
            className="text-lg font-bold mb-6"
            style={{
              color: '#0f0f0f',
              fontFamily: 'var(--font-display)',
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
              <XAxis type="number" stroke="#4B5563" />
              <YAxis dataKey="label" type="category" width={200} tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }} />
              <Tooltip
                contentStyle={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  color: '#0f0f0f',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="count" fill="#0A66C2" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category Breakdown Pie Chart */}
      {categoryData.length > 0 && (
        <div
          className="p-6 sm:p-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
          }}
        >
          <h3
            className="text-lg font-bold mb-6"
            style={{
              color: '#0f0f0f',
              fontFamily: 'var(--font-display)',
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
                  <Cell key={`cell-${index}`} fill={CHART_PALETTE[index % CHART_PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  color: '#0f0f0f',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Cases']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: '13px', fontFamily: 'var(--font-body)', color: '#4B5563' }}
                formatter={(value) => value}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
