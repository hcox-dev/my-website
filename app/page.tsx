'use client';

import { featuredProjects } from "@/data/projects";
import { useState } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus(`✅ ${result.message}`);
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus(`❌ ${result.error}`);
      }
    } catch (error) {
      setFormStatus('❌ Failed to send message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
        <section id="about" className="fade-in delay-1" role="region" aria-labelledby="about-heading">
            <h2 id="about-heading">About Hayden Cox</h2>
            <p>
                Hi, I'm <strong>Hayden Cox</strong>, a passionate software developer focused on building robust, scalable, and maintainable solutions.<br />
                I love working with open source technologies, automating workflows, and contributing to the developer community.<br />
                My interests include backend development, DevOps, and cloud infrastructure.
            </p>
            <ul className="about-list">
                <li><i className="fas fa-code" aria-hidden="true"></i> <strong>Languages:</strong> Python, Go, JavaScript, Bash, Rust</li>
                <li><i className="fas fa-cloud" aria-hidden="true"></i> <strong>Cloud:</strong> GCP</li>
                <li><i className="fas fa-tools" aria-hidden="true"></i> <strong>Tools:</strong> Git, CI/CD, Linux, Docker</li>
            </ul>
        </section>

        <section id="projects" className="fade-in delay-2" role="region" aria-labelledby="projects-heading">
            <h2 id="projects-heading">Featured Software Development Projects</h2>
            <div className="projects">
                {featuredProjects.map((project, index) => (
                    <article key={index} className="project" itemScope itemType="https://schema.org/SoftwareApplication">
                        <div className="project-title">
                            <i className="fas fa-terminal" aria-hidden="true"></i> 
                            <span itemProp="name">{project.title}</span>
                        </div>
                        <div className="project-desc" itemProp="description">{project.description}</div>
                        <div className="project-links">
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              title={`View ${project.title} source code on GitHub`}
                              aria-label={`View ${project.title} project on GitHub`}
                              itemProp="codeRepository"
                            >
                              <i className="fab fa-github" aria-hidden="true"></i> View Code
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>

         <section className="contact-section fade-in delay-1" role="region" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Get In Touch</h2>
            <p className="contact-intro">I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.</p>
            
            <div className="contact-grid">
                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <div className="contact-item">
                        <i className="fas fa-envelope" aria-hidden="true"></i>
                        <div>
                            <h4>Email</h4>
                            <a href="mailto:hcox.dev@gmail.com" aria-label="Send email to Hayden Cox">hcox.dev@gmail.com</a>
                        </div>
                    </div>
                    <div className="contact-item">
                        <i className="fab fa-github" aria-hidden="true"></i>
                        <div>
                            <h4>GitHub</h4>
                            <a href="https://github.com/hcox-dev" target="_blank" rel="noopener noreferrer" aria-label="Visit Hayden Cox's GitHub profile">github.com/hcox-dev</a>
                        </div>
                    </div>
                    <div className="contact-item">
                        <i className="fab fa-linkedin" aria-hidden="true"></i>
                        <div>
                            <h4>LinkedIn</h4>
                            <a href="https://linkedin.com/in/hcox-dev" target="_blank" rel="noopener noreferrer" aria-label="Connect with Hayden Cox on LinkedIn">linkedin.com/in/hcox-dev</a>
                        </div>
                    </div>
                    
                    <div className="response-time">
                        <i className="fas fa-clock" aria-hidden="true"></i>
                        <span>Usually responds within 24 hours</span>
                    </div>
                </div>
                
                <div className="contact-form">
                    <h3>Send a Message</h3>
                    <form id="contactForm" onSubmit={handleSubmit} noValidate>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input 
                                  type="text" 
                                  id="name" 
                                  name="name" 
                                  required 
                                  aria-required="true"
                                  autoComplete="name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input 
                                  type="email" 
                                  id="email" 
                                  name="email" 
                                  required 
                                  aria-required="true"
                                  autoComplete="email"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input 
                              type="text" 
                              id="subject" 
                              name="subject" 
                              required 
                              aria-required="true"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea 
                              id="message" 
                              name="message" 
                              rows={6} 
                              required 
                              aria-required="true"
                              placeholder="Tell me about your project, idea, or just say hello..."
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn" disabled={isSubmitting} aria-describedby="formStatus">
                            <i className="fas fa-paper-plane" aria-hidden="true"></i>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                    {formStatus && (
                        <div className={`form-status ${formStatus.includes('✅') ? 'success' : 'error'}`} id="formStatus" role="status" aria-live="polite">
                            {formStatus}
                        </div>
                    )}
                </div>
            </div>
        </section>
      </>
  );
}
