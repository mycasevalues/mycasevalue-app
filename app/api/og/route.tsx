import { ImageResponse } from '@vercel/og';
import { REAL_DATA } from '../../../lib/realdata';
import { SITS } from '../../../lib/data';

export const runtime = 'edge';

// Translations object
type Locale = 'en' | 'es';
const translations: Record<Locale, Record<string, string>> = {
  en: {
    'Plaintiff Win Rate': 'Win Rate',
    'Median Settlement': 'Median Settlement',
    'Cases': 'Cases',
    'Federal Court Data': 'Federal Court Data',
    'federal cases. What really happened.': 'federal cases. What really happened.',
    'Top Case Types': 'Top Case Types',
    'Case Type': 'Case Type',
    'federal cases analyzed': 'federal cases analyzed',
    'plaintiff win rate': 'case outcome rate',
    'Settlement Range': 'Settlement Range',
    'settle before trial': 'settle before trial',
    'Based on federal court records': 'Based on federal court records',
    'average win rate': 'average win rate',
    'Top Case Types by Volume': 'Top Case Types by Volume',
    'United States Court of Appeals, Circuit': 'United States Court of Appeals, Circuit',
    'District not found': 'District not found',
    'Case type not found': 'Case type not found',
    'Research real outcomes from federal court records. Get win rates, settlement ranges, timelines, and judge analytics.':
      'Research real outcomes from federal court records. Get win rates, settlement ranges, timelines, and judge analytics.',
    'www.mycasevalues.com': 'www.mycasevalues.com',
  },
  es: {
    'Win Rate': 'Tasa de Éxito del Resultados',
    'Median Settlement': 'Acuerdo Mediano',
    'Cases': 'Casos',
    'Federal Court Data': 'Datos de Tribunales Federales',
    'federal cases. What really happened.': 'casos federales. Lo que realmente pasó.',
    'Top Case Types': 'Principales Tipos de Caso',
    'Case Type': 'Tipo de Caso',
    'federal cases analyzed': 'casos federales analizados',
    'plaintiff win rate': 'tasa de éxito del demandante',
    'Settlement Range': 'Rango de Acuerdo',
    'settle before trial': 'se resuelven antes del juicio',
    'Based on federal court records': 'Basado en registros de tribunales federales',
    'average win rate': 'tasa de éxito promedio',
    'Top Case Types by Volume': 'Principales Tipos de Caso por Volumen',
    'United States Court of Appeals, Circuit': 'Corte de Apelaciones de Estados Unidos, Circuito',
    'District not found': 'Distrito no encontrado',
    'Case type not found': 'Tipo de caso no encontrado',
    'Research real outcomes from federal court records. Get win rates, settlement ranges, timelines, and judge analytics.':
      'Investigue los resultados reales de los registros de tribunales federales. Obtenga tasas de éxito, rangos de acuerdo, plazos y análisis de jueces.',
    'www.mycasevalues.com': 'www.mycasevalues.com',
  },
};

function t(key: string, locale: Locale): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}

// Helper function to get NOS label
function getNOSLabel(code: string, locale: Locale = 'en'): string {
  let label = t('Case Type', locale);
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
function renderNOSImage(code: string, locale: Locale = 'en'): React.ReactElement {
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
        {t('Case type not found', locale)}
      </div>
    );
  }

  const label = getNOSLabel(code, locale);
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
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '48px' }}>
        <div
          style={{
            fontSize: '40px',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '24px',
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
          {formatNumber(caseCount)} {t('federal cases analyzed', locale)}
        </div>
      </div>

      {/* Win Rate - Large Number */}
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '50px' }}>
        <div
          style={{
            fontSize: '96px',
            fontWeight: '800',
            color: '#0A50A2',
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
          {t('plaintiff win rate', locale)}
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
          {t('Settlement Range', locale)}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '12px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${settlementRate}%`,
              backgroundColor: '#0A50A2',
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
          {settlementRate.toFixed(0)}% {t('settle before trial', locale)}
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
        <div style={{ fontSize: '14px', color: '#999999' }}>{t('Based on federal court records', locale)}</div>
        <div
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#0A50A2',
          }}
        >
          MyCaseValue
        </div>
      </div>
    </div>
  );
}

// District page image
function renderDistrictImage(districtCode: string, locale: Locale = 'en'): React.ReactElement {
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
        {t('District not found', locale)}
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
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '48px' }}>
        <div
          style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '8px',
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
          {t('United States Court of Appeals, Circuit', locale)} {district.circuit}
        </div>
      </div>

      {/* Win Rate */}
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '50px' }}>
        <div
          style={{
            fontSize: '72px',
            fontWeight: '800',
            color: '#0A50A2',
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
          {t('average win rate', locale)}
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
          {t('Top Case Types by Volume', locale)}
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
                  backgroundColor: '#0A50A2',
                  borderRadius: '4px',
                  width: `${(caseType.total / (topCases[0]?.total || 1)) * 200}px`,
                  marginRight: '12px',
                }}
              />
              <div
                style={{
                  fontSize: '14px',
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
            color: '#0A50A2',
          }}
        >
          MyCaseValue
        </div>
      </div>
    </div>
  );
}

// Homepage image
function renderHomeImage(locale: Locale = 'en'): React.ReactElement {
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
            marginBottom: '24px',
            maxWidth: '800px',
          }}
        >
          5.1M {t('federal cases. What really happened.', locale).split('.')[0]}.
          <br />
          <span style={{ color: '#0A50A2' }}>{t('federal cases. What really happened.', locale).split('. ')[1]}</span>
        </div>

        {/* Subheading */}
        <div
          style={{
            fontSize: '24px',
            color: '#666666',
            marginBottom: '48px',
            maxWidth: '700px',
          }}
        >
          {t('Research real outcomes from federal court records. Get win rates, settlement ranges, timelines, and judge analytics.', locale)}
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#0A50A2',
            textDecoration: 'underline',
          }}
        >
          {t('www.mycasevalues.com', locale)}
        </div>
      </div>
    </div>
  );
}

// Generic title + subtitle image (used by blog, pricing, attorney, etc.)
function renderGenericImage(title: string, subtitle?: string): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        backgroundImage: 'linear-gradient(135deg, rgba(10, 102, 194, 0.12) 0%, rgba(0, 65, 130, 0.06) 100%)',
        padding: '80px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: title.length > 60 ? '42px' : '56px',
            fontWeight: '800',
            color: '#000000',
            lineHeight: '1.2',
            marginBottom: subtitle ? '24px' : '40px',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: '28px',
              color: '#555555',
              lineHeight: '1.4',
              maxWidth: '800px',
              marginBottom: '40px',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 'auto',
        }}
      >
        <div style={{ fontSize: '16px', color: '#999999' }}>www.mycasevalues.com</div>
        <div
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#0A50A2',
          }}
        >
          MyCaseValue
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
  const title = searchParams.get('title') || '';
  const subtitle = searchParams.get('subtitle') || '';
  const localeParam = searchParams.get('locale') || 'en';
  const locale = (localeParam === 'es' ? 'es' : 'en') as Locale;

  try {
    let imageElement: React.ReactElement;

    if (type === 'generic' && title) {
      imageElement = renderGenericImage(title, subtitle || undefined);
    } else if (type === 'nos' && code) {
      imageElement = renderNOSImage(code, locale);
    } else if (type === 'district' && district) {
      imageElement = renderDistrictImage(district, locale);
    } else {
      imageElement = renderHomeImage(locale);
    }

    return new ImageResponse(imageElement, {
      width: 1200,
      height: 630,
    });
  } catch (error) {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
