'use client';

import { useState } from 'react';

const btnStyle: React.CSSProperties = {
  padding: '6px 14px',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-default)',
  borderRadius: '6px',
  fontSize: '13px',
  color: 'var(--fg-primary)',
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
};

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        style={btnStyle}
      >
        Share on X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        style={btnStyle}
      >
        Share on LinkedIn
      </a>
      <button onClick={handleCopy} style={btnStyle}>
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
