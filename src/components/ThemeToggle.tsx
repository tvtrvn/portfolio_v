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
        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-xs text-slate-100 shadow-sm transition hover:bg-slate-800/80 focus-visible:focus-ring',
        className
      )}
      aria-label="Toggle dark mode"
    >
      <span aria-hidden="true">{theme === 'dark' ? '☾' : '☼'}</span>
    </button>
  );
};

