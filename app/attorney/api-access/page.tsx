import { Metadata } from 'next';
import Link from 'next/link';
import APIAccessForm from '@/components/APIAccessForm';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'API Access — Developer Documentation',
  description: 'Access programmatic APIs to get case statistics, win rates, settlement data, and predictive analytics. Complete API documentation with cURL examples.',
  alternates: {
    canonical: `${SITE_URL}/attorney/api-access`,
  },
  openGraph: {
    title: 'API Access — Developer Documentation',
    description: 'Programmatic access to case statistics, win rates, and predictive analytics.',
    url: `${SITE_URL}/attorney/api-access`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Access — Developer Documentation',
    description: 'Programmatic access to case statistics, win rates, and predictive analytics.',
  },
  keywords: [
    'API',
    'developer',
    'case data',
    'win rates',
    'settlement data',
    'case prediction',
    'REST API',
    'integration',
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
  curlExample: string;
  responseExample: string;
  errorCodes: Array<{
    code: number;
    message: string;
  }>;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/cases/nos/{code}',
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
    curlExample: `curl -X GET "https://www.mycasevalues.com/api/v1/cases/nos/442?state=CA" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
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
    errorCodes: [
      { code: 400, message: 'Invalid NOS code or state parameter' },
      { code: 401, message: 'Unauthorized - invalid or missing API key' },
      { code: 404, message: 'NOS code not found' },
      { code: 429, message: 'Rate limit exceeded (100 req/min)' },
      { code: 500, message: 'Server error' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/cases/nos/{code}/district/{district}',
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
    curlExample: `curl -X GET "https://www.mycasevalues.com/api/v1/cases/nos/442/district/C.D.%20Cal." \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
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
    errorCodes: [
      { code: 400, message: 'Invalid NOS code or district format' },
      { code: 401, message: 'Unauthorized' },
      { code: 404, message: 'District or NOS code not found' },
      { code: 429, message: 'Rate limit exceeded' },
      { code: 500, message: 'Server error' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/districts/{district}',
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
    curlExample: `curl -X GET "https://www.mycasevalues.com/api/v1/districts/C.D.%20Cal.?limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
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
    },
    {
      "nos_code": "441",
      "description": "Personal Injury - Other",
      "case_count": 1834,
      "win_rate": 58.7,
      "settlement_median": 95000
    }
  ]
}`,
    errorCodes: [
      { code: 400, message: 'Invalid district format' },
      { code: 401, message: 'Unauthorized' },
      { code: 404, message: 'District not found' },
      { code: 429, message: 'Rate limit exceeded' },
      { code: 500, message: 'Server error' },
    ],
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
      {
        name: 'prior_offers',
        type: 'boolean',
        required: false,
        description: 'Whether settlement offers have been made',
      },
      {
        name: 'documented_evidence',
        type: 'boolean',
        required: false,
        description: 'Whether case has documented evidence',
      },
    ],
    curlExample: `curl -X POST "https://www.mycasevalues.com/api/v1/predict" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nos_code": "442",
    "district": "C.D. Cal.",
    "has_attorney": true,
    "damage_amount": "large",
    "case_strength": "strong",
    "prior_offers": false,
    "documented_evidence": true
  }'`,
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
      "factor": "documented_evidence",
      "impact": "positive",
      "strength": "high"
    },
    {
      "factor": "has_attorney",
      "impact": "positive",
      "strength": "moderate"
    }
  ],
  "methodology": "Trained on 150K+ federal cases from 2015-2025"
}`,
    errorCodes: [
      { code: 400, message: 'Missing required fields or invalid values' },
      { code: 401, message: 'Unauthorized' },
      { code: 422, message: 'Invalid prediction parameters' },
      { code: 429, message: 'Rate limit exceeded' },
      { code: 500, message: 'Server error' },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: 'var(--data-positive)',
  POST: 'var(--gold)',
  PUT: 'var(--wrn-txt)',
  DELETE: 'var(--data-negative)',
};

export default function ApiAccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-ui)' }}>
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
        background: 'var(--card)',
        color: 'var(--card)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0,
              fontFamily: 'var(--font-heading)',
            }}
          >
            API Access
          </h1>
          <p style={{ fontSize: '14px', color: '#B0B8C0', margin: '8px 0 0 0' }}>
            Programmatic access to case statistics and predictive analytics
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* What the API Provides */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            What the API Provides
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {[
              {
                icon: '',
                title: 'Win Rates',
                desc: 'National and district-specific win rates by case type',
              },
              {
                icon: '',
                title: 'Settlement Data',
                desc: 'Median, low, and high settlement ranges',
              },
              {
                icon: '',
                title: 'Case Counts',
                desc: 'Volume of cases by type, jurisdiction, and outcome',
              },
              {
                icon: '',
                title: 'District Analytics',
                desc: 'Case trends, judge performance, and litigation patterns',
              },
              {
                icon: '',
                title: 'Predictive Analytics',
                desc: 'AI-powered outcome predictions based on case factors',
              },
              {
                icon: '',
                title: 'Judge Intelligence',
                desc: 'Individual judge statistics and decision patterns',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--color-surface-0)',
                  borderRadius: '4px',
                  padding: '16px',
                  border: '1px solid var(--border-default)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{item.icon}</div>
                <h3
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Base URL */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Base URL
          </h2>
          <div
            style={{
              background: 'var(--color-surface-0)',
              borderRadius: '4px',
              padding: '16px',
              border: '1px solid var(--border-default)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-surface-0)',
                padding: '8px 12px',
                borderRadius: '4px',
                display: 'block',
                wordBreak: 'break-all',
              }}
            >
              https://www.mycasevalues.com/api/v1
            </code>
          </div>
        </section>

        {/* Endpoints */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Endpoints
          </h2>

          {ENDPOINTS.map((endpoint, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-surface-0)',
                borderRadius: '4px',
                border: '1px solid var(--border-default)',
                overflow: 'hidden',
                marginBottom: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {/* Endpoint Header */}
              <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '4px',
                      backgroundColor: `${methodColors[endpoint.method]}20`,
                      color: methodColors[endpoint.method],
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
                      backgroundColor: 'var(--color-surface-0)',
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
                <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border-default)' }}>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {endpoint.params.map((param, pidx) => (
                      <div key={pidx} style={{ fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
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
                                color: 'var(--data-negative)',
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

              {/* cURL Example */}
              <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border-default)' }}>
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
                  Example Request (cURL)
                </h4>
                <pre
                  style={{
                    margin: 0,
                    padding: '12px 14px',
                    backgroundColor: 'var(--chrome-bg)',
                    color: '#D4D4D4',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-mono)',
                    overflowX: 'auto',
                    borderRadius: '4px',
                  }}
                >
                  {endpoint.curlExample}
                </pre>
              </div>

              {/* Response Example */}
              <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border-default)' }}>
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
                  Example Response (JSON)
                </h4>
                <pre
                  style={{
                    margin: 0,
                    padding: '12px 14px',
                    backgroundColor: 'var(--chrome-bg)',
                    color: '#D4D4D4',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-mono)',
                    overflowX: 'auto',
                    borderRadius: '4px',
                  }}
                >
                  {endpoint.responseExample}
                </pre>
              </div>

              {/* Error Codes */}
              <div style={{ padding: '24px 24px' }}>
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
                  Error Codes
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {endpoint.errorCodes.map((error, eidx) => (
                    <div
                      key={eidx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '8px 12px',
                        backgroundColor: 'var(--color-surface-0)',
                        borderRadius: '4px',
                        borderLeft: `3px solid ${error.code >= 500 ? 'var(--data-negative)' : error.code >= 400 ? 'var(--wrn-txt)' : 'var(--data-positive)'}`,
                      }}
                    >
                      <code
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          minWidth: '35px',
                        }}
                      >
                        {error.code}
                      </code>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>{error.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Authentication */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Authentication
          </h2>
          <div
            style={{
              background: 'var(--color-surface-0)',
              borderRadius: '4px',
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
                backgroundColor: 'var(--chrome-bg)',
                color: '#D4D4D4',
                fontSize: '12px',
                lineHeight: 1.5,
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto',
                borderRadius: '4px',
              }}
            >
              {`Authorization: Bearer YOUR_API_KEY`}
            </pre>
          </div>
        </section>

        {/* Rate Limits */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Rate Limits
          </h2>
          <div
            style={{
              background: 'var(--color-surface-0)',
              borderRadius: '4px',
              padding: '24px',
              border: '1px solid var(--border-default)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Requests per Minute', value: '100' },
                { label: 'Requests per Day', value: '100,000' },
                { label: 'Rate Limit Status', value: 'Headers Included' },
              ].map((item, idx) => (
                <div key={idx}>
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      margin: '0 0 16px',
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '16px 0 0' }}>
              During beta, rate limits are 100 requests per minute. Contact us to request higher limits.
            </p>
          </div>
        </section>

        {/* API Access Request Form */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Request API Access
          </h2>
          <APIAccessForm />
        </section>
      </div>
    </div>
  );
}
