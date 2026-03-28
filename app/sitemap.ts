import { MetadataRoute } from 'next';

const CATEGORY_IDS = ['work', 'injury', 'consumer', 'rights', 'money', 'housing', 'medical', 'family', 'gov', 'education'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mycasevalues.com';
  const now = new Date().toISOString();

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_IDS.map((id) => ({
    url: `${baseUrl}/cases/${id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
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
      url: `${baseUrl}/cases`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...categoryUrls,
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
