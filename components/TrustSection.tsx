/**
 * TrustSection — Data source badges showing where MyCaseValue data comes from.
 * Displays three source badges with names and brief descriptions.
 */

const DATA_SOURCES = [
  {
    name: 'FJC Integrated Database',
    description:
      'The federal judiciary\'s official statistical database — 5.1M+ civil cases spanning 55+ years across all 94 districts.',
  },
  {
    name: 'PACER Court Records',
    description:
      'Public Access to Court Electronic Records — the definitive source for federal court filings, dockets, and case documents.',
  },
  {
    name: 'CourtListener Open Data',
    description:
      'Open-access database of judicial opinions, oral arguments, and real-time docket data from the Free Law Project.',
  },
];

export default function TrustSection() {
  return (
    <section
      style={{
        padding: '24px 24px',
        borderTop: '1px solid var(--bdr)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text3, #4A4940)',
            margin: '0 0 12px',
          }}
        >
          Powered By
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}
          className="trust-badge-grid"
        >
          {DATA_SOURCES.map((source) => (
            <div
              key={source.name}
              style={{
                background: 'var(--surf, #FAFAF7)',
                border: '1px solid var(--bdr)',
                borderRadius: 4,
                padding: '14px 16px',
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  color: 'var(--text1, #333333)',
                  marginBottom: 4,
                }}
              >
                {source.name}
              </div>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text3, #4A4940)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {source.description}
              </p>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .trust-badge-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
