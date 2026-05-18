import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUpRight,
  CircleNotch,
  Code,
  Lightning,
  MapPin,
  Stack,
} from '@phosphor-icons/react';
import { Button } from '../components/Button';
import { PageTransition } from '../components/PageTransition';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeader } from '../components/SectionHeader';
import { Marquee } from '../components/visual/Marquee';
import CanvasMeshBlob from '../components/visual/CanvasMeshBlob';
import { Reveal, StaggerGroup, StaggerItem } from '../components/visual/Reveal';
import { SpotlightCard } from '../components/visual/SpotlightCard';
import { siteData } from '../content/siteData';
import { sortStarredFirst } from '../utils/sortProjects';

const techMarqueeItems = [
  'TypeScript',
  'Next.js',
  'React',
  'FastAPI',
  'PostgreSQL',
  'MongoDB',
  'Prisma',
  'Tailwind CSS',
  'Framer Motion',
  'Spring Boot',
  'React Native',
  'JavaFX',
  'Stripe',
  'Resend',
  'Upstash',
  'Vercel',
  'Koyeb',
  'Neon',
  'Netlify',
  'GitHub Actions',
  'Docker',
  'pytest',
  'Recharts',
  'Zustand',
  'Redux Toolkit',
];

export const HomePage: React.FC = () => {
  const featured = sortStarredFirst(siteData.projects.filter((p) => p.featured));
  const featuredTop = featured[0];
  const featuredRest = featured.slice(1, 4);

  return (
    <PageTransition>
      {/* ───────────── HERO ───────────── */}
      <section className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left: editorial text block */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] tabular">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-green-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                </span>
                Available · Fall 2026 co-op
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                <MapPin weight="regular" className="-mt-0.5 mr-1 inline-block h-3 w-3" />
                Toronto
              </span>
            </div>

            <h1
              className="mt-7 font-display text-[clamp(48px,8vw,108px)] font-light leading-[0.94] tracking-tightest text-fg"
              style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}
            >
              Thinh Tran —
              <br />
              <span className="italic text-fg/85" style={{ fontVariationSettings: '"SOFT" 100' }}>
                software engineer
              </span>{' '}
              <span className="text-muted">/</span>{' '}
              <span className="text-fg">CS student</span>
              <span className="text-amber-400">.</span>
            </h1>

            <p
              className="mt-7 max-w-xl text-[16px] leading-relaxed text-muted"
              style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
            >
              {siteData.heroIntro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/projects" size="lg" variant="primary" withArrow>
                View selected work
              </Button>
              <Button to="/contact" size="lg" variant="outline" withArrow>
                Get in touch
              </Button>
              <Link
                to="/resume"
                className="group inline-flex items-center gap-1.5 px-2 py-2 text-[14px] tracking-tight text-muted underline-offset-4 hover:text-fg hover:underline focus-ring"
              >
                Read resume
                <ArrowUpRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6 text-muted">
              <div>
                <p className="font-display text-2xl font-light tabular text-fg">9</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]">Shipped projects</p>
              </div>
              <div>
                <p className="font-display text-2xl font-light tabular text-fg">76</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]">Backend tests</p>
              </div>
              <div>
                <p className="font-display text-2xl font-light tabular text-fg">2027</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]">B.A. CS · York</p>
              </div>
            </div>
          </div>

          {/* Right: hero special graphic */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] border border-line bg-elev">
              <div className="absolute inset-0">
                <CanvasMeshBlob className="absolute inset-0" />
              </div>

              {/* concentric grid overlay */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full opacity-30 mix-blend-overlay"
                viewBox="0 0 400 500"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.4"
                      className="text-fg/30"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* HUD: corner markers */}
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/70">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>tt.studio / hero.field</span>
              </div>
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fg/60">
                <div className="space-y-1">
                  <div>lat 43.6532°N</div>
                  <div>lng 79.3832°W</div>
                </div>
                <div className="text-right">
                  <div>rev 02</div>
                  <div>2025</div>
                </div>
              </div>

              {/* Floating status chips */}
              <div className="pointer-events-none absolute right-5 top-5 flex flex-col items-end gap-2 text-right">
                <span className="rounded-full border border-line bg-ink-900/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/80 backdrop-blur">
                  <CircleNotch weight="bold" className="mr-1.5 inline-block h-3 w-3 animate-spin-slow" />
                  building · ginger v2.4
                </span>
                <span className="rounded-full border border-line bg-ink-900/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/80 backdrop-blur">
                  <Lightning weight="fill" className="mr-1.5 inline-block h-3 w-3 text-amber-400" />
                  live: gingercuisine.app
                </span>
              </div>

              {/* Center stat tile */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 w-[78%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-ink-900/30 p-5 backdrop-blur-xl"
                style={{
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -25px rgba(0,0,0,0.5)',
                }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/60">
                  Now compiling
                </p>
                <p className="mt-2 font-display text-[28px] font-light leading-[1.05] tracking-tighter2 text-fg">
                  Historical Trade
                  <br />
                  Scenario Simulator
                </p>
                <div className="mt-3 flex items-center justify-between font-mono text-[10.5px] tabular text-fg/70">
                  <span>76 tests · pass</span>
                  <span className="text-amber-400">v0.8.2</span>
                </div>
              </div>
            </div>

            {/* underlay label */}
            <p className="mt-3 flex items-center justify-between px-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              <span>fig. 01 — current-build heatmap</span>
              <span className="tabular">{new Date().getFullYear()}</span>
            </p>
          </div>
        </div>

        {/* scroll cue */}
        <div className="mt-16 flex items-center justify-center gap-3 text-muted">
          <span className="h-px w-14 bg-line" />
          <ArrowDown weight="regular" className="h-3.5 w-3.5 animate-float-y" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em]">scroll</span>
          <span className="h-px w-14 bg-line" />
        </div>
      </section>

      {/* ───────────── KINETIC MARQUEE ───────────── */}
      <section aria-hidden="true" className="mt-24 border-y border-line py-8">
        <Marquee
          items={techMarqueeItems.map((t) => (
            <span
              key={t}
              className="font-display text-[42px] font-light tracking-tightest text-fg/90 sm:text-[58px]"
            >
              {t}
              <span className="mx-6 inline-block translate-y-[-0.2em] align-middle text-amber-400">
                ·
              </span>
            </span>
          ))}
        />
      </section>

      {/* ───────────── SELECTED WORK ───────────── */}
      <section className="container-page mt-28">
        <Reveal>
          <SectionHeader
            number="02"
            eyebrow="Selected work"
            title={
              <>
                My flagship,
                <br />
                and the work around it.
              </>
            }
            description="Pho Ginger is the project I'm proudest of — live in a real restaurant, real customers, real money. Below it: three more I'm putting my name on."
          />
        </Reveal>

        {/* Bento: featured top wide, then 3 in a row */}
        {featuredTop && (
          <Reveal delay={0.1} className="mt-12">
            <ProjectCard project={featuredTop} index={1} className="lg:hover:scale-[1.005]" />
          </Reveal>
        )}

        {featuredRest.length > 0 && (
          <StaggerGroup className="mt-6 grid gap-6 md:grid-cols-3">
            {featuredRest.map((p, i) => (
              <StaggerItem key={p.id}>
                <ProjectCard project={p} index={i + 2} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        <div className="mt-10 flex justify-center">
          <Button to="/projects" variant="outline" withArrow>
            See all {siteData.projects.length} projects
          </Button>
        </div>
      </section>

      {/* ───────────── WHAT I WORK WITH ───────────── */}
      <section className="container-page mt-32">
        <Reveal>
          <SectionHeader
            number="03"
            eyebrow="Toolkit"
            title={
              <>
                What I reach for,
                <br />
                and why.
              </>
            }
            description="A working list of the languages, frameworks, and infrastructure I use most often. I pick boring, well-understood tech and let the design system carry the personality."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <SpotlightCard coreClassName="p-8 h-full">
              <div className="flex items-center justify-between">
                <Code weight="duotone" className="h-6 w-6 text-amber-400" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  01 · Languages
                </span>
              </div>
              <ul className="mt-6 space-y-2 text-[14.5px] text-fg">
                {siteData.skills.languages.map((s) => (
                  <li key={s} className="flex items-center justify-between border-b border-line py-1.5">
                    <span>{s}</span>
                    <span className="font-mono text-[10px] tabular text-muted">·</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem>
            <SpotlightCard coreClassName="p-8 h-full">
              <div className="flex items-center justify-between">
                <Stack weight="duotone" className="h-6 w-6 text-amber-400" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  02 · Frameworks
                </span>
              </div>
              <ul className="mt-6 space-y-2 text-[14.5px] text-fg">
                {siteData.skills.frameworks.map((s) => (
                  <li key={s} className="flex items-center justify-between border-b border-line py-1.5">
                    <span>{s}</span>
                    <span className="font-mono text-[10px] tabular text-muted">·</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem>
            <SpotlightCard coreClassName="p-8 h-full">
              <div className="flex items-center justify-between">
                <Lightning weight="duotone" className="h-6 w-6 text-amber-400" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  03 · Tools & infra
                </span>
              </div>
              <ul className="mt-6 space-y-2 text-[14.5px] text-fg">
                {siteData.skills.tools.map((s) => (
                  <li key={s} className="flex items-center justify-between border-b border-line py-1.5">
                    <span>{s}</span>
                    <span className="font-mono text-[10px] tabular text-muted">·</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>
        </StaggerGroup>
      </section>
    </PageTransition>
  );
};
