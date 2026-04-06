import { Metadata } from 'next';
import Link from 'next/link';
import { SITS, OUTCOME_DATA } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';
import { SITE_URL } from '../../../lib/site-config';

// Helper function to flatten SITS and map NOS codes to display names
function getNOSMap(): Record<string, { label: string; category: string; description?: string }> {
  const nosMap: Record<string, { label: string; category: string; description?: string }> = {};

  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      const key = option.nos;
      if (!nosMap[key]) {
        nosMap[key] = { label: option.label, category: category.label, description: option.d };
      }
    });
  });

  return nosMap;
}

// Get all unique NOS codes for static generation
function getAllNOSCodes(): string[] {
  const nosSet = new Set<string>();
  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      nosSet.add(option.nos);
    });
  });
  return Array.from(nosSet).sort();
}

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  const codes = getAllNOSCodes();
  return codes.map((code) => ({ code }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return {
      title: 'Case Type Not Found — MyCaseValue',
      description: 'This case type does not exist in our database.',
    };
  }

  const title = `${nosInfo.label} (NOS ${code}) — Win Rates, Timelines & Outcomes`;
  const description = `Research ${nosInfo.label} federal court outcomes. See win rates, median case duration, settlement percentages, and recovery data from real court records. NOS code ${code}.`;
  const canonical = `${SITE_URL}/nos/${code}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${nosInfo.label} — Federal Court Statistics`,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MyCaseValue',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${nosInfo.label} Federal Court Statistics`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${nosInfo.label} — Federal Court Statistics`,
      description,
      images: ['https://www.mycasevalues.com/og-image.png'],
    },
  };
}

export default async function NOSPage({ params }: PageProps) {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F6F7', color: '#212529' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Case type not found</h1>
          <p className="mb-6" style={{ color: '#455A64' }}>NOS code {code} does not exist in our database.</p>
          <Link href="/" className="inline-block px-6 py-3 font-semibold text-white transition"
            style={{ background: '#E8171F', borderRadius: '2px' }}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const outcomeData = OUTCOME_DATA[code] || OUTCOME_DATA._default;
  const real = REAL_DATA[code];

  // Prefer REAL_DATA for stats when available
  const totalCases = real?.total || 0;
  const winRate = real?.wr != null ? Math.round(real.wr) : 42;
  const medianDuration = real?.mo || outcomeData.set_mo || 6;
  const settleRate = real?.sp != null ? Math.round(real.sp) : 30;

  // Outcome bars: prefer REAL_DATA ends, fall back to OUTCOME_DATA
  const outcomePercentages = real?.ends
    ? real.ends.map((e: any) => ({
        label: e.l,
        value: e.p,
        percentage: Math.round(e.p),
        color: e.c,
        count: e.n,
      }))
    : [
        { label: 'Settled', value: outcomeData.fav_set || 30, color: '#10B981' },
        { label: 'Dismissed', value: outcomeData.dismiss || 53, color: '#455A64' },
        { label: 'Trial Win', value: outcomeData.trial_win || 10, color: '#006997' },
        { label: 'Trial Loss', value: outcomeData.trial_loss || 7, color: '#EF4444' },
      ].map(o => {
        const total = [outcomeData.fav_set || 30, outcomeData.dismiss || 53, outcomeData.trial_win || 10, outcomeData.trial_loss || 7].reduce((s, v) => s + v, 0);
        return { ...o, percentage: total > 0 ? Math.round((o.value / total) * 100) : 0 };
      });

  // Recovery range from REAL_DATA
  const recoveryRange = real?.rng;

  // Circuit court rates from REAL_DATA
  const circuitRates = real?.circuit_rates;
  const CIRCUIT_NAMES: Record<string, string> = {
    '1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th',
    '6': '6th', '7': '7th', '8': '8th', '9': '9th', '10': '10th',
    '11': '11th', 'dc': 'D.C.',
  };

  // Related NOS codes in same category
  const relatedCodes: { code: string; label: string; category?: string }[] = [];
  SITS.forEach((cat: any) => {
    if (cat.label === nosInfo.category) {
      cat.opts.forEach((opt: any) => {
        if (opt.nos !== code && relatedCodes.length < 6) {
          relatedCodes.push({ code: opt.nos, label: opt.label, category: cat.label });
        }
      });
    }
  });

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
          { '@type': 'ListItem', position: 2, name: 'Cases', item: 'https://www.mycasevalues.com/nos' },
          { '@type': 'ListItem', position: 3, name: nosInfo.label, item: `https://mycasevalues.com/nos/${code}` },
        ],
      },
      {
        '@type': 'Dataset',
        '@id': `https://mycasevalues.com/nos/${code}#dataset`,
        name: `${nosInfo.label} Federal Court Statistics`,
        alternateName: `NOS ${code} - ${nosInfo.label} Case Data`,
        description: `Comprehensive federal court statistics for ${nosInfo.label} (NOS ${code}) cases. Includes win rates, case duration, settlement data, and outcome distribution from U.S. federal court system.`,
        url: `https://mycasevalues.com/nos/${code}`,
        creator: {
          '@type': 'Organization',
          name: 'Federal Judicial Center',
          url: 'https://www.fjc.gov',
        },
        provider: {
          '@type': 'Organization',
          name: 'MyCaseValue',
          url: 'https://mycasevalues.com',
        },
        isAccessibleForFree: true,
        spatialCoverage: 'United States Federal Courts',
        temporalCoverage: '1999-..',
        keywords: [
          `${nosInfo.label} statistics`,
          `NOS code ${code}`,
          'federal court outcomes',
          'case settlement data',
          'litigation timeline',
          nosInfo.category,
        ],
        distribution: {
          '@type': 'DataDownload',
          contentUrl: `https://mycasevalues.com/nos/${code}`,
          encodingFormat: 'application/json',
          inLanguage: 'en-US',
        },
        variableMeasured: [
          {
            '@type': 'PropertyValue',
            name: 'Win Rate',
            value: `${winRate}%`,
          },
          {
            '@type': 'PropertyValue',
            name: 'Median Case Duration',
            value: `${medianDuration} months`,
          },
          {
            '@type': 'PropertyValue',
            name: 'Settlement Rate',
            value: `${settleRate}%`,
          },
          {
            '@type': 'PropertyValue',
            name: 'Total Cases Tracked',
            value: totalCases > 0 ? totalCases.toLocaleString() : '500+',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the win rate for ${nosInfo.label} cases?`,
            acceptedAnswer: { '@type': 'Answer', text: `Based on historical federal court data, ${nosInfo.label} cases have an approximate win rate of ${winRate}%. This includes both trial victories and favorable settlements. Individual results vary significantly based on case facts, jurisdiction, and representation.` },
          },
          {
            '@type': 'Question',
            name: `How long do ${nosInfo.label} cases typically take?`,
            acceptedAnswer: { '@type': 'Answer', text: `The median duration for ${nosInfo.label} cases is approximately ${medianDuration} months from filing to resolution. This varies based on court district, case complexity, and whether the case settles or goes to trial.` },
          },
          {
            '@type': 'Question',
            name: `What is NOS code ${code}?`,
            acceptedAnswer: { '@type': 'Answer', text: `NOS (Nature of Suit) code ${code} corresponds to ${nosInfo.label} cases in the federal court system. It falls under the ${nosInfo.category} category.` },
          },
          {
            '@type': 'Question',
            name: `What are the possible outcomes in ${nosInfo.label} cases?`,
            acceptedAnswer: { '@type': 'Answer', text: `${nosInfo.label} cases can result in several outcomes: settlement (${settleRate}% settlement rate), trial victory, trial loss, or dismissal. The distribution varies based on case-specific factors and jurisdiction.` },
          },
        ],
      },
      {
        '@type': 'CreativeWork',
        name: `${nosInfo.label} Case Analysis & Research`,
        author: {
          '@type': 'Organization',
          name: 'MyCaseValue',
          url: 'https://mycasevalues.com',
        },
        datePublished: new Date().toISOString().split('T')[0],
        description: `Research guide and statistics for ${nosInfo.label} cases (NOS ${code}). Contains federal court outcome data, settlement information, and timeline analysis.`,
        inLanguage: 'en-US',
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)', background: '#F5F6F7', color: '#455A64' }}>
      <style>{`
        .nos-header {
          background: #00172E;
          color: #FFFFFF;
        }

        .breadcrumb {
          font-size: 13px;
          font-family: var(--font-body);
          color: #D5D8DC;
          margin-bottom: 16px;
        }

        .breadcrumb a {
          color: #D5D8DC;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .breadcrumb a:hover {
          color: #FFFFFF;
        }

        .breadcrumb-separator {
          margin: 0 8px;
        }

        .nos-badge {
          display: inline-block;
          padding: 8px 14px;
          background: #E8171F;
          color: #FFFFFF;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 700;
          border: none;
          letter-spacing: 0.5px;
          font-family: var(--font-display);
        }

        .stat-card {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 2px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .stat-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          font-family: var(--font-display);
          margin: 12px 0 8px;
          letter-spacing: -1px;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 600;
          color: #455A64;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
        }

        .outcome-bar {
          display: flex;
          height: 32px;
          border-radius: 2px;
          overflow: hidden;
          background: #F5F6F7;
          margin-bottom: 16px;
        }

        .outcome-segment {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-display);
          transition: opacity 0.2s ease;
        }

        .outcome-legend {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid #D5D8DC;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-family: var(--font-body);
          color: #455A64;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .related-card {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 2px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          display: block;
        }

        .related-card:hover {
          border-color: #006997;
          box-shadow: 0 4px 12px rgba(0, 105, 151, 0.12);
          transform: translateY(-2px);
        }

        .related-card-code {
          font-size: 11px;
          font-weight: 700;
          color: #455A64;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
        }

        .related-card-name {
          font-size: 14px;
          font-weight: 600;
          color: #212529;
          margin-top: 8px;
          font-family: var(--font-display);
        }

        .related-card-category {
          font-size: 12px;
          color: #455A64;
          margin-top: 4px;
          font-family: var(--font-body);
        }

        .disclaimer-box {
          background: #FEF3C7;
          border: 1px solid #FCD34D;
          border-radius: 2px;
          padding: 16px;
        }

        .disclaimer-box h3 {
          color: #92400E;
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 8px 0;
          font-family: var(--font-display);
        }

        .disclaimer-box p {
          color: #78350F;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
          font-family: var(--font-body);
        }

        .cta-button {
          background: #E8171F;
          color: #FFFFFF;
          padding: 14px 28px;
          border-radius: 2px;
          text-decoration: none;
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-display);
          border: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          box-shadow: 0 2px 8px rgba(232, 23, 31, 0.2);
        }

        .cta-button:hover {
          background: #D41515;
          box-shadow: 0 4px 16px rgba(232, 23, 31, 0.3);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 28px !important;
          }
          h2 {
            font-size: 18px !important;
          }
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #212529;
          margin-bottom: 20px;
          font-family: var(--font-display);
        }

        .content-box {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 2px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* Dark Navy Header */}
      <header className="nos-header px-4 sm:px-6 lg:px-8 py-12" style={{ paddingTop: 'clamp(16px, 4vw, 48px)', paddingBottom: 'clamp(16px, 4vw, 48px)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/nos">Case Types</Link>
            <span className="breadcrumb-separator">/</span>
            <span style={{ color: '#FFFFFF' }}>{nosInfo.label}</span>
          </div>

          <div className="flex items-start justify-between gap-6" style={{ flexWrap: 'wrap' }}>
            <div className="flex-1">
              <h1 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 700, margin: '0 0 12px 0', fontFamily: 'var(--font-display)', lineHeight: 1.2, color: '#FFFFFF' }}>
                {nosInfo.label}
              </h1>
              <p style={{ fontSize: '14px', color: '#D5D8DC', margin: 0, fontFamily: 'var(--font-body)' }}>
                {nosInfo.category}
              </p>
            </div>
            <div className="nos-badge">{`NOS ${code}`}</div>
          </div>
        </div>
      </header>

      {/* Key Stats Cards */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Win Rate', value: `${winRate}%`, color: '#E8171F' },
              { label: 'Median Duration', value: `${medianDuration} mo`, color: '#00172E' },
              { label: 'Settlement Rate', value: `${settleRate}%`, color: '#10B981' },
              { label: 'Cases Analyzed', value: totalCases > 0 ? totalCases.toLocaleString() : '500+', color: '#006997' },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome Distribution - CSS-based Chart */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="content-box">
            <h2 className="section-title">Outcome Distribution</h2>

            <div className="outcome-bar">
              {outcomePercentages.map((o, i) => (
                <div
                  key={i}
                  className="outcome-segment"
                  style={{
                    background: o.color,
                    width: `${o.percentage}%`,
                    minWidth: o.percentage > 5 ? 'auto' : '0px',
                  }}
                  title={`${o.label}: ${o.percentage}%`}
                >
                  {o.percentage > 8 && `${o.percentage}%`}
                </div>
              ))}
            </div>

            <div className="outcome-legend">
              {outcomePercentages.map((o, i) => (
                <div key={i} className="legend-item">
                  <div className="legend-color" style={{ background: o.color }}></div>
                  <span style={{ color: '#455A64' }}>
                    {o.label}: <strong style={{ color: '#00172E' }}>{o.percentage}%</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Range */}
      {recoveryRange && recoveryRange.md > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Recovery Range</h2>
              <p style={{ fontSize: '13px', color: '#455A64', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                Typical monetary recovery for {nosInfo.label} cases (in thousands)
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                {/* Visual range bar */}
                <div style={{ flex: 1, position: 'relative', height: '40px' }}>
                  <div style={{ position: 'absolute', top: '16px', left: 0, right: 0, height: '8px', background: '#F0F3F5', borderRadius: '4px' }} />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: `${Math.min((recoveryRange.lo / recoveryRange.hi) * 100, 95)}%`,
                    right: `${Math.max(100 - 100, 0)}%`,
                    height: '8px',
                    background: 'linear-gradient(90deg, #006997, #E8171F)',
                    borderRadius: '4px',
                  }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#455A64', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>25th Percentile</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#006997', fontFamily: 'var(--font-mono)' }}>${recoveryRange.lo}K</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#455A64', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Median</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#E8171F', fontFamily: 'var(--font-mono)' }}>${recoveryRange.md}K</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#455A64', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>75th Percentile</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#006997', fontFamily: 'var(--font-mono)' }}>${recoveryRange.hi}K</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Circuit Court Win Rates */}
      {circuitRates && Object.keys(circuitRates).length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Win Rate by Circuit</h2>
              <p style={{ fontSize: '13px', color: '#455A64', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                Plaintiff win rates for {nosInfo.label} cases across federal circuits
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                {Object.entries(circuitRates)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([circuit, rate]) => {
                    const wr = rate as number;
                    return (
                      <div key={circuit} style={{
                        padding: '12px 16px',
                        background: '#FAFBFC',
                        border: '1px solid #E5EBF0',
                        borderRadius: '2px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>
                            {CIRCUIT_NAMES[circuit] || circuit} Circuit
                          </span>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            color: wr >= winRate ? '#07874A' : '#E8171F',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {wr}%
                          </span>
                        </div>
                        <div style={{ height: '4px', background: '#E5EBF0', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.min(wr, 100)}%`,
                            background: wr >= winRate ? '#07874A' : '#E8171F',
                            borderRadius: '2px',
                          }} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Case Types */}
      {relatedCodes.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title">Similar Case Types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCodes.map((rel) => {
                const relData = REAL_DATA[rel.code];
                return (
                  <Link key={rel.code} href={`/nos/${rel.code}`} className="related-card">
                    <div className="related-card-code">NOS {rel.code}</div>
                    <div className="related-card-name">{rel.label}</div>
                    {relData && relData.total > 0 && (
                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '12px', color: '#455A64' }}>
                        <span style={{ fontWeight: 600, color: relData.wr >= 50 ? '#07874A' : '#E8171F' }}>{relData.wr}% win</span>
                        <span>{relData.sp}% settle</span>
                        <span>{relData.total.toLocaleString()} cases</span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Legal Disclaimer */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="disclaimer-box">
            <h3>Legal Disclaimer</h3>
            <p>
              This information is provided for educational and research purposes only and does not constitute legal advice.
              The statistics presented are based on publicly available federal court data and should not be used
              as the sole basis for legal decisions. Actual case outcomes depend on specific facts, jurisdiction,
              and representation. Please consult with a qualified attorney to discuss your individual case.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 text-center" style={{ background: '#FFFFFF', borderTop: '1px solid #D5D8DC' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 12px 0', color: '#212529', fontFamily: 'var(--font-display)' }}>
            Research Your {nosInfo.label} Case
          </h2>
          <p style={{ fontSize: '15px', color: '#455A64', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
            Explore detailed outcomes, recovery ranges, and timeline data with our interactive research tool.
          </p>
          <Link href="/" className="cta-button">
            Start Your Research — Free
          </Link>
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
