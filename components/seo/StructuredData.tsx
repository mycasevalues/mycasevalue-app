/**
 * Structured Data (JSON-LD) components for SEO.
 * Provides schema.org markup for better search engine understanding.
 */

import { SITE_URL } from '@/lib/site-config';

type WebApplicationProps = {
  name: string;
  description: string;
  url: string;
  category?: string;
  offers?: { price: string; priceCurrency: string };
};

/**
 * JSON-LD for attorney tools (SoftwareApplication schema).
 * Helps Google understand each tool page as a web application.
 */
export function WebApplicationSchema({ name, description, url, category, offers }: WebApplicationProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: category || 'LegalService',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    offers: offers || {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'MyCaseValue',
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

type FAQProps = {
  questions: { question: string; answer: string }[];
};

/**
 * JSON-LD for FAQ sections.
 * Eligible for Google FAQ rich results.
 */
export function FAQSchema({ questions }: FAQProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

type BreadcrumbProps = {
  items: { name: string; url: string }[];
};

/**
 * JSON-LD for breadcrumb navigation.
 * Helps Google display breadcrumbs in search results.
 */
export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
