// src/App.jsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import API from './api';
import ContactForm from './components/ContactForm';
import './App.css'; 

// --- Animation Variants ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2 // Delays each child animation by 0.2s
    }
  }
};

function App() {
  useEffect(() => {
    const logVisit = async () => {
      try {
        await API.post('/visit', { page_name: 'home' });
      } catch (err) {
        console.error('Analytics tracking failed silently:', err.message || 'Unknown network error');
      }
    };
    logVisit();
  }, []);

  const projects = [
    {
      title: 'PennyWise',
      description: 'Full-stack expense management application featuring real-time oversight, secure user session authentication and AI tips.',
      tags: ['PostgreSQL', 'Express', 'React', 'Node.js', 'Jwt Authentication', 'Groq AI API', 'Chart.js'],
      github: 'https://github.com/Aryan-Gauba/PennyWise',
      live: 'https://penny-wise-client.vercel.app/',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: 'CorporateIQ',
      description: 'A high-throughput, AI-driven macroeconomic intelligence platform that ingests real-time policy, business, and regulatory updates, computes enterprise risk sentiment, and provides real-time semantic vector search across financial entities.',
      tags: ['PostgreSQL', 'Express', 'React', 'Node.js', 'Hugging Face', 'FastAPI','PyTorch'],
      github: 'https://github.com/Aryan-Gauba/CorporateIQ',
      live: 'https://biz-insider-horizon-scanning-hh7t.vercel.app/',
      image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: 'Enterprise CRM System',
      description: 'A full-stack, multi-tenant Customer Relationship Management (CRM) platform built to streamline lead management, customer interactions, team collaboration, and AI-driven business insights.',
      tags: ['PostgreSQL', 'Express', 'React', 'Node.js', 'Groq AI API', 'WebSockets', 'JWT Authentication'],
      github: 'https://github.com/Aryan-Gauba/CRM',
      live: 'https://crm-orpin-eight.vercel.app/',
      image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: 'Data Analytics Projects Monorepo',
      description: 'A comprehensive, end-to-end data analytics portfolio featuring projects in SQL, Python, Power BI, and Microsoft Excel. This monorepo demonstrates the complete data pipeline—from raw web scraping, data cleaning, and relational database querying, to complex statistical analysis and interactive executive dashboards.',
      tags: ['Python', 'Pandas', 'NumPy', 'Excel', 'SQL', 'PowerBI'],
      github: 'https://github.com/Aryan-Gauba/All-DA-Projects-SQL-Excel-PowerBI-Python-',
      live: '#',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: 'PageTrace',
      description: 'Review of different books I read. This project integrated postgreSQL as a database along with usage of OpenLibrary API. It uses Node, Express for the backend, Axios for hitting up API and EJS for templating.',
      tags: ['PostgreSQL', 'Express', 'EJS', 'Node.js', 'OpenLibrary API', 'JWT Authentication'],
      github: 'https://github.com/Aryan-Gauba/PageTrace',
      live: 'https://book-notes-five.vercel.app/',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9vay1ub3Rlc3xlbnwwfHwwfHx8MA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
    {
      title: 'DevLog',
      description: 'A simple blog application built with the Node Express EJS stack. It features a responsive UI and allows users to create, read, update, and delete blog posts.',
      tags: ['PostgreSQL', 'Express', 'EJS', 'Node.js', 'JWT Authentication'],
      github: 'https://github.com/Aryan-Gauba/DevLog',
      live: 'https://the-blog-lime.vercel.app/',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D?w=600&auto=format&fit=crop&q=60'
    },
  ];

  return (
    <div className="portfolio-container">
      {/* Navbar sliding down from top */}
      <motion.header 
        className="portfolio-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <nav className="portfolio-nav">
          <div className="portfolio-logo">AG</div>
          <div className="portfolio-nav-links">
            <a href="#about" className="portfolio-link">About</a>
            <a href="#projects" className="portfolio-link">Projects</a>
            <a href="#contact" className="portfolio-link">Contact</a>
          </div>
        </nav>
      </motion.header>

      <main className="portfolio-main-content">
        {/* Hero Section Fading Up */}
        <motion.section 
          id="about" 
          className="portfolio-section"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          <h1 className="portfolio-hero-title">Aryan Gauba</h1>
          <p className="portfolio-hero-subtitle">Full-Stack Web Developer (PERN) | AI & Machine Learning Enthusiast | ECE @ MSIT 27</p>
          <p className="portfolio-bio">
            I am an engineer focused on the intersection of Generative AI and Scalable Software. With a foundation in the PERN stack and 20+ deployed projects, I am now dedicated to building intelligent, agentic systems.
          </p>
        </motion.section>

        <hr className="portfolio-divider" />

        {/* Projects Grid with Staggered Scroll Animations */}
        <section id="projects" className="portfolio-section">
          <motion.h2 
            className="portfolio-section-title"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.div 
            className="portfolio-project-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }} // Triggers animation just before scrolling into view
          >
            {projects.map((project, idx) => (
              <motion.div 
                key={idx} 
                className="portfolio-project-card"
                variants={fadeUpVariant}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      {/* Footer fading in on scroll */}
      <motion.footer 
        id="contact" 
        className="portfolio-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
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
      </motion.footer>
    </div>
  );
}

export default App;