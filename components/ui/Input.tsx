'use client';

import React, { forwardRef, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  icon,
  fullWidth = true,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className={`mcv-input-group ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="mcv-input__label">
          {label}
        </label>
      )}
      <div className="mcv-input__wrapper">
        {icon && <span className="mcv-input__icon" aria-hidden="true">{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={`mcv-input ${icon ? 'mcv-input--with-icon' : ''} ${error ? 'mcv-input--error' : ''}`}
          aria-invalid={!!error || undefined}
          aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={errorId} className="mcv-input__error" role="alert">{error}</p>
      )}
      {hint && !error && (
        <p id={hintId} className="mcv-input__hint">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  hint,
  fullWidth = true,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`;

  return (
    <div className={`mcv-input-group ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="mcv-input__label">{label}</label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={`mcv-input mcv-input--textarea ${error ? 'mcv-input--error' : ''}`}
        aria-invalid={!!error || undefined}
        {...props}
      />
      {error && <p className="mcv-input__error" role="alert">{error}</p>}
      {hint && !error && <p className="mcv-input__hint">{hint}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Input;
