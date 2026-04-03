import { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/blog';

const CATEGORY_IDS = ['work', 'injury', 'consumer', 'rights', 'money', 'housing', 'medical', 'family', 'gov', 'education'];

// All unique NOS codes used in the app
const NOS_CODES = ['110', '152', '190', '195', '240', '290', '310', '340', '350', '360', '362', '365', '368', '370', '371', '375', '440', '442', '443', '445', '530', '550', '710', '791', '820', '830', '840', '850', '864', '870', '890', '899', '900', '950'];

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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mycasevalues.com';
  const now = new Date().toISOString();

  // ── Static pages ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/attorney`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/cases`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/odds`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/districts`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/judges`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/nos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/trends`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/map`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
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

  // ── Blog posts ────────────────────────────────────────
  const blogPosts = getAllPosts();
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt.toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...spanishPages,
    ...categoryUrls,
    ...nosUrls,
    ...outcomesUrls,
    ...blogUrls,
  ];
}
