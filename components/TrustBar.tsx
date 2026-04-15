export default function TrustBar() {
  const indicators = [
    {
      text: 'Trusted by ',
      highlight: '10,000+ users',
      icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    },
    {
      text: 'Data from ',
      highlight: '3 official sources',
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    },
    {
      text: '',
      highlight: '94% accuracy rate',
      icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3',
    },
    {
      text: 'Updated ',
      highlight: 'quarterly',
      icon: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    },
    {
      text: 'No ',
      highlight: 'account required',
      icon: 'M17 11V7a5 5 0 0 0-10 0v4M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z',
    },
  ];

  return (
    <div style={{
      background: 'var(--color-surface-0)', borderBottom: '1px solid var(--border-default)', padding: '24px',
    }}>
      <div style={{
        maxWidth: '1140px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: 'wrap', gap: '40px',
      }}>
        {indicators.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              {item.text}<strong style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.highlight}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
