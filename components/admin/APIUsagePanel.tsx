'use client';

import { useMemo } from 'react';

interface EndpointUsage {
  endpoint: string;
  requests: number;
  percentage: number;
}

interface ApiKeyUser {
  name: string;
  requests: number;
  percentage: number;
}

interface APIUsagePanelProps {
  mockMode?: boolean;
}

export default function APIUsagePanel({ mockMode = true }: APIUsagePanelProps) {
  // Mock data for demonstration
  const mockMetrics = {
    totalKeys: 47,
    requests24h: 2341,
    rateLimitViolations: 3,
  };

  const mockEndpoints: EndpointUsage[] = useMemo(() => {
    const endpoints = [
      { endpoint: 'GET /api/v1/cases/nos/[code]', requests: 892 },
      { endpoint: 'GET /api/v1/judges/search', requests: 543 },
      { endpoint: 'POST /api/v1/predict', requests: 421 },
      { endpoint: 'GET /api/v1/districts/[district]', requests: 312 },
      { endpoint: 'GET /api/v1/judges/[judgeId]', requests: 173 },
    ];

    const total = endpoints.reduce((sum, e) => sum + e.requests, 0);
    return endpoints.map((e) => ({
      ...e,
      percentage: Math.round((e.requests / total) * 100),
    }));
  }, []);

  const mockUsers: ApiKeyUser[] = useMemo(() => {
    const users = [
      { name: 'integration-prod', requests: 1245 },
      { name: 'internal-analytics', requests: 456 },
      { name: 'third-party-app', requests: 321 },
      { name: 'research-team', requests: 187 },
      { name: 'mobile-client', requests: 132 },
    ];

    const total = users.reduce((sum, u) => sum + u.requests, 0);
    return users.map((u) => ({
      ...u,
      percentage: Math.round((u.requests / total) * 100),
    }));
  }, []);

  return (
    <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: '12px' }}>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#0f0f0f',
          marginTop: 0,
          marginBottom: '24px',
        }}
      >
        API Usage & Metrics
      </h3>

      {/* Key Metrics */}
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
            padding: '16px',
            background: '#F7F8FA',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#6B7280', margin: 0, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            API Keys Generated
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: '#0A66C2',
              margin: 0,
            }}
          >
            {mockMetrics.totalKeys}
          </p>
        </div>

        <div
          style={{
            padding: '16px',
            background: '#F7F8FA',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#6B7280', margin: 0, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Requests (Last 24h)
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: '#0A66C2',
              margin: 0,
            }}
          >
            {mockMetrics.requests24h.toLocaleString()}
          </p>
        </div>

        <div
          style={{
            padding: '16px',
            background: '#F7F8FA',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#6B7280', margin: 0, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Rate Limit Violations (1h)
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: mockMetrics.rateLimitViolations > 0 ? '#DC2626' : '#059669',
              margin: 0,
            }}
          >
            {mockMetrics.rateLimitViolations}
          </p>
        </div>
      </div>

      {/* Top Endpoints */}
      <div style={{ marginBottom: '32px' }}>
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#0f0f0f',
            marginTop: 0,
            marginBottom: '12px',
          }}
        >
          Top 5 Endpoints by Request Volume
        </h4>
        <div
          style={{
            background: '#F7F8FA',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {mockEndpoints.map((endpoint, idx) => (
            <div
              key={endpoint.endpoint}
              style={{
                padding: '12px 16px',
                borderBottom:
                  idx < mockEndpoints.length - 1
                    ? '1px solid #E5E7EB'
                    : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#0f0f0f',
                    margin: 0,
                    marginBottom: '4px',
                  }}
                >
                  {endpoint.endpoint}
                </p>
                <div
                  style={{
                    width: '200px',
                    height: '6px',
                    background: '#E5E7EB',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${endpoint.percentage}%`,
                      background: '#0A66C2',
                      transition: 'width 200ms ease',
                    }}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: 0,
                  }}
                >
                  {endpoint.requests}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: '#6B7280',
                    margin: 0,
                  }}
                >
                  {endpoint.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top API Key Users */}
      <div>
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#0f0f0f',
            marginTop: 0,
            marginBottom: '12px',
          }}
        >
          Top 5 API Key Users by Request Count
        </h4>
        <div
          style={{
            background: '#F7F8FA',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {mockUsers.map((user, idx) => (
            <div
              key={user.name}
              style={{
                padding: '12px 16px',
                borderBottom:
                  idx < mockUsers.length - 1 ? '1px solid #E5E7EB' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#0f0f0f',
                    margin: 0,
                    marginBottom: '4px',
                  }}
                >
                  {user.name}
                </p>
                <div
                  style={{
                    width: '200px',
                    height: '6px',
                    background: '#E5E7EB',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${user.percentage}%`,
                      background: '#059669',
                      transition: 'width 200ms ease',
                    }}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: 0,
                  }}
                >
                  {user.requests}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: '#6B7280',
                    margin: 0,
                  }}
                >
                  {user.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mockMode && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            background: '#DBEAFE',
            border: '1px solid #93C5FD',
            borderRadius: '6px',
            fontSize: '0.75rem',
            color: '#1E40AF',
            fontFamily: 'var(--font-body)',
          }}
        >
          Currently showing mock data. Connect to Supabase to view real metrics.
        </div>
      )}
    </div>
  );
}
