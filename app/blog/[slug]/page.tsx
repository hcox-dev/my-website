'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BlogPost, formatDate } from '@/lib/blog/client-utils';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/v1/blog/${slug}`);
        const data = await response.json();
        
        if (data.success) {
          setPost(data.post);
        } else {
          setError(data.error || 'Failed to load blog post');
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const handleShare = async (platform: string) => {
    if (!post) return;

    const url = window.location.href;
    const title = post.frontmatter.title;
    const text = post.frontmatter.excerpt;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          // You could add a toast notification here
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
        break;
    }
  };

  if (isLoading) {
    return (
      <section className="blog-post-section fade-in" role="region" aria-labelledby="post-heading">
        <div className="blog-post-loading" role="status" aria-live="polite">
          <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
          <span>Loading blog post...</span>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="blog-post-section fade-in" role="region" aria-labelledby="post-heading">
        <div className="blog-post-error">
          <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
          <h1>Post Not Found</h1>
          <p>{error || 'The requested blog post could not be found.'}</p>
          <Link href="/blog" className="back-to-blog">
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Structured data for blog post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.frontmatter.title,
            "description": post.frontmatter.excerpt,
            "image": post.frontmatter.image,
            "author": {
              "@type": "Person",
              "name": post.frontmatter.author || "Hayden Cox",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
            },
            "publisher": {
              "@type": "Person",
              "name": "Hayden Cox",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
            },
            "datePublished": post.frontmatter.date,
            "dateModified": post.frontmatter.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
            },
            "keywords": post.frontmatter.tags?.join(", "),
            "wordCount": post.content.split(' ').length,
            "timeRequired": `PT${post.readingTime}M`,
          })
        }}
      />

      <article className="blog-post-section fade-in" role="article">
        {/* Navigation */}
        <nav className="blog-post-nav" role="navigation" aria-label="Blog navigation">
          <Link href="/blog" className="back-to-blog">
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            Back to Blog
          </Link>
        </nav>

        {/* Post Header */}
        <header className="blog-post-header">
          <div className="post-meta">
            <time dateTime={post.frontmatter.date} className="post-date">
              {formatDate(post.frontmatter.date)}
            </time>
            <span className="reading-time">
              <i className="fas fa-clock" aria-hidden="true"></i>
              {post.readingTime} min read
            </span>
            {post.frontmatter.author && (
              <span className="post-author">
                <i className="fas fa-user" aria-hidden="true"></i>
                {post.frontmatter.author}
              </span>
            )}
          </div>

          <h1 id="post-heading" className="blog-post-title">
            {post.frontmatter.title}
          </h1>

          <p className="blog-post-excerpt">{post.frontmatter.excerpt}</p>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="blog-post-tags">
              {post.frontmatter.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="blog-post-tag"
                  aria-label={`View posts tagged with ${tag}`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="blog-post-content">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="prose"
          />
        </div>

        {/* Post Footer */}
        <footer className="blog-post-footer">
          <div className="post-share">
            <h3>Share this post</h3>
            <div className="share-buttons">
              <button
                onClick={() => handleShare('twitter')}
                className="share-button twitter"
                aria-label="Share on Twitter"
              >
                <i className="fab fa-twitter" aria-hidden="true"></i>
                Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="share-button linkedin"
                aria-label="Share on LinkedIn"
              >
                <i className="fab fa-linkedin" aria-hidden="true"></i>
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="share-button copy"
                aria-label="Copy link"
              >
                <i className="fas fa-link" aria-hidden="true"></i>
                Copy Link
              </button>
            </div>
          </div>

          <div className="post-actions">
            <Link href="/blog" className="back-to-blog-footer">
              <i className="fas fa-arrow-left" aria-hidden="true"></i>
              All Posts
            </Link>
            <a
              href={`https://github.com/hcox-dev/my-website/edit/master/content/blog/${slug}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="edit-post"
            >
              <i className="fas fa-edit" aria-hidden="true"></i>
              Edit on GitHub
            </a>
          </div>
        </footer>
      </article>
    </>
  );
}
