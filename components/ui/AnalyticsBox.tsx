'use client';

/**
 * AnalyticsBox.tsx — Westlaw Browse Box equivalent
 *
 * Shows up on search result cards.
 * Variants: 'full' (Precision Coverage) | 'partial' (Best Analytics Point)
 *
 * Full: blue bg (#EBF3FC), 2×2 grid of data items, footer links
 * Partial: warm bg (#FDF8ED), star icon, single paragraph, classification link
 */

import React from 'react';

interface AnalyticsBoxData {
  legalIssue?: string;
  outcome?: string;
  factPattern?: string;
  settlementRange?: string;
  motionType?: string;
}

interface AnalyticsBoxProps {
  variant: 'full' | 'partial';
  data: AnalyticsBoxData;
  onMoreCases?: () => void;
  onSimilarFact?: () => void;
}

/* ── Shared label style ── */
const labelStyle: React.CSSProperties = {
  fontSize: 9,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--text3, #78766C)',
  fontFamily: 'var(--font-ui)',
  fontWeight: 600,
  marginBottom: 2,
};

const valueStyle: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'var(--font-ui)',
  color: 'var(--text2, #42403C)',
  lineHeight: 1.4,
};

const monoValueStyle: React.CSSProperties = {
  ...valueStyle,
  fontFamily: 'var(--font-mono)',
};

const linkStyle: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--link, #0A50A2)',
  fontFamily: 'var(--font-ui)',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  textDecoration: 'none',
};

/* ── Full Coverage Variant ── */
function FullCoverage({ data, onMoreCases, onSimilarFact }: Omit<AnalyticsBoxProps, 'variant'>) {
  return (
    <div
      style={{
        background: 'var(--ab, #EBF3FC)',
        border: '1px solid var(--ab-border, #BCDAF5)',
        borderRadius: 2,
        padding: '8px 10px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 7,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ ...labelStyle, marginBottom: 0 }}>PRECISION ANALYTICS</span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: '#FFFFFF',
              background: 'var(--link, #0A50A2)',
              borderRadius: 8,
              padding: '1px 6px',
              lineHeight: '14px',
            }}
          >
            Full Coverage
          </span>
        </div>
        <button style={linkStyle} type="button">
          + Expand
        </button>
      </div>

      {/* 2×2 Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px 12px',
          marginBottom: 8,
        }}
      >
        {data.legalIssue && (
          <div>
            <div style={labelStyle}>Legal Issue</div>
            <div style={valueStyle}>{data.legalIssue}</div>
          </div>
        )}
        {data.outcome && (
          <div>
            <div style={labelStyle}>Outcome</div>
            <div style={valueStyle}>{data.outcome}</div>
          </div>
        )}
        {data.factPattern && (
          <div>
            <div style={labelStyle}>Fact Pattern</div>
            <div style={valueStyle}>{data.factPattern}</div>
          </div>
        )}
        {data.settlementRange && (
          <div>
            <div style={labelStyle}>Settlement Est. Range</div>
            <div style={monoValueStyle}>{data.settlementRange}</div>
          </div>
        )}
      </div>

      {/* Footer links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        {onMoreCases && (
          <button style={linkStyle} onClick={onMoreCases} type="button">
            More Cases on This Issue
          </button>
        )}
        {onSimilarFact && (
          <button style={linkStyle} onClick={onSimilarFact} type="button">
            Similar Fact Pattern
          </button>
        )}
        <button style={linkStyle} type="button">
          Full Analytics →
        </button>
        <button style={linkStyle} type="button">
          Add to Research Organizer
        </button>
      </div>
    </div>
  );
}

/* ── Partial / Best Analytics Point Variant ── */
function PartialCoverage({ data }: { data: AnalyticsBoxData }) {
  return (
    <div
      style={{
        background: 'var(--bhn, #FDF8ED)',
        border: '1px solid var(--bhn-border, #E8D4A0)',
        borderRadius: 2,
        padding: '8px 10px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          marginBottom: 6,
        }}
      >
        {/* Star icon */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="#8A6000"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M8 1l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.8 3.8 14l.8-4.7L1.2 6l4.7-.7z" />
        </svg>
        <span style={{ ...labelStyle, marginBottom: 0 }}>BEST ANALYTICS POINT</span>
      </div>

      {/* Content */}
      <p
        style={{
          fontSize: 12,
          fontFamily: 'var(--font-ui)',
          color: 'var(--text2, #42403C)',
          lineHeight: 1.5,
          margin: '0 0 6px 0',
        }}
      >
        {data.legalIssue || data.factPattern || 'Analytics data available for this citation.'}
      </p>

      {/* Classification link */}
      {data.motionType && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--link, #0A50A2)',
            cursor: 'pointer',
          }}
        >
          {data.motionType}
        </span>
      )}
    </div>
  );
}

export default function AnalyticsBox(props: AnalyticsBoxProps) {
  if (props.variant === 'partial') {
    return <PartialCoverage data={props.data} />;
  }
  return (
    <FullCoverage
      data={props.data}
      onMoreCases={props.onMoreCases}
      onSimilarFact={props.onSimilarFact}
    />
  );
}
