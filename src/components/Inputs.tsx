import React from 'react';
import { cn } from '../utils/cn';

interface BaseFieldProps {
  label: string;
  name: string;
  error?: string;
  className?: string;
}

type InputProps = BaseFieldProps & React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseFieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextInput: React.FC<InputProps> = ({ label, name, error, className, ...rest }) => {
  const id = rest.id ?? name;
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="text-xs font-medium text-slate-200">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={cn(
          'rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition focus-visible:focus-ring',
          error && 'border-red-500/80'
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export const TextArea: React.FC<TextareaProps> = ({ label, name, error, className, ...rest }) => {
  const id = rest.id ?? name;
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="text-xs font-medium text-slate-200">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className={cn(
          'min-h-[120px] rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition focus-visible:focus-ring',
          error && 'border-red-500/80'
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

