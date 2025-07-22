import { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await getPostBySlug(slug);
    
    return {
      title: `${post.frontmatter.title} | Hayden Cox Blog`,
      description: post.frontmatter.excerpt,
      keywords: [
        ...(post.frontmatter.tags || []),
        'blog',
        'hayden cox',
        'software development',
        'programming'
      ],
      authors: [{ name: post.frontmatter.author || 'Hayden Cox' }],
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        type: 'article',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
        publishedTime: post.frontmatter.date,
        authors: [post.frontmatter.author || 'Hayden Cox'],
        tags: post.frontmatter.tags,
        images: post.frontmatter.image ? [
          {
            url: post.frontmatter.image,
            alt: post.frontmatter.title,
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        images: post.frontmatter.image ? [post.frontmatter.image] : undefined,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found | Hayden Cox Blog',
      description: 'The requested blog post could not be found.',
    };
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
