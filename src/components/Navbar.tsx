import React from 'react';
import { NavLink } from 'react-router-dom';
import { siteData } from '../content/siteData';
import { cn } from '../utils/cn';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' }
];

export const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
      <nav className="container-page flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-50"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground shadow-soft">
              CS
            </span>
            <span className="hidden sm:inline">
              {siteData.name.split(' ')[0] || 'Portfolio'}
            </span>
          </NavLink>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-1 text-sm text-slate-300 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-slate-800 text-slate-50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-50'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <ThemeToggle className="hidden sm:inline-flex" />

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-xs text-slate-100 shadow-sm transition hover:bg-slate-800/80 focus-visible:focus-ring sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-800/60 bg-slate-950/95 sm:hidden">
          <div className="container-page flex flex-col gap-1 py-2 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={close}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-slate-800 text-slate-50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-50'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-1 flex justify-start">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

