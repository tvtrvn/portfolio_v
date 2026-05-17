import React from 'react';
import {
  ArrowUpRight,
  DownloadSimple,
  EnvelopeSimple,
  FilePdf,
  GithubLogo,
  LinkedinLogo,
  MapPin,
} from '@phosphor-icons/react';
import { PageTransition } from '../components/PageTransition';
import { SectionHeader } from '../components/SectionHeader';
import { Reveal } from '../components/visual/Reveal';
import { SpotlightCard } from '../components/visual/SpotlightCard';
import { Button } from '../components/Button';
import { Tag } from '../components/Tag';
import { siteData } from '../content/siteData';
import type { ExperienceItem, Project } from '../types/content';

const RESUME_PUBLIC_PDF = `https://thinh-tran-portfoliosite.netlify.app/${siteData.resume.fileName}`;

function isEducationEntry(e: ExperienceItem): boolean {
  const c = e.company.toLowerCase();
  const r = e.role.toLowerCase();
  return c.includes('york') || r.includes('computer science');
}

function pickProjectHref(p: Project): string {
  const links = p.links ?? [];
  const live = links.find(
    (l) => /live/i.test(l.label) || /vercel|netlify|\.app\//i.test(l.href)
  );
  if (live) return live.href;
  const gh = links.find((l) => /github/i.test(l.label) || /github\.com/i.test(l.href));
  if (gh) return gh.href;
  return links[0]?.href ?? '#';
}

function formatStatusLabel(status: Project['status']): string {
  switch (status) {
    case 'in-progress':
      return 'In progress';
    case 'live':
      return 'Live';
    case 'archived':
      return 'Archived';
    default:
      return 'Shipped';
  }
}

export const ResumePage: React.FC = () => {
  const pdfPath = `/${siteData.resume.fileName}`;
  const lastUpdatedLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const educationEntries = siteData.experience.filter(isEducationEntry);
  const otherExperience = siteData.experience.filter((e) => !isEducationEntry(e));
  const featuredProjects = siteData.projects.filter((p) => p.featured);

  const mailtoShare = `mailto:${siteData.contact.email}?subject=${encodeURIComponent(`Resume — ${siteData.name}`)}&body=${encodeURIComponent(`Here is the link to my resume: ${RESUME_PUBLIC_PDF}`)}`;

  return (
    <PageTransition>
      <div className="container-page space-y-24 pb-24">
        <Reveal>
          <SectionHeader
            number="00"
            eyebrow="CURRICULUM VITAE"
            title="Resume — at a glance."
            description="Preview or download the PDF below, or read the typeset version on this page."
            size="lg"
          />
        </Reveal>

        <Reveal>
          <section className="space-y-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12 lg:items-start">
              <div className="flex flex-col gap-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  01 — Actions
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    href={pdfPath}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                    size="lg"
                    withArrow
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <FilePdf weight="regular" className="h-4 w-4 shrink-0" />
                      Open PDF in tab
                    </span>
                  </Button>
                  <Button
                    href={pdfPath}
                    download
                    variant="outline"
                    size="lg"
                    withArrow
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <DownloadSimple weight="regular" className="h-4 w-4 shrink-0" />
                      Download .pdf
                    </span>
                  </Button>
                  <Button href={mailtoShare} variant="ghost" size="lg">
                    <span className="inline-flex items-center gap-2.5">
                      <EnvelopeSimple weight="regular" className="h-4 w-4 shrink-0" />
                      Send to my inbox
                    </span>
                  </Button>
                </div>

                <SpotlightCard>
                  <div className="divide-y divide-line px-6 py-1 text-[14.5px]">
                    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                        File
                      </span>
                      <span className="font-mono tabular text-fg">{siteData.resume.fileName}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                        Format
                      </span>
                      <span className="text-fg">PDF · 1 page</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                        Last updated
                      </span>
                      <span className="tabular text-fg">{lastUpdatedLabel}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                        License
                      </span>
                      <Tag size="sm" className="normal-case tracking-normal">
                        Personal · all rights reserved
                      </Tag>
                    </div>
                  </div>
                </SpotlightCard>
              </div>

              <div className="flex min-w-0 flex-col gap-3">
                <div className="rounded-[2rem] border border-line bg-elev p-1.5">
                  <div
                    className="aspect-[8.5/11] overflow-hidden rounded-[calc(2rem-0.375rem)] border border-line bg-ink-900"
                  >
                    <iframe
                      title="Resume preview"
                      src={pdfPath}
                      className="h-full w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 font-mono text-[10.5px] leading-relaxed text-muted">
                  <p>
                    PDF preview · scroll inside to read · keyboard: Tab to focus, then ↓
                  </p>
                  <p className="inline-flex flex-wrap items-center gap-1.5">
                    <span>If the preview does not load,</span>
                    <a
                      href={pdfPath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent underline decoration-amber-400/40 underline-offset-4 transition-colors duration-500 ease-premium hover:decoration-amber-400/80"
                    >
                      open the PDF directly
                      <ArrowUpRight weight="bold" className="h-3 w-3" aria-hidden />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="grid gap-12 lg:grid-cols-[0.9fr_2.1fr] lg:gap-16 lg:items-start">
            <aside className="flex flex-col gap-8 border-t border-line pt-8 lg:sticky lg:top-28 lg:border-t-0 lg:pt-0 lg:self-start">
              <div>
                <p
                  className="font-display text-3xl font-light tracking-tightest text-fg"
                  style={{ textWrap: 'balance' }}
                >
                  {siteData.name}
                </p>
                <p className="mt-2 text-[15px] text-muted">{siteData.role}</p>
              </div>

              {siteData.location && (
                <p className="flex items-start gap-2 text-[14.5px] text-fg">
                  <MapPin weight="regular" className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                  <span>{siteData.location}</span>
                </p>
              )}

              <div className="space-y-3">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Contact
                </p>
                <ul className="space-y-2.5 text-[14.5px]">
                  <li>
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="inline-flex items-center gap-2.5 text-fg transition-colors duration-500 ease-premium hover:text-accent"
                    >
                      <EnvelopeSimple weight="regular" className="h-4 w-4 shrink-0 text-muted" />
                      <span className="break-all">{siteData.contact.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={siteData.contact.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 text-fg transition-colors duration-500 ease-premium hover:text-accent"
                    >
                      <GithubLogo weight="regular" className="h-4 w-4 shrink-0 text-muted" />
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href={siteData.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 text-fg transition-colors duration-500 ease-premium hover:text-accent"
                    >
                      <LinkedinLogo weight="regular" className="h-4 w-4 shrink-0 text-muted" />
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Languages
                </p>
                <ul className="space-y-2.5">
                  {[
                    { label: 'English', level: 'Native' },
                    { label: 'French', level: 'Fluent' },
                    { label: 'Vietnamese', level: 'Advanced' },
                  ].map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between gap-3 text-[14.5px] text-fg"
                    >
                      <span>{row.label}</span>
                      <Tag size="sm" className="shrink-0 normal-case tracking-normal tabular">
                        {row.level}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="min-w-0 space-y-16">
              {/* Summary */}
              <div>
                <h3 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Profile
                </h3>
                <h2
                  className="mb-6 font-display text-2xl font-light tracking-tighter2 text-fg"
                  style={{ textWrap: 'balance' }}
                >
                  Summary
                </h2>
                <ul className="space-y-0">
                  {siteData.resume.summary.map((line, i) => (
                    <li
                      key={i}
                      className="border-l-2 border-amber-400/60 py-1.5 pl-4 leading-relaxed text-[15px] text-fg first:pt-0 last:pb-0"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="border-t border-line pt-10">
                <h3 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Academics
                </h3>
                <h2
                  className="mb-6 font-display text-2xl font-light tracking-tighter2 text-fg"
                  style={{ textWrap: 'balance' }}
                >
                  Education
                </h2>
                <div className="divide-y divide-line">
                  {educationEntries.map((e) => (
                    <article key={e.id} className="grid gap-4 py-8 first:pt-0 last:pb-0 md:grid-cols-[10.5rem_1fr] md:gap-8">
                      <p className="font-mono text-[12px] tabular text-muted">
                        {e.start} — {e.end}
                      </p>
                      <div className="space-y-2">
                        <h3 className="font-display text-xl font-light tracking-tight text-fg">
                          {e.role}
                          <span className="text-muted"> · {e.company}</span>
                        </h3>
                        <p className="text-[14.5px] leading-relaxed text-muted">{e.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Experience */}
              {otherExperience.length > 0 && (
                <div className="border-t border-line pt-10">
                  <h3 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                    Shipping
                  </h3>
                  <h2
                    className="mb-6 font-display text-2xl font-light tracking-tighter2 text-fg"
                    style={{ textWrap: 'balance' }}
                  >
                    Experience / projects in production
                  </h2>
                  <div className="divide-y divide-line">
                    {otherExperience.map((e) => (
                      <article
                        key={e.id}
                        className="grid gap-4 py-8 first:pt-0 last:pb-0 md:grid-cols-[10.5rem_1fr] md:gap-8"
                      >
                        <p className="font-mono text-[12px] tabular text-muted">
                          {e.start} — {e.end}
                        </p>
                        <div className="space-y-2">
                          <h3 className="font-display text-xl font-light tracking-tight text-fg">
                            {e.role}
                            <span className="text-muted"> · {e.company}</span>
                          </h3>
                          <p className="text-[14.5px] leading-relaxed text-muted">{e.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected projects */}
              <div className="border-t border-line pt-10">
                <h3 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Shipped work
                </h3>
                <h2
                  className="mb-6 font-display text-2xl font-light tracking-tighter2 text-fg"
                  style={{ textWrap: 'balance' }}
                >
                  Selected projects
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {featuredProjects.map((p) => {
                    const href = pickProjectHref(p);
                    return (
                      <a
                        key={p.id}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="group block rounded-[2rem] focus-ring"
                      >
                        <SpotlightCard
                          className="h-full transition-transform duration-500 ease-premium group-hover:-translate-y-0.5"
                          coreClassName="p-6"
                        >
                          <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted tabular">
                              {p.year} · {formatStatusLabel(p.status)}
                            </span>
                          </div>
                          <h3
                            className="font-display text-xl font-light tracking-tight text-fg"
                            style={{ textWrap: 'balance' }}
                          >
                            {p.title}
                          </h3>
                          <p className="mt-2 text-[14.5px] font-medium text-accent">{p.tagline}</p>
                          <p className="mt-3 line-clamp-2 text-[14.5px] leading-relaxed text-muted">
                            {p.description}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {p.tech.slice(0, 4).map((t) => (
                              <Tag key={t} size="sm">
                                {t}
                              </Tag>
                            ))}
                          </div>
                        </SpotlightCard>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Skills */}
              <div className="border-t border-line pt-10">
                <h3 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Stack
                </h3>
                <h2
                  className="mb-6 font-display text-2xl font-light tracking-tighter2 text-fg"
                  style={{ textWrap: 'balance' }}
                >
                  Skills
                </h2>
                <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
                  {(
                    [
                      ['Languages', siteData.skills.languages],
                      ['Frameworks', siteData.skills.frameworks],
                      ['Tools', siteData.skills.tools],
                    ] as const
                  ).map(([label, items]) => (
                    <div key={label}>
                      <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                        {label}
                      </p>
                      <div className="divide-y divide-line">
                        {items.map((item) => (
                          <div key={item} className="py-3 first:pt-0 last:pb-0">
                            <span className="font-mono text-[13px] leading-snug text-fg">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {siteData.certifications.length > 0 && (
                <div className="border-t border-line pt-10">
                  <h3 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                    Verified
                  </h3>
                  <h2
                    className="mb-6 font-display text-2xl font-light tracking-tighter2 text-fg"
                    style={{ textWrap: 'balance' }}
                  >
                    Certifications
                  </h2>
                  <div className="divide-y divide-line">
                    {siteData.certifications.map((cert) => (
                      <article
                        key={cert.id}
                        className="grid gap-4 py-8 first:pt-0 last:pb-0 md:grid-cols-[10.5rem_1fr] md:gap-8"
                      >
                        <p className="font-mono text-[12px] tabular text-muted">{cert.date}</p>
                        <div className="space-y-2">
                          <h3 className="font-display text-xl font-light tracking-tight text-fg">
                            {cert.title}
                            <span className="text-muted"> · {cert.issuer}</span>
                          </h3>
                          {cert.description && (
                            <p className="text-[14.5px] leading-relaxed text-muted">
                              {cert.description}
                            </p>
                          )}
                          {cert.verifyUrl && (
                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent underline decoration-amber-400/40 underline-offset-4 transition-colors duration-500 ease-premium hover:decoration-amber-400/80"
                            >
                              Verify credential
                              <ArrowUpRight weight="bold" className="h-3 w-3" aria-hidden />
                            </a>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning */}
              <div className="border-t border-line pt-10">
                <h3 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Focus
                </h3>
                <h2
                  className="mb-6 font-display text-2xl font-light tracking-tighter2 text-fg"
                  style={{ textWrap: 'balance' }}
                >
                  What I&apos;m currently learning
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Distributed systems',
                    'WebGL / Canvas graphics',
                    'Quant finance & ML for time-series',
                  ].map((chip) => (
                    <Tag key={chip}>{chip}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

      </div>
    </PageTransition>
  );
};
