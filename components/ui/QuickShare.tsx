'use client';

import { useState } from 'react';

interface QuickShareProps {
  pageUrl: string;
  caseType: string;
  winRate: string;
}

export default function QuickShare({ pageUrl, caseType, winRate }: QuickShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = encodeURIComponent(`${caseType} federal court data: ${winRate} plaintiff win rate — from MyCaseValue`);
  const encodedUrl = encodeURIComponent(pageUrl);

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
      {[
        { label: 'Share on X', url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}` },
        { label: 'Share on LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
      ].map(btn => (
        <a key={btn.label} href={btn.url} target="_blank" rel="noopener noreferrer" style={{
          padding: '6px 14px',
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#374151',
          textDecoration: 'none',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          transition: 'all 150ms',
        }}>
          {btn.label}
        </a>
      ))}
      <button
        onClick={handleCopy}
        style={{
          padding: '6px 14px',
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#374151',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 150ms',
        }}
      >
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
