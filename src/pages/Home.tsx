import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { PageTransition } from '../components/PageTransition';
import { SectionHeader } from '../components/SectionHeader';
import { siteData } from '../content/siteData';

export const HomePage: React.FC = () => {
  return (
    <>
      <PageTransition>
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-300 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Available for internships &amp; projects</span>
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                Hi, I&apos;m {siteData.name}.
              </h1>
              <p className="text-lg font-medium text-primary/80">{siteData.heroTagline}</p>
              <p className="max-w-xl text-sm leading-relaxed text-slate-200">
                {siteData.heroIntro}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/projects">View projects</Button>
              <Button to="/resume" variant="outline">
                View resume
              </Button>
              <Button to="/contact" variant="ghost">
                Contact me
              </Button>
            </div>
          </div>

          <div className="card relative overflow-hidden p-5">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-emerald-500/10" />
            <div className="relative space-y-4">
              <h2 className="text-sm font-semibold tracking-tight text-slate-50">
                Quick highlights
              </h2>
              <div className="grid gap-3 text-xs text-slate-200 sm:grid-cols-2">
                {siteData.heroHighlights.map((group) => (
                  <div
                    key={group.label}
                    className="rounded-xl border border-slate-700/80 bg-slate-900/80 p-3"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      {group.label}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                Explore more on the{' '}
                <Link to="/about" className="text-primary hover:underline">
                  About
                </Link>{' '}
                and{' '}
                <Link to="/projects" className="text-primary hover:underline">
                  Projects
                </Link>{' '}
                pages.
              </p>
            </div>
          </div>
        </section>
      </PageTransition>

      <PageTransition className="mt-16">
        <SectionHeader
          eyebrow="Snapshot"
          title="What I work with"
          description="A mix of languages, frameworks, and tools I use most often. I enjoy learning new technologies and picking the right tool for the problem."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Languages
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {siteData.skills.languages.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Frameworks
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {siteData.skills.frameworks.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Tools
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {siteData.skills.tools.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

