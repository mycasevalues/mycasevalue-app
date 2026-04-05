import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/account/', '/admin/', '/sign-in/', '/sign-up/', '/settings/', '/billing/', '/reports/', '/forgot-password/', '/reset-password/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
