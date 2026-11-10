# The Moon Found His Sun

An illustrated, interactive celestial storybook recounting the journey of a Moon who discovered his Sun.

---

> [!IMPORTANT]
> **The story content is approved and immutable. Do not rewrite, paraphrase, summarize, or alter any narrative text.**
> All 13 chapters in `src/content/story.js` are final and must be preserved verbatim in their original Egyptian Arabic narrative form.

---

## Project Overview

**The Moon Found His Sun** is a static, zero-dependency interactive storytelling website built with semantic HTML5, modular CSS3, custom SVG artwork, and vanilla ES2022+ JavaScript.

### Key Experience Highlights
- **Cinematic Opening Scene:** A floating illustrated celestial storybook orbited by a golden-lavender butterfly that opens in a warm golden bloom to begin the story.
- **13 Bespoke Illustrated Chapters:** Every chapter features a unique, custom-crafted SVG scene depicting the Moon, the Sun, and the symbolic Butterfly with evolving emotional expressions (`calm`, `surprise`, `wonder`, `curious`, `courage`, `nervous`, `hopeful`, `affection`, `happy`, `vulnerable`, `hope`, `peace`, and `sincere`).
- **Meaningful Interactive Moments:** Each chapter includes an interactive scene element (star and orbit activation, dawn-in-night reveal, the 3-pillar exploration in Chapter 4, the celestial bridge crossing, the first ray of light at dawn, constellation weaving, parting cosmic clouds, mutual reunion, and the eternal promise halo).
- **Heirloom Final Letter Experience (Chapter 13):** A dedicated, emotionally intimate presentation for the personal letter (`To My Sun, Reman ❤️`), with refined Arabic RTL typography and comfortable mobile reading.
- **Hybrid Navigation:** Supports natural vertical scrolling with scroll-spy progress synchronization, 13 interactive constellation progress dots, Next/Previous chapter controls, touch swipe gestures, and full keyboard navigation.

---

## File Structure

```text
the-moon-found-his-sun/
│
├── index.html                        # HTML5 entry point, opening hero, journey mount & navigation
├── README.md                         # Project documentation, local preview & GitHub Pages guide
├── .nojekyll                         # Prevents Jekyll processing on GitHub Pages
│
├── assets/
│   ├── fonts/                        # Locally stored WOFF2 font files (IBM Plex Sans Arabic & Cinzel)
│   │   ├── cinzel-latin.woff2
│   │   ├── ibm-plex-sans-arabic-300.woff2
│   │   ├── ibm-plex-sans-arabic-400.woff2
│   │   ├── ibm-plex-sans-arabic-500.woff2
│   │   ├── ibm-plex-sans-arabic-600.woff2
│   │   └── ibm-plex-sans-latin-400.woff2
│   ├── illustrations/                # Standalone reusable character SVG assets
│   │   ├── moon.svg
│   │   ├── sun.svg
│   │   └── butterfly.svg
│   └── icons/
│       └── favicon.svg               # Celestial Sun & Moon vector favicon
│
├── css/
│   ├── reset.css                     # Modern CSS normalization
│   ├── variables.css                 # Controlled celestial color tokens, typography & spacing
│   ├── typography.css                # Local @font-face rules, RTL Arabic & LTR English styles
│   ├── layout.css                    # Ambient sky layers, opening stage & constellation nav bar
│   ├── animations.css                # Character motion, scroll reveals & reduced-motion support
│   ├── chapters.css                  # Chapter scene plates, interactive SVG states & Chapter 13 letter
│   └── responsive.css                # Mobile-first breakpoints (360px–1440px+)
│
├── js/
│   ├── app.js                        # Main application orchestrator & DOM rendering
│   ├── characters.js                 # Reusable SVG character generators (Moon, Sun, Butterfly)
│   ├── scenes.js                     # Bespoke SVG illustrations & interaction metadata for all 13 chapters
│   ├── navigation.js                 # Scroll-spy observer, chapter navigation & URL hash sync
│   ├── animations.js                 # IntersectionObserver scroll reveals & passive parallax
│   ├── interactions.js               # Interactive scene handlers, Chapter 4 pillars & swipe gestures
│   └── accessibility.js              # Keyboard navigation & ARIA live region announcer
│
└── src/
    └── content/
        └── story.js                  # Immutable source of truth for all 13 chapters
```

---

## Local Preview Instructions

Because the application uses native ES Modules (`<script type="module">`), serve the directory over a local HTTP server rather than opening `index.html` via `file://`.

### Option 1: Node.js (`npx serve`)
```bash
npx serve . -l 8080
```
Then open `http://localhost:8080` in your browser.

### Option 2: Python Built-in HTTP Server
```bash
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Option 3: VS Code Live Server
Right-click `index.html` and choose **Open with Live Server**.

---

## GitHub Pages Deployment Instructions

This project is pre-configured for zero-build static deployment on **GitHub Pages** (either at a root domain or a repository subpath like `https://<username>.github.io/<repo-name>/`):

1. Commit all project files to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Complete The Moon Found His Sun storybook implementation"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings → Pages**.
3. Under **Build and deployment**:
   - Set **Source** to **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder, then click **Save**.
4. GitHub Pages will publish the site automatically. The included `.nojekyll` file ensures all assets and subdirectories are served unmodified.

---

## Maintenance & Content Rules

1. **Do Not Alter `src/content/story.js`:** The Arabic story text and chapter structure are final.
2. **Relative Paths Only:** Keep all asset, font, CSS, and JS imports relative so the site functions identically at root (`/`) or a repository subpath (`/repo-name/`).
3. **Palette Consistency:** Use the established CSS custom properties in `css/variables.css` (`#10142B`, `#191D3A`, `#E8BD75`, `#F5EEDF`, `#A9A0C9`, `#DCE4F2`).
