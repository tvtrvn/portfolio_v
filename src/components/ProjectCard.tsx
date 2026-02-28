import React from 'react';
import type { Project } from '../types/content';
import { Button } from './Button';
import { Tag } from './Tag';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="card flex h-full flex-col justify-between p-5">
      <div className="space-y-3">
        <header className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">{project.title}</h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{project.description}</p>
          </div>
        </header>

        {project.highlight && (
          <p className="text-xs font-medium text-primary/80">{project.highlight}</p>
        )}

        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <Tag key={tech} className="text-[11px]">
              {tech}
            </Tag>
          ))}
        </div>
      </div>

      {project.links && project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              variant={link.label.toLowerCase().includes('github') ? 'outline' : 'primary'}
            >
              {link.label}
            </Button>
          ))}
        </div>
      )}
    </article>
  );
};


