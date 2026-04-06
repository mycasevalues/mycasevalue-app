import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '../../lib/blog';
import { ArrowRightIcon } from '../../components/ui/Icons';
import { SITE_URL } from '../../lib/site-config';

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
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  const categories = [
    'All',
    'Employment Law',
    'Personal Injury',
    'Federal Courts',
    'Data Analysis',
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
      <style>{`
        .blog-breadcrumb-link:hover {
          color: #FFFFFF !important;
        }
        .blog-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: relative;
        }

        .blog-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 0;
          background: #7C3AED;
          border-radius: 6px 4px 0 0;
          transition: height 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          border-color: #7C3AED;
        }

        .blog-card:hover::before {
          height: 3px;
        }

        .blog-card-content {
          position: relative;
          z-index: 1;
        }

        .featured-post {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
        }

        .featured-image-placeholder {
          background: #F0F1F2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 14px;
          border-radius: 6px;
        }

        .category-badge {
          background: #FFF3F4;
          color: #7C3AED;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .sidebar-filter {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
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
          color: #7C3AED;
        }

        .featured-research-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .featured-research-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #7C3AED;
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
        }

        .topic-pill:hover {
          border-color: #7C3AED;
          background: #FFF3F4;
          color: #7C3AED;
        }

        .related-tools-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
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
          border-color: #6D28D9;
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
      <div style={{ background: '#1B3A5C', padding: '64px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
            <a href="/" className="blog-breadcrumb-link" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>/</span>
            <span style={{ color: '#FFFFFF' }}>Blog</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', background: 'rgba(255,255,255,0.1)', color: '#7C3AED' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            BLOG
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#FFFFFF', letterSpacing: '-1.5px' }}>
            Federal Court Data & Litigation Insights
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
                    style={{ fontSize: '28px', lineHeight: '1.3', color: '#212529', fontWeight: 600 }}
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
                    <time>{featuredPost.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
                    style={{
                      background: '#7C3AED',
                      color: '#FFFFFF',
                      borderRadius: '6px',
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
              <h3 className="font-display font-bold mb-6" style={{ fontSize: '14px', color: '#212529' }}>
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
                        style={{ fontSize: '18px', color: '#212529', lineHeight: '1.4' }}
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

                    <div style={{ fontSize: '12px', color: '#4B5563', fontFamily: 'var(--font-body)' }}>
                      <span className="font-medium">{post.author}</span>
                      <span className="mx-1.5">•</span>
                      <time>{post.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                    </div>

                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 mt-4 px-3 py-2 rounded text-xs font-semibold transition-all"
                      style={{
                        background: '#FFF3F4',
                        color: '#7C3AED',
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
          <h2 className="text-3xl font-display font-bold mb-2" style={{ color: '#212529' }}>
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
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', margin: '0 0 12px 0', lineHeight: 1.4, fontFamily: 'var(--font-display)' }}>
                {research.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#4B5563', margin: '0 0 16px 0', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                {research.description}
              </p>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6D28D9', textDecoration: 'none' }}>
                Read more →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Browse by Topic Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div style={{ marginBottom: '32px' }}>
          <h2 className="text-3xl font-display font-bold mb-2" style={{ color: '#212529' }}>
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
          <h2 className="text-3xl font-display font-bold mb-2" style={{ color: '#212529' }}>
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
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={tool.iconPath}/></svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', margin: '0 0 8px 0', fontFamily: 'var(--font-display)' }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                  Explore federal case data interactively.
                </p>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6D28D9', marginTop: '16px', textDecoration: 'none' }}>
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <section className="text-center p-12 border" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '6px' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
            Want deeper analysis? Try Attorney Mode
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '16px' }}>
            Access advanced case analytics, predictive insights, and strategic recommendations powered by 5.1M+ federal court cases.
          </p>
          <a
            href="/search"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold transition-all"
            style={{ background: '#7C3AED', color: '#FFFFFF', borderRadius: '6px' }}
          >
            Explore Attorney Mode
            <ArrowRightIcon size={16} />
          </a>
        </section>
      </div>

    </div>
  );
}
