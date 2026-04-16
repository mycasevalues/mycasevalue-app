import Link from 'next/link';

export default function BetaBanner() {
  return (
    <div
      style={{
        background: '#080d19',
        color: 'rgba(255,255,255,0.7)',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '6px 24px',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.4,
        textAlign: 'center',
        letterSpacing: '0.01em',
      }}
    >
      <span>Public beta</span>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
      <span>Free access to federal court analytics and case intelligence</span>
      <Link
        href="/about"
        style={{
          color: 'rgba(255,255,255,0.5)',
          textDecoration: 'underline',
          fontSize: '12px',
          fontWeight: 400,
        }}
      >
        Learn more
      </Link>
    </div>
  );
}
