import { NextResponse } from 'next/server';

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
    summary: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    location: string;
    status: string;
    startDate?: string;
    expectedGraduation?: string;
  }>;
  skills: {
    programmingLanguages: string[];
    cloudPlatforms: string[];
    tools: string[];
    areas: string[];
  };
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    highlights: string[];
  }>;
  experience?: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  interests: string[];
}

const resumeData: ResumeData = {
  personalInfo: {
    name: "Hayden Cox",
    title: "Software Developer & Open Source Enthusiast",
    email: "hcox.dev@gmail.com",
    github: "https://github.com/hcox-dev",
    linkedin: "https://linkedin.com/in/hcox-dev",
    location: "Georgia, USA",
    summary: "Passionate software developer focused on building robust, scalable, and maintainable solutions. I love working with open source technologies, automating workflows, and contributing to the developer community. My interests include backend development, DevOps, and cloud infrastructure."
  },
  education: [
    {
      institution: "Coastal Pines Technical College",
      degree: "Associate Degree",
      field: "Cybersecurity",
      location: "Waycross, GA",
      status: "Waiting to be enrolled...",
      startDate: "2025",
      expectedGraduation: "2026"
    }
  ],
  skills: {
    programmingLanguages: ["Python", "Go", "JavaScript", "TypeScript", "Bash", "Rust"],
    cloudPlatforms: ["Google Cloud Platform (GCP)", "Docker"],
    tools: ["Git", "CI/CD", "Linux", "Docker"],
    areas: ["Backend Development", "DevOps", "Cloud Infrastructure", "Cybersecurity", "Open Source Development", "API Development", "Database Design", "System Administration"]
  },
  projects: [
    {
      title: "Terminal Note Taking App",
      description: "A feature-rich, keyboard-driven, markdown-compatible note-taking app that runs entirely in your terminal.",
      technologies: ["Python", "Curses", "Rich", "Markdown"],
      githubUrl: "https://github.com/hcox-dev/terminal-note-taking-app",
      highlights: [
        "Built with curses and rich for a clean and efficient terminal UI",
        "Supports markdown formatting and syntax highlighting",
        "Keyboard-driven interface for enhanced productivity",
        "Cross-platform compatibility"
      ]
    },
    {
      title: "Personal Portfolio Website",
      description: "Modern, responsive portfolio website built with Next.js showcasing projects and skills.",
      technologies: ["Next.js", "TypeScript", "React", "CSS3", "Vercel"],
      githubUrl: "https://github.com/hcox-dev/my-website",
      highlights: [
        "Server-side rendering with Next.js",
        "Responsive design with modern CSS",
        "Contact form integration",
        "SEO optimized with structured data",
        "Vim-style keyboard navigation"
      ]
    }
  ],
  interests: [
    "Full Stack Development",
    "Computer Hardware & Technology",
    "Open Source Contributions",
    "Cybersecurity Research",
    "Cloud Computing",
    "DevOps Automation",
    "Linux System Administration",
    "Terminal Applications",
    "Code Quality & Best Practices",
    "Continuous Learning",
    "Anime & Japanese Culture"
  ]
};

export async function GET() {
  try {
    return NextResponse.json(resumeData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching resume data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume data' },
      { status: 500 }
    );
  }
}

// Optional: Add POST method if you want to update resume data
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Resume data is read-only.' },
    { status: 405 }
  );
}
