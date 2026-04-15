import Link from 'next/link';

export default function BetaBanner() {
  return (
    <div
      style={{
        background: 'var(--accent-primary)',
        color: 'var(--color-surface-0)',
        minHeight: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '8px 24px',
        fontFamily: 'var(--font-display)',
        fontSize: '13px',
        fontWeight: 500,
        lineHeight: 1.4,
        textAlign: 'center',
        flexWrap: 'wrap',
      }}
    >
      <span>Public beta: Get federal court outcome analytics and AI prediction free—features that cost $500/month elsewhere. No account required. Join 50K+ legal professionals.</span>
      <Link
        href="/about"
        style={{
          color: 'var(--color-surface-0)',
          textDecoration: 'underline',
          fontSize: '13px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        Learn more
      </Link>
    </div>
  );
}
