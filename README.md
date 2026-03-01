# TrustDesk — Static Website
### trustdesk.in

A production-ready, multi-page static website for TrustDesk — a privacy-first, offline-first software portfolio.

---

## 📁 Project Structure

```
trustdesk/
├── index.html              # Main landing page (all sections)
├── css/
│   ├── design-system.css   # Design tokens, typography, utilities, base reset
│   ├── nav.css             # Navigation styles
│   ├── hero.css            # Hero section styles
│   └── sections.css        # About, Security, Portfolio, Founder, Contact, Footer
├── js/
│   └── main.js             # All JavaScript: nav, scroll reveal, filter, animations
├── pages/
│   ├── privacy.html        # Privacy Policy
│   ├── terms.html          # Terms of Use
│   └── license.html        # Open Source License
└── README.md               # This file
```

---

## 🎨 Design System

### Fonts
- **Display / Body**: Sora (Google Fonts) — distinctive, modern, geometric
- **Code / Mono**: JetBrains Mono (Google Fonts)

### Colors
- **Primary Blue**: `#1f4fd8` (Trust)
- **Primary Green**: `#16a34a` (Desk)
- Full token system in `css/design-system.css`

### Key CSS Variables
```css
--blue-700: #1f4fd8;
--green-700: #16a34a;
--font-sans: 'Sora', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--shadow-lg: 0 12px 36px rgba(15,17,23,0.1);
```

---

## ⚙️ Features

- ✅ Sticky nav with scroll progress bar
- ✅ Preloader with brand animation
- ✅ Scroll-triggered reveal animations (IntersectionObserver)
- ✅ Animated hero with floating cards
- ✅ Portfolio filter (All / Desktop / Android)
- ✅ Animated counter on hero stats
- ✅ Typed text effect on hero
- ✅ Security section hover interactions
- ✅ Contact form with simulated submission
- ✅ Back-to-top button
- ✅ Cookie notice (no cookies used)
- ✅ Mobile hamburger menu
- ✅ Fully responsive (mobile-first)
- ✅ SEO meta tags + Schema.org JSON-LD
- ✅ WCAG accessible (focus styles, ARIA labels, roles)
- ✅ Zero external JS dependencies

---

## 🚀 Deployment

This is a pure static site. Deploy to any static host:

### Netlify / Vercel
Drop the `trustdesk/` folder into Netlify or Vercel. Done.

### Apache / Nginx
Copy all files to your web root. No build step required.

### GitHub Pages
Push to a repo, enable GitHub Pages from the `main` branch.

### Local Preview
```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .

# VS Code
Use the "Live Server" extension
```
Open `http://localhost:8000`

---

## 📧 Contact Form

The contact form in `index.html` currently simulates a submission. To wire it to a real backend:

1. **Formspree**: Change form `action` to `https://formspree.io/f/YOUR_ID`
2. **Netlify Forms**: Add `netlify` attribute to the `<form>` tag
3. **Custom API**: Replace the `setTimeout` in `js/main.js → ContactForm.init()`

---

## 🔧 Customization

### Adding a new app card
In `index.html`, duplicate any `<article class="app-card">` block and update:
- `data-platform="desktop"` or `data-platform="android"`
- App name, description, version badge, icon emoji

### Updating brand colors
Edit the CSS variables in `css/design-system.css`:
```css
--blue-700: #1f4fd8;   /* "Trust" color */
--green-700: #16a34a;  /* "Desk" color */
```

---

## 📄 Pages

| File | URL | Purpose |
|------|-----|---------|
| `index.html` | `/` | Main landing page |
| `pages/privacy.html` | `/pages/privacy.html` | Privacy Policy |
| `pages/terms.html` | `/pages/terms.html` | Terms of Use |
| `pages/license.html` | `/pages/license.html` | MIT License |

---

© 2026 TrustDesk · Built in Maharashtra, India by Gorakhnath Patil
