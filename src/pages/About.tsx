import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { SectionHeader } from '../components/SectionHeader';
import { siteData } from '../content/siteData';

export const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="space-y-12">
        <SectionHeader
          eyebrow="About"
          title="A bit more about me"
          description="Who I am, what I’ve been learning, and how I like to work."
        />

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            {siteData.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <aside className="card h-fit p-5">
            <h2 className="text-sm font-semibold tracking-tight text-slate-50">
              Skills at a glance
            </h2>
            <dl className="mt-4 space-y-3 text-xs text-slate-200">
              <div>
                <dt className="font-semibold text-slate-300">Languages</dt>
                <dd className="mt-1 text-slate-300">{siteData.skills.languages.join(', ')}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-300">Frameworks</dt>
                <dd className="mt-1 text-slate-300">{siteData.skills.frameworks.join(', ')}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-300">Tools</dt>
                <dd className="mt-1 text-slate-300">{siteData.skills.tools.join(', ')}</dd>
              </div>
            </dl>
          </aside>
        </section>

        {siteData.experience.length > 0 && (
          <section>
            <h2 className="mb-4 text-sm font-semibold tracking-tight text-slate-50">
              Timeline &amp; experience
            </h2>
            <ol className="relative border-l border-slate-700/80 pl-4 text-sm text-slate-200">
              {siteData.experience.map((item) => (
                <li key={item.id} className="mb-8 last:mb-0">
                  <div className="absolute -left-[7px] mt-1 h-[11px] w-[11px] rounded-full border border-slate-900 bg-primary shadow-soft" />
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                      {item.start} — {item.end}
                    </p>
                    <p className="text-sm font-semibold text-slate-50">
                      {item.role}{' '}
                      <span className="text-slate-300">
                        · {item.company}
                        {item.location ? ` — ${item.location}` : ''}
                      </span>
                    </p>
                    <p className="text-xs leading-relaxed text-slate-300">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </PageTransition>
  );
};

