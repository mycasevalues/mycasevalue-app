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
    slug: 'plaintiff-friendly-districts',
    title: 'The 10 Most Plaintiff-Friendly Federal Districts — And What Makes Them Different',
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
  title: 'Blog — MyCaseValue | Federal Court Data & Legal Insights',
  description: 'Research-backed articles about federal court outcomes, case statistics, settlement data, win rates, and litigation strategy based on 5.1M+ cases.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog — MyCaseValue',
    description: 'Federal court insights, case data analysis, and litigation strategy based on 54 years of real case outcomes.',
    type: 'website',
    url: `${SITE_URL}/blog`,
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
    <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
      <style>{`
        .blog-breadcrumb-link:hover {
          color: #FFFFFF !important;
        }
        .blog-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
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
          background: #0966C3;
          border-radius: 12px 12px 0 0;
          transition: height 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          border-color: #0966C3;
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
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
        }

        .featured-image-placeholder {
          background: #F0F1F2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 14px;
          border-radius: 12px;
        }

        .category-badge {
          background: #FFF3F4;
          color: #0966C3;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          width: fit-content;
        }

        .sidebar-filter {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
        }

        .filter-item {
          padding: 10px 0;
          font-size: 14px;
          color: #4B5563;
          cursor: pointer;
          transition: color 0.2s ease;
          font-family: var(--font-body);
        }

        .filter-item:hover {
          color: #0966C3;
        }

        .featured-research-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .featured-research-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #0966C3;
        }

        .topic-pill {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          padding: 8px 16px;
          font-size: 13px;
          color: #4B5563;
          font-weight: 500;
          display: inline-block;
          transition: all 0.2s ease;
          cursor: pointer;
          font-family: var(--font-body);
          text-decoration: none;
        }

        .topic-pill:hover {
          border-color: #0966C3;
          background: #FFF3F4;
          color: #0966C3;
        }

        .related-tools-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
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
          border-color: #0966C3;
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
      <div style={{ background: '#1C3A5E', padding: '64px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
            <a href="/" className="blog-breadcrumb-link" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>/</span>
            <span style={{ color: '#FFFFFF' }}>Blog</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', background: 'rgba(255,255,255,0.1)', color: '#0966C3' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            BLOG
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#FFFFFF', letterSpacing: '-1.5px' }}>
            Federal Court Data {'\u0026'} Litigation Insights
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
            Research-backed articles analyzing real outcomes from 5.1M+ federal cases. Understand win rates, settlement data, timelines, and what affects your case.
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
                    className="font-display font-bold mb-4 transition-colors"
                    style={{ fontSize: '28px', lineHeight: '1.3', color: '#0f0f0f', fontWeight: 600 }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p
                    className="mb-8 leading-relaxed"
                    style={{ fontSize: '16px', color: '#4B5563', fontFamily: 'var(--font-body)' }}
                  >
                    {featuredPost.description}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                    <span className="font-medium">{featuredPost.author}</span>
                    <span className="mx-2">•</span>
                    <time>{featuredPost.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
                    style={{
                      background: '#0966C3',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                    }}
                  >
                    Read Article
                    <ArrowRightIcon size={14} />
                  </a>
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
              <h3 className="font-display font-bold mb-6" style={{ fontSize: '14px', color: '#0f0f0f' }}>
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
          <main className="md:col-span-3">
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

                    <a
                      href={`/blog/${post.slug}`}
                      className="block"
                    >
                      <h3
                        className="font-display font-semibold mb-3 transition-colors"
                        style={{ fontSize: '18px', color: '#0f0f0f', lineHeight: '1.4' }}
                      >
                        {post.title}
                      </h3>
                    </a>

                    <p
                      className="mb-6 line-clamp-3"
                      style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.5', fontFamily: 'var(--font-body)', minHeight: '63px' }}
                    >
                      {post.description}
                    </p>

                    <div style={{ fontSize: '12px', color: '#4B5563', fontFamily: 'var(--font-body)', marginBottom: '12px', flex: 1 }}>
                      <span className="font-medium">{post.author}</span>
                      <span className="mx-1.5">•</span>
                      <time>{post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                    </div>

                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded text-xs font-semibold transition-all"
                      style={{
                        background: '#FFF3F4',
                        color: '#0966C3',
                      }}
                    >
                      Read More
                      <ArrowRightIcon size={12} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Featured Research Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div style={{ marginBottom: '32px' }}>
          <h2 className="text-3xl font-display font-bold mb-2" style={{ color: '#0f0f0f' }}>
            Featured Research
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
            Explore our latest in-depth analyses on federal litigation trends, settlement patterns, and case outcomes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {[
            {
              title: 'Employment Discrimination Trends 2020-2024',
              description: 'Analyze settlement patterns and win rates in employment discrimination cases across federal districts.',
            },
            {
              title: 'Settlement Rates Across Federal Circuits',
              description: 'Compare how settlement likelihood varies by circuit, judge, and case category.',
            },
            {
              title: 'Pro Se Litigation: Success Rates in Federal Court',
              description: 'Examine outcomes for self-represented litigants and factors affecting their success.',
            },
            {
              title: 'How Judge Assignment Affects Case Outcomes',
              description: 'Explore the correlation between judge assignment and case duration, settlement, and verdicts.',
            },
          ].map((research, idx) => (
            <a
              key={idx}
              href="#"
              className="featured-research-card"
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px 0', lineHeight: 1.4, fontFamily: 'var(--font-display)' }}>
                {research.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#4B5563', margin: '0 0 16px 0', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                {research.description}
              </p>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#0966C3', textDecoration: 'none' }}>
                Read more {'>'}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Browse by Topic Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div style={{ marginBottom: '32px' }}>
          <h2 className="text-3xl font-display font-bold mb-2" style={{ color: '#0f0f0f' }}>
            Browse by Topic
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
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
            <a
              key={topic}
              href="#"
              className="topic-pill"
            >
              {topic}
            </a>
          ))}
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div style={{ marginBottom: '32px' }}>
          <h2 className="text-3xl font-display font-bold mb-2" style={{ color: '#0f0f0f' }}>
            Related Tools
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
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
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={tool.iconPath}/></svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 8px 0', fontFamily: 'var(--font-display)' }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                  Explore federal case data interactively.
                </p>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#0966C3', marginTop: '16px', textDecoration: 'none' }}>
                Explore {'>'}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <section className="text-center p-12 border" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '12px' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#0f0f0f' }}>
            Want deeper analysis? Try Attorney Mode
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '16px' }}>
            Access advanced case analytics, predictive insights, and strategic recommendations powered by 5.1M+ federal court cases.
          </p>
          <a
            href="/search"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold transition-all"
            style={{ background: '#0966C3', color: '#FFFFFF', borderRadius: '12px' }}
          >
            Explore Attorney Mode
            <ArrowRightIcon size={16} />
          </a>
        </section>
      </div>

    </div>
  );
}
