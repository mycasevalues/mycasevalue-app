import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/api/stripe/', '/api/ingest'],
      },
    ],
    sitemap: 'https://mycasevalues.com/sitemap.xml',
  };
}
