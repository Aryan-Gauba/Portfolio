// src/App.jsx
import { useEffect } from 'react';
import API from './api';
import ContactForm from './components/ContactForm';
import './App.css'; // <-- Import the new clean stylesheets here

function App() {
  useEffect(() => {
    const logVisit = async () => {
      try {
        await API.post('/visit', { page_name: 'home' });
      } catch (err) {
        // Enforce that we only log strings, never render an object or throw it back up
        console.error('Analytics tracking failed silently:', err.message || 'Unknown network error');
      }
    };
    logVisit();
  }, []);

  const projects = [
    {
      title: 'PennyWise',
      description: 'Full-stack expense management application featuring real-time oversight, secure user session authentication and AI tips.',
      tags: ['PostgreSQL', 'Express', 'React', 'Node.js'],
      github: 'https://github.com/Aryan-Gauba/PennyWise',
      live: 'https://penny-wise-client.vercel.app/',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: 'UV Shield Tracker',
      description: 'A responsive web application that accurately calculates and delivers real-time UV radiation advice using OpenUV and Nominatim API data arrays.',
      tags: ['Node.js','Express', 'EJS', 'REST APIs'],
      github: 'https://github.com/Aryan-Gauba/UV-TRACKER',
      live: 'https://uv-tracker-coral.vercel.app/',
      image: 'https://images.unsplash.com/photo-1600786315236-8438a6c1e611?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: 'Keeper-App',
      description: 'Keeper is a secure, full-stack note-taking application built using the PERN stack (PostgreSQL, Express, React, Node.js). It features stateless JWT authentication, password hashing with Bcrypt, and a responsive UI deployed on Vercel with a serverless Neon PostgreSQL backend.',
      tags: ['PostgreSQL', 'Express', 'React', 'Node.js'],
      github: 'https://github.com/Aryan-Gauba/Frontend-Keeper-App',
      live: 'https://frontend-keeper-app.vercel.app/',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: '911 Calls Analysis',
      description: 'An analytical data science project processing emergency dispatch profiles out of Montgomery County via Python data pipelines.',
      tags: ['Python', 'Pandas', 'Kaggle', 'Data Analysis'],
      github: 'https://github.com/Aryan-Gauba/Data-Analytics-EDA',
      live: '#',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: 'Book-Notes',
      description: 'Review of different books I read. This project integrated postgreSQL as a database along with usage of OpenLibrary API. It uses Node, Express for the backend, Axios for hitting up API and EJS for templating.',
      tags: ['PostgreSQL', 'Express', 'EJS', 'Node.js'],
      github: 'https://github.com/Aryan-Gauba/Book-Notes',
      live: 'https://book-notes-five.vercel.app/',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9vay1ub3Rlc3xlbnwwfHwwfHx8MA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: 'The Blog',
      description: 'A simple blog application built with the Node Express EJS stack. It features a responsive UI and allows users to create, read, update, and delete blog posts.',
      tags: ['PostgreSQL', 'Express', 'EJS', 'Node.js'],
      github: 'https://github.com/Aryan-Gauba/The-blog',
      live: 'https://the-blog-lime.vercel.app/',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
  ];

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <header className="portfolio-header">
        <nav className="portfolio-nav">
          <div className="portfolio-logo">AG</div>
          <div className="portfolio-nav-links">
            <a href="#about" className="portfolio-link">About</a>
            <a href="#projects" className="portfolio-link">Projects</a>
            <a href="#contact" className="portfolio-link">Contact</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="portfolio-main-content">
        {/* About / Hero */}
        <section id="about" className="portfolio-section">
          <h1 className="portfolio-hero-title">Aryan Gauba</h1>
          <p className="portfolio-hero-subtitle">Full-Stack Web Developer (PERN) | AI & Machine Learning Enthusiast | ECE @ MSIT 27</p>
          <p className="portfolio-bio">
            I am an engineer focused on the intersection of Generative AI and Scalable Software. With a foundation in the PERN stack and 20+ deployed projects, I am now dedicated to building intelligent, agentic systems.
          </p>
        </section>

        <hr className="portfolio-divider" />

        {/* Projects Grid */}
        <section id="projects" className="portfolio-section">
          <h2 className="portfolio-section-title">Featured Projects</h2>
          <div className="portfolio-project-grid">
            {projects.map((project, idx) => (
              <div key={idx} className="portfolio-project-card">
                <div 
                  className="portfolio-project-image" 
                  style={{ backgroundImage: `url(${project.image})` }} 
                />
                <div className="portfolio-project-details">
                  <h3 className="portfolio-project-card-title">{project.title}</h3>
                  <p className="portfolio-project-text">{project.description}</p>
                  
                  <div className="portfolio-tag-wrapper">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="portfolio-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="portfolio-action-links">
                    <a href={project.github} target="_blank" rel="noreferrer" className="portfolio-btn-secondary">
                      GitHub
                    </a>
                    {project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="portfolio-btn-primary">
                        Live Site Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Container */}
      <footer id="contact" className="portfolio-footer">
        <div className="portfolio-footer-container">
          <div className="portfolio-footer-info">
            <h2 className="portfolio-footer-title">Let's Connect</h2>
            <p className="portfolio-footer-text">
              Have an exciting engineering role, or a complex full-stack codebase you want to collaborate on? Drop a direct message right here.
            </p>
            
            <div className="portfolio-contact-details-block">
              <h4 className="portfolio-detail-heading">Direct Channels</h4>
              
              <a href="mailto:aryan007gauba@gmail.com" className="portfolio-footer-contact-link">
                <span className="portfolio-icon-container">✉️</span> aryan007gauba@gmail.com
              </a>
              
              <a 
                href="https://www.linkedin.com/in/aryan-gauba/" 
                target="_blank" 
                rel="noreferrer" 
                className="portfolio-footer-contact-link"
              >
                <span className="portfolio-icon-container">💼</span> LinkedIn Profile
              </a>
              
              <a 
                href="https://github.com/Aryan-Gauba" 
                target="_blank" 
                rel="noreferrer" 
                className="portfolio-footer-contact-link"
              >
                <span className="portfolio-icon-container">💻</span> GitHub Repositories
              </a>
            </div>
          </div>

          <div className="portfolio-footer-form-wrapper">
            <ContactForm />
          </div>
        </div>
        <p className="portfolio-copyright">&copy; 2026 Aryan Gauba. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;