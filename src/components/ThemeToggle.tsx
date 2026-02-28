import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-700 shadow-sm transition hover:bg-slate-200 focus-visible:focus-ring dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-800/80',
        className
      )}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☾' : '☼'}</span>
    </button>
  );
};

