import React from 'react';
import { cn } from '../utils/cn';

interface SectionHeaderProps {
  eyebrow?: string;
  number?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  size?: 'sm' | 'lg';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  number,
  title,
  description,
  align = 'left',
  className,
  size = 'lg',
}) => {
  const isCenter = align === 'center';
  return (
    <header
      className={cn(
        'flex flex-col gap-5',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {(eyebrow || number) && (
        <div className="flex items-center gap-3 text-muted">
          {number && (
            <span className="font-mono text-[10.5px] tracking-[0.3em] tabular">{number}</span>
          )}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </div>
      )}
      <h2
        className={cn(
          'font-display font-light leading-[0.95] tracking-tightest text-fg',
          size === 'lg' ? 'text-5xl sm:text-6xl lg:text-7xl' : 'text-3xl sm:text-4xl lg:text-5xl'
        )}
        style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-[15px] leading-relaxed text-muted',
            isCenter && 'mx-auto'
          )}
          style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
        >
          {description}
        </p>
      )}
    </header>
  );
};
