import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Hayden Cox | Software Development & Technology Insights',
  description: 'Technical blog covering software development, programming best practices, open source contributions, and technology insights by Hayden Cox.',
  keywords: [
    'blog',
    'software development',
    'programming',
    'technical writing',
    'next.js',
    'python',
    'open source',
    'web development',
    'coding tutorials',
    'tech insights',
    'hayden cox'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Blog - Hayden Cox | Software Development Insights',
    description: 'Technical blog covering software development, programming best practices, and technology insights.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Hayden Cox',
    description: 'Technical blog covering software development and programming insights.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    types: {
      'application/rss+xml': [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/rss.xml`,
          title: 'Hayden Cox Blog RSS Feed',
        },
      ],
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured data for blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Hayden Cox Blog",
            "description": "Technical blog covering software development, programming best practices, and technology insights.",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
            "author": {
              "@type": "Person",
              "name": "Hayden Cox",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
            },
            "inLanguage": "en-US",
          })
        }}
      />
      {children}
    </>
  );
}
