import React from 'react';
import { siteData } from '../content/siteData';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50/80 dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="container-page flex flex-col gap-4 py-6 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>
            &copy; {year} {siteData.name || 'Your Name'}. All rights reserved.
          </p>
          <p className="text-[11px]">
            Built with React, TypeScript, Vite, Tailwind CSS, and deployed on Netlify.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-3">
            <a
              href={siteData.contact.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href={siteData.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteData.contact.email}`}
              className="hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="rounded-full border border-slate-300 px-3 py-1 text-[11px] font-medium text-slate-700 transition hover:border-primary hover:bg-slate-100 hover:text-primary focus-visible:focus-ring dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900/80 dark:hover:text-primary-foreground"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

