import { SITS, OUTCOME_DATA } from '../../../lib/data';
import { Metadata } from 'next';
import Link from 'next/link';

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

  const title = `${categoryNames[category]} | Federal Court Case Data & Win Rates | MyCaseValue`;
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
      url: `https://mycasevalues.com/cases/${category}`,
      images: [
        {
          url: 'https://mycasevalues.com/og-image.png',
          width: 1200,
          height: 630,
          alt: `${categoryNames[category]} Case Outcomes`,
        },
      ],
    },
    alternates: {
      canonical: `https://mycasevalues.com/cases/${category}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  work: '#4338CA',
  injury: '#DC2626',
  consumer: '#2563EB',
  rights: '#7C3AED',
  money: '#D97706',
  housing: '#059669',
  medical: '#DB2777',
  family: '#EC4899',
  gov: '#475569',
  education: '#0891B2',
};

const categoryIcons: Record<string, string> = {
  work: '💼',
  injury: '❤️',
  consumer: '🛡️',
  rights: '⚖️',
  money: '💰',
  housing: '🏠',
  medical: '🏥',
  family: '👨‍👩‍👧‍👦',
  gov: '🏛️',
  education: '🎓',
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

  let totalWinRate = 0;
  let totalSettleRate = 0;
  let totalTimelineMonths = 0;
  let count = 0;

  nosCodesInCategory.forEach((nos) => {
    const data = OUTCOME_DATA[nos];
    if (data && data.trial_win !== undefined) {
      totalWinRate += data.trial_win || 10;
      totalSettleRate += data.fav_set || 22;
      totalTimelineMonths += data.set_mo || 6;
      count++;
    }
  });

  if (count === 0) {
    const defaults = OUTCOME_DATA._default;
    return {
      avgWinRate: defaults.trial_win,
      avgSettleRate: defaults.fav_set,
      avgTimelineMonths: defaults.set_mo,
    };
  }

  return {
    avgWinRate: Math.round(totalWinRate / count * 10) / 10,
    avgSettleRate: Math.round(totalSettleRate / count * 10) / 10,
    avgTimelineMonths: Math.round(totalTimelineMonths / count),
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
        <h1>Category not found</h1>
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
        url: `https://mycasevalues.com/cases/${category}`,
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
            item: 'https://mycasevalues.com/cases',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: categoryData.label,
            item: `https://mycasevalues.com/cases/${category}`,
          },
        ],
      },
      {
        '@type': 'DataSet',
        name: `${categoryData.label} Federal Court Outcomes`,
        description: `Real outcome data from federal court cases involving ${categoryData.label.toLowerCase()}. Includes win rates, settlement percentages, timelines, and recovery data from public federal court records.`,
        url: `https://mycasevalues.com/cases/${category}`,
        distribution: {
          '@type': 'DataDownload',
          encodingFormat: 'text/html',
          contentUrl: `https://mycasevalues.com/cases/${category}`,
        },
      },
    ],
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B1221' }}>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Breadcrumb Navigation */}
      <div style={{
        background: '#131B2E',
        borderBottom: '1px solid #1E293B',
        padding: '16px 20px',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          fontSize: '14px',
          color: '#94A3B8',
          fontFamily: 'Outfit, system-ui, sans-serif',
        }}>
          <Link href="/" style={{ color: '#4F46E5', textDecoration: 'none' }}>
            Home
          </Link>
          {' / '}
          <Link href="/cases" style={{ color: '#4F46E5', textDecoration: 'none' }}>
            Cases
          </Link>
          {' / '}
          <span style={{ color: '#F0F2F5', fontWeight: 500 }}>{categoryData.label}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        background: `linear-gradient(135deg, ${categoryColors[category]} 0%, ${categoryColors[category]}dd 100%)`,
        padding: '60px 20px',
        color: 'white',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            {categoryIcons[category]}
          </div>
          <h1 style={{
            fontSize: '44px',
            fontWeight: 700,
            margin: '0 0 16px 0',
            fontFamily: 'Outfit, system-ui, sans-serif',
            letterSpacing: '-0.5px',
          }}>
            {categoryData.label} Cases
          </h1>
          <p style={{
            fontSize: '18px',
            margin: '0 0 24px 0',
            fontFamily: 'Outfit, system-ui, sans-serif',
            opacity: 0.95,
            maxWidth: '600px',
            lineHeight: '1.6',
          }}>
            {categoryData.sub}
          </p>
          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            fontSize: '16px',
            fontFamily: 'Outfit, system-ui, sans-serif',
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '24px' }}>
                {stats.avgWinRate}%
              </div>
              <div style={{ opacity: 0.9, fontSize: '14px' }}>Avg. Trial Win Rate</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '24px' }}>
                {stats.avgTimelineMonths} mo
              </div>
              <div style={{ opacity: 0.9, fontSize: '14px' }}>Avg. Case Timeline</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '24px' }}>
                {stats.avgSettleRate}%
              </div>
              <div style={{ opacity: 0.9, fontSize: '14px' }}>Favorable Settlements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div style={{
        background: '#131B2E',
        padding: '60px 20px',
        borderBottom: '1px solid #1E293B',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#F0F2F5',
            margin: '0 0 24px 0',
            fontFamily: 'Outfit, system-ui, sans-serif',
            letterSpacing: '-0.3px',
          }}>
            What We Cover
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#94A3B8',
            lineHeight: '1.7',
            maxWidth: '800px',
            margin: 0,
            fontFamily: 'Outfit, system-ui, sans-serif',
          }}>
            {categoryLongDescriptions[category]}
          </p>
        </div>
      </div>

      {/* Case Types Grid */}
      <div style={{
        padding: '60px 20px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#F0F2F5',
            margin: '0 0 32px 0',
            fontFamily: 'Outfit, system-ui, sans-serif',
            letterSpacing: '-0.3px',
          }}>
            {categoryData.opts.length} Case Types Covered
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {categoryData.opts.map((opt) => (
              <div
                key={opt.nos}
                style={{
                  background: '#131B2E',
                  border: '1px solid #1E293B',
                  borderRadius: '10px',
                  padding: '20px',
                  fontFamily: 'Outfit, system-ui, sans-serif',
                }}
              >
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#F0F2F5',
                  margin: '0 0 8px 0',
                }}>
                  {opt.label}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#94A3B8',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                }}>
                  {opt.d}
                </p>
                <div style={{
                  fontSize: '12px',
                  color: '#94A3B8',
                  paddingTop: '12px',
                  borderTop: '1px solid #1E293B',
                }}>
                  NOS Code: {opt.nos}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        background: '#131B2E',
        padding: '60px 20px',
        borderTop: '1px solid #1E293B',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#F0F2F5',
            margin: '0 0 32px 0',
            fontFamily: 'Outfit, system-ui, sans-serif',
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
              background: '#131B2E',
              padding: '24px',
              borderRadius: '10px',
              fontFamily: 'Outfit, system-ui, sans-serif',
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 700,
                color: categoryColors[category],
                marginBottom: '8px',
              }}>
                {stats.avgWinRate}%
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#F0F2F5',
                marginBottom: '8px',
              }}>
                Trial Win Rate
              </div>
              <p style={{
                fontSize: '14px',
                color: '#94A3B8',
                margin: 0,
                lineHeight: '1.5',
              }}>
                Percentage of cases that result in a trial win on average across all sub-types in this category.
              </p>
            </div>

            <div style={{
              background: '#131B2E',
              padding: '24px',
              borderRadius: '10px',
              fontFamily: 'Outfit, system-ui, sans-serif',
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 700,
                color: categoryColors[category],
                marginBottom: '8px',
              }}>
                {stats.avgTimelineMonths} months
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#F0F2F5',
                marginBottom: '8px',
              }}>
                Average Case Duration
              </div>
              <p style={{
                fontSize: '14px',
                color: '#94A3B8',
                margin: 0,
                lineHeight: '1.5',
              }}>
                Median time from filing to settlement or resolution across this category.
              </p>
            </div>

            <div style={{
              background: '#131B2E',
              padding: '24px',
              borderRadius: '10px',
              fontFamily: 'Outfit, system-ui, sans-serif',
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 700,
                color: categoryColors[category],
                marginBottom: '8px',
              }}>
                {stats.avgSettleRate}%
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#F0F2F5',
                marginBottom: '8px',
              }}>
                Favorable Settlement Rate
              </div>
              <p style={{
                fontSize: '14px',
                color: '#94A3B8',
                margin: 0,
                lineHeight: '1.5',
              }}>
                Average percentage of cases resolving favorably through settlement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: `linear-gradient(135deg, ${categoryColors[category]} 0%, ${categoryColors[category]}dd 100%)`,
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            margin: '0 0 16px 0',
            fontFamily: 'Outfit, system-ui, sans-serif',
            letterSpacing: '-0.3px',
          }}>
            Research Your Case
          </h2>
          <p style={{
            fontSize: '18px',
            margin: '0 0 32px 0',
            fontFamily: 'Outfit, system-ui, sans-serif',
            opacity: 0.95,
            lineHeight: '1.6',
          }}>
            Use our interactive tool to find real federal court outcome data for cases like yours.
          </p>
          <a
            href="/#search"
            style={{
              display: 'inline-block',
              background: 'white',
              color: categoryColors[category],
              padding: '14px 36px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '16px',
              textDecoration: 'none',
              fontFamily: 'Outfit, system-ui, sans-serif',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
          >
            Start Researching →
          </a>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div style={{
        background: '#0B1221',
        color: '#94A3B8',
        padding: '40px 20px',
        fontSize: '14px',
        fontFamily: 'Outfit, system-ui, sans-serif',
        lineHeight: '1.6',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ margin: '0 0 16px 0' }}>
            <strong>Research Data Disclaimer:</strong> This page provides research information based on publicly available federal court outcome data. The statistics displayed represent historical aggregate data from the Federal Judicial Center Integrated Database and CourtListener and are not predictions of your case outcome. Case outcomes vary significantly based on specific facts, law applicable to your jurisdiction, quality of legal representation, and numerous other factors.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Not Legal Advice:</strong> This is not legal advice and does not create an attorney-client relationship. Always consult with a qualified attorney licensed in your jurisdiction for advice specific to your situation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
