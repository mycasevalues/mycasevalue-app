import { SITS } from '@/lib/data';
import { REAL_DATA } from '@/lib/realdata';
import { formatSettlementAmount } from '@/lib/format';
import { getWinRateColor } from '@/lib/color-scale';

export const revalidate = 86400; // ISR: 24 hours

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

interface WidgetPageProps {
  params: { nosCode: string; district: string };
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
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af',
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
      backgroundColor: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      {/* Header with attribution */}
      <div style={{ fontSize: '9px', color: '#0A66C2', fontWeight: 500 }}>
        Powered by MyCaseValue
      </div>

      {/* Case type name */}
      <div style={{
        fontSize: '14px',
        fontWeight: 600,
        color: '#1f2937',
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
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          plaintiff win rate
        </div>
      </div>

      {/* Median settlement in monospace */}
      <div style={{
        fontFamily: '"Courier New", monospace',
        fontSize: '13px',
        fontWeight: 500,
        color: '#374151',
        marginTop: '4px',
      }}>
        {formattedSettlement} median
      </div>

      {/* View full data link */}
      <a
        href={`/nos/${nosCode}`}
        style={{
          fontSize: '11px',
          color: '#0A66C2',
          textDecoration: 'none',
          fontWeight: 500,
          marginTop: '4px',
          display: 'inline-block',
        }}
      >
        View full data →
      </a>
    </div>
  );
}
