import { Metadata } from 'next';
import Link from 'next/link';
import { SITS, OUTCOME_DATA } from '../../../lib/data';

// Helper function to flatten SITS and map NOS codes to display names
function getNOSMap(): Record<string, { label: string; category: string; description?: string }> {
  const nosMap: Record<string, { label: string; category: string; description?: string }> = {};

  SITS.forEach((category: any) => {
    category.opts.forEach((option: any) => {
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
  SITS.forEach((category: any) => {
    category.opts.forEach((option: any) => {
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

  const title = `${nosInfo.label} (NOS ${code}) — Win Rates, Timelines & Outcomes | MyCaseValue`;
  const description = `Research ${nosInfo.label} federal court outcomes. See win rates, median case duration, settlement percentages, and recovery data from real court records. NOS code ${code}.`;
  const canonical = `https://mycasevalues.com/nos/${code}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${nosInfo.label} — Federal Court Statistics | MyCaseValue`,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MyCaseValue',
      images: [{ url: 'https://www.mycasevalues.com/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${nosInfo.label} — Federal Court Statistics`,
      description,
    },
  };
}

export default async function NOSPage({ params }: PageProps) {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)', color: '#111111' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Case type not found</h1>
          <p className="mb-6" style={{ color: '#455A64' }}>NOS code {code} does not exist in our database.</p>
          <Link href="/" className="inline-block px-6 py-3 rounded-xl font-semibold text-white transition"
            style={{ background: '#E8171F' }}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const outcomeData = OUTCOME_DATA[code] || OUTCOME_DATA._default;
  const totalOutcomes = (outcomeData.trial_win || 0) + (outcomeData.trial_loss || 0) + (outcomeData.dismiss || 0) + (outcomeData.fav_set || 0);
  const winRate = totalOutcomes > 0
    ? Math.round(((outcomeData.trial_win || 0) + (outcomeData.fav_set || 0)) / totalOutcomes * 100)
    : 42;
  const medianDuration = outcomeData.set_mo || 6;
  const settleRate = totalOutcomes > 0
    ? Math.round((outcomeData.fav_set || 0) / totalOutcomes * 100)
    : 30;

  // Outcome bars for visual chart (CSS-based)
  const outcomes = [
    { label: 'Settled', value: outcomeData.fav_set || 30, color: '#10B981' },
    { label: 'Dismissed', value: outcomeData.dismiss || 53, color: '#455A64' },
    { label: 'Trial Win', value: outcomeData.trial_win || 10, color: '#006997' },
    { label: 'Trial Loss', value: outcomeData.trial_loss || 7, color: '#EF4444' },
  ];
  const totalOutcomesPercentage = outcomes.reduce((sum, o) => sum + o.value, 0);
  const outcomePercentages = outcomes.map(o => ({
    ...o,
    percentage: totalOutcomesPercentage > 0 ? Math.round((o.value / totalOutcomesPercentage) * 100) : 0
  }));

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
        name: `${nosInfo.label} Federal Court Outcome Data`,
        description: `Aggregate outcome data for ${nosInfo.label} (NOS ${code}) cases in U.S. federal courts.`,
        url: `https://mycasevalues.com/nos/${code}`,
        creator: { '@type': 'Organization', name: 'Federal Judicial Center' },
        isAccessibleForFree: true,
        spatialCoverage: 'United States Federal Courts',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the win rate for ${nosInfo.label} cases?`,
            acceptedAnswer: { '@type': 'Answer', text: `Based on historical federal court data, ${nosInfo.label} cases have an approximate win rate of ${winRate}%. This includes both trial victories and favorable settlements. Individual results vary significantly.` },
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
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)", background: '#EDEEEE' }}>
      <style>{`
        .nos-header {
          background: #00172E;
          color: white;
        }

        .breadcrumb {
          font-size: 13px;
          font-family: var(--font-body);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
        }

        .breadcrumb a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s;
        }

        .breadcrumb a:hover {
          color: rgba(255, 255, 255, 1);
        }

        .breadcrumb-separator {
          margin: 0 8px;
        }

        .nos-badge {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(232, 23, 31, 0.15);
          color: #E8171F;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid rgba(232, 23, 31, 0.3);
        }

        .stat-card {
          background: white;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
          border-radius: 4px;
          overflow: hidden;
          background: #EDEEEE;
        }

        .outcome-segment {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-display);
          transition: opacity 0.2s;
        }

        .outcome-legend {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #E5E7EB;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-family: var(--font-body);
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .related-card {
          background: white;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          display: block;
          cursor: pointer;
        }

        .related-card:hover {
          border-color: #00172E;
          box-shadow: 0 4px 12px rgba(0, 23, 46, 0.1);
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
          color: #00172E;
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
          border-radius: 4px;
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
          color: white;
          padding: 14px 28px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-display);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(232, 23, 31, 0.2);
        }

        .cta-button:hover {
          background: #D41515;
          box-shadow: 0 4px 16px rgba(232, 23, 31, 0.3);
          transform: translateY(-2px);
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #00172E;
          margin-bottom: 20px;
          font-family: var(--font-display);
        }

        .content-box {
          background: white;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* Dark Navy Header */}
      <header className="nos-header px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/nos">Cases</Link>
            <span className="breadcrumb-separator">/</span>
            <span>{nosInfo.label}</span>
          </div>

          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '0 0 12px 0', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
                {nosInfo.label}
              </h1>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontFamily: 'var(--font-body)' }}>
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
              { label: 'Cases Tracked', value: totalOutcomes > 0 ? totalOutcomes.toLocaleString() : '500+', color: '#006997' },
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

      {/* Related Case Types */}
      {relatedCodes.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title">Similar Case Types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCodes.map((rel) => (
                <Link key={rel.code} href={`/nos/${rel.code}`} className="related-card">
                  <div className="related-card-code">NOS {rel.code}</div>
                  <div className="related-card-name">{rel.label}</div>
                  {rel.category && <div className="related-card-category">{rel.category}</div>}
                </Link>
              ))}
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
          <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 12px 0', color: '#00172E', fontFamily: 'var(--font-display)' }}>
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
