'use client';

import { useEffect, useState } from 'react';

interface CostService {
  name: string;
  icon: string;
  color: string;
  currentSpend: number;
  monthlyBudget: number;
  usagePercentage: number;
  status: 'ok' | 'warning' | 'critical';
  lastMonthSpend: number;
  momChange: number;
}

interface CostData {
  services: CostService[];
  totalSpend: number;
  totalBudget: number;
  projectedEOM: number;
  generatedAt: string;
}

const COLORS = {
  primary: 'var(--accent-primary)',
  dark: 'var(--accent-primary-hover)',
  black: 'var(--color-text-primary)',
};

const STATUS_COLORS = {
  ok: '#10b981',
  warning: '#f59e0b',
  critical: '#ef4444',
};

export default function CostMonitor() {
  const [costData, setCostData] = useState<CostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const response = await fetch('/api/admin/costs');
        if (!response.ok) {
          throw new Error('Failed to fetch cost data');
        }
        const data = await response.json();
        setCostData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCostData();
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: 'white', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '24px' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading cost data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: 'rgba(239,68,68,0.06)',
          border: '1px solid var(--data-negative-border, #FCA5A5)',
          borderRadius: '4px',
          padding: '24px',
          color: 'var(--data-negative)',
        }}
      >
        <p>Error loading cost data: {error}</p>
      </div>
    );
  }

  if (!costData) {
    return null;
  }

  return (
    <div>
      {/* Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--text3, #78766C)', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
            Current Monthly Spend
          </p>
          <p style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: COLORS.primary }}>
            ${costData.totalSpend.toFixed(2)}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '8px 0 0 0' }}>
            Budget: ${costData.totalBudget.toFixed(2)}
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--text3, #78766C)', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
            Budget Utilization
          </p>
          <p style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: COLORS.primary }}>
            {((costData.totalSpend / costData.totalBudget) * 100).toFixed(1)}%
          </p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '8px 0 0 0' }}>
            ${(costData.totalBudget - costData.totalSpend).toFixed(2)} remaining
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--text3, #78766C)', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
            Projected EOMonth
          </p>
          <p style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: COLORS.primary }}>
            ${costData.projectedEOM.toFixed(2)}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '8px 0 0 0' }}>
            Based on daily run rate
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {costData.services.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-0)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '4px',
          padding: '16px',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
        }}
      >
        <p style={{ margin: 0 }}>Last updated: {new Date(costData.generatedAt).toLocaleString()}</p>
        <p style={{ margin: '8px 0 0 0' }}>Note: These are estimated costs based on current usage. Actual billing may vary.</p>
      </div>
    </div>
  );
}

interface ServiceCardProps {
  service: CostService;
}

function ServiceCard({ service }: ServiceCardProps) {
  const statusColor = STATUS_COLORS[service.status];

  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid var(--border-default)',
        borderRadius: '4px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--color-text-primary)' }}>
            {service.icon} {service.name}
          </h3>
        </div>
        <div
          style={{
            backgroundColor: statusColor,
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          {service.status === 'ok' && 'OK'}
          {service.status === 'warning' && 'Warning'}
          {service.status === 'critical' && 'Critical'}
        </div>
      </div>

      {/* Spend Info */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Current Spend</span>
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
            ${service.currentSpend.toFixed(2)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Monthly Limit</span>
          <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>${service.monthlyBudget.toFixed(2)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderRadius: '4px',
            height: '8px',
            overflow: 'hidden',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: statusColor,
              height: '100%',
              width: `${Math.min(service.usagePercentage, 100)}%`,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Usage</span>
          <span style={{ fontSize: '12px', fontWeight: '600', color: statusColor }}>
            {service.usagePercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* MoM Change */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '4px',
          padding: '12px',
          fontSize: '12px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>vs Last Month</span>
          <span
            style={{
              fontWeight: '600',
              color: service.momChange > 0 ? 'var(--data-negative)' : 'var(--data-positive)',
            }}
          >
            {service.momChange > 0 ? '+' : ''}{service.momChange.toFixed(2)}%
          </span>
        </div>
        <p style={{ margin: '6px 0 0 0', color: 'var(--color-text-secondary)', fontSize: '12px' }}>
          Last month: ${service.lastMonthSpend.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
