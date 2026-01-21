# Stepan Muradkhanyan - Portfolio (React)

A sleek, modern portfolio website built with React featuring a stunning dark blue aesthetic, smooth animations, and interactive elements.

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html
│   └── Stepan_Muradkhanyan.pdf   <-- 📄 PUT YOUR CV HERE!
├── src/
│   ├── App.js                     # Main React component
│   ├── index.js                   # React entry point
│   └── index.css                  # All styles
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd portfolio
npm install
```

### 2. Add Your CV
**Place your CV file at:**
```
public/Stepan_Muradkhanyan.pdf
```

### 3. Run Locally
```bash
npm start
```
Opens at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
```
Creates optimized build in `build/` folder.

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import repo in Vercel
3. Deploy automatically!

### GitHub Pages
```bash
npm install gh-pages --save-dev
```
Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
Then run:
```bash
npm run deploy
```

### Netlify
1. Push to GitHub
2. Connect repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

## ✨ Features

- Custom animated cursor
- Floating orb background with parallax
- Scroll-triggered reveal animations
- CV modal with PDF viewer
- Fully responsive design
- Dark blue theme with glowing accents

## 📞 Contact

- **Email**: smuradkh@gmail.com
- **LinkedIn**: [linkedin.com/in/Stepan](https://linkedin.com/in/Stepan)
- **GitHub**: [github.com/stepm01](https://github.com/stepm01)

---

Built with 💙 using React
