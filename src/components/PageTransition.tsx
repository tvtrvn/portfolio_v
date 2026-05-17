import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../utils/cn';

interface PageTransitionProps {
  className?: string;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ className, children }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
};
