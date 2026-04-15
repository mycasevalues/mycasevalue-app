'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * DataFreshness — Small pill badge showing when data was last updated.
 * Fetches from Supabase data_sources table; falls back to static value.
 * Links to /methodology on click.
 */

const FALLBACK_LABEL = 'Updated Q4 2025';

interface DataFreshnessProps {
  style?: React.CSSProperties;
}

export default function DataFreshness({ style }: DataFreshnessProps) {
  const [label, setLabel] = useState(FALLBACK_LABEL);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    (async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(url, key);
        const { data } = await supabase
          .from('data_sources')
          .select('last_updated')
          .order('last_updated', { ascending: false })
          .limit(1);

        if (data && data.length > 0 && (data[0] as any).last_updated) {
          const d = new Date((data[0] as any).last_updated);
          const q = Math.ceil((d.getMonth() + 1) / 3);
          setLabel(`Updated Q${q} ${d.getFullYear()}`);
        }
      } catch {
        /* Keep fallback */
      }
    })();
  }, []);

  return (
    <Link
      href="/methodology"
      title="View data methodology and sources"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: '#EDF3FB',
        color: 'var(--accent-primary)',
        fontSize: '11px',
        fontWeight: 500,
        fontFamily: 'var(--font-body)',
        padding: '2px 8px',
        borderRadius: '4px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        lineHeight: '18px',
        transition: 'background 150ms ease',
        ...style,
      }}
    >
      {label}
    </Link>
  );
}
