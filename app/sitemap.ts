import { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/blog';

const CATEGORY_IDS = ['work', 'injury', 'consumer', 'rights', 'money', 'housing', 'medical', 'family', 'gov', 'education'];

// All unique NOS codes used in the app
const NOS_CODES = ['110', '152', '190', '195', '240', '290', '310', '340', '350', '360', '362', '365', '368', '370', '371', '375', '440', '442', '445', '530', '550', '710', '791', '820', '830', '840', '850', '864', '870', '890'];

// Top districts and case types for programmatic SEO pages
const TOP_DISTRICTS = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
const TOP_CASE_TYPES = ['employment-discrimination', 'breach-of-contract', 'personal-injury', 'wrongful-termination', 'medical-malpractice'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mycasevalues.com';
  const now = new Date().toISOString();

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_IDS.map((id) => ({
    url: `${baseUrl}/cases/${id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const nosUrls: MetadataRoute.Sitemap = NOS_CODES.map((code) => ({
    url: `${baseUrl}/nos/${code}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

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

  const blogPosts = getAllPosts();
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt.toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: blogPosts.length > 0 ? blogPosts[0].updatedAt.toISOString() : now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
    {
      url: `${baseUrl}/cases`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...categoryUrls,
    {
      url: `${baseUrl}/nos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...nosUrls,
    {
      url: `${baseUrl}/outcomes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...outcomesUrls,
    {
      url: `${baseUrl}/methodology`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/odds`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trends`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/map`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
