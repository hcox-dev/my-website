import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

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

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Ensure the blog directory exists
function ensureBlogDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  ensureBlogDirectory();
  
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.warn('Error reading blog directory:', error);
    return [];
  }
}

// Get all blog posts (previews)
export function getAllPosts(): BlogPostPreview[] {
  ensureBlogDirectory();
  
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => {
      try {
        const postPreview = getPostPreview(slug);
        return postPreview;
      } catch (error) {
        console.warn(`Error loading post preview for ${slug}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPostPreview => post !== null)
    .filter(post => post.frontmatter.published !== false) // Only show published posts
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

// Get post preview (without full content)
export function getPostPreview(slug: string): BlogPostPreview {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    frontmatter: {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      author: data.author || 'Hayden Cox',
      image: data.image,
      published: data.published !== false,
    },
    readingTime: calculateReadingTime(content),
  };
}

// Get full blog post with rendered content
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  
  const contentHtml = processedContent.toString();
  
  return {
    slug,
    frontmatter: {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      author: data.author || 'Hayden Cox',
      image: data.image,
      published: data.published !== false,
    },
    content: contentHtml,
    readingTime: calculateReadingTime(content),
  };
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPostPreview[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.frontmatter.tags?.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

// Get all unique tags
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    post.frontmatter.tags?.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
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
