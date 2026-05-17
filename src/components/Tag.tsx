import React from 'react';
import { cn } from '../utils/cn';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  size?: 'sm' | 'md';
}

export const Tag: React.FC<TagProps> = ({ active, size = 'md', className, ...rest }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-mono uppercase tracking-[0.14em] transition-all duration-500 ease-premium',
        size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-[10.5px]',
        active
          ? 'border-amber-400/60 bg-[color:var(--accent-soft)] text-fg'
          : 'border-line text-muted hover:text-fg hover:border-amber-400/40',
        className
      )}
      {...rest}
    />
  );
};
