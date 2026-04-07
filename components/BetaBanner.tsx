import Link from 'next/link';

export default function BetaBanner() {
  return (
    <div
      style={{
        background: '#0966C3',
        color: '#ffffff',
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
      <span>MyCaseValue is in public beta. All features are free and open. No account required.</span>
      <Link
        href="/about"
        style={{
          color: '#ffffff',
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
