import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { cn } from '../utils/cn';

type ButtonVariant = 'primary' | 'ghost' | 'outline';
type ButtonSize = 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  withArrow?: boolean;
  arrowDirection?: 'up-right' | 'right';
}

type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    to?: undefined;
    href?: undefined;
    children: React.ReactNode;
  };

type ButtonAsRouterLink = BaseButtonProps &
  Omit<LinkProps, 'children'> & {
    to: string;
    href?: undefined;
    children: React.ReactNode;
  };

type ButtonAsAnchor = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    href: string;
    to?: undefined;
    children: React.ReactNode;
  };

type ButtonProps = ButtonAsButton | ButtonAsRouterLink | ButtonAsAnchor;

const base =
  'group relative inline-flex select-none items-center justify-between gap-3 font-medium tracking-tight transition-all duration-500 ease-premium focus-ring disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

const sizes: Record<ButtonSize, string> = {
  md: 'rounded-full px-5 py-2.5 text-sm',
  lg: 'rounded-full px-7 py-3.5 text-[15px]',
};

const innerIconSizes: Record<ButtonSize, string> = {
  md: 'h-8 w-8 -mr-1.5',
  lg: 'h-10 w-10 -mr-2',
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-ink-50 text-ink-900 hover:bg-white dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-white',
  ghost:
    'bg-transparent text-fg hover:bg-[color:var(--accent-soft)]',
  outline:
    'border border-line bg-transparent text-fg hover:bg-[color:var(--accent-soft)]',
};

const innerBubble =
  'flex items-center justify-center rounded-full bg-ink-900/10 dark:bg-ink-900/15 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5';

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    withArrow,
    arrowDirection = 'up-right',
    ...rest
  } = props as ButtonProps & { children: React.ReactNode };
  const classes = cn(base, sizes[size], variants[variant], className);

  const arrowEl = withArrow ? (
    <span className={cn(innerBubble, innerIconSizes[size])} aria-hidden="true">
      <ArrowUpRight
        weight="bold"
        className={cn(
          'h-3.5 w-3.5 transition-transform duration-500 ease-premium',
          arrowDirection === 'right' && 'rotate-45'
        )}
      />
    </span>
  ) : null;

  const content = (
    <>
      <span className="leading-none">{children}</span>
      {arrowEl}
    </>
  );

  if ('to' in props && props.to) {
    return (
      <Link className={classes} {...(rest as LinkProps)}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const isExternal = props.href.startsWith('http');
    const anchorRest = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        className={classes}
        {...anchorRest}
        {...(isExternal && !anchorRest.target ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};
