import { SITS, OUTCOME_DATA } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';
import { getAllCaseTypeSEO } from '../../../lib/case-type-seo';
import { formatSettlementAmount, fmtK } from '../../../lib/format';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '../../../components/ui/Icons';
import { SITE_URL } from '../../../lib/site-config';
import RelatedEntities from '../../../components/RelatedEntities';
import SaveButton from '../../../components/ui/SaveButton';

export const revalidate = 0;

// Generate static params for all 10 categories
export async function generateStaticParams() {
  return SITS.map((category) => ({
    category: category.id,
  }));
}

// Category-specific metadata with rich SEO tags
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categoryData = SITS.find((c) => c.id === category);

  if (!categoryData) {
    return {};
  }

  const categoryNames: Record<string, string> = {
    'employment-workplace': 'Workplace & Employment',
    'personal-injury': 'Personal Injury & Medical',
    'consumer-protection': 'Consumer Protection',
    'civil-rights': 'Civil Rights',
    'money-business': 'Money & Business',
    'housing-property': 'Housing & Property',
    'healthcare-benefits': 'Healthcare & Benefits',
    'family-law': 'Family Law',
    'government': 'Government & Benefits',
    education: 'Education & Student Rights',
  };

  const categoryDescriptions: Record<string, string> = {
    'employment-workplace': 'Research real federal court outcomes for employment discrimination, wrongful termination, harassment, wage disputes, and other workplace cases. Explore win rates, settlement data, and timelines.',
    'personal-injury': 'Explore personal injury case outcomes including medical malpractice, product liability, auto accidents, and wrongful death. See real settlement data and trial results.',
    'consumer-protection': 'Research consumer protection cases including debt collection, identity theft, data breaches, robocalls, and credit reporting. Understand FDCPA and TCPA case outcomes.',
    'civil-rights': 'Investigate civil rights outcomes including police misconduct, discrimination, voting rights, and free speech violations. See Section 1983 case data.',
    'money-business': 'Research business litigation outcomes for contract disputes, insurance bad faith, fraud, partnerships, and intellectual property. Explore settlement and trial data.',
    'housing-property': 'Explore housing law cases including landlord disputes, foreclosures, property damage, construction defects, and HOA disputes. See real outcome data.',
    'healthcare-benefits': 'Research healthcare and benefits cases including insurance denials, disability benefits, ERISA disputes, and Medicare claims. Understand appeal success rates.',
    'family-law': 'Explore family law outcomes for divorce, custody, child support, and domestic violence cases. See real settlement and award data.',
    government: 'Research government benefits and constitutional law cases including Social Security, immigration, tax disputes, and due process violations.',
    education: 'Investigate education law outcomes for Title IX violations, special education disputes, student discipline, and school negligence cases.',
  };

  const longTailKeywords: Record<string, string[]> = {
    'employment-workplace': [
      'wrongful termination federal court win rate',
      'employment discrimination settlement data',
      'age discrimination case outcomes',
      'sexual harassment lawsuit federal courts',
      'federal employment case statistics',
      'Title VII discrimination outcomes',
      'wrongful termination typical settlement',
      'employment law case timeline',
      'EEOC federal court outcomes',
      'employment litigation win rates',
    ],
    'personal-injury': [
      'personal injury settlement federal court',
      'medical malpractice win rate',
      'product liability case outcomes',
      'auto accident federal court settlement',
      'wrongful death case data',
      'product defect litigation outcomes',
      'personal injury trial vs settlement',
      'injury case average duration',
      'negligence case win rates',
      'tort recovery statistics',
    ],
    'consumer-protection': [
      'debt collection federal court outcomes',
      'FDCPA violation settlement amounts',
      'data breach lawsuit settlement',
      'TCPA robocall case win rates',
      'identity theft federal court cases',
      'consumer fraud settlement data',
      'credit reporting error cases',
      'lemon law federal court outcomes',
      'consumer protection case statistics',
      'TILA violation outcomes',
    ],
    'civil-rights': [
      'police misconduct federal court win rate',
      'civil rights settlement federal court',
      'Section 1983 case outcomes',
      'employment discrimination win rate',
      'housing discrimination federal court',
      'voting rights violation cases',
      'free speech federal court outcomes',
      'racial discrimination settlement data',
      'excessive force federal court',
      'civil rights litigation statistics',
    ],
    'money-business': [
      'breach of contract federal court',
      'business dispute settlement data',
      'insurance bad faith win rate',
      'fraud case federal court outcomes',
      'contract litigation statistics',
      'business dispute timeline',
      'securities fraud settlement amounts',
      'intellectual property case outcomes',
      'trade secret misappropriation cases',
      'business litigation win rates',
    ],
    'housing-property': [
      'landlord tenant federal court',
      'wrongful eviction settlement',
      'foreclosure federal court outcomes',
      'housing discrimination case data',
      'property damage lawsuit settlement',
      'construction defect case outcomes',
      'HOA dispute federal court',
      'habitability violation cases',
      'real estate litigation timeline',
      'property law case statistics',
    ],
    'healthcare-benefits': [
      'insurance denial federal court win rate',
      'ERISA benefits denial cases',
      'disability benefits appeal success',
      'Medicare dispute federal court',
      'health insurance denial outcomes',
      'SSDI appeal federal court',
      'insurance appeal statistics',
      'benefits case timeline federal court',
      'healthcare litigation outcomes',
      'benefits denial settlement data',
    ],
    'family-law': [
      'divorce settlement federal court',
      'child custody outcomes statistics',
      'child support federal court cases',
      'divorce case typical duration',
      'custody dispute settlement data',
      'family law court outcomes',
      'marital property settlement',
      'domestic violence protective order cases',
      'family court statistics',
      'child support award amounts',
    ],
    government: [
      'Social Security appeal federal court',
      'tax dispute IRS federal court',
      'government benefits denial cases',
      'immigration federal court outcomes',
      'constitutional violation settlement',
      'benefits appeal statistics',
      'administrative law outcomes',
      'government litigation timeline',
      'federal agency case outcomes',
      'constitutional rights cases',
    ],
    education: [
      'Title IX federal court outcomes',
      'special education IDEA cases',
      'student rights federal court',
      'school discipline appeal cases',
      'education law statistics',
      'student assault federal court',
      'school negligence settlements',
      'education discrimination cases',
      'student rights litigation outcomes',
      'campus safety federal court',
    ],
  };

  const title = `${categoryNames[category]} | Federal Court Case Data & Win Rates`;
  const description = categoryDescriptions[category];

  return {
    title,
    description,
    keywords: [
      categoryNames[category],
      'federal court outcomes',
      'case win rates',
      'settlement data',
      ...longTailKeywords[category],
    ].join(', '),
    openGraph: {
      title: `${categoryNames[category]} — Real Federal Court Data`,
      description,
      type: 'website',
      url: `${SITE_URL}/cases/${category}`,
      siteName: 'MyCaseValue',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${categoryNames[category]} Case Outcomes`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryNames[category]} — Real Federal Court Data`,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/cases/${category}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  work: '#94a3b8',
  injury: 'var(--accent-primary)',
  consumer: 'var(--link)',
  rights: 'var(--accent-primary)',
  money: 'var(--wrn-txt)',
  housing: 'var(--data-positive)',
  medical: '#DB2777',
  family: '#EC4899',
  gov: 'var(--color-text-secondary)',
  education: '#0891B2',
};

const categoryIcons: Record<string, string> = {
  work: '',
  injury: '',
  consumer: '',
  rights: '',
  money: '',
  housing: '',
  medical: '',
  family: '',
  gov: '',
  education: '',
};

function getAverageStats(category: string): {
  avgWinRate: number;
  avgSettleRate: number;
  avgTimelineMonths: number;
} {
  const categoryData = SITS.find((c) => c.id === category);
  if (!categoryData) {
    return { avgWinRate: 38, avgSettleRate: 22, avgTimelineMonths: 14 };
  }

  const nosCodesInCategory = Array.from(
    new Set(categoryData.opts?.map?.((opt) => opt.nos) ?? [])
  );

  let totalWeightedWinRate = 0;
  let totalWeightedSettleRate = 0;
  let totalWeightedTimelineMonths = 0;
  let totalCases = 0;

  nosCodesInCategory?.forEach?.((nos) => {
    const data = OUTCOME_DATA?.[nos];
    const realData = REAL_DATA?.[nos];
    if (data && data.trial_win !== undefined && realData?.total) {
      const weight = realData.total;
      totalWeightedWinRate += (data.trial_win || 10) * weight;
      totalWeightedSettleRate += (data.fav_set || 22) * weight;
      totalWeightedTimelineMonths += (data.set_mo || 6) * weight;
      totalCases += weight;
    }
  });

  if (totalCases === 0) {
    const defaults = OUTCOME_DATA?._default;
    return {
      avgWinRate: defaults?.trial_win ?? 38,
      avgSettleRate: defaults?.fav_set ?? 22,
      avgTimelineMonths: defaults?.set_mo ?? 14,
    };
  }

  return {
    avgWinRate: Math.round(totalWeightedWinRate / totalCases * 10) / 10,
    avgSettleRate: Math.round(totalWeightedSettleRate / totalCases * 10) / 10,
    avgTimelineMonths: Math.round(totalWeightedTimelineMonths / totalCases),
  };
}

async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  let categoryData;
  let stats;

  try {
    categoryData = SITS.find((c) => c.id === category);

    if (!categoryData) {
      return (
        <div style={{ padding: '40px 24px', textAlign: 'center' }}>
          <h1 className="text-2xl font-bold">Category not found</h1>
          <p className="mt-4" style={{ color: 'var(--color-text-secondary)' }}>The case type you&apos;re looking for doesn&apos;t exist.</p>
          <a href="/cases" className="inline-block mt-6 px-6 py-3 font-semibold text-white" style={{ background: 'var(--color-text-primary)', borderRadius: '4px' }}>Browse all categories</a>
        </div>
      );
    }

    stats = getAverageStats(category);
  } catch (err: unknown) {
    console.error('[cases/[category]] Error loading category data:', err);
    return (
      <div style={{ padding: '40px 24px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16 }}>Data Loading Error</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>Data for this case type is being compiled. Check back soon.</p>
        <a href="/cases" style={{ display: 'inline-block', padding: '8px 24px', background: 'var(--gold)', color: 'var(--color-surface-0)', border: '1px solid var(--gold)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)', borderRadius: 4, textDecoration: 'none', fontWeight: 600, fontSize: 13, letterSpacing: '-0.005em', fontFamily: 'var(--font-ui)', margin: '0 auto' }}>Browse all categories</a>
      </div>
    );
  }

  const categoryLongDescriptions: Record<string, string> = {
    work: 'Research workplace cases including wrongful termination, employment discrimination, sexual harassment, wage disputes, retaliation, disability discrimination (ADA), age discrimination, race discrimination, FMLA violations, whistleblower retaliation, and more. Our database includes real outcomes from federal employment litigation.',
    injury: 'Explore personal injury litigation including vehicle accidents, medical malpractice, surgical errors, misdiagnosis, product liability, defective medications, slip and fall, dog bites, wrongful death, nursing home abuse, premises liability, construction accidents, toxic exposure, and birth injuries.',
    consumer: 'Research consumer protection cases including debt collection violations (FDCPA), identity theft, data breaches, robocalls (TCPA), credit reporting errors, lemon law disputes, predatory lending, warranty breaches, false advertising, student loan disputes, and unfair business practices.',
    rights: 'Investigate civil rights violations including police excessive force, racial discrimination, housing discrimination, wrongful arrest, racial profiling, free speech violations, voting rights issues, prison conditions, Title IX violations, LGBTQ+ discrimination, and government misconduct.',
    money: 'Research business litigation including insurance bad faith, breach of contract, fraud, business disputes, partnership disputes, fiduciary duty breaches, securities fraud, intellectual property theft, trade secret misappropriation, copyright infringement, trademark infringement, and unfair competition.',
    housing: 'Explore housing and property disputes including security deposit disputes, wrongful evictions, foreclosures, construction defects, landlord negligence, HOA disputes, property damage, neighbor disputes, title disputes, eminent domain, mold exposure, and contractor disputes.',
    medical: 'Research healthcare and benefits cases including health insurance denials, SSDI/SSI benefits denials, ERISA violations, veterans benefits disputes, Medicare/Medicaid disputes, long-term care insurance disputes, mental health coverage denials, medical billing disputes, and pharmacy errors.',
    family: 'Explore family law cases including divorce and marital property division, child custody and visitation disputes, child support enforcement, domestic violence and protective orders, adoption disputes, and parental rights terminations.',
    gov: 'Research government and constitutional law cases including benefits denials, constitutional violations, IRS tax disputes, immigration and deportation cases, Social Security disputes, government contract disputes, FOIA requests, due process violations, and environmental regulation violations.',
    education: 'Investigate education law cases including Title IX and campus sexual assault, special education (IDEA) disputes, student discipline and expulsion, student loan servicing disputes, and school bullying and negligence claims.',
  };

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `${categoryData?.label} Case Data & Federal Court Outcomes`,
        description: categoryLongDescriptions[category],
        url: `https://www.mycasevalues.com/cases/${category}`,
        publisher: {
          '@type': 'Organization',
          name: 'MyCaseValue',
          url: 'https://mycasevalues.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://mycasevalues.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Cases',
            item: 'https://www.mycasevalues.com/cases',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: categoryData?.label,
            item: `https://www.mycasevalues.com/cases/${category}`,
          },
        ],
      },
      {
        '@type': 'DataSet',
        name: `${categoryData?.label} Federal Court Outcomes`,
        description: `Real outcome data from federal court cases involving ${categoryData?.label.toLowerCase()}. Includes win rates, settlement percentages, timelines, and recovery data from public federal court records.`,
        url: `https://www.mycasevalues.com/cases/${category}`,
        distribution: {
          '@type': 'DataDownload',
          encodingFormat: 'text/html',
          contentUrl: `https://www.mycasevalues.com/cases/${category}`,
        },
      },
    ],
  };

  return (
    <div className="flex" style={{ minHeight: '100vh', background: 'var(--color-surface-1)' }}>
    <div className="flex-1 min-w-0">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Breadcrumb Navigation */}
      <div style={{
        background: 'var(--color-surface-0)',
        borderBottom: '1px solid var(--border-default)',
        padding: '16px 24px',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-ui)',
        }}>
          <Link href="/" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
            Home
          </Link>
          {' / '}
          <Link href="/cases" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
            Cases
          </Link>
          {' / '}
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{categoryData?.label}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        background: 'var(--color-surface-0)',
        padding: '36px 24px 28px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '2px 8px', marginBottom: 12,
            borderRadius: 3,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            Case Category
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <h1 style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: '0 0 16px',
              color: 'var(--color-surface-0)',
            }}>
              {categoryData?.label} Cases
            </h1>
            <SaveButton
              item={{
                id: `category-${category}`,
                type: 'case',
                label: `${categoryData?.label} Cases`,
                sublabel: 'Case Category',
                href: `/cases/${category}`,
              }}
              size="sm"
            />
          </div>
          <div style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            fontFamily: 'var(--font-ui)',
          }}>
            {(() => {
              // Compute total cases in this category
              const seen = new Set<string>();
              let totalCases = 0;
              for (const opt of (categoryData?.opts ?? [])) {
                if (seen.has(opt.nos)) continue;
                seen.add(opt.nos);
                const rd = REAL_DATA[opt.nos];
                if (rd?.total) totalCases += rd.total;
              }
              return totalCases > 0 ? (
                <div>
                  <div style={{ fontWeight: 600, fontSize: '22px', color: 'var(--color-text-inverse)', fontFamily: 'var(--font-mono)' }}>
                    {totalCases.toLocaleString()}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 500 }}>Total Cases</div>
                </div>
              ) : null;
            })()}
            <div>
              <div style={{ fontWeight: 600, fontSize: '22px', color: 'var(--color-text-inverse)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {stats.avgWinRate}%
                {(() => {
                  const seen = new Set<string>();
                  let totalCases = 0;
                  for (const opt of (categoryData?.opts ?? [])) {
                    if (seen.has(opt.nos)) continue;
                    seen.add(opt.nos);
                    const rd = REAL_DATA[opt.nos];
                    if (rd?.total) totalCases += rd.total;
                  }
                  return totalCases > 0 ? (
                    <span title={`Based on ${totalCases.toLocaleString()} cases — ${totalCases >= 10000 ? 'High' : totalCases >= 1000 ? 'Medium' : totalCases >= 100 ? 'Low' : 'Insufficient'} confidence`} style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: totalCases >= 10000 ? 'var(--data-positive)' : totalCases >= 1000 ? 'var(--wrn-txt)' : totalCases >= 100 ? 'var(--data-negative)' : 'var(--text4, #A8A6A0)' }} />
                  ) : null;
                })()}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 500 }}>Avg Win Rate</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '22px', color: 'var(--color-text-inverse)', fontFamily: 'var(--font-mono)' }}>
                {stats.avgTimelineMonths}mo
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 500 }}>Avg Duration</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '22px', color: 'var(--color-text-inverse)', fontFamily: 'var(--font-mono)' }}>
                {stats.avgSettleRate}%
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 500 }}>Settlement Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Freshness Badge */}
      <div style={{
        background: 'var(--color-surface-1)',
        padding: '16px 24px',
        borderBottom: '1px solid var(--border-default)',
        textAlign: 'center',
      }}>
        <Link href="/methodology" title="View data methodology and sources" style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(59,130,246,0.08)', color: 'var(--accent-primary)', fontSize: '11px', fontWeight: 500, fontFamily: 'var(--font-ui)', padding: '2px 8px', borderRadius: '4px', textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: '18px' }}>Updated Q4 2025</Link>
      </div>

      {/* Category Statistics Summary Bar */}
      <div style={{
        background: 'var(--color-surface-0)',
        padding: '24px 24px',
        borderBottom: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Last Updated Timestamp */}
          <div style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            marginBottom: '24px',
          }}>
            Last updated: April 2026
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            {(() => {
              const seen = new Set<string>();
              let totalCases = 0;
              for (const opt of (categoryData?.opts ?? [])) {
                if (seen.has(opt.nos)) continue;
                seen.add(opt.nos);
                const rd = REAL_DATA?.[opt.nos];
                if (rd?.total) totalCases += rd.total;
              }
              const winRate = stats?.avgWinRate ?? 0;
              const settleRate = stats?.avgSettleRate ?? 0;
              const timelineMonths = stats?.avgTimelineMonths ?? 0;
              return (
                <>
                  <div style={{
                    background: 'var(--color-surface-0)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '4px',
                    padding: '24px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {isNaN(totalCases) ? '—' : totalCases.toLocaleString()}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Total Cases
                    </div>
                  </div>
                  <div style={{
                    background: 'var(--color-surface-0)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '4px',
                    padding: '24px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-mono)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}>
                      {isNaN(winRate) ? '—' : `${winRate}%`}
                      {(() => {
                        const seen = new Set<string>();
                        let totalCases = 0;
                        for (const opt of (categoryData?.opts ?? [])) {
                          if (seen.has(opt.nos)) continue;
                          seen.add(opt.nos);
                          const rd = REAL_DATA?.[opt.nos];
                          if (rd?.total) totalCases += rd.total;
                        }
                        return totalCases > 0 ? (
                          <span title={`Based on ${totalCases.toLocaleString()} cases — ${totalCases >= 10000 ? 'High' : totalCases >= 1000 ? 'Medium' : totalCases >= 100 ? 'Low' : 'Insufficient'} confidence`} style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: totalCases >= 10000 ? 'var(--data-positive)' : totalCases >= 1000 ? 'var(--wrn-txt)' : totalCases >= 100 ? 'var(--data-negative)' : 'var(--text4, #A8A6A0)' }} />
                        ) : null;
                      })()}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Avg Win Rate
                    </div>
                  </div>
                  <div style={{
                    background: 'var(--color-surface-0)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '4px',
                    padding: '24px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {isNaN(settleRate) ? '—' : `${settleRate}%`}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Avg Settlement Rate
                    </div>
                  </div>
                  <div style={{
                    background: 'var(--color-surface-0)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '4px',
                    padding: '24px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {isNaN(timelineMonths) ? '—' : `${timelineMonths}mo`}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Avg Duration
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
          {/* Data Attribution */}
          <p style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            marginTop: '24px',
            marginBottom: 0,
          }}>
            Source: FJC Integrated Database · CourtListener / RECAP · Public Federal Records
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div style={{
        background: 'var(--color-surface-0)',
        padding: '60px 24px',
        borderBottom: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '-0.3px',
          }}>
            What We Cover
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.7',
            maxWidth: '800px',
            margin: 0,
            fontFamily: 'var(--font-ui)',
          }}>
            {categoryLongDescriptions[category]}
          </p>
        </div>
      </div>

      {/* Case Types Grid */}
      <div style={{
        padding: '60px 24px',
      }}>
        <style>{`
          .case-type-card:hover {
            box-shadow: var(--shadow-md);
            border-color: var(--accent-primary);
            transform: translateY(-2px);
          }
          .cta-btn-category:hover {
            background: var(--data-negative);
            box-shadow: none;
            transform: translateY(-2px);
          }
        `}</style>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '-0.3px',
          }}>
            {categoryData?.opts?.length ?? 0} Case Types Covered
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {(categoryData?.opts ?? [])?.map?.((opt) => {
              const allCaseTypes = getAllCaseTypeSEO?.() ?? [];
              const caseType = allCaseTypes?.find?.(
                (ct) => ct?.categorySlug === category && ct?.nosCode === opt?.nos
              );
              const href = caseType ? `/cases/${category}/${caseType.slug}` : `#`;
              const rd = REAL_DATA?.[opt?.nos ?? ''];
              const rdTotal = rd?.total ?? 0;
              const rdWr = rd?.wr ?? null;
              const rdSp = rd?.sp ?? null;
              const rdMo = rd?.mo ?? null;

              return (
                <Link
                  key={`${opt?.nos ?? ''}-${opt?.d ?? ''}`}
                  href={href}
                  className="case-type-card"
                  style={{
                    background: 'var(--color-surface-0)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '4px',
                    padding: '24px',
                    fontFamily: 'var(--font-ui)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 8px 0',
                  }}>
                    {opt?.label ?? '—'}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: '0 0 12px 0',
                    lineHeight: '1.5',
                  }}>
                    {opt?.d ?? '—'}
                  </p>

                  {/* Real data stats */}
                  {rd && rdTotal > 0 && (
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: 12 }}>
                      <div style={{ minWidth: 60 }}>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                          {isNaN(rdTotal) ? '—' : rdTotal.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Cases</div>
                      </div>
                      {rdWr != null && (
                        <div style={{ minWidth: 50 }}>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: isNaN(rdWr) ? 'var(--text4, #A8A6A0)' : rdWr >= 50 ? 'var(--data-positive)' : 'var(--accent-primary)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {isNaN(rdWr) ? '—' : `${rdWr}%`}
                            <span title={`Based on ${(rdTotal ?? 0).toLocaleString()} cases — ${(rdTotal ?? 0) >= 10000 ? 'High' : (rdTotal ?? 0) >= 1000 ? 'Medium' : (rdTotal ?? 0) >= 100 ? 'Low' : 'Insufficient'} confidence`} style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', backgroundColor: (rdTotal ?? 0) >= 10000 ? 'var(--data-positive)' : (rdTotal ?? 0) >= 1000 ? 'var(--wrn-txt)' : (rdTotal ?? 0) >= 100 ? 'var(--data-negative)' : 'var(--text4, #A8A6A0)' }} />
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Win Rate</div>
                        </div>
                      )}
                      {rdSp != null && (
                        <div style={{ minWidth: 50 }}>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                            {isNaN(rdSp) ? '—' : `${rdSp}%`}
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Settlement</div>
                        </div>
                      )}
                      {rdMo != null && (
                        <div style={{ minWidth: 50 }}>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                            {isNaN(rdMo) ? '—' : `${rdMo}mo`}
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Duration</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Win rate bar */}
                  {rd && rdWr != null && (
                    <div style={{ height: 4, background: 'var(--bdr)', borderRadius: 4, marginBottom: 12, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(Math.max(rdWr, 0), 100)}%`, background: isNaN(rdWr) ? 'var(--bdr)' : rdWr >= 50 ? 'var(--data-positive)' : 'var(--accent-primary)', borderRadius: 4 }} />
                    </div>
                  )}

                  <div style={{
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-default)',
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span>NOS Code: {opt?.nos ?? '—'}</span>
                    {rd?.rng?.md && !isNaN(rd.rng.md) && (
                      <span style={{ fontWeight: 600, color: 'var(--gold)' }}>Median: {formatSettlementAmount?.(rd.rng.md, { compact: true }) ?? '—'}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Performing Case Types */}
      <div style={{
        background: 'var(--color-surface-0)',
        padding: '60px 24px',
        borderTop: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '-0.3px',
          }}>
            Top Performing Case Types
          </h2>
          {(() => {
            const allCaseTypes = getAllCaseTypeSEO();
            const topCaseTypes: { label: string; wr: number; nos: string; slug?: string }[] = [];
            const seen = new Set<string>();

            for (const opt of categoryData.opts) {
              if (seen.has(opt.nos)) continue;
              seen.add(opt.nos);
              const rd = REAL_DATA[opt.nos];
              if (rd?.wr != null) {
                const caseType = allCaseTypes.find(
                  (ct) => ct.categorySlug === category && ct.nosCode === opt.nos
                );
                topCaseTypes.push({
                  label: opt.label,
                  wr: rd.wr,
                  nos: opt.nos,
                  slug: caseType?.slug,
                });
              }
            }

            topCaseTypes.sort((a, b) => (b.wr || 0) - (a.wr || 0));
            const top3 = topCaseTypes.slice(0, 3);

            if (top3.length === 0) return null;

            return (
              <div style={{ display: 'grid', gap: '24px' }}>
                {top3.map((item, idx) => {
                  const href = item.slug ? `/cases/${category}/${item.slug}` : `/report/${item.nos}`;
                  return (
                    <Link
                      key={item.nos}
                      href={href}
                      style={{
                        display: 'block',
                        padding: '24px 24px',
                        background: 'var(--color-surface-1)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                        }}>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: 'var(--accent-primary)',
                            fontFamily: 'var(--font-mono)',
                            minWidth: '24px',
                          }}>
                            #{idx + 1}
                          </div>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-ui)',
                          }}>
                            {item.label}
                          </div>
                        </div>
                        <div style={{
                          fontSize: '20px',
                          fontWeight: 600,
                          color: item.wr >= 50 ? 'var(--data-positive)' : 'var(--accent-primary)',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {item.wr}%
                        </div>
                      </div>
                      <div style={{
                        height: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.min(item.wr || 0, 100)}%`,
                          background: item.wr >= 50 ? 'var(--data-positive)' : 'var(--accent-primary)',
                          borderRadius: '4px',
                        }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Circuit Win Rate Comparison */}
      <div style={{
        background: 'var(--color-surface-0)',
        padding: '60px 24px',
        borderTop: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '-0.3px',
          }}>
            Win Rates by Circuit
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-ui)',
            lineHeight: 1.6,
          }}>
            How {categoryData?.label.toLowerCase()} case outcomes vary across federal circuits based on aggregate data from the primary NOS codes in this category.
          </p>
          {(() => {
            // Get circuit rates from the first NOS code with circuit_rates data
            const primaryNos = categoryData?.opts?.[0]?.nos;
            const rd = primaryNos ? REAL_DATA?.[primaryNos] : null;
            const circuitRates = rd?.circuit_rates || {};
            const entries = Object.entries(circuitRates).sort((a, b) => (b[1] as number) - (a[1] as number));
            const nationalAvg = entries.length > 0 ? Math.round(entries.reduce((s, e) => s + (e[1] as number), 0) / entries.length) : 0;

            if (entries.length === 0) return null;

            return (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                {entries.map(([circuit, rate]) => {
                  const wr = rate as number;
                  const diff = wr - nationalAvg;
                  const color = wr >= 50 ? 'var(--data-positive)' : wr >= 35 ? 'var(--wrn-txt)' : 'var(--accent-primary)';
                  return (
                    <div key={circuit} style={{
                      padding: '16px', borderRadius: 4, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>{circuit}</span>
                        <span style={{ fontSize: 15, fontWeight: 600, color, fontFamily: 'var(--font-mono)' }}>{wr}%</span>
                      </div>
                      <div style={{ height: 6, background: 'var(--bdr)', borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
                        <div style={{ width: `${Math.min(wr, 100)}%`, height: '100%', background: color, borderRadius: 4 }} />
                      </div>
                      <div style={{ fontSize: 11, color: diff >= 0 ? 'var(--data-positive)' : 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                        {diff >= 0 ? '+' : ''}{diff.toFixed(1)}% vs avg
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Recovery Range Comparison */}
      <div style={{
        padding: '60px 24px',
        borderTop: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '-0.3px',
          }}>
            Recovery Ranges
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-ui)',
            lineHeight: 1.6,
          }}>
            Typical monetary recovery ranges for case types in this category. Ranges show 25th percentile, median, and 75th percentile.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {(() => {
              const seen = new Set<string>();
              const items: { label: string; lo: number; md: number; hi: number; nos: string }[] = [];
              for (const opt of (categoryData?.opts ?? [])) {
                if (seen.has(opt.nos)) continue;
                seen.add(opt.nos);
                const rd = REAL_DATA[opt.nos];
                if (rd?.rng?.md && rd.rng.md > 0) {
                  items.push({ label: opt.label, lo: rd.rng.lo || 0, md: rd.rng.md, hi: rd.rng.hi || 0, nos: opt.nos });
                }
              }
              items.sort((a, b) => b.md - a.md);
              const maxHi = Math.max(...items.map(i => i.hi), 1);

              return items.slice(0, 10).map((item) => (
                <Link
                  key={item.nos}
                  href={`/report/${item.nos}`}
                  style={{
                    display: 'block', padding: '16px 24px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)',
                    borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>{item.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{fmtK(item.md)} median</span>
                  </div>
                  {/* Range bar visualization */}
                  <div style={{ position: 'relative', height: 28, background: 'var(--color-surface-1)', borderRadius: 4, overflow: 'hidden' }}>
                    {/* Low to high range */}
                    <div style={{
                      position: 'absolute',
                      left: `${(item.lo / maxHi) * 100}%`,
                      width: `${((item.hi - item.lo) / maxHi) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, rgba(10, 102, 194, 0.15), rgba(10, 102, 194, 0.25))',
                      borderRadius: 4,
                    }} />
                    {/* Median marker */}
                    <div style={{
                      position: 'absolute',
                      left: `${(item.md / maxHi) * 100}%`,
                      top: 0,
                      width: 3,
                      height: '100%',
                      background: 'var(--accent-primary)',
                      borderRadius: 4,
                    }} />
                    {/* Labels */}
                    <div style={{ position: 'absolute', left: `${(item.lo / maxHi) * 100}%`, bottom: 2, fontSize: 10, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', transform: 'translateX(-50%)' }}>
                      {fmtK(item.lo)}
                    </div>
                    <div style={{ position: 'absolute', left: `${(item.hi / maxHi) * 100}%`, bottom: 2, fontSize: 10, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', transform: 'translateX(-50%)' }}>
                      {fmtK(item.hi)}
                    </div>
                  </div>
                </Link>
              ));
            })()}
          </div>
        </div>
      </div>

      {/* Settlement Range Comparison */}
      <div style={{
        background: 'var(--color-surface-0)',
        padding: '60px 24px',
        borderTop: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '-0.3px',
          }}>
            Settlement Range Comparison
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-ui)',
            lineHeight: 1.6,
          }}>
            Settlement ranges (25th to 75th percentile) by case type, sorted by median settlement amount.
          </p>
          {(() => {
            const seen = new Set<string>();
            const items: { label: string; lo: number; md: number; hi: number; nos: string }[] = [];
            for (const opt of categoryData.opts) {
              if (seen.has(opt.nos)) continue;
              seen.add(opt.nos);
              const rd = REAL_DATA[opt.nos];
              if (rd?.rng?.md && rd.rng.md > 0) {
                items.push({ label: opt.label, lo: rd.rng.lo || 0, md: rd.rng.md, hi: rd.rng.hi || 0, nos: opt.nos });
              }
            }
            items.sort((a, b) => b.md - a.md);
            const maxHi = Math.max(...items.map(i => i.hi), 1);
            const displayItems = items.slice(0, 6);

            if (displayItems.length === 0) return null;

            return (
              <div style={{ display: 'grid', gap: '16px' }}>
                {displayItems.map((item) => (
                  <Link
                    key={item.nos}
                    href={`/report/${item.nos}`}
                    style={{
                      display: 'block',
                      padding: '24px',
                      background: 'var(--color-surface-1)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-ui)',
                      }}>
                        {item.label}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--accent-primary)',
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {fmtK(item.md)}
                      </span>
                    </div>
                    <div style={{
                      position: 'relative',
                      height: '24px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: `${(item.lo / maxHi) * 100}%`,
                        width: `${((item.hi - item.lo) / maxHi) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(10, 102, 194, 0.2), rgba(10, 102, 194, 0.25))',
                        borderRadius: '3px',
                      }} />
                      <div style={{
                        position: 'absolute',
                        left: `${(item.md / maxHi) * 100}%`,
                        top: '0',
                        width: '3px',
                        height: '100%',
                        background: 'var(--accent-primary)',
                        borderRadius: '4px',
                        transform: 'translateX(-50%)',
                      }} />
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '6px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      <span>{fmtK(item.lo)}</span>
                      <span>{fmtK(item.hi)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        background: 'var(--color-surface-0)',
        padding: '60px 24px',
        borderTop: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '-0.3px',
          }}>
            Key Statistics
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            <div style={{
              background: 'var(--color-surface-0)',
              padding: '24px',
              borderRadius: '4px',
              fontFamily: 'var(--font-ui)',
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 600,
                color: categoryColors[category],
                marginBottom: '8px',
              }}>
                {stats.avgWinRate}%
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Trial Win Rate
              </div>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                lineHeight: '1.5',
              }}>
                Percentage of cases that result in a trial win on average across all sub-types in this category.
              </p>
            </div>

            <div style={{
              background: 'var(--color-surface-0)',
              padding: '24px',
              borderRadius: '4px',
              fontFamily: 'var(--font-ui)',
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 600,
                color: categoryColors[category],
                marginBottom: '8px',
              }}>
                {stats.avgTimelineMonths} months
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Average Case Duration
              </div>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                lineHeight: '1.5',
              }}>
                Median time from filing to settlement or resolution across this category.
              </p>
            </div>

            <div style={{
              background: 'var(--color-surface-0)',
              padding: '24px',
              borderRadius: '4px',
              fontFamily: 'var(--font-ui)',
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 600,
                color: categoryColors[category],
                marginBottom: '8px',
              }}>
                {stats.avgSettleRate}%
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Favorable Settlement Rate
              </div>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                lineHeight: '1.5',
              }}>
                Average percentage of cases resolving favorably through settlement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explore More Links */}
      <div style={{
        background: 'var(--color-surface-1)',
        padding: '60px 24px',
        borderTop: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '-0.3px',
          }}>
            Explore More
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            <Link
              href="/compare"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '24px',
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                color: 'var(--color-text-primary)',
              }}
            >
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
                fontFamily: 'var(--font-ui)',
              }}>
                Compare Cases
              </div>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                marginBottom: '16px',
                lineHeight: '1.5',
              }}>
                Compare win rates, settlement amounts, and timelines across case types.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--gold)',
                fontWeight: 600,
                fontSize: '13px',
              }}>
                Go to Compare <ArrowRightIcon size={12} />
              </div>
            </Link>

            <Link
              href="/calculator"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '24px',
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                color: 'var(--color-text-primary)',
              }}
            >
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
                fontFamily: 'var(--font-ui)',
              }}>
                Case Calculator
              </div>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                marginBottom: '16px',
                lineHeight: '1.5',
              }}>
                Estimate potential settlement or award value for your case.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--gold)',
                fontWeight: 600,
                fontSize: '13px',
              }}>
                Calculate Now <ArrowRightIcon size={12} />
              </div>
            </Link>

            <Link
              href="/odds"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '24px',
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                color: 'var(--color-text-primary)',
              }}
            >
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
                fontFamily: 'var(--font-ui)',
              }}>
                Win Rate Odds
              </div>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                marginBottom: '16px',
                lineHeight: '1.5',
              }}>
                See your case's win rate probability based on real federal court data.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--gold)',
                fontWeight: 600,
                fontSize: '13px',
              }}>
                View Odds <ArrowRightIcon size={12} />
              </div>
            </Link>

            <Link
              href="/trends"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '24px',
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                color: 'var(--color-text-primary)',
              }}
            >
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
                fontFamily: 'var(--font-ui)',
              }}>
                Case Trends
              </div>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                marginBottom: '16px',
                lineHeight: '1.5',
              }}>
                Track case outcome trends and statistics over time.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--gold)',
                fontWeight: 600,
                fontSize: '13px',
              }}>
                Explore Trends <ArrowRightIcon size={12} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'var(--accent-primary)',
        padding: '60px 24px',
        textAlign: 'center',
        color: 'white',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 600,
            margin: '0 0 16px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '-0.3px',
          }}>
            Research Your Case
          </h2>
          <p style={{
            fontSize: '18px',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-ui)',
            opacity: 0.95,
            lineHeight: '1.6',
          }}>
            Use our interactive tool to find real federal court outcome data for cases like yours.
          </p>
          <a
            href="/search"
            className="cta-btn-category"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '48px',
              padding: '0 40px',
              background: 'var(--accent-primary)',
              color: 'var(--color-text-inverse)',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Start Researching
            <ArrowRightIcon size={14} />
          </a>
        </div>
      </div>

      {/* Disclaimer is in SiteFooter — no duplicate needed here */}
    </div>
    {/* Related Entities Panel — desktop only */}
    <div className="hidden xl:block">
      <RelatedEntities context={{ type: 'case', categoryId: category }} />
    </div>
    </div>
  );
}

export default CategoryPage;
