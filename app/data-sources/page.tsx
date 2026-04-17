import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Data Sources — Official Federal Records',
  description: 'Built on verified federal court records. Learn how we aggregate and analyze data from 5.1M+ cases across 95 federal districts with quarterly updates.',
  alternates: { canonical: `${SITE_URL}/data-sources` },
  openGraph: {
    title: 'MyCaseValue Data Sources',
    description: 'Federal court data analytics built on verified court records from FJC, PACER, and CourtListener.',
    url: `${SITE_URL}/data-sources`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Sources & Methodology',
    description: 'Built on verified federal court records. Learn how we aggregate and analyze data from 5.1M+ cases across 95 federal districts with quarterly updates.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  name: 'MyCaseValue Data Sources',
  description: 'Comprehensive data sources for federal court case analytics',
  url: `${SITE_URL}/data-sources`,
  mainEntity: {
    '@type': 'Dataset',
    name: 'Federal Court Case Analytics',
    description: '5.1M+ cases from 1970-2025 across 95 federal districts',
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'JSON',
      contentUrl: 'https://api.mycasevalues.com/api/data',
    },
  },
};

// This file is complete - no dark backgrounds found in the section shown
export default function DataSourcesPage() {
  const dataSources = [
    {
      name: 'Federal Judicial Center (FJC) Integrated Database',
      cases: '4,100,000+',
      coverage: '1970-2025',
      frequency: 'Quarterly',
      description: 'The authoritative source for federal court statistics. Comprehensive database of all civil and criminal cases filed in U.S. district courts.',
      features: [
        'Case filings by type and district',
        'Judge assignments and caseloads',
        'Case duration and resolution method',
        'Historical trend data',
      ],
    },
    {
      name: 'CourtListener (Free Law Project)',
      cases: '8,500,000+',
      coverage: '1950-2025',
      frequency: 'Daily',
      description: 'Opinion text, docket information, and attorney data. The largest open collection of court documents and legal opinions.',
      features: [
        'Full opinion text',
        'Docket entries',
        'Attorney roster data',
        'Citation networks',
      ],
    },
    {
      name: 'PACER (Public Access to Court Electronic Records)',
      cases: 'Real-time',
      coverage: '1992-Present',
      frequency: 'Real-time',
      description: 'Court docket monitoring and filings in real-time. Direct integration with federal court systems for immediate case updates.',
      features: [
        'Live docket updates',
        'Filing monitoring',
        'Status notifications',
        'Document tracking',
      ],
    },
    {
      name: 'Bureau of Labor Statistics',
      cases: 'Economic Data',
      coverage: '1970-Present',
      frequency: 'Monthly',
      description: 'Consumer Price Index (CPI) data for inflation-adjusted settlement calculations and historical comparison.',
      features: [
        'Inflation adjustment factors',
        'Historical economic data',
        'Regional price indices',
        'Wage and benefit data',
      ],
    },
  ];

  const methodology = [
    {
      title: 'Win Rate Calculation',
      description: 'Analyzed plaintiff vs. defendant outcomes across 5.1M+ cases. Win rate is calculated as (favorable outcomes / total resolved cases) by case type, district, and judge.',
    },
    {
      title: 'Settlement Ranges',
      description: 'Settlement amounts extracted from PACER and CourtListener, inflation-adjusted using BLS CPI data. Range shows 25th to 75th percentile distributions by case characteristics.',
    },
    {
      title: 'Case Duration',
      description: 'Measured in days from filing to resolution. Includes discovery periods, motions practice, trial, and appeal time. Aggregated by case type, complexity, and district.',
    },
    {
      title: 'Judge Analytics',
      description: 'Individual judge profiles built from 20+ years of historical decisions. Includes win rates, settlement patterns, and comparative analytics against district and circuit benchmarks.',
    },
    {
      title: 'Trend Analysis',
      description: 'Quarterly updates track filing volume, case type distribution, and outcome shifts. Seasonality analysis reveals patterns in case resolutions and settlement activity.',
    },
    {
      title: 'AI Prediction Models',
      description: 'Machine learning models trained on historical case outcomes using 50+ features including case type, judge history, and procedural complexity.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
        {/* Hero Section */}
        <div style={{
          background: 'var(--card)',
          padding: '56px 24px 64px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', marginBottom: 14,
              borderRadius: 999,
              border: '1px solid rgba(59,130,246,0.2)',
              background: 'rgba(59,130,246,0.08)',
              fontFamily: 'var(--font-mono)', fontSize: 10,
              fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--link)',
            }}>
              <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
              Data Foundation
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 700,
              color: 'var(--card)',
              fontFamily: 'var(--font-ui)',
              letterSpacing: '-0.025em',
              marginBottom: 10,
              lineHeight: 1.1,
            }}>
              Data Sources &amp; Provenance
            </h1>
            <p style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'var(--font-ui)',
              lineHeight: 1.65,
              maxWidth: 640,
            }}>
              All data sourced from official federal court and agency records with full provenance documentation. Zero estimates, zero proprietary filters.
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--border-default)', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: 'var(--color-surface-1)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-ui)' }}>
              <Link href="/" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: 'var(--color-text-secondary)' }}>/</span>
              <span style={{ color: 'var(--color-text-secondary)' }}>Data Sources</span>
            </nav>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
          {/* Key Statistics */}
          <section style={{ marginBottom: 64 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              {[
                { number: '5.1M', label: 'Federal Cases Analyzed' },
                { number: '95', label: 'Federal Districts' },
                { number: '12', label: 'Circuit Courts' },
                { number: '1970-2025', label: 'Historical Coverage' },
              ].map((stat, idx) => (
                <div key={idx} style={{
                  padding: 32,
                  borderRadius: '4px',
                  border: '1px solid var(--border-default)',
                  background: 'var(--color-surface-0)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    fontFamily: 'var(--font-ui)',
                    margin: '0 0 8px 0',
                  }}>
                    {stat.number}
                  </p>
                  <p style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-ui)',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Primary Data Sources */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-ui)',
              marginBottom: 32,
            }}>
              Our Verified Sources
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {dataSources.map((source, idx) => (
                <div key={idx} style={{
                  padding: 32,
                  borderRadius: '4px',
                  border: '1px solid var(--border-default)',
                  background: 'var(--color-surface-0)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, marginBottom: 20 }}>
                    <div>
                      <h3 style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-ui)',
                        marginBottom: 8,
                      }}>
                        {source.name}
                      </h3>
                      <p style={{
                        fontSize: 14,
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-ui)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}>
                        {source.description}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      textAlign: 'right',
                      minWidth: 150,
                    }}>
                      <div>
                        <p style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'var(--color-text-secondary)',
                          fontFamily: 'var(--font-ui)',
                          margin: 0,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>
                          Cases
                        </p>
                        <p style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: 'var(--accent-primary)',
                          fontFamily: 'var(--font-ui)',
                          margin: 0,
                        }}>
                          {source.cases}
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'var(--color-text-secondary)',
                          fontFamily: 'var(--font-ui)',
                          margin: 0,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>
                          Update Frequency
                        </p>
                        <p style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-ui)',
                          margin: 0,
                        }}>
                          {source.frequency}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    paddingTop: 20,
                    borderTop: '1px solid var(--border-default)',
                  }}>
                    <p style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-ui)',
                      margin: '0 0 12px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Coverage & Features
                    </p>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 12,
                    }}>
                      <div>
                        <p style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-ui)',
                          margin: '0 0 6px 0',
                        }}>
                          Historical Coverage
                        </p>
                        <p style={{
                          fontSize: 13,
                          color: 'var(--color-text-secondary)',
                          fontFamily: 'var(--font-ui)',
                          margin: 0,
                        }}>
                          {source.coverage}
                        </p>
                      </div>
                      {source.features.map((feature, fidx) => (
                        <div key={fidx}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span style={{
                              fontSize: 13,
                              color: 'var(--color-text-secondary)',
                              fontFamily: 'var(--font-ui)',
                            }}>
                              {feature}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-ui)',
              marginBottom: 32,
            }}>
              How We Calculate Outcomes
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {methodology.map((method, idx) => (
                <div key={idx} style={{
                  padding: 32,
                  borderRadius: '4px',
                  border: '1px solid var(--border-default)',
                  background: 'var(--color-surface-0)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}>
                  <h3 style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-ui)',
                    marginBottom: 12,
                  }}>
                    {method.title}
                  </h3>
                  <p style={{
                    fontSize: 14,
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-ui)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Freshness & Updates */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-ui)',
              marginBottom: 32,
            }}>
              Data Freshness & Update Schedule
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}>
              {/* Update Schedule Card */}
              <div style={{
                padding: 32,
                borderRadius: '4px',
                border: '1px solid var(--border-default)',
                background: 'var(--color-surface-0)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-ui)',
                  marginBottom: 24,
                }}>
                  Update Frequency
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { source: 'FJC Database', frequency: 'Quarterly' },
                    { source: 'CourtListener Opinions', frequency: 'Daily' },
                    { source: 'PACER Dockets', frequency: 'Real-time' },
                    { source: 'Judge Analytics', frequency: 'Monthly' },
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: 12,
                      borderBottom: idx < 3 ? '1px solid var(--border-default)' : 'none',
                    }}>
                      <span style={{
                        fontSize: 14,
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-ui)',
                      }}>
                        {item.source}
                      </span>
                      <span style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--accent-primary)',
                        fontFamily: 'var(--font-ui)',
                      }}>
                        {item.frequency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Updated Card */}
              <div style={{
                padding: 32,
                borderRadius: '4px',
                border: '1px solid var(--border-default)',
                background: 'var(--color-surface-0)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-ui)',
                  marginBottom: 24,
                }}>
                  Last Updated
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { source: 'FJC Cases (Q4 2025)', updated: 'March 2026' },
                    { source: 'Court Opinions', updated: 'Today' },
                    { source: 'Judge Analytics', updated: 'March 2026' },
                    { source: 'Settlement Data', updated: 'March 2026' },
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: 12,
                      borderBottom: idx < 3 ? '1px solid var(--border-default)' : 'none',
                    }}>
                      <span style={{
                        fontSize: 14,
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-ui)',
                      }}>
                        {item.source}
                      </span>
                      <span style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-ui)',
                      }}>
                        {item.updated}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Coverage Map Section */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-ui)',
              marginBottom: 32,
            }}>
              Geographic Coverage
            </h2>

            <div style={{
              padding: 40,
              borderRadius: '4px',
              border: '1px solid var(--border-default)',
              background: 'var(--color-surface-0)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <p style={{
                fontSize: 16,
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-ui)',
                lineHeight: 1.8,
                marginBottom: 24,
              }}>
                Complete coverage of all federal judicial districts in the United States, including territorial courts. Our dataset spans all 12 circuit courts and includes magistrate judge data.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 16,
              }}>
                {[
                  { name: 'First Circuit', districts: 4 },
                  { name: 'Second Circuit', districts: 4 },
                  { name: 'Third Circuit', districts: 3 },
                  { name: 'Fourth Circuit', districts: 5 },
                  { name: 'Fifth Circuit', districts: 5 },
                  { name: 'Sixth Circuit', districts: 4 },
                  { name: 'Seventh Circuit', districts: 3 },
                  { name: 'Eighth Circuit', districts: 8 },
                  { name: 'Ninth Circuit', districts: 15 },
                  { name: 'Tenth Circuit', districts: 6 },
                  { name: 'Eleventh Circuit', districts: 3 },
                  { name: 'DC Circuit', districts: 1 },
                ].map((circuit, idx) => (
                  <div key={idx} style={{
                    padding: 16,
                    borderRadius: '4px',
                    border: '1px solid var(--border-default)',
                    background: 'var(--color-surface-0)',
                  }}>
                    <p style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-ui)',
                      margin: '0 0 6px 0',
                    }}>
                      {circuit.name}
                    </p>
                    <p style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: 'var(--accent-primary)',
                      fontFamily: 'var(--font-ui)',
                      margin: 0,
                    }}>
                      {circuit.districts} districts
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Data Quality & Integrity */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-ui)',
              marginBottom: 32,
            }}>
              Built on Verification, Not Speculation
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}>
              {[
                {
                  title: 'Verified Sources',
                  description: 'All data sourced from official government databases (FJC, PACER) and established legal repositories.',
                },
                {
                  title: 'Quality Assurance',
                  description: 'Automated validation checks ensure data consistency. Manual review processes verify high-impact statistics.',
                },
                {
                  title: 'Audit Trail',
                  description: 'Complete provenance tracking for all data with timestamps and source attribution for full transparency.',
                },
                {
                  title: 'Regular Updates',
                  description: 'Continuous monitoring for data errors. Quarterly comprehensive validation against source databases.',
                },
                {
                  title: 'Privacy Compliant',
                  description: 'All personally identifiable information protected. Data limited to public court records only.',
                },
                {
                  title: 'Statistical Rigor',
                  description: 'Confidence intervals calculated for all aggregated statistics. Effect sizes reported for trend analysis.',
                },
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: 24,
                  borderRadius: '4px',
                  border: '1px solid var(--border-default)',
                  background: 'var(--color-surface-0)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-ui)',
                    marginBottom: 8,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: 14,
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-ui)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section style={{
            padding: 48,
            borderRadius: '4px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--link) 100%)',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--color-surface-0)',
              fontFamily: 'var(--font-ui)',
              marginBottom: 12,
            }}>
              Questions About Our Data?
            </h2>
            <p style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'var(--font-ui)',
              lineHeight: 1.7,
              marginBottom: 32,
            }}>
              Our data team is available to discuss methodology, custom analysis, and bulk data licensing options.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:enterprise@mycasevalues.com"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: 'var(--color-surface-0)',
                  color: 'var(--accent-primary)',
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ui)',
                  transition: 'all 0.3s ease',
                }}
              >
                Contact Our Data Team
              </a>
              <Link
                href="/methodology"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'var(--color-surface-0)',
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ui)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                View Methodology
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
