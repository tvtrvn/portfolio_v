import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../utils/cn';

type ButtonVariant = 'primary' | 'ghost' | 'outline';

interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsRouterLink = BaseButtonProps &
  LinkProps & {
    to: string;
    href?: undefined;
  };

type ButtonAsAnchor = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    to?: undefined;
  };

type ButtonProps = ButtonAsButton | ButtonAsRouterLink | ButtonAsAnchor;

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:focus-ring disabled:opacity-60 disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 focus-visible:ring-primary/80',
  ghost: 'bg-transparent hover:bg-slate-800/70 text-slate-100 focus-visible:ring-slate-400/80',
  outline:
    'border border-slate-700 bg-slate-900/50 hover:bg-slate-800/80 text-slate-100 focus-visible:ring-primary/80'
};

export const Button: React.FC<ButtonProps> = (props) => {
  const { variant = 'primary', className, children, ...rest } = props as any;
  const classes = cn(baseStyles, variants[variant], className);

  if ('to' in props && props.to) {
    return (
      <Link className={classes} {...(rest as LinkProps)}>
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    return (
      <a className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};


