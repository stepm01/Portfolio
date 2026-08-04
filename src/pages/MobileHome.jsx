import { useNavigate } from 'react-router-dom';
import { ABOUT, PROJECTS, EXPERIENCE, EDUCATION, SKILLS } from '../data/portfolio';

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function MobileHome() {
  const navigate = useNavigate();

  return (
    <div className="m-page">
      {/* Nav */}
      <header className="m-nav">
        <div className="m-logo">stepan<span className="accent-dot">.</span></div>
        <a href="/Stepan Muradkhanyan.pdf" download className="m-cv">CV</a>
      </header>

      {/* Hero */}
      <section className="m-hero">
        <div className="m-badge"><span className="pulse-dot" /> Available for opportunities</div>
        <h1 className="m-hero-name">
          Hi, I'm <span className="gradient-text">{ABOUT.name.split(' ')[0]}</span>
        </h1>
        <p className="m-hero-sub">{ABOUT.tagline}</p>
        <p className="m-hero-desc">{ABOUT.description}</p>
        <div className="m-hero-actions">
          <a href={`#projects`} className="m-btn primary">View Projects</a>
          <a href={`mailto:${ABOUT.email}`} className="m-btn ghost">Get in touch</a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="m-section">
        <span className="section-tag">Work</span>
        <h2 className="m-section-heading">Projects</h2>
        <div className="m-project-list">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              className="m-project-card"
              style={{ '--c': p.color, borderTopColor: p.color }}
              onClick={() => navigate(`/project/${p.id}`)}
            >
              <div className="m-pc-top">
                <span className="m-pc-emoji">{p.emoji}</span>
                {p.liveDemo && (
                  <span className="m-pc-live" style={{ color: p.color, borderColor: p.color + '55', background: p.color + '14' }}>
                    <span className="pco-live-dot" style={{ background: p.color }} /> Live
                  </span>
                )}
              </div>
              <h3 className="m-pc-title">{p.title}</h3>
              <div className="m-pc-role" style={{ color: p.color }}>{p.role}</div>
              <p className="m-pc-desc">{p.short}</p>
              <div className="m-pc-tech">
                {p.tech.map((t) => (
                  <span key={t} className="m-pc-tag" style={{ color: p.color, borderColor: p.color + '35', background: p.color + '12' }}>{t}</span>
                ))}
              </div>
              <div className="m-pc-cta" style={{ color: p.color }}>Explore project <ArrowIcon /></div>
            </button>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="m-section">
        <span className="section-tag">Career</span>
        <h2 className="m-section-heading">Experience</h2>
        <div className="m-timeline">
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className="m-tl-item">
              <div className="m-tl-dot" />
              <div className="m-tl-body">
                <div className="m-tl-date">{exp.period}</div>
                <div className="m-tl-role">{exp.role}</div>
                <div className="m-tl-company">{exp.company} · {exp.location}</div>
                <ul className="m-tl-bullets">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <span className="section-tag" style={{ marginTop: '28px' }}>Education</span>
        <div className="m-edu-list">
          {EDUCATION.map((edu) => (
            <div key={edu.school} className="m-edu-item">
              <div className="m-edu-degree">{edu.degree}</div>
              <div className="m-edu-school">{edu.school}</div>
              <div className="m-edu-meta">GPA {edu.gpa} · {edu.period}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="m-section">
        <span className="section-tag">Toolbox</span>
        <h2 className="m-section-heading">Skills</h2>
        <div className="m-skills">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="m-skill-col">
              <div className="m-skill-cat">{cat}</div>
              <div className="m-skill-tags">
                {items.map((s) => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="m-section m-contact">
        <span className="section-tag">Get in touch</span>
        <h2 className="m-section-heading">Let's Connect</h2>
        <p className="m-contact-sub">Open to opportunities, collaborations, and interesting conversations.</p>
        <div className="m-contact-links">
          <a href={`mailto:${ABOUT.email}`} className="contact-chip">Email</a>
          <a href={ABOUT.github} target="_blank" rel="noreferrer" className="contact-chip">GitHub</a>
          <a href={ABOUT.linkedin} target="_blank" rel="noreferrer" className="contact-chip">LinkedIn</a>
        </div>
        <div className="footer-note">© 2025 {ABOUT.name} · {ABOUT.location}</div>
      </section>
    </div>
  );
}
