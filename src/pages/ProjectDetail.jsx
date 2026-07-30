import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/portfolio';

const GithubIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6M10 14 21 3" />
  </svg>
);

// ── Live Demo section ──────────────────────────────────────────────────────────
// Tries to embed the live app in a browser-style frame. Because many free hosts
// send X-Frame-Options / frame-ancestors that block embedding, an "Open Live
// Demo" button is always available, and the frame falls back to a preview card
// if the app doesn't load.
function LiveDemo({ project }) {
  const { liveDemo, liveEmbeddable, demoNote, color, emoji, title } = project;
  const [status, setStatus] = useState(
    !liveDemo ? 'none' : liveEmbeddable ? 'loading' : 'button'
  );
  const timerRef = useRef(null);

  useEffect(() => {
    if (status !== 'loading') return;
    // If the iframe never signals a load, fall back to the button view.
    timerRef.current = setTimeout(() => {
      setStatus((s) => (s === 'loading' ? 'button' : s));
    }, 15000);
    return () => clearTimeout(timerRef.current);
  }, [status]);

  const openButton = (
    <a
      href={liveDemo}
      target="_blank"
      rel="noreferrer"
      className="pd-btn primary"
      style={{ '--c': color, background: color }}
    >
      <ExternalIcon />
      Open Live Demo
    </a>
  );

  // No deployed URL yet — show a placeholder slot the user can wire up later.
  if (status === 'none') {
    return (
      <section className="pd-demo">
        <h2 className="pd-section-title">Live Demo</h2>
        <div className="pd-demo-placeholder" style={{ '--c': color }}>
          <div className="pd-demo-ph-emoji">{emoji}</div>
          <div className="pd-demo-ph-text">
            <strong>Demo slot reserved</strong>
            <p>{demoNote || 'A live deployment will appear here.'}</p>
          </div>
          <a href={project.github} target="_blank" rel="noreferrer" className="pd-btn secondary">
            <GithubIcon /> View the code
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="pd-demo">
      <h2 className="pd-section-title">Live Demo</h2>

      <div className="pd-browser" style={{ '--c': color }}>
        <div className="pd-browser-bar">
          <span className="pd-dot" style={{ background: '#ef4444' }} />
          <span className="pd-dot" style={{ background: '#f59e0b' }} />
          <span className="pd-dot" style={{ background: '#10b981' }} />
          <span className="pd-url">{liveDemo.replace(/^https?:\/\//, '')}</span>
          <a href={liveDemo} target="_blank" rel="noreferrer" className="pd-browser-open">
            <ExternalIcon /> Open
          </a>
        </div>

        {status === 'button' ? (
          <div className="pd-demo-fallback">
            <div className="pd-demo-ph-emoji">{emoji}</div>
            <p className="pd-demo-fallback-title">{title} is deployed and running</p>
            <p className="pd-demo-fallback-note">
              This host can’t be shown inside the page — open it in a new tab for the full experience.
            </p>
            {openButton}
          </div>
        ) : (
          <div className="pd-frame-wrap">
            {status === 'loading' && (
              <div className="pd-frame-loading">
                <span className="pd-spinner" style={{ borderTopColor: color }} />
                Loading live app…
              </div>
            )}
            <iframe
              className="pd-frame"
              src={liveDemo}
              title={`${title} live demo`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setStatus('ready')}
              onError={() => setStatus('button')}
            />
          </div>
        )}
      </div>

      {demoNote && <p className="pd-demo-note">ⓘ {demoNote}</p>}
    </section>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="not-found">
        <h2>Project not found</h2>
        <button onClick={() => navigate('/')}>← Back</button>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Background orbs */}
      <div className="bg-orb" style={{ '--c': project.color, top: '-200px', right: '-150px' }} />
      <div className="bg-orb secondary" style={{ '--c': project.color, bottom: '-200px', left: '-150px' }} />

      <div className="pd-inner">
        {/* Back button */}
        <button className="pd-back" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to road
        </button>

        {/* Header */}
        <div className="pd-header">
          <div className="pd-emoji">{project.emoji}</div>
          <div>
            <div
              className="pd-tag"
              style={{ color: project.color, borderColor: project.color + '44', background: project.color + '11' }}
            >
              {project.role || 'Featured Project'}
            </div>
            <h1 className="pd-title">{project.title}</h1>
          </div>
        </div>

        <div className="pd-grid">
          {/* Main column */}
          <div className="pd-main">
            <h2 className="pd-section-title">Overview</h2>
            <p className="pd-description">{project.description}</p>

            {/* Live demo */}
            <LiveDemo project={project} />

            {project.features?.length > 0 && (
              <>
                <h2 className="pd-section-title" style={{ marginTop: '40px' }}>What it does</h2>
                <ul className="pd-features">
                  {project.features.map((f, i) => (
                    <li key={i}>
                      <span className="feature-check" style={{ color: project.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="pd-section-title" style={{ marginTop: '40px' }}>Highlights</h2>
            <ul className="pd-highlights">
              {project.highlights.map((h, i) => (
                <li key={i}>
                  <span className="highlight-arrow" style={{ color: project.color }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="pd-actions">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="pd-btn primary"
                  style={{ '--c': project.color, background: project.color }}
                >
                  <ExternalIcon />
                  View Live Demo
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={`pd-btn ${project.liveDemo ? 'secondary' : 'primary'}`}
                style={project.liveDemo ? undefined : { '--c': project.color, background: project.color }}
              >
                <GithubIcon />
                View on GitHub
              </a>
              <button className="pd-btn secondary" onClick={() => navigate('/')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Back to Portfolio
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="pd-sidebar">
            <div className="pd-sidebar-card">
              <h3 className="pd-sidebar-title">Tech Stack</h3>
              {project.techStack ? (
                Object.entries(project.techStack).map(([group, items]) => (
                  <div key={group} className="pd-tech-group">
                    <div className="pd-tech-group-label" style={{ color: project.color }}>{group}</div>
                    <div className="pd-tech-list">
                      {items.map((t) => (
                        <div key={t} className="pd-tech-item">
                          <span className="tech-bullet" style={{ background: project.color }} />
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="pd-tech-list">
                  {project.tech.map((t) => (
                    <div key={t} className="pd-tech-item">
                      <span className="tech-bullet" style={{ background: project.color }} />
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {project.stats?.length > 0 && (
              <div className="pd-sidebar-card" style={{ borderColor: project.color + '33' }}>
                <h3 className="pd-sidebar-title">Quick Stats</h3>
                <div className="pd-stats">
                  {project.stats.map((s) => (
                    <div key={s.label} className="pd-stat">
                      <div className="stat-value" style={{ color: project.color }}>{s.value}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
