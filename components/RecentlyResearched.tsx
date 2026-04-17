'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ResearchedPage {
  path: string;
  title: string;
  timestamp: number;
}

const STORAGE_KEY = 'mcv_recently_researched';
const MAX_HISTORY = 5;

// Page title mapping for common routes
const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/': 'Home',
  '/about': 'About',
  '/contact': 'Contact',
  '/faq': 'FAQ',
  '/how-it-works': 'How It Works',
  '/blog': 'Blog',
  '/cases': 'Cases',
  '/districts': 'Districts',
  '/judges': 'Judges',
  '/attorney': 'Attorney Tools',
  '/admin': 'Admin Panel',
};

function getTitleFromPath(path: string): string {
  // Check exact match first
  if (PAGE_TITLES[path]) {
    return PAGE_TITLES[path];
  }

  // Extract title from path segments
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) {
    return 'Home';
  }

  // Handle dynamic routes (e.g., /nos/430 -> Case Type 430)
  if (segments[0] === 'nos' && segments[1]) {
    return `Case Type ${segments[1]}`;
  }

  if (segments[0] === 'judge' && segments[1]) {
    return `Judge ${segments[1]}`;
  }

  if (segments[0] === 'districts' && segments[1]) {
    return `District ${segments[1]}`;
  }

  if (segments[0] === 'blog' && segments[1]) {
    return segments[1].replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  // Capitalize and format path segment
  const title = segments[segments.length - 1];
  return title.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'Just now';
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  if (hours < 24) {
    return `${hours}h ago`;
  }
  if (days < 7) {
    return `${days}d ago`;
  }

  // Return date
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

export default function RecentlyResearched() {
  const [history, setHistory] = useState<ResearchedPage[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize on client side only
  useEffect(() => {
    setIsClient(true);

    // Get current page from browser
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const currentTitle = getTitleFromPath(currentPath);

      // Load existing history
      const stored = localStorage.getItem(STORAGE_KEY);
      let pages: ResearchedPage[] = stored ? JSON.parse(stored) : [];

      // Remove current page if it exists (we'll add it at the top)
      pages = pages.filter((p) => p.path !== currentPath);

      // Add current page at the beginning
      pages.unshift({
        path: currentPath,
        title: currentTitle,
        timestamp: Date.now(),
      });

      // Keep only the last MAX_HISTORY pages
      pages = pages.slice(0, MAX_HISTORY);

      // Save updated history
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
      setHistory(pages);
    }
  }, []);

  // Don't render on server
  if (!isClient) {
    return null;
  }

  if (history.length === 0) {
    return (
      <div
        style={{
          padding: '16px',
          backgroundColor: 'var(--color-surface-0)',
          border: '1px solid var(--border-default)',
          borderRadius: '4px',
          fontFamily: 'var(--font-ui)',
        }}
      >
        <h3
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 8px 0',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Recently Researched
        </h3>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            margin: 0,
          }}
        >
          No research history yet
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: 'var(--color-surface-0)',
        border: '1px solid var(--border-default)',
        borderRadius: '4px',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <h3
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          margin: '0 0 12px 0',
          fontFamily: 'var(--font-heading)',
        }}
      >
        Recently Researched
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {history.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '8px 10px',
              backgroundColor: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = 'rgba(59,130,246,0.08)';
              el.style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = 'var(--color-surface-0)';
              el.style.borderColor = 'var(--border-default)';
            }}
          >
            <p
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--accent-primary)',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {page.title}
            </p>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                margin: '2px 0 0 0',
              }}
            >
              {formatTimeAgo(page.timestamp)}
            </p>
          </Link>
        ))}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem(STORAGE_KEY);
          setHistory([]);
        }}
        style={{
          marginTop: '8px',
          width: '100%',
          padding: '6px 10px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          color: 'var(--color-text-muted)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = 'var(--border-default)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.05)';
        }}
      >
        Clear History
      </button>
    </div>
  );
}
