import { Metadata } from 'next';
import { SITS } from '@/lib/data';
import { REAL_DATA } from '@/lib/realdata';
import { formatSettlementAmount } from '@/lib/format';
import { getWinRateColor } from '@/lib/color-scale';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 86400; // ISR: 24 hours

export async function generateMetadata({ params }: WidgetPageProps): Promise<Metadata> {
  const { nosCode } = params;

  let caseTypeName = '';
  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      if (option.nos === nosCode && !caseTypeName) {
        caseTypeName = option.label;
      }
    });
  });

  const title = `${caseTypeName} Widget | MyCaseValue`;
  const description = `Embed ${caseTypeName} case statistics and settlement data on your website with MyCaseValue's embeddable widget.`;
  const url = `${SITE_URL}/widget/${nosCode}/${params.district}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
    },
  };
}

export async function generateStaticParams() {
  const params: Array<{ nosCode: string; district: string }> = [];

  // Generate params for all NOS codes with 'all' district
  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      params.push({ nosCode: option.nos, district: 'all' });
    });
  });

  return params;
}

interface WidgetPageProps {
  params: { nosCode: string; district: string };
}

function getNOSLabel(nosCode: string): string {
  let label = '';
  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      if (option.nos === nosCode && !label) {
        label = option.label;
      }
    });
  });
  return label || `Case Type ${nosCode}`;
}

export default function WidgetPage({ params }: WidgetPageProps) {
  const { nosCode, district } = params;
  const data = REAL_DATA[nosCode];

  if (!data) {
    return (
      <div style={{
        width: '280px',
        height: '160px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: '12px',
        padding: '12px',
        boxSizing: 'border-box',
        backgroundColor: 'var(--card, #FFFFFF)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-muted)',
      }}>
        Case type not found
      </div>
    );
  }

  const caseTypeLabel = getNOSLabel(nosCode);
  const winRate = data.wr || 0;
  const colorInfo = getWinRateColor(winRate);
  const medianSettlement = data.rng?.md || 0;
  const formattedSettlement = formatSettlementAmount(medianSettlement, { compact: true });

  return (
    <div style={{
      width: '280px',
      height: '160px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: '12px',
      padding: '12px',
      boxSizing: 'border-box',
      backgroundColor: 'var(--card, #FFFFFF)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      {/* Header with attribution */}
      <div style={{ fontSize: '9px', color: 'var(--accent-primary)', fontWeight: 500 }}>
        Powered by MyCaseValue
      </div>

      {/* Case type name */}
      <div style={{
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        marginTop: '4px',
      }}>
        {caseTypeLabel}
      </div>

      {/* Win rate - large, colored */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '6px',
        marginTop: '4px',
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 700,
          color: colorInfo.text,
        }}>
          {winRate.toFixed(0)}%
        </div>
        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
          case outcome rate
        </div>
      </div>

      {/* Median settlement in monospace */}
      <div style={{
        fontFamily: '"Courier New", monospace',
        fontSize: '13px',
        fontWeight: 500,
        color: 'var(--color-text-primary)',
        marginTop: '4px',
      }}>
        {formattedSettlement} median
      </div>

      {/* View full data link */}
      <a
        href={`/nos/${nosCode}`}
        style={{
          fontSize: '11px',
          color: 'var(--accent-primary)',
          textDecoration: 'none',
          fontWeight: 500,
          marginTop: '4px',
          display: 'inline-block',
        }}
      >
        View full data \u2192
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var nosCode = ${JSON.stringify(nosCode)};
              var district = ${JSON.stringify(district)};
              var widgetType = "compact";

              fetch('/api/widget/impression', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nos_code: nosCode, district: district, widget_type: widgetType })
              }).catch(function(err) { console.error('Widget impression tracking failed:', err); });
            })();
          `,
        }}
      />
    </div>
  );
}
