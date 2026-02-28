import React from 'react';
import { TextInput } from '../components/Inputs';
import { PageTransition } from '../components/PageTransition';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeader } from '../components/SectionHeader';
import { Tag } from '../components/Tag';
import { siteData } from '../content/siteData';

export const ProjectsPage: React.FC = () => {
  const [activeTag, setActiveTag] = React.useState<string>('All');
  const [query, setQuery] = React.useState<string>('');

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    siteData.projects.forEach((project) => {
      project.tech.forEach((t) => tags.add(t));
    });
    return ['All', ...Array.from(tags).sort()];
  }, []);

  const filteredProjects = siteData.projects.filter((project) => {
    const matchesTag =
      activeTag === 'All' ? true : project.tech.some((tech) => tech.toLowerCase() === activeTag.toLowerCase());
    const q = query.toLowerCase().trim();
    if (!q) return matchesTag;
    const haystack =
      project.title.toLowerCase() +
      ' ' +
      project.description.toLowerCase() +
      ' ' +
      project.tech.join(' ').toLowerCase();
    return matchesTag && haystack.includes(q);
  });

  return (
    <PageTransition>
      <div className="space-y-8">
        <SectionHeader
          eyebrow="Projects"
          title="Things I’ve been building"
          description="A selection of projects that show how I approach problems, structure code, and design interfaces."
        />

        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-950/70 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Filter by tech
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="focus-visible:focus-ring rounded-full"
                >
                  <Tag active={activeTag === tag}>{tag}</Tag>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-xs">
            <TextInput
              label="Search projects"
              name="search"
              placeholder="Search by title, tech, or description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </section>

        <section>
          {filteredProjects.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              No projects match your filters yet. Try clearing the search or choosing a different tag.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
};

