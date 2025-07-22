'use client';

import { useState, useEffect } from 'react';

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

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/api/v1/resume');
        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }
        const data = await response.json();
        setResumeData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    if (!resumeData) return;
    
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hayden-cox-resume.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <section className="resume-section fade-in" role="region" aria-labelledby="resume-heading">
        <div className="resume-loading" role="status" aria-live="polite">
          <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
          <span>Loading resume...</span>
        </div>
      </section>
    );
  }

  if (error || !resumeData) {
    return (
      <section className="resume-section fade-in" role="region" aria-labelledby="resume-heading">
        <div className="resume-error">
          <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
          <h2>Error Loading Resume</h2>
          <p>{error || 'Failed to load resume data'}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="resume-section fade-in" role="region" aria-labelledby="resume-heading">
        <div className="resume-header">
          <h1 id="resume-heading">Resume</h1>
          <div className="resume-actions">
            <button onClick={handlePrint} className="action-btn print-btn" aria-label="Print resume">
              <i className="fas fa-print" aria-hidden="true"></i>
              Print
            </button>
            <button onClick={handleDownloadJSON} className="action-btn download-btn" aria-label="Download resume as JSON">
              <i className="fas fa-download" aria-hidden="true"></i>
              Download JSON
            </button>
          </div>
        </div>

        <div className="resume-content">
          {/* Personal Information */}
          <div className="resume-section-block">
            <div className="personal-info">
              <h2>{resumeData.personalInfo.name}</h2>
              <h3>{resumeData.personalInfo.title}</h3>
              <div className="contact-details">
                <span><i className="fas fa-envelope"></i> {resumeData.personalInfo.email}</span>
                <span><i className="fas fa-map-marker-alt"></i> {resumeData.personalInfo.location}</span>
                <span><i className="fab fa-github"></i> <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>
                <span><i className="fab fa-linkedin"></i> <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
              </div>
              <p className="summary">{resumeData.personalInfo.summary}</p>
            </div>
          </div>

          {/* Education */}
          <div className="resume-section-block">
            <h2 className="section-title"><i className="fas fa-graduation-cap"></i> Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <h3>{edu.degree} in {edu.field}</h3>
                  <span className="education-dates">
                    {edu.startDate} - {edu.expectedGraduation || 'Present'}
                  </span>
                </div>
                <div className="education-details">
                  <h4>{edu.institution}</h4>
                  <p><i className="fas fa-map-marker-alt"></i> {edu.location}</p>
                  <p className="education-status"><strong>Status:</strong> {edu.status}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="resume-section-block">
            <h2 className="section-title"><i className="fas fa-cogs"></i> Technical Skills</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Programming Languages</h3>
                <div className="skill-tags">
                  {resumeData.skills.programmingLanguages.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3>Cloud & Platforms</h3>
                <div className="skill-tags">
                  {resumeData.skills.cloudPlatforms.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3>Tools & Technologies</h3>
                <div className="skill-tags">
                  {resumeData.skills.tools.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3>Areas of Expertise</h3>
                <div className="skill-tags">
                  {resumeData.skills.areas.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="resume-section-block">
            <h2 className="section-title"><i className="fas fa-code"></i> Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-header">
                  <h3>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  <strong>Technologies:</strong>
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <ul className="project-highlights">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Experience (if available) */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="resume-section-block">
              <h2 className="section-title"><i className="fas fa-briefcase"></i> Experience</h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h3>{exp.title}</h3>
                    <span className="experience-dates">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <h4>{exp.company} • {exp.location}</h4>
                  <ul className="experience-description">
                    {exp.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Interests */}
          <div className="resume-section-block">
            <h2 className="section-title"><i className="fas fa-heart"></i> Interests</h2>
            <div className="interests-list">
              {resumeData.interests.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
