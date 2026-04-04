import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '../../../lib/blog';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Article Not Found — MyCaseValue',
      description: 'The article you are looking for could not be found.',
    };
  }

  const url = `https://mycasevalues.com/blog/${post.slug}`;
  const baseUrl = new URL(url).origin;

  return {
    title: `${post.title} — MyCaseValue`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.title }] : [{ url: `${baseUrl}/og-image.jpg`, alt: 'MyCaseValue' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [`${baseUrl}/og-image.jpg`],
    },
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    creator: post.author,
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.mycasevalues.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: `https://mycasevalues.com/blog/${post.slug}` },
        ],
      },
      {
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        image: post.image || 'https://www.mycasevalues.com/og-image.jpg',
        datePublished: post.publishedAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
          '@type': 'Organization',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'MyCaseValue',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.mycasevalues.com/logo.svg',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://mycasevalues.com/blog/${post.slug}`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header with breadcrumb */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-base) 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <a href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#111111' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Blog
          </a>

          {/* Category and meta */}
          <div className="mb-6">
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(17,17,17,0.15)',
                color: '#111111',
              }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-6" style={{ color: '#111111', letterSpacing: '-1.5px' }}>
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg leading-relaxed" style={{ color: '#6B7280' }}>
            {post.description}
          </p>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-default)' }}>
            <div className="text-sm" style={{ color: '#6B7280' }}>
              <span className="font-medium" style={{ color: '#111111' }}>{post.author}</span>
              <span className="mx-2">•</span>
              <time>{post.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span className="mx-2">•</span>
              <span>{post.readTime} min read</span>
            </div>
            {post.updatedAt !== post.publishedAt && (
              <div className="text-xs" style={{ color: '#6B7280' }}>
                Updated {post.updatedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose max-w-none" style={{
          '--tw-prose-body': '#111111',
          '--tw-prose-headings': '#111111',
          '--tw-prose-lead': '#6B7280',
          '--tw-prose-links': '#111111',
          '--tw-prose-bold': '#111111',
          '--tw-prose-counters': '#111111',
          '--tw-prose-bullets': '#111111',
          '--tw-prose-hr': 'var(--border-default)',
          '--tw-prose-quotes': '#6B7280',
          '--tw-prose-quote-borders': '#111111',
          '--tw-prose-captions': '#6B7280',
          '--tw-prose-code': '#111111',
          '--tw-prose-pre-code': '#374151',
          '--tw-prose-pre-bg': '#FFFFFF',
          '--tw-prose-th-borders': 'var(--border-default)',
          '--tw-prose-td-borders': 'var(--border-default)',
        } as any}>
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-lg leading-relaxed mb-6" style={{ color: '#6B7280' }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <a
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
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

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <section className="text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#111111' }}>
            See real case data for your situation
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Use the insights from this article to get a personalized analysis of outcomes in cases like yours.
          </p>
          <a
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#111111', color: '#FFFFFF' }}
          >
            Check My Case Type
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </section>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--border-default)' }}>
          <h2 className="text-2xl font-display font-bold mb-8" style={{ color: '#111111' }}>
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <a
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
                style={{
                  borderColor: 'var(--border-default)',
                  background: '#FFFFFF',
                  textDecoration: 'none',
                }}
              >
                <div className="flex flex-col gap-3 h-full">
                  <span
                    className="inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(17,17,17,0.15)',
                      color: '#111111',
                    }}
                  >
                    {relatedPost.category}
                  </span>
                  <h3 className="text-base font-display font-bold leading-tight group-hover:text-violet-500 transition-colors" style={{ color: '#111111' }}>
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#6B7280' }}>
                    {relatedPost.description}
                  </p>
                  <div className="text-xs pt-2 border-t" style={{ color: '#6B7280', borderColor: 'var(--border-default)' }}>
                    {relatedPost.readTime} min read
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
