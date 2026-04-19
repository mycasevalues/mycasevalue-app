import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '../../components/ui/Icons';
import { SITE_URL } from '../../lib/site-config';

// Blog post data
const blogArticles = [
  {
    slug: 'employment-discrimination-2024-data',
    title: 'What 5.1 Million Federal Cases Tell Us About Employment Discrimination in 2024',
    description: 'The national 52.2% win rate, $79K median settlement, and what 10 years of data reveal about circuit-level patterns and the impact of legal representation.',
    category: 'Research',
    date: new Date('2025-02-10'),
    readTime: 10,
    author: 'MyCaseValue Research Team',
  },
  {
    slug: 'favorable-outcome-districts',
    title: 'The 10 Most Favorable-Outcome Federal Districts — And What Makes Them Different',
    description: 'Real district win rate data reveals which federal courts are most favorable to plaintiffs and the factors that make them stand out.',
    category: 'District Analysis',
    date: new Date('2025-02-03'),
    readTime: 9,
    author: 'MyCaseValue Analytics Team',
  },
  {
    slug: 'federal-lawsuit-duration-data',
    title: 'How Long Does a Federal Lawsuit Actually Take? The Data Across 84 Case Types',
    description: 'From 2-month rent disputes to 26-month qui tam cases — real duration data from the FJC database showing how case type, representation, and district affect timelines.',
    category: 'Research',
    date: new Date('2025-01-27'),
    readTime: 8,
    author: 'MyCaseValue Research Team',
  },
  {
    slug: 'federal-court-filing-trends-2024',
    title: 'Federal Court Filing Trends: What Changed in 2024',
    description: 'An analysis of recent trends in federal court filings, including case type distribution, filing volumes, and what they mean for litigation strategy.',
    category: 'Trends',
    date: new Date('2025-01-15'),
    readTime: 6,
    author: 'MyCaseValue Research Team',
  },
  {
    slug: 'personal-injury-settlement-values-by-district',
    title: 'Personal Injury Settlement Values by District',
    description: 'Comprehensive analysis of settlement patterns across federal districts, comparing median values, percentiles, and regional variations in personal injury cases.',
    category: 'Settlement Data',
    date: new Date('2024-12-08'),
    readTime: 7,
    author: 'MyCaseValue Analytics Team',
  },
  {
    slug: 'employment-discrimination-10-year-analysis',
    title: 'Employment Discrimination: A 10-Year Analysis',
    description: 'A decade-long look at employment discrimination claims in federal court, including verdict rates, settlement trends, and the impact of legal representation.',
    category: 'Trends',
    date: new Date('2024-11-22'),
    readTime: 8,
    author: 'MyCaseValue Research Team',
  },
  {
    slug: 'data-driven-litigation-strategy',
    title: 'How to Use Data-Driven Litigation Strategy',
    description: 'Learn how to leverage federal court analytics and outcome data to develop more effective litigation strategies and manage client expectations.',
    category: 'Attorney Insights',
    date: new Date('2024-10-15'),
    readTime: 5,
    author: 'Legal Strategy Expert',
  },
  {
    slug: 'district-court-comparison-east-vs-west',
    title: 'District Court Comparison: East vs West',
    description: 'A comparative analysis of federal district courts in Eastern and Western regions, examining docket composition, case timelines, and verdict patterns.',
    category: 'District Analysis',
    date: new Date('2024-09-30'),
    readTime: 6,
    author: 'MyCaseValue Research Team',
  },
  {
    slug: 'settlement-negotiations-what-data-shows',
    title: 'Settlement Negotiations: What the Data Shows',
    description: 'Examine settlement negotiation patterns and strategies based on analysis of thousands of federal court cases and settlement outcomes.',
    category: 'Settlement Data',
    date: new Date('2024-09-05'),
    readTime: 7,
    author: 'MyCaseValue Analytics Team',
  },
];

export const metadata: Metadata = {
  title: 'Research & Insights — Federal Court Intelligence',
  description: 'Research-backed articles about federal court outcomes, case statistics, settlement data, win rates, and litigation strategy based on 5.1M+ cases.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog',
    description: 'Federal court insights, case data analysis, and litigation strategy based on 55+ years of real case outcomes.',
    type: 'website',
    url: `${SITE_URL}/blog`,
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Federal court insights, case data analysis, and litigation strategy based on 55+ years of real case outcomes.',
  },
  keywords: 'federal court data, case outcomes, litigation strategy, win rates, settlement data, legal insights',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      ],
    },
    {
      '@type': 'Blog',
      name: 'MyCaseValue Blog',
      description: 'Research-backed articles about federal court outcomes and litigation strategy',
      url: `${SITE_URL}/blog`,
    },
  ],
};

export default function BlogPage() {
  const featuredPost = blogArticles[0];
  const remainingPosts = blogArticles.slice(1);
  const categories = ['All', 'Trends', 'Settlement Data', 'District Analysis', 'Attorney Insights'];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      <style>{`
        .blog-breadcrumb-link:hover {
          color: var(--color-surface-0) !important;
        }
        .blog-card {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 2px;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .blog-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 0;
          background: var(--link);
          border-radius: 2px 4px 0 0;
          transition: height 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          border-color: var(--accent-primary);
        }

        .blog-card:hover::before {
          height: 3px;
        }

        .blog-card-content {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .featured-post {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 2px;
        }

        .featured-image-placeholder {
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text3, var(--color-text-3));
          font-size: 14px;
          border-radius: 2px;
        }

        .category-badge {
          background: rgba(239,68,68,0.08);
          color: var(--accent-primary);
          padding: 4px 10px;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          width: fit-content;
        }

        .sidebar-filter {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 2px;
          padding: 24px;
        }

        .filter-item {
          padding: 8px 0;
          font-size: 14px;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: color 200ms ease;
          font-family: var(--font-ui);
        }

        .filter-item:hover {
          color: var(--accent-primary);
        }

        .featured-research-card {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 2px;
          padding: 24px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .featured-research-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: var(--accent-primary);
        }

        .topic-pill {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 24px;
          padding: 8px 16px;
          font-size: 14px;
          color: var(--color-text-secondary);
          font-weight: 500;
          display: inline-block;
          transition: all 200ms ease;
          cursor: pointer;
          font-family: var(--font-ui);
          text-decoration: none;
        }

        .topic-pill:hover {
          border-color: var(--accent-primary);
          background: rgba(239,68,68,0.08);
          color: var(--accent-primary);
        }

        .related-tools-card {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 2px;
          padding: 24px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .related-tools-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: var(--accent-primary);
        }

        @media (max-width: 768px) {
          .grid-3-cols {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .grid-3-cols {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div style={{
        background: 'var(--card)',
        padding: '40px 24px 48px',
        borderBottom: '1px solid var(--bdr)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="max-w-6xl mx-auto" style={{ position: 'relative' }}>
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
            <Link href="/" className="blog-breadcrumb-link" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 200ms ease' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Blog</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 14,
            borderRadius: 999,
            border: '1px solid rgba(10,80,162,0.2)',
            background: 'rgba(10,80,162,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            Research & Analysis
          </div>
          <h1 className="font-legal" style={{
            color: 'var(--card)',
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: 10,
          }}>
            Federal Court Data & Litigation Insights
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'var(--font-legal)',
            fontSize: 14,
            lineHeight: 1.65,
            maxWidth: 640,
            margin: 0,
          }}>
            Research-backed articles analyzing real outcomes from 5.1M+ federal cases. Win rates, settlement data, timelines, and the factors that drive outcomes.
          </p>
        </div>
      </div>

      {/* Featured Post Hero */}
      {featuredPost && (
        <div className="max-w-6xl mx-auto px-6 py-16">
          <article className="featured-post overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Content */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="category-badge" style={{ marginBottom: '16px' }}>
                    {featuredPost.category}
                  </div>
                  <h2
                    className="font-legal font-bold mb-4 transition-colors"
                    style={{ fontSize: '22px', lineHeight: '1.3', color: 'var(--color-text-primary)', fontWeight: 600 }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p
                    className="mb-8 leading-relaxed"
                    style={{ fontSize: '16px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
                  >
                    {featuredPost.description}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>
                    <span className="font-medium">{featuredPost.author}</span>
                    <span className="mx-2">•</span>
                    <time>{featuredPost.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
                    style={{
                      background: 'var(--accent-primary)',
                      color: 'var(--color-surface-0)',
                      borderRadius: '4px',
                    }}
                  >
                    Read Article
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </div>

              {/* Right: Image Placeholder */}
              <div className="featured-image-placeholder" style={{ minHeight: '400px', fontSize: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', opacity: 0.5 }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p>Featured Article Image</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Main Content: Sidebar + Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar: Filters */}
          <aside className="md:col-span-1">
            <div className="sidebar-filter sticky top-6">
              <h3 className="font-legal font-bold mb-6" style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>
                CATEGORIES
              </h3>
              <div>
                {categories.map((cat) => (
                  <div key={cat} className="filter-item">
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main: Blog Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-3-cols gap-8" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {remainingPosts.map((post, idx) => (
                <article
                  key={post.slug}
                  className="blog-card"
                  style={{
                    animationDelay: `${(idx + 1) * 100}ms`,
                  }}
                >
                  <div className="blog-card-content p-6">
                    <div className="category-badge" style={{ marginBottom: '12px' }}>
                      {post.category}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="block"
                    >
                      <h3
                        className="font-legal font-semibold mb-3 transition-colors"
                        style={{ fontSize: '20px', color: 'var(--color-text-primary)', lineHeight: '1.4' }}
                      >
                        {post.title}
                      </h3>
                    </Link>

                    <p
                      className="mb-6 line-clamp-3"
                      style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-ui)', minHeight: '63px' }}
                    >
                      {post.description}
                    </p>

                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', marginBottom: '12px', flex: 1 }}>
                      <span className="font-medium">{post.author}</span>
                      <span className="mx-1.5">•</span>
                      <time>{post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded text-xs font-semibold transition-all"
                      style={{
                        background: 'rgba(239,68,68,0.08)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      Read More
                      <ArrowRightIcon size={12} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Research Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div style={{ marginBottom: '32px' }}>
          <h2 className="text-3xl font-legal font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Featured Research
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
            Explore our latest in-depth analyses on federal litigation trends, settlement patterns, and case outcomes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {[
            {
              title: 'Employment Discrimination Trends 2020-2024',
              description: 'Analyze settlement patterns and win rates in employment discrimination cases across federal districts.',
              href: '/blog/employment-discrimination-10-year-analysis',
            },
            {
              title: 'Settlement Rates Across Federal Circuits',
              description: 'Compare how settlement likelihood varies by circuit, judge, and case category.',
              href: '/blog/settlement-negotiations-what-data-shows',
            },
            {
              title: 'Pro Se Litigation: Success Rates in Federal Court',
              description: 'Examine outcomes for self-represented litigants and factors affecting their success.',
              href: '/blog/favorable-outcome-districts',
            },
            {
              title: 'How Judge Assignment Affects Case Outcomes',
              description: 'Explore the correlation between judge assignment and case duration, settlement, and verdicts.',
              href: '/blog/federal-lawsuit-duration-data',
            },
          ].map((research, idx) => (
            <Link
              key={idx}
              href={research.href}
              className="featured-research-card"
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px 0', lineHeight: 1.4, fontFamily: 'var(--font-legal)' }}>
                {research.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 16px 0', lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
                {research.description}
              </p>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary)', textDecoration: 'none' }}>
                Read more {'>'}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Browse by Topic Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div style={{ marginBottom: '32px' }}>
          <h2 className="text-3xl font-legal font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Browse by Topic
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
            Filter articles by practice area and research focus.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px' }}>
          {[
            'Employment',
            'Civil Rights',
            'Personal Injury',
            'Consumer',
            'Settlement Data',
            'Judge Analytics',
          ].map((topic) => (
            <Link
              key={topic}
              href={`/blog?topic=${topic.toLowerCase().replace(/\s+/g, '-')}`}
              className="topic-pill"
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div style={{ marginBottom: '32px' }}>
          <h2 className="text-3xl font-legal font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Related Tools
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
            Use these interactive tools to explore the data discussed in our research.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {[
            { name: 'Trends Explorer', href: '/trends', iconPath: 'M3 3v18h18M3 9h18M3 15h18' },
            { name: 'Judge Comparison', href: '/judges', iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
            { name: 'Case Comparison', href: '/compare', iconPath: 'M9 3H5a2 2 0 0 0-2 2v4m0 0H3m4 0V3m0 4v4a2 2 0 0 0 2 2h4m0 0h4a2 2 0 0 0 2-2v-4m0 0h4m-4 0v-4a2 2 0 0 0-2-2h-4m0 0H9m0 4v4' },
            { name: 'NOS Explorer', href: '/nos-explorer', iconPath: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm3 7h6M7 9h6M7 13h6' },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="related-tools-card"
            >
              <div>
                <div style={{ marginBottom: '12px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={tool.iconPath}/></svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px 0', fontFamily: 'var(--font-legal)' }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                  Explore federal case data interactively.
                </p>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary)', marginTop: '16px', textDecoration: 'none' }}>
                Explore {'>'}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <section className="text-center p-12 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '4px' }}>
          <h2 className="text-2xl font-legal font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Want deeper analysis? Try Attorney Mode
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', fontSize: '16px' }}>
            Access advanced case analytics, predictive insights, and strategic recommendations powered by 5.1M+ federal court cases.
          </p>
          <Link
            href="/attorney"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold transition-all"
            style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '2px' }}
          >
            Explore Attorney Mode
            <ArrowRightIcon size={16} />
          </Link>
        </section>
      </div>

    </div>
  );
}
