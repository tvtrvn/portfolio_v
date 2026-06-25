# My Portfolio (Thinh Tran) — Complete Codebase Walkthrough

A comprehensive guide for anyone who wants to understand every part of this personal portfolio site: what it does, how it's structured, where each piece of content lives, and what every visual/animation primitive is doing.

---

## 1. Introduction

This is **my (Thinh Tran's) personal portfolio site** — a single React + Vite + Tailwind app that renders five pages of content (Home, About, Projects, Resume, Contact) driven by a single typed content file. There is no CMS, no database, no backend. Everything is statically built and served from a CDN. Updating the site is "edit `src/content/siteData.ts`, push, redeploy."

The visible feature set:

- **Five client-side routes**, with React Router v6 and a 404-to-home fallback.
- **Light + dark theme** with system-preference detection and `localStorage` persistence.
- **Premium motion**: scroll-revealed sections, staggered grids, a magnetic button, a hand-rolled canvas mesh-blob hero graphic, a kinetic infinite-marquee.
- **Floating glass dock navbar**, with an active-pill that morphs between links via `motion.layoutId`.
- **Mobile menu** that overlays the full screen with staggered link reveals.
- **Contact form** posted to Netlify Forms with optimistic submit/success/error states, honeypot anti-spam, and focus management for screen readers.
- **Resume page** with PDF preview, download link, and an HTML transcript of the full content.

What makes it production-shape rather than a template:

- All content is **typed** through interfaces in `src/types/content.ts` — the compiler enforces shape when I edit any entry.
- Every project and certification is in one ordered array; a `starred` flag drives "flagship first" ordering across every surface.
- The visual primitives (Reveal, StaggerGroup/Item, SpotlightCard, MagneticButton, CanvasMeshBlob, Marquee, NoiseOverlay) are **respectful of motion preferences** — `useReducedMotion()` is honoured everywhere.
- The canvas hero animation **caps itself at 30fps**, retunes for `prefers-reduced-motion`, and listens to the `dark`/`light` class on `<html>` to swap palette without remounting.

---

## 2. High-Level Architecture

```
+--------------------------------------------------------------+
|                       User's Browser                         |
|                                                              |
|  +-----------------+    +-------------------------------+    |
|  | index.html      |    | dist/assets/                  |    |
|  | <div id="root"> |    | index.<hash>.js  index.<hash> |    |
|  |                 |    | .css  fonts, svgs, resume.pdf |    |
|  +--------+--------+    +-------------------------------+    |
|           |                                                  |
|           v                                                  |
|  +--------------------------------------------+              |
|  | <ThemeProvider>                            |              |
|  |   <Seo>                                    |              |
|  |   <ScrollToTop>                            |              |
|  |   <MainLayout>                             |              |
|  |     <Navbar /> <main><Outlet /></main>     |              |
|  |     <Footer />                             |              |
|  |   </MainLayout>                            |              |
|  | </ThemeProvider>                           |              |
|  +-------+----------------+-------------------+              |
|          |                |                                  |
|          v                v                                  |
|   <Routes> (react-router-dom v6)                             |
|   ├── /          → <HomePage />                              |
|   ├── /about     → <AboutPage />                             |
|   ├── /projects  → <ProjectsPage />                          |
|   ├── /resume    → <ResumePage />                            |
|   ├── /contact   → <ContactPage />                           |
|   └── *          → <Navigate to="/" replace />               |
|                                                              |
|                          All pages read from                 |
|                          src/content/siteData.ts             |
+--------------------------------------------------------------+
```

There is no server-side runtime. Vite produces a hashed static bundle; pages route on the client. The contact form is the only outgoing request, and it posts to `/` (Netlify intercepts it via the `data-netlify="true"` form attribute).

---

## 3. Tech Stack at a Glance

| Layer | Technology | Purpose |
|---|---|---|
| Framework | **React 18** | UI components and hooks |
| Routing | **react-router-dom 6** | Client-side routing, `<NavLink>` active state |
| Language | **TypeScript 5** | Type safety on content and components |
| Build | **Vite 5** + **@vitejs/plugin-react-swc** | Dev server with HMR, production bundle |
| Styling | **Tailwind CSS 3** | Utility-first CSS, custom theme tokens |
| Motion | **Framer Motion 11** | Scroll reveals, layout animations, page transitions |
| Icons | **@phosphor-icons/react** | SVG icon set (regular, bold, fill, duotone weights) |
| Class helper | **clsx** | Conditional className composition (`cn` utility) |
| Forms | Netlify Forms | No-JS backend for the contact form |
| Hosting | Netlify (designed for) | Static hosting + form handling |

There is no global store, no data-fetching library, no test framework. The entire app is presentational with hand-rolled component state where it matters (theme, contact form, canvas animation).

---

## 4. Project Layout

```
my-portfolio-app/
├── index.html                       # Vite HTML shell, mounts #root
├── vite.config.ts                   # @vitejs/plugin-react-swc, no aliases
├── tailwind.config.ts               # Theme tokens: colors, fonts, shadows, animations
├── postcss.config.cjs               # Tailwind + autoprefixer
├── tsconfig.json
├── package.json
├── README.md
├── AGENTS.md / CLAUDE.md            # GitNexus instructions for AI agents
├── public/
│   ├── resume.pdf                   # The downloadable PDF resume
│   ├── README-resume-placeholder.md
│   └── _redirects                   # Netlify rewrite for SPA fallback
└── src/
    ├── main.tsx                     # React root: BrowserRouter + <App />
    ├── App.tsx                      # ThemeProvider + Seo + ScrollToTop + MainLayout + Routes
    ├── index.css                    # @tailwind base/components/utilities + CSS variables
    ├── vite-env.d.ts
    ├── content/
    │   └── siteData.ts              # ALL site content (name, projects, experience, etc.)
    ├── types/
    │   └── content.ts               # TypeScript interfaces that shape siteData
    ├── context/
    │   └── ThemeContext.tsx         # Theme state + provider + useTheme hook
    ├── layouts/
    │   └── MainLayout.tsx           # Navbar + <main> + Footer + NoiseOverlay
    ├── pages/
    │   ├── Home.tsx                 # Hero, marquee, featured projects, toolkit
    │   ├── About.tsx                # Personal narrative + skills + experience
    │   ├── Projects.tsx             # Full project archive
    │   ├── Resume.tsx               # PDF embed + HTML transcript
    │   └── Contact.tsx              # Contact info + Netlify form
    ├── components/
    │   ├── Navbar.tsx               # Floating dock nav with motion.layoutId pill
    │   ├── Footer.tsx
    │   ├── ScrollToTop.tsx          # Scroll to top on route change
    │   ├── PageTransition.tsx       # Wraps each page in a fade-in motion.div
    │   ├── Seo.tsx                  # Sets <title>/<meta> from siteData.seo
    │   ├── ProjectCard.tsx          # Per-project card: header, body, metrics, tech, links
    │   ├── SectionHeader.tsx        # The "01 — Eyebrow / Big title / Description" header
    │   ├── Button.tsx               # Primary/outline/ghost button with arrow accent
    │   ├── Tag.tsx                  # Small pill (used for tech, skill chips)
    │   ├── Inputs.tsx               # TextInput + TextArea with label/error
    │   ├── ThemeToggle.tsx          # Sun/Moon button wired to ThemeContext
    │   └── visual/
    │       ├── NoiseOverlay.tsx     # Full-screen SVG grain background
    │       ├── Marquee.tsx          # Infinite horizontal scroll
    │       ├── Reveal.tsx           # Fade-up on enter (Reveal, StaggerGroup, StaggerItem)
    │       ├── SpotlightCard.tsx    # Card with cursor-following highlight
    │       ├── MagneticButton.tsx   # Button that gravitates toward the cursor
    │       └── CanvasMeshBlob.tsx   # Canvas-2D mesh blob hero animation
    └── utils/
        ├── cn.ts                    # Tiny clsx-based className helper
        └── sortProjects.ts          # sortStarredFirst() — starred → featured → year
```

---

## 5. How to Run Locally

### Prerequisites

- **Node.js 18 or later** (any recent LTS).
- npm (bundled with Node).

### Setup

```bash
cd my-portfolio-app
npm install
npm run dev
```

The dev server starts on `http://localhost:5173` (Vite default). HMR is on by default — edits to any `.tsx` or `.css` reflect instantly without losing component state.

### Build

```bash
npm run build      # writes a static bundle to dist/
npm run preview    # serves dist/ on a local HTTP port for smoke-testing
```

Builds are pure static output: HTML, hashed JS/CSS, fonts, the `resume.pdf` from `public/`. No env vars are required at build time.

---

## 6. How to Deploy

The repo includes a `public/_redirects` file with a SPA fallback so any deep URL (e.g. `/projects`) resolves to `/index.html`. That makes it a natural fit for Netlify.

### Netlify

1. Push to GitHub.
2. <https://app.netlify.com> → **Add new site** → **Import an existing project**.
3. Netlify auto-detects Vite. Confirm: build command `npm run build`, publish directory `dist`.
4. Deploy.

The contact form needs no additional setup — Netlify reads `data-netlify="true"` and `name="contact"` off the form during the post-deploy crawl and automatically wires it up. Form submissions show up under the site's **Forms** tab.

### Vercel

Works equally well. There is no Netlify-specific code paths beyond the form; if you deploy to Vercel, you'd need to replace the form post target with a Vercel Form action (or any other form-handling endpoint like Formspree or Resend).

---

## 7. Code Deep-Dive

### 7.1 `src/main.tsx` — entry point

Standard React 18 mount:

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

`<BrowserRouter>` is set up here so `useNavigate`, `useLocation`, and `<Routes>` work anywhere inside `<App />`.

### 7.2 `src/App.tsx` — the route tree

```tsx
<ThemeProvider>
  <Seo />
  <ScrollToTop />
  <MainLayout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </MainLayout>
</ThemeProvider>
```

A few decisions worth calling out:

- The `<MainLayout>` is **outside** `<Routes>` rather than as a parent route (`<Route element={<Layout />}>`). Both patterns work; this one is more explicit when the layout is a fixed shell.
- `<Seo />` runs once at the top level; it imperatively sets `document.title` from `siteData.seo.title`. This is cheap and avoids pulling in `react-helmet`.
- `<ScrollToTop />` is a 13-line component that listens to `useLocation()` and calls `window.scrollTo(0, 0)` on path change — required because SPA navigations don't reset scroll the way full page loads do.
- The catch-all `<Navigate to="/" replace />` handles 404s by sending the user to home with a replace (so the bad URL doesn't pollute history).

### 7.3 `src/context/ThemeContext.tsx` — theming

Theme is one of three sources of truth, in order of priority:

1. `localStorage.getItem('portfolio-theme')` if present (`'light'` or `'dark'`).
2. `prefers-color-scheme: dark` from `window.matchMedia`.
3. Default to `'dark'`.

The provider does three things on initial mount:

```ts
useEffect(() => {
  const initial = getPreferredTheme();
  setTheme(initial);
}, []);
```

And on every subsequent theme change:

```ts
useEffect(() => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  localStorage.setItem('portfolio-theme', theme);
}, [theme]);
```

The Tailwind config is set to `darkMode: 'class'`, so toggling `.dark` on `<html>` is what flips every `dark:bg-*` / `dark:text-*` class throughout the tree.

Components consume the context via `useTheme()`. The hook throws if called outside `<ThemeProvider>` — a common defensive pattern that surfaces structural bugs immediately.

### 7.4 `src/content/siteData.ts` — single source of truth for content

Everything user-visible (name, role, projects, experience, certifications, contact links, SEO copy, resume summary) lives in one object exported as `siteData`. The TypeScript shape is enforced by `SiteData` from `src/types/content.ts`.

Why one file:

- Updating my résumé and the site is one git commit.
- The compiler immediately complains if I forget a required field on a new project.
- No build-time content pipeline (no MDX, no Contentful, no Notion API) — zero moving parts in CI.

Key shapes:

- `Project` — `{ id, title, tagline, description, tech[], links?[], year, role, status, kind, featured?, starred?, metrics? }`. `status` is a union: `'live' | 'shipped' | 'in-progress' | 'archived'`. `starred` is reserved for **one** flagship project at a time.
- `ExperienceItem` — role/company/start/end/description.
- `Certification` — title/issuer/date with optional verify URL.
- `ContactConfig` — email, phone, github, linkedin.

`sortStarredFirst` in `src/utils/sortProjects.ts` is the single sort comparator used everywhere. It puts the starred entry first, then ranks by `featured`, then by `year` (descending). This guarantees consistent ordering across the Home hero, Projects archive, and Resume grid.

### 7.5 `src/layouts/MainLayout.tsx` — the page shell

```tsx
<div className="relative flex min-h-[100dvh] flex-col bg-surface text-fg">
  <NoiseOverlay />
  <Navbar />
  <main id="main-content" className="flex-1 pt-24 sm:pt-28">
    {children}
  </main>
  <Footer />
</div>
```

Three things to notice:

- `100dvh` — dynamic viewport height. Avoids the iOS Safari "100vh is wrong with the URL bar" bug.
- `<NoiseOverlay />` is a fixed-position SVG grain texture sitting above the background but below content, giving every page a subtle film-grain texture.
- `pt-24 sm:pt-28` reserves vertical space for the fixed floating navbar.

### 7.6 `src/components/Navbar.tsx` — the floating dock

A 211-line component that does a lot in a small footprint. The key visual idea is a **floating, pill-shaped dock** detached from the viewport edges, with a glass-tinted blurred background.

The clever animation is the active-link indicator. When you click between nav items, a soft pill background **slides between them** via `motion.layoutId`:

```tsx
{({ isActive }) => (
  <>
    {isActive && (
      <motion.span
        layoutId="nav-pill"
        className="absolute inset-0 -z-10 rounded-full bg-[color:var(--accent-soft)]"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
    {item.label}
  </>
)}
```

Framer Motion knows two elements that share a `layoutId` are "the same" and interpolates layout between them. So the pill smoothly translates from /about to /projects when the user clicks.

The mobile menu (rendered only when `open` is true) is a full-viewport overlay with staggered link reveals. Body scroll is locked while open (`document.body.style.overflow = 'hidden'`), and the menu closes on `Escape` via a window keydown listener that's only attached while `open` is true.

### 7.7 `src/pages/Home.tsx` — the hero, marquee, featured grid, toolkit

The home page is 364 lines but structurally simple — four sections:

**1. Hero** (top). A two-column grid: an editorial text block on the left (avatar pill → big "Thinh Tran — software engineer / CS student." headline with the period in amber → intro paragraph → CTA buttons → 3-stat grid), and a custom "current-build" graphic panel on the right.

The graphic panel is built from layered absolutely-positioned elements:

- `<CanvasMeshBlob />` (animated background, see 7.10).
- An SVG grid pattern with `mix-blend-overlay`.
- HUD-style corner markers (`tt.studio / hero.field`, latitude/longitude, revision number).
- Floating "status chips" (a spinning icon next to "building · ginger v2.4" and "live: gingercuisine.app").
- A central glass-panel stat tile showing the project currently being compiled.

The result reads like a developer's dashboard rather than a generic stock illustration.

**2. Kinetic marquee** — `<Marquee>` shows ~25 technology names sliding across at 40s/loop. The Marquee component duplicates its children once and animates `transform: translateX(0 → -50%)`, so the seam is invisible. Pauses on `prefers-reduced-motion`.

**3. Selected work** — Bento layout. The starred flagship project gets a full-width card; three featured projects follow in a 3-column grid. Both groups use `<Reveal>` and `<StaggerGroup>` so they fade-up as they enter the viewport.

**4. Toolkit** — three `<SpotlightCard>`s side by side, showing languages / frameworks / tools / infra from `siteData.skills.*`. The spotlight component renders a hover-following radial gradient so the card has subtle aliveness.

### 7.8 `src/pages/About.tsx`, `Projects.tsx`, `Resume.tsx`, `Contact.tsx`

**About** — three paragraphs of personal narrative, then a "skills" matrix, then an "experience" timeline using the same `<SpotlightCard>` building block.

**Projects** — the full archive sorted via `sortStarredFirst`. Each project gets a `<ProjectCard>` (see 7.9). Could add filter chips by `kind` in the future; not implemented today.

**Resume** — embeds the `public/resume.pdf` via an `<iframe>` and exposes a download button. Below the PDF is the same content as an HTML transcript so screen-readers and search engines can read it.

**Contact** — split into two columns. Left: directory of links (Email, GitHub, LinkedIn, Phone) as a hover-animated list, plus locale chips. Right: a Netlify-backed contact form with full client-side validation:

```ts
if (!name.trim()) next.name = 'Please enter your name.';
if (!email.trim()) next.email = 'Please enter your email.';
else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email address.';
```

The form is wired up to Netlify with `data-netlify="true"`, a hidden `form-name` input, and a honeypot `bot-field`. On submit, it builds a `URLSearchParams` body and POSTs to `/` — Netlify's edge intercepts that and stores the submission.

States: `idle` → `submitting` (with a spinner) → `success` (focus jumps to the success heading via `successHeadingRef.current?.focus()` for screen-reader announcement) or `error` (banner with a "Try again" button).

### 7.9 `src/components/ProjectCard.tsx`

The card is the workhorse component. It renders six layers from top to bottom:

1. **Index + year + status badge + flagship star** (top-left), with a primary action arrow button (top-right) that opens the project's "Live" or "Demo" link, falling back to GitHub, falling back to the first link.
2. **Title + tagline + description** — the heart of the card. Uses `text-wrap: balance` on the title and `text-wrap: pretty` on the body for typographic polish.
3. **Highlight strip** — an all-caps amber callout (optional, used for the most striking line per project).
4. **Metrics grid** — up to 3 `{label, value}` pairs, displayed monospace, mirroring a dashboard.
5. **Tech tags** — first 6, plus a "+N more" tag if there are extras, all rendered via `<Tag>`.
6. **Link row** — primary "Live" button styled inverted (`bg-fg`), secondary GitHub/README links as outlined pills.

Status badge colors map via the `statusLabel` object:

| Status | Color tone |
|---|---|
| `live` | green |
| `shipped` | amber |
| `in-progress` | sky |
| `archived` | zinc |

### 7.10 `src/components/visual/CanvasMeshBlob.tsx`

The most non-trivial component in the repo: a hand-rolled animated background using 2D canvas (no WebGL, no dependencies). Three "blobs" drift inside the canvas, each painted as a radial gradient that fades to transparent. The blobs bounce off walls (simple `vx *= -1` reflection when they cross thresholds).

Three optimizations make it cheap:

- **30 FPS cap.** `FRAME_BUDGET_MS = 1000 / 30`. If `now - lastTime < budget`, skip the redraw and re-schedule. So the canvas runs at half-rate but looks smooth enough to read as motion.
- **DPR clamp.** `dpr = Math.min(window.devicePixelRatio || 1, 2)` — never scale up beyond 2× even on Retina displays. Above 2× the perceptual gain is negligible while the cost quadruples.
- **`prefers-reduced-motion` aware.** If the OS preference is set, blobs stop drifting (`vx`, `vy` aren't applied) — the canvas still renders the static composition.

Two observers keep it responsive:

- `ResizeObserver` redraws when the panel resizes.
- `MutationObserver` watches `<html>`'s class list and re-inits the palette when the user toggles light/dark mode, so the canvas doesn't have to remount.

Cleanup on unmount cancels the RAF, disconnects observers, and removes the media-query listener — no leaks.

### 7.11 `src/components/visual/Reveal.tsx`

Three exports:

- **`<Reveal>`** — wraps a section and fades it in (opacity, vertical translate, blur) on scroll. Uses Framer Motion's `whileInView` (IntersectionObserver under the hood), with `viewport={{ once: true, amount: 0.2 }}` so the animation fires only once when 20% of the section is visible.
- **`<StaggerGroup>`** — a parent that staggers its children's reveal via `staggerChildren`.
- **`<StaggerItem>`** — a child variant that follows the parent's stagger.

All three respect `useReducedMotion()` — if the user prefers reduced motion, animations skip the translate/blur and only do an opacity fade.

The `ease` cubic-bezier `[0.32, 0.72, 0, 1]` is the project's "premium" easing — overshoot-free, with a strong initial acceleration. It's also defined in Tailwind under `transitionTimingFunction.premium` so utility classes can reuse it.

### 7.12 `src/components/visual/SpotlightCard.tsx`, `MagneticButton.tsx`, `Marquee.tsx`, `NoiseOverlay.tsx`

- **SpotlightCard** — listens to `mousemove` on the card, computes the cursor's position relative to the card's bounding rect, and updates two CSS custom properties (`--x`, `--y`). A pseudo-element radial-gradient uses those to paint a soft highlight that follows the cursor.
- **MagneticButton** — listens to mouse move within a radius and applies a `translate` so the button drifts slightly toward the cursor. Springs back on mouse leave. Respects `prefers-reduced-motion`.
- **Marquee** — duplicates its children once and animates `transform: translateX(0 → -50%)`, giving the illusion of an infinite scroll. Configurable speed via Tailwind's `animate-marquee-x` / `animate-marquee-x-slow`.
- **NoiseOverlay** — a 14-line component that renders a fixed-position SVG grain texture across the viewport at low opacity. Defined in `tailwind.config.ts` as `bg-grain` via a `data:` URL SVG.

### 7.13 `src/components/Button.tsx`, `Inputs.tsx`, `Tag.tsx`, `SectionHeader.tsx`

These are the small surface-level building blocks:

- **Button** — three variants (`primary`, `outline`, `ghost`), three sizes (`sm`, `md`, `lg`), an optional arrow accent (`withArrow` + `arrowDirection`). Renders as a `<Link>` if `to` is set, otherwise as a `<button>`. Composes class lists via `cn()`.
- **Inputs** — `TextInput` and `TextArea` wrappers that label themselves correctly, support an `error` prop that shows a sub-label, and use a uniform clay-ish input style with focus-visible rings.
- **Tag** — a simple rounded-pill chip with optional border/background style.
- **SectionHeader** — the "01 — Eyebrow / Big title / Description" header pattern used at the top of every page section. Two sizes (`md`, `lg`).

### 7.14 `src/utils/cn.ts` and `src/utils/sortProjects.ts`

```ts
import clsx, { type ClassValue } from 'clsx';
export const cn = (...args: ClassValue[]) => clsx(args);
```

Tiny wrapper over `clsx` so conditional class composition stays readable.

```ts
export function sortStarredFirst(projects: Project[]) {
  return [...projects].sort((a, b) => {
    if (a.starred && !b.starred) return -1;
    if (b.starred && !a.starred) return 1;
    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;
    return Number(b.year) - Number(a.year);
  });
}
```

One sort to rule them all — used in HomePage's hero featured row, ProjectsPage's archive, and ResumePage's project grid.

### 7.15 `tailwind.config.ts` — the design system in 96 lines

Custom theme extensions worth knowing:

- **Color palettes.** `ink` (cool charcoal scale from `#F4EFE6` to `#06060A`), `amber` (warm honey scale used for accents), `sage` (small green palette for "live" badges).
- **Font families.** `display: Fraunces` (a variable serif with a `SOFT` axis used in the hero italic), `sans: Geist`, `mono: JetBrains Mono`.
- **Letter spacing.** Custom `tightest: -0.04em` and `tighter2: -0.025em` for big display headlines.
- **Box shadows.** `inner-edge` / `inner-edge-light` (subtle inset shadows that give cards depth), `diffuse-dark` / `diffuse-light` (large soft drop shadows).
- **`transitionTimingFunction.premium`.** The `[0.32, 0.72, 0, 1]` cubic-bezier used app-wide.
- **Animations.** `marquee-x`, `spin-slow`, `float-y`, `pulse-dot` — all defined with keyframes inline.
- **`bg-grain`.** A `data:` SVG that paints a noise texture (used by `NoiseOverlay`).

The site does **not** opt into Tailwind's typography or forms plugins — the design system is small enough that hand-rolled classes are more maintainable.

### 7.16 `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Plus a `:root` block defining CSS custom properties (`--bg`, `--bg-elev`, `--fg`, `--muted`, `--line`, `--accent`, `--accent-soft`, `--surface`) for the light theme, and a `.dark` block overriding them for dark mode. Tailwind utility classes like `bg-elev` and `text-muted` are defined in the config to read from these variables, so the theme switch is a single class toggle on `<html>` with zero JS re-rendering needed.

---

## 8. Data Flow End-to-End

Two flows worth tracing.

### Initial page load

```
Browser                            React tree
   |                                    |
   |-- GET /index.html ---------------->|
   |<-- HTML + <script> bundle          |
   |                                    |
   |-- evaluate bundle                  |
   |                                    |-- main.tsx mounts
   |                                    |    BrowserRouter + <App />
   |                                    |
   |                                    |-- ThemeProvider:
   |                                    |   - read localStorage 'portfolio-theme'
   |                                    |   - if none, check prefers-color-scheme
   |                                    |   - setState; toggle .dark on <html>
   |                                    |
   |                                    |-- Seo: document.title = siteData.seo.title
   |                                    |
   |                                    |-- MainLayout:
   |                                    |   <NoiseOverlay>, <Navbar>, <main>, <Footer>
   |                                    |
   |                                    |-- Routes:
   |                                    |   match location.pathname
   |                                    |   → render matching Page component
   |                                    |
   |                                    |-- Page renders SectionHeader, Reveal/Stagger
   |                                    |   IntersectionObserver fires as user scrolls
   |                                    |   Animations play with framer-motion
   |                                    |
   |   user clicks <NavLink to="/about">|
   |                                    |
   |                                    |-- React Router updates URL via history.push
   |                                    |-- ScrollToTop fires (window.scrollTo(0,0))
   |                                    |-- Routes re-evaluates, renders <AboutPage />
   |                                    |-- Navbar's motion.layoutId pill slides
   |   user sees /about; no full reload |
```

### Contact form submit

```
Browser                                 Netlify
   |                                       |
   |-- user fills name/email/message       |
   |   types subject or picks chip         |
   |                                       |
   |-- click Send                          |
   |   validate() returns true             |
   |   setStatus('submitting')             |
   |                                       |
   |   POST / (form body URL-encoded) ---->|
   |                                       |-- Edge intercepts (data-netlify="true")
   |                                       |-- verify form-name=contact
   |                                       |-- store submission
   |                                       |-- (optional notifications fire)
   |                                       |
   |<-- 200 OK ----------------------------|
   |   setStatus('success')                |
   |   focus moves to success heading      |
   |   for screen-reader announcement      |
```

If Netlify returns non-OK or the fetch throws, `setStatus('error')` flips the form into the error banner with a "Try again" reset button.

---

## 9. Content Maintenance

This is the only file most updates ever touch:

**`src/content/siteData.ts`**

| To add … | Edit … |
|---|---|
| A new project | Append to `projects: [...]`. TypeScript will require `id`, `title`, `tagline`, `description`, `tech[]`, `year`, `role`, `status`, `kind`. Optional: `featured`, `starred`, `links`, `metrics`, `highlight`. |
| A new experience role | Append to `experience: [...]`. Fields: `id`, `role`, `company`, `location?`, `start`, `end`, `description`. |
| A new certification | Append to `certifications: [...]`. Fields: `id`, `title`, `issuer`, `date`, `description?`, `verifyUrl?`. |
| Change tagline / hero intro | Replace `heroTagline` / `heroIntro` strings. |
| Change SEO meta | Edit `seo.title` / `seo.description`. `<Seo />` uses these on mount. |
| Change contact info | Edit `contact.email`, `contact.github`, `contact.linkedin`, `contact.phone`. |

After editing, restart isn't needed in dev — Vite hot-reloads the change instantly. For deploy, just `git push`; Netlify runs `npm run build` on its end.

---

## 10. Plain-English Glossary

**App Router (Tailwind dark mode):** A Tailwind 3 config option (`darkMode: 'class'`) that toggles dark variants based on whether a `.dark` class exists on `<html>` or any ancestor. The opposite mode is `'media'`, which uses `prefers-color-scheme`.

**`bg-grain`:** A custom Tailwind background utility defined in `tailwind.config.ts` that paints an SVG-generated noise texture. Used by `NoiseOverlay`.

**Bento layout:** Magazine-style layout with one feature tile and several smaller supporting tiles. Home page's "Selected work" section uses this — flagship project gets the full width, three featured projects fill a 3-column grid underneath.

**Canvas mesh blob:** A custom 2D-canvas animation drawing three colored radial-gradient "blobs" that drift inside the canvas. No WebGL, no third-party library.

**Cubic-bezier `[0.32, 0.72, 0, 1]`:** The "premium" easing curve used across the site. Steep start, gentle end, no overshoot. Exposed both in Framer Motion `transition.ease` and as Tailwind's `ease-premium` utility.

**CSS custom property (CSS variable):** A `--name: value` declaration that can be read with `var(--name)`. The theme tokens live as CSS variables so toggling `.dark` overrides them in one place.

**Eyebrow (typography):** The small uppercase line above a section title (e.g. "Selected work" above the "My flagship..." heading). Pattern lives in `<SectionHeader>`.

**Fast Refresh:** React's hot-module-replacement-with-state mode, enabled by `@vitejs/plugin-react-swc`. Editing a component does not lose component state.

**Featured project:** A project flagged with `featured: true`. Used by the Home page hero section to surface a smaller subset of the archive. Flagship (`starred`) is a separate, single-project flag.

**Flagship project (starred):** The single project flagged with `starred: true`. Always rendered first across Home, Projects, and Resume via `sortStarredFirst`.

**Floating dock navbar:** The navbar pattern used here — pinned to top, but detached from the edges with rounded ends, glass background, and a subtle shadow. Inspired by the visual style of macOS Sequoia and Apple visionOS docks.

**Framer Motion `layoutId`:** Two `<motion.*>` elements with the same `layoutId` are treated as the same conceptual element across renders. Framer interpolates their position/size, producing a smooth slide animation when one mounts and the other unmounts.

**Honeypot field:** A hidden form input named `bot-field` that humans never see; if it's filled in on submit, the form is silently discarded as bot traffic. Pattern enforced by Netlify Forms.

**HMR (Hot Module Replacement):** Vite's mechanism for replacing changed modules in a running app without a full reload.

**`100dvh`:** Dynamic viewport height. Unlike `100vh`, which is fixed to the *initial* viewport, `100dvh` updates as the browser UI (URL bar, keyboard) shrinks or expands the visible area.

**Magnetic button:** A button that subtly translates toward the cursor when it's nearby, springing back on mouse leave. Component lives at `components/visual/MagneticButton.tsx`.

**Marquee (kinetic):** An infinitely scrolling row of items. Implemented by duplicating the children and animating `transform: translateX(0 → -50%)`.

**Mesh blob:** See "Canvas mesh blob".

**Motion preferences (`prefers-reduced-motion`):** An OS-level preference indicating the user wants animations minimized. Every motion primitive in this app reads `useReducedMotion()` from Framer Motion and disables drift/blur/translate when true.

**Netlify Forms:** A built-in Netlify feature that intercepts HTML form posts (any form on the deployed site with `data-netlify="true"`) and stores submissions in the dashboard. No backend code needed.

**Page transition:** A `<motion.div>` wrapper applied at the top of each page that fades the content in on mount. Defined once in `components/PageTransition.tsx`.

**`prefers-color-scheme`:** A CSS media query exposing the user's OS-level light/dark preference. Used here as the fallback when no `localStorage` theme is set.

**Reveal (scroll-triggered):** A fade-and-translate-up animation that fires when an element scrolls into view. Built on `whileInView` (IntersectionObserver under the hood).

**Sort starred first:** The comparator at `utils/sortProjects.ts` that ranks projects: starred → featured → year desc.

**SPA fallback:** A web-server rule that says "if no file matches, serve `/index.html`." Required for any client-side router because Netlify (or any host) would otherwise return a 404 for `/projects`. Configured here via `public/_redirects`.

**SpotlightCard:** A card that paints a cursor-following radial-gradient highlight inside its border. Used for project tiles, skill matrices, and other interactive panels.

**`text-wrap: balance` / `pretty`:** CSS properties that improve typographic flow. `balance` keeps every line of a short heading roughly equal width; `pretty` reduces orphans/widows in body text.

**Theme token:** A semantic color/spacing/typography variable defined once and reused everywhere. Examples: `--bg`, `--fg`, `--accent-soft`. Lives in `src/index.css` and is referenced by Tailwind utility classes.

**Variable font (Fraunces `SOFT`):** A font with continuously-tunable axes. The hero italic uses `fontVariationSettings: '"SOFT" 100'` to push Fraunces toward its softer, more humanist end.

---

## 11. Common Tasks

### Add a new project

1. Open `src/content/siteData.ts`.
2. Add a new entry to `projects: [...]` — TypeScript will autocomplete the required fields.
3. Set `featured: true` if you want it on the Home page's selected-work grid (max 4 cards total).
4. Don't set `starred: true` unless you intend to replace the current flagship — only one project should carry that flag.
5. Save. Vite hot-reloads. Commit. Push.

### Change the flagship project

Find the entry currently flagged `starred: true`, change it to `starred: false`, and add `starred: true` to the new flagship. The Home hero and the Projects archive update automatically.

### Add a new route

1. Create `src/pages/Whatever.tsx`.
2. Import it in `App.tsx` and add `<Route path="/whatever" element={<WhateverPage />} />` inside `<Routes>`.
3. Add a corresponding entry to `navItems` in `src/components/Navbar.tsx` if you want it in the nav.

### Tweak the theme tokens

Edit the `:root` block (and `.dark` override) in `src/index.css`. The Tailwind utility classes that consume them (`bg-elev`, `text-muted`, etc.) are defined in `tailwind.config.ts` under `theme.extend.colors` — they read from the CSS variables, so changes propagate instantly without rebuilding Tailwind.

### Replace the resume PDF

Drop a new file at `public/resume.pdf` (same filename). The Resume page references it by path, so no other code changes are needed.

### Swap the Netlify form for a different backend

In `src/pages/Contact.tsx`'s `handleSubmit`:

- Remove the Netlify-specific bits (`data-netlify` attribute on `<form>`, hidden `form-name` input, honeypot).
- Replace the `fetch('/', { method: 'POST', body: encoded.toString() })` call with your endpoint (e.g. Resend, Formspree, a custom Cloudflare Worker).
- Keep the same status state machine (`idle` / `submitting` / `success` / `error`) — the UI doesn't need to change.

### Disable a motion primitive globally

The cleanest way is to wrap the affected component in a `useReducedMotion()` check yourself, or to add CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

This is heavy-handed but unambiguous.

### Add filter chips to the Projects page

The data is ready — every project has a `kind: 'fullstack' | 'frontend' | 'mobile' | 'extension' | 'data' | 'systems'`. Pattern:

1. Local state: `const [filter, setFilter] = useState<ProjectKind | 'all'>('all');`.
2. Filter chips above the grid, each clicking `setFilter(...)`.
3. `siteData.projects.filter(p => filter === 'all' || p.kind === filter)` before passing into the map.

---

## 12. Troubleshooting

**The page is blank on a deep URL like `/projects`.**

Your host isn't serving `/index.html` as the SPA fallback. On Netlify, this is automatic when `public/_redirects` is present. On Vercel, add `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`. On GitHub Pages, you need to set the `base` in `vite.config.ts` to your repo subpath and use a 404.html trick (not recommended; Netlify is simpler).

**Dark mode flashes light on initial load.**

The `ThemeProvider` reads `localStorage` *inside* a `useEffect`, so it runs after first paint. To prevent the flash, you can either (a) accept it (current behavior), or (b) inline a tiny script in `index.html` that sets the `.dark` class on `<html>` *before* React mounts — read from `localStorage` synchronously.

**Animations don't fire on iOS Safari < 15.**

`useReducedMotion` and `whileInView` require IntersectionObserver, which is supported back to iOS 12. If you're seeing failures on iOS, double-check that the user hasn't set "Reduce Motion" in Accessibility — that disables most transforms by design.

**Tailwind class doesn't apply (e.g. a class I just wrote).**

Tailwind purges classes that don't appear in source. If you constructed a class via string concatenation (`'bg-' + color`), Tailwind can't see it. Use a static class, or add the name to the `safelist` in `tailwind.config.ts`.

**The canvas mesh blob looks pixellated.**

`dpr` is clamped to 2. On 3× Retina displays (newer iPhones), the difference is barely visible. If you want crisper rendering at the cost of GPU, raise the cap in `CanvasMeshBlob.tsx`.

**Framer Motion warnings about `layoutId` collisions.**

Two `motion.span` elements both have `layoutId="nav-pill"` — that's intentional and is what powers the sliding pill animation. The warning only appears if more than one element is marked *active* at the same time. The fix is to confirm exactly one nav link's `isActive` is true; React Router v6 should guarantee that.

**Contact form submits succeed locally but Netlify shows no entries.**

Netlify discovers forms by crawling the post-build `index.html`. The form must contain a hidden `<input name="form-name" value="contact" />`, and the `<form>` element must have `data-netlify="true"`. Verify both are still present after any refactor. Re-deploy after any change to the form structure — Netlify caches its discovery results.

**`Type error: Property 'X' does not exist on type 'Project'` after editing `siteData.ts`.**

You added a field that isn't on the `Project` interface in `src/types/content.ts`. Either add the field to the interface, or remove it from the data. Keep the interface tight — every undocumented field is a future maintenance trap.

**Resume PDF doesn't render in an `<iframe>`.**

Some browsers block PDF inline rendering. Fall back to a download link (the Resume page already includes one). If you want a more reliable in-page renderer, swap the iframe for `react-pdf` (but that adds ~200KB to the bundle).

**Theme toggle visually flickers but doesn't change.**

Probably means another `useEffect` is writing the wrong class to `<html>`. Search for `.classList.add('dark')` and `.classList.add('light')` — there should be exactly one writer (in `ThemeContext.tsx`).
