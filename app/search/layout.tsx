import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search - Find Projects, Skills, and Experience',
  description: 'Search through Hayden Cox\'s portfolio, projects, skills, and professional experience. Find information about software development, programming languages, and technologies.',
  keywords: [
    'search', 
    'portfolio', 
    'projects', 
    'skills', 
    'software developer', 
    'programming', 
    'technologies',
    'hayden cox',
    'search functionality'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Search - Hayden Cox Portfolio',
    description: 'Search through my portfolio to find projects, skills, and experience in software development.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/search`,
  },
  twitter: {
    card: 'summary',
    title: 'Search - Hayden Cox Portfolio',
    description: 'Search through my portfolio to find projects, skills, and experience in software development.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/search`,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Add structured data for search functionality */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
            "object": {
              "@type": "WebSite",
              "name": "Hayden Cox - Software Developer Portfolio",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
            }
          })
        }}
      />
      {children}
    </>
  );
}
