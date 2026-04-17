'use client';

import { useState } from 'react';

type ShareReportButtonProps = {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

type ShareOption = 'copy' | 'linkedin' | 'twitter';

export default function ShareReportButton({ variant = 'default', size = 'md' }: ShareReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const accentColor = 'var(--accent-primary)';
  const secondaryColor = 'var(--accent-primary-hover)';

  const sizeMap = {
    sm: { padding: '6px 12px', fontSize: '13px' },
    md: { padding: '10px 16px', fontSize: '14px' },
    lg: { padding: '12px 20px', fontSize: '15px' },
  };

  const currentSize = sizeMap[size];

  async function generateShortUrl() {
    if (shortUrl) {
      // Already generated, just copy
      copyToClipboard(shortUrl);
      return;
    }

    setIsLoading(true);
    try {
      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: currentUrl }),
      });

      if (res.ok) {
        const data = await res.json();
        setShortUrl(data.shortUrl);
        copyToClipboard(data.shortUrl);
      }
    } catch (error) {
      console.error('Failed to generate short URL:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  }

  function shareToLinkedIn() {
    if (!shortUrl) return;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shortUrl)}`;
    window.open(linkedinUrl, 'linkedin-share', 'width=550,height=400');
  }

  function shareToTwitter() {
    if (!shortUrl) return;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}&text=${encodeURIComponent('Check out my case analysis on MyCaseValue')}`;
    window.open(twitterUrl, 'twitter-share', 'width=550,height=400');
  }

  const buttonStyle = {
    padding: currentSize.padding,
    fontSize: currentSize.fontSize,
    fontWeight: 600,
    border: variant === 'outline' ? `1px solid ${accentColor}` : 'none',
    background: variant === 'outline' ? 'transparent' : accentColor,
    color: variant === 'outline' ? accentColor : 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            generateShortUrl();
            setIsOpen(true);
          }
        }}
        aria-label="Share report"
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={buttonStyle}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = '0.9';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = '1';
          (e.currentTarget as HTMLElement).style.transform = 'none';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        {isLoading ? 'Generating...' : 'Share Report'}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: 'var(--color-surface-0)',
            border: `1px solid var(--border-default)`,
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            minWidth: '280px',
          }}
        >
          {/* Copy Link Option */}
          <button
            onClick={() => {
              generateShortUrl();
              setIsOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              borderBottom: '1px solid var(--border-default)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>Copy Link</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>Share this report</p>
            </div>
          </button>

          {/* LinkedIn Share */}
          <button
            onClick={() => {
              shareToLinkedIn();
              setIsOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              borderBottom: '1px solid var(--border-default)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-primary)">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>LinkedIn</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>Post to your feed</p>
            </div>
          </button>

          {/* Twitter Share */}
          <button
            onClick={() => {
              shareToTwitter();
              setIsOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a14.002 14.002 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>X/Twitter</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>Share on X</p>
            </div>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-success)',
            color: 'var(--color-text-inverse)',
            padding: '12px 20px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 2000,
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateX(-50%) translateY(10px); }
              to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
          `}</style>
          Link copied!
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
