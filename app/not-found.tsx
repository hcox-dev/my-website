'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Fallback quotes in case import fails
const fallbackQuotes = [
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "Talk is cheap. Show me the code. – Linus Torvalds",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
  "Code is like humor. When you have to explain it, it's bad. – Cory House"
];

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [quotes, setQuotes] = useState(fallbackQuotes);

  useEffect(() => {
    setMounted(true);
    
    // Dynamically import quotes
    import('@/lib/qoutes')
      .then((quotesModule) => {
        if (quotesModule.quotes && quotesModule.quotes.length > 0) {
          setQuotes(quotesModule.quotes);
        }
      })
      .catch((error) => {
        console.warn('Could not load quotes, using fallback quotes');
      });
  }, []);

  if (!mounted) {
    return null;
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="not-found-container">
      <section className="not-found-section fade-in" role="main" aria-labelledby="not-found-heading">
        <div className="not-found-content">
          <div className="error-code">
            <span className="four">4</span>
            <span className="zero">0</span>
            <span className="four">4</span>
          </div>
          
          <h1 id="not-found-heading" className="not-found-title">
            Page Not Found
          </h1>
          
          <p className="not-found-description">
            Oops! The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best developers encounter 404s!
          </p>
          
          <div className="not-found-suggestions">
            <h2>What you can do:</h2>
            <ul>
              <li>
                <i className="fas fa-home" aria-hidden="true"></i>
                <Link href="/" className="suggestion-link">
                  Go back to the homepage
                </Link>
              </li>
              <li>
                <i className="fas fa-search" aria-hidden="true"></i>
                <Link href="/search" className="suggestion-link">
                  Search my portfolio
                </Link>
              </li>
              <li>
                <i className="fas fa-code" aria-hidden="true"></i>
                <Link href="/#projects" className="suggestion-link">
                  Check out my projects
                </Link>
              </li>
              <li>
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <Link href="/#contact" className="suggestion-link">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="not-found-actions">
            <Link href="/" className="back-home-btn">
              <i className="fas fa-arrow-left" aria-hidden="true"></i>
              Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="go-back-btn"
              aria-label="Go back to previous page"
            >
              <i className="fas fa-undo" aria-hidden="true"></i>
              Go Back
            </button>
          </div>
          
          <div className="dev-joke">
            <p>
              <i className="fas fa-quote-left" aria-hidden="true"></i>
              {randomQuote}
              <i className="fas fa-quote-right" aria-hidden="true"></i>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
