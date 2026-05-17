import React from 'react';
import { cn } from '../../utils/cn';

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: 'slow' | 'normal';
  className?: string;
}

/**
 * Edge-to-edge horizontal marquee. Items render twice so the CSS keyframe
 * loop (-50% translate) is seamless. Speed is pure CSS animation.
 */
export const Marquee: React.FC<MarqueeProps> = ({ items, speed = 'normal', className }) => {
  const cls = speed === 'slow' ? 'animate-marquee-x-slow' : 'animate-marquee-x';
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />
      <div className={cn('marquee-track', cls)}>
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex items-center gap-12 pr-12" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <li key={`${dup}-${i}`} className="shrink-0">
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};
