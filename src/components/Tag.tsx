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
          : 'border-slate-700 bg-slate-800/80 text-slate-300',
        className
      )}
      {...rest}
    />
  );
};

