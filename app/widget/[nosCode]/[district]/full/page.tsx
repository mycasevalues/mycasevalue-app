import { SITS } from '@/lib/data';
import { REAL_DATA } from '@/lib/realdata';
import { formatSettlementAmount } from '@/lib/format';
import { getWinRateColor } from '@/lib/color-scale';

export const revalidate = 86400; // ISR: 24 hours

interface FullWidgetPageProps {
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

export default function FullWidgetPage({ params }: FullWidgetPageProps) {
  const { nosCode, district } = params;
  const data = REAL_DATA[nosCode];

  if (!data) {
    return (
      <div style={{
        width: '340px',
        height: '220px',
        fontFamily: 'var(--font-ui)',
        fontSize: '12px',
        padding: '12px',
        boxSizing: 'border-box',
        backgroundColor: 'var(--card)',
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
  const p25Settlement = data.rng?.lo || 0;
  const p75Settlement = data.rng?.hi || 0;
  const avgDuration = data.mo || 0;

  // Calculate proportional positions for the range bar
  const min = Math.min(p25Settlement, medianSettlement, p75Settlement);
  const max = Math.max(p25Settlement, medianSettlement, p75Settlement);
  const range = max - min || 1;

  const p25Pos = ((p25Settlement - min) / range) * 100;
  const medianPos = ((medianSettlement - min) / range) * 100;
  const p75Pos = ((p75Settlement - min) / range) * 100;

  return (
    <div style={{
      width: '340px',
      height: '220px',
      fontFamily: 'var(--font-ui)',
      fontSize: '12px',
      padding: '16px',
      boxSizing: 'border-box',
      backgroundColor: 'var(--card)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      {/* Attribution */}
      <div style={{ fontSize: '12px', color: 'var(--link)', fontWeight: 500 }}>
        Powered by MyCaseValue
      </div>

      {/* Case type name */}
      <div style={{
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--text1)',
      }}>
        {caseTypeLabel}
      </div>

      {/* Win rate - large, colored */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
      }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 700,
          color: colorInfo.text,
        }}>
          {winRate.toFixed(0)}%
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          favorable outcomes
        </div>
      </div>

      {/* Settlement range bar */}
      <div style={{ marginTop: '8px' }}>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
          Settlement Range (P25–P75)
        </div>
        <div style={{
          position: 'relative',
          height: '24px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          {/* Range bar background */}
          <div
            style={{
              position: 'absolute',
              left: `${p25Pos}%`,
              right: `${100 - p75Pos}%`,
              height: '100%',
              backgroundColor: 'var(--link-bg, #EFF6FF)',
              borderRadius: '4px',
            }}
          />
          {/* Median marker */}
          <div
            style={{
              position: 'absolute',
              left: `${medianPos}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '3px',
              height: '16px',
              backgroundColor: 'var(--link)',
              borderRadius: '2px',
              zIndex: 2,
            }}
          />
          {/* Labels */}
          <div
            style={{
              position: 'absolute',
              left: `${p25Pos}%`,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '12px',
              color: 'var(--text1)',
              fontWeight: 500,
              marginLeft: '4px',
            }}
          >
            {formatSettlementAmount(p25Settlement, { compact: true })}
          </div>
          <div
            style={{
              position: 'absolute',
              right: `${100 - p75Pos}%`,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '12px',
              color: 'var(--text1)',
              fontWeight: 500,
              marginRight: '4px',
              textAlign: 'right',
            }}
          >
            {formatSettlementAmount(p75Settlement, { compact: true })}
          </div>
        </div>
      </div>

      {/* Average duration */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginTop: '8px',
      }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
            Median Settlement
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text1)',
          }}>
            {formatSettlementAmount(medianSettlement, { compact: true })}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
            Avg. Duration
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text1)',
          }}>
            {avgDuration} {avgDuration === 1 ? 'month' : 'months'}
          </div>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const nosCode = "${nosCode}";
              const district = "${district}";
              const widgetType = "full";

              fetch('/api/widget/impression', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nos_code: nosCode, district, widget_type: widgetType })
              }).catch(err => console.error('Widget impression tracking failed:', err));
            })();
          `,
        }}
      />
    </div>
  );
}
