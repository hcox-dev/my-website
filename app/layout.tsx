import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VimKeybindings from "../components/keybindings";
import { VimAlert } from "../components/VimAlert";
import { getEnvVariable } from "@/lib/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hayden Cox - Software Developer & Open Source Enthusiast",
    template: "%s | Hayden Cox"
  },
  description: "Experienced software developer specializing in full-stack web development, open source contributions, and modern JavaScript frameworks. Based in [Your Location], available for freelance and full-time opportunities.",
  keywords: [
    "software developer",
    "web developer",
    "full-stack developer",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "open source",
    "freelance developer",
    "frontend developer",
    "backend developer",
    "portfolio",
    "Hayden Cox"
  ],
  authors: [{ name: "Hayden Cox", url: "https://github.com/hcox-dev" }],
  creator: "Hayden Cox",
  publisher: "Hayden Cox",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getEnvVariable('NEXT_PUBLIC_SITE_URL'),
    siteName: "Hayden Cox - Software Developer",
    title: "Hayden Cox - Software Developer & Open Source Enthusiast",
    description: "Experienced software developer specializing in full-stack web development, open source contributions, and modern JavaScript frameworks.",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/219914551?v=4",
        width: 1200,
        height: 630,
        alt: "Hayden Cox - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hcox.dev", // Replace with your Twitter handle
    creator: "@hcox.dev", // Replace with your Twitter handle
    title: "Hayden Cox - Software Developer & Open Source Enthusiast",
    description: "Experienced software developer specializing in full-stack web development, open source contributions, and modern JavaScript frameworks.",
    images: ["https://avatars.githubusercontent.com/u/219914551?v=4"],
  },
  alternates: {
    canonical: getEnvVariable('NEXT_PUBLIC_SITE_URL'), // Replace with your actual domain
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        
        {/* Optimized font loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;700&family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Font Awesome with integrity check */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
        {/* Favicon and app icons */}
        <link
          rel="icon"
          href="https://avatars.githubusercontent.com/u/219914551?v=4"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="https://avatars.githubusercontent.com/u/219914551?v=4"
        />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0070f3" />
        <meta name="msapplication-TileColor" content="#0070f3" />
        
        {/* Structured Data - Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Hayden Cox",
              "jobTitle": "Software Developer",
              "description": "Software Developer & Open Source Enthusiast",
              "url": getEnvVariable('NEXT_PUBLIC_SITE_URL'), // Replace with your actual domain
              "image": "https://avatars.githubusercontent.com/u/219914551?v=4",
              "sameAs": [
                "https://github.com/hcox-dev",
                "https://linkedin.com/in/hcox-dev"
              ],
              "knowsAbout": [
                "Software Development",
                "Web Development",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Open Source"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hcox.dev@gmail.com",
                "contactType": "professional"
              }
            })
          }}
        />
        
        {/* Structured Data - Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Hayden Cox - Software Developer",
              "url": getEnvVariable('NEXT_PUBLIC_SITE_URL'), // Replace with your actual domain
              "description": "Professional portfolio and blog of Hayden Cox, software developer and open source enthusiast",
              "author": {
                "@type": "Person",
                "name": "Hayden Cox"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${getEnvVariable('NEXT_PUBLIC_SITE_URL')}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <VimKeybindings config={{ scrollAmount: 150, debug: true }} />
        
        
        <div className="hero">
          <img 
            src="https://avatars.githubusercontent.com/u/219914551?v=4" 
            alt="Hayden Cox - Professional software developer and open source enthusiast" 
            className="avatar fade-in"
            width="150"
            height="150"
            loading="eager"
          />
          <h1 className="fade-in delay-1">Hayden Cox</h1>
          <p className="fade-in delay-2">Software Developer &amp; Open Source Enthusiast</p>
          <div className="social-links fade-in delay-3">
            <a 
              href="https://github.com/hcox-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              title="View Hayden Cox's GitHub profile and open source projects"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github" aria-hidden="true"></i>
            </a>
            <a 
              href="https://linkedin.com/in/hcox-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Connect with Hayden Cox on LinkedIn"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a 
              href="mailto:hcox.dev@gmail.com" 
              title="Send an email to Hayden Cox"
              aria-label="Email Contact"
            >
              <i className="fas fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
          <nav role="navigation" aria-label="Main navigation">
            <a href="/#about" aria-label="About Hayden Cox section">About</a>
            <a href="/#projects" aria-label="Software development projects">Projects</a>
            <a href="/search" aria-label="Search portfolio content">Search</a>
          </nav>
        </div>
        <VimAlert />
        <main className="container" role="main">
        {children}
        </main>

        <footer
          role="contentinfo"
          style={{
            marginTop: "3rem",
            padding: "1.5rem 0",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "1rem",
            borderTop: "1px solid var(--border)",
            background: "var(--bg-alt)",
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ marginRight: 8 }}>
            &copy; {new Date().getFullYear()} Hayden Cox
          </span>
          &mdash;
          <a
            href="https://github.com/hcox-dev"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Hayden Cox on GitHub for latest projects"
            aria-label="Hayden Cox GitHub Profile"
            style={{
              color: "var(--primary)",
              textDecoration: "none",
              marginLeft: 8,
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            <i className="fab fa-github" style={{ marginRight: 4 }} aria-hidden="true" />
            GitHub
          </a>
        </footer>
      </body>
    </html>
  );
}
