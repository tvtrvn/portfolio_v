import React from 'react';
import { cn } from '../utils/cn';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className
}) => {
  const isCenter = align === 'center';
  return (
    <header
      className={cn(
        'mb-8 flex flex-col gap-2',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
          {eyebrow}
        </p>
      )}
      <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl lg:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">{description}</p>
      )}
    </header>
  );
};

