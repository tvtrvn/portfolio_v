import React from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-all duration-500 ease-premium hover:bg-[color:var(--accent-soft)] focus-ring',
        className
      )}
    >
      <span className="relative block h-4 w-4">
        <Sun
          weight="duotone"
          className={cn(
            'absolute inset-0 h-4 w-4 transition-all duration-500 ease-premium',
            isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          )}
        />
        <Moon
          weight="duotone"
          className={cn(
            'absolute inset-0 h-4 w-4 transition-all duration-500 ease-premium',
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          )}
        />
      </span>
    </button>
  );
};
