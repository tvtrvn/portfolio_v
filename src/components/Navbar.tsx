import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, X, GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteData } from '../content/siteData';
import { cn } from '../utils/cn';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { to: '/', label: 'Index' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Work' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
];

/**
 * Floating "dock" navbar — pill-shaped, detached from the viewport edge,
 * glass-tinted. On mobile, hamburger morphs into an X and opens a screen-
 * filling overlay with staggered link reveals.
 */
export const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
        <nav
          className="pointer-events-auto mt-5 flex w-[min(96%,920px)] items-center justify-between gap-3 rounded-full border border-line bg-elev/70 px-3 py-2 backdrop-blur-xl"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 40px -20px rgba(0,0,0,0.45)',
          }}
        >
          <NavLink
            to="/"
            aria-label="Home"
            className="group flex items-center gap-2.5 rounded-full px-2 py-1 focus-ring"
          >
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-fg text-[10px] font-bold tracking-tight text-[color:var(--bg)]">
              TT
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-[color:var(--bg-elev)] animate-pulse-dot" />
            </span>
            <span className="hidden font-display text-[14px] tracking-tight text-fg sm:inline">
              {siteData.name.split(' ')[0]}
            </span>
          </NavLink>

          <ul className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] tracking-tight transition-colors duration-500 ease-premium focus-ring',
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-[color:var(--accent-soft)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href={siteData.contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-[color:var(--accent-soft)] hover:text-fg focus-ring md:inline-flex"
            >
              <GithubLogo weight="regular" className="h-4 w-4" />
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Open navigation menu"
              className="relative ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-[color:var(--accent-soft)] focus-ring md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-[1.5px] w-4 origin-center rounded-full bg-fg transition-all duration-500 ease-premium',
                    open ? 'translate-y-[5px] rotate-45' : 'translate-y-0 rotate-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-[1.5px] w-4 origin-center rounded-full bg-fg transition-all duration-500 ease-premium',
                    open ? '-translate-y-[6px] -rotate-45' : 'translate-y-0 rotate-0'
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-30 backdrop-blur-3xl md:hidden"
            style={{ background: 'color-mix(in oklab, var(--bg) 88%, transparent)' }}
            onClick={() => setOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="container-page flex h-full flex-col justify-between pb-12 pt-32"
            >
              <ul className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 + i * 0.05, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'group flex items-baseline justify-between border-b border-line py-5 font-display text-5xl font-light tracking-tightest transition-colors',
                          isActive ? 'text-fg' : 'text-muted hover:text-fg'
                        )
                      }
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                          0{i + 1}
                        </span>
                        {item.label}
                      </span>
                      <X
                        weight="regular"
                        className="h-5 w-5 rotate-[135deg] opacity-0 transition-opacity group-hover:opacity-60"
                      />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3 pt-8">
                <a
                  href={siteData.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-fg"
                >
                  <GithubLogo weight="regular" className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={siteData.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-fg"
                >
                  <LinkedinLogo weight="regular" className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-fg"
                >
                  <EnvelopeSimple weight="regular" className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
