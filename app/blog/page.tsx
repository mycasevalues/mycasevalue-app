import { Metadata } from 'next';
import { getAllPosts } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Blog — MyCaseValue | Federal Court Data & Legal Insights',
  description: 'Research-backed articles about federal court outcomes, case statistics, settlement data, win rates, and litigation strategy based on 5.1M+ cases.',
  alternates: { canonical: 'https://www.mycasevalues.com/blog' },
  openGraph: {
    title: 'Blog — MyCaseValue',
    description: 'Federal court insights, case data analysis, and litigation strategy based on 54 years of real case outcomes.',
    type: 'website',
    url: 'https://www.mycasevalues.com/blog',
  },
  keywords: 'federal court data, case outcomes, litigation strategy, win rates, settlement data, legal insights',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.mycasevalues.com/blog' },
      ],
    },
    {
      '@type': 'Blog',
      name: 'MyCaseValue Blog',
      description: 'Research-backed articles about federal court outcomes and litigation strategy',
      url: 'https://www.mycasevalues.com/blog',
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
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <style>{`
        .blog-breadcrumb-link:hover {
          color: #FFFFFF !important;
        }
        .blog-card {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
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
          background: #E8171F;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          border-color: #E8171F;
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
          border: 1px solid #D5D8DC;
          border-radius: 4px;
        }

        .featured-image-placeholder {
          background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 14px;
          border-radius: 4px;
        }

        .category-badge {
          background: #FFF3F4;
          color: #E8171F;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .sidebar-filter {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          padding: 24px;
        }

        .filter-item {
          padding: 10px 0;
          font-size: 14px;
          color: #455A64;
          cursor: pointer;
          transition: color 0.2s ease;
          font-family: var(--font-body);
        }

        .filter-item:hover {
          color: #E8171F;
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
      <div style={{ background: '#00172E', padding: '64px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
            <a href="/" className="blog-breadcrumb-link" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>/</span>
            <span style={{ color: '#FFFFFF' }}>Blog</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', background: 'rgba(255,255,255,0.1)', color: '#E8171F' }}>
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
                    style={{ fontSize: '16px', color: '#455A64', fontFamily: 'var(--font-body)' }}
                  >
                    {featuredPost.description}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999999', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                    <span className="font-medium">{featuredPost.author}</span>
                    <span className="mx-2">•</span>
                    <time>{featuredPost.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition-all"
                    style={{
                      background: '#E8171F',
                      color: '#FFFFFF',
                    }}
                  >
                    Read Article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
                      style={{ fontSize: '14px', color: '#455A64', lineHeight: '1.5', fontFamily: 'var(--font-body)', minHeight: '63px' }}
                    >
                      {post.description}
                    </p>

                    <div style={{ fontSize: '12px', color: '#999999', fontFamily: 'var(--font-body)' }}>
                      <span className="font-medium">{post.author}</span>
                      <span className="mx-1.5">•</span>
                      <time>{post.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                    </div>

                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 mt-4 px-3 py-2 rounded text-xs font-semibold transition-all"
                      style={{
                        background: '#FFF3F4',
                        color: '#E8171F',
                      }}
                    >
                      Read More
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <section className="text-center p-12 rounded-md border" style={{ borderColor: '#D5D8DC', background: '#FFFFFF' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
            Want deeper analysis? Try Attorney Mode
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: '#455A64', fontFamily: 'var(--font-body)', fontSize: '16px' }}>
            Access advanced case analytics, predictive insights, and strategic recommendations powered by 5.1M+ federal court cases.
          </p>
          <a
            href="/search"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-sm font-semibold transition-all"
            style={{ background: '#E8171F', color: '#FFFFFF' }}
          >
            Explore Attorney Mode
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </section>
      </div>

    </div>
  );
}
