import { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/blog';
import { SITE_URL } from '../lib/site-config';
import { mockJudgesData } from '../data/mock-judges';
import { getAllCaseTypeSEO } from '../lib/case-type-seo';

const CATEGORY_IDS = ['work', 'injury', 'consumer', 'rights', 'money', 'housing', 'medical', 'family', 'gov', 'education'];

// All unique NOS codes used in the app
const NOS_CODES = ['110', '120', '130', '140', '150', '151', '152', '153', '160', '190', '195', '196', '210', '220', '230', '240', '245', '290', '310', '315', '320', '330', '340', '345', '350', '355', '360', '362', '365', '367', '368', '370', '375', '376', '400', '410', '422', '423', '430', '440', '441', '442', '443', '444', '445', '446', '448', '450', '460', '462', '463', '465', '470', '480', '485', '490', '510', '530', '535', '540', '550', '555', '710', '720', '740', '751', '790', '791', '810', '820', '830', '840', '850', '860', '863', '870', '871', '890', '891', '893', '895', '896', '899', '950'];

// All 51 state/territory district IDs
const ALL_DISTRICTS = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'PR', 'GU', 'VI',
];

// Top case types for programmatic outcomes pages
const TOP_CASE_TYPES = ['employment-discrimination', 'breach-of-contract', 'personal-injury', 'wrongful-termination', 'medical-malpractice'];

// Top districts for outcomes cross-pages
const TOP_DISTRICTS = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];

// Top 20 districts by filing volume (from /districts/[district]/[nos]/page.tsx)
const TOP_DISTRICTS_DETAILED = [
  'SDNY', 'CDCA', 'NDIL', 'NDTX', 'EDPA', 'SDFL', 'EDNY', 'NDCA', 'MDMD', 'EDMI',
  'SDTX', 'EDVA', 'WDNC', 'SDCA', 'CACD', 'EDTX', 'MNDN', 'WDWA', 'DCDN', 'NJDN',
];

// Top 20 NOS codes by case volume (from /districts/[district]/[nos]/page.tsx)
const TOP_NOS_CODES = [
  '365', '190', '440', '442', '110', '360', '863', '220', '350', '710',
  '860', '485', '370', '530', '870', '790', '362', '355', '462', '830',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const now = new Date().toISOString();

  // ── Static pages ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/attorney`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/cases`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/odds`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/districts`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/judges`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/judges/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/nos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/nos-explorer`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/translate`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/trends`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/map`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/developers`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions/individuals`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/solutions/small-firms`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/solutions/law-firms`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/solutions/insurance`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/solutions/funders`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/solutions/academic`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/solutions/government`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/solutions/legal-aid`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/solutions/enterprise`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/solutions/api/widget`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/platform`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/data-sources`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/api-docs`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/status`, lastModified: now, changeFrequency: 'daily', priority: 0.5 },
    { url: `${baseUrl}/integrations`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/resources/court-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/resources/paralegal-handbook`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/data/changelog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/attorney/case-predictor`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/attorney/judge-intelligence`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/attorney/demand-letter`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/attorney/venue-optimizer`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/attorney/discovery-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/attorney/appeals`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/deposition-prep`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/sol-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/motion-analytics`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/bulk-analysis`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/fee-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/attorney/court-rules`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/attorney/deadline-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/attorney/pacer-monitor`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/attorney/api-access`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/attorney/advanced-search`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/attorney/keycite`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/attorney/secondary-sources`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/attorney/state-survey`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/attorney/compare-text`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/alerts`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/folders`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/find-print`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/class-action`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/demand-package`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/motions`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/negotiation`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/research-memo`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/intake-forms`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/expert-witness`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/document-intelligence`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/attorney/opposing-counsel`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/team-workspace`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attorney/case-timeline`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/calculator/liens`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/press`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/reports/2026-annual`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/legal/aup`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/legal/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  // ── Spanish locale pages ──────────────────────────────
  const spanishPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/es`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/es/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/es/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/es/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/es/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/es/trends`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  // ── Audience pages (for/) ─────────────────────────────
  const audiencePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/for/pro-se`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/researchers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/students`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/paralegals`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  // ── Case category pages (10) ──────────────────────────
  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_IDS.map((id) => ({
    url: `${baseUrl}/cases/${id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ── NOS code pages (~34) ──────────────────────────────
  const nosUrls: MetadataRoute.Sitemap = NOS_CODES.map((code) => ({
    url: `${baseUrl}/nos/${code}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ── District pages (all 54 state/territory districts) ──
  const districtUrls: MetadataRoute.Sitemap = ALL_DISTRICTS.map((id) => ({
    url: `${baseUrl}/districts/${id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // ── Outcomes cross-pages (districts × case types) ─────
  const outcomesUrls: MetadataRoute.Sitemap = [];
  TOP_DISTRICTS.forEach((district) => {
    TOP_CASE_TYPES.forEach((caseType) => {
      outcomesUrls.push({
        url: `${baseUrl}/outcomes/${district}/${caseType}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });
  });

  // ── District × NOS code pages (400 combinations) ──────
  const districtNosUrls: MetadataRoute.Sitemap = [];
  TOP_DISTRICTS_DETAILED.forEach((district) => {
    TOP_NOS_CODES.forEach((nos) => {
      districtNosUrls.push({
        url: `${baseUrl}/districts/${district}/${nos}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });
  });

  // ── Blog posts ────────────────────────────────────────
  const blogPosts = getAllPosts();
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt.toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ── Case detail pages (84+ case types) ────────────────
  const caseTypes = getAllCaseTypeSEO();
  const caseDetailUrls: MetadataRoute.Sitemap = caseTypes.map((caseType) => ({
    url: `${baseUrl}/cases/${caseType.categorySlug}/${caseType.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ── Judge profile pages (50+ federal judges) ──────────
  const judgeUrls: MetadataRoute.Sitemap = mockJudgesData.judges.map((judge) => ({
    url: `${baseUrl}/judges/${judge.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...spanishPages,
    ...audiencePages,
    ...categoryUrls,
    ...nosUrls,
    ...districtUrls,
    ...outcomesUrls,
    ...districtNosUrls,
    ...blogUrls,
    ...caseDetailUrls,
    ...judgeUrls,
  ];
}
