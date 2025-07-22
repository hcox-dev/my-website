'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPostPreview, formatDate } from '@/lib/blog/client-utils';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostPreview[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostPreview[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const response = await fetch('/api/v1/blog');
        const data = await response.json();
        
        if (data.success) {
          setPosts(data.posts);
          setFilteredPosts(data.posts);
          setTags(data.tags);
        } else {
          console.error('Error loading blog posts:', data.error);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogData();
  }, []);

  // Filter posts based on search and tag
  useEffect(() => {
    let filtered = posts;

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.frontmatter.tags?.some(tag =>
          tag.toLowerCase() === selectedTag.toLowerCase()
        )
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.frontmatter.title.toLowerCase().includes(query) ||
        post.frontmatter.excerpt.toLowerCase().includes(query) ||
        post.frontmatter.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedTag, searchQuery]);

  const clearFilters = () => {
    setSelectedTag('');
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      <section className="blog-section fade-in" role="region" aria-labelledby="blog-heading">
        <div className="blog-loading" role="status" aria-live="polite">
          <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
          <span>Loading blog posts...</span>
        </div>
      </section>
    );
  }

  return (
    <>
      <br />
    <section className="blog-section fade-in" role="region" aria-labelledby="blog-heading">
      <div className="blog-header">
        <h1 id="blog-heading">Blog</h1>
        <p className="blog-intro">
          Thoughts on software development, programming best practices, and technology insights.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="blog-controls">
        <div className="blog-search">
          <div className="search-input-group">
            <i className="fas fa-search" aria-hidden="true"></i>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search blog posts"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="clear-search"
                aria-label="Clear search"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            )}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="blog-tags">
            <span className="tags-label">Filter by tag:</span>
            <div className="tag-list">
              <button
                onClick={() => setSelectedTag('')}
                className={`tag-button ${selectedTag === '' ? 'active' : ''}`}
                aria-pressed={selectedTag === ''}
              >
                All
              </button>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                  className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                  aria-pressed={selectedTag === tag}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {(selectedTag || searchQuery) && (
          <div className="active-filters">
            <span className="filters-label">Active filters:</span>
            {selectedTag && (
              <span className="filter-badge">
                Tag: {selectedTag}
                <button
                  onClick={() => setSelectedTag('')}
                  aria-label={`Remove ${selectedTag} tag filter`}
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="filter-badge">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Remove search filter"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </span>
            )}
            <button onClick={clearFilters} className="clear-all-filters">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Blog Posts */}
      <div className="blog-posts">
        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <i className="fas fa-search" aria-hidden="true"></i>
            <h3>No posts found</h3>
            <p>
              {searchQuery || selectedTag
                ? "Try adjusting your search criteria or filters."
                : "No blog posts are available at the moment."}
            </p>
            {(searchQuery || selectedTag) && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="posts-grid">
            {filteredPosts.map((post, index) => (
              <article 
                key={post.slug} 
                className={`blog-post-card fade-in delay-${Math.min(index + 1, 4)}`}
                role="article"
              >
                <div className="post-header">
                  <div className="post-meta">
                    <time dateTime={post.frontmatter.date} className="post-date">
                      {formatDate(post.frontmatter.date)}
                    </time>
                    <span className="reading-time">
                      <i className="fas fa-clock" aria-hidden="true"></i>
                      {post.readingTime} min read
                    </span>
                  </div>
                  {post.frontmatter.author && (
                    <div className="post-author">
                      <i className="fas fa-user" aria-hidden="true"></i>
                      {post.frontmatter.author}
                    </div>
                  )}
                </div>

                <div className="post-content">
                  <h2 className="post-title">
                    <Link href={`/blog/${post.slug}`} className="post-link">
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  
                  <p className="post-excerpt">{post.frontmatter.excerpt}</p>

                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="post-tags">
                      {post.frontmatter.tags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="post-tag"
                          aria-label={`Filter by ${tag} tag`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="post-footer">
                  <Link href={`/blog/${post.slug}`} className="read-more">
                    Read more
                    <i className="fas fa-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Blog Stats */}
      {posts.length > 0 && (
        <div className="blog-stats">
          <p>
            Showing {filteredPosts.length} of {posts.length} posts
            {selectedTag && ` tagged with "${selectedTag}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      )}
    </section>
    </>
  );
}
