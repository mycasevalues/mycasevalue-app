import { Metadata } from 'next';
import Link from 'next/link';
import CodeExampleTabs from '@/components/CodeExampleTabs';
import APISandbox from '@/components/APISandbox';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'API & Integrations — REST API | Developer Portal',
  description: 'Comprehensive REST API documentation for MyCaseValue. Integrate case statistics, win rates, settlement data, and predictive analytics into your platform. Bearer token authentication, rate limits, interactive sandbox, and code examples included.',
  alternates: {
    canonical: `${SITE_URL}/developers`,
  },
  openGraph: {
    title: 'API & Integrations — Developer Portal',
    description: 'REST API for case data, win rates, settlement analytics, and predictive intelligence.',
    url: `${SITE_URL}/developers`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API & Integrations — Developer Portal',
    description: 'REST API for case data, win rates, settlement analytics, and predictive intelligence.',
  },
  keywords: [
    'API',
    'REST API',
    'developer',
    'integration',
    'case data',
    'win rates',
    'settlement data',
    'predictive analytics',
    'case prediction',
    'developer portal',
  ],
};

interface Endpoint {
  method: string;
  path: string;
  description: string;
  params: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  responseExample: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/cases/nos/:code',
    description: 'Get comprehensive statistics for a specific case type (NOS code)',
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: 'Nature of Suit (NOS) code (e.g., "442" for personal injury)',
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: 'State code (e.g., "CA", "NY"). If omitted, returns national data.',
      },
    ],
    responseExample: `{
  "nos_code": "442",
  "description": "Personal Injury - Motor Vehicle",
  "state": "CA",
  "statistics": {
    "total_cases": 15234,
    "win_rate": 62.5,
    "settlement_rate": 78.3,
    "average_settlement": 185000,
    "median_settlement": 125000,
    "settlement_range": {
      "low": 45000,
      "median": 125000,
      "high": 450000
    },
    "trial_win_rate": 68.2,
    "average_duration_days": 524
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/cases/nos/:code/district/:district',
    description: 'Get case statistics filtered by federal district and case type',
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: 'Nature of Suit (NOS) code',
      },
      {
        name: 'district',
        type: 'string',
        required: true,
        description: 'Federal district code (e.g., "C.D. Cal." or "S.D.N.Y.")',
      },
    ],
    responseExample: `{
  "nos_code": "442",
  "district": "C.D. Cal.",
  "statistics": {
    "total_cases": 2156,
    "win_rate": 64.2,
    "settlement_range": {
      "low": 50000,
      "median": 140000,
      "high": 520000
    },
    "disposition_breakdown": {
      "settled": 1689,
      "trial_win": 234,
      "trial_loss": 128,
      "dismissed": 105
    }
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/districts/:district',
    description: 'Get aggregated case statistics for a federal district across all case types',
    params: [
      {
        name: 'district',
        type: 'string',
        required: true,
        description: 'Federal district code (e.g., "C.D. Cal." or "N.D. Ill.")',
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: 'Limit results to top N case types by volume (default: 20)',
      },
    ],
    responseExample: `{
  "district": "C.D. Cal.",
  "total_cases": 28456,
  "case_types": [
    {
      "nos_code": "442",
      "description": "Personal Injury - Motor Vehicle",
      "case_count": 2156,
      "win_rate": 64.2,
      "settlement_median": 140000
    }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/judges/:judgeId',
    description: 'Get performance statistics and decision patterns for a specific judge',
    params: [
      {
        name: 'judgeId',
        type: 'string',
        required: true,
        description: 'Unique judge identifier or name',
      },
    ],
    responseExample: `{
  "judge_id": "judge_001",
  "name": "Hon. Jane Smith",
  "district": "C.D. Cal.",
  "statistics": {
    "total_cases": 342,
    "plaintiff_win_rate": 58.5,
    "average_settlement": 185000,
    "average_trial_duration_days": 187,
    "most_common_case_types": ["442", "440"]
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/judges/search',
    description: 'Search for judges by name, district, or other criteria',
    params: [
      {
        name: 'q',
        type: 'string',
        required: true,
        description: 'Search query (judge name, district, or keyword)',
      },
      {
        name: 'district',
        type: 'string',
        required: false,
        description: 'Filter results by federal district',
      },
    ],
    responseExample: `{
  "results": [
    {
      "judge_id": "judge_001",
      "name": "Hon. Jane Smith",
      "district": "C.D. Cal.",
      "case_count": 342,
      "plaintiff_win_rate": 58.5
    }
  ],
  "total": 1
}`,
  },
  {
    method: 'POST',
    path: '/api/v1/predict',
    description: 'Predict case outcome, settlement range, and trial win rate based on case factors',
    params: [
      {
        name: 'nos_code',
        type: 'string',
        required: true,
        description: 'Nature of Suit code',
      },
      {
        name: 'district',
        type: 'string',
        required: false,
        description: 'Federal district for district-specific prediction',
      },
      {
        name: 'has_attorney',
        type: 'boolean',
        required: true,
        description: 'Whether the plaintiff has legal representation',
      },
      {
        name: 'damage_amount',
        type: 'string',
        required: true,
        description: 'Damage claim range: "small" | "mid" | "large" | "xlarge" | "huge"',
      },
      {
        name: 'case_strength',
        type: 'string',
        required: true,
        description: 'Assessed case strength: "weak" | "moderate" | "strong"',
      },
    ],
    responseExample: `{
  "prediction": {
    "predicted_win_rate": 67,
    "confidence_level": "high",
    "settlement_range": {
      "low": 125000,
      "median": 275000,
      "high": 650000
    },
    "trial_win_rate": 71,
    "expected_duration_days": 487,
    "settlement_probability": 0.78
  },
  "factors": [
    {
      "factor": "has_attorney",
      "impact": "positive",
      "strength": "moderate"
    }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/trends/nos/:code',
    description: 'Get historical trends and growth patterns for a specific case type',
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: 'Nature of Suit (NOS) code',
      },
      {
        name: 'years',
        type: 'integer',
        required: false,
        description: 'Number of years of historical data (default: 5)',
      },
    ],
    responseExample: `{
  "nos_code": "442",
  "description": "Personal Injury - Motor Vehicle",
  "trends": [
    {
      "year": 2020,
      "total_cases": 12456,
      "avg_settlement": 165000,
      "win_rate": 61.2
    },
    {
      "year": 2021,
      "total_cases": 13142,
      "avg_settlement": 172000,
      "win_rate": 61.8
    }
  ]
}`,
  },
];

const methodColors: Record<string, string> = {
  GET: '#059669',
  POST: 'var(--accent-primary)',
  PUT: '#B86E00',
  DELETE: '#DC2626',
};

const errorCodes = [
  { code: 400, message: 'Bad Request — Invalid parameters or malformed request' },
  { code: 401, message: 'Unauthorized — Missing or invalid API key' },
  { code: 403, message: 'Forbidden — Insufficient permissions for this operation' },
  { code: 404, message: 'Not Found — Resource does not exist' },
  { code: 422, message: 'Unprocessable Entity — Invalid prediction parameters' },
  { code: 429, message: 'Too Many Requests — Rate limit exceeded' },
  { code: 500, message: 'Internal Server Error — Server error, try again later' },
];

const rateLimitTiers = [
  {
    name: 'Free',
    requestsPerMin: '100',
    requestsPerDay: '10,000',
    price: 'Free',
  },
  {
    name: 'Unlimited',
    requestsPerMin: '1,000',
    requestsPerDay: '100,000',
    price: 'Contact Sales',
  },
  {
    name: 'Enterprise',
    requestsPerMin: '10,000',
    requestsPerDay: 'Unlimited',
    price: 'Custom',
  },
];

export default function DevelopersPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      <style>{`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        input:focus, select:focus, textarea:focus { border-color: var(--accent-primary) !important; outline: none; box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08); }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
        code { font-family: var(--font-mono); }
        pre { font-family: var(--font-mono); }
      `}</style>

      {/* Hero Section */}
      <div style={{
        background: '#080d19',
        color: '#fff',
        padding: '48px 24px 40px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#60a5fa',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
            API & Integrations
          </div>
          <h1 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: 16,
            color: '#ffffff',
          }}>
            MyCaseValue REST API
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
            maxWidth: 640,
            margin: 0,
          }}>
            Programmatic access to federal case statistics, win rates, settlement data, and predictive analytics. <span style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>v1.0</span> · Bearer auth · JSON
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Quick Start */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 24px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Quick Start
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {[
              {
                label: 'Base URL',
                value: 'https://www.mycasevalues.com/api/v1',
              },
              {
                label: 'Authentication',
                value: 'Bearer Token (Header)',
              },
              {
                label: 'Format',
                value: 'JSON',
              },
              {
                label: 'Rate Limits',
                value: '100 req/min (Free)',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--color-surface-0)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid var(--border-default)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 8px',
                  }}
                >
                  {item.label}
                </p>
                <code
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--color-text-primary)',
                    wordBreak: 'break-word',
                    fontWeight: 500,
                  }}
                >
                  {item.value}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Endpoints Reference */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 24px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Endpoints Reference
          </h2>

          {ENDPOINTS.map((endpoint, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-surface-0)',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                overflow: 'hidden',
                marginBottom: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {/* Endpoint Header */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: `${methodColors[endpoint.method]}`,
                      color: 'var(--color-surface-0)',
                      minWidth: '45px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {endpoint.method}
                  </span>
                  <code
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: 'var(--color-text-primary)',
                      backgroundColor: 'var(--color-surface-1)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      wordBreak: 'break-all',
                      flex: 1,
                    }}
                  >
                    {endpoint.path}
                  </code>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0' }}>{endpoint.description}</p>
              </div>

              {/* Parameters */}
              {endpoint.params.length > 0 && (
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-default)' }}>
                  <h4
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      margin: '0 0 12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    Parameters
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {endpoint.params.map((param, pidx) => (
                      <div key={pidx} style={{ fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <code
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '12px',
                              color: 'var(--accent-primary)',
                              fontWeight: 600,
                            }}
                          >
                            {param.name}
                          </code>
                          <span
                            style={{
                              fontSize: '11px',
                              color: 'var(--color-text-secondary)',
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              padding: '2px 6px',
                              borderRadius: '3px',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {param.type}
                          </span>
                          {param.required && (
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                color: '#f87171',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                              }}
                            >
                              required
                            </span>
                          )}
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', margin: '0', fontSize: '12px' }}>{param.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Response Example */}
              <div style={{ padding: '20px 24px' }}>
                <h4
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Example Response
                </h4>
                <pre
                  style={{
                    margin: 0,
                    padding: '12px 14px',
                    backgroundColor: '#1a1a2e',
                    color: '#D4D4D4',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-mono)',
                    overflowX: 'auto',
                    borderRadius: '6px',
                  }}
                >
                  {endpoint.responseExample}
                </pre>
              </div>
            </div>
          ))}
        </section>

        {/* Authentication */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 24px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Authentication
          </h2>
          <div
            style={{
              background: 'var(--color-surface-0)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid var(--border-default)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 16px' }}>
              All API requests require authentication using a Bearer token in the Authorization header.
            </p>
            <pre
              style={{
                margin: 0,
                padding: '12px 14px',
                backgroundColor: '#1a1a2e',
                color: '#D4D4D4',
                fontSize: '12px',
                lineHeight: 1.5,
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto',
                borderRadius: '6px',
                marginBottom: '16px',
              }}
            >
              {`Authorization: Bearer YOUR_API_KEY`}
            </pre>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>
              To get an API key, visit your account settings or request access below. API keys should never be shared or committed to version control.
            </p>
          </div>
        </section>

        {/* Code Examples */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 24px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Code Examples
          </h2>
          <CodeExampleTabs />
        </section>

        {/* Rate Limits */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 24px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Rate Limits
          </h2>
          <div
            style={{
              background: 'var(--color-surface-0)',
              borderRadius: '12px',
              border: '1px solid var(--border-default)',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--color-surface-1)' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Tier
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Requests/Min
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Requests/Day
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Pricing
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rateLimitTiers.map((tier, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: idx < rateLimitTiers.length - 1 ? '1px solid var(--border-default)' : 'none',
                        background: idx % 2 === 0 ? 'var(--color-surface-0)' : 'var(--color-surface-1)',
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: 'var(--color-text-primary)', fontWeight: 500 }}>{tier.name}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>{tier.requestsPerMin}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>{tier.requestsPerDay}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>{tier.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '16px', margin: '16px 0 0' }}>
            Rate limit status is included in response headers: <code style={{ fontFamily: 'var(--font-mono)' }}>X-RateLimit-Remaining</code> and{' '}
            <code style={{ fontFamily: 'var(--font-mono)' }}>X-RateLimit-Reset</code>.
          </p>
        </section>

        {/* Error Codes */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 24px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Error Codes
          </h2>
          <div
            style={{
              background: 'var(--color-surface-0)',
              borderRadius: '12px',
              border: '1px solid var(--border-default)',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {errorCodes.map((error, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: 'var(--color-surface-1)',
                    borderRadius: '6px',
                    borderLeft: `3px solid ${error.code >= 500 ? '#DC2626' : error.code >= 400 ? '#F59E0B' : '#059669'}`,
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      minWidth: '45px',
                    }}
                  >
                    {error.code}
                  </code>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>{error.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Sandbox */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 24px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Interactive Sandbox
          </h2>
          <div
            style={{
              background: 'var(--color-surface-0)',
              borderRadius: '12px',
              border: '1px solid var(--border-default)',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 20px' }}>
                Test API endpoints directly in your browser. Requires a valid API key.
              </p>
              {/* APISandbox will be rendered here */}
              <APISandbox />
            </div>
          </div>
        </section>

        {/* Request API Access */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 24px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Get Started
          </h2>
          <div
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, #1e40af 100%)',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(10, 102, 194, 0.15)',
            }}
          >
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--color-surface-0)',
                margin: '0 0 12px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Ready to integrate?
            </h3>
            <p style={{ fontSize: '14px', color: '#B0B8C0', margin: '0 0 20px' }}>
              Request API access to start building with MyCaseValue data. Perfect for integrations, analysis tools, and enterprise applications.
            </p>
            <Link
              href="/solutions/enterprise"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-surface-0)',
                color: 'var(--accent-primary)',
                padding: '12px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                fontFamily: 'var(--font-heading)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Request API Access
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
