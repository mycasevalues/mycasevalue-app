/**
 * app/data/changelog/page.tsx — Data Changelog Page
 *
 * Displays the history of data updates, new features, and changes to the MyCaseValue platform.
 * Includes affected NOS codes and districts for each update.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getChangelogEntries, formatDate, getUpdateTypeBadge } from '@/lib/changelog';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Data Changelog | MyCaseValue',
  description: 'Track all updates, data refreshes, and feature releases for MyCaseValue platform. See what changed and how it affects your research.',
  alternates: { canonical: `${SITE_URL}/data/changelog` },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Data Changelog',
  description: 'Track all updates to the MyCaseValue platform',
  url: `${SITE_URL}/data/changelog`,
  publisher: {
    '@type': 'Organization',
    name: 'MyCaseValue',
    url: SITE_URL,
  },
};

interface ChangelogEntry {
  id: string;
  date: string;
  updateType: 'launch' | 'data_update' | 'feature' | 'fix';
  title: string;
  description: string;
  affectedNosCodes: string[];
  affectedDistricts: string[];
}

export default async function ChangelogPage() {
  const entries = (await getChangelogEntries()) as ChangelogEntry[];

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .changelog-container {
            padding: 40px 24px !important;
          }
        }
        .changelog-entry {
          transition: all 200ms ease-out;
        }
        .changelog-entry:hover {
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.12) !important;
        }
        .changelog-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .changelog-link-pill {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 16px;
          background-color: #EDF3FB;
          color: #004182;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          margin-right: 8px;
          margin-bottom: 8px;
          transition: all 150ms ease-out;
          font-family: var(--font-body);
        }
        .changelog-link-pill:hover {
          background-color: #D5E3F2;
          color: #0A66C2;
          text-decoration: none;
        }
        .changelog-date-pill {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          background-color: #EDF3FB;
          color: #004182;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 500;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
        {/* Dark Navy Hero Header */}
        <div style={{ background: '#1B3A5C', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link href="/" style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'color 150ms ease-out',
              }}>
                Home
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>/</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
                Data Changelog
              </span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: '#0A66C2',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '12px',
                fontFamily: 'var(--font-display)',
              }}>
                DATA & UPDATES
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-1px',
              marginBottom: 16,
              lineHeight: 1.2,
            }}>
              Data Changelog
            </h1>

            <p style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Stay informed about data updates, new features, and platform improvements
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="changelog-container" style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* Timeline of Entries */}
            <div style={{ marginBottom: 80 }}>
              {entries.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {entries.map((entry) => {
                    const badge = getUpdateTypeBadge(entry.updateType);
                    return (
                      <div
                        key={entry.id}
                        className="changelog-entry"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: 12,
                          padding: '32px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        }}
                      >
                        {/* Date and Type Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                          <div className="changelog-date-pill">
                            {formatDate(entry.date)}
                          </div>
                          <div
                            className="changelog-badge"
                            style={{
                              backgroundColor: badge.bgColor,
                              color: badge.color,
                            }}
                          >
                            {badge.label}
                          </div>
                        </div>

                        {/* Title */}
                        <h2 style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: '#0f0f0f',
                          fontFamily: 'var(--font-display)',
                          margin: '0 0 12px 0',
                          letterSpacing: '-0.5px',
                        }}>
                          {entry.title}
                        </h2>

                        {/* Description */}
                        <p style={{
                          fontSize: 15,
                          color: '#4B5563',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 1.7,
                          margin: '0 0 20px 0',
                        }}>
                          {entry.description}
                        </p>

                        {/* Affected NOS Codes */}
                        {entry.affectedNosCodes.length > 0 && (
                          <div style={{ marginBottom: 16 }}>
                            <p style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#004182',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              margin: '0 0 12px 0',
                              fontFamily: 'var(--font-body)',
                            }}>
                              Affected Case Types
                            </p>
                            <div>
                              {entry.affectedNosCodes.map((code) => (
                                <Link
                                  key={code}
                                  href={`/nos/${code}`}
                                  className="changelog-link-pill"
                                >
                                  {code}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Affected Districts */}
                        {entry.affectedDistricts.length > 0 && (
                          <div>
                            <p style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#004182',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              margin: '0 0 12px 0',
                              fontFamily: 'var(--font-body)',
                            }}>
                              Affected Districts
                            </p>
                            <div>
                              {entry.affectedDistricts.map((district) => (
                                <Link
                                  key={district}
                                  href={`/districts/${district}`}
                                  className="changelog-link-pill"
                                >
                                  {district}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: '48px 32px',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontSize: 16,
                    color: '#4B5563',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                  }}>
                    No changelog entries available yet.
                  </p>
                </div>
              )}
            </div>

            {/* Subscribe Section */}
            <div style={{
              background: 'linear-gradient(135deg, #0A66C2 0%, #004182 100%)',
              borderRadius: 12,
              padding: '48px 32px',
              color: '#FFFFFF',
              marginBottom: 64,
            }}>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                margin: '0 0 12px 0',
                letterSpacing: '-0.5px',
              }}>
                Stay Updated
              </h2>

              <p style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6,
                margin: '0 0 28px 0',
              }}>
                Get notified when we release new data, features, and platform improvements.
              </p>

              <form style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  style={{
                    flex: '1 1 250px',
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                />

                <button
                  type="submit"
                  style={{
                    padding: '12px 28px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#FFFFFF',
                    color: '#0A66C2',
                    fontWeight: 600,
                    fontSize: 14,
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease-out',
                    minWidth: 140,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#EDF3FB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                >
                  Subscribe
                </button>
              </form>

              <p style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-body)',
                margin: '20px 0 0 0',
              }}>
                We send updates infrequently. Unsubscribe anytime.
              </p>
            </div>

            {/* Disclaimer Section */}
            <div style={{
              background: '#F0F5FB',
              border: '1px solid #D5E3F2',
              borderRadius: 12,
              padding: '24px 28px',
            }}>
              <p style={{
                fontSize: 13,
                color: '#4B5563',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                <strong style={{ color: '#004182' }}>Update Frequency:</strong> Our data is updated quarterly as new information is available from the FJC Integrated Database and other authoritative sources. Feature releases may occur more frequently. Subscribe to stay informed about all changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
