import React from 'react';
import { cn } from '../../utils/cn';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Inner core class names (background, padding, etc.) */
  coreClassName?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Card with a cursor-following radial highlight on the bezel border (the
 * "spotlight border" effect). Uses CSS variables driven by mouse position,
 * not React state, to avoid re-renders.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  coreClassName,
  as,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const Tag = (as ?? 'div') as React.ElementType;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    node.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        'group relative rounded-[2rem] p-[1px] transition-colors duration-500 ease-premium',
        className
      )}
      style={{
        background:
          'radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(212,165,116,0.45), rgba(212,165,116,0.02) 40%, transparent 70%), linear-gradient(180deg, var(--line), transparent)',
      }}
    >
      <div
        className={cn(
          'relative h-full w-full rounded-[calc(2rem-1px)] bg-elev overflow-hidden',
          coreClassName
        )}
        style={{
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 60px -25px rgba(0,0,0,0.4)',
        }}
      >
        {children}
      </div>
    </Tag>
  );
};
