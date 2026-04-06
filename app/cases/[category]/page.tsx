import { SITS, OUTCOME_DATA } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';
import { getAllCaseTypeSEO } from '../../../lib/case-type-seo';
import { formatSettlementAmount, fmtK } from '../../../lib/format';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '../../../components/ui/Icons';

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
    work: 'Workplace & Employment',
    injury: 'Personal Injury & Medical',
    consumer: 'Consumer Protection',
    rights: 'Civil Rights',
    money: 'Money & Business',
    housing: 'Housing & Property',
    medical: 'Healthcare & Benefits',
    family: 'Family Law',
    gov: 'Government & Benefits',
    education: 'Education & Student Rights',
  };

  const categoryDescriptions: Record<string, string> = {
    work: 'Research real federal court outcomes for employment discrimination, wrongful termination, harassment, wage disputes, and other workplace cases. Explore win rates, settlement data, and timelines.',
    injury: 'Explore personal injury case outcomes including medical malpractice, product liability, auto accidents, and wrongful death. See real settlement data and trial results.',
    consumer: 'Research consumer protection cases including debt collection, identity theft, data breaches, robocalls, and credit reporting. Understand FDCPA and TCPA case outcomes.',
    rights: 'Investigate civil rights outcomes including police misconduct, discrimination, voting rights, and free speech violations. See Section 1983 case data.',
    money: 'Research business litigation outcomes for contract disputes, insurance bad faith, fraud, partnerships, and intellectual property. Explore settlement and trial data.',
    housing: 'Explore housing law cases including landlord disputes, foreclosures, property damage, construction defects, and HOA disputes. See real outcome data.',
    medical: 'Research healthcare and benefits cases including insurance denials, disability benefits, ERISA disputes, and Medicare claims. Understand appeal success rates.',
    family: 'Explore family law outcomes for divorce, custody, child support, and domestic violence cases. See real settlement and award data.',
    gov: 'Research government benefits and constitutional law cases including Social Security, immigration, tax disputes, and due process violations.',
    education: 'Investigate education law outcomes for Title IX violations, special education disputes, student discipline, and school negligence cases.',
  };

  const longTailKeywords: Record<string, string[]> = {
    work: [
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
    injury: [
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
    consumer: [
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
    rights: [
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
    money: [
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
    housing: [
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
    medical: [
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
    family: [
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
    gov: [
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
      url: `https://www.mycasevalues.com/cases/${category}`,
      images: [
        {
          url: 'https://www.mycasevalues.com/og-image.png',
          width: 1200,
          height: 630,
          alt: `${categoryNames[category]} Case Outcomes`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.mycasevalues.com/cases/${category}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  work: '#000000',
  injury: '#8B5CF6',
  consumer: '#2563EB',
  rights: '#8B5CF6',
  money: '#D97706',
  housing: '#059669',
  medical: '#DB2777',
  family: '#EC4899',
  gov: '#4B5563',
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
    new Set(categoryData.opts.map((opt) => opt.nos))
  );

  let totalWeightedWinRate = 0;
  let totalWeightedSettleRate = 0;
  let totalWeightedTimelineMonths = 0;
  let totalCases = 0;

  nosCodesInCategory.forEach((nos) => {
    const data = OUTCOME_DATA[nos];
    const realData = REAL_DATA[nos];
    if (data && data.trial_win !== undefined && realData && realData.total) {
      const weight = realData.total;
      totalWeightedWinRate += (data.trial_win || 10) * weight;
      totalWeightedSettleRate += (data.fav_set || 22) * weight;
      totalWeightedTimelineMonths += (data.set_mo || 6) * weight;
      totalCases += weight;
    }
  });

  if (totalCases === 0) {
    const defaults = OUTCOME_DATA._default;
    return {
      avgWinRate: defaults.trial_win,
      avgSettleRate: defaults.fav_set,
      avgTimelineMonths: defaults.set_mo,
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
  const categoryData = SITS.find((c) => c.id === category);

  if (!categoryData) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1 className="text-2xl font-bold">Category not found</h1>
        <p className="mt-4" style={{ color: '#4B5563' }}>The case type you&apos;re looking for doesn&apos;t exist.</p>
        <a href="/cases" className="inline-block mt-6 px-6 py-3 font-semibold text-white" style={{ background: '#0f0f0f', borderRadius: '12px' }}>Browse all categories</a>
      </div>
    );
  }

  const stats = getAverageStats(category);

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
        name: `${categoryData.label} Case Data & Federal Court Outcomes`,
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
            name: categoryData.label,
            item: `https://www.mycasevalues.com/cases/${category}`,
          },
        ],
      },
      {
        '@type': 'DataSet',
        name: `${categoryData.label} Federal Court Outcomes`,
        description: `Real outcome data from federal court cases involving ${categoryData.label.toLowerCase()}. Includes win rates, settlement percentages, timelines, and recovery data from public federal court records.`,
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
    <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Breadcrumb Navigation */}
      <div style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '16px 20px',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          fontSize: '14px',
          color: '#4B5563',
          fontFamily: 'var(--font-display)',
        }}>
          <Link href="/" style={{ color: '#0f0f0f', textDecoration: 'none' }}>
            Home
          </Link>
          {' / '}
          <Link href="/cases" style={{ color: '#0f0f0f', textDecoration: 'none' }}>
            Cases
          </Link>
          {' / '}
          <span style={{ color: '#0f0f0f', fontWeight: 500 }}>{categoryData.label}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        background: '#1B3A5C',
        padding: '40px 20px',
        color: 'white',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: '#8B5CF6',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase' as const,
            color: '#FFFFFF',
            marginBottom: '16px',
          }}>
            {categoryData.label.toUpperCase()}
          </div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 600,
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.5px',
            color: '#FFFFFF',
          }}>
            {categoryData.label} Cases
          </h1>
          <p style={{
            fontSize: '15px',
            margin: '0 0 24px 0',
            fontFamily: 'var(--font-body)',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '600px',
            lineHeight: '1.6',
          }}>
            {categoryData.sub}
          </p>
          <div style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            fontFamily: 'var(--font-body)',
          }}>
            {(() => {
              // Compute total cases in this category
              const seen = new Set<string>();
              let totalCases = 0;
              for (const opt of categoryData.opts) {
                if (seen.has(opt.nos)) continue;
                seen.add(opt.nos);
                const rd = REAL_DATA[opt.nos];
                if (rd?.total) totalCases += rd.total;
              }
              return totalCases > 0 ? (
                <div>
                  <div style={{ fontWeight: 600, fontSize: '22px', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                    {totalCases.toLocaleString()}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 500 }}>Total Cases</div>
                </div>
              ) : null;
            })()}
            <div>
              <div style={{ fontWeight: 600, fontSize: '22px', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                {stats.avgWinRate}%
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 500 }}>Avg Win Rate</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '22px', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                {stats.avgTimelineMonths}mo
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 500 }}>Avg Duration</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '22px', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                {stats.avgSettleRate}%
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 500 }}>Settlement Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Statistics Summary Bar */}
      <div style={{
        background: '#FFFFFF',
        padding: '40px 20px',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            {(() => {
              const seen = new Set<string>();
              let totalCases = 0;
              for (const opt of categoryData.opts) {
                if (seen.has(opt.nos)) continue;
                seen.add(opt.nos);
                const rd = REAL_DATA[opt.nos];
                if (rd?.total) totalCases += rd.total;
              }
              return (
                <>
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: 600,
                      color: '#8B5CF6',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {totalCases.toLocaleString()}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#4B5563',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Total Cases
                    </div>
                  </div>
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: 600,
                      color: '#8B5CF6',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {stats.avgWinRate}%
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#4B5563',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Avg Win Rate
                    </div>
                  </div>
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: 600,
                      color: '#8B5CF6',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {stats.avgSettleRate}%
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#4B5563',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Avg Settlement Rate
                    </div>
                  </div>
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: 600,
                      color: '#8B5CF6',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {stats.avgTimelineMonths}mo
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#4B5563',
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
        </div>
      </div>

      {/* Description Section */}
      <div style={{
        background: '#FFFFFF',
        padding: '60px 20px',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#0f0f0f',
            margin: '0 0 24px 0',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.3px',
          }}>
            What We Cover
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#4B5563',
            lineHeight: '1.7',
            maxWidth: '800px',
            margin: 0,
            fontFamily: 'var(--font-display)',
          }}>
            {categoryLongDescriptions[category]}
          </p>
        </div>
      </div>

      {/* Case Types Grid */}
      <div style={{
        padding: '60px 20px',
      }}>
        <style>{`
          .case-type-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            border-color: #8B5CF6;
            transform: translateY(-2px);
          }
          .cta-btn-category:hover {
            background: #B91C1C;
            box-shadow: none;
            transform: translateY(-2px);
          }
        `}</style>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#0f0f0f',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.3px',
          }}>
            {categoryData.opts.length} Case Types Covered
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {categoryData.opts.map((opt) => {
              const allCaseTypes = getAllCaseTypeSEO();
              const caseType = allCaseTypes.find(
                (ct) => ct.categorySlug === category && ct.nosCode === opt.nos
              );
              const href = caseType ? `/cases/${category}/${caseType.slug}` : `#`;
              const rd = REAL_DATA[opt.nos];

              return (
                <Link
                  key={`${opt.nos}-${opt.d}`}
                  href={href}
                  className="case-type-card"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '20px',
                    fontFamily: 'var(--font-display)',
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
                    color: '#0f0f0f',
                    margin: '0 0 8px 0',
                  }}>
                    {opt.label}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#4B5563',
                    margin: '0 0 12px 0',
                    lineHeight: '1.5',
                  }}>
                    {opt.d}
                  </p>

                  {/* Real data stats */}
                  {rd && rd.total > 0 && (
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: 12 }}>
                      <div style={{ minWidth: 60 }}>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#6D28D9', fontFamily: 'var(--font-mono)' }}>
                          {rd.total.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '10px', color: '#4B5563', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Cases</div>
                      </div>
                      {rd.wr != null && (
                        <div style={{ minWidth: 50 }}>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: rd.wr >= 50 ? '#059669' : '#8B5CF6', fontFamily: 'var(--font-mono)' }}>
                            {rd.wr}%
                          </div>
                          <div style={{ fontSize: '10px', color: '#4B5563', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Win Rate</div>
                        </div>
                      )}
                      {rd.sp != null && (
                        <div style={{ minWidth: 50 }}>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-mono)' }}>
                            {rd.sp}%
                          </div>
                          <div style={{ fontSize: '10px', color: '#4B5563', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Settlement</div>
                        </div>
                      )}
                      {rd.mo != null && (
                        <div style={{ minWidth: 50 }}>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-mono)' }}>
                            {rd.mo}mo
                          </div>
                          <div style={{ fontSize: '10px', color: '#4B5563', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Duration</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Win rate bar */}
                  {rd && rd.wr != null && (
                    <div style={{ height: 4, background: '#F0F3F5', borderRadius: 2, marginBottom: 12, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(rd.wr, 100)}%`, background: rd.wr >= 50 ? '#059669' : '#8B5CF6', borderRadius: 2 }} />
                    </div>
                  )}

                  <div style={{
                    fontSize: '12px',
                    color: '#4B5563',
                    paddingTop: '12px',
                    borderTop: '1px solid #E5E7EB',
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span>NOS Code: {opt.nos}</span>
                    {rd?.rng?.md && (
                      <span style={{ fontWeight: 600, color: '#6D28D9' }}>Median: {formatSettlementAmount(rd.rng.md, { compact: true })}</span>
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
        background: '#FFFFFF',
        padding: '60px 20px',
        borderTop: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#0f0f0f',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-display)',
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
              <div style={{ display: 'grid', gap: '20px' }}>
                {top3.map((item, idx) => {
                  const href = item.slug ? `/cases/${category}/${item.slug}` : `/report/${item.nos}`;
                  return (
                    <Link
                      key={item.nos}
                      href={href}
                      style={{
                        display: 'block',
                        padding: '20px 24px',
                        background: '#F7F8FA',
                        border: '1px solid #E5E7EB',
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
                            color: '#8B5CF6',
                            fontFamily: 'var(--font-mono)',
                            minWidth: '24px',
                          }}>
                            #{idx + 1}
                          </div>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#0f0f0f',
                            fontFamily: 'var(--font-display)',
                          }}>
                            {item.label}
                          </div>
                        </div>
                        <div style={{
                          fontSize: '20px',
                          fontWeight: 600,
                          color: item.wr >= 50 ? '#059669' : '#8B5CF6',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {item.wr}%
                        </div>
                      </div>
                      <div style={{
                        height: '8px',
                        background: '#E0E3E6',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.min(item.wr || 0, 100)}%`,
                          background: item.wr >= 50 ? '#059669' : '#8B5CF6',
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
        background: '#FFFFFF',
        padding: '60px 20px',
        borderTop: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#0f0f0f',
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.3px',
          }}>
            Win Rates by Circuit
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#4B5563',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.6,
          }}>
            How {categoryData.label.toLowerCase()} case outcomes vary across federal circuits based on aggregate data from the primary NOS codes in this category.
          </p>
          {(() => {
            // Get circuit rates from the first NOS code with circuit_rates data
            const primaryNos = categoryData.opts[0]?.nos;
            const rd = primaryNos ? REAL_DATA[primaryNos] : null;
            const circuitRates = rd?.circuit_rates || {};
            const entries = Object.entries(circuitRates).sort((a, b) => (b[1] as number) - (a[1] as number));
            const nationalAvg = entries.length > 0 ? Math.round(entries.reduce((s, e) => s + (e[1] as number), 0) / entries.length) : 0;

            if (entries.length === 0) return null;

            return (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                {entries.map(([circuit, rate]) => {
                  const wr = rate as number;
                  const diff = wr - nationalAvg;
                  const color = wr >= 50 ? '#059669' : wr >= 35 ? '#D97706' : '#8B5CF6';
                  return (
                    <div key={circuit} style={{
                      padding: '16px', borderRadius: 2, border: '1px solid #E5E7EB', background: '#FFFFFF',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>{circuit}</span>
                        <span style={{ fontSize: 15, fontWeight: 600, color, fontFamily: 'var(--font-mono)' }}>{wr}%</span>
                      </div>
                      <div style={{ height: 6, background: '#F0F3F5', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
                        <div style={{ width: `${Math.min(wr, 100)}%`, height: '100%', background: color, borderRadius: 3 }} />
                      </div>
                      <div style={{ fontSize: 11, color: diff >= 0 ? '#059669' : '#8B5CF6', fontFamily: 'var(--font-mono)' }}>
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
        padding: '60px 20px',
        borderTop: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#0f0f0f',
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.3px',
          }}>
            Recovery Ranges
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#4B5563',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.6,
          }}>
            Typical monetary recovery ranges for case types in this category. Ranges show 25th percentile, median, and 75th percentile.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
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

              return items.slice(0, 10).map((item) => (
                <Link
                  key={item.nos}
                  href={`/report/${item.nos}`}
                  style={{
                    display: 'block', padding: '16px 20px', background: '#FFFFFF', border: '1px solid #E5E7EB',
                    borderRadius: 2, textDecoration: 'none', transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)' }}>{item.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#8B5CF6', fontFamily: 'var(--font-mono)' }}>{fmtK(item.md)} median</span>
                  </div>
                  {/* Range bar visualization */}
                  <div style={{ position: 'relative', height: 28, background: '#F7F8FA', borderRadius: 2, overflow: 'hidden' }}>
                    {/* Low to high range */}
                    <div style={{
                      position: 'absolute',
                      left: `${(item.lo / maxHi) * 100}%`,
                      width: `${((item.hi - item.lo) / maxHi) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.25))',
                      borderRadius: 2,
                    }} />
                    {/* Median marker */}
                    <div style={{
                      position: 'absolute',
                      left: `${(item.md / maxHi) * 100}%`,
                      top: 0,
                      width: 3,
                      height: '100%',
                      background: '#8B5CF6',
                      borderRadius: 1,
                    }} />
                    {/* Labels */}
                    <div style={{ position: 'absolute', left: `${(item.lo / maxHi) * 100}%`, bottom: 2, fontSize: 10, color: '#4B5563', fontFamily: 'var(--font-mono)', transform: 'translateX(-50%)' }}>
                      {fmtK(item.lo)}
                    </div>
                    <div style={{ position: 'absolute', left: `${(item.hi / maxHi) * 100}%`, bottom: 2, fontSize: 10, color: '#4B5563', fontFamily: 'var(--font-mono)', transform: 'translateX(-50%)' }}>
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
        background: '#FFFFFF',
        padding: '60px 20px',
        borderTop: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#0f0f0f',
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.3px',
          }}>
            Settlement Range Comparison
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#4B5563',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-body)',
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
                      padding: '20px',
                      background: '#F7F8FA',
                      border: '1px solid #E5E7EB',
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
                        color: '#0f0f0f',
                        fontFamily: 'var(--font-display)',
                      }}>
                        {item.label}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#8B5CF6',
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {fmtK(item.md)}
                      </span>
                    </div>
                    <div style={{
                      position: 'relative',
                      height: '24px',
                      background: '#E0E3E6',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: `${(item.lo / maxHi) * 100}%`,
                        width: `${((item.hi - item.lo) / maxHi) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.25))',
                        borderRadius: '3px',
                      }} />
                      <div style={{
                        position: 'absolute',
                        left: `${(item.md / maxHi) * 100}%`,
                        top: '0',
                        width: '3px',
                        height: '100%',
                        background: '#8B5CF6',
                        borderRadius: '12px',
                        transform: 'translateX(-50%)',
                      }} />
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: '#4B5563',
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
        background: '#FFFFFF',
        padding: '60px 20px',
        borderTop: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#0f0f0f',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-display)',
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
              background: '#FFFFFF',
              padding: '24px',
              borderRadius: '12px',
              fontFamily: 'var(--font-display)',
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
                color: '#0f0f0f',
                marginBottom: '8px',
              }}>
                Trial Win Rate
              </div>
              <p style={{
                fontSize: '14px',
                color: '#4B5563',
                margin: 0,
                lineHeight: '1.5',
              }}>
                Percentage of cases that result in a trial win on average across all sub-types in this category.
              </p>
            </div>

            <div style={{
              background: '#FFFFFF',
              padding: '24px',
              borderRadius: '12px',
              fontFamily: 'var(--font-display)',
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
                color: '#0f0f0f',
                marginBottom: '8px',
              }}>
                Average Case Duration
              </div>
              <p style={{
                fontSize: '14px',
                color: '#4B5563',
                margin: 0,
                lineHeight: '1.5',
              }}>
                Median time from filing to settlement or resolution across this category.
              </p>
            </div>

            <div style={{
              background: '#FFFFFF',
              padding: '24px',
              borderRadius: '12px',
              fontFamily: 'var(--font-display)',
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
                color: '#0f0f0f',
                marginBottom: '8px',
              }}>
                Favorable Settlement Rate
              </div>
              <p style={{
                fontSize: '14px',
                color: '#4B5563',
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
        background: '#F7F8FA',
        padding: '60px 20px',
        borderTop: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#0f0f0f',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.3px',
          }}>
            Explore More
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}>
            <Link
              href="/compare"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '24px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                color: '#0f0f0f',
              }}
            >
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#0f0f0f',
                marginBottom: '8px',
                fontFamily: 'var(--font-display)',
              }}>
                Compare Cases
              </div>
              <p style={{
                fontSize: '14px',
                color: '#4B5563',
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
                color: '#6D28D9',
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
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                color: '#0f0f0f',
              }}
            >
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#0f0f0f',
                marginBottom: '8px',
                fontFamily: 'var(--font-display)',
              }}>
                Case Calculator
              </div>
              <p style={{
                fontSize: '14px',
                color: '#4B5563',
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
                color: '#6D28D9',
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
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                color: '#0f0f0f',
              }}
            >
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#0f0f0f',
                marginBottom: '8px',
                fontFamily: 'var(--font-display)',
              }}>
                Win Rate Odds
              </div>
              <p style={{
                fontSize: '14px',
                color: '#4B5563',
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
                color: '#6D28D9',
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
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                color: '#0f0f0f',
              }}
            >
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#0f0f0f',
                marginBottom: '8px',
                fontFamily: 'var(--font-display)',
              }}>
                Case Trends
              </div>
              <p style={{
                fontSize: '14px',
                color: '#4B5563',
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
                color: '#6D28D9',
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
        background: '#1B3A5C',
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 600,
            margin: '0 0 16px 0',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.3px',
          }}>
            Research Your Case
          </h2>
          <p style={{
            fontSize: '18px',
            margin: '0 0 32px 0',
            fontFamily: 'var(--font-display)',
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
              background: '#8B5CF6',
              color: '#FFFFFF',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
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
  );
}

export default CategoryPage;
