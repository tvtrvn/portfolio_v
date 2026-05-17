import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  to?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'a' | 'button' | 'div';
  ariaLabel?: string;
}

/**
 * Magnetic interaction — uses framer-motion's motion values OUTSIDE the React
 * render cycle so we don't pay re-render cost on every mouse move.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  href,
  onClick,
  strength = 0.25,
  as,
  ariaLabel,
}) => {
  const ref = React.useRef<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | null>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 180, damping: 18, mass: 0.6 });
  const y = useSpring(mvY, { stiffness: 180, damping: 18, mass: 0.6 });

  const innerX = useTransform(x, (v) => v * 0.4);
  const innerY = useTransform(y, (v) => v * 0.4);

  const handleMove = (e: React.MouseEvent) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mvX.set(dx * strength);
    mvY.set(dy * strength);
  };
  const handleLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  const motionStyle = { x, y };

  const Tag = (as ?? (href ? 'a' : 'button')) as React.ElementType;
  const tagProps: Record<string, unknown> = {
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    className: cn(
      'group relative inline-flex select-none items-center gap-2 will-change-transform',
      className
    ),
    'aria-label': ariaLabel,
    ref,
  };
  if (Tag === 'a') {
    tagProps.href = href;
    if (href?.startsWith('http')) {
      tagProps.target = '_blank';
      tagProps.rel = 'noreferrer';
    }
  }

  return (
    <motion.div style={motionStyle} className="inline-block">
      <Tag {...tagProps}>
        <motion.span style={{ x: innerX, y: innerY }} className="contents">
          {children}
        </motion.span>
      </Tag>
    </motion.div>
  );
};
