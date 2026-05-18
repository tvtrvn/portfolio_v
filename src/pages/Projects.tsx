import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ArrowsClockwise,
  ChartLineUp,
  Code,
  DeviceMobile,
  GridFour,
  MagnifyingGlass,
  PuzzlePiece,
  Rows,
  Stack,
  Browser,
} from '@phosphor-icons/react';
import { Button } from '../components/Button';
import { TextInput } from '../components/Inputs';
import { PageTransition } from '../components/PageTransition';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeader } from '../components/SectionHeader';
import { Tag } from '../components/Tag';
import { Reveal, StaggerGroup, StaggerItem } from '../components/visual/Reveal';
import { SpotlightCard } from '../components/visual/SpotlightCard';
import { siteData } from '../content/siteData';
import type { Project, ProjectKind, ProjectStatus } from '../types/content';
import { cn } from '../utils/cn';
import { sortStarredFirst } from '../utils/sortProjects';

const KIND_LABELS: Record<ProjectKind, string> = {
  fullstack: 'Full-stack',
  frontend: 'Frontend',
  mobile: 'Mobile',
  extension: 'Extension',
  data: 'Data',
  systems: 'Systems',
};

const KIND_ICONS: Record<ProjectKind, typeof Stack> = {
  fullstack: Stack,
  frontend: Browser,
  mobile: DeviceMobile,
  extension: PuzzlePiece,
  data: ChartLineUp,
  systems: Code,
};

const KIND_ORDER: ProjectKind[] = ['fullstack', 'frontend', 'mobile', 'extension', 'data', 'systems'];

const BENTO_LG_SPAN: readonly string[] = [
  'lg:col-span-4',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-3',
];

const statusRowStyle: Record<ProjectStatus, { label: string; tone: string }> = {
  live: { label: 'Live in production', tone: 'bg-green-500/20 text-green-300' },
  shipped: { label: 'Shipped', tone: 'bg-amber-500/15 text-amber-300' },
  'in-progress': { label: 'In progress', tone: 'bg-sky-500/15 text-sky-300' },
  archived: { label: 'Archived', tone: 'bg-zinc-500/15 text-zinc-300' },
};

function getBentoSpanClasses(index: number): string {
  return BENTO_LG_SPAN[index] ?? 'lg:col-span-2';
}

function primaryProjectLink(project: Project) {
  return (
    project.links?.find((l) => /live|demo/i.test(l.label)) ??
    project.links?.find((l) => /github/i.test(l.label)) ??
    project.links?.[0]
  );
}

export const ProjectsPage: React.FC = () => {
  const projects = siteData.projects;
  const [activeKind, setActiveKind] = useState<string>('All');
  const [activeTech, setActiveTech] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'bento' | 'list'>('bento');

  const techOptions = useMemo(() => {
    const u = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => u.add(t)));
    return ['All', ...Array.from(u).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const stats = useMemo(() => {
    const total = projects.length;
    const liveProd = projects.filter((p) => p.status === 'live').length;
    const mobileExt = projects.filter((p) => p.kind === 'mobile' || p.kind === 'extension').length;
    return { total, liveProd, mobileExt };
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((project) => {
      if (activeKind !== 'All' && project.kind !== activeKind) return false;
      if (activeTech !== 'All' && !project.tech.some((t) => t.toLowerCase() === activeTech.toLowerCase())) {
        return false;
      }
      if (!q) return true;
      const hay =
        `${project.title} ${project.description} ${project.tech.join(' ')} ${project.tagline}`.toLowerCase();
      return hay.includes(q);
    });
    return sortStarredFirst(list);
  }, [projects, activeKind, activeTech, query]);

  const isDirty = activeKind !== 'All' || activeTech !== 'All' || query !== '';

  const resetFilters = () => {
    setActiveKind('All');
    setActiveTech('All');
    setQuery('');
  };

  return (
    <PageTransition>
      <div className="container-page space-y-16 pb-24">
        <Reveal>
          <SectionHeader
            number="01"
            eyebrow="SELECTED WORK"
            title="Nine projects, one through-line: real users, real data, real infra."
            description="Each card shows the role I played, the year, the live status, and the stack. Click through to live demos or source on GitHub."
          />
        </Reveal>

        <section
          className="grid grid-cols-2 divide-x divide-line border-y border-line py-6 md:grid-cols-4"
          aria-label="Project index"
        >
          {[
            { value: stats.total, label: 'Total' },
            { value: stats.liveProd, label: 'Live in production' },
            { value: 1, label: 'Flagship · Pho Ginger' },
            { value: stats.mobileExt, label: 'Mobile + extension' },
          ].map((cell) => (
            <div key={cell.label} className="flex flex-col gap-1 px-4 first:pl-0 last:pr-0 md:px-6">
              <span className="font-display text-3xl font-light tabular text-fg">{cell.value}</span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted">{cell.label}</span>
            </div>
          ))}
        </section>

        <section className="border-y border-line py-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="min-w-0 flex-1 space-y-6">
              {isDirty && (
                <div className="flex justify-end lg:hidden">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    className="gap-2 text-[12px]"
                    onClick={resetFilters}
                  >
                    <ArrowsClockwise className="h-4 w-4" aria-hidden />
                    Reset
                  </Button>
                </div>
              )}

              <div className="space-y-2.5">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted">
                  01 / FILTER BY KIND
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveKind('All')}
                    className="focus-ring rounded-full"
                  >
                    <Tag active={activeKind === 'All'} size="sm">
                      All
                    </Tag>
                  </button>
                  {KIND_ORDER.map((kind) => {
                    const Icon = KIND_ICONS[kind];
                    return (
                      <button
                        type="button"
                        key={kind}
                        onClick={() => setActiveKind(kind)}
                        className="focus-ring rounded-full"
                      >
                        <Tag active={activeKind === kind} size="sm" className="inline-flex items-center gap-1.5">
                          <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                          {KIND_LABELS[kind]}
                        </Tag>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted">
                  02 / FILTER BY TECH
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {techOptions.map((tech) => (
                    <button
                      type="button"
                      key={tech}
                      onClick={() => setActiveTech(tech)}
                      className="focus-ring rounded-full"
                    >
                      <Tag active={activeTech === tech} size="sm">
                        {tech}
                      </Tag>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 lg:w-80 xl:w-96">
              {isDirty && (
                <div className="hidden justify-end lg:flex">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    className="gap-2 text-[12px]"
                    onClick={resetFilters}
                  >
                    <ArrowsClockwise className="h-4 w-4" aria-hidden />
                    Reset
                  </Button>
                </div>
              )}
              <TextInput
                label="Search"
                name="project-search"
                placeholder="Search title, tech, or description..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <p className="font-mono text-[11px] tabular tracking-[0.12em] text-muted">
            Showing {filtered.length} of {projects.length} projects
          </p>
          <div className="flex items-center gap-2" role="group" aria-label="Layout">
            <button
              type="button"
              aria-pressed={view === 'bento'}
              onClick={() => setView('bento')}
              className={cn(
                'focus-ring rounded-full border p-2.5 transition-colors duration-500 ease-premium',
                view === 'bento'
                  ? 'border-amber-400/55 bg-[color:var(--accent-soft)] text-fg'
                  : 'border-line text-muted hover:text-fg'
              )}
            >
              <GridFour className="h-5 w-5" weight="regular" aria-hidden />
              <span className="sr-only">Bento layout</span>
            </button>
            <button
              type="button"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
              className={cn(
                'focus-ring rounded-full border p-2.5 transition-colors duration-500 ease-premium',
                view === 'list'
                  ? 'border-amber-400/55 bg-[color:var(--accent-soft)] text-fg'
                  : 'border-line text-muted hover:text-fg'
              )}
            >
              <Rows className="h-5 w-5" weight="regular" aria-hidden />
              <span className="sr-only">List layout</span>
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <Reveal>
            <SpotlightCard className="max-w-xl mx-auto" coreClassName="p-10 sm:p-12 flex flex-col items-center text-center gap-5">
              <MagnifyingGlass className="h-14 w-14 text-accent" weight="duotone" aria-hidden />
              <h3 className="font-display text-2xl font-light tracking-tighter2 text-fg">No projects match yet.</h3>
              <p className="max-w-sm text-[14px] leading-relaxed text-muted">
                Try clearing a filter or different keyword.
              </p>
              <Button type="button" variant="outline" onClick={resetFilters}>
                Reset filters
              </Button>
            </SpotlightCard>
          </Reveal>
        ) : view === 'bento' ? (
          <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {filtered.map((p, i) => (
              <StaggerItem key={p.id} className={cn(getBentoSpanClasses(i))}>
                <ProjectCard project={p} index={i + 1} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <div className="border-y border-line">
            {filtered.map((p) => {
              const primary = primaryProjectLink(p);
              const st = statusRowStyle[p.status];
              return (
                <div
                  key={p.id}
                  className="group/row flex flex-col gap-6 border-b border-line py-6 last:border-b-0 md:flex-row md:items-start md:gap-10"
                >
                  <div className="flex shrink-0 flex-col gap-2 md:w-40">
                    <span className="font-mono text-[10.5px] tabular tracking-[0.16em] text-muted">{p.year}</span>
                    <span
                      className={cn(
                        'w-fit rounded-full px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em]',
                        st.tone
                      )}
                    >
                      {st.label}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 transition-transform duration-500 ease-premium group-hover/row:-translate-x-0.5">
                    <h3 className="font-display text-2xl font-light tracking-tighter2 text-fg">{p.title}</h3>
                    <p className="mt-1 text-[14px] text-muted">{p.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 6).map((t) => (
                        <Tag key={t} size="sm">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center self-start pt-1 md:self-center">
                    {primary ? (
                      <a
                        href={primary.href}
                        target={primary.href.startsWith('http') ? '_blank' : undefined}
                        rel={primary.href.startsWith('http') ? 'noreferrer' : undefined}
                        aria-label={`Open ${p.title}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-all duration-500 ease-premium group-hover/row:translate-x-0.5 hover:bg-[color:var(--accent-soft)] focus-ring"
                      >
                        <ArrowUpRight weight="bold" className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Reveal>
          <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            <p className="font-display text-xl font-light tracking-tighter2 text-fg sm:text-2xl">
              Looking for a specific stack? — Reach out and I&apos;ll dig out the most relevant work.
            </p>
            <Button to="/contact" withArrow>
              Contact
            </Button>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
};
