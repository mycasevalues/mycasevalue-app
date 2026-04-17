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
    <div style={{ padding: '24px', background: 'var(--color-surface-0)', borderRadius: '4px' }}>
      <h3
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
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
            background: 'var(--color-surface-1)',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            API Keys Generated
          </p>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              margin: 0,
            }}
          >
            {mockMetrics.totalKeys}
          </p>
        </div>

        <div
          style={{
            padding: '16px',
            background: 'var(--color-surface-1)',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Requests (Last 24h)
          </p>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              margin: 0,
            }}
          >
            {mockMetrics.requests24h.toLocaleString()}
          </p>
        </div>

        <div
          style={{
            padding: '16px',
            background: 'var(--color-surface-1)',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Rate Limit Violations (1h)
          </p>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: mockMetrics.rateLimitViolations > 0 ? 'var(--data-negative, #B01E1E)' : 'var(--data-positive, #176438)',
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
            fontFamily: 'var(--font-ui)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginTop: 0,
            marginBottom: '12px',
          }}
        >
          Top 5 Endpoints by Request Volume
        </h4>
        <div
          style={{
            background: 'var(--color-surface-1)',
            borderRadius: '4px',
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
                    ? '1px solid var(--border-default)'
                    : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
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
                    background: 'var(--border-default)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${endpoint.percentage}%`,
                      background: 'var(--accent-primary)',
                      transition: 'width 200ms ease',
                    }}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {endpoint.requests}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
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
            fontFamily: 'var(--font-ui)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginTop: 0,
            marginBottom: '12px',
          }}
        >
          Top 5 API Key Users by Request Count
        </h4>
        <div
          style={{
            background: 'var(--color-surface-1)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {mockUsers.map((user, idx) => (
            <div
              key={user.name}
              style={{
                padding: '12px 16px',
                borderBottom:
                  idx < mockUsers.length - 1 ? '1px solid var(--border-default)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
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
                    background: 'var(--border-default)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${user.percentage}%`,
                      background: 'var(--data-positive, #176438)',
                      transition: 'width 200ms ease',
                    }}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {user.requests}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
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
            background: 'rgba(59,130,246,0.08)',
            border: '1px solid var(--link-light, #BAE6FD)',
            borderRadius: '4px',
            fontSize: '0.75rem',
            color: 'var(--link, #0A50A2)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          Currently showing mock data. Connect to Supabase to view real metrics.
        </div>
      )}
    </div>
  );
}
