import React from 'react';
import { cn } from '../utils/cn';

interface PageTransitionProps {
  className?: string;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ className, children }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 10);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      className={cn(
        'transition-all duration-500 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        className
      )}
    >
      {children}
    </div>
  );
};

