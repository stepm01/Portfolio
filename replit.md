# Stepan Muradkhanyan — Portfolio

An interactive 3D portfolio website where a car drives along a glowing road as you scroll, stopping at project milestones.

## Stack

- **React 18** + **Vite 5** (migrated from CRA — react-scripts was security-blocked)
- **Three.js** + **@react-three/fiber** v8 + **@react-three/drei** v9 — 3D scene
- **React Router DOM** v6 — project detail pages

## How to run

```bash
npm run start   # starts on port 5000
```

## Structure

```
index.html              # Vite entry (root level)
public/
  Stepan Muradkhanyan.pdf   # CV file
src/
  App.jsx                   # Router (/ and /project/:id)
  index.jsx                 # React entry point
  index.css                 # All global + component styles
  data/
    portfolio.js            # All content: projects, experience, education, skills
  components/
    Scene3D.jsx             # Three.js canvas scene (road, car, project markers)
  pages/
    Home.jsx                # Main scroll experience + UI overlays
    ProjectDetail.jsx       # Individual project detail page
```

## How the 3D scroll experience works

- `Home.jsx` renders a `700vh`-tall invisible scroll spacer
- Canvas (`Scene3D.jsx`) and UI overlays are `position: fixed`
- Scroll progress (0→1) drives the car along a `CatmullRomCurve3` road path
- The chase camera follows the car using smooth lerp
- Project markers appear at t=0.30 and t=0.60 — clicking navigates to `/project/:id`
- UI overlays (hero, hints, experience timeline, contact) fade in/out by scroll range

## Content

All text content lives in `src/data/portfolio.js`. Edit there to update: name, bio, projects, experience, education, skills, contact info.

## User preferences

- Keep the dark blue cyberpunk aesthetic (`--bg: #020817`, `--accent: #60a5fa`)
- Font: Space Mono (mono) + Syne (headings)
- The 3D car scene is the primary design centerpiece — keep it interactive and scroll-driven
