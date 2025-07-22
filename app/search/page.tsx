'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { featuredProjects } from '@/data/projects';
import { BlogPostPreview } from '@/lib/blog/client-utils';

// Sample content that could be searched (you can expand this)
const searchableContent = [
  {
    type: 'about',
    title: 'About Hayden Cox',
    content: 'Software Developer & Open Source Enthusiast. Passionate software developer focused on building robust, scalable, and maintainable solutions. Backend development, DevOps, cloud infrastructure.',
    url: '/#about',
    keywords: ['software developer', 'open source', 'backend', 'devops', 'cloud', 'scalable', 'maintainable']
  },
  {
    type: 'skills',
    title: 'Programming Languages',
    content: 'Python, Go, JavaScript, Bash, Rust',
    url: '/#about',
    keywords: ['python', 'go', 'javascript', 'bash', 'rust', 'programming', 'languages']
  },
  {
    type: 'skills',
    title: 'Cloud & Tools',
    content: 'GCP, Git, CI/CD, Linux, Docker',
    url: '/#about',
    keywords: ['gcp', 'google cloud', 'git', 'ci/cd', 'linux', 'docker', 'cloud', 'tools']
  },
  {
    type: 'contact',
    title: 'Contact Information',
    content: 'Get in touch for opportunities, collaborations, or technology discussions. Email, GitHub, LinkedIn available.',
    url: '/#contact',
    keywords: ['contact', 'email', 'github', 'linkedin', 'opportunities', 'collaboration']
  },
  {
    type: 'resume',
    title: 'Resume - Hayden Cox',
    content: 'Professional resume showcasing experience in software development, open source contributions, and cybersecurity education.',
    url: '/resume',
    keywords: ['resume', 'cv', 'hayden cox', 'software developer', 'cybersecurity', 'education', 'professional experience']
  }
  // Projects will be added dynamically
];

interface SearchResult {
  type: string;
  title: string;
  content: string;
  url: string;
  keywords: string[];
  relevanceScore?: number;
}

// Loading component for Suspense fallback
function SearchLoading() {
  return (
    <section className="search-section fade-in" role="region" aria-labelledby="search-heading">
      <h1 id="search-heading">Search</h1>
      <p className="search-intro">
        Search through my portfolio, projects, skills, and experience to find what you're looking for.
      </p>
      <div className="search-loading" role="status" aria-live="polite">
        <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
        <span>Loading search...</span>
      </div>
    </section>
  );
}

// Main search component that uses useSearchParams
function SearchPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPostPreview[]>([]);
  const [isLoadingBlog, setIsLoadingBlog] = useState(true);

  // Load blog posts on mount
  useEffect(() => {
    async function fetchBlogData() {
      try {
        const response = await fetch('/api/v1/blog');
        const data = await response.json();
        
        if (data.success) {
          setBlogPosts(data.posts);
        } else {
          console.warn('Error loading blog posts for search:', data.error);
        }
      } catch (error) {
        console.warn('Error fetching blog posts for search:', error);
      } finally {
        setIsLoadingBlog(false);
      }
    }

    fetchBlogData();
  }, []);

  // Get query from URL parameters
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  // All searchable content including projects and blog posts
  const allContent = useMemo(() => {
    const projectContent = featuredProjects.map(project => ({
      type: 'project',
      title: project.title,
      content: project.description,
      url: `/#projects`,
      keywords: [
        project.title.toLowerCase(),
        ...project.description.toLowerCase().split(' '),
        'project', 'github', 'code', 'development'
      ]
    }));

    // Add blog posts to searchable content
    const blogContent: SearchResult[] = blogPosts.map((post: BlogPostPreview) => ({
      type: 'blog',
      title: post.frontmatter.title,
      content: post.frontmatter.excerpt,
      url: `/blog/${post.slug}`,
      keywords: [
        ...(post.frontmatter.tags || []).map((tag: string) => tag.toLowerCase()),
        post.frontmatter.title.toLowerCase(),
        ...post.frontmatter.excerpt.toLowerCase().split(' '),
        'blog', 'article', 'post', 'technical'
      ]
    }));
    
    return [...searchableContent, ...projectContent, ...blogContent];
  }, [blogPosts]);

  // Search function
  const performSearch = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(' ').filter(term => term.length > 1);

    const searchResults = allContent.map(item => {
      let relevanceScore = 0;

      // Check title match (highest weight)
      if (item.title.toLowerCase().includes(query)) {
        relevanceScore += 10;
      }

      // Check exact keyword matches
      searchTerms.forEach(term => {
        if (item.keywords.some(keyword => keyword.includes(term))) {
          relevanceScore += 5;
        }
        
        // Check content match
        if (item.content.toLowerCase().includes(term)) {
          relevanceScore += 3;
        }

        // Check title word match
        if (item.title.toLowerCase().includes(term)) {
          relevanceScore += 7;
        }
      });

      return { ...item, relevanceScore };
    }).filter(item => item.relevanceScore > 0)
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

    return searchResults;
  };

  // Handle search
  useEffect(() => {
    if (query) {
      setIsSearching(true);
      // Simulate search delay for better UX
      const searchTimeout = setTimeout(() => {
        const searchResults = performSearch(query);
        setResults(searchResults);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(searchTimeout);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query, allContent]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('q') as string;
    setQuery(searchQuery);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchQuery);
    window.history.pushState({}, '', url.toString());
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'project':
        return 'fas fa-code';
      case 'about':
        return 'fas fa-user';
      case 'skills':
        return 'fas fa-tools';
      case 'contact':
        return 'fas fa-envelope';
      default:
        return 'fas fa-file-alt';
    }
  };

  const highlightQuery = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return highlightedText;
  };

  return (
    <>
      <section className="search-section fade-in" role="region" aria-labelledby="search-heading">
        <h1 id="search-heading">Search</h1>
        <p className="search-intro">
          Search through my portfolio, projects, skills, and experience to find what you're looking for.
        </p>

        <form onSubmit={handleSearch} className="search-form" role="search">
          <div className="search-input-group">
            <input
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for projects, skills, technologies..."
              className="search-input"
              aria-label="Search query"
              autoComplete="off"
              autoFocus
            />
            <button type="submit" className="search-button" aria-label="Search">
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>

        {(isSearching || isLoadingBlog) && (
          <div className="search-loading" role="status" aria-live="polite">
            <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
            <span>{isLoadingBlog ? 'Loading...' : 'Searching...'}</span>
          </div>
        )}

        {query && !isSearching && !isLoadingBlog && (
          <div className="search-results" role="region" aria-labelledby="results-heading">
            <h2 id="results-heading" className="results-heading">
              {results.length > 0 
                ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                : `No results found for "${query}"`
              }
            </h2>

            {results.length > 0 && (
              <div className="results-list">
                {results.map((result, index) => (
                  <article key={index} className="search-result" itemScope itemType="https://schema.org/SearchResult">
                    <div className="result-header">
                      <i className={getResultIcon(result.type)} aria-hidden="true"></i>
                      <h3 className="result-title">
                        <a 
                          href={result.url} 
                          itemProp="url"
                          className="result-link"
                          dangerouslySetInnerHTML={{ 
                            __html: highlightQuery(result.title, query) 
                          }}
                        />
                      </h3>
                      <span className="result-type">{result.type}</span>
                    </div>
                    <p 
                      className="result-content" 
                      itemProp="description"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightQuery(result.content, query) 
                      }}
                    />
                    <div className="result-meta">
                      <span className="result-relevance">
                        Relevance: {result.relevanceScore}%
                      </span>
                      <a 
                        href={result.url} 
                        className="result-goto"
                        aria-label={`Go to ${result.title}`}
                      >
                        View <i className="fas fa-arrow-right" aria-hidden="true"></i>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {results.length === 0 && query && !isSearching && !isLoadingBlog && (
              <div className="no-results">
                <i className="fas fa-search" aria-hidden="true"></i>
                <h3>No results found</h3>
                <p>Try searching for:</p>
                <ul className="search-suggestions">
                  <li><a href="/search?q=python">Python</a></li>
                  <li><a href="/search?q=javascript">JavaScript</a></li>
                  <li><a href="/search?q=projects">Projects</a></li>
                  <li><a href="/search?q=cloud">Cloud</a></li>
                  <li><a href="/search?q=open source">Open Source</a></li>
                </ul>
              </div>
            )}
          </div>
        )}

        {!query && !isLoadingBlog && (
          <div className="search-help">
            <h3>Popular searches</h3>
            <div className="search-tags">
              <a href="/search?q=python" className="search-tag">Python</a>
              <a href="/search?q=javascript" className="search-tag">JavaScript</a>
              <a href="/search?q=go" className="search-tag">Go</a>
              <a href="/search?q=cloud" className="search-tag">Cloud</a>
              <a href="/search?q=docker" className="search-tag">Docker</a>
              <a href="/search?q=git" className="search-tag">Git</a>
              <a href="/search?q=projects" className="search-tag">Projects</a>
              <a href="/search?q=open source" className="search-tag">Open Source</a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

// Main export component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}
