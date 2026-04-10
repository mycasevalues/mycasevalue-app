import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'API Documentation | MyCaseValue',
  description: 'Programmatic access to federal court outcome data. Enterprise-grade API with authentication, rate limiting, and comprehensive endpoints for case analytics.',
  alternates: { canonical: `${SITE_URL}/api-docs` },
  openGraph: {
    title: 'MyCaseValue API Documentation',
    description: 'Programmatic access to federal court outcome data with enterprise-grade APIs.',
    url: `${SITE_URL}/api-docs`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyCaseValue API Documentation',
    description: 'Programmatic access to federal court outcome data with enterprise-grade APIs.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  name: 'MyCaseValue API Documentation',
  description: 'Programmatic access to federal court outcome data',
  url: `${SITE_URL}/api-docs`,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'MyCaseValue API',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '0',
      description: 'API access to federal court case analytics',
    },
  },
};

export default function ApiDocsPage() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/nos/{code}',
      title: 'Get Case Type Analytics',
      description: 'Retrieve win rates, settlement data, and case outcome statistics for a specific case type (identified by Nature of Suit code).',
      example: 'GET /api/nos/110',
      curl: 'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.mycasevalue.com/api/nos/110',
      response: JSON.stringify({
        code: '110',
        name: 'Diversity - Insurance Contract',
        totalCases: 15324,
        winRate: 0.58,
        avgSettlement: 285000,
        medianSettlement: 175000,
        avgDuration: 1247,
        yearOverYearChange: 0.08,
      }, null, 2),
    },
    {
      method: 'GET',
      path: '/api/districts/{id}',
      title: 'Get District Court Statistics',
      description: 'Access comprehensive statistics for a specific federal district including case distribution, judge analytics, and outcome trends.',
      example: 'GET /api/districts/s-nd-ca',
      curl: 'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.mycasevalue.com/api/districts/s-nd-ca',
      response: JSON.stringify({
        id: 's-nd-ca',
        name: 'Southern District of California',
        judges: 28,
        activeCases: 8432,
        totalCases: 1850000,
        winRate: 0.52,
        avgSettlement: 320000,
        lastUpdated: '2024-03-15',
      }, null, 2),
    },
    {
      method: 'GET',
      path: '/api/trends',
      title: 'Get Filing Trend Data',
      description: 'Retrieve filing volume trends over time, seasonal patterns, and case type distribution across the federal system.',
      example: 'GET /api/trends?period=12m&interval=month',
      curl: 'curl -H "Authorization: Bearer YOUR_API_KEY" "https://api.mycasevalue.com/api/trends?period=12m&interval=month"',
      response: JSON.stringify({
        period: '12m',
        interval: 'month',
        data: [
          { date: '2023-04', filings: 12450, caseTypes: 230 },
          { date: '2023-05', filings: 13120, caseTypes: 235 },
        ],
      }, null, 2),
    },
    {
      method: 'POST',
      path: '/api/ai/predict',
      title: 'AI Case Outcome Prediction',
      description: 'Leverage machine learning to predict likely case outcomes based on case characteristics, judge history, and historical patterns.',
      example: 'POST /api/ai/predict',
      curl: 'curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d \'{"nos":"110","district":"s-nd-ca","judge":"J. Smith"}\' https://api.mycasevalue.com/api/ai/predict',
      response: JSON.stringify({
        predictedOutcome: 'settlement',
        confidence: 0.87,
        estimatedSettlement: 425000,
        estimatedDuration: 1380,
        riskFactors: ['high damages claimed', 'novel legal theory'],
      }, null, 2),
    },
    {
      method: 'POST',
      path: '/api/ai/search',
      title: 'Natural Language Case Search',
      description: 'Search the database using natural language queries. The API intelligently interprets your search intent and returns relevant cases.',
      example: 'POST /api/ai/search',
      curl: 'curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d \'{"query":"insurance contract dispute in california 2022-2024"}\' https://api.mycasevalue.com/api/ai/search',
      response: JSON.stringify({
        query: 'insurance contract dispute in california 2022-2024',
        results: [
          { caseId: '3:23-cv-01234', title: 'Smith v. Insurer Inc.', winRate: 0.63, settlement: 225000 },
          { caseId: '3:22-cv-05678', title: 'Corp A v. Insurer Inc.', winRate: 0.71, settlement: 580000 },
        ],
        totalMatches: 847,
      }, null, 2),
    },
    {
      method: 'GET',
      path: '/api/judges/{id}',
      title: 'Get Judge Analytics',
      description: 'Detailed analytics for individual judges including case history, decision patterns, settlement rates, and outcome trends.',
      example: 'GET /api/judges/ca-judge-12345',
      curl: 'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.mycasevalue.com/api/judges/ca-judge-12345',
      response: JSON.stringify({
        id: 'ca-judge-12345',
        name: 'Honorable Jane Smith',
        district: 's-nd-ca',
        totalCases: 3421,
        plaintiffWinRate: 0.62,
        avgSettlement: 385000,
        averageResolutionTime: 1120,
        recentTrend: 'increasing plaintiff favorable',
      }, null, 2),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
        {/* Hero Section */}
        <div style={{ background: '#0966C3', padding: '80px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: '#0966C3',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '12px',
                fontFamily: 'var(--font-display)',
              }}>
                API DOCUMENTATION
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-1px',
              marginBottom: 12,
            }}>
              MyCaseValue API
            </h1>
            <p style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.8,
              maxWidth: 600,
            }}>
              Programmatic access to federal court outcome data. Integrate real case analytics, AI predictions, and comprehensive court statistics into your applications.
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid #E5E7EB', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: '#F7F8FA' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
              <Link href="/" style={{ color: '#004182', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: '#4B5563' }}>/</span>
              <span style={{ color: '#4B5563' }}>API Documentation</span>
            </nav>
          </div>
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}>
          {/* Authentication Section */}
          <section style={{ marginBottom: 80 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#0f0f0f',
              fontFamily: 'var(--font-display)',
              marginBottom: 24,
            }}>
              Authentication
            </h2>
            <p style={{
              fontSize: 16,
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.8,
              marginBottom: 32,
            }}>
              All API requests require authentication using an API key. Include your API key in the Authorization header as a Bearer token.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
              {/* API Key Auth Card */}
              <div style={{
                padding: 32,
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#0f0f0f',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 12,
                }}>
                  API Key Authentication
                </h3>
                <p style={{
                  fontSize: 14,
                  color: '#4B5563',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}>
                  Include your API key in every request header:
                </p>
                <code style={{
                  display: 'block',
                  padding: 12,
                  backgroundColor: '#F3F4F6',
                  borderRadius: '20px',
                  fontSize: 13,
                  fontFamily: 'monospace',
                  color: '#1F2937',
                  wordBreak: 'break-all',
                  lineHeight: 1.5,
                }}>
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>

              {/* Rate Limits Card */}
              <div style={{
                padding: 32,
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#0f0f0f',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 12,
                }}>
                  Rate Limits
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <p style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-body)',
                      marginBottom: 4,
                    }}>
                      Standard Plan
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: '#0966C3',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      margin: 0,
                    }}>
                      100 requests/minute
                    </p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-body)',
                      marginBottom: 4,
                    }}>
                      Enterprise Plan
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: '#0966C3',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      margin: 0,
                    }}>
                      1000 requests/minute
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Endpoints Section */}
          <section style={{ marginBottom: 80 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#0f0f0f',
              fontFamily: 'var(--font-display)',
              marginBottom: 32,
            }}>
              API Endpoints
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {endpoints.map((endpoint, idx) => (
                <div key={idx} style={{
                  padding: 32,
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  background: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        backgroundColor: endpoint.method === 'GET' ? '#DBEAFE' : '#FEE2E2',
                        color: endpoint.method === 'GET' ? '#0369A1' : '#991B1B',
                        fontSize: '11px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        borderRadius: '6px',
                        letterSpacing: '0.05em',
                      }}>
                        {endpoint.method}
                      </span>
                      <code style={{
                        fontSize: 14,
                        fontFamily: 'monospace',
                        color: '#1F2937',
                        fontWeight: 600,
                      }}>
                        {endpoint.path}
                      </code>
                    </div>
                    <h3 style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-display)',
                      marginBottom: 8,
                    }}>
                      {endpoint.title}
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: '#4B5563',
                      fontFamily: 'var(--font-body)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {endpoint.description}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    {/* Example Request */}
                    <div>
                      <h4 style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#0f0f0f',
                        fontFamily: 'var(--font-display)',
                        marginBottom: 12,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}>
                        Example Request
                      </h4>
                      <code style={{
                        display: 'block',
                        padding: 16,
                        backgroundColor: '#1F2937',
                        borderRadius: '20px',
                        fontSize: 12,
                        fontFamily: 'monospace',
                        color: '#E5E7EB',
                        wordBreak: 'break-all',
                        lineHeight: 1.6,
                        overflow: 'auto',
                      }}>
                        {endpoint.curl}
                      </code>
                    </div>

                    {/* Example Response */}
                    <div>
                      <h4 style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#0f0f0f',
                        fontFamily: 'var(--font-display)',
                        marginBottom: 12,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}>
                        Example Response
                      </h4>
                      <code style={{
                        display: 'block',
                        padding: 16,
                        backgroundColor: '#F3F4F6',
                        borderRadius: '20px',
                        fontSize: 12,
                        fontFamily: 'monospace',
                        color: '#1F2937',
                        wordBreak: 'break-all',
                        lineHeight: 1.6,
                        overflow: 'auto',
                        maxHeight: 300,
                      }}>
                        {endpoint.response}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Code Examples Section */}
          <section style={{ marginBottom: 80 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#0f0f0f',
              fontFamily: 'var(--font-display)',
              marginBottom: 32,
            }}>
              Code Examples
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {/* cURL */}
              <div style={{
                padding: 24,
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
              }}>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#0f0f0f',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 16,
                }}>
                  cURL
                </h3>
                <code style={{
                  display: 'block',
                  padding: 16,
                  backgroundColor: '#1F2937',
                  borderRadius: '20px',
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: '#E5E7EB',
                  wordBreak: 'break-all',
                  lineHeight: 1.5,
                  overflow: 'auto',
                }}>
{`curl -H "Authorization: Bearer API_KEY" \\
  https://api.mycasevalue.com/api/nos/110`}
                </code>
              </div>

              {/* JavaScript */}
              <div style={{
                padding: 24,
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
              }}>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#0f0f0f',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 16,
                }}>
                  JavaScript
                </h3>
                <code style={{
                  display: 'block',
                  padding: 16,
                  backgroundColor: '#1F2937',
                  borderRadius: '20px',
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: '#E5E7EB',
                  wordBreak: 'break-all',
                  lineHeight: 1.5,
                  overflow: 'auto',
                }}>
{`fetch('https://api.mycasevalue.com/api/nos/110', {
  headers: {
    'Authorization': 'Bearer API_KEY'
  }
}).then(r => r.json())`}
                </code>
              </div>

              {/* Python */}
              <div style={{
                padding: 24,
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
              }}>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#0f0f0f',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 16,
                }}>
                  Python
                </h3>
                <code style={{
                  display: 'block',
                  padding: 16,
                  backgroundColor: '#1F2937',
                  borderRadius: '20px',
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: '#E5E7EB',
                  wordBreak: 'break-all',
                  lineHeight: 1.5,
                  overflow: 'auto',
                }}>
{`import requests
r = requests.get(
  'https://api.mycasevalue.com/api/nos/110',
  headers={'Authorization': 'Bearer API_KEY'}
)`}
                </code>
              </div>
            </div>
          </section>

          {/* Error Handling Section */}
          <section style={{ marginBottom: 80 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#0f0f0f',
              fontFamily: 'var(--font-display)',
              marginBottom: 32,
            }}>
              Error Codes
            </h2>

            <div style={{
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              overflow: 'hidden',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'var(--font-body)',
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
                    <th style={{
                      padding: 16,
                      fontSize: 13,
                      fontWeight: 600,
                      textAlign: 'left',
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-display)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Code
                    </th>
                    <th style={{
                      padding: 16,
                      fontSize: 13,
                      fontWeight: 600,
                      textAlign: 'left',
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-display)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Meaning
                    </th>
                    <th style={{
                      padding: 16,
                      fontSize: 13,
                      fontWeight: 600,
                      textAlign: 'left',
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-display)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: '200', status: 'OK', desc: 'Request successful.' },
                    { code: '400', status: 'Bad Request', desc: 'Invalid parameters or malformed request.' },
                    { code: '401', status: 'Unauthorized', desc: 'Missing or invalid API key.' },
                    { code: '429', status: 'Too Many Requests', desc: 'Rate limit exceeded. Retry after specified time.' },
                    { code: '500', status: 'Server Error', desc: 'Internal server error. Contact support.' },
                  ].map((err, idx) => (
                    <tr key={idx} style={{ borderBottom: idx < 4 ? '1px solid #E5E7EB' : 'none' }}>
                      <td style={{
                        padding: 16,
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#0f0f0f',
                        fontFamily: 'monospace',
                      }}>
                        {err.code}
                      </td>
                      <td style={{
                        padding: 16,
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#1F2937',
                      }}>
                        {err.status}
                      </td>
                      <td style={{
                        padding: 16,
                        fontSize: 14,
                        color: '#4B5563',
                      }}>
                        {err.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA Section */}
          <section style={{
            padding: 48,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0966C3 0%, #004182 100%)',
            textAlign: 'center',
            marginBottom: 64,
          }}>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              marginBottom: 12,
            }}>
              Ready to Integrate?
            </h2>
            <p style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.7,
              marginBottom: 32,
            }}>
              Get enterprise-grade API access to federal court analytics. Our technical team is ready to help with custom integrations and high-volume use cases.
            </p>
            <a
              href="mailto:enterprise@mycasevalues.com"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#FFFFFF',
                color: '#0966C3',
                fontSize: 15,
                fontWeight: 700,
                borderRadius: '12px',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                transition: 'all 0.3s ease',
              }}
            >
              Request API Access
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
