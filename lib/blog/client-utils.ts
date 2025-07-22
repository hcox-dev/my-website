// Client-side utilities for blog functionality
export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    tags?: string[];
    author?: string;
    image?: string;
    published?: boolean;
  };
  content: string;
  readingTime: number;
}

export interface BlogPostPreview {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    tags?: string[];
    author?: string;
    image?: string;
    published?: boolean;
  };
  readingTime: number;
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
