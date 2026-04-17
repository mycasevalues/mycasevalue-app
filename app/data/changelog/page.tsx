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
  title: 'Data Changelog',
  description: 'Track all updates, data refreshes, and feature releases for MyCaseValue platform. See what changed and how it affects your research.',
  alternates: { canonical: `${SITE_URL}/data/changelog` },
  openGraph: {
    title: 'Data Changelog',
    description: 'Track all updates, data refreshes, and feature releases for MyCaseValue platform. See what changed and how it affects your research.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Changelog',
    description: 'Track all updates, data refreshes, and feature releases for MyCaseValue platform. See what changed and how it affects your research.',
  },
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

// This file is complete - no dark backgrounds found in the section shown
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
          border-radius: 3px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .changelog-link-pill {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 16px;
          background-color: rgba(10,80,162,0.08);
          color: var(--link);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          margin-right: 8px;
          margin-bottom: 8px;
          transition: all 150ms ease-out;
          font-family: var(--font-ui);
        }
        .changelog-link-pill:hover {
          background-color: rgba(10,80,162,0.08);
          color: var(--accent-primary);
          text-decoration: none;
        }
        .changelog-date-pill {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 3px;
          background-color: rgba(10,80,162,0.08);
          color: var(--link);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 500;
        }
        .changelog-email-input {
          transition: all 150ms ease-out;
        }
        .changelog-email-input:focus {
          background: rgba(255,255,255,0.15) !important;
          border-color: rgba(255,255,255,0.3) !important;
          outline: none;
        }
        .changelog-subscribe-btn {
          transition: all 150ms ease-out;
        }
        .changelog-subscribe-btn:hover {
          background: rgba(10,80,162,0.08) !important;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
        {/* Institutional Dark Hero */}
        <div style={{
          background: 'var(--card)',
          padding: '48px 24px 40px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--bdr)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            {/* Mono breadcrumb */}
            <nav style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)', marginBottom: 20,
            }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>Data Changelog</span>
            </nav>

            {/* Pulse eyebrow pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', marginBottom: 16,
              borderRadius: 999,
              border: '1px solid rgba(10,80,162,0.2)',
              background: 'rgba(10,80,162,0.08)',
              fontFamily: 'var(--font-mono)', fontSize: 10,
              fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--link)',
            }}>
              <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
              Data &amp; Updates
            </div>

            <h1 style={{
              fontFamily: 'var(--font-legal)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--card)',
              letterSpacing: '-0.025em',
              marginBottom: 16,
              lineHeight: 1.1,
            }}>
              Data changelog
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-ui)',
              lineHeight: 1.6,
              maxWidth: 640,
              margin: 0,
            }}>
              Stay informed about data updates, new features, and platform improvements
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="changelog-container" style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            {/* Timeline of Entries */}
            <div style={{ marginBottom: 64 }}>
              {entries.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {entries.map((entry) => {
                    const badge = getUpdateTypeBadge(entry.updateType);
                    return (
                      <div
                        key={entry.id}
                        className="changelog-entry"
                        style={{
                          background: 'var(--color-surface-0)',
                          border: '1px solid var(--border-default)',
                          borderRadius: 4,
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
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-legal)',
                          margin: '0 0 12px 0',
                          letterSpacing: '-0.5px',
                        }}>
                          {entry.title}
                        </h2>

                        {/* Description */}
                        <p style={{
                          fontSize: 15,
                          color: 'var(--color-text-secondary)',
                          fontFamily: 'var(--font-ui)',
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
                              color: 'var(--gold)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              margin: '0 0 12px 0',
                              fontFamily: 'var(--font-ui)',
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
                              color: 'var(--gold)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              margin: '0 0 12px 0',
                              fontFamily: 'var(--font-ui)',
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
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 4,
                  padding: '48px 32px',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontSize: 16,
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-ui)',
                    margin: 0,
                  }}>
                    No changelog entries available yet.
                  </p>
                </div>
              )}
            </div>

            {/* Subscribe Section */}
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--gold) 100%)',
              borderRadius: 4,
              padding: '48px 32px',
              color: 'var(--color-surface-0)',
              marginBottom: 64,
            }}>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                fontFamily: 'var(--font-legal)',
                margin: '0 0 12px 0',
                letterSpacing: '-0.5px',
              }}>
                Stay Updated
              </h2>

              <p style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'var(--font-ui)',
                lineHeight: 1.6,
                margin: '0 0 28px 0',
              }}>
                Get notified when we release new data, features, and platform improvements.
              </p>

              <form style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="changelog-email-input"
                  required
                  style={{
                    flex: '1 1 250px',
                    padding: '12px 16px',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'var(--color-surface-0)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 14,
                  }}
                />

                <button
                  type="submit"
                  className="changelog-subscribe-btn"
                  style={{
                    padding: '12px 28px',
                    borderRadius: 4,
                    border: 'none',
                    background: 'var(--color-surface-0)',
                    color: 'var(--accent-primary)',
                    fontWeight: 600,
                    fontSize: 14,
                    fontFamily: 'var(--font-ui)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease-out',
                    minWidth: 140,
                  }}
                >
                  Subscribe
                </button>
              </form>

              <p style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-ui)',
                margin: '24px 0 0 0',
              }}>
                We send updates infrequently. Unsubscribe anytime.
              </p>
            </div>

            {/* Disclaimer Section */}
            <div style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--link-light, #BAE6FD)',
              borderRadius: 4,
              padding: '24px 28px',
            }}>
              <p style={{
                fontSize: 13,
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-ui)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                <strong style={{ color: 'var(--gold)' }}>Update Frequency:</strong> Our data is updated quarterly as new information is available from the FJC Integrated Database and other authoritative sources. Feature releases may occur more frequently. Subscribe to stay informed about all changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
