import React from 'react';

/**
 * Fixed, pointer-events-none film grain overlay.
 * Stays out of scrolling containers so it never triggers GPU repaints on scroll.
 */
export const NoiseOverlay: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay opacity-[0.18] bg-grain"
    />
  );
};
