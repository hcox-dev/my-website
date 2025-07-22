import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog/utils';

export async function GET() {
  try {
    const posts = getAllPosts();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hcox.dev';
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hayden Cox Blog</title>
    <description>Technical blog covering software development, programming best practices, and technology insights.</description>
    <link>${siteUrl}/blog</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <webMaster>hcox.dev@gmail.com (Hayden Cox)</webMaster>
    <managingEditor>hcox.dev@gmail.com (Hayden Cox)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} Hayden Cox</copyright>
    <image>
      <url>${siteUrl}/favicon.ico</url>
      <title>Hayden Cox Blog</title>
      <link>${siteUrl}/blog</link>
    </image>
${posts.map(post => `    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <description><![CDATA[${post.frontmatter.excerpt}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <author>hcox.dev@gmail.com (${post.frontmatter.author || 'Hayden Cox'})</author>
      <category><![CDATA[Software Development]]></category>
${post.frontmatter.tags?.map(tag => `      <category><![CDATA[${tag}]]></category>`).join('\n') || ''}
    </item>`).join('\n')}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
