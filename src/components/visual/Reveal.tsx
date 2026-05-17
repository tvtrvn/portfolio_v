import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '../../utils/cn';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'header';
  y?: number;
}

const ease = [0.32, 0.72, 0, 1] as const;

/**
 * Scroll-triggered fade-up. Uses framer-motion's whileInView (IntersectionObserver
 * under the hood) — never window.addEventListener('scroll').
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  as = 'div',
  y = 24,
}) => {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, filter: reduce ? 'none' : 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  const MotionTag = (motion as any)[as];
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  delayStep?: number;
}

export const StaggerGroup: React.FC<StaggerProps> = ({ children, className, delayStep = 0.08 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: delayStep } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
