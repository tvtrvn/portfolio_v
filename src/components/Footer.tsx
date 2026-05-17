import React from 'react';
import { ArrowUp, GithubLogo, LinkedinLogo, EnvelopeSimple, MapPin } from '@phosphor-icons/react';
import { siteData } from '../content/siteData';
import { Marquee } from './visual/Marquee';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeText = (
    <span className="font-display text-[14vw] font-light leading-none tracking-tightest text-fg/90 sm:text-[12vw] lg:text-[10vw]">
      {siteData.name}
      <span className="mx-8 inline-block translate-y-[-0.15em] align-middle text-[0.45em] text-amber-400">
        ✦
      </span>
      Let&apos;s build something
      <span className="mx-8 inline-block translate-y-[-0.15em] align-middle text-[0.45em] text-amber-400">
        ✦
      </span>
    </span>
  );

  return (
    <footer className="relative mt-32 border-t border-line bg-elev">
      <Marquee items={[marqueeText, marqueeText]} speed="slow" className="border-b border-line py-6" />

      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
            01 · Want to talk?
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[0.95] tracking-tightest text-fg sm:text-5xl">
            Open to internships,
            <br />
            collaborations, and
            <br />
            curious questions.
          </h2>
          <a
            href={`mailto:${siteData.contact.email}`}
            className="mt-6 inline-flex items-center gap-2 border-b border-fg pb-1 text-[15px] tracking-tight text-fg hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            <EnvelopeSimple weight="regular" className="h-4 w-4" />
            {siteData.contact.email}
          </a>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">02 · Elsewhere</p>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li>
              <a
                href={siteData.contact.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-muted hover:text-fg"
              >
                <GithubLogo weight="regular" className="h-4 w-4" />
                <span>GitHub</span>
                <span className="ml-1 text-muted/60 group-hover:text-amber-400">↗</span>
              </a>
            </li>
            <li>
              <a
                href={siteData.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-muted hover:text-fg"
              >
                <LinkedinLogo weight="regular" className="h-4 w-4" />
                <span>LinkedIn</span>
                <span className="ml-1 text-muted/60 group-hover:text-amber-400">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">03 · Where</p>
          <div className="mt-4 space-y-2 text-[15px] text-muted">
            <p className="inline-flex items-center gap-2">
              <MapPin weight="regular" className="h-4 w-4 text-amber-400" />
              {siteData.location}
            </p>
            <p className="font-mono text-[12px] tabular text-muted/80">
              {new Date().toLocaleTimeString('en-CA', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Toronto',
              })}{' '}
              local time · {Intl.DateTimeFormat().resolvedOptions().timeZone === 'America/Toronto'
                ? 'same as yours'
                : 'EST'}
            </p>
          </div>
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-line py-6 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteData.name}. Built with React, TypeScript, Tailwind & Framer Motion. Deployed on Netlify.
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] text-muted hover:border-amber-400/60 hover:text-fg focus-ring"
        >
          Back to top
          <ArrowUp weight="bold" className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
};
