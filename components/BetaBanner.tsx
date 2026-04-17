import Link from 'next/link';

export default function BetaBanner() {
  return (
    <div
      style={{
        background: 'var(--text1, #18181A)',
        color: 'rgba(255,255,255,0.7)',
        minHeight: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '4px 24px',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.4,
        textAlign: 'center',
        letterSpacing: '0.01em',
        borderBottom: '1px solid #333333',
      }}
    >
      <span>Public beta</span>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
      <span>Free access to federal court analytics and case intelligence</span>
      <Link
        href="/about"
        style={{
          color: 'var(--gold, #C4882A)',
          textDecoration: 'underline',
          fontSize: '12px',
          fontWeight: 500,
        }}
      >
        Learn more
      </Link>
    </div>
  );
}
