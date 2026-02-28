import React from 'react';
import { cn } from '../utils/cn';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export const Tag: React.FC<TagProps> = ({ active, className, ...rest }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
        active
          ? 'border-primary/70 bg-primary/20 text-primary-foreground'
          : 'border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300',
        className
      )}
      {...rest}
    />
  );
};

