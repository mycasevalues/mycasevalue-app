import { ImageResponse } from '@vercel/og';
import { REAL_DATA } from '../../../lib/realdata';
import { SITS } from '../../../lib/data';

export const runtime = 'edge';

// Helper function to get NOS label
function getNOSLabel(code: string): string {
  let label = 'Case Type';
  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      if (option.nos === code) {
        label = option.label;
      }
    });
  });
  return label;
}

// Helper to format numbers with K, M notation
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Get top 3 case types for a district
function getTopCaseTypes(districtCode?: string) {
  interface CaseTypeData {
    nos: string;
    label: string;
    total: number;
    wr: number;
  }

  const caseTypes: CaseTypeData[] = [];

  Object.entries(REAL_DATA).forEach(([nosCode, data]) => {
    if (data && data.label && data.total) {
      caseTypes.push({
        nos: nosCode,
        label: data.label,
        total: data.total,
        wr: data.wr || 0,
      });
    }
  });

  // Sort by total and take top 3
  return caseTypes.sort((a, b) => b.total - a.total).slice(0, 3);
}

// NOS page image
function renderNOSImage(code: string): React.ReactElement {
  const data = REAL_DATA[code];

  if (!data) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#000000',
        }}
      >
        Case type not found
      </div>
    );
  }

  const label = getNOSLabel(code);
  const winRate = data.wr || 0;
  const settlementRate = data.sp || 0;
  const caseCount = data.total || 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        backgroundImage: 'linear-gradient(135deg, rgba(10, 102, 194, 0.1) 0%, transparent 50%)',
        padding: '60px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
        <div
          style={{
            fontSize: '40px',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '20px',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: '#666666',
          }}
        >
          {formatNumber(caseCount)} federal cases analyzed
        </div>
      </div>

      {/* Win Rate - Large Number */}
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '50px' }}>
        <div
          style={{
            fontSize: '96px',
            fontWeight: '800',
            color: '#0A66C2',
            lineHeight: '1',
          }}
        >
          {winRate.toFixed(0)}%
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#666666',
            marginLeft: '20px',
          }}
        >
          plaintiff win rate
        </div>
      </div>

      {/* Settlement Range Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '50px' }}>
        <div
          style={{
            fontSize: '14px',
            color: '#666666',
            marginBottom: '12px',
          }}
        >
          Settlement Range
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '12px',
            backgroundColor: '#E5E7EB',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${settlementRate}%`,
              backgroundColor: '#0A66C2',
            }}
          />
        </div>
        <div
          style={{
            fontSize: '14px',
            color: '#999999',
            marginTop: '8px',
          }}
        >
          {settlementRate.toFixed(0)}% settle before trial
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 'auto',
        }}
      >
        <div style={{ fontSize: '14px', color: '#999999' }}>Based on federal court records</div>
        <div
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#0A66C2',
          }}
        >
          MyCaseValue
        </div>
      </div>
    </div>
  );
}

// District page image
function renderDistrictImage(districtCode: string): React.ReactElement {
  // Get district name from code
  const districtMap: Record<string, { name: string; circuit: number }> = {
    SDNY: { name: 'S.D.N.Y.', circuit: 2 },
    EDNY: { name: 'E.D.N.Y.', circuit: 2 },
    NDNY: { name: 'N.D.N.Y.', circuit: 2 },
    WDNY: { name: 'W.D.N.Y.', circuit: 2 },
    EDPA: { name: 'E.D. Pa.', circuit: 3 },
    NDCA: { name: 'N.D. Cal.', circuit: 9 },
    SDCA: { name: 'S.D. Cal.', circuit: 9 },
    CDCA: { name: 'C.D. Cal.', circuit: 9 },
    EDCA: { name: 'E.D. Cal.', circuit: 9 },
    CDIL: { name: 'C.D. Ill.', circuit: 7 },
    NDIL: { name: 'N.D. Ill.', circuit: 7 },
    SDIL: { name: 'S.D. Ill.', circuit: 7 },
    EDTX: { name: 'E.D. Tex.', circuit: 5 },
    NDTX: { name: 'N.D. Tex.', circuit: 5 },
    SDTX: { name: 'S.D. Tex.', circuit: 5 },
    WDTX: { name: 'W.D. Tex.', circuit: 5 },
  };

  const district = districtMap[districtCode];
  if (!district) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#000000',
        }}
      >
        District not found
      </div>
    );
  }

  // Calculate aggregated win rate from top cases
  const topCases = getTopCaseTypes(districtCode);
  const avgWinRate =
    topCases.length > 0
      ? topCases.reduce((sum, c) => sum + c.wr, 0) / topCases.length
      : 50;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        backgroundImage: 'linear-gradient(135deg, rgba(10, 102, 194, 0.1) 0%, transparent 50%)',
        padding: '60px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
        <div
          style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '10px',
          }}
        >
          {district.name}
        </div>
        <div
          style={{
            fontSize: '18px',
            color: '#666666',
          }}
        >
          United States Court of Appeals, Circuit {district.circuit}
        </div>
      </div>

      {/* Win Rate */}
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '50px' }}>
        <div
          style={{
            fontSize: '72px',
            fontWeight: '800',
            color: '#0A66C2',
            lineHeight: '1',
          }}
        >
          {avgWinRate.toFixed(0)}%
        </div>
        <div
          style={{
            fontSize: '20px',
            color: '#666666',
            marginLeft: '20px',
          }}
        >
          average win rate
        </div>
      </div>

      {/* Top Case Types */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: '14px',
            color: '#666666',
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontWeight: '600',
          }}
        >
          Top Case Types by Volume
        </div>

        {topCases.map((caseType, index) => (
          <div
            key={caseType.nos}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: index < topCases.length - 1 ? '16px' : '0px',
            }}
          >
            <div
              style={{
                width: '180px',
                fontSize: '14px',
                color: '#333333',
                fontWeight: '500',
              }}
            >
              {caseType.label}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: '1',
              }}
            >
              <div
                style={{
                  height: '8px',
                  backgroundColor: '#0A66C2',
                  borderRadius: '4px',
                  width: `${(caseType.total / (topCases[0]?.total || 1)) * 200}px`,
                  marginRight: '12px',
                }}
              />
              <div
                style={{
                  fontSize: '13px',
                  color: '#666666',
                }}
              >
                {formatNumber(caseType.total)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#0A66C2',
          }}
        >
          MyCaseValue
        </div>
      </div>
    </div>
  );
}

// Homepage image
function renderHomeImage(): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        backgroundImage: 'linear-gradient(135deg, rgba(10, 102, 194, 0.15) 0%, rgba(0, 65, 130, 0.1) 100%)',
        padding: '80px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Main Headline */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: '800',
            color: '#000000',
            lineHeight: '1.2',
            marginBottom: '20px',
            maxWidth: '800px',
          }}
        >
          5.1M federal cases.
          <br />
          <span style={{ color: '#0A66C2' }}>What really happened.</span>
        </div>

        {/* Subheading */}
        <div
          style={{
            fontSize: '24px',
            color: '#666666',
            marginBottom: '40px',
            maxWidth: '700px',
          }}
        >
          Research real outcomes from federal court records. Get win rates, settlement ranges, timelines, and judge analytics.
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#0A66C2',
            textDecoration: 'underline',
          }}
        >
          www.mycasevalues.com
        </div>
      </div>
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'home';
  const code = searchParams.get('code') || '';
  const district = searchParams.get('district') || '';

  try {
    let imageElement: React.ReactElement;

    if (type === 'nos' && code) {
      imageElement = renderNOSImage(code);
    } else if (type === 'district' && district) {
      imageElement = renderDistrictImage(district);
    } else {
      imageElement = renderHomeImage();
    }

    return new ImageResponse(imageElement, {
      width: 1200,
      height: 630,
    });
  } catch (error) {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
