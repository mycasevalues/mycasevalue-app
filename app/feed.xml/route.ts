import { getAllPosts } from '../../lib/blog';

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = 'https://mycasevalues.com';

  // Escape XML special characters
  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  // Build RSS feed
  const rssItems = posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${post.publishedAt.toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <content:encoded><![CDATA[
        <p>${escapeXml(post.description)}</p>
        <p>${escapeXml(post.content.split('\n\n')[0])}</p>
        <p><a href="${postUrl}">Read full article</a></p>
      ]]></content:encoded>
      <author>info@mycasevalues.com (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>
      `;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MyCaseValue Blog - Federal Court Data &amp; Litigation Insights</title>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Research-backed articles analyzing real outcomes from 5.1M+ federal cases. Understand win rates, settlement data, timelines, and what affects your case.</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} MyCaseValue LLC. All rights reserved.</copyright>
    <managingEditor>info@mycasevalues.com (MyCaseValue Research Team)</managingEditor>
    <webMaster>info@mycasevalues.com (MyCaseValue Technical Team)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>3600</ttl>
    <image>
      <url>${baseUrl}/logo.svg</url>
      <title>MyCaseValue</title>
      <link>${baseUrl}</link>
    </image>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
