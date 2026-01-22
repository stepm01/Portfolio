import React, { useState, useEffect, useRef } from 'react';

const CV_PATH = '/Stepan Muradkhanyan.pdf';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const revealRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Custom Cursor */}
      <div 
        className={`cursor ${isHovering ? 'hover' : ''}`} 
        style={{ left: cursorPos.x, top: cursorPos.y }} 
      />
      <div 
        className="cursor-dot" 
        style={{ left: cursorPos.x, top: cursorPos.y }} 
      />

      {/* Animated Background */}
      <div className="bg-animation">
        <div className="bg-gradient" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-pattern" />
      </div>

      {/* Navigation */}
      <nav>
        <div className="logo">stepan<span>.</span></div>
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {['experience', 'projects', 'skills', 'education', 'contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button 
          className="nav-cta" 
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          View CV
        </button>
        <button 
          className="mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-tag">Available for opportunities</div>
          <h1>
            <span className="line">Building the</span>
            <span className="line"><span className="gradient-text">future</span> with code</span>
          </h1>
          <p className="hero-description">
            I'm Stepan Muradkhanyan, a Computer Science student at UC Santa Cruz 
            passionate about creating impactful software solutions. From AI-driven 
            platforms to real-time translation systems, I turn complex problems into elegant code.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary" 
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              View CV
            </button>
            <a 
              href="#projects" 
              className="btn-secondary"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              View Projects
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <div className="section-header reveal" ref={addToRefs}>
          <span className="section-tag">Career</span>
          <h2 className="section-title">Work Experience</h2>
        </div>
        <div className="experience-grid">
          <div 
            className="experience-card reveal" 
            ref={addToRefs}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="exp-header">
              <div>
                <h3 className="exp-role">Software Project Manager</h3>
                <p className="exp-company">Pioneers in Engineering @ UC Berkeley</p>
              </div>
              <span className="exp-date">Dec 2024 – Jul 2025</span>
            </div>
            <ul className="exp-description">
              <li>Led a cross-functional team of 15 engineers and designers to develop a live tournament website for high-school robotics competitions</li>
              <li>Defined product requirements and coordinated frontend (React) and backend (API integration) workflows</li>
              <li>Managed recruiting, onboarding, and task assignments throughout a 7-month project timeline</li>
            </ul>
          </div>
          <div 
            className="experience-card reveal" 
            ref={addToRefs}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="exp-header">
              <div>
                <h3 className="exp-role">Software Engineer Intern</h3>
                <p className="exp-company">Mamble Labs · Yerevan, Armenia</p>
              </div>
              <span className="exp-date">Jul – Dec 2022</span>
            </div>
            <ul className="exp-description">
              <li>Developed and launched 3 production web apps with React and Next.js, improving load speed by 25%</li>
              <li>Enhanced UI consistency using Tailwind CSS, Bootstrap, and Git, reducing support tickets by 30%</li>
              <li>Refactored legacy API modules to eliminate data-fetching bottlenecks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="section-header reveal" ref={addToRefs}>
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>
        <div className="projects-grid">
          <div 
            className="project-card reveal" 
            ref={addToRefs}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="project-visual">
              <span className="project-icon">🎓</span>
            </div>
            <div className="project-content">
              <h3 className="project-title">Transfer Map</h3>
              <p className="project-desc">
                AI-driven platform streamlining the UC transfer process for community college students. 
                Achieved 93% accuracy in identifying missing coursework.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">AI/ML</span>
                <span className="tech-tag">API Integration</span>
              </div>
              <a href="https://github.com/stepm01" target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
          <div 
            className="project-card reveal" 
            ref={addToRefs}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="project-visual">
              <span className="project-icon">🗣️</span>
            </div>
            <div className="project-content">
              <h3 className="project-title">Armenian Whisper Translator</h3>
              <p className="project-desc">
                Real-time Armenian-to-English translation using OpenAI Whisper. 
                Reduced Word Error Rate by 15% with latency under 1.5 seconds.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Streamlit</span>
                <span className="tech-tag">OpenAI Whisper</span>
              </div>
              <a href="https://github.com/stepm01" target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="section-header reveal" ref={addToRefs}>
          <span className="section-tag">Expertise</span>
          <h2 className="section-title">Technical Skills</h2>
        </div>
        <div className="skills-container">
          <div className="skill-category reveal" ref={addToRefs}>
            <h3>Languages</h3>
            <div className="skill-list">
              {['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS', 'Java', 'C/C++'].map((skill) => (
                <span 
                  key={skill} 
                  className="skill-item"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="skill-category reveal" ref={addToRefs}>
            <h3>Frameworks & Libraries</h3>
            <div className="skill-list">
              {['React.js', 'Next.js', 'Node.js', 'PyTorch', 'Pandas', 'Tailwind', 'FastAPI'].map((skill) => (
                <span 
                  key={skill} 
                  className="skill-item"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="skill-category reveal" ref={addToRefs}>
            <h3>Tools & Platforms</h3>
            <div className="skill-list">
              {['Git', 'GitHub', 'Docker', 'GitLab', 'Atlassian'].map((skill) => (
                <span 
                  key={skill} 
                  className="skill-item"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
        <div className="section-header reveal" ref={addToRefs}>
          <span className="section-tag">Background</span>
          <h2 className="section-title">Education</h2>
        </div>
        <div className="education-grid">
          <div 
            className="education-card reveal" 
            ref={addToRefs}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h3 className="edu-degree">B.S. Computer Science</h3>
            <p className="edu-school">University of California, Santa Cruz</p>
            <div className="edu-details">
              <span className="edu-detail"><strong>GPA:</strong> 4.0</span>
              <span className="edu-detail"><strong>Period:</strong> Sep 2025 – May 2027</span>
            </div>
            <p className="edu-courses"><strong>Coursework:</strong> Data Structures & Algorithms, Machine Learning, C Programming</p>
          </div>
          <div 
            className="education-card reveal" 
            ref={addToRefs}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h3 className="edu-degree">A.S. Computer Science</h3>
            <p className="edu-school">City College of San Francisco</p>
            <div className="edu-details">
              <span className="edu-detail"><strong>GPA:</strong> 3.7</span>
              <span className="edu-detail"><strong>Period:</strong> Aug 2023 – May 2025</span>
            </div>
            <p className="edu-courses"><strong>Coursework:</strong> Computer Architecture, Linear Algebra, Java, Discrete Math</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-header reveal" ref={addToRefs}>
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Let's Connect</h2>
        </div>
        <p className="contact-subtitle reveal" ref={addToRefs}>
          I'm always open to discussing new opportunities and collaborations.
        </p>
        <div className="contact-links reveal" ref={addToRefs}>
          <a 
            href="mailto:smuradkh@gmail.com" 
            className="contact-link"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            smuradkh@gmail.com
          </a>
          <a 
            href="tel:+14152486119" 
            className="contact-link"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            (415) 248-6119
          </a>
        </div>
        <div className="social-links reveal" ref={addToRefs}>
          <a 
            href="https://github.com/stepm01" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a 
            href="https://linkedin.com/in/Stepan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Stepan Muradkhanyan · San Francisco, CA</p>
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Back to top 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </a>
      </footer>

      {/* CV Modal */}
      <div 
        className={`modal-overlay ${isModalOpen ? 'active' : ''}`}
        onClick={(e) => e.target.className.includes('modal-overlay') && setIsModalOpen(false)}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>My Resume</h2>
            <button 
              className="modal-close" 
              onClick={() => setIsModalOpen(false)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            {isModalOpen && <iframe src={CV_PATH} title="CV" />}
          </div>
          <div className="modal-footer">
            <a 
              href={CV_PATH} 
              download="Stepan_Muradkhanyan.pdf" 
              className="btn-secondary"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download
            </a>
            <button 
              className="btn-primary" 
              onClick={() => setIsModalOpen(false)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
