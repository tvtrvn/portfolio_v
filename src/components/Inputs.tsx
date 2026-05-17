import React from 'react';
import { cn } from '../utils/cn';

interface BaseFieldProps {
  label: string;
  name: string;
  error?: string;
  helper?: string;
  className?: string;
}

type InputProps = BaseFieldProps & React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseFieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const fieldShellBase =
  'rounded-2xl border border-line bg-elev px-4 py-3 text-[15px] text-fg placeholder:text-muted transition-all duration-500 ease-premium focus:border-amber-400/60 focus:bg-[color:var(--accent-soft)]/40 focus-ring';

export const TextInput: React.FC<InputProps> = ({
  label,
  name,
  error,
  helper,
  className,
  ...rest
}) => {
  const id = rest.id ?? name;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={cn(fieldShellBase, error && 'border-red-500/70 focus:border-red-500/70')}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : helper ? `${id}-help` : undefined}
        {...rest}
      />
      {helper && !error && (
        <p id={`${id}-help`} className="text-xs text-muted">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export const TextArea: React.FC<TextareaProps> = ({
  label,
  name,
  error,
  helper,
  className,
  ...rest
}) => {
  const id = rest.id ?? name;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={5}
        className={cn(
          fieldShellBase,
          'min-h-[140px] resize-y leading-relaxed',
          error && 'border-red-500/70 focus:border-red-500/70'
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : helper ? `${id}-help` : undefined}
        {...rest}
      />
      {helper && !error && (
        <p id={`${id}-help`} className="text-xs text-muted">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
