import React from 'react';
import { ArrowUpRight, Star } from '@phosphor-icons/react';
import type { Project } from '../types/content';
import { SpotlightCard } from './visual/SpotlightCard';
import { Tag } from './Tag';

interface ProjectCardProps {
  project: Project;
  /** Number to show in the corner (e.g. 01, 02, …). */
  index?: number;
  /** Span class names if the consumer wants this card to take more grid space. */
  className?: string;
}

const statusLabel: Record<Project['status'], { label: string; tone: string }> = {
  live: { label: 'Live in production', tone: 'bg-green-500/20 text-green-300' },
  shipped: { label: 'Shipped', tone: 'bg-amber-500/15 text-amber-300' },
  'in-progress': { label: 'In progress', tone: 'bg-sky-500/15 text-sky-300' },
  archived: { label: 'Archived', tone: 'bg-zinc-500/15 text-zinc-300' },
};

const primaryLink = (project: Project) =>
  project.links?.find((l) => /live|demo/i.test(l.label)) ??
  project.links?.find((l) => /github/i.test(l.label)) ??
  project.links?.[0];

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, className }) => {
  const primary = primaryLink(project);
  const status = statusLabel[project.status];
  const techVisible = project.tech.slice(0, 6);
  const techOverflow = project.tech.length - techVisible.length;

  return (
    <SpotlightCard
      className={className}
      coreClassName="p-6 sm:p-7 lg:p-8 flex flex-col gap-6 h-full"
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-muted">
          {typeof index === 'number' && (
            <span className="font-mono text-[10.5px] tabular tracking-[0.22em]">
              {String(index).padStart(2, '0')} /
            </span>
          )}
          <span className="font-mono text-[10.5px] tracking-[0.22em]">{project.year}</span>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] ${status.tone}`}
          >
            {status.label}
          </span>
          {project.starred && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/55 bg-amber-400/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-amber-300">
              <Star weight="fill" className="h-2.5 w-2.5" aria-hidden />
              Flagship
            </span>
          )}
        </div>
        {primary && (
          <a
            href={primary.href}
            target={primary.href.startsWith('http') ? '_blank' : undefined}
            rel={primary.href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={`Open ${project.title}`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-all duration-500 ease-premium hover:bg-[color:var(--accent-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 focus-ring"
          >
            <ArrowUpRight weight="bold" className="h-4 w-4" />
          </a>
        )}
      </header>

      <div className="flex-1 space-y-3">
        <h3
          className="font-display text-2xl font-light leading-[1.05] tracking-tighter2 text-fg sm:text-[28px]"
          style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}
        >
          {project.title}
        </h3>
        <p className="text-[15px] leading-snug text-accent">{project.tagline}</p>
        <p
          className="text-[13.5px] leading-relaxed text-muted"
          style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
        >
          {project.description}
        </p>
        {project.highlight && (
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber-400/90">
            {project.highlight}
          </p>
        )}
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <dl className="grid grid-cols-3 gap-3 border-t border-line pt-5">
          {project.metrics.map((m) => (
            <div key={m.label} className="space-y-0.5">
              <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted">
                {m.label}
              </dt>
              <dd className="font-display text-xl font-light tabular text-fg">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        {techVisible.map((tech) => (
          <Tag key={tech} size="sm">
            {tech}
          </Tag>
        ))}
        {techOverflow > 0 && (
          <Tag size="sm" className="border-amber-400/40 text-amber-400/80">
            +{techOverflow} more
          </Tag>
        )}
      </div>

      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-line pt-5">
          {project.links.map((link) => {
            const external = link.href.startsWith('http');
            const isLive = /live|demo/i.test(link.label);
            return (
              <a
                key={link.href}
                href={link.href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className={
                  isLive
                    ? 'group/btn inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-[12.5px] font-medium tracking-tight text-[color:var(--bg)] transition-transform duration-500 ease-premium hover:translate-y-[-1px]'
                    : 'group/btn inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[12.5px] tracking-tight text-fg transition-colors hover:bg-[color:var(--accent-soft)]'
                }
              >
                {link.label}
                <ArrowUpRight
                  weight="bold"
                  className="h-3 w-3 transition-transform duration-500 ease-premium group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </a>
            );
          })}
        </div>
      )}
    </SpotlightCard>
  );
};
