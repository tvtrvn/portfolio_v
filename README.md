## CS Student Portfolio — React + Vite + TypeScript + Tailwind

Modern, multi-page portfolio site built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **React Router**. Designed for easy customization and deployment to **Netlify**.

Pages:

- **Home**: Hero, quick intro, highlights, CTAs
- **About**: Longer bio, grouped skills, timeline/experience
- **Projects**: Filterable/searchable project cards
- **Resume**: Embedded PDF viewer + text summary
- **Contact**: Netlify-powered contact form + direct links

All main content lives in a single file: `src/content/siteData.ts`.

---

### 1. Prerequisites

- **Node.js**: v18+ recommended
- **npm** (comes with Node)

Check versions:

```bash
node -v
npm -v
```

---

### 2. Install and run locally

From the project root:

```bash
cd my-portfolio-app
npm install
npm run dev
```

Then open the URL printed by Vite (typically `http://localhost:5173`).

To run a production build locally:

```bash
npm run build
npm run preview
```

This builds into the `dist` folder and serves a local preview.

---

### 3. Customizing your content

Most content is defined in one place: `src/content/siteData.ts`.

Open that file and update:

- **Basic info**
  - `name`: Your full name
  - `role`: e.g. `"Computer Science Student"`
  - `location`: Optional string
  - `heroTagline` and `heroIntro`: Short intro that appears on the Home page
- **Highlights**
  - `heroHighlights`: Array of sections like `"Skills"`, `"Interests"`, `"Currently learning"`
- **About**
  - `about.paragraphs`: Longer bio paragraphs shown on the About page
- **Skills**
  - `skills.languages`: e.g. `['TypeScript', 'Python', 'C++']`
  - `skills.frameworks`: e.g. `['React', 'Node.js', 'Tailwind CSS']`
  - `skills.tools`: e.g. `['Git', 'VS Code', 'Linux']`
- **Experience / timeline**
  - `experience`: Array of entries with `role`, `company`, `location`, `start`, `end`, `description`
- **Projects**
  - `projects`: At least 3 projects, each with:
    - `title`
    - `description`
    - `tech`: array of tags (used for filters)
    - `links`: optional array like `{ label: 'GitHub', href: 'https://...' }`
    - `highlight`: optional short highlight line
- **Contact**
  - `contact.email`: Used for `mailto:` links and contact fallback
  - `contact.github`: Your GitHub profile URL
  - `contact.linkedin`: Your LinkedIn URL
- **Resume config**
  - `resume.fileName`: Should normally stay `"resume.pdf"`
  - `resume.summary`: Text-based bullet summary (used as fallback on the Resume page)
- **SEO defaults**
  - `seo.title`: Default document title
  - `seo.description`: Default meta description

> Tip: After updating `siteData.ts`, save and the site will hot-reload during `npm run dev`.

---

### 4. Adding your resume PDF

The Resume page expects your resume file at `public/resume.pdf`.

Steps:

1. Export your resume as a **PDF** from Google Docs, Word, LaTeX, etc.
2. Rename the file to **`resume.pdf`**.
3. Place it in the `public/` folder at the project root:

   ```text
   my-portfolio-app/
     public/
       resume.pdf   ← your file here
   ```

4. Keep `resume.fileName` in `src/content/siteData.ts` set to `"resume.pdf"` (or update it to match your filename).

The Resume page will:

- Embed the PDF with an `<iframe>`
- Provide **Open PDF** and **Download** buttons
- Show a text summary as a fallback

---

### 5. Dark mode

The site includes a **dark mode toggle** in the navbar. Your preference is stored in `localStorage` and respects system preference on first load.

No configuration required; you can adjust styling via `tailwind.config.ts` or component classes if desired.

---

### 6. SEO and favicon

Basic SEO tags are set in:

- `index.html` (initial title, description, OpenGraph image)
- `src/components/Seo.tsx` (runtime updates per page)

You can customize:

- `siteData.seo.title`
- `siteData.seo.description`

Favicon:

- A placeholder SVG favicon lives at `public/favicon.svg`. Replace it with your own SVG if you like (keep the name `favicon.svg` or update the reference in `index.html`).

---

### 7. Netlify configuration

This project is configured for Netlify out of the box.

**SPA redirects** (for React Router) are handled by:

- `public/_redirects`:

  ```text
  /* /index.html 200
  ```

**Build settings for Netlify:**

- **Build command**: `npm run build`
- **Publish directory**: `dist`

---

### 8. Deploying to Netlify

You have two easy options: drag-and-drop or Git-connected deployment.

#### Option A: Drag-and-drop deploy

1. Build the site locally:

   ```bash
   npm run build
   ```

2. This creates a `dist/` folder.
3. Go to the Netlify dashboard and create a new site.
4. Choose **“Deploy manually”** and **drag the `dist` folder** into the upload area.

Netlify will serve the static site from that folder, using the `_redirects` file for client-side routing.

#### Option B: Git-connected deploy

1. Initialize a Git repository (if you haven’t already) and push to GitHub/GitLab/Bitbucket:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. In Netlify, click **“Add new site” → “Import an existing project”**.
3. Connect your Git provider and choose your repo.
4. When prompted for settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Deploy. Netlify will automatically:
   - Install dependencies
   - Run `npm run build`
   - Host the built site
6. Future pushes to the main branch will trigger automatic redeploys.

---

### 9. Exact terminal commands to use

From the project root:

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (local development)
npm run dev

# 3. Create a production build
npm run build

# 4. Preview the production build locally (optional)
npm run preview
```

For Git + Netlify (Git-connected deploy), typical commands:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

---

### 10. Before you deploy — checklist

Go through this list to make sure your portfolio looks polished:

- **Update personal info**
  - [ ] Change `name`, `role`, `location`, `heroTagline`, and `heroIntro` in `src/content/siteData.ts`
- **Customize About & skills**
  - [ ] Edit `about.paragraphs` to reflect your story
  - [ ] Update `skills.languages`, `skills.frameworks`, and `skills.tools`
- **Projects**
  - [ ] Replace placeholder projects in `siteData.projects` with your real projects
  - [ ] Ensure each project has accurate `tech` tags and useful descriptions
  - [ ] Add correct `links` for live demos and GitHub repositories
- **Experience**
  - [ ] Review or add entries in `siteData.experience` (roles, internships, etc.)
- **Resume**
  - [ ] Add `public/resume.pdf` (your real resume)
  - [ ] Update `resume.summary` text bullets to match your current profile
- **Contact & socials**
  - [ ] Set `contact.email` to your preferred email
  - [ ] Set `contact.github` to your GitHub profile URL
  - [ ] Set `contact.linkedin` to your LinkedIn profile URL
- **SEO & appearance**
  - [ ] Tweak `seo.title` and `seo.description` in `siteData`
  - [ ] Replace `public/favicon.svg` with your own icon (optional)
- **Final verification**
  - [ ] Run `npm run build` locally and ensure it succeeds
  - [ ] Click through all pages (Home, About, Projects, Resume, Contact)
  - [ ] Test the contact form after deploying to Netlify (check submissions in the Netlify dashboard)

Once this checklist is complete, you’re ready to deploy and share your portfolio.

