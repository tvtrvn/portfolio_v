# Thinh Tran — Portfolio (`thinh-tran-portfoliosite.netlify.app`)

> Editorial-grade portfolio for a CS student / full-stack engineer. Hand-built design system, custom motion choreography, no template.

A custom React + Vite + TypeScript portfolio designed to feel like a magazine
profile rather than a CV dump. Built around an editorial-luxury aesthetic
(warm bone-on-charcoal palette, single muted amber accent, Fraunces + Geist +
JetBrains Mono typography stack), an animated Canvas mesh-blob hero graphic,
magnetic CTAs, spotlight-border project cards, a kinetic marquee, and a
floating Mac-dock navbar — all motion-engine'd by Framer Motion on a custom
`cubic-bezier(0.32, 0.72, 0, 1)` premium ease.

---

## Highlights

- **Custom design system, zero template look.** No Inter, no purple "AI"
  gradients, no generic Lucide icons. Off-black `#0B0B0E` + bone `#F4EFE6` +
  single accent `#D4A574` (muted amber-gold). Phosphor Icons throughout.
- **Hand-built animated Canvas hero graphic.** Three-blob radial-gradient
  mesh field with palette-aware repainting, capped at 30 fps, respects
  `prefers-reduced-motion`, repaints on theme switch, scales for DPR.
- **Choreographed motion.** Framer Motion `whileInView` scroll reveals
  (IntersectionObserver under the hood), shared-layout animated active nav
  pill (`layoutId`), magnetic spring-physics CTAs, staggered children,
  marquee infinite-loop with edge fades. Linear-style premium easing.
- **Mac-dock floating navbar.** Detached pill with status indicator, theme
  toggle, GitHub link. Hamburger morphs to X. Mobile menu is a screen-
  filling overlay with stagger-reveal links and `Esc` close.
- **Spotlight project cards.** Cursor-following radial highlight on a
  pixel-perfect double-bezel (outer shell + inner core) container. Bento
  grid spans on `/work`.
- **9 production-shape projects** indexed and tagged by kind, status, year,
  with searchable filter chips and a list/bento view toggle.
- **Accessibility-first.** Skip-to-content link, `aria-` everywhere,
  keyboard-friendly focus rings tied to the accent color, motion respects
  `prefers-reduced-motion`, contrast meets WCAG AA in both themes.

---

## Tech stack

| Layer        | Tech                                                              |
| ------------ | ----------------------------------------------------------------- |
| Framework    | Vite 5, React 18, TypeScript 5                                    |
| Styling      | Tailwind CSS 3 (custom theme tokens, custom keyframes)            |
| Motion       | Framer Motion 11 (`whileInView`, `layoutId`, springs, `AnimatePresence`) |
| Icons        | Phosphor Icons (`@phosphor-icons/react`)                          |
| Routing      | React Router v6                                                   |
| Forms        | Netlify Forms (honeypot + spam-trap built in)                     |
| Fonts        | Fraunces (variable serif display) · Geist (sans) · JetBrains Mono |
| Graphics     | Custom 2D Canvas mesh-blob shader · inline SVG grid HUD           |
| Hosting      | Netlify (drag-and-drop + Git deploys, SPA redirects in `_redirects`) |

---

## Project structure

```
my-portfolio-app/
├── index.html                  preconnect to Google Fonts, skip-link, OG meta
├── tailwind.config.ts          theme tokens (palette, fonts, keyframes, shadows)
├── public/
│   ├── favicon.svg             custom minimal favicon
│   ├── resume.pdf              live resume (replace with your own)
│   └── _redirects              SPA fallback for Netlify
└── src/
    ├── main.tsx                React + BrowserRouter mount
    ├── index.css               Tailwind base + fonts + design tokens (CSS vars)
    ├── App.tsx                 ThemeProvider + ScrollToTop + Routes
    ├── content/siteData.ts     ALL content lives here (single source of truth)
    ├── types/content.ts        SiteData / Project / Experience types
    ├── context/ThemeContext.tsx  light/dark + localStorage persistence
    ├── utils/cn.ts             classnames helper
    ├── layouts/MainLayout.tsx  shell with grain overlay
    ├── components/
    │   ├── Navbar.tsx          floating dock + mobile overlay
    │   ├── Footer.tsx          marquee + multi-column editorial footer
    │   ├── ThemeToggle.tsx     sun/moon icon swap (Phosphor)
    │   ├── Button.tsx          variants + button-in-button arrow bubble
    │   ├── Tag.tsx             mono uppercase pill, active/hover states
    │   ├── Inputs.tsx          TextInput/TextArea with eyebrow-style labels
    │   ├── SectionHeader.tsx   number + eyebrow + display title + description
    │   ├── ProjectCard.tsx     spotlight bezel card with metrics & tags
    │   ├── PageTransition.tsx  per-page fade-up
    │   ├── Seo.tsx             runtime meta updates
    │   ├── ScrollToTop.tsx     route-change scroll reset
    │   └── visual/
    │       ├── CanvasMeshBlob.tsx   hand-rolled 2D canvas mesh shader
    │       ├── SpotlightCard.tsx    cursor-tracked spotlight border
    │       ├── MagneticButton.tsx   spring-physics magnetic hover
    │       ├── Marquee.tsx          infinite horizontal marquee + fades
    │       ├── Reveal.tsx           Reveal + StaggerGroup/Item helpers
    │       └── NoiseOverlay.tsx     fixed pointer-events-none grain layer
    └── pages/
        ├── Home.tsx            editorial-split hero + bento featured work
        ├── About.tsx           long-form profile + timeline + skills
        ├── Projects.tsx        9 projects, filter chips, bento + list view
        ├── Resume.tsx          PDF preview + typeset rich resume
        └── Contact.tsx         direct lines + Netlify form with full states
```

---

## Local development

```bash
node -v          # require ≥ 18
npm install
npm run dev      # http://localhost:5173
```

To build for production:

```bash
npm run build    # outputs to dist/
npm run preview  # serves dist/ locally
```

---

## Customizing your content

Every piece of content on the site lives in `src/content/siteData.ts`.
Update that one file and everything propagates:

- `name`, `role`, `location`, `heroTagline`, `heroIntro`
- `heroHighlights` (4 grouped lists on the hero panel)
- `about.paragraphs` (long-form bio used on `/about`)
- `skills.languages / frameworks / tools`
- `experience[]` (timeline entries)
- `projects[]` — each project has `title, tagline, description, tech[], links[], highlight, year, role, status, kind, featured, metrics[]`
- `contact.email / github / linkedin`
- `resume.fileName` (defaults to `resume.pdf`) and `resume.summary` (the
  typeset short summary on `/resume`)

Drop your real resume into `public/resume.pdf` (file name matches
`siteData.resume.fileName`).

---

## Design philosophy

This portfolio was built against three engineering rules:

1. **Anti-slop typography.** No Inter. Fraunces (variable serif) for
   editorial weight, Geist for clean UI, JetBrains Mono for numerals and
   labels. All headings get explicit `tracking-tightest`.
2. **One accent, never more.** A single muted amber-gold accent
   (`#D4A574`) is the only color allowed to deviate from the neutral
   palette. Everything else is warm-tinted bone and charcoal.
3. **Motion has mass.** Every transition uses a custom cubic-bezier
   (Linear-style `[0.32, 0.72, 0, 1]`). Springs for physical interactions,
   IntersectionObserver-driven `whileInView` for scroll reveals, never
   `window.addEventListener('scroll')`.

The Canvas hero blob, the dock navbar, the spotlight cards, the marquee,
and the magnetic CTAs were all hand-built rather than pulled from a UI
library. The goal was a portfolio that looks like the engineer made it,
not like the engineer picked a template.

---

## Deployment (Netlify)

The project is wired for Netlify out of the box:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA redirects:** `public/_redirects` (`/* /index.html 200`)
- **Forms:** Netlify Forms picks up the hidden form in `index.html` at
  build time. The contact form on `/contact` posts to `/` with the same
  `form-name` so submissions land in your Netlify dashboard.

---

## License

MIT.
