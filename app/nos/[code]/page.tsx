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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F7F8FA', color: '#212529' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Case type not found</h1>
          <p className="mb-6" style={{ color: '#4B5563' }}>NOS code {code} does not exist in our database.</p>
          <Link href="/" className="inline-block px-6 py-3 font-semibold text-white transition"
            style={{ background: '#7C3AED', borderRadius: '2px' }}>
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
        { label: 'Dismissed', value: outcomeData.dismiss || 53, color: '#4B5563' },
        { label: 'Trial Win', value: outcomeData.trial_win || 10, color: '#6D28D9' },
        { label: 'Trial Loss', value: outcomeData.trial_loss || 7, color: '#EF4444' },
      ].map(o => {
        const total = [outcomeData.fav_set || 30, outcomeData.dismiss || 53, outcomeData.trial_win || 10, outcomeData.trial_loss || 7].reduce((s, v) => s + v, 0);
        return { ...o, percentage: total > 0 ? Math.round((o.value / total) * 100) : 0 };
      });

  // Outcome distribution for horizontal stacked bar (Win/Settlement/Other)
  const outcomeDist = {
    win: real?.wr || winRate,
    settlement: real?.sp || settleRate,
    other: Math.max(0, 100 - (real?.wr || winRate) - (real?.sp || settleRate))
  };

  // Recovery range from REAL_DATA
  const recoveryRange = real?.rng;

  // Key factors from REAL_DATA
  const keyFactors = real?.factors;

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

  // Get 3-4 related case types with their data
  const relatedCaseTypes = relatedCodes.slice(0, 4).map((rel) => {
    const relData = REAL_DATA[rel.code] || { wr: 42, sp: 30, total: 500 };
    return {
      code: rel.code,
      label: rel.label,
      wr: relData.wr || 42,
      sp: relData.sp || 30,
      total: relData.total || 500,
    };
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
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)', background: '#F7F8FA', color: '#4B5563' }}>
      <style>{`
        .nos-header {
          background: #1B3A5C;
          color: #FFFFFF;
        }

        .breadcrumb {
          font-size: 13px;
          font-family: var(--font-body);
          color: #E5E7EB;
          margin-bottom: 16px;
        }

        .breadcrumb a {
          color: #E5E7EB;
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
          background: #7C3AED;
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
          border: 1px solid #E5E7EB;
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
          color: #4B5563;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
        }

        .outcome-bar {
          display: flex;
          height: 32px;
          border-radius: 2px;
          overflow: hidden;
          background: #F7F8FA;
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
          border-top: 1px solid #E5E7EB;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-family: var(--font-body);
          color: #4B5563;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .related-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 2px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          display: block;
        }

        .related-card:hover {
          border-color: #6D28D9;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.12);
          transform: translateY(-2px);
        }

        .related-card-code {
          font-size: 11px;
          font-weight: 700;
          color: #4B5563;
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
          color: #4B5563;
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
          background: #7C3AED;
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
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2);
        }

        .cta-button:hover {
          background: #D41515;
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.25);
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
          border: 1px solid #E5E7EB;
          border-radius: 2px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .outcome-dist-bar {
          display: flex;
          height: 20px;
          border-radius: 2px;
          overflow: hidden;
          background: #F7F8FA;
          margin-bottom: 20px;
        }

        .outcome-dist-segment {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 600;
          font-family: var(--font-display);
        }

        .outcome-dist-labels {
          display: flex;
          gap: 16px;
          margin-top: 12px;
          font-size: 12px;
          color: #4B5563;
          font-family: var(--font-body);
        }

        .outcome-dist-label {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .outcome-dist-dot {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .recovery-range-bar {
          position: relative;
          height: 40px;
          margin-bottom: 20px;
        }

        .recovery-track {
          position: absolute;
          top: 16px;
          left: 0;
          right: 0;
          height: 8px;
          background: #E5E7EB;
          border-radius: 4px;
        }

        .recovery-gradient {
          position: absolute;
          top: 16px;
          height: 8px;
          background: linear-gradient(90deg, #B3D9E8 0%, #6D28D9 50%, #1B3A5C 100%);
          border-radius: 4px;
        }

        .recovery-marker {
          position: absolute;
          top: 12px;
          width: 16px;
          height: 16px;
          background: #FFFFFF;
          border: 2px solid #7C3AED;
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .key-factors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .factor-item {
          padding: 12px;
          background: #FAFBFC;
          border: 1px solid #E5E7EB;
          border-radius: 2px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .factor-dot {
          width: 8px;
          height: 8px;
          background: #6D28D9;
          border-radius: 50%;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .factor-text {
          font-size: 13px;
          color: #4B5563;
          font-family: var(--font-body);
          line-height: 1.5;
        }

        .related-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .related-type-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 2px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          display: block;
        }

        .related-type-card:hover {
          border-color: #6D28D9;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.1);
          transform: translateY(-1px);
        }

        .related-type-label {
          font-size: 13px;
          font-weight: 600;
          color: #6D28D9;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
          margin-bottom: 8px;
        }

        .related-type-name {
          font-size: 14px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 10px;
          font-family: var(--font-display);
        }

        .related-type-stats {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
          color: #4B5563;
        }

        .related-type-stat {
          display: flex;
          justify-content: space-between;
        }

        .quick-actions-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-top: 16px;
        }

        .quick-action-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 2px;
          padding: 16px;
          text-decoration: none;
          color: #6D28D9;
          text-align: center;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 13px;
          font-family: var(--font-display);
        }

        .quick-action-card:hover {
          border-color: #6D28D9;
          background: #F0F7FC;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.1);
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
              <p style={{ fontSize: '14px', color: '#E5E7EB', margin: 0, fontFamily: 'var(--font-body)' }}>
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
              { label: 'Win Rate', value: `${winRate}%`, color: '#7C3AED' },
              { label: 'Median Duration', value: `${medianDuration} mo`, color: '#1B3A5C' },
              { label: 'Settlement Rate', value: `${settleRate}%`, color: '#10B981' },
              { label: 'Cases Analyzed', value: totalCases > 0 ? totalCases.toLocaleString() : '500+', color: '#6D28D9' },
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

      {/* Outcome Distribution - Stacked Horizontal Bar (Win/Settlement/Other) */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="content-box">
            <h2 className="section-title">Case Resolution Summary</h2>
            <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
              How {nosInfo.label} cases are resolved
            </p>

            <div className="outcome-dist-bar">
              {outcomeDist.win > 0 && (
                <div
                  className="outcome-dist-segment"
                  style={{
                    background: '#07874A',
                    width: `${outcomeDist.win}%`,
                  }}
                  title={`Win: ${Math.round(outcomeDist.win)}%`}
                >
                  {outcomeDist.win > 12 && `${Math.round(outcomeDist.win)}%`}
                </div>
              )}
              {outcomeDist.settlement > 0 && (
                <div
                  className="outcome-dist-segment"
                  style={{
                    background: '#D97706',
                    width: `${outcomeDist.settlement}%`,
                  }}
                  title={`Settlement: ${Math.round(outcomeDist.settlement)}%`}
                >
                  {outcomeDist.settlement > 12 && `${Math.round(outcomeDist.settlement)}%`}
                </div>
              )}
              {outcomeDist.other > 0 && (
                <div
                  className="outcome-dist-segment"
                  style={{
                    background: '#9CA3AF',
                    width: `${outcomeDist.other}%`,
                  }}
                  title={`Other: ${Math.round(outcomeDist.other)}%`}
                >
                  {outcomeDist.other > 12 && `${Math.round(outcomeDist.other)}%`}
                </div>
              )}
            </div>

            <div className="outcome-dist-labels">
              <div className="outcome-dist-label">
                <div className="outcome-dist-dot" style={{ background: '#07874A' }}></div>
                <span>Win: <strong style={{ color: '#1B3A5C' }}>{Math.round(outcomeDist.win)}%</strong></span>
              </div>
              <div className="outcome-dist-label">
                <div className="outcome-dist-dot" style={{ background: '#D97706' }}></div>
                <span>Settlement: <strong style={{ color: '#1B3A5C' }}>{Math.round(outcomeDist.settlement)}%</strong></span>
              </div>
              <div className="outcome-dist-label">
                <div className="outcome-dist-dot" style={{ background: '#9CA3AF' }}></div>
                <span>Other: <strong style={{ color: '#1B3A5C' }}>{Math.round(outcomeDist.other)}%</strong></span>
              </div>
            </div>
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
                  <span style={{ color: '#4B5563' }}>
                    {o.label}: <strong style={{ color: '#1B3A5C' }}>{o.percentage}%</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Range Visualization */}
      {recoveryRange && recoveryRange.md > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Recovery Range Visualization</h2>
              <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                Typical monetary recovery for {nosInfo.label} cases (in thousands)
              </p>

              <div className="recovery-range-bar">
                <div className="recovery-track"></div>
                <div
                  className="recovery-gradient"
                  style={{
                    left: `${Math.max(0, (recoveryRange.lo / recoveryRange.hi) * 100)}%`,
                    right: `${Math.max(0, 100 - (recoveryRange.hi / recoveryRange.hi) * 100)}%`,
                  }}
                ></div>
                <div
                  className="recovery-marker"
                  style={{
                    left: `${(recoveryRange.md / recoveryRange.hi) * 100}%`,
                  }}
                ></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center', marginTop: '28px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>P25</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#6D28D9', fontFamily: 'var(--font-mono)' }}>${recoveryRange.lo}K</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>P50 (Median)</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#7C3AED', fontFamily: 'var(--font-mono)' }}>${recoveryRange.md}K</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>P75</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#6D28D9', fontFamily: 'var(--font-mono)' }}>${recoveryRange.hi}K</div>
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
              <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
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
                        border: '1px solid #E5E7EB',
                        borderRadius: '2px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>
                            {CIRCUIT_NAMES[circuit] || circuit} Circuit
                          </span>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            color: wr >= winRate ? '#07874A' : '#7C3AED',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {wr}%
                          </span>
                        </div>
                        <div style={{ height: '4px', background: '#E5E7EB', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.min(wr, 100)}%`,
                            background: wr >= winRate ? '#07874A' : '#7C3AED',
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

      {/* Key Factors */}
      {keyFactors && keyFactors.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Key Factors</h2>
              <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                Important factors that influence outcomes in {nosInfo.label} cases
              </p>
              <div className="key-factors-grid">
                {keyFactors.map((factor: any, idx: number) => (
                  <div key={idx} className="factor-item">
                    <div className="factor-dot"></div>
                    <div className="factor-text">{typeof factor === 'string' ? factor : factor.label || factor}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Case Types */}
      {relatedCaseTypes.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Related Case Types</h2>
              <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                Other case types in the {nosInfo.category} category
              </p>
              <div className="related-types-grid">
                {relatedCaseTypes.map((caseType) => (
                  <Link key={caseType.code} href={`/nos/${caseType.code}`} className="related-type-card">
                    <div className="related-type-label">NOS {caseType.code}</div>
                    <div className="related-type-name">{caseType.label}</div>
                    <div className="related-type-stats">
                      <div className="related-type-stat">
                        <span>Win Rate:</span>
                        <strong style={{ color: caseType.wr >= 50 ? '#07874A' : '#7C3AED' }}>{caseType.wr}%</strong>
                      </div>
                      <div className="related-type-stat">
                        <span>Settlement:</span>
                        <strong style={{ color: '#6D28D9' }}>{caseType.sp}%</strong>
                      </div>
                      <div className="related-type-stat">
                        <span>Cases:</span>
                        <strong style={{ color: '#4B5563' }}>{caseType.total.toLocaleString()}</strong>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="content-box">
            <h2 className="section-title">Quick Actions</h2>
            <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
              Next steps for your research
            </p>
            <div className="quick-actions-bar">
              <Link href={`/report/${code}`} className="quick-action-card">
                - View Report
              </Link>
              <Link href="/calculator" className="quick-action-card">
                - Calculator
              </Link>
              <Link href="/compare" className="quick-action-card">
                - Compare Cases
              </Link>
              <Link href="/odds" className="quick-action-card">
                - Odds Finder
              </Link>
            </div>
          </div>
        </div>
      </section>

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
      <section className="px-4 sm:px-6 lg:px-8 py-16 text-center" style={{ background: '#FFFFFF', borderTop: '1px solid #E5E7EB' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 12px 0', color: '#212529', fontFamily: 'var(--font-display)' }}>
            Research Your {nosInfo.label} Case
          </h2>
          <p style={{ fontSize: '15px', color: '#4B5563', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
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
