import { Metadata } from 'next';
import { getAllPosts } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Blog — MyCaseValue | Federal Court Data & Legal Insights',
  description: 'Research-backed articles about federal court outcomes, case statistics, settlement data, win rates, and litigation strategy based on 5.1M+ cases.',
  alternates: { canonical: 'https://mycasevalues.com/blog' },
  openGraph: {
    title: 'Blog — MyCaseValue',
    description: 'Federal court insights, case data analysis, and litigation strategy based on 54 years of real case outcomes.',
    type: 'website',
    url: 'https://mycasevalues.com/blog',
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
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mycasevalues.com/blog' },
      ],
    },
    {
      '@type': 'Blog',
      name: 'MyCaseValue Blog',
      description: 'Research-backed articles about federal court outcomes and litigation strategy',
      url: 'https://mycasevalues.com/blog',
    },
  ],
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAF8 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/></svg>
            INSIGHTS & ANALYSIS
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px' }}>
            Federal Court Data & Litigation Insights
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
            Research-backed articles analyzing real outcomes from 5.1M+ federal cases. Understand win rates, settlement data, timelines, and what affects your case.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post, idx) => (
            <article
              key={post.slug}
              className="group rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 animate-in fade-in slide-in-from-bottom-4"
              style={{
                borderColor: 'var(--border-default)',
                background: 'rgba(25, 32, 56, 0.4)',
                backdropFilter: 'blur(10px)',
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="flex flex-col gap-4">
                {/* Category badge */}
                <div>
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(17,17,17,0.15)',
                      color: '#111111',
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Title and description */}
                <div>
                  <a
                    href={`/blog/${post.slug}`}
                    className="block group/link"
                  >
                    <h2
                      className="text-2xl sm:text-3xl font-display font-bold mb-3 transition-colors group-hover/link:text-indigo-400"
                      style={{ color: 'var(--fg-primary)' }}
                    >
                      {post.title}
                    </h2>
                  </a>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {post.description}
                  </p>
                </div>

                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
                  <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    <span className="font-medium">{post.author}</span>
                    <span className="mx-2">•</span>
                    <time>{post.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background: 'rgba(17,17,17,0.1)',
                        color: '#111111',
                      }}
                    >
                      Read Article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="text-xs font-medium px-2.5 py-1 rounded-full transition-colors"
                      style={{
                        background: 'rgba(17,17,17,0.08)',
                        color: '#8B5CF6',
                      }}
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <section className="text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
            Ready to analyze your case?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
            Use the data you just learned to get a personalized analysis of real outcomes in cases like yours.
          </p>
          <a
            href="/odds"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#111111', color: '#FFFFFF' }}
          >
            Check My Case Type
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </section>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--fg-muted)' }}>
          MyCaseValue provides aggregate historical data from public federal court records for informational and research purposes only.
          We are not a law firm. This is not legal advice. No attorney-client relationship is created by using this tool.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
