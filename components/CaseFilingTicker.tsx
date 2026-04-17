'use client';

import React, { useMemo, useState, useEffect } from 'react';
import type { RecentFiling } from '../lib/courtlistener';

/**
 * Format time since filing (e.g., "2 hours ago", "1 day ago")
 */
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsAgo < 60) return 'just now';
  if (secondsAgo < 3600) {
    const mins = Math.floor(secondsAgo / 60);
    return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  }
  if (secondsAgo < 86400) {
    const hrs = Math.floor(secondsAgo / 3600);
    return `${hrs} hour${hrs !== 1 ? 's' : ''} ago`;
  }
  if (secondsAgo < 604800) {
    const days = Math.floor(secondsAgo / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
  return date.toLocaleDateString();
}

/**
 * Truncate long case names for the ticker
 */
function truncateCaseName(name: string, maxLength = 60): string {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength) + '...';
}

export default function CaseFilingTicker() {
  const [filings, setFilings] = useState<RecentFiling[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courtlistener/recent-filings?limit=20')
      .then((res) => res.json())
      .then((data) => {
        setFilings(data.filings || []);
      })
      .catch((error) => {
        console.error('Error fetching recent filings:', error);
        setFilings([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // If fewer than 5 items, duplicate them to ensure smooth scrolling
  const displayFilings = useMemo(() => {
    const minCount = 5;
    if (filings.length === 0) return [];
    if (filings.length >= minCount) return filings;
    // Duplicate filings to reach minimum count
    const duplicated: RecentFiling[] = [];
    while (duplicated.length < minCount) {
      duplicated.push(...filings);
    }
    return duplicated.slice(0, minCount);
  }, [filings]);

  if (displayFilings.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        background: 'var(--color-surface-0)',
        borderTop: '1px solid #E0DDD8',
        borderBottom: '1px solid #E0DDD8',
        padding: '24px 20px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Label */}
        <div
          style={{
            fontSize: '12px',
            color: '#595959',
            fontFamily: 'var(--font-body)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Recent federal filings via CourtListener RECAP
        </div>

        {/* Ticker Container */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '32px',
          }}
        >
          <style>{`
            @keyframes ticker-scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .ticker-content {
              display: flex;
              gap: 32px;
              animation: ticker-scroll ${displayFilings.length * 15}s linear infinite;
              will-change: transform;
            }

            .ticker-content:hover {
              animation-play-state: paused;
              cursor: pointer;
            }

            .ticker-item {
              flex-shrink: 0;
              display: flex;
              align-items: center;
              white-space: nowrap;
              gap: 8px;
            }

            .ticker-link {
              color: var(--accent-primary);
              text-decoration: none;
              font-family: var(--font-body);
              font-size: 14px;
              font-weight: 500;
              transition: color 0.2s ease;
            }

            .ticker-link:hover {
              color: var(--link-hover, #083D7A);
              text-decoration: underline;
            }

            .ticker-separator {
              color: #D0D0D0;
              margin: 0 4px;
            }

            .ticker-metadata {
              color: var(--color-text-secondary);
              font-size: 13px;
              font-family: var(--font-body);
              margin-left: 4px;
            }

            .ticker-court {
              color: #999999;
              font-size: 12px;
              font-family: var(--font-mono);
            }
          `}</style>

          <div className="ticker-content">
            {/* Render each filing twice for seamless looping */}
            {Array.from(new Set([...displayFilings, ...displayFilings])).map((filing, idx) => (
              <div key={`${filing.id}-${idx}`} className="ticker-item">
                <a
                  href={filing.docketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ticker-link"
                >
                  {truncateCaseName(filing.caseName)}
                </a>
                <span className="ticker-separator">·</span>
                {filing.nosCategory && (
                  <>
                    <span className="ticker-metadata">{filing.nosCategory}</span>
                    <span className="ticker-separator">·</span>
                  </>
                )}
                <span className="ticker-court">{filing.courtName}</span>
                <span className="ticker-separator">·</span>
                <span className="ticker-metadata">{getRelativeTime(filing.dateFiled)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
