import React from 'react';
import { Button } from '../components/Button';
import { PageTransition } from '../components/PageTransition';
import { SectionHeader } from '../components/SectionHeader';
import { siteData } from '../content/siteData';

export const ResumePage: React.FC = () => {
  const resumeUrl = `/${siteData.resume.fileName}`;

  return (
    <PageTransition>
      <div className="space-y-8">
        <SectionHeader
          eyebrow="Resume"
          title="Resume & experience"
          description="View or download a PDF version of my resume. There’s also a text-based summary below as a fallback."
        />

        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button href={resumeUrl} target="_blank" rel="noreferrer">
              Open PDF resume
            </Button>
            <Button href={resumeUrl} download variant="outline">
              Download resume
            </Button>
            <p className="text-xs text-slate-400">
              Replace <code>public/{siteData.resume.fileName}</code> with your own PDF.
            </p>
          </div>

          <div className="card overflow-hidden border-slate-800/90">
            <div className="aspect-[8.5/11] w-full bg-slate-950/70">
              <iframe
                title="Resume preview"
                src={resumeUrl}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
            <p className="border-t border-slate-800/80 px-4 py-2 text-[11px] text-slate-400">
              If the embedded PDF does not load, try using the &quot;Open PDF resume&quot; or
              &quot;Download&quot; buttons above.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold tracking-tight text-slate-50">
            Text-based resume summary
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-200">
            {siteData.resume.summary.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span
                  className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/80"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageTransition>
  );
};


