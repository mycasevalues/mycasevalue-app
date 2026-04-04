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
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <style>{`
        .blog-header {
          background: linear-gradient(135deg, #1A2B3D 0%, #243A4D 100%);
        }

        .author-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8171F 0%, #CC1019 100%);
          color: white;
          font-weight: 600;
          font-size: 18px;
          font-family: var(--font-display);
          flex-shrink: 0;
        }

        .author-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: #F8F9FA;
          border-radius: 8px;
          margin-bottom: 32px;
          border: 1px solid #E8ECEF;
          transition: background-color 0.3s ease;
        }

        .author-card:hover {
          background: #F3F6F9;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 2px;
          font-family: var(--font-display);
        }

        .author-meta {
          font-size: 13px;
          color: #6B7280;
          font-family: var(--font-body);
        }

        .article-body {
          max-width: 720px;
          margin: 0 auto;
        }

        .article-body p:first-child::first-letter {
          font-size: 3em;
          font-weight: 700;
          float: left;
          line-height: 0.8;
          padding-right: 8px;
          margin-top: 3px;
          color: #1A2B3D;
          font-family: var(--font-display);
        }

        .article-body p {
          font-size: 17px;
          line-height: 1.8;
          color: #454F59;
          margin-bottom: 1.5rem;
          font-family: var(--font-body);
        }

        .article-body blockquote {
          border-left: 4px solid #E8171F;
          padding-left: 20px;
          margin: 2rem 0;
          font-style: italic;
          color: #6B7280;
        }

        .tag-pill {
          display: inline-block;
          padding: 6px 12px;
          background: #F8F9FA;
          border: 1px solid #D5D8DC;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #E8171F;
          text-decoration: none;
          transition: all 0.2s ease;
          font-family: var(--font-body);
        }

        .tag-pill:hover {
          background: #EFF1F3;
          border-color: #C1C5CA;
          transform: translateY(-2px);
        }

        .related-card {
          border-radius: 12px;
          border: 1px solid var(--border-default);
          background: #FFFFFF;
          padding: 24px;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .related-card:hover {
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-4px);
          border-color: #E8171F;
        }

        .related-card h3 {
          transition: color 0.3s ease;
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
          border-radius: 8px;
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

        .breadcrumb {
          font-size: 13px;
          color: #6B7280;
          margin-bottom: 24px;
          font-family: var(--font-body);
        }

        .breadcrumb a {
          color: #E8171F;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .breadcrumb a:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dark Navy Header */}
      <div className="blog-header text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span> / </span>
            <a href="/blog">Blog</a>
            <span> / </span>
            <span>{post.title}</span>
          </div>

          {/* Category badge */}
          <div className="mb-6">
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-6" style={{ color: '#FFFFFF', letterSpacing: '-1.5px' }}>
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            {post.description}
          </p>

          {/* Meta information in header */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <span className="font-medium" style={{ color: '#FFFFFF' }}>{post.author}</span>
              <span className="mx-2">•</span>
              <time>{post.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span className="mx-2">•</span>
              <span>{post.readTime} min read</span>
            </div>
            {post.updatedAt !== post.publishedAt && (
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Updated {post.updatedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author Card */}
      <div className="max-w-3xl mx-auto px-6 pt-12">
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
      </div>

      {/* Article content */}
      <article className="article-body mx-auto px-6 py-8">
        <div style={{
          '--tw-prose-body': '#212529',
          '--tw-prose-headings': '#1A2B3D',
          '--tw-prose-lead': '#6B7280',
          '--tw-prose-links': '#212529',
          '--tw-prose-bold': '#212529',
          '--tw-prose-counters': '#212529',
          '--tw-prose-bullets': '#212529',
          '--tw-prose-hr': 'var(--border-default)',
          '--tw-prose-quotes': '#6B7280',
          '--tw-prose-quote-borders': '#E8171F',
          '--tw-prose-captions': '#6B7280',
          '--tw-prose-code': '#212529',
          '--tw-prose-pre-code': '#6B7280',
          '--tw-prose-pre-bg': '#FFFFFF',
          '--tw-prose-th-borders': 'var(--border-default)',
          '--tw-prose-td-borders': 'var(--border-default)',
        } as any}>
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} style={{ fontSize: '17px', lineHeight: '1.8', color: '#454F59', marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
          <div className="flex flex-wrap gap-3">
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
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
          <p className="text-sm font-semibold mb-4" style={{ color: '#212529', fontFamily: 'var(--font-display)' }}>
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

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
            Research your case with real data
          </h2>
          <p className="mb-8 mx-auto" style={{ color: '#6B7280', maxWidth: '480px', fontFamily: 'var(--font-body)' }}>
            Use the insights from this article to get a comprehensive analysis of outcomes in cases like yours.
          </p>
          <a
            href="/search"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-base font-semibold transition-all hover:shadow-lg"
            style={{ background: '#E8171F', color: '#FFFFFF' }}
          >
            Research Your Case
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--border-default)' }}>
          <h2 className="text-2xl font-display font-bold mb-8" style={{ color: '#212529' }}>
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <a
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="related-card"
                style={{
                  textDecoration: 'none',
                }}
              >
                <div className="flex flex-col gap-3 h-full">
                  <span
                    className="inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: '#FFF3F4',
                      color: '#CC1019',
                    }}
                  >
                    {relatedPost.category}
                  </span>
                  <h3 className="text-base font-display font-bold leading-tight" style={{ color: '#212529' }}>
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#6B7280', fontFamily: 'var(--font-body)' }}>
                    {relatedPost.description}
                  </p>
                  <div className="text-xs pt-2 border-t" style={{ color: '#9CA3AF', borderColor: 'var(--border-default)', fontFamily: 'var(--font-body)' }}>
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
