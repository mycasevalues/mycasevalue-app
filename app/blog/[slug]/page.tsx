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
      siteName: 'MyCaseValue',
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      images: post.image
        ? [{ url: post.image, alt: post.title }]
        : [{ url: `${baseUrl}/og-image.jpg`, alt: 'MyCaseValue' }],
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

// Helper function to calculate read time
function getFirstLetterInitial(name: string): string {
  return name.charAt(0).toUpperCase();
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
    <div className="min-h-screen" style={{ background: '#EDEEEE' }}>
      <style>{`
        .blog-header {
          background: #00172E;
        }

        .breadcrumb {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
          font-family: var(--font-body);
        }

        .breadcrumb a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .breadcrumb a:hover {
          opacity: 0.6;
          text-decoration: underline;
        }

        .breadcrumb span {
          color: rgba(255, 255, 255, 0.6);
          margin: 0 4px;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background: #E8171F;
          color: white;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
        }

        .article-card {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          padding: 40px;
          margin: -40px 0 0 0;
          position: relative;
        }

        @media (max-width: 640px) {
          .article-card {
            border-radius: 4px;
            padding: 32px 20px;
            margin: -32px 0 0 0;
          }
        }

        .author-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #E8171F;
          color: white;
          font-weight: 600;
          font-size: 18px;
          font-family: var(--font-display);
          flex-shrink: 0;
        }

        .author-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: #FFFFFF;
          border-radius: 4px;
          border: 1px solid #D5D8DC;
          margin-bottom: 32px;
          transition: all 0.3s ease;
        }

        .author-card:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          display: block;
          font-size: 15px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 4px;
          font-family: var(--font-display);
        }

        .author-meta {
          font-size: 13px;
          color: #455A64;
          font-family: var(--font-body);
        }

        .article-body {
          max-width: 720px;
          margin: 0 auto;
        }

        .article-body p {
          font-size: 16px;
          line-height: 1.7;
          color: #455A64;
          margin-bottom: 1.5rem;
          font-family: var(--font-body);
        }

        .article-body h2 {
          font-size: 24px;
          font-weight: 700;
          color: #00172E;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-family: var(--font-display);
        }

        .article-body h3 {
          font-size: 20px;
          font-weight: 600;
          color: #00172E;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-family: var(--font-display);
        }

        .article-body blockquote {
          border-left: 4px solid #E8171F;
          padding-left: 20px;
          margin: 2rem 0;
          font-style: italic;
          color: #455A64;
          background: #F8F9FA;
          padding: 20px 20px 20px 20px;
          border-radius: 4px;
        }

        .article-body ul,
        .article-body ol {
          margin: 1.5rem 0;
          padding-left: 32px;
          color: #455A64;
        }

        .article-body li {
          margin-bottom: 0.75rem;
          font-family: var(--font-body);
          line-height: 1.7;
        }

        .tag-pill {
          display: inline-block;
          padding: 8px 14px;
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          color: #E8171F;
          text-decoration: none;
          transition: all 0.2s ease;
          font-family: var(--font-body);
          margin-right: 8px;
          margin-bottom: 8px;
        }

        .tag-pill:hover {
          background: #FFF3F4;
          border-color: #E8171F;
          transform: translateY(-2px);
        }

        .related-card {
          border-radius: 4px;
          border: 1px solid #D5D8DC;
          background: #FFFFFF;
          padding: 32px;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }

        .related-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-4px);
          border-color: #E8171F;
        }

        .related-card h3 {
          transition: color 0.3s ease;
          color: #212529;
          font-family: var(--font-display);
        }

        .related-card:hover h3 {
          color: #E8171F;
        }

        .share-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 4px;
          border: 1px solid #D5D8DC;
          background: #FFFFFF;
          color: #212529;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .share-button:hover {
          border-color: #E8171F;
          background: #FFF3F4;
          color: #E8171F;
        }

        .article-section {
          padding-top: 8px;
          border-top: 1px solid #D5D8DC;
          margin-top: 48px;
        }

        .cta-section {
          background: #FFFFFF;
          border-radius: 4px;
          border: 1px solid #D5D8DC;
          padding: 48px;
          text-align: center;
          margin-top: 48px;
        }

        @media (max-width: 640px) {
          .cta-section {
            padding: 32px 20px;
          }
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #E8171F;
          color: #FFFFFF;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: var(--font-display);
        }

        .cta-button:hover {
          background: #CC121A;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.3);
        }

        .related-section {
          background: #FFFFFF;
          border-radius: 4px;
          border: 1px solid #D5D8DC;
          padding: 48px;
          margin-top: 48px;
        }

        @media (max-width: 640px) {
          .related-section {
            padding: 32px 20px;
          }
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #00172E;
          margin-bottom: 32px;
          font-family: var(--font-display);
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dark Navy Header */}
      <div className="blog-header text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span>&gt;</span>
            <a href="/blog">Blog</a>
            <span>&gt;</span>
            <span>{post.title}</span>
          </div>

          {/* Category badge */}
          <div className="mb-8">
            <span className="category-badge">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6" style={{ color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(255, 255, 255, 0.95)', fontFamily: 'var(--font-body)' }}>
            {post.description}
          </p>

          {/* Meta information in header */}
          <div className="flex flex-wrap items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'var(--font-body)' }}>
              <span className="font-medium" style={{ color: '#FFFFFF' }}>{post.author}</span>
              <span className="mx-2">•</span>
              <time>{post.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span className="mx-2">•</span>
              <span>{post.readTime} min read</span>
            </div>
            {post.updatedAt !== post.publishedAt && (
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'var(--font-body)' }}>
                Updated {post.updatedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article card wrapper */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        {/* Author Card */}
        <div className="author-card">
          <div className="author-avatar">
            {getFirstLetterInitial(post.author)}
          </div>
          <div className="author-info">
            <span className="author-name">{post.author}</span>
            <span className="author-meta">
              {post.publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {post.readTime} min read
            </span>
          </div>
        </div>

        {/* Article content card */}
        <article className="article-card">
          <div className="article-body">
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="article-section">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="tag-pill"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>

          {/* Social Sharing Section */}
          <div className="article-section">
            <p className="text-sm font-semibold mb-6" style={{ color: '#212529', fontFamily: 'var(--font-display)' }}>
              Share this article
            </p>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?url=https://mycasevalues.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                className="share-button"
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 10.42.48 11-4a9 9 0 01-1-9 4.35 4.35 0 00.7-.7z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://mycasevalues.com/blog/${post.slug}`}
                className="share-button"
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=Check out this article: https://mycasevalues.com/blog/${post.slug}`}
                className="share-button"
                title="Share via Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="cta-section">
          <h2 className="section-title" style={{ marginTop: 0 }}>
            Research your case with real data
          </h2>
          <p className="mb-8 mx-auto" style={{ color: '#455A64', maxWidth: '560px', fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: '1.6' }}>
            Use the insights from this article to get a comprehensive analysis of outcomes in cases like yours.
          </p>
          <a
            href="/search"
            className="cta-button"
          >
            Research Your Case
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6">
          <div className="related-section">
            <h2 className="section-title" style={{ marginTop: 0 }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <a
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="related-card"
                >
                  <div className="flex flex-col gap-4 h-full">
                    <span
                      className="inline-flex items-center w-fit px-3 py-1.5 rounded text-xs font-semibold"
                      style={{
                        background: '#FFF3F4',
                        color: '#E8171F',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-display font-bold leading-tight" style={{ color: '#212529' }}>
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                      {relatedPost.description}
                    </p>
                    <div className="text-xs pt-3 border-t" style={{ color: '#455A64', borderColor: '#D5D8DC', fontFamily: 'var(--font-body)' }}>
                      {relatedPost.readTime} min read
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
