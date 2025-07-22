import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume - Hayden Cox | Software Developer & Cybersecurity Student',
  description: 'Professional resume of Hayden Cox - Software Developer, Open Source Enthusiast, and Cybersecurity student at Coastal Pines Technical College.',
  keywords: [
    'resume', 
    'cv', 
    'software developer', 
    'cybersecurity', 
    'python', 
    'go', 
    'javascript',
    'devops',
    'cloud',
    'hayden cox',
    'portfolio'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Resume - Hayden Cox | Software Developer & Cybersecurity Student',
    description: 'Professional resume showcasing experience in software development, open source contributions, and cybersecurity education.',
    type: 'profile',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/resume`,
  },
  twitter: {
    card: 'summary',
    title: 'Resume - Hayden Cox',
    description: 'Software Developer & Cybersecurity Student - Professional resume and experience.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/resume`,
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured data for resume/person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Hayden Cox",
            "jobTitle": "Software Developer",
            "description": "Software Developer & Open Source Enthusiast studying Cybersecurity",
            "url": process.env.NEXT_PUBLIC_SITE_URL,
            "image": "https://avatars.githubusercontent.com/u/219914551?v=4",
            "sameAs": [
              "https://github.com/hcox-dev",
              "https://linkedin.com/in/hcox-dev"
            ],
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "Coastal Pines Technical College",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Waycross",
                "addressRegion": "GA"
              }
            },
            "knowsAbout": [
              "Software Development",
              "Cybersecurity",
              "Python",
              "Go",
              "JavaScript",
              "Cloud Computing",
              "DevOps"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "hcox.dev@gmail.com",
              "contactType": "professional"
            }
          })
        }}
      />
      {children}
    </>
  );
}
