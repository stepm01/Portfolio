import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Scene3D from '../components/Scene3D';
import { ABOUT, EXPERIENCE, EDUCATION, SKILLS, PROJECTS } from '../data/portfolio';

// Scroll ranges for each overlay section
const SECTIONS = {
  hero:       [0,    0.14],
  project0:   [0.22, 0.40],
  project1:   [0.50, 0.68],
  experience: [0.71, 0.88],
  contact:    [0.90, 1.00],
};

function sectionOpacity(progress, [start, end], fade = 0.04) {
  if (progress < start) return Math.max(0, 1 - (start - progress) / fade);
  if (progress > end)   return Math.max(0, 1 - (progress - end) / fade);
  return 1;
}

function useScrollProgress(totalSections = 6) {
  const scrollRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      scrollRef.current = p;
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrollRef, progress };
}

// ── Overlay Panels ─────────────────────────────────────────────────────────────

function HeroOverlay({ opacity }) {
  return (
    <div className="overlay-panel hero-panel" style={{ opacity, pointerEvents: opacity > 0.05 ? 'auto' : 'none' }}>
      <div className="hero-badge">
        <span className="pulse-dot" /> Available for opportunities
      </div>
      <h1 className="hero-name">
        Hi, I'm <span className="gradient-text">{ABOUT.name.split(' ')[0]}</span>
      </h1>
      <p className="hero-sub">{ABOUT.tagline}</p>
      <p className="hero-desc">{ABOUT.description}</p>
      <div className="scroll-hint">
        <span>Scroll to drive</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </div>
  );
}

function ProjectHintOverlay({ opacity, index }) {
  const project = PROJECTS[index];
  if (!project) return null;
  return (
    <div
      className="overlay-panel hint-panel"
      style={{ opacity, pointerEvents: 'none', '--accent': project.color }}
    >
      <div className="hint-label">
        <span className="hint-dot" /> Approaching
      </div>
      <div className="hint-title">{project.title}</div>
      <div className="hint-sub">Look right for the project card</div>
    </div>
  );
}

function ExperienceOverlay({ opacity }) {
  return (
    <div className="overlay-panel experience-panel" style={{ opacity, pointerEvents: opacity > 0.05 ? 'auto' : 'none' }}>
      <span className="section-tag">Career</span>
      <h2 className="section-heading">Experience</h2>
      <div className="timeline">
        {EXPERIENCE.map((exp, i) => (
          <div key={exp.id} className="timeline-item">
            <div className="tl-dot" />
            <div className="tl-content">
              <div className="tl-date">{exp.period}</div>
              <div className="tl-role">{exp.role}</div>
              <div className="tl-company">{exp.company} · {exp.location}</div>
              <ul className="tl-bullets">
                {exp.bullets.slice(0, 2).map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="edu-row">
        <span className="section-tag" style={{ marginTop: '16px' }}>Education</span>
        {EDUCATION.map((edu) => (
          <div key={edu.school} className="edu-item">
            <div className="edu-degree">{edu.degree}</div>
            <div className="edu-school">{edu.school}</div>
            <div className="edu-gpa">GPA {edu.gpa} · {edu.period}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactOverlay({ opacity }) {
  return (
    <div className="overlay-panel contact-panel" style={{ opacity, pointerEvents: opacity > 0.05 ? 'auto' : 'none' }}>
      <span className="section-tag">Get in Touch</span>
      <h2 className="section-heading">Let's Connect</h2>
      <p className="contact-sub">Open to opportunities, collaborations, and interesting conversations.</p>
      <div className="contact-links-row">
        <a href={`mailto:${ABOUT.email}`} className="contact-chip">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
          {ABOUT.email}
        </a>
        <a href={ABOUT.github} target="_blank" rel="noreferrer" className="contact-chip">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" fill="currentColor"/></svg>
          GitHub
        </a>
        <a href={ABOUT.linkedin} target="_blank" rel="noreferrer" className="contact-chip">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/></svg>
          LinkedIn
        </a>
      </div>
      <div className="skills-grid-small">
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div key={cat} className="skill-col">
            <div className="skill-col-title">{cat}</div>
            <div className="skill-tags">
              {items.map((s) => <span key={s} className="skill-tag">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="footer-note">© 2025 {ABOUT.name} · {ABOUT.location}</div>
    </div>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────────
function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-track">
      <div className="progress-bar-fill" style={{ width: `${progress * 100}%` }} />
      <div className="progress-label">
        {progress < 0.15 ? 'Start' :
         progress < 0.45 ? 'Projects' :
         progress < 0.70 ? 'Projects' :
         progress < 0.90 ? 'Experience' : 'Contact'}
      </div>
    </div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────────
function Nav({ onScrollTo }) {
  return (
    <nav className="main-nav">
      <div className="nav-logo">
        stepan<span className="accent-dot">.</span>
      </div>
      <div className="nav-links-row">
        <button onClick={() => onScrollTo(0)}>Home</button>
        <button onClick={() => onScrollTo(0.30)}>Projects</button>
        <button onClick={() => onScrollTo(0.75)}>Experience</button>
        <button onClick={() => onScrollTo(0.92)}>Contact</button>
      </div>
      <a href="/Stepan Muradkhanyan.pdf" download className="nav-cv-btn">
        View CV
      </a>
    </nav>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const { scrollRef, progress } = useScrollProgress();

  const scrollTo = (targetProgress) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * targetProgress, behavior: 'smooth' });
  };

  const heroOpacity = sectionOpacity(progress, SECTIONS.hero, 0.05);
  const proj0Opacity = sectionOpacity(progress, SECTIONS.project0, 0.06);
  const proj1Opacity = sectionOpacity(progress, SECTIONS.project1, 0.06);
  const expOpacity   = sectionOpacity(progress, SECTIONS.experience, 0.05);
  const contactOpacity = sectionOpacity(progress, SECTIONS.contact, 0.05);

  return (
    <>
      {/* Scrollable spacer — 700vh tall to give plenty of scroll room */}
      <div style={{ height: '700vh' }} />

      {/* Fixed canvas layer */}
      <div className="canvas-container">
        <Scene3D scrollRef={scrollRef} onNavigate={navigate} />
      </div>

      {/* Fixed UI layer */}
      <div className="ui-layer">
        <Nav onScrollTo={scrollTo} />
        <ProgressBar progress={progress} />

        {heroOpacity > 0.01 && <HeroOverlay opacity={heroOpacity} />}
        {proj0Opacity > 0.01 && <ProjectHintOverlay opacity={proj0Opacity} index={0} />}
        {proj1Opacity > 0.01 && <ProjectHintOverlay opacity={proj1Opacity} index={1} />}
        {expOpacity > 0.01 && <ExperienceOverlay opacity={expOpacity} />}
        {contactOpacity > 0.01 && <ContactOverlay opacity={contactOpacity} />}
      </div>
    </>
  );
}
